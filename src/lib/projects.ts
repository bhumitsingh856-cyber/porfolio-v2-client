export type Project = {
  slug: string;
  name: string;
  year: string;
  role: string;
  tagline: string;
  summary: string;
  features: string[];
  tech: string[];
  architecture?: { label: string; items: string[] }[];
  links: { live?: string; github?: string };
  image: string;
  frame1: string;
  frame2: string;
  frame3: string;
  // logo:string,
};

export const projects: Project[] = [
  {
    slug: "agent-atlas",
    name: "Agent Atlas",
    year: "June 2026",
    image: "/agent-atlas/agent-atlas.png",
    frame1: "/agent-atlas/research.png",
    frame2: "/agent-atlas/graph.png",
    frame3: "/agent-atlas/rag.png",
    // // logo:"/agent-atlas/logo.png",
    role: "Deep Research Platform",
    tagline: "Multi-agent deep research with citations, diagrams, and RAG chat.",
    summary:
      "Deep research platform using LangGraph multi-agent orchestration. Breaks topics into parallel research streams, generates structured reports with citations & Mermaid diagrams, and enables RAG chat. ~100k–145k tokens per research cycle. 6+ specialized model integrations.",
    features: [
      "Multi-agent research workflow",
      "Parallel researcher execution",
      "RAG-powered chat over generated reports",
      "Research memory & persistence",
      "Thread-based conversations",
      "Source citations",
      "Streaming responses",
    ],
    tech: [
      "Next.js",
      "LangGraph",
      "FastAPI",
      "Pinecone",
      "PostgreSQL",
      "shadcn/ui",
      "Zustand",
    ],
    architecture: [
      { label: "Frontend", items: ["Next.js", "shadcn/ui", "Tailwind CSS"] },
      { label: "Backend", items: ["FastAPI", "PostgreSQL"] },
      { label: "Orchestration", items: ["LangChain", "LangGraph", "Pinecone"] },
      {
        label: "Models",
        items: [
          "Llama 3.1 8B — prompt enhancement",
          "Llama 3.3 70B Versatile — planning",
          "Llama 4 Scout 17B — research agents",
          "DeepSeek V4 Flash — workers",
          "GPT-OSS 120B — summarization & reasoning",
          "NVIDIA NV-Embed-v1 — embeddings",
        ],
      },
    ],
    links: {
      live: "https://agent-atlas-one.vercel.app",
      github: "https://github.com/bhumitsingh856-cyber/Agent-Atlas",
    },
  },
  {
    slug: "gen-ui",
    name: "Gen UI",
    year: "April 2026",
    image: " /gen-ui/gen-ui.png",
    frame1: "/gen-ui/ui.png",
    frame2: "/gen-ui/f2.png",
    frame3: "/gen-ui/dash.png",
    // // logo:"/gen-ui/logo.png",
    role: "AI Frontend builder",
    tagline: "Convert your idea into a complete React app.",
    summary:
      "AI-powered frontend builder. Converts natural language prompts into multi-file React applications with live preview, built-in editor, AI component updation, and one-click download. Uses Fireworks AI (Deepseek-v4-flash) for generation and Groq for error correction and AI updation.",
    features: [
      "Full multi-file project generation",
      "Clean component structure",
      "Integrated editor with live preview",
      "AI-based error correction",
      "Downloadable code",
      "Shareable live link",
      "UI Assistant for file updation",
      "Clerk Authentication",
    ],
    tech: [
      "Next.js",
      "LangChain",
      "Fireworks AI · Deepseek-v4-flash",
      "Groq",
      "MongoDB",
      "CodeSandbox",
      "Motion",
      "Zustand",
    ],
    links: {
      live: "https://gen-ui-seven-black.vercel.app",
      github: "https://github.com/bhumitsingh856-cyber/GEN-UI",
    },
  },
  {
    slug: "campus-assistant",
    name: "Campus Assistant",
    year: "July 2026",
    image: "/campus-bot/hero.png",
    frame1: "/campus-bot/screen1.png",
    frame2: "/campus-bot/screen2.jpeg",
    frame3: "/campus-bot/screen3.png",
    role: "AI Campus Assistant",
    tagline:
      "Multi-channel conversational AI for campus student services with LangGraph orchestration.",
    summary:
      "Campus Assistant is an intelligent conversational AI agent that provides students with instant access to academic information, attendance records, syllabus, placements, and campus resources. Powered by LangGraph for agentic workflow orchestration, the system features tool-calling capabilities, PostgreSQL-backed session persistence, and Pinecone vector-based retrieval. Deployed across Telegram, WhatsApp, and Web, it consolidates campus services into a unified chat interface.",
    features: [
      "Real-time attendance retrieval via portal integration",
      "Syllabus access for engineering branches (CSE, CSE-AIML, CSE-DS, CS-IT)",
      "Student profile management (register/unregister)",
      "Web search & scraping with Tavily Search and Firecrawl",
      "Vector-based semantic search over institutional documents",
      "Multi-channel deployment (Telegram, WhatsApp, Web)",
      "Persistent conversation history with PostgreSQL checkpointing",
      "Agentic AI workflows with tool-calling capabilities",
      "Context-aware conversations with message trimming",
    ],
    tech: [
      "Next.js",
      "LangGraph",
      "FastAPI",
      "Pinecone",
      "PostgreSQL",
      "Telegram Bot API",
      "Twilio",
      "shadcn/ui",
    ],
    architecture: [
      { label: "Frontend", items: ["Next.js", "shadcn/ui", "Tailwind CSS"] },
      {
        label: "Backend",
        items: ["FastAPI", "PostgreSQL"],
      },
      {
        label: "Orchestration",
        items: ["LangGraph", "LangChain", "Pinecone Vector Store"],
      },
      {
        label: "LLM & Tools",
        items: [
          "OpenRouter — primary LLM",
          "LangChain-Groq — optional provider",
          "TavilySearch — web search",
          "Firecrawl — web scraping & CMS interaction",
          "Custom tools — attendance & syllabus retrieval",
        ],
      },
      {
        label: "Channels",
        items: ["Telegram Bot API", "Twilio WhatsApp", "REST API"],
      },
    ],
    links: {
      live: "https://campus-client-1bmw.vercel.app/",
      github: "https://github.com/bhumitsingh856-cyber/campus-agent",
    },
  },
  {
    slug: "orion-studio-ai",
    name: "Orion Studio AI",
    year: "Feb 2026",
    image: "/orion-ai/orion-ai.png",
    frame1: "/orion-ai/chat.png",
    frame2: "/orion-ai/img.png",
    frame3: "/orion-ai/gen.png",
    // // logo:"/orion-ai/logo.png",
    role: "Multimodal AI Workspace",
    tagline: "Explore, create, and analyze—all in one seamless AI experience.",
    summary:
      "Unified multimodal AI workspace combining RAG, vision understanding, image generation, and web search. Built with Next.js, LangChain JS, Pinecone, and MongoDB. Features persistent chat memory and Clerk authentication.",
    features: [
      "Autonomous agent with tool routing",
      "RAG pipeline over user documents",
      "Web search via Tavily",
      "Image generation & vision analysis",
      "Code generation",
      "PDF / DOCX intelligence",
    ],
    tech: [
      "Next.js",
      "LangChain JS",
      "Pinecone",
      "MongoDB",
      "Clerk",
      "Cloudinary",
      "Zustand",
      "Tailwind",
      "Framer Motion",
      "Groq · gpt-oss-120b",
      "FLUX.1-schnell",
      "Qwen2.5-VL-72B",
    ],
    links: {
      live: "https://orion-studio-sigma.vercel.app",
      github: "https://github.com/bhumitsingh856-cyber/ORION-AI",
    },
  },
  {
    slug: "orbit",
    name: "Orbit",
    year: "Jan 2026",
    image: "/orbit/orbit.png",
    frame1: "/orbit/profile.png",
    frame2: "/orbit/home.png",
    frame3: "/orbit/ai.png",
    // // logo:"/orbit/logo.png",
    role: "Real-time Social Platform",
    tagline: "Connect, share, and chat in real time.",
    summary:
      "Real-time social platform with JWT auth, stories, follow system, and AI-powered chat assistant. Built with MERN stack + Socket.io for live messaging. Handles media via Cloudinary with lazy loading and debounced search.",
    features: [
      "JWT auth with role-protected routes",
      "Posts, stories, likes, comments, follows",
      "Realtime chat via Socket.io",
      "AI text generation (Gemini 2.5 Flash)",
      "AI image generation (Stable Diffusion XL)",
      "Optimized media via Cloudinary",
    ],
    tech: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Socket.io",
      "Cloudinary",
      "Tailwind",
      "JWT",
      "Framer Motion",
      "Gemini 2.5 Flash",
      "Stable Diffusion XL",
    ],
    links: {
      live: "https://orbit-seven-pink.vercel.app",
      github: "https://github.com/bhumitsingh856-cyber/ORBIT",
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
