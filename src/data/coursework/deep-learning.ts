import { defineCoursework } from '../define';

const pyExtensions = ['ms-python.python', 'ms-python.vscode-pylance', 'ms-toolsai.jupyter', 'charliermarsh.ruff'];
const pyToolchain = [
  'Install Python 3.12 from python.org and tick "Add python.exe to PATH". Everything here runs natively on Windows 10, so WSL is not needed.',
  'In the VS Code terminal: `python -m venv .venv`, then `.venv\\Scripts\\Activate.ps1`. If PowerShell blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.',
  'Choose `.venv` as both the Python interpreter and the Jupyter kernel in VS Code. No local GPU is assumed.',
];

export default defineCoursework({
  subjectId: 'deep-learning',
  machineProblems: [
    {
      slug: 'mp1-netdoctor',
      title: 'netdoctor: an automatic diagnostician for broken training runs',
      afterModule: 'training-deep-networks',
      coversModules: ['neural-network-foundations', 'training-deep-networks'],
      summary: 'Build a tool that instruments any PyTorch model, runs the debugging recipe automatically, and names the fault in ten deliberately broken training scripts.',
      language: 'Python 3.12 with PyTorch',
      estimatedHours: 16,
      overview: `Neural networks fail silently. A bug rarely raises an exception. The loss just goes down a little more slowly, or stops at a suspicious number, and you lose a day. Module 2 gave you a recipe for finding these faults by hand. In this MP you turn that recipe into software.

\`netdoctor\` has three parts. The first is a **reusable training loop** with seeds, checkpoints, resumable runs, schedulers and logs. The second is a set of **probes**, built on PyTorch hooks, that record activations, gradient norms, update-to-weight ratios and dead units layer by layer without changing what the model computes. The third is a **set of checks** that each state an expected result, such as an initial loss of $\\ln 10$ for ten balanced classes, and report what they find.

To prove it works, you write a **bug zoo**: ten training scripts with exactly one bug each, plus a healthy control. \`netdoctor\` must name every bug and stay quiet on the control. You then use your own tool in an ablation study on Fashion-MNIST, where one result will probably surprise you. In a test run, the augmentation that helps convolutional networks made an MLP about 2.5 points worse, and your report has to explain why.

**Constraints.** Use PyTorch on a CPU, with MLPs only, since convolution arrives in the next module. A 15-epoch run of the 3-layer MLP took 30 to 60 seconds on a 6-core laptop CPU, so the whole study fits on a machine with no GPU. Write your own probes rather than using a logging service.`,
      setup: {
        extensions: pyExtensions,
        toolchain: [
          ...pyToolchain,
          'Install the CPU build of PyTorch: `pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu`, then `pip install numpy matplotlib pandas pytest ruff jupyter ipykernel`.',
          'Fashion-MNIST downloads through `torchvision.datasets.FashionMNIST`. Keep `num_workers=0` on Windows unless your entry point is under `if __name__ == "__main__":`.',
        ],
        structure: `netdoctor/
├── netdoctor/train.py     # fit(): seeds, modes, clipping, checkpoints, CSV logs
├── netdoctor/losses.py    # cross-entropy from logits, label smoothing, focal loss
├── netdoctor/optim.py     # your AdamW, one-cycle and cosine schedules
├── netdoctor/probes.py    # hooks for activations, gradients, updates, dead units
├── netdoctor/checks.py    # each check returns Finding(code, severity, evidence)
├── netdoctor/lr_find.py   # learning-rate range test
├── netdoctor/__main__.py  # python -m netdoctor check <script>
├── zoo/                   # healthy.py and ten scripts with one bug each
├── study/ablate.py        # the Fashion-MNIST ablation, with 3 seeds per row
├── tests/                 # your acceptance tests, written with pytest
├── REPORT.md
└── pyproject.toml`,
        commands: [
          { label: 'Install the package in editable mode', command: 'pip install -e .' },
          { label: 'Diagnose one broken script', command: 'python -m netdoctor check zoo/double_softmax.py' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
          { label: 'Run the ablation study', command: 'python study/ablate.py --seeds 0 1 2 --out results/' },
          { label: 'Lint', command: 'ruff check .' },
        ],
      },
      requirements: [
        '`train.fit` is one reusable loop that sets seeds, switches train and eval modes, supports gradient norm clipping and schedulers, writes a CSV log, and saves checkpoints holding the model, optimizer, scheduler and RNG states.',
        '`losses.py` implements cross-entropy from logits with the log-sum-exp trick, label smoothing and focal loss, each with a finite-difference gradient check in double precision.',
        '`optim.py` implements AdamW with decoupled weight decay in under 40 lines, plus one-cycle and cosine schedules with warm-up.',
        '`probes.py` uses forward and backward hooks to record per-layer activation mean and standard deviation, the fraction of ReLU units dead across a 2,000 sample batch, gradient norm, and update-to-weight ratio. It removes every hook when finished, and a test shows that outputs are unchanged.',
        '`checks.py` covers at least these: initial loss against $\\ln C$, overfitting one batch, input statistics, outputs that look like probabilities, gradient flow from first to last layer, parameters that never update, eval-mode determinism, symmetric units, loss broadcasting, and non-finite values.',
        'Each zoo script exposes `build()` returning a model, data, loss and optimizer, and the CLI prints every `Finding` with its code, severity and numeric evidence, then exits non-zero on an error.',
        'The zoo has these ten bugs: softmax before `CrossEntropyLoss`, a missing `zero_grad`, labels shuffled apart from inputs, learning rate 20 with SGD, raw 0 to 255 inputs, all-zero weights, a layer left out of the optimizer, ReLUs killed by a bias of -5, dropout left on at evaluation, and an `(N, 1)` minus `(N,)` broadcast in MSE.',
        '`lr_find` sweeps the learning rate exponentially from 1e-6 to 1 over 300 steps with a smoothed loss, stops when the loss passes 4 times its best value, and suggests one tenth of the rate at the minimum.',
        '`study/ablate.py` trains a 3-hidden-layer, 512-unit MLP for 15 epochs on a 55,000/5,000 split, adding one change per row with 3 seeds: Adam, one-cycle, Kaiming init with batch norm, dropout 0.2 with AdamW, then random flips and shifts of 2 pixels with label smoothing 0.1.',
        '`REPORT.md` has the ablation table as mean and standard deviation, the range test plot, a gradient-flow figure, and an explanation of each row, including why translation augmentation hurts a model that has no translation equivariance.',
      ],
      acceptanceTests: [
        'Your cross-entropy with label smoothing matches `torch.nn.functional.cross_entropy` within 1e-6, gradient checks have relative error below 1e-6, and your AdamW matches `torch.optim.AdamW` parameters within 1e-5 after 100 steps on a small MLP.',
        'The healthy control starts within 0.05 of $\\ln 10 = 2.3026$, reaches 100% accuracy and a loss below 1e-3 on a 32-sample batch within 100 Adam steps at 1e-3, and produces no error-level finding.',
        'For 20 hidden layers of width 128 with seeds 0, 1 and 2, the ratio of first-layer to last-hidden-layer gradient norm is below 1e-10 for sigmoid with default init, and between 0.1 and 10 for ReLU with Kaiming init.',
        'Each of the ten zoo scripts yields its expected code and no other error-level finding. A 2-layer, 256-unit MLP shows the evidence: raw inputs start near 14 rather than 2.3, double softmax has a loss floor of $\\ln(e + 9) - 1 = 1.4612$ and a first gradient about 10 times smaller, a missing `zero_grad` grows the gradient norm by more than 1,000 times in 600 steps, and the broadcast bug holds MSE within 20% of Var(y) while the fixed version falls below 0.1.',
        'Test accuracy means over 3 seeds are 88.5 to 89.5 for Adam, 89.5 to 90.5 with one-cycle, at least 90.4 with Kaiming init and batch norm, and at least 90.3 with dropout and AdamW. Adding flips, shifts and label smoothing lowers the mean by at least 0.5 points.',
        '`lr_find` suggests between 5e-5 and 1e-3 for Adam and between 5e-3 and 5e-2 for SGD with momentum 0.9 on the healthy model. Two runs with one seed give identical loss curves, and stopping at epoch 5 then resuming gives the same final weights as an uninterrupted run, within 1e-6.',
      ],
      resources: [
        {
          title: 'A Recipe for Training Neural Networks',
          url: 'https://karpathy.github.io/2019/04/25/recipe/',
          type: 'article',
          cost: 'free',
          provider: 'Andrej Karpathy',
          note: 'The recipe you are automating. Turn each of its checks into a function that returns evidence.',
        },
        {
          title: 'Fashion-MNIST',
          url: 'https://github.com/zalandoresearch/fashion-mnist',
          type: 'dataset',
          cost: 'free',
          provider: 'Zalando Research',
          note: 'The dataset for the study. It loads through torchvision.',
        },
      ],
      stretchGoals: [
        'Add two bugs of your own that your checks miss at first, then write checks that catch them.',
        'Package `netdoctor` so that it runs on any `nn.Module`, and use it on a CNN once you reach the next module.',
      ],
    },
    {
      slug: 'mp2-tinyprompt',
      title: 'tinyprompt: a text-to-image diffusion model you train yourself',
      afterModule: 'generative-models',
      coversModules: ['convolutional-networks-and-vision', 'sequence-models-and-transformers', 'generative-models'],
      summary: 'Build a miniature Stable Diffusion from scratch: a transformer text encoder, a U-Net with cross-attention and classifier-free guidance, graded by a classifier you train.',
      language: 'Python 3.12 with PyTorch',
      estimatedHours: 20,
      overview: `Text-to-image systems look like magic, yet their architecture is three ideas from this course stacked together. A **transformer** encodes the prompt, a **U-Net** predicts the noise in an image, and **cross-attention** lets each image region look up the words it needs. In this MP you build all of it, small enough to train on free hardware.

You will not use a pretrained model or a diffusion library. You first generate **CaptionMNIST**: MNIST digits drawn in 6 colours on 3 backgrounds, each with a caption in one of three word orders, such as "a red seven on a white background" or "a white background with a red seven". That makes 180 combinations of digit, colour and background. **Twelve are held out of training**, so you can ask a sharper question than whether the samples look nice: can the model compose a combination it has never seen?

A small CNN you train separately grades every sample on digit, colour and background. You then measure how classifier-free guidance changes the result, compare samplers, and plot cross-attention maps that show which pixels listen to which word.

**Constraints.** Write the text encoder, U-Net, noise schedule, DDPM training and DDIM sampling yourself in PyTorch. You may use \`nn.MultiheadAttention\` for attention, since you built attention from scratch in Module 4. No \`diffusers\` and no pretrained weights.

**Compute.** The CPU path works. In a test run on a 6-core laptop CPU with no GPU, an epoch took about 6 minutes, so 15 epochs of a 1.7 million parameter model took about 90 minutes. A free Colab or Kaggle GPU should cut that to minutes and leaves room for more epochs. Do not judge the model early. In that run, all-three-correct accuracy at guidance 3 was only 0.41 at epoch 10 and reached 0.88 at epoch 15, as the learning rate annealed.`,
      setup: {
        extensions: pyExtensions,
        toolchain: [
          ...pyToolchain,
          'Local CPU path: `pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu`, then `pip install numpy matplotlib pytest ruff jupyter ipykernel`.',
          'Free GPU path: push the repository to GitHub and open `notebooks/train.ipynb` in Google Colab or a Kaggle notebook with a GPU, which already have PyTorch. Google publishes a Colab extension for VS Code that lets you pick a Colab kernel from the editor, or you can use the browser. Copy the checkpoint back and do all evaluation locally.',
        ],
        structure: `tinyprompt/
├── tinyprompt/data.py        # CaptionMNIST generator, held-out combinations
├── tinyprompt/text.py        # tokenizer and transformer encoder
├── tinyprompt/unet.py        # residual blocks, time embedding, cross-attention
├── tinyprompt/diffusion.py   # schedule, q_sample, loss, DDPM and DDIM samplers
├── tinyprompt/grader.py      # CNN that scores digit, colour and background
├── tinyprompt/sample.py      # prompt to image from the command line
├── tinyprompt/evaluate.py    # guidance sweep, Frechet distance, attention maps
├── notebooks/train.ipynb     # thin wrapper for Colab or Kaggle
├── scripts/train.py
├── tests/                    # your acceptance tests, written with pytest
├── REPORT.md
└── pyproject.toml`,
        commands: [
          { label: 'Train the grader', command: 'python -m tinyprompt.grader --out checkpoints/grader.pt' },
          { label: 'Train the diffusion model', command: 'python scripts/train.py --epochs 15 --seed 0 --out checkpoints/model.pt' },
          { label: 'Generate from a prompt', command: 'python -m tinyprompt.sample "a red seven on a white background" --guidance 3 --out out.png' },
          { label: 'Run the full evaluation', command: 'python -m tinyprompt.evaluate --checkpoint checkpoints/model.pt --out results/' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
        ],
      },
      requirements: [
        '`data.py` pads MNIST to 32 by 32 and scales pixels to [-1, 1]. With a fixed seed it colours each digit red, green, blue, yellow, magenta or cyan on black, white or gray, writes captions from the templates "a {colour} {digit} on a {background} background", "a {background} background with a {colour} {digit}" and "the digit {digit} in {colour} on {background}", and excludes 12 seeded combinations from training.',
        '`text.py` has a word or BPE tokenizer and a pre-norm transformer encoder with learned positions and padding masks, and returns one embedding per token plus the leading token as a pooled embedding.',
        '`unet.py` has a 3-resolution U-Net with skip connections, residual blocks, group normalization and sinusoidal time embeddings, with the pooled text embedding added to the time embedding. Cross-attention to the token embeddings runs at the 16 by 16 and 8 by 8 resolutions, and the model stays under 3 million parameters.',
        '`diffusion.py` implements a linear schedule of 1,000 steps from 1e-4 to 0.02, closed-form noising, the simplified noise-prediction loss, DDPM ancestral sampling and DDIM sampling.',
        'Training uses batch size 128, AdamW and a one-cycle schedule peaking at 6e-4. It replaces the caption with a null prompt 10% of the time, clips gradient norms at 1, and keeps an exponential moving average of the weights at decay 0.999, which is what you sample from.',
        'Sampling implements classifier-free guidance $\\hat\\epsilon = \\epsilon_\\emptyset + w(\\epsilon_c - \\epsilon_\\emptyset)$ for any $w$, with $w = 1$ meaning no guidance.',
        '`grader.py` is a CNN with separate heads for digit, colour and background, trained on real renders, and it also exposes penultimate features for a Frechet distance between real and generated images.',
        '`evaluate.py` sweeps $w$ over 1, 2, 3 and 5 for seen and held-out combinations, reports all-three-correct accuracy with a binomial error bar, and compares 50 and 20 DDIM steps on accuracy, Frechet distance and time per image.',
        'The report shows sample grids, the guidance trade-off, nearest training images for 20 samples as a memorization check, and cross-attention maps for at least 3 prompts showing which words attend to which pixels.',
        '`REPORT.md` includes an ablation that removes EMA, removes the pooled embedding, and removes cross-attention, one at a time, with results for each.',
      ],
      acceptanceTests: [
        'With the linear schedule, $\\bar\\alpha_t$ at zero-indexed t = 0, 499 and 999 is 0.9999, 0.0786 and 4.04e-5, each within 1%. The U-Net returns the shape of its input and has under 3 million parameters, and adding extra padding to a caption leaves its pooled embedding unchanged within 1e-5.',
        'The grader trained for 5 epochs scores at least 0.97 on digit and at least 0.995 on colour and background on renders of the MNIST test set.',
        'After 15 epochs at seed 0, training loss is 0.009 to 0.013. Over 60 seen combinations with 5 samples each at 50 DDIM steps, all-three-correct accuracy is at most 0.65 at $w = 1$ and at least 0.80 at $w = 3$, with colour and background each at least 0.98 at $w = 3$.',
        'Over the 12 held-out combinations with 5 samples each, all-three-correct accuracy at $w = 3$ is at least 0.75 and within 0.1 of the seen result, which shows that the model composes words it never saw together. Report it with a binomial interval, since 60 samples is a small test.',
        'At $w = 3$, 20 DDIM steps stay within 0.05 of the 50-step accuracy at under half the time per image, which was about 0.2 s and 0.08 s on a 6-core CPU in a test run. DDIM from one seed reproduces the same image within 1e-5.',
      ],
      resources: [
        {
          title: 'Denoising Diffusion Probabilistic Models',
          url: 'https://arxiv.org/abs/2006.11239',
          type: 'article',
          cost: 'free',
          provider: 'Ho, Jain and Abbeel',
          note: 'Algorithms 1 and 2 are the training and sampling loops you will implement.',
          primary: true,
        },
        {
          title: 'Denoising Diffusion Implicit Models',
          url: 'https://arxiv.org/abs/2010.02502',
          type: 'article',
          cost: 'free',
          provider: 'Song, Meng and Ermon',
          note: 'Equation 12 gives the deterministic update behind fast sampling.',
        },
        {
          title: 'Classifier-Free Diffusion Guidance',
          url: 'https://arxiv.org/abs/2207.12598',
          type: 'article',
          cost: 'free',
          provider: 'Ho and Salimans',
          note: 'Short and direct. Read it before you write the guidance line in your sampler.',
        },
      ],
      stretchGoals: [
        'Train a small VAE to 8 by 8 latents and run the same model in latent space, then compare speed and accuracy.',
        'Add a fourth attribute, such as digit size, and test whether the model can handle captions that mention it.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-pocketclip',
    title: 'pocketclip: private natural-language photo search on your own CPU',
    repoName: 'pocketclip',
    summary: 'Distil a large CLIP model into a tiny image and text encoder pair, then ship a local app that searches a photo folder in plain English with no cloud and no GPU.',
    language: 'Python 3.12 with PyTorch',
    estimatedHours: 60,
    overview: `Your phone can find "dog on a beach" in your camera roll. Your desktop folders of photos usually cannot, and the cloud services that can ask you to upload everything. You will fix that. \`pocketclip index ~/Pictures\` embeds a folder locally, and \`pocketclip search "a dog on a beach"\` returns the best matches in milliseconds. Nothing leaves your machine.

The engineering problem is size. A CLIP ViT-B/32 model has about 151 million parameters and is slow to run across a large photo library on a laptop CPU. You will **distil** it into a small image encoder and a small text encoder that share its embedding space, then measure exactly what that compression costs. The target is a real decision: how much retrieval quality will you give up for each factor of speed and size?

This project uses the whole course. You build the training recipe, fine-tune a CNN, write a transformer, compress embeddings with a VAE, export and quantize for CPU, fit scaling curves, and reproduce a published result at small scale. Then you ship it as something a stranger would install.

**Data.** COCO supplies images with five human captions each, and the 5,000 images of val2017 give a standard retrieval benchmark. Images are fetched individually from their \`coco_url\`, so you need only the subset you train on. Do not commit images to the repository.

**Compute.** The shipped app never needs a GPU. Teacher embeddings and fine-tuning are best done on a free Colab or Kaggle GPU, but there is a full CPU path. Cache the embeddings once, freeze the image backbone, and train only a head on cached features, which took minutes per dataset size in a test run. On a busy 6-core CPU with no GPU, embedding 25,000 images and 125,000 captions took about 90 minutes, fine-tuning 20,000 images for 9 epochs took about 2 hours, and training the text encoder for 5 epochs took about 90 minutes.`,
    setup: {
      extensions: [...pyExtensions, 'github.vscode-github-actions'],
      toolchain: [
        ...pyToolchain,
        'Local app and CPU training path: `pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu`, then `pip install open_clip_torch onnx onnxruntime gradio pillow numpy pandas matplotlib pytest ruff jupyter ipykernel`, and freeze them with `pip freeze > requirements.lock`.',
        'Free GPU path: open `notebooks/` in Google Colab or a Kaggle GPU notebook from GitHub, with Google\'s Colab extension for VS Code or in the browser. Teacher embeddings and fine-tuning run there, and everything else, including all evaluation and the app, runs on a CPU.',
      ],
      structure: `pocketclip/
├── pocketclip/data.py        # COCO captions, per-image downloads, splits
├── pocketclip/teacher.py     # caches teacher embeddings to disk
├── pocketclip/losses.py      # InfoNCE and cosine losses with gradient checks
├── pocketclip/image_model.py # fine-tuned CNN encoder
├── pocketclip/text_model.py  # your transformer and tokenizer
├── pocketclip/train.py       # shared loop, AMP, one-cycle, tracked runs
├── pocketclip/compress.py    # PCA and VAE embedding compression
├── pocketclip/export.py      # ONNX, int8 quantization, equivalence tests
├── pocketclip/index.py       # folder scan, incremental updates, search
├── pocketclip/evaluate.py    # recall on val2017 for any encoder pair
├── pocketclip/__main__.py    # index and search commands
├── pocketclip/app.py         # Gradio interface on localhost
├── experiments/              # ablations, scaling curves, reproduction
├── notebooks/                # Colab and Kaggle wrappers
├── tests/
├── docs/MODEL_CARD.md
├── report/report.md          # 8 to 12 pages in workshop-paper format
├── .github/workflows/ci.yml
└── README.md`,
      commands: [
        { label: 'Fetch captions and a training subset', command: 'python -m pocketclip.data --train-images 30000 --out data/' },
        { label: 'Evaluate any encoder pair on COCO val2017', command: 'python -m pocketclip.evaluate --image models/image.int8.onnx --text models/text.int8.onnx' },
        { label: 'Index a folder', command: 'python -m pocketclip index "C:\\Users\\you\\Pictures"' },
        { label: 'Search', command: 'python -m pocketclip search "a dog on a beach" --top 12' },
        { label: 'Start the local app', command: 'python -m pocketclip.app' },
        { label: 'Run the tests', command: 'python -m pytest -q' },
      ],
    },
    requirements: [
      '`data.py` reads the COCO caption annotations, downloads a seeded training subset by `coco_url` with retries, keeps val2017 untouched as the final benchmark, and splits a tuning set by image. `teacher.py` caches normalized embeddings from an `open_clip` ViT-B-32 model, so that student training never needs the teacher in memory.',
      '`image_model.py` fine-tunes a pretrained small CNN with discriminative learning rates and a new head to 512 dimensions, with under 5 million parameters.',
      '`text_model.py` is your own pre-norm transformer with under 12 million parameters, a token cache, and your own BPE tokenizer or the CLIP tokenizer.',
      '`losses.py` implements cosine distillation and InfoNCE with gradient checks, and `train.py` applies the recipe from the course: overfit one batch, a learning-rate range test, one-cycle training, mixed precision on GPU, and tracked runs with 3 seeds for headline results.',
      '`compress.py` compares PCA and a VAE on embeddings at 32, 64 and 128 dimensions, reporting recall against bytes per image.',
      '`export.py` writes ONNX models, applies int8 quantization, and tests numerical equivalence. Latency is reported at p50 and p99 on a CPU, with file sizes and a table of retrieval against speed.',
      '`experiments/` compares three deployments on recall, size and latency: teacher on both sides, teacher images with your text encoder, and your encoders on both sides. Indexing runs once, so a slow image encoder may be the right trade-off, and you must make that decision with data.',
      '`experiments/` also holds an ablation over loss, pretraining, augmentation and model size, a Grad-CAM audit of 50 query results for shortcut learning, and a power-law scaling fit of retrieval error against training images and against parameters, with one held-out prediction checked by a real run.',
      '`experiments/` reproduces the zero-shot CIFAR-100 evaluation from the CLIP paper with the teacher at small scale, then measures your student on it, and reports how close each comes to the published number.',
      'The app indexes a folder incrementally, stores embeddings in a single file, works fully offline after setup, and has both a CLI and a Gradio interface on localhost. An 8 to 12 page report with a reproducibility checklist and a model card ship with it.',
    ],
    acceptanceTests: [
      'With `laion2b_s34b_b79k` ViT-B-32 weights and all 25,014 captions querying the 5,000 images of val2017, text-to-image Recall@1, @5 and @10 are 0.388, 0.648 and 0.747, each within 0.01.',
      'After training on at least 20,000 images, teacher images with your text encoder reach Recall@10 of at least 0.55, and your image and text encoders together reach at least 0.30, which is the frozen-backbone CPU path, and about 0.34 after fine-tuning. In a seeded pool of 1,000 images, the student pair reaches at least 0.60. The teacher scores 0.92 there, and the report states what that gap means for a personal photo folder.',
      'A frozen-backbone head trained on 1,250, 2,500, 5,000 and 10,000 images, scored with teacher text, rises monotonically from about 0.24 to about 0.38, each within 0.03. A power law for 1 - Recall@10 fitted to those four sizes predicts the result at 20,000 images, about 0.41, within 0.02.',
      'On teacher embeddings at 64 dimensions, PCA fitted on images alone gives Recall@10 near 0.47, and PCA fitted on images and captions gives near 0.62. A VAE trained on that same mix with a small KL weight of about 1e-4 reaches 0.59 to 0.65. Your report states honestly whether the VAE beat PCA, because in a test run it only tied.',
      'ONNX and PyTorch outputs agree within 1e-5. On 1,000 real images, the shipped quantized models keep a mean cosine of at least 0.99 with the float models and lose at most 0.01 of Recall@10. In a test run, static int8 on MobileNetV3 collapsed to a cosine near 0.2 even though it ran, while dynamic quantization of the linear layers kept 0.9998, so this check must run on real images. Single-item p50 latency is below 10 ms for each encoder on 2 CPU threads, at least 20 times faster than the teacher at about 130 ms for an image and 80 ms for text, and the two model files total under 25 MB.',
      'Zero-shot CIFAR-100 on at least 3,000 test images with the template "a photo of a {}." gives the teacher 0.72 to 0.80, and your student is reported beside it. Indexing a folder of 1,000 images takes under 60 seconds on a CPU, a search returns in under 100 ms, a second index run touches only new files, and search works with networking disabled.',
    ],
    coverage: [
      { module: 'neural-network-foundations', demonstrates: 'InfoNCE and cosine losses are written by hand with gradient checks, and the shared training loop drives every model.' },
      { module: 'training-deep-networks', demonstrates: 'The range test, one-cycle schedule, normalization choices and debugging recipe are applied and recorded for each encoder.' },
      { module: 'convolutional-networks-and-vision', demonstrates: 'A pretrained CNN is fine-tuned with discriminative rates, and Grad-CAM audits what the encoder relies on.' },
      { module: 'sequence-models-and-transformers', demonstrates: 'The text encoder is your own transformer, trained to imitate a large language encoder on real captions.' },
      { module: 'generative-models', demonstrates: 'A VAE learns compressed embeddings, and its KL weight sets a measured trade-off between storage and recall against PCA.' },
      { module: 'practical-deep-learning', demonstrates: 'Mixed precision, ONNX export, int8 quantization, equivalence tests, latency percentiles and a Gradio app form a real product.' },
      { module: 'scaling-and-frontier-topics', demonstrates: 'CLIP-style contrastive learning, fitted scaling curves and a small reproduction of a published result ground the report in research practice.' },
    ],
    portfolio: [
      'The README opens with a short screen recording of a plain-English search over a real folder, followed by install steps that work on a fresh Windows machine.',
      'GitHub Actions runs the tests, an ONNX equivalence check and a tiny end-to-end index and search on every push, with a status badge in the README.',
      'Trained ONNX models are attached to a tagged `v1.0.0` release, and the repository has a LICENSE and clear attribution for COCO and the teacher model.',
      'The README has a one-table comparison of teacher and student on recall, size and latency, with a link to the report.',
      '`docs/MODEL_CARD.md` covers intended use, known failure cases, the Grad-CAM findings, and what happens to user data, which is that it never leaves the machine.',
    ],
    resources: [
      {
        title: 'OpenCLIP',
        url: 'https://github.com/mlfoundations/open_clip',
        type: 'tool',
        cost: 'free',
        provider: 'mlfoundations',
        note: 'Source of the teacher model. Compare the model tables before you choose one.',
        primary: true,
      },
      {
        title: 'COCO dataset downloads',
        url: 'https://cocodataset.org/#download',
        type: 'dataset',
        cost: 'free',
        provider: 'COCO Consortium',
        note: 'You need the 2017 caption annotations and val2017. Fetch training images individually by their `coco_url`.',
      },
      {
        title: 'ONNX Runtime quantization guide',
        url: 'https://onnxruntime.ai/docs/performance/model-optimizations/quantization.html',
        type: 'documentation',
        cost: 'free',
        provider: 'ONNX Runtime',
        note: 'Covers static and dynamic quantization and how to pick between them for a CNN and a transformer.',
      },
    ],
    stretchGoals: [
      'Add an approximate nearest neighbour index and measure recall against query time on one million embeddings.',
      'Learn a small re-ranker from pairwise click preferences with a Bradley-Terry model, and show how it changes results for one user.',
    ],
  },
});
