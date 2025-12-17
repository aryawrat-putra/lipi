import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  Sparkles,
  Keyboard,
  Download,
  Zap,
  Lock,
  Code2,
  BookOpen,
  Users,
  GraduationCap,
  ArrowRight,
  Check,
  Menu,
  X,
} from 'lucide-react';
import Logo from '@/components/non-interactive/logo';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'backdrop-blur-lg border-b shadow-sm'
          : 'transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/">
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="transition-colors text-sm font-medium"
              >
                Features
              </a>
              <a
                href="#use-cases"
                className="transition-colors text-sm font-medium"
              >
                Use Cases
              </a>
              <a
                href="#pricing"
                className="transition-colors text-sm font-medium"
              >
                Pricing
              </a>
              <a
                href="#docs"
                className="transition-colors text-sm font-medium"
              >
                Docs
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to='/login'>
                  Sign in
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to='/signup'>
                  Get Started
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block py-2"
              >
                Features
              </a>
              <a
                href="#use-cases"
                className="block py-2"
              >
                Use Cases
              </a>
              <a
                href="#pricing"
                className="block py-2"
              >
                Pricing
              </a>
              <a
                href="#docs"
                className="block py-2"
              >
                Docs
              </a>
              <Separator />
              <Button variant="ghost" size="sm" asChild>
                <Link to='/login'>
                  Sign in
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to='/signup'>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4">
                  Now with AI assistance
                </Badge>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                  Write with structure. Think with clarity.
                </h1>
                <p className="text-xl leading-relaxed max-w-xl">
                  Lipi is the document editor built for focus. Structured like code,
                  intelligent like AI, fast like your thoughts.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Start writing
                  <ArrowRight />
                </Button>
                <Button size="lg" variant="outline">
                  View demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Check className="size-4" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="size-4" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="size-4" />
                  <span>Export anytime</span>
                </div>
              </div>
            </div>

            {/* Product Preview Mock */}
            <div className="relative">
              <div className="border rounded-2xl p-6 shadow-xl">
                <div className="rounded-lg border p-4 mb-3">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-muted"></div>
                    <div className="w-3 h-3 rounded-full bg-muted"></div>
                    <div className="w-3 h-3 rounded-full bg-muted"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-8 rounded w-3/4 bg-muted"></div>
                    <div className="h-3 rounded w-full bg-muted"></div>
                    <div className="h-3 rounded w-5/6 bg-muted"></div>
                    <div className="h-3 rounded w-full bg-muted"></div>
                    <div className="h-16 rounded-lg border mt-4"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded border p-3 h-20"></div>
                  <div className="rounded border p-3 h-20"></div>
                  <div className="rounded border p-3 h-20"></div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm mb-8">
            Built for modern creators
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60">
            <span className="text-xl font-semibold">Syntax</span>
            <span className="text-xl font-semibold">Notion</span>
            <span className="text-xl font-semibold">Linear</span>
            <span className="text-xl font-semibold">Figma</span>
            <span className="text-xl font-semibold">Stripe</span>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Everything you need to write better
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Powerful features that stay out of your way until you need them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Structured Writing
                </h3>
                <p className="leading-relaxed">
                  Documents as blocks. Organize thoughts like code. Collapse, expand,
                  and rearrange with ease.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  AI Assistance
                </h3>
                <p className="leading-relaxed">
                  Smart suggestions, instant rewrites, and context-aware help exactly
                  when you need it.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Keyboard className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Keyboard-First
                </h3>
                <p className="leading-relaxed">
                  Every action has a shortcut. Navigate, format, and create without
                  touching your mouse.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Export Anywhere
                </h3>
                <p className="leading-relaxed">
                  Markdown, PDF, Word, HTML. Your work, your format. No lock-in, ever.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Editor Experience Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <Badge variant="secondary">
                Editor Experience
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Feels like VS Code. Reads like Notion.
              </h2>
              <p className="text-lg leading-relaxed">
                Lipi brings the precision of a code editor to the world of writing.
                Every document is a tree of blocks. Every edit is instant. Every
                keystroke feels right.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Lightning fast
                    </h4>
                    <p>
                      No lag, no waiting. Type at the speed of thought.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Lock className="w-5 h-5 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">
                      Private by default
                    </h4>
                    <p>
                      Your documents stay yours. Local-first, encrypted, secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Made for everyone who writes
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              From novels to documentation, research to notes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:border-opacity-50 transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Writers
                </h3>
                <p className="leading-relaxed">
                  Outline chapters, track drafts, and keep your storytelling organized
                  without losing flow.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-opacity-50 transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Developers
                </h3>
                <p className="leading-relaxed">
                  Write technical docs, RFCs, and specs with syntax support and
                  structured formatting.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-opacity-50 transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Students
                </h3>
                <p className="leading-relaxed">
                  Take lecture notes, organize research, and structure essays with
                  clarity and speed.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-opacity-50 transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Teams
                </h3>
                <p className="leading-relaxed">
                  Collaborate on proposals, share knowledge bases, and maintain living
                  documentation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Lipi */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Why Lipi?
            </h2>
            <p className="text-xl">
              Built different because the others miss the point.
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-3">
                  Why not Google Docs?
                </h3>
                <p className="text-lg leading-relaxed">
                  Google Docs is great for collaboration, but it's slow, cluttered, and
                  treats every document like a printed page. Lipi is fast, structured,
                  and built for digital-first thinking.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-3">
                  Why not Notion?
                </h3>
                <p className="text-lg leading-relaxed">
                  Notion is powerful but can feel like a database tool. Lipi focuses on
                  the writing experience first. No endless properties, just clean,
                  focused documents with the structure you need.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-3">
                  Why not just use VS Code?
                </h3>
                <p className="text-lg leading-relaxed">
                  VS Code is a code editor, not a document editor. Lipi brings that
                  speed and keyboard-first philosophy to writing, with formatting,
                  structure, and AI built in.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Start writing with clarity today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of writers, developers, and teams who've found their focus
            with Lipi.
          </p>
          <Button size="lg">
            Get Started Free
            <ArrowRight className='size-5' />
          </Button>
          <p className="text-sm mt-4">
            No credit card required. Export anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <Logo/>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} Lipi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
