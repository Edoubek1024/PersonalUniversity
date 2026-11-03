/**
 * The Python side of the in-browser runtime (see py-worker.ts). It is compiled once per worker
 * under the file name "<harness>", whose frames are hidden from learners' tracebacks, and exposes
 * three entry points, each returning a JSON string:
 *
 *   run(code, stdin, emit)                     run code as main.py in a fresh namespace
 *   check(code, tests, stdin, emit)            run code, then each top-level statement of tests
 *   trace(code, stdin, max_steps)              run code under sys.settrace, recording snapshots
 *
 * `emit(stream, text)` is a JS function receiving stdout ("out") and stderr ("err") text.
 * `stdin` is a list of lines that input() returns in order.
 *
 * Tests (python.tsx documents the format for lesson authors): every top-level `assert` is one
 * check, reported as passed or failed with its message (or its source when it has none). For
 * `assert a == b` the failure says "expected b, got a". Other statements are setup. The tests see
 * the learner's namespace plus helpers: _output (what the code printed), _code (the learner's
 * source text), _capture(fn, *args)
 * (what a call prints), _raises(Exc, fn, *args) (True if the call raises Exc) and
 * _rerun(lines) (stdout of running the whole program again with those input() lines).
 */
export const HARNESS = String.raw`
import ast, builtins, importlib, io, json, linecache, operator, os, sys, traceback, types

_FILE = 'main.py'
_TESTS = '<tests>'
_HIDDEN = {'<harness>'}


class _Stream(io.TextIOBase):
    def __init__(self, name, emit):
        self._name = name
        self._emit = emit

    def writable(self):
        return True

    def write(self, s):
        if not isinstance(s, str):
            raise TypeError('write() argument must be str, not ' + type(s).__name__)
        if s:
            self._emit(self._name, s)
        return len(s)

    def flush(self):
        pass


def _make_input(lines):
    queue = [str(x) for x in lines]

    def input(prompt=''):
        sys.stdout.write(str(prompt))
        if not queue:
            sys.stdout.write('\n')
            raise EOFError('input() was called but there is no input left. Type the lines your program '
                           'should read into the Input box (one line per input() call) and run again.')
        value = queue.pop(0)
        sys.stdout.write(value + '\n')
        return value

    return input


def _clean(te, seen=None):
    seen = seen if seen is not None else set()
    if te is None or id(te) in seen:
        return
    seen.add(id(te))
    te.stack = traceback.StackSummary.from_list([f for f in te.stack if f.filename not in _HIDDEN])
    _clean(te.__cause__, seen)
    _clean(te.__context__, seen)


def _format(e):
    te = traceback.TracebackException(type(e), e, e.__traceback__, compact=True)
    _clean(te)
    return ''.join(te.format())


def _short(e):
    msg = str(e)
    return type(e).__name__ + (': ' + msg if msg else '')


def _r(v, n=200):
    try:
        s = repr(v)
    except BaseException as e:
        s = '<repr failed: ' + _short(e) + '>'
    return s if len(s) <= n else s[:n - 1] + '…'


def _register(name, src):
    linecache.cache[name] = (len(src), None, src.splitlines(True), name)


def _fresh():
    return {'__name__': '__main__', '__builtins__': builtins}


def _exec_user(code, ns):
    _register(_FILE, code)
    exec(compile(code, _FILE, 'exec'), ns)


def _forget_user_modules():
    # Modules the learner wrote to the virtual disk are re-imported fresh on every run.
    for name, m in list(sys.modules.items()):
        f = getattr(m, '__file__', None) or ''
        if f.startswith('/home/') or f.startswith('/tmp/'):
            del sys.modules[name]
    importlib.invalidate_caches()


def _setup(emit, stdin):
    _forget_user_modules()
    # As when running a script: the program's own directory is searched first by import.
    if os.getcwd() not in sys.path:
        sys.path.insert(0, os.getcwd())
    sys.stdout = _Stream('out', emit)
    sys.stderr = _Stream('err', emit)
    builtins.input = _make_input(stdin)


def _exit_note(e):
    if e.code not in (None, 0):
        sys.stderr.write('SystemExit: ' + str(e.code) + '\n')


def run(code, stdin, emit):
    _setup(emit, stdin)
    try:
        _exec_user(code, _fresh())
        return json.dumps({'ok': True})
    except SystemExit as e:
        _exit_note(e)
        return json.dumps({'ok': e.code in (None, 0)})
    except BaseException as e:
        sys.stderr.write(_format(e))
        return json.dumps({'ok': False})


def _ev(node, ns):
    return eval(compile(ast.Expression(body=node), _TESTS, 'eval'), ns)


_OPS = {
    ast.NotEq: operator.ne, ast.Lt: operator.lt, ast.LtE: operator.le, ast.Gt: operator.gt,
    ast.GtE: operator.ge, ast.Is: operator.is_, ast.IsNot: operator.is_not,
    ast.In: lambda a, b: a in b, ast.NotIn: lambda a, b: a not in b,
}


def check(code, tests, stdin, emit):
    printed = []

    def tee(stream, text):
        if stream == 'out':
            printed.append(text)
        emit(stream, text)

    _setup(tee, stdin)
    ns = _fresh()
    try:
        _exec_user(code, ns)
    except SystemExit as e:
        _exit_note(e)
    except BaseException as e:
        sys.stderr.write(_format(e))
        return json.dumps({'ok': False, 'stage': 'code', 'results': []})
    _setup(emit, stdin)

    def _capture(fn, *args, **kwargs):
        old, buf = sys.stdout, io.StringIO()
        sys.stdout = buf
        try:
            fn(*args, **kwargs)
        finally:
            sys.stdout = old
        return buf.getvalue()

    def _raises(exc, fn, *args, **kwargs):
        try:
            fn(*args, **kwargs)
        except exc:
            return True
        return False

    def _rerun(lines):
        old_out, old_in, buf = sys.stdout, builtins.input, io.StringIO()
        sys.stdout, builtins.input = buf, _make_input(lines)
        try:
            try:
                _exec_user(code, _fresh())
            except SystemExit:
                pass
        finally:
            sys.stdout, builtins.input = old_out, old_in
        return buf.getvalue()

    ns.update(_output=''.join(printed), _code=code, _capture=_capture, _raises=_raises, _rerun=_rerun)
    try:
        tree = ast.parse(tests, _TESTS)
    except SyntaxError as e:
        return json.dumps({'ok': False, 'stage': 'tests', 'results': [], 'error': 'The hidden tests have a syntax error: ' + str(e)})
    _register(_TESTS, tests)
    results = []
    for node in tree.body:
        if not isinstance(node, ast.Assert):
            try:
                exec(compile(ast.Module(body=[node], type_ignores=[]), _TESTS, 'exec'), ns)
            except AssertionError as e:
                results.append({'label': str(e) or (ast.get_source_segment(tests, node) or '').splitlines()[0], 'code': '', 'ok': False, 'detail': 'this was not true'})
            except BaseException as e:
                results.append({'label': 'Setting up the tests', 'code': '', 'ok': False, 'detail': 'raised ' + _short(e)})
                break
            continue
        src = ast.get_source_segment(tests, node.test) or ''
        label = None
        if node.msg is not None:
            try:
                label = str(_ev(node.msg, ns))
            except BaseException:
                label = None
        ok, detail = False, None
        try:
            t = node.test
            if isinstance(t, ast.Compare) and len(t.ops) == 1:
                left = _ev(t.left, ns)
                right = _ev(t.comparators[0], ns)
                op = t.ops[0]
                if isinstance(op, ast.Eq):
                    ok = bool(left == right)
                    detail = None if ok else 'expected ' + _r(right) + ', got ' + _r(left)
                else:
                    ok = bool(_OPS[type(op)](left, right))
                    if not ok and isinstance(op, ast.Is):
                        detail = 'expected ' + _r(right) + ', got ' + _r(left)
                    elif not ok:
                        detail = 'this was not true (the left side was ' + _r(left)
                        detail += ')' if isinstance(op, (ast.In, ast.NotIn)) and len(_r(right)) > 60 else ', the right side ' + _r(right) + ')'
            else:
                ok = bool(_ev(t, ns))
                detail = None if ok else 'this was not true'
        except BaseException as e:
            ok, detail = False, 'raised ' + _short(e)
        results.append({'label': label or src, 'code': src if label else '', 'ok': ok, 'detail': detail})
    return json.dumps({'ok': bool(results) and all(r['ok'] for r in results), 'stage': 'tests', 'results': results})


_PRIMS = (int, float, complex, str, bool, type(None), bytes)


def trace(code, stdin, max_steps):
    out = []
    size = [0]

    def collect(stream, text):
        if size[0] < 50000:
            out.append(text)
        size[0] += len(text)

    _setup(collect, stdin)
    ns = _fresh()
    steps = []
    labels = {}
    keep = []
    unwinding = set()

    class _Stop(BaseException):
        pass

    def short(s, n=40):
        return s if len(s) <= n else s[:n - 1] + '…'

    def lab(v):
        k = id(v)
        if k not in labels:
            labels[k] = len(labels) + 1
            keep.append(v)
        return labels[k]

    def describe(v):
        if isinstance(v, type):
            return 'class ' + v.__name__
        if isinstance(v, types.ModuleType):
            return 'module ' + v.__name__
        name = getattr(v, '__name__', '?')
        if isinstance(v, types.MethodType):
            return 'method ' + name
        if isinstance(v, types.FunctionType):
            c = v.__code__
            args = list(c.co_varnames[:c.co_argcount + c.co_kwonlyargcount])
            return 'function ' + ('lambda' if name == '<lambda>' else name) + '(' + ', '.join(args) + ')'
        return 'built-in ' + name

    def is_obj(v):
        if isinstance(v, type):
            return v.__module__ == '__main__'
        return isinstance(v, (list, tuple, dict, set, frozenset)) or (
            hasattr(v, '__dict__') and getattr(type(v), '__module__', '') == '__main__')

    CAP = 40

    def enc(v, heap):
        if type(v) in _PRIMS:
            return ['p', short(_r(v, 60))]
        if is_obj(v):
            i = lab(v)
            if i not in heap:
                heap[i] = None
                heap[i] = build(v, heap)
            return ['r', i]
        if isinstance(v, (types.FunctionType, types.BuiltinFunctionType, types.MethodType, type, types.ModuleType)):
            return ['f', describe(v)]
        return ['p', short(_r(v, 60))]

    def build(v, heap):
        tn = type(v).__name__
        if isinstance(v, dict):
            items = [[enc(k, heap), enc(x, heap)] for k, x in list(v.items())[:CAP]]
            kind = 'dict'
        elif isinstance(v, tuple):
            items, kind = [enc(x, heap) for x in v[:CAP]], 'tuple'
        elif isinstance(v, list):
            items, kind = [enc(x, heap) for x in v[:CAP]], 'list'
        elif isinstance(v, (set, frozenset)):
            items, kind = [enc(x, heap) for x in list(v)[:CAP]], 'set'
        elif isinstance(v, type):
            attrs = [(k, x) for k, x in vars(v).items() if not k.startswith('__')][:CAP]
            return {'k': 'class', 't': v.__name__, 'items': [[['p', k], enc(x, heap)] for k, x in attrs], 'n': len(attrs)}
        else:
            try:
                attrs = list(vars(v).items())[:CAP]
            except TypeError:
                attrs = []
            items, kind = [[['p', k], enc(x, heap)] for k, x in attrs], 'instance'
        n = len(v) if kind != 'instance' else len(items)
        return {'k': kind, 't': tn, 'items': items, 'n': n}

    def user(frame):
        c = frame.f_code
        return c.co_filename == _FILE and (c.co_name == '<module>' or bool(c.co_flags & 0x02))

    def snap(frame, event, arg):
        stack = []
        f = frame
        while f is not None:
            if user(f):
                stack.append(f)
            f = f.f_back
        stack.reverse()
        heap = {}
        frames = []
        for f in stack:
            is_mod = f.f_code.co_name == '<module>'
            vs = []
            for k, v in list(f.f_locals.items()):
                if k.startswith('__') or k.startswith('.'):
                    continue
                vs.append([k, enc(v, heap)])
            frames.append({'name': 'Global frame' if is_mod else f.f_code.co_name, 'vars': vs})
        step = {'line': frame.f_lineno, 'event': event, 'frames': frames, 'heap': heap, 'out': size[0]}
        if event == 'return' and frame.f_code.co_name != '<module>':
            step['ret'] = enc(arg, heap)
        if event == 'exception':
            step['exc'] = _short(arg[1])
        steps.append(step)

    def local(frame, event, arg):
        if not user(frame):
            return local
        if event == 'line':
            unwinding.discard(id(frame))
        elif event == 'exception':
            if isinstance(arg[1], _Stop):
                return local
            unwinding.add(id(frame))
            if arg[2] is not None and arg[2].tb_next is not None:
                return local   # passing through from a callee: record only where it was raised
        elif event == 'return':
            if id(frame) in unwinding:
                unwinding.discard(id(frame))
                return local
        else:
            return local
        if len(steps) >= max_steps:
            raise _Stop()
        snap(frame, event, arg)
        return local

    def glob(frame, event, arg):
        if frame.f_code.co_filename != _FILE:
            return None
        return local

    error = None
    truncated = False
    _register(_FILE, code)
    try:
        compiled = compile(code, _FILE, 'exec')
    except SyntaxError as e:
        return json.dumps({'steps': [], 'stdout': '', 'error': _format(e), 'truncated': False})
    sys.settrace(glob)
    try:
        exec(compiled, ns)
    except _Stop:
        truncated = True
    except SystemExit:
        pass
    except BaseException as e:
        error = _format(e)
    finally:
        sys.settrace(None)
    return json.dumps({'steps': steps, 'stdout': ''.join(out), 'error': error, 'truncated': truncated})
`;
