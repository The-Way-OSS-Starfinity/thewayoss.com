import { ArrowRight, Github, Star, GitFork, Users, Zap, Shield, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">W</span>
            </div>
            <span className="font-semibold text-lg">The Way OSS</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#community" className="hover:text-foreground transition-colors">Community</a>
            <a href="#docs" className="hover:text-foreground transition-colors">Docs</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/The-Way-OSS-Starfinity"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="#get-started"
              className="bg-primary text-primary-foreground text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-28 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Star className="w-3.5 h-3.5" />
            Open Source & Free Forever
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Building the future,{" "}
            <span className="text-primary">together</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            The Way OSS is a community-driven open source initiative. We build tools,
            share knowledge, and grow together — one contribution at a time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#get-started"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get started <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/The-Way-OSS-Starfinity"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              <Github className="w-4 h-4" /> View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/30 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Users, label: "Contributors", value: "100+" },
            { icon: Star, label: "GitHub Stars", value: "500+" },
            { icon: GitFork, label: "Forks", value: "120+" },
            { icon: Globe, label: "Countries", value: "30+" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why The Way OSS?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We believe open source is more than code — it's a movement powered by collaboration, transparency, and shared ownership.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Fast & Lightweight",
                desc: "Everything we build is optimized for performance. No bloat, no compromise.",
              },
              {
                icon: Shield,
                title: "Secure by Default",
                desc: "Security isn't an afterthought. Every project follows best practices from day one.",
              },
              {
                icon: Users,
                title: "Community First",
                desc: "Decisions are made in the open. Every voice matters, every contribution counts.",
              },
              {
                icon: Globe,
                title: "Globally Inclusive",
                desc: "We welcome contributors from everywhere. Diversity makes our work stronger.",
              },
              {
                icon: GitFork,
                title: "Fork & Improve",
                desc: "All our projects are fully open. Fork them, improve them, make them yours.",
              },
              {
                icon: Star,
                title: "Built with Love",
                desc: "Passion drives every commit. We're here because we genuinely care about the craft.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="get-started" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center bg-primary/5 border border-primary/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to contribute?</h2>
          <p className="text-muted-foreground mb-8">
            Join our community and help build something meaningful. Whether you're a first-time contributor or a seasoned developer, there's a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/The-Way-OSS-Starfinity"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <Github className="w-4 h-4" /> Start contributing
            </a>
            <a
              href="#community"
              className="flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Join the community
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">W</span>
            </div>
            <span>The Way OSS — Open Source for Everyone</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/The-Way-OSS-Starfinity" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="hover:text-foreground transition-colors">Docs</a>
            <a href="#" className="hover:text-foreground transition-colors">Community</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
