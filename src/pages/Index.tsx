import { Link } from "react-router-dom";
import { ArrowRight, Users, Calendar, TrendingUp, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AvailabilityBadge } from "@/components/layout/AvailabilityBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePageMeta } from "@/hooks/use-page-meta";

const stats = [
  {
    icon: Calendar,
    value: "15+",
    label: "Years Experience",
  },
  {
    icon: Users,
    value: "30+",
    label: "Engineers Led",
  },
  {
    icon: TrendingUp,
    value: "$4M",
    label: "Exit Value",
  },
  {
    icon: Code,
    value: ".NET/JS",
    label: "Core Stack",
  },
];

const featuredLinks = [
  {
    title: "Experience & Impact",
    description: "15+ years building teams and shipping software",
    path: "/experience",
  },
  {
    title: "Writing & Ideas",
    description: "Leadership insights and technical perspectives",
    path: "/writing",
  },
  {
    title: "Current Work",
    description: "Fractional Technical Co-founder Development",
    path: "/current-work",
  },
];

const Index = () => {
  usePageMeta({
    title: "Derick Grey | Engineering Leader & .NET/JS Developer",
    description: "Engineering Leader, .NET/JS Developer, and People Empowerer. 15+ years building high-performing engineering teams.",
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background gradient effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="container">
           <div className="grid items-center gap-12 lg:grid-cols-2">
             {/* Left Column - Text Content */}
             <div className="text-center lg:text-left">
               {/* Availability Badge */}
               <div className="mb-8 flex justify-center lg:justify-start animate-fade-in">
                 <AvailabilityBadge />
               </div>
 
               {/* Main Headline */}
               <h1
                 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl animate-fade-in"
                 style={{ animationDelay: "0.1s" }}
               >
                 <span className="text-gradient">Engineering Leader</span>
                 <br />
                 <span className="text-foreground">.NET/JS Developer</span>
                 <br />
                 <span className="text-muted-foreground">People Empowerer</span>
               </h1>
 
               {/* Tagline */}
               <p
                 className="mb-8 text-lg text-muted-foreground md:text-xl animate-fade-in"
                 style={{ animationDelay: "0.2s" }}
               >
                 I build high-performing engineering teams and the systems that support them. From hands-on coding to
                 strategic leadership, I bridge the gap between technical excellence and business outcomes.
               </p>
 
               {/* CTA Buttons */}
               <div
                 className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start animate-fade-in"
                 style={{ animationDelay: "0.3s" }}
               >
                 <Button asChild size="lg" className="glow-primary">
                   <Link to="/experience">
                     View Experience
                     <ArrowRight className="ml-2 h-4 w-4" />
                   </Link>
                 </Button>
                 <Button asChild variant="outline" size="lg">
                   <Link to="/contact">Get in Touch</Link>
                 </Button>
               </div>
             </div>
 
             {/* Right Column - Profile Photo */}
             <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.2s" }}>
               <div className="relative">
                 {/* Decorative rings */}
                 <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 blur-xl" />
                 <div className="absolute -inset-2 rounded-full border border-primary/20" />
                 <div className="absolute -inset-4 rounded-full border border-accent/10" />
                 
                 {/* Avatar */}
                 <Avatar className="relative h-64 w-64 border-4 border-background shadow-2xl md:h-80 md:w-80">
                   <AvatarImage 
                     src="/placeholder.svg" 
                     alt="Derick Grey - Engineering Leader"
                     className="object-cover"
                   />
                   <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-6xl font-bold text-primary">
                     DG
                   </AvatarFallback>
                 </Avatar>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/50 bg-card/50 py-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <stat.icon className="mb-2 h-6 w-6 text-primary" />
                <span className="font-mono text-3xl font-bold text-foreground md:text-4xl">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm text-primary">// explore</p>
            <h2 className="text-3xl font-bold md:text-4xl">Featured Sections</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className="group animate-fade-in"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="flex h-full flex-col p-6">
                    <h3 className="mb-2 font-mono text-lg font-semibold group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="mb-4 flex-grow text-sm text-muted-foreground">{link.description}</p>
                    <div className="flex items-center text-sm font-medium text-primary">
                      Explore
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal-style quote section */}
      <section className="border-t border-border/50 bg-card/30 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-lg border border-border/50 bg-background p-6 font-mono">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-accent/60" />
              <div className="h-3 w-3 rounded-full bg-primary/60" />
              <span className="ml-2 text-xs text-muted-foreground">leadership.ts</span>
            </div>
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              <code>
                {`interface LeadershipPhilosophy {
  radicalCandor: true;
  inclusion: "non-negotiable";
  systemsThinking: "always";
  empowerment: () => "teams that own their outcomes";
}`}
              </code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
