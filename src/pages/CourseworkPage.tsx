import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, ExternalLink, GitBranch, Terminal } from 'lucide-react';
import { subjectById } from '@/data/subjects';
import { categoryById } from '@/data/categories';
import { useProgress } from '@/store/progress';
import {
  courseworkHref,
  courseworkLabel,
  courseworkProgress,
  findCoursework,
  lessonsRemainingBefore,
  portfolioCheckId,
  requirementCheckId,
} from '@/lib/coursework';
import { Inline, Markdown } from '@/lib/markdown';
import { CategoryBadge, Checkbox, ProgressBar, SectionTitle } from '@/components/ui';
import { ResourceItem } from '@/components/ResourceItem';
import { NotFound } from './NotFound';

export function CourseworkPage() {
  const { subjectId = '', slug = '' } = useParams();
  const subject = subjectById.get(subjectId);
  const { checks, toggleCheck, completedLessons } = useProgress();
  const item = subject && findCoursework(subject, slug);
  if (!subject || !subject.coursework || !item) return <NotFound />;

  const progress = courseworkProgress(item, checks);
  const accent = categoryById[subject.category].accent;
  const remaining = lessonsRemainingBefore(item, subject, completedLessons);
  const position = subject.coursework.items.indexOf(item);
  const prev = subject.coursework.items[position - 1];
  const next = subject.coursework.items[position + 1];
  const moduleOf = (moduleSlug: string) => {
    const index = subject.modules.findIndex((m) => m.slug === moduleSlug);
    return { index, title: subject.modules[index]?.title ?? moduleSlug };
  };
  const dueAfter = item.kind === 'mp' ? moduleOf(item.afterModule) : null;
  const covered = item.kind === 'mp' ? item.coversModules : item.coverage.map((c) => c.module);

  return (
    <article className="mx-auto max-w-3xl space-y-10 animate-rise">
      <header className="space-y-4">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-3">
          <Link to="/subjects" className="hover:text-ink">
            Subjects
          </Link>{' '}
          /{' '}
          <Link to={`/subjects/${subject.id}`} className="text-accent hover:underline">
            {subject.title}
          </Link>{' '}
          / <span>{courseworkLabel(item)}</span>
        </nav>
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={subject.category} />
          <span className="chip">{courseworkLabel(item)}</span>
          <span className="chip">{item.language}</span>
          <span className="inline-flex items-center gap-1 text-sm text-ink-2">
            <Clock size={14} aria-hidden /> ≈ {item.estimatedHours} hours
          </span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          <Inline>{item.title}</Inline>
        </h1>
        <p className="text-base text-ink-2">
          <Inline>{item.summary}</Inline>
        </p>
        <div className="card p-4 text-sm">
          <p>
            {dueAfter ? (
              <>
                Do this after <strong>Module {dueAfter.index + 1}: {dueAfter.title}</strong>. It uses nothing taught later.
              </>
            ) : (
              <>Do this after the last module. It draws on every module in the course.</>
            )}{' '}
            <span className="text-ink-2">
              {remaining === 0 ? 'You have finished all the lessons it needs.' : `${remaining} of the lessons it needs ${remaining === 1 ? 'is' : 'are'} still open.`}
            </span>
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar pct={progress.pct} accent={accent} label={`${courseworkLabel(item)} progress`} />
            </div>
            <span className="text-xs tabular-nums text-ink-3">
              {progress.done}/{progress.total}
            </span>
          </div>
        </div>
      </header>

      <section aria-labelledby="overview">
        <SectionTitle id="overview">What you are building</SectionTitle>
        <Markdown>{item.overview}</Markdown>
      </section>

      <section aria-labelledby="setup">
        <SectionTitle id="setup">Set up in VS Code</SectionTitle>
        <h3 className="text-sm font-semibold">Extensions</h3>
        <ul className="mt-2 flex flex-wrap gap-2">
          {item.setup.extensions.map((e) => (
            <li key={e}>
              <a href={`https://marketplace.visualstudio.com/items?itemName=${e}`} target="_blank" rel="noreferrer" className="chip inline-flex items-center gap-1 font-mono normal-case tracking-normal hover:text-accent">
                {e}
                <ExternalLink size={11} aria-label="(opens in a new tab)" />
              </a>
            </li>
          ))}
        </ul>
        <h3 className="mt-5 text-sm font-semibold">Install</h3>
        <ul className="mt-1 list-disc pl-6 text-sm text-ink-2">
          {item.setup.toolchain.map((t, i) => (
            <li key={i}>
              <Inline>{t}</Inline>
            </li>
          ))}
        </ul>
        <h3 className="mt-5 text-sm font-semibold">Repository layout</h3>
        <pre className="mt-2 overflow-x-auto rounded-xl border border-line bg-surface-2 p-4 font-mono text-[13px] leading-6">{item.setup.structure}</pre>
        <h3 className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
          <Terminal size={14} aria-hidden /> Commands for the integrated terminal
        </h3>
        <dl className="mt-2 space-y-2">
          {item.setup.commands.map((c) => (
            <div key={c.label}>
              <dt className="text-xs text-ink-3">{c.label}</dt>
              <dd className="mt-0.5 overflow-x-auto rounded-lg bg-surface-2 px-3 py-2 font-mono text-[13px]">{c.command}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="requirements">
        <SectionTitle id="requirements">Requirements</SectionTitle>
        <ul>
          {item.requirements.map((r, i) => {
            const id = requirementCheckId(item, i);
            return <Checkbox key={id} id={id} checked={!!checks[id]} onChange={() => toggleCheck(id)} label={<Inline>{r}</Inline>} />;
          })}
        </ul>
      </section>

      <section aria-labelledby="acceptance">
        <SectionTitle id="acceptance">Acceptance tests</SectionTitle>
        <p className="mb-2 text-sm text-ink-2">Write these as automated tests in your repository. All of them must pass.</p>
        <ol className="list-decimal space-y-1.5 pl-6 text-sm">
          {item.acceptanceTests.map((t, i) => (
            <li key={i}>
              <Inline>{t}</Inline>
            </li>
          ))}
        </ol>
      </section>

      {item.kind === 'final' && (
        <>
          <section aria-labelledby="coverage">
            <SectionTitle id="coverage">How this proves the whole course</SectionTitle>
            <ul className="space-y-2">
              {item.coverage.map((c) => {
                const m = moduleOf(c.module);
                return (
                  <li key={c.module} className="card p-3 text-sm">
                    <div className="text-xs font-semibold text-ink-3">
                      Module {m.index + 1}: {m.title}
                    </div>
                    <div className="mt-0.5">
                      <Inline>{c.demonstrates}</Inline>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="portfolio">
            <SectionTitle id="portfolio">Publish it on GitHub</SectionTitle>
            <p className="mb-2 inline-flex items-center gap-1.5 text-sm text-ink-2">
              <GitBranch size={14} aria-hidden /> Suggested repository name: <code className="font-mono">{item.repoName}</code>
            </p>
            <ul>
              {item.portfolio.map((p, i) => {
                const id = portfolioCheckId(item, i);
                return <Checkbox key={id} id={id} checked={!!checks[id]} onChange={() => toggleCheck(id)} label={<Inline>{p}</Inline>} />;
              })}
            </ul>
          </section>
        </>
      )}

      {item.kind === 'mp' && (
        <section aria-labelledby="practises">
          <SectionTitle id="practises">Modules this practises</SectionTitle>
          <ul className="list-disc pl-6 text-sm text-ink-2">
            {covered.map((c) => {
              const m = moduleOf(c);
              return (
                <li key={c}>
                  Module {m.index + 1}: {m.title}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {item.stretchGoals && item.stretchGoals.length > 0 && (
        <section aria-labelledby="stretch">
          <SectionTitle id="stretch">Stretch goals</SectionTitle>
          <ul className="list-disc pl-6 text-sm text-ink-2">
            {item.stretchGoals.map((g, i) => (
              <li key={i}>
                <Inline>{g}</Inline>
              </li>
            ))}
          </ul>
        </section>
      )}

      {item.resources && item.resources.length > 0 && (
        <section aria-labelledby="references">
          <SectionTitle id="references">References</SectionTitle>
          <ul className="space-y-2">
            {item.resources.map((r) => (
              <ResourceItem key={r.url} r={r} />
            ))}
          </ul>
        </section>
      )}

      <nav aria-label="Course projects" className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        {prev ? (
          <Link to={courseworkHref(prev)} className="btn-outline">
            <ArrowLeft size={14} aria-hidden /> {courseworkLabel(prev)}
          </Link>
        ) : (
          <Link to={`/subjects/${subject.id}`} className="btn-outline">
            <ArrowLeft size={14} aria-hidden /> Course page
          </Link>
        )}
        {next ? (
          <Link to={courseworkHref(next)} className="btn-outline">
            {courseworkLabel(next)} <ArrowRight size={14} aria-hidden />
          </Link>
        ) : (
          <Link to={`/subjects/${subject.id}`} className="btn-outline">
            Course page <ArrowRight size={14} aria-hidden />
          </Link>
        )}
      </nav>
    </article>
  );
}
