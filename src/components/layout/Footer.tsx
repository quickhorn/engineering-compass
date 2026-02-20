import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/derickgrey",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/derickgrey",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:dee@deegrey.com",
    label: "Email",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-mono text-primary">&gt;</span>
            <span>© {currentYear} Derick Grey. All rights reserved.</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Terminal-style tagline */}
        <div className="mt-6 text-center">
          <p className="font-mono text-xs text-muted-foreground/60">
            <span className="text-primary/60">const</span> passion ={" "}
            <span className="text-accent/80">"Building teams that build great software"</span>;
          </p>
        </div>
      </div>
    </footer>
  );
}
