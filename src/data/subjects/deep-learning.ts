import { defineSubject } from '../define';

export default defineSubject({
  id: 'deep-learning',
  title: 'Deep Learning',
  category: 'cs',
  tagline:
    'Neural networks from the chain rule to transformers and diffusion models: build them from scratch, train them on real data, and learn the engineering that makes them work at scale.',
  description: `Deep learning is the branch of machine learning in which the features are learned rather than designed: stacks of simple differentiable layers, trained end to end by gradient descent on large datasets, now define the state of the art in vision, language, speech, protein structure and game playing. The ideas are few (differentiable programming, the chain rule, stochastic optimization, inductive biases encoded in architecture), but making them work is a craft that only comes from training models yourself and watching them fail.

This curriculum runs two tracks at once, following the fast.ai philosophy of top-down practice and the bottom-up theory of Goodfellow's *Deep Learning* and *Dive into Deep Learning*. On the practical track you train a state-of-the-art image classifier in your first week with fast.ai and PyTorch, then fine-tune transformers and deploy models. On the foundational track you follow Andrej Karpathy's *Neural Networks: Zero to Hero*: you write an autograd engine, a multilayer perceptron, a character-level language model and finally a GPT, every line from scratch, so that nothing in a framework is magic. The two tracks meet in the middle modules on convolutional networks, transformers and generative models.

Every lesson has you train something on real data (MNIST, CIFAR-10, Imagenette, Oxford Pets, Tiny Shakespeare, IMDB, WikiText) and measure it, with ablations that show what each component is worth. The capstone is a complete project: train, evaluate and deploy a model on a real task with an ablation study and a written report. Machine learning is a prerequisite; its validation discipline, optimization theory and engineering practice are assumed throughout.`,
  difficulty: 'advanced',
  estimatedHours: 90,
  prerequisites: ['machine-learning'],
  recommendedBackground: [
    'Python and NumPy fluency; comfort with Jupyter',
    'Linear algebra (matrix calculus, the chain rule for vector functions) and probability (likelihoods, KL divergence)',
    'Access to a GPU: a free Colab/Kaggle notebook is sufficient for every exercise except the scaling module',
    'The machine-learning subject, especially validation, SGD, regularization and the ML engineering module',
  ],
  tags: ['deep-learning', 'neural-networks', 'pytorch', 'transformers', 'computer-vision', 'nlp', 'generative-models', 'fast.ai'],
  core: true,
  modules: [
    {
      slug: 'neural-network-foundations',
      title: 'Neural Network Foundations',
      description:
        'From logistic regression to multilayer perceptrons, backpropagation derived and implemented from scratch as an autograd engine, and the PyTorch training loop that every later lesson reuses. A couple of exercises use a small CNN before Module 3 explains convolution: treat it as a ready-made black box for now.',
      lessons: [
        {
          slug: 'from-linear-models-to-neural-networks',
          title: 'From linear models to neural networks',
          summary:
            'Why stacking linear layers with nonlinearities creates expressive models, the multilayer perceptron, activation functions, the universal approximation idea, and a first network trained by hand on XOR.',
          estimatedMinutes: 110,
          objectives: [
            'Explain why a composition of linear maps is linear and why nonlinear activations are therefore essential',
            'Define the multilayer perceptron and count its parameters for a given architecture',
            'Compare activation functions (sigmoid, tanh, ReLU and variants) on gradients and saturation',
            'State the universal approximation theorem informally and explain why it does not tell you how to train a network',
            'Train a two-layer network on XOR in NumPy and visualise the learned features',
          ],
          concepts: [
            'Neuron: affine map plus nonlinearity',
            'Multilayer perceptron; hidden layers; width and depth',
            'Activation functions: sigmoid, tanh, ReLU, GELU; saturation',
            'Parameter counting',
            'Universal approximation (informal)',
            'Representation learning: hidden units as learned features',
            'Depth vs width; compositionality',
          ],
          explanation: `Logistic regression draws one hyperplane. Many problems, XOR being the smallest, are not linearly separable in the raw inputs, and the classical fix was to engineer features. A **neural network** learns the features. A **layer** computes $\\mathbf{h} = \\phi(W\\mathbf{x} + \\mathbf{b})$: an affine map followed by an elementwise **nonlinearity** $\\phi$. Stack layers and you get a **multilayer perceptron**. The nonlinearity is not decoration: without it, the composition of affine maps is affine, and a hundred layers collapse to one.

Each hidden unit is a feature detector whose weights are learned by the same gradient descent you used for logistic regression. On XOR, two hidden ReLU units learn the two half-planes whose combination separates the classes; in an image model the early units learn edge detectors. This is **representation learning**, and the whole subject is a study of architectures that make the right features easy to learn.

Activation choice matters for training. **Sigmoid** and **tanh** saturate: for large $|z|$ the gradient is nearly zero and learning stalls, which is what made deep networks untrainable for decades. **ReLU**, $\\max(0, z)$, has gradient exactly 1 on its active side, trains fast, and is the default; its "dead unit" failure (a unit that is never active) motivates leaky ReLU and **GELU**, the smooth variant used in transformers.

The **universal approximation theorem** says one hidden layer of enough width can approximate any continuous function on a compact set. It is reassuring and nearly useless: it says nothing about how many units, how to find the weights, or whether they generalise. In practice **depth** wins: deep networks represent compositional functions exponentially more efficiently than shallow ones, and the inductive bias of composition matches real data.

Work through Nielsen's chapter 1 and the first half of Karpathy's micrograd video for intuition, then train the XOR network by hand in NumPy, computing gradients yourself one last time before the next lesson automates it.`,
          resources: [
            {
              title: 'Neural Networks: Zero to Hero — The spelled-out intro to neural networks and backpropagation (micrograd)',
              url: 'https://karpathy.ai/zero-to-hero.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Andrej Karpathy',
              note: 'Lecture 1. Watch the first hour for this lesson; the autograd part is next lesson.',
              primary: true,
            },
            {
              title: 'Neural Networks and Deep Learning (Michael Nielsen) — chapters 1 and 4',
              url: 'http://neuralnetworksanddeeplearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'Michael Nielsen',
              note: 'Chapter 1 builds a network for MNIST in NumPy; chapter 4 is a visual proof of universal approximation.',
            },
            {
              title: 'Deep Learning (Goodfellow, Bengio, Courville) — chapter 6, Deep Feedforward Networks',
              url: 'https://www.deeplearningbook.org/contents/mlp.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Goodfellow, Bengio, Courville',
              note: 'The XOR example in 6.1, activation functions in 6.3, and the depth argument in 6.4.',
            },
            {
              title: '3Blue1Brown — Neural networks video series',
              url: 'https://www.3blue1brown.com/topics/neural-networks',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'Visual intuition for layers, weights and gradient descent; chapters 1-3.',
            },
          ],
          exercises: [
            {
              slug: 'xor-by-hand',
              title: 'XOR network with hand-written gradients',
              prompt:
                'In NumPy, build a 2-2-1 network with tanh hidden units and a sigmoid output. Derive the gradients of the binary cross-entropy with respect to every weight by hand, implement them, and train on the four XOR points. Plot the loss and the decision boundary; plot the two hidden units\' activations over the input plane and explain what each learned. Then show that the same network without the nonlinearity cannot get below chance.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'activation-comparison',
              title: 'Activation functions and saturation',
              prompt:
                'Train a 784-256-256-10 MLP on MNIST (NumPy or PyTorch, your choice) with sigmoid, tanh and ReLU activations, same initialisation scale and learning rate, for 5 epochs. Plot training loss curves and, at initialisation, the histogram of hidden activations and of their gradients per layer. Explain the speed difference using the gradient histograms.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'parameter-counting',
              title: 'Count parameters and FLOPs',
              prompt:
                'For MLPs with layer sizes [784, 512, 512, 10], [784, 4096, 10] and [784, 128, 128, 128, 128, 128, 10], compute the number of parameters and the multiply-adds per forward pass by hand, then verify in PyTorch. Which has the most parameters, which the most depth, and which do you expect to train best on MNIST? Test your prediction.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a network without nonlinearities collapse to a linear model regardless of depth?',
              answerOutline:
                'The composition of affine maps W2(W1 x + b1) + b2 is affine: W2 W1 x + (W2 b1 + b2). Only a nonlinearity between layers increases the function class.',
            },
            {
              question: 'What problem do sigmoid activations cause in deep networks and why does ReLU help?',
              answerOutline:
                'Sigmoids saturate; their derivative is at most 0.25 and near zero for large inputs, so gradients vanish through many layers. ReLU has derivative 1 when active, passing gradients unchanged.',
            },
            {
              question: 'What does the universal approximation theorem guarantee and what does it leave open?',
              answerOutline:
                'Existence of a wide one-hidden-layer network approximating any continuous function on a compact set. It gives no bound on width, no training procedure and no generalization guarantee.',
            },
          ],
          relatedLessons: ['machine-learning/linear-models/logistic-regression'],
        },
        {
          slug: 'backpropagation-and-autograd',
          title: 'Backpropagation and building an autograd engine',
          summary:
            'The chain rule on computational graphs, reverse-mode automatic differentiation, why backprop costs the same as the forward pass, and building micrograd: a scalar autograd engine that trains a neural network.',
          estimatedMinutes: 150,
          objectives: [
            'Draw the computational graph of an expression and compute gradients by reverse-mode accumulation',
            'Derive the backward rules for addition, multiplication, tanh, exp, matrix multiplication and the softmax cross-entropy',
            'Implement a scalar autograd engine (micrograd) with topological ordering and gradient accumulation, and train an MLP with it',
            'Explain forward vs reverse mode and why reverse mode is used for neural networks',
            'Verify gradients numerically with finite differences',
          ],
          concepts: [
            'Computational graph; nodes, edges, local derivatives',
            'Chain rule as multiplication along paths; summation over paths',
            'Reverse-mode AD; vector-Jacobian products',
            'Topological sort; gradient accumulation at shared nodes',
            'Backward rules for common operations; matrix-calculus shapes',
            'Forward mode vs reverse mode; cost comparison',
            'Gradient checking with finite differences',
          ],
          explanation: `Training needs the gradient of the loss with respect to every parameter, possibly billions of them. Deriving each by hand is hopeless; **backpropagation** computes all of them in one pass that costs about as much as evaluating the loss.

Write the loss as a **computational graph**: each node is a primitive operation with known local derivatives. The chain rule says the derivative of the output with respect to a node is the sum, over all paths from that node to the output, of the product of local derivatives along the path. **Reverse-mode automatic differentiation** organises this: evaluate the graph forward, storing intermediate values; then walk the nodes in *reverse topological order*, and for each node multiply the gradient that has arrived at its output by its local derivative and *accumulate* into each input's gradient. A node used twice receives two contributions, which is why gradients are added, not assigned. Each node's backward step is a **vector-Jacobian product**; for a matrix multiply $Y = XW$ with upstream gradient $G$, the rules are $\\partial L/\\partial X = G W^\\top$ and $\\partial L/\\partial W = X^\\top G$, which you can rederive from shapes alone.

Why reverse mode? Forward mode computes one input's effect on all outputs per pass; reverse mode computes all inputs' effects on one output per pass. A loss is one output of billions of inputs, so reverse mode wins by a factor of the parameter count. The price is memory: every intermediate activation must be stored until its backward step, which is why GPU memory, not compute, usually limits batch size.

Karpathy's micrograd is 100 lines of Python that does all this on scalars and trains a network. Build it yourself following the video, then extend it. The understanding you gain (why \`zero_grad\` exists, what \`.backward()\` does, why in-place ops break autograd) will save you from most of the mysterious bugs PyTorch users hit. Always check your implementation with **finite differences**: $(f(w + \\epsilon) - f(w - \\epsilon))/2\\epsilon$ should match the analytic gradient to several decimals.`,
          resources: [
            {
              title: 'Neural Networks: Zero to Hero — micrograd (lecture 1, full)',
              url: 'https://karpathy.ai/zero-to-hero.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Andrej Karpathy',
              note: 'Build the engine alongside the video; the repository is github.com/karpathy/micrograd.',
              primary: true,
            },
            {
              title: 'micrograd repository',
              url: 'https://github.com/karpathy/micrograd',
              type: 'documentation',
              cost: 'free',
              provider: 'Andrej Karpathy',
              note: 'The reference implementation to compare against after you write yours.',
            },
            {
              title: 'CS231n notes — Backpropagation, Intuitions',
              url: 'https://cs231n.github.io/optimization-2/',
              type: 'article',
              cost: 'free',
              provider: 'Stanford CS231n',
              note: 'Staged computation, gradient flow through gates, and vectorised backward passes.',
            },
            {
              title: 'Yes you should understand backprop (Karpathy)',
              url: 'https://karpathy.medium.com/yes-you-should-understand-backprop-e2f06eab496b',
              type: 'article',
              cost: 'free',
              provider: 'Andrej Karpathy',
              note: 'Why knowing the backward pass matters: dead ReLUs, saturating sigmoids and exploding RNN gradients explained.',
            },
          ],
          exercises: [
            {
              slug: 'build-micrograd',
              title: 'Build micrograd and train an MLP',
              prompt:
                'Implement a Value class with +, *, pow, exp, tanh and relu, each storing its children and a backward closure; implement backward() via topological sort with gradient accumulation. Build Neuron/Layer/MLP classes and train a 2-16-16-1 network on the two-moons dataset to above 95% accuracy. Check every operation\'s gradient against finite differences on random inputs to 1e-6 relative error.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'matrix-backward-rules',
              title: 'Derive and verify matrix backward rules',
              prompt:
                'Derive the backward rules for Y = XW + b (batch of rows), for the elementwise ReLU, for the row-wise softmax followed by cross-entropy, and for a sum over the batch. Implement a tensor-level forward/backward for a 2-layer MLP in NumPy using only these rules, train on MNIST, and verify each rule against finite differences on a small random case.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'forward-vs-reverse',
              title: 'Forward vs reverse mode cost',
              prompt:
                'Implement forward-mode AD with dual numbers for the same scalar operations. For an MLP with P parameters and one scalar output, measure the time to compute the full gradient with forward mode (P passes) and reverse mode (one pass) for P = 100, 1,000, 10,000. Plot both and explain the memory cost that reverse mode pays instead.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are gradients accumulated with += rather than assigned during the backward pass?',
              answerOutline:
                'A value used in several places contributes to the loss along several paths; the chain rule sums over paths, so each use adds its contribution to the same gradient.',
            },
            {
              question: 'Why does reverse mode suit neural networks better than forward mode?',
              answerOutline:
                'There is one scalar loss and millions of parameters; reverse mode gets all parameter gradients in one backward pass, whereas forward mode needs one pass per parameter.',
            },
            {
              question: 'What does PyTorch store during the forward pass and why does it limit batch size?',
              answerOutline:
                'Intermediate activations needed by backward rules (inputs of matmuls, masks of ReLUs, softmax outputs). Memory grows with batch size times activations, often exceeding compute as the bottleneck.',
            },
          ],
        },
        {
          slug: 'pytorch-and-the-training-loop',
          title: 'PyTorch: tensors, autograd and the training loop',
          summary:
            'Tensors on GPU, torch.autograd, nn.Module and optimizers, datasets and data loaders, and the canonical training loop with evaluation, checkpointing and logging, applied to MNIST and Fashion-MNIST.',
          estimatedMinutes: 130,
          objectives: [
            'Manipulate tensors (shapes, broadcasting, device placement) and use autograd to compute gradients of arbitrary code',
            'Write a model as an nn.Module, a training loop with an optimizer and a scheduler, and an evaluation loop with no_grad',
            'Build a Dataset and DataLoader with transforms, batching and shuffling',
            'Add checkpointing, logging of training/validation curves and seed control, and reproduce a run',
            'Train an MLP to above 98% on MNIST and diagnose a deliberately broken loop',
          ],
          concepts: [
            'Tensors: dtype, device, shape, broadcasting, views',
            'requires_grad, backward(), grad accumulation, zero_grad, no_grad',
            'nn.Module, parameters, nn.Sequential, forward',
            'Loss functions; optimizers (torch.optim); schedulers',
            'Dataset, DataLoader, transforms, num_workers',
            'Training loop anatomy; train/eval modes',
            'Checkpointing; logging; seeds and determinism',
          ],
          explanation: `PyTorch is micrograd on tensors with a GPU underneath. A **tensor** is an n-dimensional array with a dtype and a device; operations on tensors with \`requires_grad=True\` build a graph, \`loss.backward()\` runs reverse mode and leaves gradients in \`.grad\`, and an **optimizer** updates parameters from those gradients. Because gradients accumulate, you call \`optimizer.zero_grad()\` every step; because evaluation needs no graph, you wrap it in \`torch.no_grad()\` and switch the model to \`eval()\` so that dropout and batch norm behave.

A model is an **nn.Module**: a class holding parameters (and submodules) with a \`forward\` method. \`nn.Linear\`, \`nn.Conv2d\` and \`nn.Sequential\` cover most needs, and the module tree gives you \`parameters()\` for the optimizer and \`state_dict()\` for saving. Data flows through a **Dataset** (indexable, returns one example with transforms applied) and a **DataLoader** (batches, shuffles, loads in parallel worker processes, pins memory for fast GPU transfer). Data loading is the bottleneck more often than people expect; check GPU utilisation.

The **training loop** has a canonical shape that you should be able to write from memory: for each epoch, for each batch, move data to the device, forward, compute loss, zero gradients, backward, step the optimizer, step the scheduler, log; then evaluate on validation data and save a checkpoint if improved. Everything in later modules (mixed precision, gradient accumulation, distributed training) is a decoration of this loop, and frameworks like fastai and Lightning are this loop with callbacks. Write it yourself first.

Work through the PyTorch "Learn the Basics" tutorial and Karpathy's makemore part 1 for the autograd mechanics. Then write your training loop as a reusable function with a config dictionary, fix seeds, train an MLP on MNIST and Fashion-MNIST, and keep the loop: it is the chassis for the rest of the subject. Finally, debug the broken loops in the exercise; each bug is one you will meet in the wild.`,
          resources: [
            {
              title: 'PyTorch tutorials — Learn the Basics (tensors, datasets, build model, autograd, optimization, save/load)',
              url: 'https://pytorch.org/tutorials/beginner/basics/intro.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PyTorch',
              note: 'All eight short pages; run each in a notebook.',
              primary: true,
            },
            {
              title: 'PyTorch documentation — torch.nn, torch.optim, torch.utils.data',
              url: 'https://pytorch.org/docs/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'PyTorch',
            },
            {
              title: 'Neural Networks: Zero to Hero — makemore part 1 (bigram model, PyTorch autograd)',
              url: 'https://karpathy.ai/zero-to-hero.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Andrej Karpathy',
              note: 'Lecture 2: the transition from micrograd to torch tensors and a first language model.',
            },
            {
              title: 'Dive into Deep Learning — chapter 5, Multilayer Perceptrons (PyTorch implementation)',
              url: 'https://d2l.ai/chapter_multilayer-perceptrons/index.html',
              type: 'textbook',
              cost: 'free',
              provider: 'D2L',
              note: 'Concise and from-scratch implementations side by side, with Fashion-MNIST.',
            },
          ],
          exercises: [
            {
              slug: 'training-loop-from-memory',
              title: 'The training loop as a reusable function',
              prompt:
                'Write train(model, train_loader, val_loader, config) implementing the canonical loop with optimizer, scheduler, per-epoch validation accuracy and loss, best-checkpoint saving and a CSV log. Train a 784-512-256-10 ReLU MLP on MNIST to at least 98% validation accuracy and on Fashion-MNIST to at least 89%. Fix all seeds and show two runs produce identical logs (or document the source of any difference).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'break-the-loop',
              title: 'Diagnose five broken training loops',
              prompt:
                'Take your working loop and introduce, one at a time: forgetting zero_grad; calling model.eval() never (or train() never); applying softmax before CrossEntropyLoss; shuffling the labels but not the inputs via a DataLoader bug; a learning rate 100x too high. For each, record the symptom in the loss/accuracy curves and write the diagnostic that would catch it. Then diagnose a loop a classmate (or you, after a week) broke without telling you which bug.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'data-loading-bottleneck',
              title: 'Find the data-loading bottleneck',
              prompt:
                'Train on CIFAR-10 with a small CNN using num_workers = 0, 2, 4, 8 and pin_memory on/off; measure images per second and GPU utilisation (nvidia-smi or torch.cuda utilisation). Then add random-crop and flip transforms and repeat. Report the configuration that saturates the GPU and the speedup over num_workers = 0.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must you call optimizer.zero_grad() each step, and what happens if you do not?',
              answerOutline:
                'backward() accumulates into .grad; without zeroing, each step uses the sum of all previous gradients, effectively a growing momentum that diverges.',
            },
            {
              question: 'What does model.eval() change, and why wrap evaluation in torch.no_grad()?',
              answerOutline:
                'eval() switches dropout off and batch norm to running statistics; no_grad() stops graph construction, saving memory and time since no backward is needed.',
            },
            {
              question: 'Why is applying softmax before nn.CrossEntropyLoss a bug?',
              answerOutline:
                'CrossEntropyLoss applies log-softmax internally; a prior softmax double-normalises, squashing logits and producing small, miscalibrated gradients so training is slow and accuracy plateaus.',
            },
          ],
        },
        {
          slug: 'loss-functions-and-output-layers',
          title: 'Loss functions, output layers and numerical stability',
          summary:
            'Matching the output layer and loss to the task: softmax cross-entropy and its stable log-sum-exp implementation, multi-label and regression heads, class weighting, label smoothing and what the loss value means.',
          estimatedMinutes: 100,
          objectives: [
            'Choose output activations and losses for multiclass, multi-label, regression and ranking tasks and justify each from the likelihood',
            'Implement softmax cross-entropy stably via log-sum-exp and explain why the naive version overflows',
            'Use class weighting and focal loss for imbalance and label smoothing for calibration, and measure their effect',
            'Interpret loss values (what is chance-level cross-entropy, what is perplexity) and compare to accuracy',
          ],
          concepts: [
            'Softmax and cross-entropy as negative log-likelihood',
            'Log-sum-exp trick; logits vs probabilities',
            'Sigmoid + binary cross-entropy for multi-label',
            'MSE, MAE, Huber for regression; heteroscedastic outputs',
            'Class weights; focal loss',
            'Label smoothing',
            'Chance-level loss; perplexity',
            'Metric vs loss: surrogate losses',
          ],
          explanation: `A network's last layer and its loss are a probabilistic model in disguise, and choosing them is choosing what you assume about the target. For $K$ exclusive classes, the head outputs $K$ **logits**, **softmax** turns them into probabilities, and the **cross-entropy** is the negative log-likelihood of the correct class. For **multi-label** problems (an image can contain a dog *and* a cat), use $K$ independent sigmoids with binary cross-entropy. For regression, mean squared error is the Gaussian log-likelihood, mean absolute error the Laplacian, and Huber a robust compromise; if the noise varies with the input, let the network output a variance too (heteroscedastic regression) and maximise the Gaussian likelihood.

Numerics matter. Computing $\\log(\\mathrm{softmax}(z))$ naively exponentiates logits that may exceed 100, overflowing to infinity. The **log-sum-exp trick** subtracts the maximum: $\\log\\sum_j e^{z_j} = m + \\log\\sum_j e^{z_j - m}$ with $m = \\max_j z_j$, and \`nn.CrossEntropyLoss\` and \`F.log_softmax\` do this for you, which is exactly why they take logits, not probabilities. Keep everything in log space until you must report a probability.

Know what a loss number means. With $K$ balanced classes, a model that knows nothing has cross-entropy $\\ln K$ (2.30 for ten classes); a loss below that at step zero means your initialisation is leaking information or your data is skewed. For language models, $e^{\\text{loss}}$ is the **perplexity**, the effective number of choices per token. The loss is a **surrogate**: you minimise cross-entropy but care about accuracy, F1 or BLEU, which are not differentiable; track both and expect them to diverge late in training.

For **imbalance**, weight classes in the loss (\`weight=\`) or use the **focal loss**, which down-weights easy examples so the rare class is not drowned out. **Label smoothing** replaces the one-hot target with $(1 - \\alpha)$ on the true class and $\\alpha/K$ elsewhere; it prevents logits from growing without bound and improves calibration, and is standard in image classification and translation. Run the ablations: they are cheap and the effects are real.`,
          resources: [
            {
              title: 'CS231n notes — Linear classification: softmax and the numeric-stability note',
              url: 'https://cs231n.github.io/linear-classify/',
              type: 'article',
              cost: 'free',
              provider: 'Stanford CS231n',
              note: 'The softmax section, including the practical note on normalising logits.',
              primary: true,
            },
            {
              title: 'PyTorch documentation — torch.nn loss functions',
              url: 'https://pytorch.org/docs/stable/nn.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PyTorch',
              note: 'CrossEntropyLoss (with weight and label_smoothing), BCEWithLogitsLoss, HuberLoss, GaussianNLLLoss.',
            },
            {
              title: 'Deep Learning (Goodfellow et al.) — section 6.2, Gradient-Based Learning: cost functions and output units',
              url: 'https://www.deeplearningbook.org/contents/mlp.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Goodfellow, Bengio, Courville',
              note: 'Output units derived from maximum likelihood; why saturation in output units matters.',
            },
            {
              title: 'Focal Loss for Dense Object Detection (Lin et al.)',
              url: 'https://arxiv.org/abs/1708.02002',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICCV 2017',
              note: 'Section 3 defines the focal loss and shows its effect under extreme imbalance.',
            },
          ],
          exercises: [
            {
              slug: 'stable-cross-entropy',
              title: 'Stable softmax cross-entropy',
              prompt:
                'Implement softmax cross-entropy from scratch in PyTorch two ways: naively (exp then normalise then log) and with log-sum-exp. Feed logits scaled by 1, 10, 100 and 1000 and show where the naive version produces inf or nan while the stable one matches nn.CrossEntropyLoss. Then verify your gradient against autograd.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'imbalance-ablation',
              title: 'Imbalance: weights, focal loss, smoothing',
              prompt:
                'Make CIFAR-10 long-tailed (class k keeps 100 * 0.5^k percent of its images). Train the same small CNN with plain cross-entropy, class-weighted cross-entropy, focal loss (γ = 2) and label smoothing (α = 0.1). Report per-class recall, macro-F1 and expected calibration error on the balanced test set. Which method helps the rare classes most and which improves calibration?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'heads-and-losses',
              title: 'Pick the head and loss',
              prompt:
                'For each task, specify the output layer, the loss, the likelihood it corresponds to, and the metric you would report: (a) predicting one of 1000 ImageNet classes, (b) tagging a news article with any subset of 20 topics, (c) predicting house price with noise that grows with price, (d) predicting the next token in text, (e) predicting a 2D keypoint location with outliers in the labels. Implement (c) with a heteroscedastic Gaussian head on California housing and compare its calibration with MSE.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do PyTorch loss functions take logits rather than probabilities?',
              answerOutline:
                'So they can apply log-softmax (or log-sigmoid) with the log-sum-exp trick internally, avoiding overflow/underflow and giving well-conditioned gradients.',
            },
            {
              question: 'What cross-entropy should a freshly initialised 10-class classifier have, and what does a very different value suggest?',
              answerOutline:
                'About ln 10 = 2.30. Much higher means over-confident initialisation (logits too large); lower means leakage or imbalance in the data.',
            },
            {
              question: 'What does label smoothing do to the optimum of cross-entropy?',
              answerOutline:
                'The target distribution is no longer one-hot, so the optimal logits are finite with a fixed gap between the true class and the others; it prevents unbounded growth and overconfidence.',
            },
          ],
        },
      ],
      project: {
        slug: 'from-scratch-mlp-and-pytorch-port',
        title: 'Module project: an MLP from scratch and its PyTorch twin',
        description:
          'Build a tensor-level autograd MLP in NumPy (your own backward rules), train it on Fashion-MNIST, then port the same architecture to PyTorch with your reusable training loop and show the two match. Include gradient checks, loss/accuracy curves, a confusion matrix and an ablation over activation and depth.',
        deliverables: [
          'NumPy MLP with hand-derived backward rules and finite-difference checks for every operation',
          'PyTorch implementation reaching at least 89% on Fashion-MNIST with your training loop, logs and checkpoint',
          'A short report with curves, the ablation table (activation x depth) and the five diagnosed training-loop bugs',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'training-deep-networks',
      title: 'Training Deep Networks',
      description:
        'Why deep networks are hard to train and the techniques that make it work: initialisation and normalisation, optimizers and learning-rate schedules, regularization, and a systematic recipe for debugging training. Some exercises use a small CNN or ResNet before Module 3 explains convolution: treat those models as ready-made black boxes, because the training technique is the point here.',
      lessons: [
        {
          slug: 'initialization-and-normalization',
          title: 'Initialisation, vanishing gradients and normalisation layers',
          summary:
            'How activations and gradients scale through depth, Xavier and Kaiming initialisation derived from variance preservation, and batch normalisation and layer normalisation as the fix that made deep training routine.',
          estimatedMinutes: 130,
          objectives: [
            'Derive the variance-preserving initialisation scale for linear and ReLU layers and explain the vanishing/exploding gradient problem',
            'Diagnose a badly initialised deep network from activation and gradient statistics per layer',
            'Implement batch normalisation forward and backward and explain the train/eval difference and the running statistics',
            'Compare batch norm, layer norm and group norm and say where each is used and why',
          ],
          concepts: [
            'Forward and backward signal propagation; variance per layer',
            'Vanishing and exploding gradients',
            'Xavier/Glorot and Kaiming/He initialisation',
            'Batch normalisation: batch statistics, learnable scale/shift, running stats',
            'Layer normalisation; group norm; RMSNorm',
            'Normalisation and the learning rate / weight-decay interaction',
            'Residual connections as a complementary fix (preview)',
          ],
          explanation: `A deep network is a product of many layers, and products either blow up or vanish unless each factor is close to one. Consider a layer $\\mathbf{h} = W\\mathbf{x}$ with $W$ entries of variance $\\sigma^2$ and fan-in $n$: each output has variance $n\\sigma^2 \\mathrm{Var}(x)$. If $n\\sigma^2 \\ne 1$, activations grow or shrink geometrically with depth, and the same argument backwards applies to gradients. The **Xavier/Glorot** initialisation sets $\\sigma^2 = 1/n$ (or $2/(n_{in} + n_{out})$) to preserve variance for linear or tanh layers; **Kaiming/He** uses $\\sigma^2 = 2/n$ because ReLU zeros half the activations. Get this wrong by a factor of two per layer and a 50-layer network has activations off by $2^{50}$. Karpathy's makemore part 3 shows the statistics visually: histograms of activations and gradients per layer should look alike from first to last.

**Batch normalisation** makes training robust to such details. For each feature in a layer, standardise over the minibatch (subtract the batch mean, divide by the batch standard deviation), then apply a learnable scale $\\gamma$ and shift $\\beta$. Activations stay well-scaled no matter what the previous layers do, gradients flow, learning rates can be ten times larger, and the mild noise from batch statistics regularises. At test time there is no batch, so running averages of mean and variance collected during training are used, which is why \`model.eval()\` matters and why a mismatch between training and evaluation batch statistics is a classic bug. Batch norm also couples examples in a batch, breaks with very small batches, and complicates sequence models.

**Layer normalisation** standardises across the features of a single example instead, making it independent of the batch; it is the norm in transformers (as RMSNorm, a simplification). **Group norm** normalises groups of channels and is used in vision when batches are small. All of them interact with weight decay and learning rate in subtle ways (a normalised layer's weights can be rescaled freely, so decay effectively changes the learning rate), which the next lesson revisits. Work through makemore part 3, implement batch norm by hand including the backward pass, and run the depth experiment.`,
          resources: [
            {
              title: 'Neural Networks: Zero to Hero — makemore part 3: Activations and Gradients, BatchNorm',
              url: 'https://karpathy.ai/zero-to-hero.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Andrej Karpathy',
              note: 'Lecture 4. The clearest demonstration of initialisation statistics and why batch norm works.',
              primary: true,
            },
            {
              title: 'Delving Deep into Rectifiers (He et al.) — Kaiming initialisation',
              url: 'https://arxiv.org/abs/1502.01852',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICCV 2015',
              note: 'Section 2.2 derives the variance-preserving scale for ReLU networks.',
            },
            {
              title: 'Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift (Ioffe and Szegedy)',
              url: 'https://arxiv.org/abs/1502.03167',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICML 2015',
              note: 'The algorithm box; the stated explanation (covariate shift) is now thought incomplete, but the method stands.',
            },
            {
              title: 'CS231n notes — Neural Networks Part 2: setting up the data and the loss (initialisation, batch norm)',
              url: 'https://cs231n.github.io/neural-networks-2/',
              type: 'article',
              cost: 'free',
              provider: 'Stanford CS231n',
            },
          ],
          exercises: [
            {
              slug: 'depth-and-init',
              title: 'Activation statistics through depth',
              prompt:
                'Build a 20-layer MLP (width 256, ReLU) and, for initialisation scales σ = 0.01, 1/sqrt(n), sqrt(2/n) and 3/sqrt(n), plot per-layer histograms of activations and gradients at initialisation on a batch of Fashion-MNIST. Then train each for 2 epochs and report the loss. Finally add batch norm after every layer and repeat with the worst scale: does training recover?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'batchnorm-by-hand',
              title: 'Batch norm forward and backward',
              prompt:
                'Implement batch normalisation as a function with manual forward (batch mean/var, normalise, scale/shift, running stats update) and manual backward (derive the gradient through the normalisation, including the mean and variance dependencies). Verify the backward against autograd on random inputs. Then demonstrate the train/eval bug: evaluate with batch statistics on batch size 1 and show the accuracy collapse.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'norm-comparison',
              title: 'Batch norm vs layer norm vs group norm',
              prompt:
                'Train a ResNet-18-style CNN on CIFAR-10 with batch norm, layer norm and group norm (32 groups) at batch sizes 128, 16 and 2 (same number of epochs). Report test accuracy in a 3x3 table and explain the pattern, especially batch norm at batch size 2.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does Kaiming initialisation use variance 2/n instead of 1/n?',
              answerOutline:
                'ReLU zeros half of the pre-activations, halving the second moment; the factor 2 compensates so the variance of activations is preserved through each layer.',
            },
            {
              question: 'What is the difference between batch norm in training and evaluation mode?',
              answerOutline:
                'Training normalises with the current minibatch statistics and updates running averages; evaluation uses the running averages so predictions are deterministic and independent of the batch.',
            },
            {
              question: 'Why do transformers use layer norm rather than batch norm?',
              answerOutline:
                'Sequences have variable length and tokens are not exchangeable across a batch; layer norm normalises each token\'s features independently, works at any batch size and needs no running statistics.',
            },
          ],
        },
        {
          slug: 'optimizers-and-learning-rate-schedules',
          title: 'Optimizers, learning-rate schedules and weight decay',
          summary:
            'SGD with momentum versus Adam and AdamW in practice, the learning rate as the hyperparameter that matters most, warm-up and cosine schedules, the learning-rate range test, and gradient clipping.',
          estimatedMinutes: 120,
          objectives: [
            'Choose between SGD+momentum and AdamW for a given architecture and explain the empirical reasons',
            'Explain why decoupled weight decay (AdamW) differs from L2 regularization under Adam',
            'Run a learning-rate range test and set a one-cycle or warm-up-plus-cosine schedule',
            'Use gradient clipping and explain when it is needed',
            'Tune learning rate, batch size and weight decay jointly and document the interactions',
          ],
          concepts: [
            'SGD with momentum; Nesterov',
            'Adam; bias correction; AdamW decoupled weight decay',
            'Learning rate as the primary hyperparameter; log-scale search',
            'Warm-up; cosine decay; one-cycle; step decay',
            'Learning-rate range test',
            'Batch size and the linear scaling rule',
            'Gradient clipping (norm)',
          ],
          explanation: `The theory of SGD, momentum and Adam is in the machine-learning subject; this lesson is about practice, and the first fact of practice is that the **learning rate** matters more than anything else you will tune. Search it on a log scale (factors of 3) before touching anything else, and re-tune it whenever you change the architecture, batch size or optimizer.

**SGD with momentum** (0.9) remains the best optimizer for convolutional networks on image classification when tuned, generalising slightly better than Adam. **Adam** is far more forgiving and is the default for transformers, RNNs, GANs and anything with sparse or badly scaled gradients. Use **AdamW**, not Adam with L2: under Adam, an L2 penalty is divided by the per-parameter gradient scale and loses its meaning, whereas AdamW decays weights directly, decoupled from the adaptive step. Typical AdamW settings for transformers: learning rate $3 \\times 10^{-4}$, betas $(0.9, 0.95)$, weight decay $0.1$, applied to weight matrices but not to biases or normalisation parameters.

**Schedules** matter almost as much as the peak rate. **Warm-up** (linearly increasing the rate over the first few hundred or thousand steps) prevents the early instability that comes from Adam's unreliable second-moment estimates and from large initial gradients; it is essential for transformers. Then decay, usually **cosine** to near zero, or the **one-cycle** policy (warm up to a high rate, anneal down) that fastai popularised and that often trains in a fraction of the epochs. To find the peak rate, run the **learning-rate range test**: increase the rate exponentially over a few hundred iterations, plot loss against rate, and pick a value somewhat below where the loss starts rising.

**Batch size** interacts: as a rule of thumb, scaling the batch by $k$ allows scaling the learning rate by $k$ (linear scaling, with warm-up) up to a limit where gradient noise stops helping. **Gradient clipping** (rescale the gradient when its norm exceeds a threshold, typically 1.0) tames the rare huge gradients in RNNs and transformers. Read the fastbook chapter and run the range test on your own model before every project.`,
          resources: [
            {
              title: 'fastbook — chapter 16, The Training Process (SGD, momentum, Adam, schedules)',
              url: 'https://github.com/fastai/fastbook',
              type: 'textbook',
              cost: 'free',
              provider: 'fast.ai',
              note: 'Free notebooks on GitHub (16_accel_sgd.ipynb); a paid print edition exists.',
              primary: true,
            },
            {
              title: 'Decoupled Weight Decay Regularization (Loshchilov and Hutter) — AdamW',
              url: 'https://arxiv.org/abs/1711.05101',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICLR 2019',
              note: 'Why L2 and weight decay differ under Adam; the algorithm in Figure 2.',
            },
            {
              title: 'Cyclical Learning Rates for Training Neural Networks (Leslie Smith)',
              url: 'https://arxiv.org/abs/1506.01186',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The learning-rate range test (section 3.3) and the origin of one-cycle.',
            },
            {
              title: 'Accurate, Large Minibatch SGD: Training ImageNet in 1 Hour (Goyal et al.)',
              url: 'https://arxiv.org/abs/1706.02677',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The linear scaling rule and gradual warm-up.',
            },
          ],
          exercises: [
            {
              slug: 'lr-range-test',
              title: 'Learning-rate range test and one-cycle',
              prompt:
                'Implement the range test (exponentially increase the rate from 1e-6 to 10 over 500 iterations, plot smoothed loss vs rate) for a ResNet-ish CNN on CIFAR-10 with SGD+momentum and with AdamW. Pick a peak rate for each from the plot, train 20 epochs with one-cycle, and compare with a constant rate at the same peak and with a constant rate 10x lower. Report test accuracy and curves.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'adam-vs-adamw',
              title: 'L2 vs decoupled weight decay under Adam',
              prompt:
                'Train a small transformer language model (from the later nanoGPT exercise, or an MLP on Fashion-MNIST if you have not reached it) with Adam + L2 penalty and with AdamW at weight-decay values 0, 0.01, 0.1, 1.0. Plot validation loss against decay for both. Show that L2 under Adam barely affects results while AdamW does, and explain why using the update equations.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'batch-size-scaling',
              title: 'Linear scaling rule',
              prompt:
                'On CIFAR-10 with SGD+momentum, train for a fixed number of epochs with batch sizes 32, 128, 512, 2048, scaling the learning rate linearly with batch size and using 5 epochs of warm-up. Report test accuracy, wall-clock time and images/second. Where does the linear scaling rule break down, and what happens without warm-up at the largest batch?',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is L2 regularization not equivalent to weight decay under Adam?',
              answerOutline:
                'Adam divides the gradient (including the L2 term) by a per-parameter running RMS, so the effective decay varies with gradient magnitude; AdamW subtracts a fixed fraction of the weight directly each step.',
            },
            {
              question: 'What does warm-up protect against?',
              answerOutline:
                'Large, noisy early updates when adaptive second-moment estimates are poor and when the loss landscape at initialisation is sharp; without it transformers often diverge at high learning rates.',
            },
            {
              question: 'How do you read a learning-rate range test plot?',
              answerOutline:
                'Loss falls as the rate rises, then flattens and finally explodes; pick a peak rate a few times below the minimum/explosion point, where the loss is still decreasing steeply.',
            },
          ],
          relatedLessons: ['machine-learning/optimization-and-generalization-theory/gradient-descent-and-sgd'],
        },
        {
          slug: 'regularization-and-generalization',
          title: 'Regularization and generalization in deep networks',
          summary:
            'Weight decay, dropout, data augmentation, early stopping and label smoothing, measured by ablation; the puzzle of why overparameterised networks generalise, and what double descent and the flat-minima picture say about it.',
          estimatedMinutes: 120,
          objectives: [
            'Implement dropout (inverted) and explain its ensemble interpretation and train/eval behaviour',
            'Design a data-augmentation policy for images and explain augmentation as encoding invariances',
            'Run a regularization ablation and attribute the generalization gain to each component',
            'Explain why networks that can memorise random labels still generalise on real data (implicit regularization, double descent)',
          ],
          concepts: [
            'Overfitting in deep nets; train/val gap',
            'Weight decay as L2 (or decoupled)',
            'Dropout and inverted dropout; ensemble view',
            'Data augmentation: crops, flips, colour, mixup, cutout, RandAugment',
            'Early stopping',
            'Memorisation of random labels; implicit regularization of SGD',
            'Double descent; flat vs sharp minima',
          ],
          explanation: `Deep networks have far more parameters than training examples and can fit random labels perfectly (Zhang et al. showed a standard CNN reaching zero training error on CIFAR-10 with shuffled labels). Yet with real labels they generalise. Regularization in deep learning is therefore partly about the explicit techniques below and partly about the **implicit** preferences of SGD on these architectures, which is still an active research topic.

The explicit tools. **Weight decay** (AdamW or SGD with L2) is nearly always on, with values $10^{-4}$ for SGD and $0.01$-$0.1$ for AdamW. **Dropout** zeroes each hidden unit with probability $p$ during training and scales the survivors by $1/(1 - p)$ (inverted dropout, so evaluation needs no change); it can be read as training an exponential ensemble of sub-networks with shared weights, and as preventing co-adaptation. It is effective in MLP heads and transformers, less needed in batch-normalised CNNs. **Data augmentation** is the strongest regulariser in vision: random crops, flips and colour jitter tell the model which transformations preserve the label, i.e. encode invariances, and stronger policies (mixup, cutout, RandAugment) keep helping with more epochs. **Early stopping** on validation loss is free. **Label smoothing** was covered in module 1.

The puzzle. Among all the parameter settings that fit the training data, SGD from a small initialisation finds ones with small norm, low complexity and wide basins (**flat minima**), and these generalise. **Double descent** shows the consequence: test error can decrease again as networks grow beyond the point of interpolating the training set, which contradicts the classical bias-variance picture but matches the implicit-regularization story. Practically: bigger models with regularization and augmentation usually beat smaller ones, and more training with a decaying schedule rarely hurts.

Run the ablation: it is the single most informative experiment in this module, and the habit of attributing each gain to a component carries into the capstone.`,
          resources: [
            {
              title: 'Deep Learning (Goodfellow et al.) — chapter 7, Regularization for Deep Learning',
              url: 'https://www.deeplearningbook.org/contents/regularization.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Goodfellow, Bengio, Courville',
              note: 'Sections 7.1 (norm penalties), 7.4 (augmentation), 7.8 (early stopping), 7.12 (dropout).',
              primary: true,
            },
            {
              title: 'Dropout: A Simple Way to Prevent Neural Networks from Overfitting (Srivastava et al.)',
              url: 'https://jmlr.org/papers/v15/srivastava14a.html',
              type: 'article',
              cost: 'free',
              provider: 'JMLR 2014',
            },
            {
              title: 'Deep Double Descent: Where Bigger Models and More Data Hurt (Nakkiran et al.)',
              url: 'https://arxiv.org/abs/1912.02292',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICLR 2020',
              note: 'Model-wise and epoch-wise double descent on CIFAR; a one-hour read with striking figures.',
            },
            {
              title: 'CS231n notes — Neural Networks Part 2: regularization (L2, dropout) and Part 3',
              url: 'https://cs231n.github.io/neural-networks-2/',
              type: 'article',
              cost: 'free',
              provider: 'Stanford CS231n',
            },
          ],
          exercises: [
            {
              slug: 'regularization-ablation',
              title: 'The regularization ablation',
              prompt:
                'Train a ResNet-18-style CNN on CIFAR-10 for 30 epochs starting from no regularization, then adding cumulatively: weight decay 5e-4, random crop + flip, dropout 0.3 before the classifier, label smoothing 0.1, mixup. Report train and test accuracy at each step in a table with the gap. Then run the ablation in reverse (remove one at a time from the full set). Which component matters most, and do the two orderings agree?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'random-labels',
              title: 'Memorising random labels',
              prompt:
                'Train the same CNN on CIFAR-10 with (a) true labels, (b) fully shuffled labels, (c) 20% of labels corrupted. Train until training accuracy reaches 100% (or 100 epochs). Plot training and test accuracy for all three and the number of epochs to fit. Then add weight decay and augmentation and repeat (b): can the network still memorise? Discuss what this says about capacity vs generalization.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'dropout-by-hand',
              title: 'Inverted dropout and the ensemble view',
              prompt:
                'Implement inverted dropout as a function with train/eval modes and verify it matches nn.Dropout statistically. Train an MLP on Fashion-MNIST with p = 0, 0.2, 0.5, 0.8 and plot the train/test gap. Then, for p = 0.5, compare test accuracy of (i) eval-mode deterministic prediction and (ii) averaging 20 stochastic forward passes in train mode (Monte Carlo dropout); report also the calibration of (ii).',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does inverted dropout scale activations by 1/(1-p) during training?',
              answerOutline:
                'So that the expected activation is unchanged and the network can be used at test time without rescaling; the ensemble of sub-networks is approximated by the full network with expected activations.',
            },
            {
              question: 'In what sense is data augmentation a prior?',
              answerOutline:
                'It asserts that the label is invariant to certain transformations (translation, flip, colour shift), expanding the training distribution in exactly those directions; it encodes domain knowledge about which variations are irrelevant.',
            },
            {
              question: 'How can a network that memorises random labels generalise on real labels?',
              answerOutline:
                'Capacity to memorise is not the issue; on real data SGD finds simpler, low-norm, flat solutions first (implicit regularization) because structured patterns are easier to fit than noise.',
            },
          ],
          relatedLessons: ['machine-learning/optimization-and-generalization-theory/bias-variance-and-learning-theory'],
        },
        {
          slug: 'debugging-and-the-training-recipe',
          title: 'Debugging neural networks: a recipe',
          summary:
            'A systematic procedure for getting a network to train: inspect the data, build the pipeline end to end with a tiny model, overfit a single batch, verify the loss at initialisation, then scale up, regularise and tune, reading the curves at every step.',
          estimatedMinutes: 110,
          objectives: [
            'Apply Karpathy\'s recipe in order and explain why each step comes before the next',
            'Use diagnostics: loss at initialisation, overfit-one-batch, gradient norms per layer, update-to-weight ratios, activation statistics',
            'Read training curves to distinguish bugs, bad hyperparameters, underfitting and overfitting',
            'Set up experiment tracking, fixed evaluation and hyperparameter search for a deep-learning project',
          ],
          concepts: [
            'Become one with the data',
            'End-to-end skeleton with a tiny model; fixed seeds',
            'Overfit one batch; expected loss at init',
            'Gradient norms; update/weight ratio; dead units',
            'Loss-curve pathologies: nan, plateau, divergence, train/val gap',
            'Scale up, then regularise, then tune',
            'Experiment tracking and the hyperparameter search budget',
          ],
          explanation: `Neural networks fail silently. A bug in the data pipeline, the loss, or the evaluation produces a model that trains, reports a number, and is wrong. The defence is a **procedure** you follow every time, which is Karpathy's recipe with the diagnostics from this module attached.

**1. Look at the data.** Hours, not minutes. Plot examples with their labels, check class balance, find duplicates, look for corrupted files and leakage. Many failures are data failures.

**2. Build the end-to-end skeleton** with a model too small to be interesting, fixed seeds, a fixed evaluation set and logging. Verify the **loss at initialisation** matches theory ($\\ln K$ for $K$ classes); verify that a human-level baseline and a trivial baseline (predict the mean) give the numbers you expect; verify the input to the model by plotting it *right before it enters the network*, after all transforms.

**3. Overfit one batch.** A model that cannot drive the training loss to zero on 16 examples has a bug, full stop. Increase capacity until it can. This catches wrong losses, broken labels, missing nonlinearities and off-by-one errors in the data loader.

**4. Scale up and underfit.** Use a known-good architecture, Adam at $3 \\times 10^{-4}$, no regularization, and get the training loss down on the full data. Watch **gradient norms** per layer (vanishing or exploding), the **update-to-weight ratio** (should be around $10^{-3}$ per step), and activation statistics (dead ReLUs, saturated norms).

**5. Regularise.** More data, augmentation, weight decay, dropout, early stopping, in that order of effectiveness. **6. Tune** with random search over learning rate, weight decay and architecture width on a budget, tracked. **7. Squeeze** with ensembles and longer training with a decaying schedule.

Learn to read curves: a loss that is \`nan\` means a numerical blow-up (rate too high, missing log-sum-exp, division by zero in normalisation); a flat loss at $\\ln K$ means gradients are not reaching the weights or the rate is too low; a training loss falling with validation flat means a leak-free overfit or a train/eval mismatch; both falling then validation rising means stop earlier or regularise. Keep the recipe as a checklist and use it in the exercise, where you are handed broken projects.`,
          resources: [
            {
              title: 'A Recipe for Training Neural Networks (Karpathy)',
              url: 'https://karpathy.github.io/2019/04/25/recipe/',
              type: 'article',
              cost: 'free',
              provider: 'Andrej Karpathy',
              note: 'The procedure this lesson follows; read it twice.',
              primary: true,
            },
            {
              title: 'CS231n notes — Neural Networks Part 3: Learning and Evaluation (gradient checks, babysitting, hyperparameter search)',
              url: 'https://cs231n.github.io/neural-networks-3/',
              type: 'article',
              cost: 'free',
              provider: 'Stanford CS231n',
            },
            {
              title: 'Deep Learning (Goodfellow et al.) — chapter 11, Practical Methodology',
              url: 'https://www.deeplearningbook.org/contents/guidelines.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Goodfellow, Bengio, Courville',
              note: 'Performance metrics, baselines, when to gather more data, debugging strategies.',
            },
            {
              title: 'Weights & Biases — experiment tracking',
              url: 'https://wandb.ai/site',
              type: 'tool',
              cost: 'freemium',
              provider: 'Weights & Biases',
              note: 'Free for personal use; MLflow (free, self-hosted) is an alternative covered in the machine-learning subject.',
            },
          ],
          exercises: [
            {
              slug: 'recipe-walkthrough',
              title: 'Apply the recipe to a new dataset',
              prompt:
                'Take Oxford-IIIT Pets (37 classes) with a small CNN from scratch and document each step of the recipe: a data-inspection notebook with findings, the expected and measured initial loss, the overfit-one-batch result, per-layer gradient norms and update/weight ratios during the underfit stage, and the regularization and tuning steps with their effect on validation accuracy. Submit the tracked runs and a one-page log.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'diagnose-broken-projects',
              title: 'Diagnose three broken projects',
              prompt:
                'Construct (or exchange with a peer) three broken CIFAR-10 training scripts: one with normalisation applied to training images but not test images, one where the DataLoader shuffles inputs and labels independently, and one with a learning rate that causes nan after a few hundred steps. Without reading the code first, use only the recipe\'s diagnostics (loss at init, overfit one batch, curves, gradient norms, input plotting) to localise each bug. Record the diagnostic that found each.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'curve-gallery',
              title: 'A gallery of training curves',
              prompt:
                'Produce, deliberately, training/validation curves for: healthy training, learning rate too high (divergence), too low (slow), overfitting (gap opens), dead network (flat at ln K), and a train/eval mismatch (train improves, val constant). Annotate each plot with the cause and the fix, and keep the gallery as a reference card.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why overfit a single batch before training on the full dataset?',
              answerOutline:
                'If the model cannot reach near-zero loss on a tiny batch, there is a bug (loss, labels, data path, architecture), not a hyperparameter problem; this isolates bugs from optimization difficulty.',
            },
            {
              question: 'What does the update-to-weight ratio tell you and what value is healthy?',
              answerOutline:
                'The relative size of each step compared to the weights; about 1e-3 per step is typical. Much larger means the rate is too high; much smaller means learning is stalled.',
            },
            {
              question: 'Training loss decreases but validation accuracy never moves above chance. Name three causes.',
              answerOutline:
                'Validation data preprocessed differently (normalisation mismatch), labels misaligned in the validation loader, model.eval() missing with batch-norm issues, or the validation set drawn from a different distribution.',
            },
          ],
        },
      ],
      project: {
        slug: 'cifar10-from-scratch-with-ablations',
        title: 'Module project: CIFAR-10 from scratch to 94% with ablations',
        description:
          'Convolution comes in Module 3, so use a ready-made CIFAR-style ResNet-18 as a black box and focus on training it. Train it on CIFAR-10 from scratch with everything in this module: Kaiming init, batch norm, SGD+momentum with one-cycle, weight decay, augmentation, label smoothing. Reach at least 93-94% test accuracy within a fixed budget (e.g. 30 epochs on one GPU) and produce an ablation table attributing the accuracy to each component, with tracked runs.',
        deliverables: [
          'Training code with config files and tracked runs for every ablation',
          'Ablation table (cumulative and leave-one-out) with mean and standard deviation over 3 seeds',
          'The learning-rate range test plot and a two-page report applying the recipe',
        ],
        estimatedHours: 12,
      },
    },
    {
      slug: 'convolutional-networks-and-vision',
      title: 'Convolutional Networks and Vision',
      description:
        'Convolution as a learned, translation-equivariant feature extractor; the architectures from LeNet to ResNet; transfer learning as the default for practical vision; and the tasks beyond classification plus the tools for seeing what a CNN learned.',
      lessons: [
        {
          slug: 'convolution-and-cnn-building-blocks',
          title: 'Convolution and the building blocks of CNNs',
          summary:
            'Why convolution (weight sharing, locality, translation equivariance) is the right inductive bias for images; kernels, padding, stride, channels, pooling and receptive fields; parameter and FLOP counting; convolution implemented from scratch.',
          estimatedMinutes: 130,
          objectives: [
            'Explain the three ideas behind convolution (local connectivity, weight sharing, equivariance) and why they beat fully connected layers on images',
            'Compute output shapes, parameter counts, FLOPs and receptive fields for stacks of conv and pooling layers',
            'Implement 2D convolution (naive loops, then im2col as a matrix multiply) and verify it against torch.nn.functional.conv2d',
            'Explain 1x1 convolutions, depthwise separable convolutions and dilated convolutions and when each is used',
          ],
          concepts: [
            'Convolution vs cross-correlation; kernels, channels',
            'Padding, stride, output size formula',
            'Weight sharing; translation equivariance; locality',
            'Pooling (max, average, global average)',
            'Receptive field',
            'Parameter and FLOP counting',
            'im2col: convolution as matrix multiplication',
            '1x1, depthwise separable, dilated and transposed convolutions',
          ],
          explanation: `A fully connected layer on a $224 \\times 224$ colour image has 150,000 inputs per neuron; a layer of a thousand such neurons has 150 million parameters and no idea that a cat in the corner is the same as a cat in the middle. **Convolution** fixes both. A **kernel** (say $3 \\times 3 \\times C_{in}$) slides over the image computing a dot product at each position, producing one output channel; $C_{out}$ kernels produce $C_{out}$ channels. Three ideas: **locality** (each output looks at a small patch), **weight sharing** (the same kernel at every position, so parameters are $k^2 C_{in} C_{out}$ regardless of image size), and **translation equivariance** (shift the input, the output shifts). These are strong, correct priors for images, which is why CNNs learn from far fewer examples than MLPs.

The bookkeeping: with input size $n$, kernel $k$, padding $p$ and stride $s$, the output size is $\\lfloor(n + 2p - k)/s\\rfloor + 1$; "same" padding ($p = (k-1)/2$, stride 1) preserves size. Stride and **pooling** (max or average over $2 \\times 2$ windows) downsample, trading resolution for channels and growing the **receptive field**, the region of the input that influences one output. Deep stacks of small kernels have large receptive fields with few parameters, the VGG insight. **Global average pooling** at the end replaces a huge fully connected layer and makes the network accept any input size.

Implementation: a naive 6-nested-loop convolution is correct and slow; **im2col** unrolls each patch into a column so convolution becomes one big matrix multiply, which is what cuDNN does (with smarter algorithms such as Winograd and FFT for larger kernels). Do both and check against PyTorch.

Variants you will meet: **1x1 convolutions** mix channels without spatial extent (bottlenecks in ResNet, Inception); **depthwise separable** convolutions factor a $k \\times k \\times C$ kernel into per-channel spatial and 1x1 channel steps, cutting FLOPs by nearly $k^2$ (MobileNet); **dilated** convolutions enlarge the receptive field without downsampling (segmentation); **transposed** convolutions upsample (decoders, GANs). Read the CS231n convnet notes and D2L chapter 7, then build the pieces.`,
          resources: [
            {
              title: 'CS231n notes — Convolutional Neural Networks: architectures, convolution/pooling layers',
              url: 'https://cs231n.github.io/convolutional-networks/',
              type: 'article',
              cost: 'free',
              provider: 'Stanford CS231n',
              note: 'The output-size arithmetic, parameter counting and the im2col discussion.',
              primary: true,
            },
            {
              title: 'Dive into Deep Learning — chapter 7, Convolutional Neural Networks',
              url: 'https://d2l.ai/chapter_convolutional-neural-networks/index.html',
              type: 'textbook',
              cost: 'free',
              provider: 'D2L',
              note: 'From-scratch convolution, padding/stride, channels, pooling, LeNet.',
            },
            {
              title: 'Deep Learning (Goodfellow et al.) — chapter 9, Convolutional Networks',
              url: 'https://www.deeplearningbook.org/contents/convnets.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Goodfellow, Bengio, Courville',
              note: 'Sections 9.1-9.5 on the motivation (sparse interactions, parameter sharing, equivariance).',
            },
            {
              title: 'A guide to convolution arithmetic for deep learning (Dumoulin and Visin)',
              url: 'https://arxiv.org/abs/1603.07285',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Every padding/stride/dilation/transposed case with animations (the GitHub repo has the GIFs).',
            },
          ],
          exercises: [
            {
              slug: 'conv-from-scratch',
              title: 'Convolution from scratch two ways',
              prompt:
                'Implement conv2d with arbitrary kernel size, stride, padding and channels (a) with explicit loops and (b) with im2col and a single matmul. Verify both against F.conv2d on random inputs to 1e-5. Time (a), (b) and PyTorch on a 64x3x32x32 batch with 64 3x3 kernels. Then implement the backward pass of (b) (gradients for input and kernel via the transposed im2col) and check against autograd.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'shape-arithmetic',
              title: 'Shapes, parameters, FLOPs, receptive fields',
              prompt:
                'For a VGG-style stack (conv3x3-64, conv3x3-64, pool, conv3x3-128, conv3x3-128, pool, conv3x3-256 x3, pool, fc-4096, fc-10) on 32x32x3 input, compute by hand the output shape, parameters and multiply-adds of every layer and the receptive field at each stage. Verify with PyTorch (torchinfo or hooks). Which layer dominates parameters and which dominates FLOPs, and what happens to each if you replace the fc layers with global average pooling?',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'equivariance-and-pooling',
              title: 'Test equivariance and invariance empirically',
              prompt:
                'Train a small CNN on MNIST. Shift test digits by 0-8 pixels and plot accuracy against shift for (i) the CNN, (ii) an MLP of similar parameter count, (iii) the CNN with global average pooling instead of flatten. Then show the feature maps of a conv layer for an image and its shifted copy and measure how closely they match after shifting back. Explain equivariance vs invariance from the results.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How many parameters does a 3x3 convolution from 64 to 128 channels have, and how does this depend on image size?',
              answerOutline:
                '3*3*64*128 + 128 biases = 73,856; independent of image size because of weight sharing (FLOPs scale with image area).',
            },
            {
              question: 'What is the receptive field of two stacked 3x3 convolutions and why is this preferable to one 5x5?',
              answerOutline:
                '5x5. Two 3x3 layers have 18 C² weights vs 25 C² for one 5x5, plus an extra nonlinearity, so they are cheaper and more expressive.',
            },
            {
              question: 'What does a 1x1 convolution do?',
              answerOutline:
                'A per-pixel linear map across channels (a shared fully connected layer over channels); it changes channel count cheaply and adds a nonlinearity, used in bottlenecks.',
            },
          ],
        },
        {
          slug: 'cnn-architectures-and-resnets',
          title: 'CNN architectures: from LeNet to ResNet',
          summary:
            'The design lineage LeNet, AlexNet, VGG, Inception, ResNet; why depth failed before residual connections and why skip connections fix optimization; batch norm in CNNs; modern variants (ResNeXt, EfficientNet, ConvNeXt) and training a ResNet on CIFAR-10.',
          estimatedMinutes: 130,
          objectives: [
            'Trace the architectural ideas that each landmark network introduced and the problem each solved',
            'Explain the degradation problem and how residual connections turn a deep network into a sum of shallow paths that is easy to optimise',
            'Implement a ResNet with basic and bottleneck blocks and train it on CIFAR-10',
            'Compare architectures at matched parameter or FLOP budgets and describe the accuracy-compute trade-off',
          ],
          concepts: [
            'LeNet, AlexNet, VGG: depth and small kernels',
            'Inception: multi-branch, 1x1 bottlenecks',
            'Degradation problem; identity mapping',
            'Residual block; pre-activation; bottleneck block',
            'Batch norm placement; downsampling with stride',
            'ResNeXt, EfficientNet compound scaling, ConvNeXt',
            'Accuracy vs FLOPs/latency; architecture choice',
          ],
          explanation: `The history of CNN architectures is a sequence of answers to "why does making it deeper stop helping?". **LeNet** (1998) established conv-pool-conv-pool-fc on digits. **AlexNet** (2012) scaled that to ImageNet with ReLU, dropout, GPUs and augmentation, and started the modern era. **VGG** (2014) showed that stacks of $3 \\times 3$ convolutions, doubling channels at each halving of resolution, beat larger kernels; its uniform design is still a template. **Inception/GoogLeNet** ran parallel branches of different kernel sizes and used $1 \\times 1$ bottlenecks to keep compute manageable, introducing the idea of designing for a FLOP budget.

Then depth stalled: a 56-layer plain network trained *worse* than a 20-layer one, even on the training set, which rules out overfitting. This **degradation problem** is an optimization failure: the deeper network cannot even learn to be the identity on its extra layers. **ResNet** (2015) adds a **skip connection** so each block computes $\\mathbf{x} + F(\\mathbf{x})$: learning the identity is now learning $F = 0$, which is easy, and gradients flow directly through the skip paths. A residual network behaves like an ensemble of many shallow paths, and 152-layer (later 1000-layer) networks train without trouble. Batch norm after each convolution (or before, in the pre-activation variant) and stride-2 convolutions for downsampling complete the recipe; **bottleneck blocks** ($1 \\times 1$ reduce, $3 \\times 3$, $1 \\times 1$ expand) keep deep models affordable.

Later designs refine rather than replace: **ResNeXt** adds grouped convolutions, **EfficientNet** scales depth, width and resolution together under a budget, and **ConvNeXt** modernises ResNet with transformer-era training tricks (large kernels, layer norm, GELU, AdamW) and matches vision transformers. The practical lesson: choose an architecture by its accuracy at your FLOP or latency budget, almost always pretrained (next lesson), and spend your effort on data and training.

Read the ResNet paper (it is short and clear) and D2L chapter 8, then implement a ResNet-18 for CIFAR-10 and run the plain-vs-residual depth experiment yourself.`,
          resources: [
            {
              title: 'Deep Residual Learning for Image Recognition (He et al.)',
              url: 'https://arxiv.org/abs/1512.03385',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / CVPR 2016',
              note: 'Figure 1 (degradation), section 3 (residual learning) and the CIFAR-10 experiments in 4.2.',
              primary: true,
            },
            {
              title: 'Dive into Deep Learning — chapter 8, Modern Convolutional Neural Networks',
              url: 'https://d2l.ai/chapter_convolutional-modern/index.html',
              type: 'textbook',
              cost: 'free',
              provider: 'D2L',
              note: 'AlexNet, VGG, NiN, GoogLeNet, batch norm, ResNet and DenseNet with code.',
            },
            {
              title: 'CS231n notes — case studies (LeNet, AlexNet, VGG, GoogLeNet, ResNet) and the course lectures',
              url: 'https://cs231n.github.io/convolutional-networks/',
              type: 'article',
              cost: 'free',
              provider: 'Stanford CS231n',
              note: 'The "Case studies" section; the CS231n lecture on CNN architectures is on the course site.',
            },
            {
              title: 'torchvision models — pretrained architectures and their accuracy/FLOP tables',
              url: 'https://pytorch.org/vision/stable/models.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PyTorch',
              note: 'The tables of ImageNet accuracy, parameters and GFLOPs for every architecture family.',
            },
          ],
          exercises: [
            {
              slug: 'resnet-cifar',
              title: 'ResNet-18 on CIFAR-10',
              prompt:
                'Implement BasicBlock and a ResNet-18 for 32x32 inputs (3x3 stem, no max-pool). Train with the module-2 recipe (SGD+momentum, one-cycle, weight decay, crop/flip) for 30 epochs and report test accuracy (target above 93%). Then add bottleneck blocks to make a ResNet-50-style model and compare accuracy, parameters, FLOPs and epoch time.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'degradation-experiment',
              title: 'Reproduce the degradation problem',
              prompt:
                'Build plain (no skip) and residual networks of depth 20, 56 and 110 following the ResNet paper\'s CIFAR design. Train each for 20 epochs with identical settings and plot training and test error vs epochs. Show that plain-56 has higher training error than plain-20 while residual-56 and residual-110 improve. Record gradient norms at the first conv layer for plain-56 vs residual-56 to explain the difference.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'architecture-at-a-budget',
              title: 'Architectures at a matched budget',
              prompt:
                'Using torchvision\'s accuracy/FLOP tables, plot ImageNet top-1 accuracy against GFLOPs and against parameters for ResNet, ResNeXt, EfficientNet, MobileNet, ConvNeXt and ViT families. Measure actual CPU and GPU latency at batch size 1 and 64 for five of them. Which family is best at 1 GFLOP, at 4 GFLOPs, and at lowest latency? Explain why FLOPs and latency disagree.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the degradation problem and why is it not overfitting?',
              answerOutline:
                'Deeper plain networks have higher *training* error than shallower ones; overfitting would show lower training and higher test error. It is an optimization failure to represent the identity in extra layers.',
            },
            {
              question: 'Why do residual connections make deep networks easier to optimise?',
              answerOutline:
                'Each block learns a residual F(x) added to x, so the identity is the easy default; gradients reach early layers through the skip paths; the network behaves like an ensemble of shallower paths.',
            },
            {
              question: 'What does a bottleneck block do and why?',
              answerOutline:
                '1x1 reduce channels, 3x3 convolve at reduced width, 1x1 expand back; this cuts parameters and FLOPs roughly fourfold for the same depth, enabling ResNet-50/101/152.',
            },
          ],
        },
        {
          slug: 'transfer-learning-and-fine-tuning',
          title: 'Transfer learning and fine-tuning',
          summary:
            'Pretrained features as the default starting point: feature extraction versus fine-tuning, discriminative learning rates, progressive unfreezing and resizing, the fast.ai workflow, and when transfer helps or hurts.',
          estimatedMinutes: 120,
          objectives: [
            'Fine-tune a pretrained ResNet or ConvNeXt on a small dataset to state-of-the-art accuracy in minutes with fast.ai and with plain PyTorch',
            'Choose between linear probing, partial and full fine-tuning based on dataset size and domain similarity, and justify with experiments',
            'Apply discriminative learning rates, gradual unfreezing, progressive resizing and test-time augmentation',
            'Explain what pretrained features capture (and what they do not) and when training from scratch is preferable',
          ],
          concepts: [
            'Pretraining; feature hierarchy; linear probing vs fine-tuning',
            'Freezing and unfreezing; discriminative learning rates',
            'Replacing the head; batch-norm statistics during fine-tuning',
            'Progressive resizing; test-time augmentation',
            'Domain similarity and dataset size trade-offs',
            'Catastrophic forgetting',
            'fastai Learner, DataBlock, fine_tune, lr_find',
          ],
          explanation: `A network trained on ImageNet has learned edge detectors, textures, parts and objects. Those features transfer: for most vision problems with fewer than a million images, **fine-tuning** a pretrained model beats training from scratch by a large margin and converges in a few epochs. This is the single most useful practical fact in the subject, and it is why fast.ai teaches it in lesson one.

The spectrum of transfer. **Linear probing** freezes the backbone and trains only a new head: fast, safe with tiny datasets, and a good diagnostic of feature quality. **Full fine-tuning** updates everything with a small learning rate and is best when you have thousands of examples or a domain far from ImageNet (medical, satellite). In between, **gradual unfreezing** trains the head first, then unfreezes later layers, then earlier ones, using **discriminative learning rates** (smaller for early layers, whose generic features need little change, larger for late layers). Keep batch-norm layers in eval mode or with a low momentum when batches are small, or their statistics drift.

fast.ai packages this: \`DataBlock\` describes the data, \`vision_learner\` builds a model with a pretrained backbone and a new head, \`lr_find\` runs the range test, and \`fine_tune(epochs)\` does one epoch of frozen training then unfreezes with discriminative rates and one-cycle. **Progressive resizing** (train at low resolution first, then higher) and **test-time augmentation** (average predictions over flips/crops) each add a point or two for free. Reproduce the workflow in plain PyTorch once so you know what each line does.

When does transfer fail? When the domain is radically different (spectrograms, X-rays can still work, but less), when the input statistics differ (different channel count or normalisation), and when the pretrained model's biases are harmful (texture bias, dataset artefacts). Even then, pretrained initialisation usually helps optimization. With self-supervised pretraining (module 7) the source of features no longer even requires labels. Work through fastbook chapters 1, 2 and 5 and fine-tune on Oxford Pets and Imagenette.`,
          resources: [
            {
              title: 'fast.ai Practical Deep Learning for Coders — lessons 1-2 and the fastbook chapters 1, 2, 5',
              url: 'https://course.fast.ai/',
              type: 'course',
              cost: 'free',
              provider: 'fast.ai',
              note: 'Lesson 1 fine-tunes a pet classifier; chapter 5 (pet breeds) covers discriminative learning rates and unfreezing.',
              primary: true,
            },
            {
              title: 'fastbook (the course notebooks)',
              url: 'https://github.com/fastai/fastbook',
              type: 'textbook',
              cost: 'free',
              provider: 'fast.ai',
              note: 'Notebooks 01_intro, 02_production, 05_pet_breeds, 07_sizing_and_tta.',
            },
            {
              title: 'CS231n notes — Transfer Learning',
              url: 'https://cs231n.github.io/transfer-learning/',
              type: 'article',
              cost: 'free',
              provider: 'Stanford CS231n',
              note: 'The four-quadrant rule of thumb (dataset size x domain similarity).',
            },
            {
              title: 'Imagenette and Imagewoof (fast.ai)',
              url: 'https://github.com/fastai/imagenette',
              type: 'dataset',
              cost: 'free',
              provider: 'fast.ai',
              note: 'Small ImageNet subsets for fast experiments, with leaderboards to compare against.',
            },
          ],
          exercises: [
            {
              slug: 'fine-tune-pets',
              title: 'Fine-tune on Oxford Pets, two ways',
              prompt:
                'With fastai, fine-tune a pretrained ResNet-34 on Oxford-IIIT Pets (37 breeds) using lr_find and fine_tune(3); report error rate (target below 7%). Then reproduce the same in plain PyTorch: replace the head, train head-only for 1 epoch, unfreeze with discriminative rates (backbone 1/10 of head), one-cycle for 3 epochs. Match the fastai result within 1 point and document what fastai did that you had to write.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'probe-vs-finetune',
              title: 'Linear probe vs fine-tune vs scratch across data sizes',
              prompt:
                'On Imagenette, subsample the training set to 1%, 10% and 100%. For each, train (a) from scratch, (b) linear probe on frozen pretrained features, (c) full fine-tuning. Plot test accuracy against data fraction for the three. Then repeat (b) and (c) on a dissimilar domain (e.g. a small medical or satellite dataset from Kaggle) and discuss how the crossover changes.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tta-and-resizing',
              title: 'Progressive resizing and test-time augmentation',
              prompt:
                'Fine-tune on Imagewoof at 128px for 3 epochs then 224px for 3 epochs, and compare against 224px for 6 epochs: accuracy and total time. Then add TTA (average over original + horizontal flip + 4 corner crops) and report the gain and the inference-time cost. Finally, show one image where TTA changes the prediction and explain why.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When should you freeze the backbone and train only the head?',
              answerOutline:
                'Very small datasets or domains similar to the pretraining data, where updating millions of weights would overfit; also as a quick diagnostic of feature quality.',
            },
            {
              question: 'Why use smaller learning rates for earlier layers during fine-tuning?',
              answerOutline:
                'Early layers hold generic features (edges, textures) that transfer well and should change little; later layers are task-specific and need more adaptation. Large rates on early layers risk catastrophic forgetting.',
            },
            {
              question: 'What does fastai\'s fine_tune do under the hood?',
              answerOutline:
                'Trains the new head with the backbone frozen for one epoch (one-cycle), then unfreezes everything and trains with discriminative learning rates and one-cycle for the requested epochs.',
            },
          ],
        },
        {
          slug: 'vision-tasks-and-interpretability',
          title: 'Beyond classification: segmentation, detection and seeing what CNNs learn',
          summary:
            'Dense prediction with encoder-decoder networks (U-Net), the structure of object detectors, and interpretability tools (saliency, Grad-CAM, feature visualisation) alongside adversarial examples that show what the features really respond to.',
          estimatedMinutes: 120,
          objectives: [
            'Implement a U-Net and train it for semantic segmentation with the right loss (cross-entropy / Dice) and metric (IoU)',
            'Describe the anatomy of modern object detectors (anchors or anchor-free, feature pyramids, NMS) and fine-tune one with torchvision',
            'Produce saliency maps, Grad-CAM heatmaps and feature visualisations for a trained CNN and interpret them critically',
            'Generate adversarial examples with FGSM/PGD and explain what they reveal about the learned features and about robustness',
          ],
          concepts: [
            'Semantic segmentation; encoder-decoder; U-Net skip connections',
            'Dice loss; intersection over union',
            'Object detection: region proposals, anchors, feature pyramids, NMS, mAP',
            'Saliency maps; Grad-CAM',
            'Feature visualisation by optimisation',
            'Adversarial examples: FGSM, PGD; adversarial training',
            'Shortcut learning and dataset bias',
          ],
          explanation: `Classification gives one label per image; most applications want more. **Semantic segmentation** labels every pixel. The standard architecture is an **encoder-decoder**: a CNN that downsamples to a semantic bottleneck, then a decoder that upsamples (transposed convolutions or interpolation plus convolution) back to full resolution. **U-Net** adds skip connections from each encoder stage to the matching decoder stage, so fine spatial detail lost in downsampling is recovered; it dominates biomedical imaging and most segmentation work. Train with per-pixel cross-entropy, often combined with **Dice loss** (which handles class imbalance between foreground and background), and report **intersection over union** per class. **Object detection** adds box regression: two-stage detectors (Faster R-CNN) propose regions and classify them; one-stage detectors (RetinaNet, YOLO, FCOS) predict boxes densely on a **feature pyramid** and apply **non-maximum suppression**; the metric is mean average precision over IoU thresholds. Fine-tuning torchvision's detectors on a custom dataset is the practical path.

**Interpretability** asks what the network responds to. **Saliency** is the gradient of the class score with respect to input pixels; it is noisy but cheap. **Grad-CAM** weights the last convolutional feature maps by the gradient of the class score, producing a coarse heatmap of where the evidence is; it reveals **shortcut learning**, such as a "wolf" classifier that looks at snow. **Feature visualisation** optimises an input to maximise a unit's activation, with regularisation to keep it natural, and shows the edge-texture-part hierarchy directly.

**Adversarial examples** are the sobering counterpart: a perturbation imperceptible to humans, found by a gradient step on the loss (**FGSM**) or several (**PGD**), flips the prediction with high confidence. They show that the features networks use are real but not the ones humans use, and they transfer between models. **Adversarial training** on PGD examples is the only reliable defence and costs accuracy. The exercises have you build U-Net, run Grad-CAM to hunt for shortcuts in your own model, and attack it.`,
          resources: [
            {
              title: 'U-Net: Convolutional Networks for Biomedical Image Segmentation (Ronneberger et al.)',
              url: 'https://arxiv.org/abs/1505.04597',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / MICCAI 2015',
              primary: true,
            },
            {
              title: 'Dive into Deep Learning — chapter 14, Computer Vision (augmentation, fine-tuning, detection, segmentation)',
              url: 'https://d2l.ai/chapter_computer-vision/index.html',
              type: 'textbook',
              cost: 'free',
              provider: 'D2L',
              note: 'Anchors, multiscale detection, SSD, FCN segmentation, with code.',
            },
            {
              title: 'Grad-CAM: Visual Explanations from Deep Networks via Gradient-based Localization (Selvaraju et al.)',
              url: 'https://arxiv.org/abs/1610.02391',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICCV 2017',
            },
            {
              title: 'Feature Visualization (Olah, Mordvintsev, Schubert) — Distill',
              url: 'https://distill.pub/2017/feature-visualization/',
              type: 'interactive',
              cost: 'free',
              provider: 'Distill',
            },
            {
              title: 'Explaining and Harnessing Adversarial Examples (Goodfellow, Shlens, Szegedy) — FGSM',
              url: 'https://arxiv.org/abs/1412.6572',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICLR 2015',
            },
          ],
          exercises: [
            {
              slug: 'unet-segmentation',
              title: 'U-Net for pet segmentation',
              prompt:
                'Implement a U-Net (4 down/up stages, skip concatenations) and train it on the Oxford-IIIT Pets trimap masks (3 classes). Compare cross-entropy alone vs cross-entropy plus Dice loss by mean IoU on the validation set. Show predictions for the five worst-IoU images and categorise the failures. Then replace the encoder with a pretrained ResNet-34 and report the IoU gain.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'gradcam-shortcut-hunt',
              title: 'Grad-CAM shortcut hunt',
              prompt:
                'Implement Grad-CAM with forward/backward hooks on your fine-tuned pet classifier. Produce heatmaps for 30 correctly and 30 incorrectly classified images. Then construct a dataset with a planted shortcut (e.g. add a small watermark to all images of one class), fine-tune, verify high test accuracy on watermarked test data and low accuracy on clean data, and show Grad-CAM pointing at the watermark.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'adversarial-attacks',
              title: 'FGSM and PGD attacks and transfer',
              prompt:
                'Implement FGSM and 10-step PGD (L∞, ε = 8/255) against your CIFAR-10 ResNet. Plot accuracy against ε for both. Show five adversarial images next to their originals with the perturbation amplified. Then test whether adversarial examples crafted on your model fool a different architecture (transferability) and, as a stretch, adversarially train for 10 epochs and report clean vs robust accuracy.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do U-Net skip connections improve segmentation?',
              answerOutline:
                'The encoder bottleneck loses spatial precision; concatenating encoder features at each resolution gives the decoder access to fine detail for sharp boundaries while keeping semantic context.',
            },
            {
              question: 'What does Grad-CAM compute and what is its main limitation?',
              answerOutline:
                'A weighted sum of the last conv layer\'s feature maps, weights being the spatially averaged gradients of the class score; it is coarse (last-layer resolution) and shows where, not what, the evidence is.',
            },
            {
              question: 'Why do adversarial examples transfer between models?',
              answerOutline:
                'Different models trained on similar data learn similar non-robust but predictive features; perturbations aligned with those features fool any model that relies on them.',
            },
          ],
        },
      ],
      project: {
        slug: 'vision-application-end-to-end',
        title: 'Module project: a vision application with transfer learning and interpretability',
        description:
          'Build a classifier or segmenter for a real dataset of your choosing (Kaggle, iNaturalist subset, a medical or satellite set). Fine-tune a pretrained backbone, compare against from-scratch training, run Grad-CAM to audit for shortcuts, test robustness to shifts and perturbations, and deploy a demo with Gradio.',
        deliverables: [
          'Fine-tuned model with a results table (scratch vs probe vs fine-tune) and confidence intervals over seeds',
          'A Grad-CAM audit report on at least 50 images with a shortcut analysis',
          'A robustness section: accuracy under corruptions (blur, noise, brightness) and FGSM',
          'A public Gradio demo',
        ],
        estimatedHours: 12,
      },
    },
    {
      slug: 'sequence-models-and-transformers',
      title: 'Sequence Models and Transformers',
      description:
        'Language modelling from n-grams to GPT: tokens and embeddings, recurrent networks and their limits, attention and the transformer built from scratch, pretraining and fine-tuning of modern language models, and generation and evaluation.',
      lessons: [
        {
          slug: 'tokens-embeddings-and-language-modelling',
          title: 'Tokens, embeddings and neural language modelling',
          summary:
            'Language modelling as next-token prediction, from counting bigrams to an MLP over learned embeddings (Bengio 2003) following makemore; perplexity, context windows and tokenisation with byte-pair encoding.',
          estimatedMinutes: 130,
          objectives: [
            'Define a language model as a distribution over sequences via next-token prediction and evaluate it with cross-entropy and perplexity',
            'Build a bigram model by counting and show it is equivalent to a trained one-layer network',
            'Implement an embedding table and an MLP language model with a fixed context, and sample from it',
            'Explain tokenisation choices (characters, words, subwords) and implement byte-pair encoding',
          ],
          concepts: [
            'Autoregressive factorisation; next-token prediction',
            'Cross-entropy and perplexity for sequences',
            'Bigram counts as a neural network',
            'Embeddings; lookup tables as one-hot matmuls',
            'Fixed-context MLP language model (Bengio et al.)',
            'Sampling with temperature',
            'Tokenisation: characters, words, subwords; byte-pair encoding',
          ],
          explanation: `A **language model** assigns probability to a sequence by the chain rule: $p(x_1, \\ldots, x_T) = \\prod_t p(x_t \\mid x_{<t})$. Every model in this module, up to GPT, is a way of computing the conditional $p(x_t \\mid x_{<t})$, trained by minimising cross-entropy on the next token, and evaluated by **perplexity** $e^{\\text{loss}}$, the effective branching factor. The same framing covers DNA, music, code and actions.

Start with characters, as makemore does. A **bigram** model is a table of counts $N[a, b]$, normalised per row; it is also a one-layer network whose input is a one-hot character and whose weights, after training with cross-entropy, converge to the log-counts. That equivalence is the bridge from statistics to neural networks. Longer contexts make count tables sparse ($27^k$ entries), which is why **neural** language models won: an **embedding** table maps each token to a dense vector (a lookup is a one-hot times a matrix), the context's embeddings are concatenated and fed to an MLP, and the softmax output gives the next-token distribution. This is the Bengio et al. (2003) model and makemore parts 2-5 build it with care about initialisation and batch norm. Similar tokens get similar embeddings because they predict similar continuations: the first learned representation of meaning. **Sampling** with a temperature exposes the model's knowledge; low temperature gives the mode, high temperature gives noise.

**Tokenisation** decides what the sequence is. Characters give tiny vocabularies and long sequences; words give huge vocabularies and unknown words; **subword** schemes such as **byte-pair encoding** iteratively merge the most frequent adjacent pairs to build a vocabulary of a few tens of thousands of pieces, so common words are one token and rare words are several. GPT-style models use byte-level BPE. Tokenisation causes many well-known failures of language models (arithmetic, spelling, non-English text get far more tokens), so implement BPE yourself with Karpathy's minbpe lecture to understand the artefacts. Work through makemore parts 1-2 and the tokeniser lecture, with names.txt and Tiny Shakespeare as data.`,
          resources: [
            {
              title: 'Neural Networks: Zero to Hero — makemore parts 1-2 (bigram, MLP language model) and the tokeniser lecture',
              url: 'https://karpathy.ai/zero-to-hero.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Andrej Karpathy',
              note: 'Lectures 2, 3 and "Let\'s build the GPT Tokenizer".',
              primary: true,
            },
            {
              title: 'makemore repository (names.txt and reference code)',
              url: 'https://github.com/karpathy/makemore',
              type: 'documentation',
              cost: 'free',
              provider: 'Andrej Karpathy',
            },
            {
              title: 'minbpe — minimal byte-pair encoding',
              url: 'https://github.com/karpathy/minbpe',
              type: 'documentation',
              cost: 'free',
              provider: 'Andrej Karpathy',
              note: 'The reference implementation and exercise progression for BPE.',
            },
            {
              title: 'Stanford CS224n — Natural Language Processing with Deep Learning (lectures 1-5)',
              url: 'https://web.stanford.edu/class/cs224n/',
              type: 'course',
              cost: 'free',
              provider: 'Stanford',
              note: 'Word vectors, neural classifiers and language models; slides and videos public.',
            },
          ],
          exercises: [
            {
              slug: 'bigram-counts-vs-network',
              title: 'Bigram: counting vs gradient descent',
              prompt:
                'On names.txt, build the 27x27 bigram count table with smoothing and compute the negative log-likelihood per character. Then train a one-layer network (one-hot in, 27 logits out) with cross-entropy and show its loss converges to the same value and its weights to the log-counts up to a constant. Sample 20 names from each and compare.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'mlp-language-model',
              title: 'MLP language model with embeddings',
              prompt:
                'Implement the Bengio-style model: context of 3 characters, 10-dim embeddings, hidden layer 200, on names.txt with train/val/test splits. Tune learning rate with a range test and reach validation loss below 2.1. Plot the 2D embeddings (or PCA of them) and identify clusters (vowels). Vary context length 1-8 and embedding size 2-50 and tabulate validation loss. Sample names at temperatures 0.5, 1.0, 1.5.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'bpe-from-scratch',
              title: 'Byte-pair encoding from scratch',
              prompt:
                'Implement BPE training (merge the most frequent adjacent byte pair repeatedly to a vocabulary of 512) and encode/decode on Tiny Shakespeare; verify decode(encode(x)) == x on every line. Report compression ratio (bytes per token). Then tokenise an English sentence, a Python snippet and a sentence in another script with your tokeniser and with GPT-2\'s (via tiktoken) and compare token counts; explain why non-English text costs more.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does perplexity measure and what is its value for a uniform model over V tokens?',
              answerOutline:
                'exp(average cross-entropy per token): the effective number of equally likely choices per token. For a uniform model it equals V.',
            },
            {
              question: 'Why does a bigram count table fail for long contexts and how do embeddings fix it?',
              answerOutline:
                'The table has V^k entries, almost all unseen; embeddings share statistics across similar tokens and contexts so the model generalises to unseen combinations.',
            },
            {
              question: 'Give two failure modes of language models that are caused by tokenisation.',
              answerOutline:
                'Arithmetic and spelling (digits and letters split inconsistently), and poor efficiency/quality on languages or code that are fragmented into many tokens.',
            },
          ],
        },
        {
          slug: 'recurrent-networks-and-lstms',
          title: 'Recurrent networks, backpropagation through time and LSTMs',
          summary:
            'Processing sequences with a hidden state: vanilla RNNs, backpropagation through time, why gradients vanish and explode, gating in LSTMs and GRUs, and training a character-level RNN on Tiny Shakespeare.',
          estimatedMinutes: 120,
          objectives: [
            'Implement a vanilla RNN forward pass and backpropagation through time, and explain truncated BPTT',
            'Derive why the gradient through T steps involves a product of T Jacobians and hence vanishes or explodes',
            'Explain the LSTM cell (forget, input, output gates, cell state) and why the additive cell path preserves gradients',
            'Train a character-level LSTM language model and compare it with the fixed-context MLP',
          ],
          concepts: [
            'Hidden state; recurrence; parameter sharing over time',
            'Backpropagation through time; truncation',
            'Vanishing and exploding gradients in RNNs; gradient clipping',
            'LSTM: gates, cell state, constant error carousel',
            'GRU',
            'Bidirectional and stacked RNNs; sequence-to-sequence with encoder-decoder',
            'Limits: sequential computation, long-range dependencies',
          ],
          explanation: `The fixed-context MLP cannot see beyond its window. A **recurrent neural network** keeps a **hidden state** $\\mathbf{h}_t = \\tanh(W_h\\mathbf{h}_{t-1} + W_x\\mathbf{x}_t + \\mathbf{b})$ that summarises everything so far, with the same weights at every step, so the context is unbounded in principle. Unrolled over time, an RNN is a deep network with shared weights, and training it is **backpropagation through time**: run forward over the sequence, then backward, accumulating gradients for the shared weights. For long sequences you **truncate**: process chunks, carry the hidden state forward but stop gradients at chunk boundaries.

The gradient of the loss at step $T$ with respect to the state at step $t$ is a product of $T - t$ Jacobians $\\partial\\mathbf{h}_{k}/\\partial\\mathbf{h}_{k-1}$. If their norms are below one the gradient **vanishes** exponentially and the model cannot learn long dependencies; if above one it **explodes** and training diverges. Explosion has a cheap fix, **gradient clipping**; vanishing needs architecture.

The **LSTM** adds a **cell state** $\\mathbf{c}_t$ updated additively: $\\mathbf{c}_t = \\mathbf{f}_t \\odot \\mathbf{c}_{t-1} + \\mathbf{i}_t \\odot \\tilde{\\mathbf{c}}_t$, where the **forget** and **input** gates are sigmoids computed from the input and previous hidden state, and the **output** gate reads the cell into the hidden state. Along the cell path the Jacobian is just the forget gate, close to one when the gate is open, so gradients survive for hundreds of steps; this is the same trick as a residual connection, applied in time. The **GRU** merges gates for a cheaper cell with similar behaviour. Stacking layers and running a second RNN backwards (bidirectional) improve encoding; an encoder RNN feeding a decoder RNN gives **sequence-to-sequence** models for translation, which is where attention was invented (next lesson).

RNNs still matter for streaming and small models, and understanding them explains why transformers won: an RNN processes tokens one at a time (no parallelism over the sequence) and squeezes all history into one vector. Read Colah's LSTM post and D2L chapters 9-10, implement the RNN and BPTT yourself, then train an LSTM on Tiny Shakespeare.`,
          resources: [
            {
              title: 'Understanding LSTM Networks (Christopher Olah)',
              url: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/',
              type: 'article',
              cost: 'free',
              provider: 'colah.github.io',
              note: 'The standard visual walkthrough of the gates.',
              primary: true,
            },
            {
              title: 'Dive into Deep Learning — chapters 9 and 10, Recurrent Neural Networks and Modern RNNs',
              url: 'https://d2l.ai/chapter_recurrent-neural-networks/index.html',
              type: 'textbook',
              cost: 'free',
              provider: 'D2L',
              note: 'RNN from scratch, BPTT analysis (9.7), LSTM/GRU, seq2seq (chapter 10).',
            },
            {
              title: 'Deep Learning (Goodfellow et al.) — chapter 10, Sequence Modeling: Recurrent and Recursive Nets',
              url: 'https://www.deeplearningbook.org/contents/rnn.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Goodfellow, Bengio, Courville',
              note: 'Section 10.7 on long-term dependencies and 10.10 on gated units.',
            },
            {
              title: 'The Unreasonable Effectiveness of Recurrent Neural Networks (Karpathy) and the char-rnn repo with Tiny Shakespeare',
              url: 'https://github.com/karpathy/char-rnn',
              type: 'documentation',
              cost: 'free',
              provider: 'Andrej Karpathy',
              note: 'The data/tinyshakespeare directory is the dataset used throughout this module.',
            },
          ],
          exercises: [
            {
              slug: 'rnn-bptt-from-scratch',
              title: 'Vanilla RNN with manual BPTT',
              prompt:
                'Implement a character RNN (hidden 128) in NumPy or with torch tensors without autograd: forward over a sequence of 25 characters, manual BPTT computing gradients for all weights, gradient clipping at norm 5. Verify against autograd on a short sequence. Train on Tiny Shakespeare with truncated BPTT and sample text every 1000 steps. Plot the gradient norm of the loss with respect to h_t for t = 1..25 at initialisation to show vanishing.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'lstm-vs-rnn-long-range',
              title: 'LSTM vs RNN on a long-dependency task',
              prompt:
                'Create a synthetic task: a sequence of random digits with a marker, where the target is the digit that appeared k steps after the marker, for k = 5, 20, 50, 100. Train a vanilla RNN, an LSTM and a GRU (same hidden size) on each k and plot accuracy vs k. Report at which k each architecture fails and relate to the gradient analysis.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'char-lstm-shakespeare',
              title: 'Character-level LSTM language model',
              prompt:
                'Train a 2-layer LSTM (hidden 512, dropout 0.3) on Tiny Shakespeare with truncated BPTT (sequence length 100) using nn.LSTM. Report validation loss per character and compare with the context-8 MLP from the previous lesson. Sample 500 characters at temperature 0.8. Measure tokens/second for training and explain why it cannot be parallelised over the sequence.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do gradients vanish or explode in RNNs?',
              answerOutline:
                'The gradient through T steps is a product of T Jacobians of the recurrence; repeated multiplication by matrices with singular values below or above one shrinks or grows the gradient exponentially in T.',
            },
            {
              question: 'What in the LSTM lets gradients survive many steps?',
              answerOutline:
                'The additive cell-state update: the Jacobian along the cell path is the forget gate (near one when open), so no repeated squashing nonlinearity, analogous to a residual connection through time.',
            },
            {
              question: 'What is truncated BPTT and what does it sacrifice?',
              answerOutline:
                'Backpropagating only within fixed-length chunks while carrying the hidden state forward; it bounds memory and compute but gradients cannot flow across chunk boundaries, limiting learned dependency length.',
            },
          ],
        },
        {
          slug: 'attention-and-the-transformer',
          title: 'Attention and the transformer, from scratch',
          summary:
            'Scaled dot-product attention derived from a soft lookup, multi-head self-attention, positional encodings, the transformer block and GPT, built line by line and trained as a character-level model following nanoGPT.',
          estimatedMinutes: 180,
          objectives: [
            'Derive scaled dot-product attention as a differentiable soft dictionary lookup and explain the 1/sqrt(d) scaling',
            'Implement causal multi-head self-attention, the transformer block (attention, MLP, residuals, layer norm) and a GPT model from scratch',
            'Explain why positional information must be added and compare learned, sinusoidal and rotary encodings',
            'Train a GPT on Tiny Shakespeare, generate text, and relate attention\'s cost to sequence length',
            'Explain encoder-decoder vs decoder-only transformers and cross-attention',
          ],
          concepts: [
            'Queries, keys, values; scaled dot-product attention',
            'Causal (masked) self-attention',
            'Multi-head attention; head dimension',
            'Positional encoding: learned, sinusoidal, rotary',
            'Transformer block: pre-norm, residuals, MLP with GELU',
            'Encoder, decoder, cross-attention',
            'O(T²) attention cost; KV cache at inference',
            'Weight tying; dropout placement',
          ],
          explanation: `**Attention** lets each position gather information from every other position in one step, with learned weights that depend on content. Each token produces a **query** $\\mathbf{q}$, a **key** $\\mathbf{k}$ and a **value** $\\mathbf{v}$ by linear maps. The output at a position is a weighted average of all values, with weights $\\mathrm{softmax}(\\mathbf{q}\\cdot\\mathbf{k}_j/\\sqrt{d})$ over positions $j$: a soft dictionary lookup where the query asks "who has what I need?". The $\\sqrt{d}$ keeps the dot products of order one so the softmax does not saturate at initialisation. In matrix form, $\\mathrm{Attention}(Q, K, V) = \\mathrm{softmax}(QK^\\top/\\sqrt{d})V$, which is two matrix multiplies and a softmax: embarrassingly parallel over the sequence, unlike an RNN. For language modelling, a **causal mask** sets future positions to $-\\infty$ before the softmax so each token sees only the past.

**Multi-head** attention runs $h$ attention operations in parallel on $d/h$-dimensional projections and concatenates, letting different heads attend to different relations (previous token, matching bracket, subject of the verb). Because attention is permutation-equivariant, position must be injected: **learned** position embeddings (GPT-2), **sinusoidal** functions (the original paper) or **rotary** embeddings applied to queries and keys (modern LLMs).

A **transformer block** is: $\\mathbf{x} \\leftarrow \\mathbf{x} + \\mathrm{Attn}(\\mathrm{LN}(\\mathbf{x}))$, then $\\mathbf{x} \\leftarrow \\mathbf{x} + \\mathrm{MLP}(\\mathrm{LN}(\\mathbf{x}))$, with a 4x-wide GELU MLP; residuals and pre-norm make deep stacks trainable. **GPT** is an embedding, $N$ blocks, a final layer norm and a linear head (often tied to the embedding). The original transformer has an **encoder** (bidirectional attention) and a **decoder** that also **cross-attends** to encoder outputs, for translation; BERT keeps the encoder, GPT the decoder.

The cost is the $T \\times T$ attention matrix per head per layer: quadratic in context, which is the motivation for FlashAttention (exact, memory-efficient) and for a **KV cache** at inference so generated tokens do not recompute past keys and values. Build it all from scratch with Karpathy's "Let's build GPT" lecture and the nanoGPT repository, then read the Annotated Transformer for the encoder-decoder version. This lesson is the heart of the subject; take the time.`,
          resources: [
            {
              title: 'Neural Networks: Zero to Hero — Let\'s build GPT: from scratch, in code, spelled out',
              url: 'https://karpathy.ai/zero-to-hero.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Andrej Karpathy',
              note: 'Lecture 7. Build the model alongside; the finished code is nanoGPT.',
              primary: true,
            },
            {
              title: 'nanoGPT repository',
              url: 'https://github.com/karpathy/nanoGPT',
              type: 'documentation',
              cost: 'free',
              provider: 'Andrej Karpathy',
              note: 'model.py is a complete, readable GPT-2; train.py has the training recipe including AdamW settings and warm-up.',
            },
            {
              title: 'Attention Is All You Need (Vaswani et al.)',
              url: 'https://arxiv.org/abs/1706.03762',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / NeurIPS 2017',
            },
            {
              title: 'The Illustrated Transformer (Jay Alammar)',
              url: 'https://jalammar.github.io/illustrated-transformer/',
              type: 'article',
              cost: 'free',
              provider: 'Jay Alammar',
              note: 'Visual walkthrough; read before the paper.',
            },
            {
              title: 'The Annotated Transformer (Harvard NLP)',
              url: 'https://nlp.seas.harvard.edu/annotated-transformer/',
              type: 'article',
              cost: 'free',
              provider: 'Harvard NLP',
              note: 'The encoder-decoder paper implemented line by line in PyTorch, with a translation example.',
            },
          ],
          exercises: [
            {
              slug: 'gpt-from-scratch',
              title: 'Build and train a GPT on Tiny Shakespeare',
              prompt:
                'Implement causal multi-head self-attention, the transformer block and a GPT (6 layers, 6 heads, embedding 384, context 256) from scratch in PyTorch. Train on Tiny Shakespeare with AdamW, warm-up and cosine decay for 5000 iterations; target validation loss around 1.5 nats/char. Generate 1000 characters. Verify your attention against torch.nn.functional.scaled_dot_product_attention on random inputs, and show that removing the causal mask lets the model cheat (training loss near zero, garbage samples).',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'attention-ablations',
              title: 'Transformer ablations',
              prompt:
                'From your GPT, run single-change ablations: no positional embeddings; 1 head vs 6 heads at fixed total width; post-norm vs pre-norm; no residual connections; no 1/sqrt(d) scaling; MLP width 1x vs 4x. Report validation loss after 3000 iterations for each with the same seed. Visualise the attention pattern of two heads in layer 1 and layer 6 on a sentence and describe what they attend to.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'kv-cache-and-cost',
              title: 'Attention cost and the KV cache',
              prompt:
                'Measure the time and peak memory of a forward pass of your GPT at context lengths 128, 256, 512, 1024, 2048 and fit the scaling exponent. Implement a KV cache for generation and compare the time to generate 500 tokens with and without it. Then swap in F.scaled_dot_product_attention (Flash) and report the memory change at 2048.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why divide the attention logits by sqrt(d)?',
              answerOutline:
                'Dot products of d-dimensional vectors with unit-variance entries have variance d; scaling keeps logits at order one so the softmax is not saturated and gradients flow at initialisation.',
            },
            {
              question: 'Why does a transformer need positional information and an RNN does not?',
              answerOutline:
                'Self-attention is a set operation: permuting the inputs permutes the outputs identically, so without position signals word order is invisible. An RNN processes tokens in order by construction.',
            },
            {
              question: 'What does the KV cache store and what does it save?',
              answerOutline:
                'The keys and values of all previous tokens at every layer; at each generation step only the new token\'s query/key/value are computed, turning O(T²) per step into O(T).',
            },
          ],
        },
        {
          slug: 'pretraining-and-fine-tuning-language-models',
          title: 'Pretraining and fine-tuning language models',
          summary:
            'Self-supervised pretraining objectives (causal and masked), BERT vs GPT, the Hugging Face ecosystem for fine-tuning on downstream tasks, parameter-efficient fine-tuning with LoRA, and in-context learning and prompting as alternatives to fine-tuning.',
          estimatedMinutes: 140,
          objectives: [
            'Contrast masked (BERT) and causal (GPT) pretraining and the downstream uses each suits',
            'Fine-tune a pretrained transformer on a text classification task with Hugging Face Transformers and evaluate it properly',
            'Implement LoRA and explain why parameter-efficient fine-tuning works and what it costs',
            'Use prompting, few-shot in-context learning and instruction-tuned models, and compare them against fine-tuning on the same task',
          ],
          concepts: [
            'Self-supervised pretraining; masked language modelling; causal language modelling',
            'BERT, GPT-2/3, T5: encoder, decoder, encoder-decoder',
            'Downstream fine-tuning: heads, learning rates, catastrophic forgetting',
            'Hugging Face Transformers, Datasets, Tokenizers, Trainer',
            'Parameter-efficient fine-tuning: adapters, LoRA, QLoRA',
            'In-context learning; few-shot prompting; instruction tuning',
            'Evaluation: held-out splits, contamination, benchmark pitfalls',
          ],
          explanation: `Training a transformer on raw text with a next-token or masked-token objective needs no labels, and the resulting model has learned syntax, facts and a good deal of reasoning. **Pretraining then fine-tuning** is to NLP what ImageNet transfer is to vision, with the difference that the pretrained model is usually far larger than anything you could train.

Two families. **BERT** is an encoder trained with **masked language modelling** (predict randomly masked tokens from both sides); it produces contextual representations ideal for classification, tagging and retrieval, fine-tuned by adding a small head. **GPT** is a decoder trained with **causal** language modelling; it generates, and with enough scale it performs tasks from a prompt alone (**in-context learning**), which GPT-3 demonstrated. **T5** keeps the encoder-decoder and casts every task as text-to-text. Modern LLMs are decoder-only, then **instruction-tuned** on examples of following requests, then aligned with human feedback (module 7).

The **Hugging Face** ecosystem makes fine-tuning routine: \`AutoTokenizer\` and \`AutoModelForSequenceClassification\` load a checkpoint and a head, \`datasets\` streams data, and \`Trainer\` runs the loop with mixed precision and evaluation. Fine-tune with small learning rates ($2 \\times 10^{-5}$ for BERT-sized models), a few epochs, and warm-up; watch for instability across seeds on small datasets, and report the spread.

Fine-tuning a billion-parameter model updates and stores a billion parameters per task. **LoRA** freezes the model and adds a low-rank update $\\Delta W = BA$ (rank 4-64) to the attention and MLP weight matrices; only $A$ and $B$ train, which is under 1% of parameters, fits on one GPU, and often matches full fine-tuning. Quantising the frozen weights to 4 bits (**QLoRA**) makes 7B-parameter fine-tuning possible on a consumer card. Implement LoRA yourself: it is thirty lines.

Finally, **prompting** an instruction-tuned model with zero or a few examples is often competitive with fine-tuning and costs nothing to train. The right comparison is empirical: fine-tuned small model vs few-shot large model on the same held-out data, with attention to **contamination** (the benchmark may be in the pretraining data). Work through the Hugging Face course chapters 1-3 and 7, then the exercises on IMDB.`,
          resources: [
            {
              title: 'Hugging Face LLM Course (formerly NLP Course) — chapters 1-3 and 7',
              url: 'https://huggingface.co/learn/llm-course/chapter1/1',
              type: 'course',
              cost: 'free',
              provider: 'Hugging Face',
              note: 'Transformers, fine-tuning with Trainer, and the main NLP tasks.',
              primary: true,
            },
            {
              title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding (Devlin et al.)',
              url: 'https://arxiv.org/abs/1810.04805',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / NAACL 2019',
            },
            {
              title: 'LoRA: Low-Rank Adaptation of Large Language Models (Hu et al.)',
              url: 'https://arxiv.org/abs/2106.09685',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICLR 2022',
              note: 'Section 4 for the method; the PEFT library implements it (huggingface.co/docs/peft).',
            },
            {
              title: 'Language Models are Few-Shot Learners (Brown et al., GPT-3)',
              url: 'https://arxiv.org/abs/2005.14165',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / NeurIPS 2020',
              note: 'Sections 1-3 for in-context learning and the scaling results.',
            },
            {
              title: 'The Illustrated GPT-2 (Jay Alammar)',
              url: 'https://jalammar.github.io/illustrated-gpt2/',
              type: 'article',
              cost: 'free',
              provider: 'Jay Alammar',
            },
          ],
          exercises: [
            {
              slug: 'finetune-bert-imdb',
              title: 'Fine-tune a pretrained encoder on IMDB',
              prompt:
                'Fine-tune distilbert or bert-base on IMDB sentiment with the Trainer (3 epochs, lr 2e-5, warm-up 10%, fp16). Report test accuracy with mean and standard deviation over 3 seeds, and compare against a TF-IDF + logistic regression baseline and against the frozen-encoder (CLS embedding + logistic regression) probe. Then subsample to 500 training reviews and repeat all three; which wins at small data?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'lora-from-scratch',
              title: 'Implement LoRA',
              prompt:
                'Write a LoRALinear module that wraps a frozen nn.Linear with a trainable low-rank update B A (scaled by alpha/r), and inject it into the query and value projections of a pretrained GPT-2 small. Fine-tune on a small instruction or classification dataset with ranks 1, 4, 16, 64 and full fine-tuning; report trainable parameter count, GPU memory, and validation performance for each. Verify your module matches the PEFT library numerically for one configuration.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'prompting-vs-finetuning',
              title: 'Few-shot prompting vs fine-tuning',
              prompt:
                'On a classification task with 6+ classes (e.g. a news-topic dataset from Hugging Face), compare: (a) your fine-tuned BERT, (b) zero-shot and 5-shot prompting of an open instruction-tuned model (e.g. a 7B model via Transformers or an API), (c) LoRA fine-tuning of that model on 1000 examples. Use the same held-out test set. Report accuracy, cost per 1000 predictions and the prompt sensitivity of (b) across three prompt phrasings.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a masked-language-model encoder better suited to classification than a causal decoder of the same size?',
              answerOutline:
                'Its representations use both left and right context for every token, so a sentence-level feature is richer; decoders see only the past, though at scale they compensate via prompting.',
            },
            {
              question: 'Why does a low-rank update suffice for fine-tuning?',
              answerOutline:
                'The change needed to adapt a pretrained model to a task has low intrinsic dimension; a rank-r update captures it with far fewer parameters, with the frozen weights providing the general capability.',
            },
            {
              question: 'What is benchmark contamination and how do you guard against it?',
              answerOutline:
                'Test data appearing in the pretraining corpus, inflating scores. Guard by using data created after the model\'s training cutoff, private held-out sets, or checking n-gram overlap with the corpus.',
            },
          ],
        },
        {
          slug: 'generation-decoding-and-evaluation',
          title: 'Generating text: decoding strategies and evaluating language models',
          summary:
            'Turning a next-token distribution into text: greedy, beam search, temperature, top-k and nucleus sampling, repetition penalties; and evaluating generation with perplexity, task metrics (BLEU, ROUGE, exact match), human preference and model-based judges, with their pitfalls.',
          estimatedMinutes: 100,
          objectives: [
            'Implement greedy, beam, temperature, top-k and nucleus decoding and explain the quality/diversity trade-off each makes',
            'Explain why maximum-likelihood decoding produces degenerate repetitive text and how sampling truncation fixes it',
            'Evaluate generation with perplexity, BLEU/ROUGE, exact match and pairwise preference, and describe the limits of each',
            'Measure decoding cost (latency per token, batching) and relate it to the KV cache and speculative decoding',
          ],
          concepts: [
            'Greedy decoding; beam search; length normalisation',
            'Temperature; top-k; nucleus (top-p) sampling',
            'Degeneration and repetition; repetition penalties',
            'Perplexity vs task metrics; BLEU, ROUGE, exact match',
            'Human evaluation; LLM-as-judge; position and length biases',
            'Latency per token; batching; speculative decoding',
            'Hallucination and factuality (overview)',
          ],
          explanation: `A language model gives a distribution over the next token; **decoding** chooses tokens from it, and the choice changes the output as much as the model does. **Greedy** decoding takes the argmax each step and is fast but myopic. **Beam search** keeps the $B$ most probable partial sequences and is standard for translation and summarisation, where there is a right answer; it prefers short outputs without **length normalisation**. For open-ended text, maximising likelihood is the wrong goal: the most probable continuation of a story is bland and, past a point, **repetitive** (the model assigns rising probability to repeating itself). **Sampling** from the distribution fixes blandness but draws from the long tail of unlikely tokens, producing incoherence. The remedies truncate the tail: **temperature** sharpens or flattens the distribution; **top-k** keeps the $k$ most probable tokens; **nucleus (top-p)** keeps the smallest set whose probability mass exceeds $p$, adapting to the distribution's entropy. Typical settings are temperature 0.7-1.0 with top-p 0.9, plus a mild repetition penalty.

**Evaluation** is unsolved and you must know the tools' limits. **Perplexity** on held-out text measures the model, not the generation, and is incomparable across tokenisers. **BLEU** (n-gram precision against references) and **ROUGE** (recall) suit translation and summarisation but correlate weakly with quality for open-ended generation. **Exact match** and accuracy work for questions with definite answers. **Human preference** judgements (pairwise, "which answer is better?") are the gold standard and expensive; **LLM-as-judge** approximates them cheaply and inherits biases: it prefers longer answers, the first position, and its own style. Report what you measured, with the decoding settings, and use several metrics.

Generation is sequential, so **latency per token** matters: the KV cache makes each step linear in context, batching many requests amortises weight loads, and **speculative decoding** uses a small draft model to propose several tokens that the large model verifies in one pass. Implement the decoders on your GPT and on a pretrained model, and run the evaluation comparison.`,
          resources: [
            {
              title: 'The Curious Case of Neural Text Degeneration (Holtzman et al.) — nucleus sampling',
              url: 'https://arxiv.org/abs/1904.09751',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICLR 2020',
              note: 'Why likelihood-maximising decoding degenerates and the top-p remedy, with striking examples.',
              primary: true,
            },
            {
              title: 'Hugging Face Transformers — Text generation strategies',
              url: 'https://huggingface.co/docs/transformers/generation_strategies',
              type: 'documentation',
              cost: 'free',
              provider: 'Hugging Face',
              note: 'Every decoding option in generate(), including speculative (assisted) decoding.',
            },
            {
              title: 'Stanford CS224n — lectures on natural language generation and evaluation',
              url: 'https://web.stanford.edu/class/cs224n/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'The NLG lecture covers decoding and evaluation metrics and their failure modes.',
            },
            {
              title: 'EleutherAI Language Model Evaluation Harness',
              url: 'https://github.com/EleutherAI/lm-evaluation-harness',
              type: 'tool',
              cost: 'free',
              provider: 'EleutherAI',
              note: 'The standard tool for running benchmark evaluations reproducibly on open models.',
            },
          ],
          exercises: [
            {
              slug: 'decoding-strategies',
              title: 'Implement the decoders',
              prompt:
                'On your Tiny Shakespeare GPT and on GPT-2 small, implement greedy, beam search (B = 5, with and without length normalisation), temperature, top-k and top-p sampling. For a fixed prompt generate 200 tokens with each; measure repetition (fraction of repeated 4-grams), average log-probability per token and distinct-n diversity. Present a table and discuss the trade-off; show an example of greedy degeneration.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'evaluation-comparison',
              title: 'Metrics vs human judgement',
              prompt:
                'Fine-tune a small seq2seq model (e.g. t5-small) on a summarisation dataset. Generate summaries with beam and with nucleus sampling for 50 test articles. Compute ROUGE-L for both; then have two people (or yourself blind to the method) rate pairs for preference; then use an LLM as judge. Report agreement between the three evaluations and test the judge for position bias by swapping the order.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'generation-latency',
              title: 'Generation latency and batching',
              prompt:
                'With GPT-2 medium, measure milliseconds per generated token for batch sizes 1, 8, 32 with and without the KV cache, at prompt lengths 32 and 512. Plot tokens/second vs batch size. Then use Transformers\' assisted generation with GPT-2 small as draft model and report the speedup and the acceptance rate of drafted tokens.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does greedy or beam decoding produce repetitive text from a good language model?',
              answerOutline:
                'The model assigns increasing probability to repeating recent text (a positive feedback loop), and maximising likelihood follows that mode; human text is not maximally probable, it is sampled with moderate surprise.',
            },
            {
              question: 'What does nucleus sampling do that top-k does not?',
              answerOutline:
                'It adapts the number of candidate tokens to the distribution: few when the model is confident, many when it is uncertain, by keeping the smallest set with cumulative probability p.',
            },
            {
              question: 'Name two biases of LLM-as-judge evaluation and how to mitigate them.',
              answerOutline:
                'Position bias (prefers the first answer) and verbosity bias (prefers longer answers); mitigate by swapping order and averaging, controlling length, and calibrating against human judgements.',
            },
          ],
        },
      ],
      project: {
        slug: 'language-model-from-scratch-and-finetuned',
        title: 'Module project: a GPT from scratch and a fine-tuned transformer for a task',
        description:
          'Two deliverables that meet in the middle: (1) your own GPT trained on a corpus of your choice (Shakespeare, code, song lyrics, chemistry SMILES) with a tokeniser you built, ablations and generated samples under different decoders; (2) a pretrained transformer fine-tuned (full and LoRA) on a downstream task with a proper comparison against a prompting baseline.',
        deliverables: [
          'From-scratch GPT with BPE tokeniser, training curves, ablation table and a sample gallery per decoding strategy',
          'Fine-tuned model with full vs LoRA vs few-shot prompting comparison, seeds and confidence intervals',
          'A write-up on what the ablations and the comparison taught you, including one negative result',
        ],
        estimatedHours: 14,
      },
    },
    {
      slug: 'generative-models',
      title: 'Generative Models',
      description:
        'Learning to sample from a data distribution: autoencoders and variational autoencoders, generative adversarial networks, and diffusion models, with the likelihood, adversarial and denoising objectives that define each.',
      lessons: [
        {
          slug: 'autoencoders-and-vaes',
          title: 'Autoencoders and variational autoencoders',
          summary:
            'Learning compressed representations with autoencoders, then turning them into a generative model: the VAE, its evidence lower bound, the reparameterisation trick, and what the latent space learns.',
          estimatedMinutes: 140,
          objectives: [
            'Train an autoencoder and explain why a plain autoencoder is not a generative model',
            'Derive the ELBO for a latent-variable model and identify its reconstruction and KL terms',
            'Implement the reparameterisation trick and train a VAE on MNIST or Fashion-MNIST',
            'Explore the latent space by interpolation and sampling and explain blurriness and posterior collapse',
          ],
          concepts: [
            'Autoencoder: encoder, bottleneck, decoder',
            'Denoising autoencoder',
            'Latent-variable generative model p(x|z)p(z)',
            'Evidence lower bound: reconstruction minus KL',
            'Amortised inference with an encoder q(z|x)',
            'Reparameterisation trick',
            'β-VAE; posterior collapse; blurry samples',
          ],
          explanation: `An **autoencoder** maps an input through a narrow **bottleneck** and back, trained to reconstruct it. The bottleneck forces a compressed code, and **denoising** autoencoders (reconstruct the clean input from a corrupted one) learn particularly useful features. But an autoencoder is not generative: the codes of training images occupy an irregular region of latent space, and decoding a random point gives garbage.

A **variational autoencoder** fixes this by making the latent space a probability model. Assume data are generated by sampling $\\mathbf{z} \\sim \\mathcal{N}(0, I)$ and decoding with $p_\\theta(\\mathbf{x} \\mid \\mathbf{z})$. The likelihood $p_\\theta(\\mathbf{x}) = \\int p_\\theta(\\mathbf{x} \\mid \\mathbf{z})p(\\mathbf{z})\\,d\\mathbf{z}$ is intractable, so introduce an **encoder** $q_\\phi(\\mathbf{z} \\mid \\mathbf{x})$, a Gaussian whose mean and variance are network outputs, and maximise the **evidence lower bound**
$$\\log p_\\theta(\\mathbf{x}) \\ge \\mathbb{E}_{q_\\phi(\\mathbf{z}\\mid\\mathbf{x})}[\\log p_\\theta(\\mathbf{x} \\mid \\mathbf{z})] - \\mathrm{KL}(q_\\phi(\\mathbf{z} \\mid \\mathbf{x}) \\,\\|\\, p(\\mathbf{z})).$$
The first term is reconstruction; the KL term pulls each code distribution towards the prior so the latent space is filled smoothly and random samples decode to plausible images. This is the same ELBO as EM in the machine-learning subject, with the E-step amortised by a network.

To backpropagate through sampling, write $\\mathbf{z} = \\boldsymbol{\\mu} + \\boldsymbol{\\sigma} \\odot \\boldsymbol{\\epsilon}$ with $\\boldsymbol{\\epsilon} \\sim \\mathcal{N}(0, I)$: the **reparameterisation trick** moves the randomness into an input, so gradients flow to $\\boldsymbol{\\mu}$ and $\\boldsymbol{\\sigma}$. The Gaussian KL has a closed form.

VAEs give a smooth latent space you can interpolate in and an encoder you can reuse, but their samples are **blurry**, because a Gaussian likelihood averages over plausible images. Weighting the KL term ($\\beta$-VAE) trades sample quality for disentangled latents; too strong a decoder causes **posterior collapse**, where the model ignores $\\mathbf{z}$. VAEs live on as the image compressor inside latent diffusion models. Derive the ELBO, then implement it from the D2L and Kingma tutorial material.`,
          resources: [
            {
              title: 'An Introduction to Variational Autoencoders (Kingma and Welling)',
              url: 'https://arxiv.org/abs/1906.02691',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / Foundations and Trends',
              note: 'Chapters 1-2: the ELBO, the reparameterisation trick and the VAE, by the method\'s authors.',
              primary: true,
            },
            {
              title: 'Deep Learning (Goodfellow et al.) — chapter 14, Autoencoders, and section 20.10.3 on VAEs',
              url: 'https://www.deeplearningbook.org/contents/autoencoders.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Goodfellow, Bengio, Courville',
            },
            {
              title: 'Auto-Encoding Variational Bayes (Kingma and Welling)',
              url: 'https://arxiv.org/abs/1312.6114',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICLR 2014',
            },
            {
              title: 'PyTorch examples repository (VAE example)',
              url: 'https://github.com/pytorch/examples',
              type: 'documentation',
              cost: 'free',
              provider: 'PyTorch',
              note: 'The vae/ directory is a 150-line reference to compare against your own.',
            },
          ],
          exercises: [
            {
              slug: 'elbo-derivation',
              title: 'Derive the ELBO and the Gaussian KL',
              prompt:
                'Derive the ELBO two ways: by Jensen\'s inequality on log p(x) = log E_q[p(x,z)/q(z|x)], and by showing log p(x) = ELBO + KL(q(z|x) || p(z|x)). Then derive the closed-form KL between N(μ, diag σ²) and N(0, I). Explain what the gap between the ELBO and the log-likelihood is and when it is zero.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'vae-fashion-mnist',
              title: 'Train a VAE and explore its latent space',
              prompt:
                'Train a convolutional VAE with a 2-dimensional latent on Fashion-MNIST; plot the latent means of the test set coloured by class and a grid of decoded images across the latent plane. Then train with a 32-dimensional latent and report the ELBO, reconstruction and KL terms separately on the test set. Show interpolations between two images in latent space versus pixel space.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'beta-vae-and-collapse',
              title: 'β-VAE and posterior collapse',
              prompt:
                'Train the 32-dimensional VAE with β in {0.1, 1, 4, 16}. For each, report reconstruction error, KL, the number of active latent dimensions (posterior variance below 0.9 averaged over data), and show samples from the prior. Then use a much more powerful decoder (or an autoregressive one) with β = 1 and show the KL dropping towards zero. Explain both effects.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a plain autoencoder not a generative model?',
              answerOutline:
                'Nothing constrains where codes lie, so the latent region occupied by data is irregular and has holes; decoding a random point (or the prior) does not give realistic samples.',
            },
            {
              question: 'What do the two terms of the ELBO encourage?',
              answerOutline:
                'The expected log-likelihood term encourages accurate reconstruction from sampled codes; the KL term keeps each q(z|x) close to the prior, giving a smooth, filled latent space to sample from.',
            },
            {
              question: 'Why is the reparameterisation trick needed?',
              answerOutline:
                'Sampling z ~ q(z|x) is not differentiable in the parameters; writing z = μ + σ ⊙ ε with ε independent noise makes z a differentiable function of μ and σ, giving low-variance gradients.',
            },
          ],
        },
        {
          slug: 'generative-adversarial-networks',
          title: 'Generative adversarial networks',
          summary:
            'Generation as a two-player game: generator against discriminator, the minimax objective and its relation to Jensen-Shannon divergence, why GAN training is unstable, DCGAN design rules, and evaluating sample quality with FID.',
          estimatedMinutes: 130,
          objectives: [
            'State the GAN minimax objective and show that the optimal discriminator turns it into a divergence between data and model distributions',
            'Train a DCGAN on a real image dataset and diagnose mode collapse and training divergence',
            'Explain the non-saturating generator loss and the stabilisation techniques (Wasserstein loss, gradient penalty, spectral normalisation)',
            'Evaluate generative models with FID and explain what it measures and misses',
          ],
          concepts: [
            'Generator and discriminator; minimax game',
            'Optimal discriminator; Jensen-Shannon divergence',
            'Non-saturating generator loss',
            'Mode collapse; training instability',
            'DCGAN architecture guidelines',
            'Wasserstein GAN; gradient penalty; spectral normalisation',
            'Conditional GANs',
            'Fréchet Inception Distance; precision and recall for generative models',
          ],
          explanation: `A VAE maximises a likelihood bound and pays with blur. A **generative adversarial network** avoids likelihood entirely. A **generator** $G$ maps noise $\\mathbf{z}$ to an image; a **discriminator** $D$ outputs the probability that an image is real. They play
$$\\min_G \\max_D \\; \\mathbb{E}_{\\mathbf{x}\\sim p_{\\text{data}}}[\\log D(\\mathbf{x})] + \\mathbb{E}_{\\mathbf{z}}[\\log(1 - D(G(\\mathbf{z})))].$$
For a fixed $G$ the optimal discriminator is $D^*(\\mathbf{x}) = p_{\\text{data}}/(p_{\\text{data}} + p_G)$, and substituting it shows the generator minimises the **Jensen-Shannon divergence** between data and model, so the game's equilibrium is $p_G = p_{\\text{data}}$. Because $D$ learns what real images look like, GAN samples are sharp, which is why GANs dominated image synthesis from 2015 to 2021.

In practice the game is fragile. Early on $D$ wins easily, $\\log(1 - D(G(\\mathbf{z})))$ saturates and the generator gets no gradient, so implementations use the **non-saturating** loss: maximise $\\log D(G(\\mathbf{z}))$ instead. **Mode collapse** occurs when $G$ produces a few convincing outputs and ignores the rest of the distribution. Training can oscillate rather than converge, since simultaneous gradient descent on a game is not optimisation of one function. **DCGAN** gave a recipe that mostly works: strided convolutions instead of pooling, batch norm in both networks, ReLU in $G$, leaky ReLU in $D$, Adam with learning rate $2 \\times 10^{-4}$ and $\\beta_1 = 0.5$. **Wasserstein GANs** replace JS with the earth-mover distance, which gives useful gradients even when distributions do not overlap, enforced with a **gradient penalty**; **spectral normalisation** constrains $D$ more cheaply. **Conditional** GANs feed the label to both networks.

Evaluation is hard because there is no likelihood. The **Fréchet Inception Distance** fits Gaussians to Inception features of real and generated images and measures the distance between them: lower is better, and it captures both quality and diversity crudely. Precision/recall metrics separate the two. Read the GAN paper and the DCGAN paper, train one on CelebA or Fashion-MNIST, and keep a sample grid per epoch so you can watch the dynamics.`,
          resources: [
            {
              title: 'Generative Adversarial Networks (Goodfellow et al.)',
              url: 'https://arxiv.org/abs/1406.2661',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / NeurIPS 2014',
              note: 'Section 4 for the optimal discriminator and the JS divergence result.',
              primary: true,
            },
            {
              title: 'Unsupervised Representation Learning with Deep Convolutional GANs (Radford et al., DCGAN)',
              url: 'https://arxiv.org/abs/1511.06434',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICLR 2016',
            },
            {
              title: 'PyTorch tutorials — DCGAN Tutorial',
              url: 'https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PyTorch',
              note: 'A complete DCGAN on CelebA with training-dynamics plots.',
            },
            {
              title: 'Improved Training of Wasserstein GANs (Gulrajani et al.)',
              url: 'https://arxiv.org/abs/1704.00028',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / NeurIPS 2017',
              note: 'WGAN-GP: the gradient penalty in Algorithm 1.',
            },
          ],
          exercises: [
            {
              slug: 'optimal-discriminator',
              title: 'Derive the optimal discriminator',
              prompt:
                'For fixed G, derive the optimal discriminator by maximising the integrand pointwise. Substitute it and show the objective equals 2 JS(p_data || p_G) - log 4. Then show why the original generator loss saturates when D is confident, and derive the gradient of the non-saturating loss to show it does not.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'dcgan',
              title: 'Train a DCGAN and watch it fail',
              prompt:
                'Train a DCGAN on CelebA at 64x64 (or Fashion-MNIST at 28x28 if compute is limited) for 10-20 epochs, saving a fixed-noise sample grid each epoch and plotting both losses. Then break it deliberately three ways: remove batch norm from G, use a learning rate of 2e-3, and give D five times as many updates as G. Document the symptoms (collapse, divergence, oscillation) with sample grids.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'fid-evaluation',
              title: 'Compute FID and compare generators',
              prompt:
                'Compute FID (torchmetrics or pytorch-fid) with 10,000 samples for your DCGAN at several epochs, for your VAE from the previous lesson, and for a WGAN-GP or spectral-norm variant you train. Plot FID against epoch. Also compute FID between two halves of the real data as a floor. Explain why the VAE scores worse despite smoother training and what FID cannot detect (e.g. memorised training images).',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the generator minimise when the discriminator is optimal?',
              answerOutline:
                'The Jensen-Shannon divergence between the data distribution and the generator distribution (up to constants), minimised when they are equal.',
            },
            {
              question: 'What is mode collapse and why does the GAN objective permit it?',
              answerOutline:
                'The generator maps many z to a few outputs that fool the current discriminator. The game is optimised by alternating gradient steps, not at equilibrium, so G can exploit D\'s current weaknesses rather than cover the whole distribution.',
            },
            {
              question: 'What does FID measure?',
              answerOutline:
                'The Fréchet distance between Gaussians fitted to Inception-network features of real and generated images; it reflects quality and diversity together but depends on the feature extractor and sample size.',
            },
          ],
        },
        {
          slug: 'diffusion-models',
          title: 'Diffusion models',
          summary:
            'Generating by learning to denoise: the forward noising process, the reverse process, the simplified noise-prediction loss of DDPM, sampling and faster samplers, classifier-free guidance, and latent diffusion for text-to-image.',
          estimatedMinutes: 160,
          objectives: [
            'Describe the forward diffusion process and derive the closed form for noising directly to step t',
            'Explain the DDPM training objective as predicting the added noise and its connection to score matching',
            'Implement and train a small diffusion model with a U-Net on an image dataset and sample from it',
            'Explain DDIM sampling, classifier-free guidance and latent diffusion, and the trade-offs in steps and guidance scale',
          ],
          concepts: [
            'Forward process: Gaussian noising with a variance schedule',
            'Closed-form noising q(x_t | x_0)',
            'Reverse process; learned denoiser',
            'Noise-prediction loss (DDPM simplified objective)',
            'Score matching and the score function',
            'Time conditioning; U-Net denoiser',
            'DDIM and fast samplers',
            'Classifier-free guidance; latent diffusion',
          ],
          explanation: `**Diffusion models** define generation as the reversal of a simple corruption. The **forward process** adds a little Gaussian noise at each of $T$ steps: $\\mathbf{x}_t = \\sqrt{1 - \\beta_t}\\,\\mathbf{x}_{t-1} + \\sqrt{\\beta_t}\\,\\boldsymbol{\\epsilon}$, until after about a thousand steps the image is pure noise. Because Gaussians compose, you can jump straight to any step: with $\\bar{\\alpha}_t = \\prod_{s \\le t}(1 - \\beta_s)$,
$$\\mathbf{x}_t = \\sqrt{\\bar{\\alpha}_t}\\,\\mathbf{x}_0 + \\sqrt{1 - \\bar{\\alpha}_t}\\,\\boldsymbol{\\epsilon}, \\quad \\boldsymbol{\\epsilon} \\sim \\mathcal{N}(0, I).$$
The **reverse process** starts from noise and denoises step by step. Each reverse step is approximately Gaussian when $\\beta_t$ is small, so a network only has to predict its mean, and DDPM showed that the simplest parameterisation works best: train a network $\\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t)$ to **predict the noise** that was added, with loss $\\|\\boldsymbol{\\epsilon} - \\boldsymbol{\\epsilon}_\\theta(\\mathbf{x}_t, t)\\|^2$ at a random $t$. That is the whole training loop: pick an image, a step and noise; noise the image; regress the noise. The objective is a reweighted ELBO and also **denoising score matching**: the predicted noise is proportional to the **score** $\\nabla_{\\mathbf{x}}\\log p_t(\\mathbf{x})$, the direction towards higher data density.

The denoiser is a **U-Net** conditioned on $t$ (via sinusoidal embeddings added to each block), often with attention layers. Training is stable (a regression loss, no adversary) and samples are diverse with excellent quality, which is why diffusion replaced GANs. The cost is sampling: a thousand network evaluations. **DDIM** reinterprets the process as deterministic and samples in 20-50 steps; later solvers and distillation reduce this further.

Conditioning makes diffusion controllable. **Classifier-free guidance** trains one network both with and without the condition (dropping it at random) and samples with $\\boldsymbol{\\epsilon}_{\\text{uncond}} + w(\\boldsymbol{\\epsilon}_{\\text{cond}} - \\boldsymbol{\\epsilon}_{\\text{uncond}})$; larger $w$ means more faithful to the prompt and less diverse. **Latent diffusion** (Stable Diffusion) runs the process in the latent space of a pretrained VAE, cutting cost by an order of magnitude, with a text encoder providing the condition through cross-attention. Read the DDPM paper and the Hugging Face diffusion course, then train a model on Fashion-MNIST or CIFAR-10 yourself.`,
          resources: [
            {
              title: 'Denoising Diffusion Probabilistic Models (Ho, Jain, Abbeel)',
              url: 'https://arxiv.org/abs/2006.11239',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / NeurIPS 2020',
              note: 'Algorithms 1 and 2 (training and sampling) are the core; section 3 gives the derivation.',
              primary: true,
            },
            {
              title: 'Hugging Face Diffusion Models Course',
              url: 'https://github.com/huggingface/diffusion-models-class',
              type: 'course',
              cost: 'free',
              provider: 'Hugging Face',
              note: 'Units 1-2: a diffusion model from scratch and with the diffusers library, then guidance and conditioning.',
            },
            {
              title: 'What are Diffusion Models? (Lilian Weng)',
              url: 'https://lilianweng.github.io/posts/2021-07-11-diffusion-models/',
              type: 'article',
              cost: 'free',
              provider: 'Lilian Weng',
              note: 'A careful derivation of the forward closed form, the ELBO and the noise-prediction loss, plus DDIM and guidance.',
            },
            {
              title: 'High-Resolution Image Synthesis with Latent Diffusion Models (Rombach et al.)',
              url: 'https://arxiv.org/abs/2112.10752',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / CVPR 2022',
            },
            {
              title: 'fast.ai Practical Deep Learning part 2 — From Deep Learning Foundations to Stable Diffusion',
              url: 'https://course.fast.ai/',
              type: 'course',
              cost: 'free',
              provider: 'fast.ai',
              note: 'Part 2 builds Stable Diffusion components from scratch; linked from the course home page.',
            },
          ],
          exercises: [
            {
              slug: 'forward-process-derivation',
              title: 'Derive the closed-form forward process',
              prompt:
                'Prove by induction that x_t = sqrt(ᾱ_t) x_0 + sqrt(1 - ᾱ_t) ε. Then implement the forward process for linear and cosine β schedules, noise one CIFAR-10 image to t = 0, 100, 250, 500, 750, 1000 under each, and plot sqrt(ᾱ_t) against t for both. Explain why the cosine schedule destroys information more gradually.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'ddpm-from-scratch',
              title: 'A DDPM from scratch',
              prompt:
                'Implement DDPM training (Algorithm 1) and sampling (Algorithm 2) with a small time-conditioned U-Net on Fashion-MNIST or CIFAR-10 at 32x32. Train until samples are recognisable; show a 64-sample grid and the denoising trajectory of one sample at 10 points. Report FID against your GAN and VAE from earlier lessons with the same sample count.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'ddim-and-guidance',
              title: 'Fast sampling and classifier-free guidance',
              prompt:
                'Add class conditioning with 10% label dropout to your model and retrain. Implement DDIM sampling and plot FID against the number of sampling steps (10, 20, 50, 100, 1000). Then sample with guidance scales w = 0, 1, 3, 7 and report FID and the accuracy of a pretrained classifier on the samples (a proxy for prompt fidelity). Describe the fidelity/diversity trade-off you observe.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a diffusion model be trained without simulating the whole forward chain?',
              answerOutline:
                'Composed Gaussian noising has a closed form: x_t can be sampled directly from x_0 with variance 1 - ᾱ_t, so each training step picks a random t and noises in one go.',
            },
            {
              question: 'What does the network predict in DDPM and how does that relate to the score?',
              answerOutline:
                'The noise ε added to produce x_t. The score of the noised distribution is approximately -ε_θ(x_t, t)/sqrt(1 - ᾱ_t), so predicting noise is denoising score matching.',
            },
            {
              question: 'What does classifier-free guidance trade off as the scale increases?',
              answerOutline:
                'Fidelity to the condition (samples look more like the class or prompt) against diversity and, at very large scales, image quality (saturation, artefacts).',
            },
          ],
        },
      ],
      project: {
        slug: 'generative-model-shootout',
        title: 'Module project: a VAE, GAN and diffusion shootout',
        description:
          'Train a VAE, a GAN and a diffusion model on the same image dataset under a comparable compute budget. Compare them on FID, precision/recall, sample diversity, training stability across seeds, and sampling speed, and probe for memorisation by finding the nearest training image to generated samples.',
        deliverables: [
          'Three trained models with sample grids and training curves',
          'A comparison table: FID, precision/recall, sampling time per image, and run-to-run variance over 2 seeds',
          'A memorisation check with nearest-neighbour retrievals',
          'A 3-page write-up on why each family behaves as it does',
        ],
        estimatedHours: 14,
      },
    },
    {
      slug: 'practical-deep-learning',
      title: 'Practical Deep Learning',
      description:
        'The fast.ai top-down workflow made rigorous: getting and cleaning data, fast input pipelines and mixed precision, building data products from small datasets, and exporting, optimising and deploying models.',
      lessons: [
        {
          slug: 'the-fastai-workflow',
          title: 'The fast.ai workflow: from a question to a working model in an afternoon',
          summary:
            'The top-down practice loop: gather data, train a quick model, use it to clean the data, iterate, and only then optimise; the fastai DataBlock and Learner APIs, and their layered design down to plain PyTorch.',
          estimatedMinutes: 120,
          objectives: [
            'Go from a question to a trained, deployed image or text classifier in one session using fastai',
            'Use a first model to find label errors and confusing data (confusion matrix, top losses, cleaner widgets)',
            'Describe fastai\'s layered API (DataBlock, Learner, callbacks) and replace one layer with your own PyTorch code',
            'Decide when a quick fine-tuned baseline is good enough and when to invest in more data or modelling',
          ],
          concepts: [
            'Top-down learning: build, then understand',
            'DataBlock: blocks, getters, splitters, item and batch transforms',
            'Learner, metrics, callbacks',
            'Model-driven data cleaning: top losses, confusion matrix',
            'Presizing and GPU augmentation',
            'Baselines and the cost of iteration',
            'fastai mid-level and low-level APIs',
          ],
          explanation: `fast.ai's teaching philosophy is to play the whole game first: build a working model on day one, then open it up. The workflow it teaches is how productive practitioners actually work, and it is worth doing deliberately.

Start with a question that a model could answer and get data: download images with a search API or use a Kaggle dataset, or label a few hundred examples yourself. Describe the data with a **DataBlock**: what the inputs and targets are (\`ImageBlock\`, \`CategoryBlock\`), how to get items and labels, how to split, and which transforms to apply. fastai's **presizing** resizes images to a larger size on the CPU, then applies all augmentation at once on the GPU at the final size, which is both faster and avoids interpolation artefacts. A **Learner** binds data, model, loss, optimizer and metrics; \`lr_find\` and \`fine_tune\` give a strong baseline in minutes.

Then use the model to improve the data. The **confusion matrix** shows which classes are confused; **top losses** shows the examples the model is most confidently wrong about, which are disproportionately label errors, ambiguous images and out-of-scope junk. fastai's cleaner widget lets you relabel or delete them. Retrain. This model-driven data cleaning is often worth more than any architecture change, and it is the core of the "data-centric" approach.

Everything in fastai is built in layers. The high-level API sits on a mid-level API of \`Transform\`s, \`Datasets\` and callbacks, which sits on PyTorch. The **callback** system lets you hook into every point of the training loop (mixed precision, gradient accumulation, early stopping, logging are all callbacks), and you should write one yourself. Knowing the layers means you can drop down to plain PyTorch when you need control and come back up for speed. Watch course.fast.ai lessons 1-3, run the fastbook notebooks 01, 02 and 04, and build your own classifier from data you gathered.`,
          resources: [
            {
              title: 'Practical Deep Learning for Coders — lessons 1-3',
              url: 'https://course.fast.ai/',
              type: 'course',
              cost: 'free',
              provider: 'fast.ai',
              note: 'Getting started, deployment, and how a neural net really works.',
              primary: true,
            },
            {
              title: 'fastbook — chapters 1, 2 and 4 (intro, production, under the hood)',
              url: 'https://github.com/fastai/fastbook',
              type: 'textbook',
              cost: 'free',
              provider: 'fast.ai',
              note: 'Free notebooks; the printed book (O\'Reilly) is optional and paid.',
            },
            {
              title: 'fastai documentation — DataBlock tutorial and callbacks',
              url: 'https://docs.fast.ai/',
              type: 'documentation',
              cost: 'free',
              provider: 'fast.ai',
            },
            {
              title: 'Kaggle Datasets',
              url: 'https://www.kaggle.com/datasets',
              type: 'dataset',
              cost: 'free',
              provider: 'Kaggle',
              note: 'Source of real image and text datasets for the exercises; free account required.',
            },
          ],
          exercises: [
            {
              slug: 'afternoon-classifier',
              title: 'An afternoon classifier from your own data',
              prompt:
                'Choose a 3-6 class problem you care about, gather 100-200 images per class (a search API or a Kaggle dataset), and train a fastai classifier with fine_tune. Report validation error, show the confusion matrix and the top 25 losses, clean the data with the cleaner widget, retrain and report the new error. Record how many labels you changed and which classes they came from.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'write-a-callback',
              title: 'Write fastai callbacks',
              prompt:
                'Write two fastai callbacks: one that logs per-batch gradient norms for each layer group to a CSV, and one that stops training if the validation loss is nan or has not improved for k epochs. Use them on the classifier above. Then reproduce one of fastai\'s built-in callbacks (e.g. GradientAccumulation) in plain PyTorch in your own training loop and check that results match.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'label-noise-experiment',
              title: 'How much does label noise cost?',
              prompt:
                'On Imagenette, flip 0%, 5%, 10%, 20% and 40% of training labels at random. Fine-tune the same model on each and report clean test accuracy. Then for the 20% case, use the trained model\'s top losses to flag the 20% most suspicious training examples, relabel or drop them, retrain, and measure how much accuracy you recover and what fraction of the flipped labels you found.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are a model\'s top losses a good place to find label errors?',
              answerOutline:
                'An example with a wrong label that the model predicts confidently and correctly has a very high loss; mislabelled, ambiguous and out-of-distribution examples concentrate at the top of the loss ranking.',
            },
            {
              question: 'What is presizing and why does it help?',
              answerOutline:
                'Resize to a larger intermediate size per item, then do all augmentations (crop, rotate, warp) in one pass on the GPU on batches at the final size; fewer interpolation steps preserve quality and GPU batching is fast.',
            },
            {
              question: 'What is a fastai callback and give two examples of features implemented as callbacks.',
              answerOutline:
                'An object with hooks called at points in the training loop that can read and modify state; mixed precision, gradient accumulation, early stopping, one-cycle scheduling, logging.',
            },
          ],
        },
        {
          slug: 'data-pipelines-and-efficient-training',
          title: 'Data pipelines, mixed precision and efficient training on one GPU',
          summary:
            'Making training fast and fitting bigger models on the hardware you have: profiling, efficient input pipelines, mixed precision with bf16/fp16, gradient accumulation and checkpointing, torch.compile, and measuring throughput honestly.',
          estimatedMinutes: 120,
          objectives: [
            'Profile a training step to find whether it is input-, compute- or memory-bound',
            'Use mixed-precision training (autocast and a gradient scaler for fp16, or bf16) and explain the numerical issues it addresses',
            'Fit larger effective batches and models with gradient accumulation and activation checkpointing, and quantify their cost',
            'Speed up training with channels-last memory format, torch.compile and fused optimizers, and report throughput with a fair methodology',
          ],
          concepts: [
            'Input-bound vs compute-bound vs memory-bound',
            'torch.profiler; GPU utilisation',
            'Mixed precision: fp16, bf16, loss scaling, autocast',
            'Gradient accumulation',
            'Activation (gradient) checkpointing',
            'torch.compile; kernel fusion; channels-last',
            'Throughput, MFU and fair benchmarking',
          ],
          explanation: `A model that trains twice as fast gets twice as many experiments, so efficiency is a research tool, not just an engineering nicety. Start by **profiling**: \`torch.profiler\` shows where each step's time goes, and GPU utilisation from \`nvidia-smi\` tells you which regime you are in. If the GPU idles waiting for data, you are **input-bound** (fix with more DataLoader workers, pinned memory, pre-decoded or smaller images, GPU augmentation). If utilisation is high, you are **compute-bound** (reduce work per step). If you cannot raise the batch size, you are **memory-bound**.

**Mixed precision** is the biggest single win on modern GPUs: tensor cores run 16-bit matrix multiplies many times faster than fp32, and activations take half the memory. Under \`torch.autocast\`, matmuls and convolutions run in 16 bits while reductions and the loss stay in fp32, and master weights stay in fp32. With **fp16**, small gradients underflow to zero, so a **gradient scaler** multiplies the loss by a large factor before backward and unscales before the step, skipping steps that overflow. **bf16** has fp32's exponent range, needs no scaler, and is the default on hardware that supports it.

When the batch you want does not fit, **gradient accumulation** sums gradients over $k$ micro-batches before stepping, giving the same update as a $k$-times larger batch (except for batch norm statistics). When even one micro-batch's activations do not fit, **activation checkpointing** stores only some activations and recomputes the rest during backward, trading about 30% more compute for a large memory saving.

**torch.compile** traces the model and fuses elementwise operations into fewer kernels, often a 1.3-2x speedup for transformers; **channels-last** memory format speeds convolutions on tensor cores; fused optimizers cut overhead. Report results fairly: throughput in samples per second after warm-up, averaged over many steps, with the same accuracy reached; for large models also report **model FLOPs utilisation**, the fraction of the hardware's peak you achieve. Read the PyTorch performance tuning guide and the AMP recipe, then speed up your CIFAR-10 ResNet as far as you can.`,
          resources: [
            {
              title: 'PyTorch Performance Tuning Guide',
              url: 'https://pytorch.org/tutorials/recipes/recipes/tuning_guide.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PyTorch',
              note: 'DataLoader settings, channels-last, AMP, cudnn.benchmark, fused optimizers and more, each with its rationale.',
              primary: true,
            },
            {
              title: 'PyTorch documentation — Automatic Mixed Precision (torch.amp)',
              url: 'https://pytorch.org/docs/stable/amp.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PyTorch',
              note: 'autocast op lists and GradScaler semantics.',
            },
            {
              title: 'Mixed Precision Training (Micikevicius et al.)',
              url: 'https://arxiv.org/abs/1710.03740',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICLR 2018',
              note: 'Why fp32 master weights and loss scaling are needed.',
            },
            {
              title: 'PyTorch Profiler recipe',
              url: 'https://pytorch.org/tutorials/recipes/recipes/profiler_recipe.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PyTorch',
            },
          ],
          exercises: [
            {
              slug: 'speedrun-cifar',
              title: 'Speed up CIFAR-10 training',
              prompt:
                'Starting from your module-2 CIFAR-10 ResNet, measure time to reach 93% test accuracy. Apply in turn and record the time-to-accuracy after each: DataLoader tuning, channels-last, bf16 or fp16 autocast, a larger batch with scaled learning rate, torch.compile, and a fused optimizer. Profile before and after the biggest change and show where time moved. Present a waterfall chart of the speedups.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'fp16-underflow',
              title: 'See fp16 underflow and loss scaling',
              prompt:
                'Train your GPT from module 4 in pure fp16 without a gradient scaler, with a scaler, and in bf16. Log the fraction of gradient entries that are exactly zero and the scaler\'s scale factor over time. Show the run that fails and explain the failure in terms of the fp16 exponent range; compare final validation loss of the other two with fp32.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'memory-tradeoffs',
              title: 'Gradient accumulation and checkpointing trade-offs',
              prompt:
                'For a model that does not fit at your target batch size (e.g. a larger GPT or ResNet-50 at batch 512), compare: accumulation over k micro-batches, activation checkpointing of every block, and both. Report peak memory (torch.cuda.max_memory_allocated), step time and final loss after a fixed number of samples. Verify that accumulation gives the same gradient as the large batch on a small model without batch norm.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does fp16 training need loss scaling but bf16 does not?',
              answerOutline:
                'fp16 has a small exponent range, so tiny gradients underflow to zero; scaling the loss shifts them into range. bf16 shares fp32\'s exponent range (with less mantissa precision), so underflow is not an issue.',
            },
            {
              question: 'When is gradient accumulation not exactly equivalent to a larger batch?',
              answerOutline:
                'When the model has batch-dependent layers like batch norm (statistics are per micro-batch), or when the loss is not averaged consistently across micro-batches.',
            },
            {
              question: 'How do you tell whether training is input-bound?',
              answerOutline:
                'GPU utilisation is low or spiky, the profiler shows the step waiting on data loading, and throughput rises with more DataLoader workers or with synthetic in-memory data.',
            },
          ],
        },
        {
          slug: 'deployment-and-model-optimization',
          title: 'Exporting, optimising and deploying models',
          summary:
            'From a trained checkpoint to a served model: export with TorchScript or ONNX, quantisation, pruning and knowledge distillation, measuring latency on the target hardware, and serving with a demo app or an API.',
          estimatedMinutes: 120,
          objectives: [
            'Export a PyTorch model to ONNX (or TorchScript / torch.export) and verify numerical equivalence',
            'Apply post-training quantisation and quantisation-aware training and measure accuracy, size and latency',
            'Distil a large model into a small one and explain why soft targets carry more information than labels',
            'Deploy a model as a Gradio demo on Hugging Face Spaces and as an HTTP API, with latency measured at the right percentile',
          ],
          concepts: [
            'Export formats: TorchScript, torch.export, ONNX; ONNX Runtime',
            'Numerical equivalence testing',
            'Post-training quantisation (dynamic, static); int8; calibration',
            'Quantisation-aware training',
            'Pruning: unstructured vs structured',
            'Knowledge distillation; temperature; soft targets',
            'Latency vs throughput; p50/p99; batching',
            'Serving: Gradio, Hugging Face Spaces, FastAPI, TorchServe',
          ],
          explanation: `A model that only runs in your notebook is a result, not a product. **Exporting** freezes it into a portable artefact: **ONNX** is a standard graph format run by ONNX Runtime on CPUs, GPUs and mobile; \`torch.export\` and TorchScript produce graphs PyTorch can run without Python. Always test **numerical equivalence**: run a fixed batch through the original and exported models and assert outputs match to a tolerance, including the preprocessing, since mismatched resizing or normalisation between training and serving is the most common deployment bug.

Then make it small and fast. **Quantisation** stores weights (and optionally activations) in int8 instead of fp32, a 4x size reduction and often a 2-4x CPU speedup. **Dynamic** quantisation converts weights ahead of time and activations on the fly, and suits linear-heavy models like transformers; **static** quantisation calibrates activation ranges on a few hundred examples and suits CNNs; **quantisation-aware training** simulates rounding during fine-tuning to recover lost accuracy. Large language models go further, to 4-bit weights. **Pruning** removes weights: unstructured pruning zeros individual weights and needs sparse kernels to pay off, structured pruning removes whole channels or heads and speeds things up directly. **Knowledge distillation** trains a small *student* to match a large *teacher*'s softened output distribution (softmax at a temperature $T > 1$) as well as the labels; the teacher's probabilities on wrong classes ("this 7 looks a bit like a 1") carry information that hard labels do not, which is why distilled students beat students trained from labels alone.

Measure on the target. Latency depends on hardware, batch size and threads; report the **p50 and p99** latency for single requests and the throughput for batched ones. Deploy a demo with **Gradio** on **Hugging Face Spaces** (free, minutes to set up, as fast.ai lesson 2 shows) and an API with FastAPI for programmatic use, with input validation and a health check. The machine-learning subject's monitoring lesson applies unchanged. Work through fast.ai lesson 2 and the PyTorch quantisation docs, then ship your module-3 model.`,
          resources: [
            {
              title: 'Practical Deep Learning for Coders — lesson 2 (deployment with Gradio and Hugging Face Spaces)',
              url: 'https://course.fast.ai/',
              type: 'course',
              cost: 'free',
              provider: 'fast.ai',
              primary: true,
            },
            {
              title: 'ONNX Runtime documentation',
              url: 'https://onnxruntime.ai/docs/',
              type: 'documentation',
              cost: 'free',
              provider: 'Microsoft / ONNX',
              note: 'Exporting from PyTorch, quantisation tools and performance tuning.',
            },
            {
              title: 'PyTorch documentation — Quantization',
              url: 'https://pytorch.org/docs/stable/quantization.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PyTorch',
              note: 'Dynamic, static and quantisation-aware training workflows.',
            },
            {
              title: 'Distilling the Knowledge in a Neural Network (Hinton, Vinyals, Dean)',
              url: 'https://arxiv.org/abs/1503.02531',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'Gradio documentation',
              url: 'https://www.gradio.app/docs',
              type: 'documentation',
              cost: 'free',
              provider: 'Gradio / Hugging Face',
            },
          ],
          exercises: [
            {
              slug: 'export-and-verify',
              title: 'Export to ONNX and verify equivalence',
              prompt:
                'Export your fine-tuned vision model to ONNX including dynamic batch size. Write a test that runs 100 validation images through the PyTorch model and the ONNX Runtime session with identical preprocessing and asserts max absolute logit difference below 1e-4 and identical top-1 predictions. Then introduce a preprocessing mismatch (different resize interpolation) and report how much accuracy drops: this is the bug the test exists to catch.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'quantise-and-distil',
              title: 'Quantisation and distillation trade-offs',
              prompt:
                'Starting from a ResNet-50 fine-tuned on Imagenette (teacher): (a) apply static int8 quantisation, (b) distil into a ResNet-18 student with T = 4 and α = 0.5, (c) train the ResNet-18 from labels alone, (d) quantise the distilled student. For each report accuracy, model size on disk, and CPU p50/p99 latency at batch 1. Plot accuracy against latency and identify the Pareto front.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'ship-a-demo',
              title: 'Ship a demo and an API',
              prompt:
                'Deploy your best model as a Gradio app on Hugging Face Spaces and as a FastAPI endpoint with input validation and a /health route. Load-test the API with 1,000 requests at concurrency 1 and 16, report p50/p99 latency and throughput, and add request batching if it helps. Document the end-to-end steps in a README so someone else can redeploy it.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does knowledge distillation use a softmax temperature above one?',
              answerOutline:
                'It softens the teacher\'s distribution so the relative probabilities of wrong classes (dark knowledge) are visible and carry gradient; at T = 1 they are nearly zero.',
            },
            {
              question: 'When does unstructured pruning not speed up inference?',
              answerOutline:
                'When the runtime uses dense kernels: zeros still get multiplied. Speedups need sparse kernels/hardware or structured pruning that removes whole channels or heads.',
            },
            {
              question: 'Why test the exported model with the full preprocessing path?',
              answerOutline:
                'The most common serving bug is a preprocessing mismatch (resize, crop, normalisation, colour order); graph equivalence alone will not catch it.',
            },
          ],
        },
      ],
      project: {
        slug: 'deep-learning-data-product',
        title: 'Module project: a deployed deep-learning data product',
        description:
          'Take a problem from your own life or work, gather and clean the data with the model-in-the-loop workflow, train efficiently with mixed precision, optimise the model (quantise or distil) for its deployment target, and ship it as a public demo with a monitoring note.',
        deliverables: [
          'Dataset with a data card describing collection, cleaning steps and label changes',
          'Training notebook with time-to-accuracy and the efficiency techniques used',
          'Optimised exported model with an equivalence test and an accuracy/latency table',
          'Public Gradio demo and a short README with known failure cases',
        ],
        estimatedHours: 12,
      },
    },
    {
      slug: 'scaling-and-frontier-topics',
      title: 'Scaling and Frontier Topics',
      description:
        'How the largest models are built: scaling laws and compute-optimal training, distributed training, self-supervised and multimodal learning, alignment with human feedback, and how to read and reproduce a research paper.',
      lessons: [
        {
          slug: 'scaling-laws-and-distributed-training',
          title: 'Scaling laws and distributed training',
          summary:
            'Power-law relations between loss, parameters, data and compute; the Chinchilla compute-optimal recipe; and the parallelism strategies (data, tensor, pipeline, sharded) that let training span thousands of GPUs.',
          estimatedMinutes: 140,
          objectives: [
            'State the empirical scaling laws for language models and estimate training compute as roughly 6 N D FLOPs',
            'Explain the Chinchilla result on allocating a compute budget between parameters and tokens',
            'Fit a scaling law from your own small runs and extrapolate with appropriate scepticism',
            'Explain data parallelism (DDP), sharded data parallelism (FSDP/ZeRO), tensor and pipeline parallelism, and run DDP across two or more GPUs',
          ],
          concepts: [
            'Power-law scaling of loss with N, D and C',
            'Training compute ≈ 6ND',
            'Compute-optimal training; Chinchilla; tokens per parameter',
            'Fitting and extrapolating scaling curves',
            'Data parallelism; all-reduce; DistributedDataParallel',
            'Sharded data parallel: ZeRO stages, FSDP',
            'Tensor and pipeline parallelism; communication costs',
            'Emergent abilities debate',
          ],
          explanation: `The surprising regularity behind modern AI is that a language model's loss falls as a smooth **power law** in the number of parameters $N$, the number of training tokens $D$ and the compute $C$, over many orders of magnitude, with architecture details mattering much less. Kaplan et al. measured these laws; training compute for a transformer is roughly $C \\approx 6ND$ FLOPs (2 for the forward pass, 4 for the backward, per parameter per token), which lets you budget any run on the back of an envelope. The **Chinchilla** study (Hoffmann et al.) refit the laws carefully and found that for a fixed compute budget, $N$ and $D$ should grow roughly equally, about 20 tokens per parameter, implying that earlier large models were undertrained. Production models now often train far longer than compute-optimal because a smaller model is cheaper to serve.

Scaling laws are a planning tool and you can build one yourself: train your GPT at five or six sizes for appropriate token counts, plot loss against compute on log-log axes, fit a power law plus an irreducible term, and predict the loss of a larger run before you run it. Treat extrapolation as a hypothesis; laws bend when data run out or repeat, and downstream task metrics can change abruptly even when loss is smooth (the **emergence** debate, which partly reflects metric choice).

No single GPU holds or trains a frontier model, hence **parallelism**. **Data parallelism** replicates the model on each GPU, gives each a slice of the batch, and averages gradients with an **all-reduce** after backward; PyTorch's \`DistributedDataParallel\` overlaps the communication with computation, and it is the first thing to use with more than one GPU. When the model plus optimizer state is too big for one device, **sharded** data parallelism (ZeRO, \`FullyShardedDataParallel\`) splits parameters, gradients and Adam states across GPUs and gathers them just in time. **Tensor parallelism** splits individual matrix multiplies across GPUs (needs fast interconnect), and **pipeline parallelism** places layers on different GPUs and streams micro-batches through them. Real systems combine all of these ("3D parallelism"). Read the two scaling papers, do the PyTorch DDP tutorial, and fit your own law.`,
          resources: [
            {
              title: 'Scaling Laws for Neural Language Models (Kaplan et al.)',
              url: 'https://arxiv.org/abs/2001.08361',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Figure 1 and section 2 for the laws and the 6ND compute estimate.',
              primary: true,
            },
            {
              title: 'Training Compute-Optimal Large Language Models (Hoffmann et al., Chinchilla)',
              url: 'https://arxiv.org/abs/2203.15556',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / NeurIPS 2022',
            },
            {
              title: 'PyTorch tutorial — Getting Started with Distributed Data Parallel',
              url: 'https://docs.pytorch.org/tutorials/intermediate/ddp_tutorial.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PyTorch',
              note: 'DDP setup, torchrun, and the FSDP tutorials linked from the same section.',
            },
            {
              title: 'The Ultra-Scale Playbook: Training LLMs on GPU Clusters (Hugging Face)',
              url: 'https://huggingface.co/spaces/nanotron/ultrascale-playbook',
              type: 'article',
              cost: 'free',
              provider: 'Hugging Face',
              note: 'A long, interactive guide to data, tensor, pipeline and sharded parallelism with measured costs.',
            },
            {
              title: 'Neural Networks: Zero to Hero — Let\'s reproduce GPT-2 (124M)',
              url: 'https://karpathy.ai/zero-to-hero.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Andrej Karpathy',
              note: 'Mixed precision, torch.compile, Flash attention and DDP applied to a real GPT-2 reproduction.',
            },
          ],
          exercises: [
            {
              slug: 'fit-a-scaling-law',
              title: 'Fit your own scaling law',
              prompt:
                'Train your GPT at 5-6 sizes (e.g. 0.2M to 20M parameters) on a fixed corpus (Tiny Stories, WikiText-103 or OpenWebText subset), each for about 20 tokens per parameter. Estimate compute with 6ND. Plot validation loss against compute on log-log axes, fit L(C) = a C^(-b) + c, and use the fit to predict the loss of a run 4x larger than your largest; then run it and report the prediction error.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'ddp-training',
              title: 'Data-parallel training with DDP',
              prompt:
                'Convert your training loop to DistributedDataParallel with torchrun and a DistributedSampler. On 2 (or more) GPUs (a cloud or Kaggle multi-GPU instance), measure throughput scaling efficiency relative to one GPU, and verify that final validation loss matches single-GPU training with the same global batch size. Profile one step to show communication overlapping backward. If you have no multi-GPU access, run with 2 CPU processes using the gloo backend and verify gradient equality.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'compute-budgeting',
              title: 'Budget a training run',
              prompt:
                'Using C ≈ 6ND and Chinchilla\'s ~20 tokens per parameter, compute the compute-optimal model size and token count for budgets of 1e18, 1e20 and 1e22 FLOPs. For each, estimate GPU-hours on an accelerator at 40% utilisation of its peak bf16 throughput (state the peak you assume), the memory needed for parameters plus Adam state, and the minimum number of GPUs for FSDP. Present a table and discuss what changes if you plan to serve the model to many users.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Where does the 6ND estimate of training FLOPs come from?',
              answerOutline:
                'Each parameter does a multiply-add (2 FLOPs) per token in the forward pass and about twice that in the backward pass (gradients for activations and weights), giving about 6 FLOPs per parameter per token.',
            },
            {
              question: 'What did Chinchilla conclude about allocating compute?',
              answerOutline:
                'Parameters and training tokens should scale roughly equally with compute (about 20 tokens per parameter); many earlier large models were too big for their data and would have been better smaller and trained longer.',
            },
            {
              question: 'What problem does sharded data parallelism solve that DDP does not?',
              answerOutline:
                'DDP replicates full parameters, gradients and optimizer states on every GPU; when those exceed one device\'s memory, FSDP/ZeRO shards them across GPUs and gathers parameters only when needed.',
            },
          ],
        },
        {
          slug: 'self-supervised-and-multimodal-learning',
          title: 'Self-supervised and multimodal learning',
          summary:
            'Learning representations without labels: contrastive learning (SimCLR), masked image modelling, self-distillation; vision transformers; and connecting images and text with CLIP for zero-shot classification and retrieval.',
          estimatedMinutes: 130,
          objectives: [
            'Explain the self-supervised paradigm and the pretext tasks used in vision (contrastive, masked, self-distillation)',
            'Implement the InfoNCE contrastive loss and train a SimCLR-style model, evaluating it with a linear probe',
            'Describe the vision transformer and why it needs more data or pretraining than a CNN',
            'Use CLIP for zero-shot classification and image-text retrieval and analyse its failure modes',
          ],
          concepts: [
            'Self-supervised learning; pretext tasks',
            'Contrastive learning; positives, negatives; InfoNCE',
            'Augmentation as the definition of invariance',
            'Masked autoencoders; self-distillation (DINO)',
            'Vision transformer: patches, class token, inductive bias',
            'CLIP: dual encoders, shared embedding space',
            'Zero-shot classification; prompt templates',
            'Linear probe evaluation',
          ],
          explanation: `Labels are expensive; raw images and text are nearly free. **Self-supervised learning** invents a supervised task from the data itself (a **pretext task**) so a network learns useful representations, which are then fine-tuned or probed with few labels. In language the pretext task is next-token prediction, which you have already used. Vision needed more invention.

**Contrastive learning** (SimCLR, MoCo) takes two random augmentations of the same image as a **positive** pair and all other images in the batch as **negatives**, and trains an encoder so positive embeddings are close and negatives far, with the **InfoNCE** loss: for an anchor $\\mathbf{z}_i$ and its positive $\\mathbf{z}_j$, $-\\log \\frac{\\exp(\\mathrm{sim}(\\mathbf{z}_i, \\mathbf{z}_j)/\\tau)}{\\sum_{k \\ne i}\\exp(\\mathrm{sim}(\\mathbf{z}_i, \\mathbf{z}_k)/\\tau)}$, a softmax classification of which item in the batch is the partner. The **augmentations define what the representation ignores**: random crops plus colour distortion force it to capture object identity rather than position or hue. Large batches and a temperature $\\tau$ around 0.1 matter. **Masked autoencoders** hide 75% of image patches and reconstruct them, the vision analogue of BERT; **self-distillation** (DINO) trains a student to match a momentum teacher on different views without negatives. Evaluate any of them with a **linear probe** on frozen features.

These methods pair naturally with the **vision transformer**: split an image into $16 \\times 16$ patches, embed each as a token, add position embeddings and a class token, and run a standard transformer. ViTs lack the locality and translation priors of convolution, so they underperform CNNs on small data and overtake them with large-scale pretraining.

**CLIP** extends contrastive learning across modalities: an image encoder and a text encoder are trained on 400 million image-caption pairs so matching pairs have high cosine similarity. The result is a shared embedding space in which you can classify images **zero-shot** by embedding prompts like "a photo of a {label}" and picking the nearest, retrieve images from text, and condition generative models (CLIP and its successors provide the text conditioning in diffusion models). It inherits biases from web captions and fails on counting, fine-grained and abstract tasks. Read the SimCLR and CLIP papers, implement InfoNCE, and probe CLIP's zero-shot behaviour on datasets you know.`,
          resources: [
            {
              title: 'A Simple Framework for Contrastive Learning of Visual Representations (Chen et al., SimCLR)',
              url: 'https://arxiv.org/abs/2002.05709',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICML 2020',
              note: 'Algorithm 1 and the augmentation ablation in section 3.',
              primary: true,
            },
            {
              title: 'Learning Transferable Visual Models From Natural Language Supervision (Radford et al., CLIP)',
              url: 'https://arxiv.org/abs/2103.00020',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICML 2021',
              note: 'Figure 3 (pseudocode of the training loop) and section 3.1 on zero-shot transfer.',
            },
            {
              title: 'An Image is Worth 16x16 Words (Dosovitskiy et al., ViT)',
              url: 'https://arxiv.org/abs/2010.11929',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICLR 2021',
            },
            {
              title: 'OpenCLIP — open-source CLIP implementation and pretrained models',
              url: 'https://github.com/mlfoundations/open_clip',
              type: 'tool',
              cost: 'free',
              provider: 'LAION / ML Foundations',
            },
            {
              title: 'Dive into Deep Learning — section 11.8, Transformers for Vision',
              url: 'https://d2l.ai/chapter_attention-mechanisms-and-transformers/index.html',
              type: 'textbook',
              cost: 'free',
              provider: 'D2L',
            },
          ],
          exercises: [
            {
              slug: 'simclr-cifar',
              title: 'SimCLR on CIFAR-10 with a linear probe',
              prompt:
                'Implement SimCLR with a ResNet-18 encoder, a 2-layer projection head and the InfoNCE (NT-Xent) loss; train on CIFAR-10 images without labels for at least 100 epochs. Evaluate with a linear probe on frozen features using 1%, 10% and 100% of the labels, and compare with a supervised ResNet-18 trained on the same label fractions. Then ablate the augmentations (remove colour jitter; remove random crop) and report the probe accuracy drop.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'clip-zero-shot',
              title: 'CLIP zero-shot classification and its failures',
              prompt:
                'With OpenCLIP, evaluate zero-shot accuracy on CIFAR-10, Oxford Pets and a dataset of your choice using (a) bare class names, (b) "a photo of a {}", (c) an ensemble of 10 templates. Compare with a linear probe on CLIP image features. Then construct 20 test cases probing known weaknesses (counting objects, text in images as a typographic attack, left/right relations) and report how CLIP does on each.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'vit-vs-cnn-data',
              title: 'ViT vs CNN across data scales',
              prompt:
                'Train a small ViT (patch 4, 6 layers) and a ResNet-18 of similar parameter count from scratch on 10%, 50% and 100% of CIFAR-10 with strong augmentation, then fine-tune pretrained versions of each (timm). Plot test accuracy against data fraction for the four settings. Explain the result in terms of inductive bias.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'In contrastive learning, what determines which information the representation keeps?',
              answerOutline:
                'The augmentations: the representation must be invariant to whatever differs between the two views (crop position, colour) and keep what they share (object identity).',
            },
            {
              question: 'How does CLIP perform zero-shot classification?',
              answerOutline:
                'It embeds a text prompt for each class with the text encoder and the image with the image encoder, then predicts the class whose text embedding has the highest cosine similarity with the image embedding.',
            },
            {
              question: 'Why do vision transformers need more data than CNNs to train from scratch?',
              answerOutline:
                'They lack built-in locality and translation equivariance, so these regularities must be learned from data; with enough data or pretraining they surpass CNNs because the weaker prior is less limiting.',
            },
          ],
        },
        {
          slug: 'alignment-rlhf-and-reinforcement-learning',
          title: 'Reinforcement learning and aligning language models with human feedback',
          summary:
            'A compact introduction to deep reinforcement learning (MDPs, policy gradients, REINFORCE, PPO), then its use in aligning language models: supervised instruction tuning, reward models, RLHF, direct preference optimisation and their failure modes.',
          estimatedMinutes: 140,
          objectives: [
            'Define a Markov decision process, return, policy and value, and derive the policy gradient (REINFORCE) with a baseline',
            'Train a policy-gradient agent on a Gymnasium control task and explain the variance problem',
            'Describe the RLHF pipeline: supervised fine-tuning, reward modelling from pairwise preferences, and PPO with a KL penalty',
            'Derive the DPO objective from the KL-regularised reward-maximisation problem and fine-tune a small model with it',
            'Explain reward hacking, over-optimisation and other alignment failure modes',
          ],
          concepts: [
            'MDP: states, actions, rewards, discount; policy; return',
            'Policy gradient theorem; REINFORCE; baselines and advantage',
            'PPO: clipped objective',
            'Instruction tuning (supervised fine-tuning)',
            'Reward models from pairwise preferences (Bradley-Terry)',
            'RLHF with KL penalty to a reference model',
            'Direct preference optimisation (DPO)',
            'Reward hacking; Goodhart; evaluation of aligned models',
          ],
          explanation: `**Reinforcement learning** learns from rewards rather than labels. An agent in a **Markov decision process** observes a state, takes an action from its **policy** $\\pi_\\theta(a \\mid s)$, receives a reward and a new state; the goal is to maximise the expected discounted **return**. Deep RL uses networks for the policy or value function, and the most direct method is the **policy gradient**: $\\nabla_\\theta J = \\mathbb{E}[\\sum_t \\nabla_\\theta \\log\\pi_\\theta(a_t \\mid s_t)\\,(G_t - b(s_t))]$. Increase the log-probability of actions that led to better-than-expected returns. This is **REINFORCE**; the **baseline** $b$ (usually a learned value function, giving the **advantage**) does not bias the gradient but dramatically reduces its variance, which is the central practical problem. **PPO** stabilises updates by clipping the ratio between new and old action probabilities, and is the workhorse algorithm. Train it on CartPole and LunarLander in Gymnasium to feel how noisy RL is compared with supervised learning.

A pretrained language model predicts internet text, not helpful answers. **Alignment** fine-tuning turns it into an assistant in stages. **Supervised fine-tuning** on demonstrations of good responses teaches the format. Then people compare pairs of model responses, and a **reward model** is trained on these preferences with the Bradley-Terry loss $-\\log\\sigma(r(x, y_w) - r(x, y_l))$. **RLHF** then treats the language model as a policy (each token an action, the reward model's score at the end the reward) and optimises it with PPO, with a **KL penalty** to the SFT model so it does not drift into gibberish that fools the reward model.

**DPO** observes that the KL-regularised objective has a closed-form optimal policy, $\\pi^*(y \\mid x) \\propto \\pi_{\\text{ref}}(y \\mid x)\\exp(r(x, y)/\\beta)$; inverting it expresses the reward through the policy, and substituting into the Bradley-Terry loss gives a simple classification-style loss on preference pairs with no reward model and no RL loop. It is now widely used because it is stable and cheap.

The failure modes are as instructive as the methods. **Reward hacking** (Goodhart's law): optimising a learned proxy too hard produces outputs that score well and are worse, such as verbose, sycophantic or confidently wrong answers; the KL penalty and early stopping are partial defences. Preferences encode the biases of the people giving them. Read Spinning Up's policy-gradient introduction, the InstructGPT and DPO papers, and use the TRL library for the exercises.`,
          resources: [
            {
              title: 'OpenAI Spinning Up in Deep RL — Introduction to RL (parts 1-3)',
              url: 'https://spinningup.openai.com/en/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'OpenAI',
              note: 'Key concepts, the policy gradient derivation and the PPO page.',
              primary: true,
            },
            {
              title: 'Training language models to follow instructions with human feedback (Ouyang et al., InstructGPT)',
              url: 'https://arxiv.org/abs/2203.02155',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / NeurIPS 2022',
              note: 'Figure 2 summarises the SFT, reward model and PPO stages.',
            },
            {
              title: 'Direct Preference Optimization: Your Language Model is Secretly a Reward Model (Rafailov et al.)',
              url: 'https://arxiv.org/abs/2305.18290',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / NeurIPS 2023',
              note: 'Section 4 derives the DPO loss.',
            },
            {
              title: 'Hugging Face TRL — Transformer Reinforcement Learning library',
              url: 'https://huggingface.co/docs/trl/index',
              type: 'documentation',
              cost: 'free',
              provider: 'Hugging Face',
              note: 'SFTTrainer, RewardTrainer, PPO and DPOTrainer with examples.',
            },
            {
              title: 'Gymnasium — RL environments',
              url: 'https://gymnasium.farama.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Farama Foundation',
            },
          ],
          exercises: [
            {
              slug: 'reinforce-and-ppo',
              title: 'REINFORCE and PPO on Gymnasium',
              prompt:
                'Implement REINFORCE with and without a learned value baseline on CartPole-v1, running 5 seeds each; plot mean and spread of episode return against environment steps. Then train PPO (your own or Stable-Baselines3) on LunarLander-v2/v3 and report the steps needed to reach a mean return of 200. Measure the variance of the policy-gradient estimate with and without the baseline at a fixed policy.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'dpo-derivation',
              title: 'Derive DPO',
              prompt:
                'Starting from max_π E[r(x,y)] - β KL(π || π_ref), derive the optimal policy π*(y|x) ∝ π_ref(y|x) exp(r(x,y)/β). Solve for r in terms of π* and the partition function, substitute into the Bradley-Terry preference likelihood, and show the partition function cancels, yielding the DPO loss. Explain the role of β and what happens as β → 0.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'dpo-finetune-and-hacking',
              title: 'DPO fine-tuning and reward hacking',
              prompt:
                'With TRL, fine-tune a small instruction model (e.g. a 0.5-1B parameter open model, with LoRA) using DPO on a public preference dataset. Compare base and DPO models on 50 held-out prompts using pairwise LLM-as-judge with order swapping. Then train a reward model, optimise against it with best-of-n sampling for n = 1, 4, 16, 64, and plot reward-model score and judge win rate against n; identify where over-optimisation begins.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does subtracting a baseline not bias the policy gradient?',
              answerOutline:
                'E[∇ log π(a|s) b(s)] = b(s) ∇ Σ_a π(a|s) = b(s) ∇ 1 = 0, so the baseline term has zero expectation; it only changes the variance.',
            },
            {
              question: 'What is the purpose of the KL penalty in RLHF?',
              answerOutline:
                'It keeps the policy close to the supervised reference model, preventing it from exploiting reward-model errors with degenerate text and preserving fluency and knowledge.',
            },
            {
              question: 'What does DPO remove from the RLHF pipeline and why is that possible?',
              answerOutline:
                'The explicit reward model and the RL loop: the KL-regularised optimum gives the reward as a log-ratio of policy to reference, so the preference likelihood can be optimised directly in terms of the policy.',
            },
          ],
        },
        {
          slug: 'reading-and-reproducing-research',
          title: 'Reading, reproducing and extending research',
          summary:
            'How to read a deep-learning paper critically, reproduce its central result on a small budget, run the ablations that test its claims, and write up findings, with mechanistic interpretability as a worked frontier area.',
          estimatedMinutes: 110,
          objectives: [
            'Read a paper in three passes and extract the claim, the evidence and the weakest link',
            'Reproduce a paper\'s central result at small scale and report discrepancies honestly',
            'Design ablations and controls that test whether a claimed component is responsible for a gain',
            'Apply a basic mechanistic-interpretability analysis (probing, activation patching) to a small transformer',
          ],
          concepts: [
            'Three-pass reading; claims vs evidence',
            'Baselines, tuning budgets and fair comparison',
            'Seeds, variance and significance in deep learning',
            'Reproduction at reduced scale',
            'Ablations and controls',
            'Linear probes; activation patching; induction heads',
            'Writing up: negative results, limitations',
          ],
          explanation: `Deep learning moves fast and its literature is uneven. A large fraction of claimed improvements shrink or vanish when baselines are tuned as carefully as the proposed method, when results are averaged over seeds, or when the evaluation is changed slightly. The last skill of this subject is reading and testing papers yourself.

Read in **three passes**. First, five minutes: title, abstract, figures, conclusion; what is claimed? Second, an hour: the method and the experiments; what evidence supports the claim, against which baselines, at what tuning budget, over how many seeds? Third, as long as it takes, only for papers you will build on: reimplement mentally or in code, and find the weakest link: an untuned baseline, a missing ablation, a metric that favours the method, test data seen during development.

**Reproduce** the central result at a scale you can afford: a smaller model, a smaller dataset (CIFAR instead of ImageNet, Tiny Stories instead of the web), with the paper's hyperparameters scaled sensibly. Use the authors' code if it exists, but also write the core yourself, since many papers' key details are only in the code. Report what matched and what did not; a carefully documented failure to reproduce is a valuable result.

Then **test the claim**. If a paper says component X causes gain Y, ablate X with everything else fixed, tune the baseline with the same budget, and run at least three seeds; a gain smaller than the seed-to-seed spread is not a gain. Add a control that would produce the gain for a boring reason (for example, more parameters or more compute) and check it does not.

**Mechanistic interpretability** is a frontier area where small-scale reproduction is especially rewarding: train a two-layer attention-only transformer, find its **induction heads** (heads that complete repeated sequences, the mechanism behind in-context copying), and confirm their role by **activation patching**, replacing a head's output with that from a different input and measuring the effect. Probes and patching are causal tools that test explanations rather than illustrate them. Read the Anthropic induction-heads paper and use TransformerLens for the exercise.`,
          resources: [
            {
              title: 'How to Read a Paper (S. Keshav)',
              url: 'https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf',
              type: 'article',
              cost: 'free',
              provider: 'University of Waterloo / Stanford handout',
              note: 'The three-pass method in three pages.',
              primary: true,
            },
            {
              title: 'In-context Learning and Induction Heads (Olsson et al.)',
              url: 'https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html',
              type: 'article',
              cost: 'free',
              provider: 'Anthropic / Transformer Circuits',
            },
            {
              title: 'TransformerLens — mechanistic interpretability library',
              url: 'https://github.com/TransformerLensOrg/TransformerLens',
              type: 'tool',
              cost: 'free',
              provider: 'TransformerLens',
              note: 'Hooks for caching and patching activations in GPT-style models, with tutorials.',
            },
            {
              title: 'Papers with Code',
              url: 'https://paperswithcode.com/',
              type: 'tool',
              cost: 'free',
              provider: 'Papers with Code',
              note: 'Find official and community implementations and benchmark results for papers you reproduce.',
            },
            {
              title: 'ML Reproducibility Challenge',
              url: 'https://reproml.org/',
              type: 'article',
              cost: 'free',
              provider: 'ML Reproducibility Challenge',
              note: 'Examples of published reproduction reports and their structure.',
            },
          ],
          exercises: [
            {
              slug: 'critical-reading',
              title: 'Three-pass reading of two papers',
              prompt:
                'Pick two papers from this subject\'s resources or a recent conference. For each, write a one-page review: the claim in one sentence; the evidence (datasets, baselines, seeds, tuning budget); the weakest link; one experiment that would most strengthen or falsify the claim; and whether you would use the method. Compare your review with public reviews on OpenReview if available.',
              kind: 'reading',
              difficulty: 1,
            },
            {
              slug: 'small-scale-reproduction',
              title: 'Reproduce a result at small scale',
              prompt:
                'Choose a paper with a clear central claim reproducible on one GPU in a day (e.g. label smoothing improves calibration, mixup improves robustness, a specific normalisation or optimizer improves a small transformer). Reproduce the headline comparison at small scale with 3 seeds and a baseline tuned with the same budget as the method. Add one ablation and one control. Write a 2-3 page reproduction report including discrepancies.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'induction-heads',
              title: 'Find and patch induction heads',
              prompt:
                'Train (or load via TransformerLens) a 2-layer attention-only transformer. Feed sequences of random tokens repeated twice and plot per-position loss: it should drop in the second repeat. Compute each head\'s induction score (attention from a token to the token after its previous occurrence) and identify the induction heads. Then zero-ablate and activation-patch those heads and measure the change in second-repeat loss, comparing with ablating random heads.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Name three common reasons a published improvement fails to hold up.',
              answerOutline:
                'Untuned or weak baselines; single-seed results within noise; confounds such as more compute or parameters; test-set reuse during development; metrics or datasets chosen to favour the method.',
            },
            {
              question: 'What makes an ablation convincing?',
              answerOutline:
                'Changing exactly one component with everything else fixed, equal tuning budgets, multiple seeds with spread reported, and a control for trivial explanations like added capacity.',
            },
            {
              question: 'How does activation patching test a mechanistic hypothesis rather than illustrate it?',
              answerOutline:
                'It intervenes causally: replacing a component\'s activation with one from a different input and measuring the change in behaviour shows whether that component is necessary or sufficient for it, instead of just showing a correlated pattern.',
            },
          ],
        },
      ],
      project: {
        slug: 'reproduce-and-extend',
        title: 'Module project: reproduce and extend a paper',
        description:
          'Select a recent paper whose central claim can be tested on modest compute. Reproduce the main result, run ablations and controls that test the claim, extend it with one new experiment (a new dataset, scale point or variant), and write it up as a short workshop-style paper with honest limitations.',
        deliverables: [
          'Code reproducing the main table at small scale, with seeds and a tuned baseline',
          'Ablation and control experiments with confidence intervals',
          'One extension experiment beyond the paper',
          'A 4-6 page write-up in workshop-paper format, including a reproducibility checklist',
        ],
        estimatedHours: 16,
      },
    },
  ],
  capstone: {
    slug: 'train-evaluate-deploy-with-ablations',
    title: 'Capstone: train, evaluate and deploy a model on a real task with an ablation study',
    description: `Choose a real task with a real dataset where deep learning is the right tool (fine-grained image classification or segmentation, a text classification or generation task, audio, a tabular problem with text fields, or a multimodal retrieval task). The task should have a meaningful baseline you can beat and an evaluation that matters to someone.

Deliver a complete project. Data: inspection, cleaning, splits that respect groups and time, and a leakage audit. Modelling: a from-scratch baseline, a transfer-learning or fine-tuning approach, and at least one architectural or training variation, all trained with your reusable loop or a framework you understand, under a fixed compute budget. Evaluation: the right metrics with confidence intervals over seeds, calibration, an error analysis with a failure taxonomy, and a check for shortcuts or bias (for example, does the model use background cues?). Ablation study: a table attributing performance to pretraining, augmentation, regularization, model size and training length, with a plot of accuracy against compute. Deployment: an exported, optimised model (ONNX or TorchScript, quantised if it helps) behind an endpoint or a public demo (Gradio / Hugging Face Space), with measured latency and a monitoring plan. Report: 8-12 pages in the structure of a workshop paper (introduction, data, methods, experiments, ablations, analysis, limitations, ethical considerations) plus a model card.`,
    deliverables: [
      'Repository with one-command training, evaluation and export; pinned environment; tracked experiments',
      'Results table with baseline, transfer and variant models, confidence intervals over 3 seeds, and the single final test evaluation',
      'Ablation table and accuracy-vs-compute plot',
      'Error analysis with failure taxonomy and a shortcut/bias check',
      'Deployed demo or endpoint with latency measurements and a model card',
      'An 8-12 page written report',
    ],
    estimatedHours: 40,
    stretchGoals: [
      'Distil the final model into one that runs at least 4x faster on CPU with less than 1 point of accuracy loss',
      'Add a self-supervised pretraining stage on unlabelled data from the same domain and measure its benefit in the low-label regime',
      'Perform a mechanistic analysis of one learned feature or attention head and verify it causally with an ablation',
    ],
  },
  masteryChecklist: [
    'I can derive backpropagation on a computational graph and have written an autograd engine that trains a network',
    'I can write a PyTorch training loop from memory with evaluation, checkpointing, logging and seeds, and diagnose a broken one systematically',
    'I can explain initialisation, normalisation, optimizers, schedules and regularization, and choose them for a new problem with a justified ablation',
    'I can implement convolution and a residual network, train a CNN to a strong CIFAR-10 result, and fine-tune a pretrained vision model',
    'I can implement self-attention and a GPT from scratch, train a character-level language model, and fine-tune a pretrained transformer for a downstream task',
    'I can derive the VAE objective and the diffusion training loss and have trained VAE, GAN and diffusion models on real images',
    'I can build a fast data pipeline, use mixed precision and profiling, and export and serve a model with measured latency',
    'I can explain scaling laws, distributed training strategies and the RLHF/DPO alignment pipeline, and read a modern paper critically',
    'I have completed an end-to-end deep-learning project with an ablation study, error analysis and a deployed demo',
  ],
});
