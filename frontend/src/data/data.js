export const TABS = ["About", "Blog", "Projects"];

export const projects = [
  {
    id: "01",
    title: "Worklog - OJT Progress Tracker",
    tag: "Mobile Application",
    desc: "Generative art system that interprets emotional states into visual compositions using diffusion models.",
    stack: ["React Native", "Javascript"],
    site: "https://neuralcanvas.dev",
    youtube: "dQw4w9WgXcQ",
    thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    id: "02",
    title: "Quantum Dash",
    tag: "Fullstack",
    desc: "Real-time analytics dashboard with physics-based data visualization and predictive modeling.",
    stack: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
    site: "https://quantumdash.io",
    youtube: "9bZkp7q19f0",
    thumb: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
  },
  {
    id: "03",
    title: "Ether CMS",
    tag: "Platform",
    desc: "Headless content platform with AI-assisted editing, multi-channel delivery, and semantic search.",
    stack: ["Node.js", "GraphQL", "Redis", "AWS"],
    site: "https://ethercms.io",
    youtube: "ScMzIvxBSi4",
    thumb: "https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg",
  },
  {
    id: "04",
    title: "Lumina UI",
    tag: "Design System",
    desc: "Open-source component library built for dark UIs — 80+ components, full a11y, Figma tokens.",
    stack: ["React", "Storybook", "Figma", "CSS"],
    site: "https://lumina-ui.dev",
    youtube: "dQw4w9WgXcQ",
    thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    id: "05",
    title: "Lumina UI",
    tag: "Design System",
    desc: "Open-source component library built for dark UIs — 80+ components, full a11y, Figma tokens.",
    stack: ["React", "Storybook", "Figma", "CSS"],
    site: "https://lumina-ui.dev",
    youtube: "dQw4w9WgXcQ",
    thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    id: "06",
    title: "Lumina UI",
    tag: "Design System",
    desc: "Open-source component library built for dark UIs — 80+ components, full a11y, Figma tokens.",
    stack: ["React", "Storybook", "Figma", "CSS"],
    site: "https://lumina-ui.dev",
    youtube: "dQw4w9WgXcQ",
    thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
];

export const posts = [
  {
    id: "01",
    date: "Jan 2025",
    title: "Building AI-Powered Design Systems",
    tag: "Design",
    min: "8 min read",
    excerpt:
      "How I integrated LLM tooling into a component library workflow to auto-generate tokens, docs, and variants.",
    content: [
      {
        type: "p",
        text: "Design systems are living, breathing codebases. They age, drift, and accumulate debt just like any other software. The question I kept asking myself: what if we could use AI not just to generate UI, but to maintain the system itself?",
      },
      {
        type: "h2",
        text: "The Problem with Manual Token Management",
      },
      {
        type: "p",
        text: "After two years maintaining a component library for an internal product, the pain was clear. Tokens went out of sync. Documentation lagged behind the code. Variant names were inconsistent across components. A single design decision rippled through dozens of files.",
      },
      {
        type: "p",
        text: "I started experimenting with LLM-assisted tooling — not to generate UI from scratch, but to enforce consistency and fill the gaps humans always miss.",
      },
      {
        type: "h2",
        text: "The Setup",
      },
      {
        type: "code",
        text: `# Extract tokens from Figma, push to LLM for normalization
python scripts/sync_tokens.py --source figma --target ./tokens/
# LLM validates naming conventions and flags drift
python scripts/audit_tokens.py --report drift.json`,
      },
      {
        type: "p",
        text: "The script pulls raw design tokens from Figma's API, normalizes them using a Claude-backed validator, and outputs a drift report comparing what's in code versus what designers intended. It sounds simple, but it surfaced 40+ inconsistencies on the first run.",
      },
      {
        type: "h2",
        text: "Auto-generating Documentation",
      },
      {
        type: "p",
        text: "The bigger win was documentation. Every component now has a structured JSDoc comment with usage examples, accessibility notes, and a list of variants — all generated from the component's props interface and usage patterns extracted from the codebase.",
      },
      {
        type: "p",
        text: "It's not perfect. The AI sometimes invents usage patterns that don't exist. But it's a 90% first draft that a human refines, rather than a blank page no one ever fills.",
      },
      {
        type: "h2",
        text: "Takeaways",
      },
      {
        type: "p",
        text: "AI works best in a design system as a consistency enforcer, not a creator. Use it to audit, normalize, and document — not to generate components wholesale. The human judgment stays where it matters: architecture decisions and accessibility.",
      },
    ],
  },
  {
    id: "02",
    date: "Dec 2024",
    title: "The Architecture of Real-Time Dashboards",
    tag: "Engineering",
    min: "12 min read",
    excerpt:
      "WebSockets, Redis pub/sub, and the tradeoffs I learned building a live analytics platform from scratch.",
    content: [
      {
        type: "p",
        text: "Real-time dashboards are deceptively hard. The demo always looks clean. Then you hit production with 500 concurrent users, each subscribed to a different slice of data, and everything falls apart.",
      },
      {
        type: "h2",
        text: "Start with the Data Shape",
      },
      {
        type: "p",
        text: "Before touching WebSockets or React state, I spent a week just mapping the data. What changes frequently? What's queried on every load? What can be stale for 30 seconds without anyone noticing? The answers drove every architecture decision.",
      },
      {
        type: "h2",
        text: "The Stack",
      },
      {
        type: "code",
        text: `// Server: Django Channels + Redis pub/sub
CHANNEL_LAYERS = {
  "default": {
    "BACKEND": "channels_redis.core.RedisChannelLayer",
    "CONFIG": { "hosts": [("redis", 6379)] }
  }
}

// Client: native WebSocket with reconnect backoff
function createSocket(url, onMessage) {
  let ws, retries = 0;
  const connect = () => {
    ws = new WebSocket(url);
    ws.onmessage = e => onMessage(JSON.parse(e.data));
    ws.onclose = () => {
      setTimeout(connect, Math.min(1000 * 2 ** retries++, 30000));
    };
  };
  connect();
  return () => ws.close();
}`,
      },
      {
        type: "h2",
        text: "The Bottleneck I Didn't Expect",
      },
      {
        type: "p",
        text: "It wasn't the WebSocket connections. It was the React renders. Each message triggered a state update, which re-rendered large chart components. The fix: separate the 'raw data store' from the 'render-ready data'. Raw data updates at WebSocket speed. Render-ready data updates on a 250ms throttle.",
      },
      {
        type: "p",
        text: "That single change dropped CPU usage by 60% on the frontend. The dashboard went from feeling janky to feeling alive.",
      },
      {
        type: "h2",
        text: "What I'd Do Differently",
      },
      {
        type: "p",
        text: "Use a proper state machine for connection lifecycle from day one. The improvised reconnect logic I wrote grew into spaghetti. XState would have made the connection states explicit and testable.",
      },
    ],
  },
  {
    id: "03",
    date: "Nov 2024",
    title: "Teaching Code: Lessons from the Classroom",
    tag: "Education",
    min: "6 min read",
    excerpt:
      "What a semester teaching intro CS taught me about how I write code — and how I explain it.",
    content: [
      {
        type: "p",
        text: "I spent a semester as a lab instructor for an intro CS course. It was the most humbling technical experience I've had in years.",
      },
      {
        type: "h2",
        text: "The Curse of Knowledge",
      },
      {
        type: "p",
        text: "The hardest part wasn't the content — it was remembering what it felt like to not understand. I kept skipping steps that felt obvious to me. A loop wasn't obvious. A variable wasn't obvious. The fact that the computer executes line by line wasn't obvious. I had to rebuild my mental model of 'beginner.'",
      },
      {
        type: "h2",
        text: "Analogies That Actually Worked",
      },
      {
        type: "p",
        text: "Variables as labeled boxes. Functions as recipes (ingredients in, dish out). Arrays as numbered shelves in a cabinet. These aren't novel — but I'd forgotten how much work a good analogy does. The students who clicked fastest were the ones who built their own analogies and explained them back to me.",
      },
      {
        type: "h2",
        text: "What It Changed in My Own Code",
      },
      {
        type: "p",
        text: "I started naming variables better. Not `x` or `temp` or `data2`. If I couldn't explain what a variable held in one plain English sentence, I renamed it. My functions got shorter. My comments got more honest — less 'what' and more 'why.'",
      },
      {
        type: "p",
        text: "Teaching isn't a detour from engineering. It's a mirror that shows you every shortcut you take without realizing it.",
      },
    ],
  },
  {
    id: "04",
    date: "Oct 2024",
    title: "WebGL for the Rest of Us",
    tag: "Tutorial",
    min: "15 min read",
    excerpt:
      "A ground-up walkthrough of WebGL that skips the math-heavy intro and gets you drawing faster.",
    content: [
      {
        type: "p",
        text: "Every WebGL tutorial starts with matrix math. Then projection matrices. Then coordinate systems. By the time you get to drawing a triangle, you've forgotten why you wanted to learn WebGL.",
      },
      {
        type: "p",
        text: "This isn't that tutorial. We'll draw something on screen in 5 minutes, then work backwards to understand why.",
      },
      {
        type: "h2",
        text: "The Minimum Viable WebGL Program",
      },
      {
        type: "code",
        text: `const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

// Vertex shader — where are the points?
const vert = \`
  attribute vec2 pos;
  void main() {
    gl_Position = vec4(pos, 0.0, 1.0);
  }
\`;

// Fragment shader — what color are the pixels?
const frag = \`
  void main() {
    gl_FragColor = vec4(0.22, 0.82, 0.78, 1.0);
  }
\`;

// Compile, link, draw (boilerplate omitted for brevity)
// See full gist: gist.github.com/justinecua/webgl-starter`,
      },
      {
        type: "h2",
        text: "Two Shaders, One Mental Model",
      },
      {
        type: "p",
        text: "Everything in WebGL comes down to two questions: where are the vertices, and what color are the pixels between them? The vertex shader answers the first. The fragment shader answers the second. Once that clicks, the rest is just plumbing.",
      },
      {
        type: "h2",
        text: "When to Use Three.js vs Raw WebGL",
      },
      {
        type: "p",
        text: "Use Three.js for anything involving 3D scenes, cameras, and meshes. Use raw WebGL when you need full control over the shader pipeline — custom post-processing, data visualization, or GPU compute tricks. The threshold is roughly: if you're rendering objects, use Three.js. If you're rendering math, go raw.",
      },
      {
        type: "h2",
        text: "Resources That Actually Helped",
      },
      {
        type: "p",
        text: "WebGL Fundamentals (webglfundamentals.org) is the best resource I've found — it's the tutorial I wish existed when I started. Book of Shaders is essential once you're past the basics and want to understand fragment shaders deeply.",
      },
    ],
  },
];

export const skills = [
  "Javascript",
  "Python",
  "PostgreSQL",
  "Docker",
  "Php",
  "React Native",
  "Django",
  "Flutter",
];
