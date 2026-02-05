import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Rocket, Building2, Heart, Code2 } from "lucide-react";

interface Experience {
  id: number;
  role: string;
  company: string;
  type: string;
  icon: React.ReactNode;
  highlights: string[];
  metrics?: string[];
  testimonialPlaceholder?: boolean;
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Fractional Technical Co-Founder",
    company: "Multiple Startups",
    type: "Current",
    icon: <Rocket className="h-5 w-5" />,
    highlights: [
      "Guiding early-stage founders through critical technical decisions and architecture choices",
      "Establishing development workflows, CI/CD pipelines, and engineering best practices from day one",
      "Hands-on building of MVPs and core product features alongside founding teams",
    ],
    metrics: ["3 active ventures", "Technical strategy", "Dev process setup"],
  },
  {
    id: 2,
    role: "Engineering Advocate",
    company: "TheoremOne",
    type: "Global Consulting Culture & Leadership",
    icon: <Heart className="h-5 w-5" />,
    highlights: [
      "Engagement-focused role in the talent team, connecting with new hire developers on day one",
      "Championed ownership culture through program development and developer onboarding",
      "Published thought leadership on engineering culture and developer empowerment",
    ],
    metrics: ["Day-1 culture impact", "Program development", "Thought leadership"],
    testimonialPlaceholder: true,
  },
  {
    id: 3,
    role: "Engineering Manager",
    company: "Medici Ventures",
    type: "Startup Leadership & Architecture",
    icon: <Users className="h-5 w-5" />,
    highlights: [
      "Directly managed 12 engineers while architecting the organizational structure for scale",
      "Hired and onboarded 100+ developers who became the foundation for multiple teams across the org",
      "Built the Bitsy team that was later acquired by tZero for $4M",
      "Pioneered DevEx improvements across blockchain and fintech product development",
    ],
    metrics: ["12 direct reports", "100+ hires", "$4M exit (Bitsy → tZero)"],
    testimonialPlaceholder: true,
  },
  {
    id: 4,
    role: "Backend / Systems Developer",
    company: "Academy Mortgage",
    type: "Financial Platform Engineering",
    icon: <Code2 className="h-5 w-5" />,
    highlights: [
      "Built core platform infrastructure and APIs powering mortgage processing systems",
      "Designed scalable backend systems for high-volume financial transactions",
      "Contributed to foundational engineering practices that shaped the development culture",
    ],
    metrics: ["Platform infrastructure", "API development", "Fintech systems"],
  },
  {
    id: 5,
    role: "Software Developer",
    company: "ARUP Laboratories",
    type: "Healthcare Systems",
    icon: <Building2 className="h-5 w-5" />,
    highlights: [
      "Developed laboratory information systems enabling critical diagnostic testing",
      "Built software that directly impacted patient care and healthcare outcomes",
      "Early career foundation in building reliable, mission-critical systems",
    ],
    metrics: ["Healthcare impact", "Lab systems", "Critical reliability"],
  },
];

export default function Experience() {
  return (
    <div className="container py-16 md:py-24">
      {/* Page Header */}
      <div className="mb-16 max-w-3xl">
        <p className="mb-2 font-mono text-sm text-primary">// career.timeline</p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Experience & <span className="text-gradient">Impact</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          15+ years of building teams, shipping products, and empowering engineers—always through the lens of developer
          experience.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line - left on mobile, center on desktop */}
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-primary/20 md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-8 md:space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative flex gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 top-6 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background text-primary md:left-1/2">
                {exp.icon}
              </div>

              {/* Spacer for mobile timeline */}
              <div className="w-8 shrink-0 md:hidden" />

              {/* Content card */}
              <div className="flex-1 md:w-[calc(50%-2rem)]">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={exp.type === "Current" ? "default" : "outline"} className="font-mono text-xs">
                        {exp.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{exp.role}</CardTitle>
                    <p className="font-mono text-sm text-muted-foreground">@ {exp.company}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Metrics badges */}
                    {exp.metrics && (
                      <div className="flex flex-wrap gap-2">
                        {exp.metrics.map((metric, i) => (
                          <Badge key={i} variant="secondary" className="font-mono text-xs">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {/* Testimonial placeholder */}
                    {exp.testimonialPlaceholder && (
                      <blockquote className="mt-4 rounded border border-dashed border-border/50 bg-muted/30 p-4 text-center text-sm italic text-muted-foreground">
                        <span className="opacity-60">Testimonial coming soon...</span>
                      </blockquote>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Spacer for alternating layout on desktop */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </div>
          ))}
        </div>
      </div>

      {/* The Pivot Story Section */}
      <section className="mt-24 rounded-lg border border-border/50 bg-gradient-to-br from-card/80 to-card/40 p-8 backdrop-blur-sm md:p-12">
        <p className="mb-2 font-mono text-sm text-primary">// the_pivot_story</p>
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">
          The Journey: Stability → Risk → <span className="text-gradient">Wisdom</span>
        </h2>
        <div className="max-w-3xl space-y-4 text-muted-foreground">
          <p>
            My career began in the structured world of enterprise software—healthcare systems at ARUP, financial
            platforms at Academy Mortgage. I learned to build systems that couldn't fail, and discovered my passion for
            the people behind the code.
          </p>
          <p>
            At Medici Ventures, I took the leap into startup territory. Leading engineering teams in the blockchain
            space taught me that building great products requires building great teams first. The $4M acquisition of
            Bitsy validated that approach, but more importantly, watching 100+ developers I hired grow into leaders
            across the organization showed me the lasting impact of intentional team building.
          </p>
          <p>
            I ventured into entrepreneurship with Inclusive Agile, a DEI-focused training initiative. While market
            timing proved challenging, the experience deepened my understanding of what it truly means to lead with
            empathy and build inclusive cultures.
          </p>
          <p className="font-medium text-foreground">
            Today, I bring the stability of enterprise thinking, the agility of startup execution, and hard-won lessons
            about what makes teams thrive. I'm ready to channel all of this into my next engineering leadership role.
          </p>
        </div>
      </section>
    </div>
  );
}
