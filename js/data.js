window.PORTFOLIO = {
  name: "Alex Morgan",
  initials: "AM",
  title: "Software Developer",
  roles: ["Full-Stack Developer", "Frontend Enthusiast", "Problem Solver", "Open Source Contributor"],
  tagline: "I build fast, accessible and delightful web experiences.",
  location: "Istanbul, Turkey",
  email: "hello@example.com",
  cvUrl: "assets/cv.pdf",
  avatar: "assets/avatar.svg",
  about: [
    "I'm a software developer with over five years of experience turning ideas into polished, production-ready products. I enjoy working across the stack, but I'm happiest where design and engineering meet.",
    "When I'm not shipping features, I contribute to open source, write about what I learn, and mentor junior developers. I care deeply about performance, accessibility and clean, maintainable code."
  ],
  stats: [
    { value: "5+", label: "Years of experience" },
    { value: "30+", label: "Projects shipped" },
    { value: "12", label: "Open source repos" }
  ],
  skills: [
    { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "SQL"] },
    { category: "Frontend", items: ["React", "Vue", "HTML", "CSS", "Tailwind"] },
    { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB"] },
    { category: "Tools", items: ["Git", "Docker", "Figma", "Vercel", "Jest"] }
  ],
  experience: [
    {
      role: "Senior Frontend Developer", company: "Acme Corp", period: "2023 — Present",
      points: [
        "Led the migration of a legacy dashboard to React and TypeScript, cutting load time by 45%.",
        "Built a shared component library used by six product teams.",
        "Mentored four junior developers and introduced accessibility audits to the release process."
      ]
    },
    {
      role: "Full-Stack Developer", company: "Brightside Labs", period: "2021 — 2023",
      points: [
        "Designed REST and GraphQL APIs with Node.js and PostgreSQL serving 200k monthly users.",
        "Implemented CI/CD pipelines with Docker, reducing deployment time from 40 to 8 minutes.",
        "Collaborated with designers to ship a customer onboarding flow that lifted activation by 22%."
      ]
    },
    {
      role: "Junior Web Developer", company: "Pixel & Co.", period: "2019 — 2021",
      points: [
        "Developed responsive marketing sites and e-commerce storefronts for 15+ clients.",
        "Wrote unit and end-to-end tests that raised coverage from 30% to 80%.",
        "Optimised images and bundles to reach 95+ Lighthouse scores."
      ]
    }
  ],
  education: [
    { degree: "B.Sc. Computer Engineering", school: "Example University", period: "2015 — 2019" }
  ],
  projects: [
    {
      title: "TaskFlow", description: "A collaborative kanban board with real-time updates, drag-and-drop and team workspaces.",
      image: "assets/projects/taskflow.svg", category: "Web", tech: ["React", "Node.js", "PostgreSQL"],
      live: "https://example.com", code: "https://github.com/example/taskflow"
    },
    {
      title: "Shopline", description: "A fast, accessible e-commerce storefront with cart, checkout and a headless CMS.",
      image: "assets/projects/shopline.svg", category: "Web", tech: ["Vue", "Express", "Stripe"],
      live: "https://example.com", code: "https://github.com/example/shopline"
    },
    {
      title: "FitTrack", description: "A cross-platform mobile app to log workouts, set goals and visualise progress.",
      image: "assets/projects/fittrack.svg", category: "Mobile", tech: ["React Native", "Firebase"],
      live: "", code: "https://github.com/example/fittrack"
    },
    {
      title: "SummarAIze", description: "Browser extension that summarises long articles using a large language model.",
      image: "assets/projects/summaraize.svg", category: "AI", tech: ["Python", "FastAPI", "OpenAI"],
      live: "https://example.com", code: "https://github.com/example/summaraize"
    },
    {
      title: "Pixel Palette", description: "An AI-assisted colour palette generator with export to CSS, Tailwind and Figma.",
      image: "assets/projects/pixelpalette.svg", category: "AI", tech: ["TypeScript", "Vite", "Python"],
      live: "https://example.com", code: "https://github.com/example/pixel-palette"
    },
    {
      title: "DevKit CLI", description: "A command-line toolkit that scaffolds projects, lints configs and automates releases.",
      image: "assets/projects/devkit.svg", category: "Tools", tech: ["Node.js", "TypeScript"],
      live: "", code: "https://github.com/example/devkit"
    }
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/example", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/example", icon: "linkedin" },
    { name: "X", url: "https://x.com/example", icon: "x" }
  ]
};
