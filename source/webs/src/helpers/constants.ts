import { Bell, Bolt, BookHeart, Folder,  LayoutDashboard, Trash2 ,File} from "lucide-react";

// Sidebar Menu Links
export const MenuLinks = [
  {
    title: "dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "projects",
    url: "/projects",
    icon: Folder,
  },
  {
    title: "documents",
    url: "/documents",
    icon: File,
  },
  {
    title: "favorites",
    url: "/favorites",
    icon: BookHeart,
  },
  {
    title: "notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "settings",
    url: "/settings",
    icon: Bolt,
  },
  {
    title: "trash",
    url: "/trash",
    icon: Trash2,
  },
]

import { Boxes, Type, Keyboard, Layers, Highlighter, History, Puzzle, Zap } from "lucide-react"

export const lipiFeatures = [
  {
    Icon: Boxes,
    title: "Base components",
    detail: "40+ open-source, composable UI building blocks",
    isPaid: false,
  },
  {
    Icon: Type,
    title: "Advanced typography",
    detail: "Fine-grained control over fonts, spacing, and text styles",
    isPaid: false,
  },
  {
    Icon: Keyboard,
    title: "Keyboard shortcuts",
    detail: "Fully customizable shortcuts for power users",
    isPaid: false,
  },
  {
    Icon: Layers,
    title: "Block-based editor",
    detail: "Flexible blocks for structured and free-form writing",
    isPaid: false,
  },
  {
    Icon: Highlighter,
    title: "Rich text formatting",
    detail: "Highlight, inline styles, and semantic formatting tools",
    isPaid: false,
  },
  {
    Icon: History,
    title: "Version history",
    detail: "Track changes and restore previous document states",
    isPaid: true,
  },
  {
    Icon: Puzzle,
    title: "Plugin system",
    detail: "Extend LIPI with custom plugins and integrations",
    isPaid: true,
  },
  {
    Icon: Zap,
    title: "Performance optimized",
    detail: "Instant load times and smooth editing at scale",
    isPaid: true,
  },
]

export const lipiFaqs = [
  {
    id: "what-is-lipi",
    question: "What is Lipi?",
    answer:
      "Lipi is a modern, developer-focused text and document editing platform designed to be fast, extensible, and easy to integrate into web applications.",
  },
  {
    id: "who-is-lipi-for",
    question: "Who is Lipi built for?",
    answer:
      "Lipi is built for developers, startups, and product teams who need a powerful editor without the complexity of traditional document editors.",
  },
  {
    id: "is-lipi-open-source",
    question: "Is Lipi open-source?",
    answer:
      "Yes. Lipi offers a strong open-source core, with optional paid features for advanced workflows and enterprise needs.",
  },
  {
    id: "what-frameworks-supported",
    question: "Which frameworks does Lipi support?",
    answer:
      "Lipi works seamlessly with React and modern frontend stacks, and can be integrated into most JavaScript-based applications.",
  },
  {
    id: "can-i-customize-lipi",
    question: "Can I customize Lipi to match my product?",
    answer:
      "Absolutely. Lipi is designed to be highly customizable, from UI components and themes to editor behavior and extensions.",
  },
  {
    id: "does-lipi-support-collaboration",
    question: "Does Lipi support real-time collaboration?",
    answer:
      "Real-time collaboration is available as a premium feature, enabling multiple users to edit documents simultaneously.",
  },
  {
    id: "is-lipi-secure",
    question: "How secure is Lipi?",
    answer:
      "Security is a core priority. Lipi follows modern best practices for data handling, isolation, and permission-based access.",
  },
  {
    id: "self-hosting",
    question: "Can I self-host Lipi?",
    answer:
      "Yes. Lipi can be self-hosted, giving you full control over your data and infrastructure.",
  },
  {
    id: "pricing",
    question: "How does Lipi pricing work?",
    answer:
      "Lipi is free for core features. Advanced capabilities and team-focused features are available through paid plans.",
  },
  {
    id: "getting-started",
    question: "How do I get started with Lipi?",
    answer:
      "You can get started by installing Lipi via npm and following the official documentation to integrate it into your project.",
  },
] as const;

import { Languages, Sparkles, Wand2, LayoutGrid, FileOutput } from "lucide-react";

export const lipiPremiumFeatures = [
  {
    icon: Languages,
    name: "All Indic Languages",
    shortDetail:
      "Full access to all supported Indic languages with smart transliteration and conversion.",
  },
  {
    icon: Sparkles,
    name: "Advanced Text Transformations",
    shortDetail:
      "Case conversion, script normalization, formatting tools, and language-aware transforms.",
  },
  {
    icon: Wand2,
    name: "Smart Editor Tools",
    shortDetail:
      "Context-aware suggestions, quick fixes, and productivity-focused editor utilities.",
  },
  {
    icon: LayoutGrid,
    name: "Layouts & Formatting",
    shortDetail:
      "Column layouts, structured text blocks, and advanced formatting options.",
  },
  {
    icon: FileOutput,
    name: "Export & Automation",
    shortDetail:
      "Copy, export, and automate text workflows for documents, apps, and publishing.",
  },
  {
    icon: Keyboard,
    name: "Power User Shortcuts",
    shortDetail:
      "Keyboard-first workflows designed for speed and professional usage.",
  },
]
