import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Placeholder data structure - will be replaced with real content
const experiences = [
  {
    id: 1,
    role: "Your Role Title",
    company: "Company Name",
    period: "Start - End",
    type: "Full-time",
    highlights: ["Key accomplishment 1", "Key accomplishment 2"],
    testimonial: null,
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
          15+ years of building teams, shipping products, and empowering engineers.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 hidden h-full w-px bg-border md:left-1/2 md:block md:-translate-x-1/2" />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative md:flex md:gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-6 hidden h-4 w-4 rounded-full border-4 border-primary bg-background md:left-1/2 md:block md:-translate-x-1/2" />

              {/* Content card */}
              <div className="md:w-1/2">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {exp.period}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {exp.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{exp.role}</CardTitle>
                    <p className="font-mono text-sm text-muted-foreground">
                      @ {exp.company}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {exp.testimonial && (
                      <blockquote className="mt-4 border-l-2 border-primary/50 pl-4 italic text-muted-foreground">
                        "{exp.testimonial}"
                      </blockquote>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* The Pivot Story Section - Placeholder */}
      <section className="mt-24 rounded-lg border border-border/50 bg-card/30 p-8 backdrop-blur-sm">
        <p className="mb-2 font-mono text-sm text-primary">// the_pivot_story</p>
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">
          The Journey: Corporate → Entrepreneur → <span className="text-gradient">What's Next</span>
        </h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground">
            Your pivot story will go here - the narrative of your career evolution...
          </p>
        </div>
      </section>
    </div>
  );
}
