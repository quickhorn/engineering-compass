import { Link } from "react-router-dom";
import { ExternalLink, Github, FileText, Users, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvailabilityBadge } from "@/components/layout/AvailabilityBadge";
import { GitHubHeatmap } from "@/components/GitHubHeatmap";

import { usePageMeta } from "@/hooks/use-page-meta";
 
 const thoughtLeadership = [
   {
     title: "Building Engineering Cultures That Scale",
     source: "TheoremOne",
     description: "How I developed an onboarding program that connected with every new developer on day one to instill ownership culture.",
     link: "#",
     icon: Users,
   },
   {
     title: "The Pivot: From Corporate to Entrepreneur and Back",
     source: "Personal",
     description: "My journey from corporate engineering leadership to entrepreneurship and what I learned along the way.",
     link: "#",
     icon: Lightbulb,
   },
   {
     title: "AI-Assisted Engineering: A Practical Guide",
     source: "Personal",
     description: "How I integrate AI tools into my daily workflow to accelerate development without sacrificing quality.",
     link: "#",
     icon: FileText,
   },
 ];
 
const CurrentWork = () => {
  usePageMeta({
    title: "Current Work | Derick Grey",
    description: "Fractional CTO work, open source contributions, and recent writing on engineering leadership and AI-assisted development.",
  });

  return (
     <div className="flex flex-col">
       {/* Hero Section */}
       <section className="relative overflow-hidden py-16 md:py-24">
         <div className="absolute inset-0 -z-10">
           <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
           <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
         </div>
 
         <div className="container">
           <div className="mx-auto max-w-4xl text-center">
             <div className="mb-6 flex justify-center">
               <AvailabilityBadge />
             </div>
             
             <p className="mb-2 font-mono text-sm text-primary animate-fade-in">// current_focus</p>
             <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
               <span className="text-gradient">Work & Ideas</span>
             </h1>
             <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
               Fractional CTO work for early-stage startups, open source contributions, and leadership insights.
             </p>
           </div>
         </div>
       </section>
 
       {/* GitHub Contributions Section */}
       <section className="py-12">
         <div className="container">
           <div className="mb-6 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <Github className="h-5 w-5 text-primary" />
               <h2 className="font-mono text-lg font-semibold">GitHub Contributions</h2>
             </div>
             <a 
               href="https://github.com/quickhorn" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
             >
               @quickhorn
               <ExternalLink className="h-3 w-3" />
             </a>
           </div>
           
           <GitHubHeatmap />
           
           <p className="mt-4 text-center text-sm text-muted-foreground">
             Active contributions across private startup repositories and open source projects.
           </p>
         </div>
       </section>
 
       {/* Thought Leadership Section */}
       <section className="border-t border-border/50 bg-card/30 py-12">
         <div className="container">
           <div className="mb-8 text-center">
             <p className="mb-2 font-mono text-sm text-primary">// thought_leadership</p>
             <h2 className="text-2xl font-bold md:text-3xl">Featured Writing</h2>
           </div>
 
           <div className="grid gap-6 md:grid-cols-3">
             {thoughtLeadership.map((item, index) => (
               <Card 
                 key={item.title} 
                 className="group transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 animate-fade-in"
                 style={{ animationDelay: `${0.1 + index * 0.1}s` }}
               >
                 <CardHeader className="pb-3">
                   <div className="flex items-start justify-between">
                     <item.icon className="h-8 w-8 text-primary/70 group-hover:text-primary transition-colors" />
                     <span className="text-xs font-mono text-muted-foreground">{item.source}</span>
                   </div>
                   <CardTitle className="text-base leading-tight group-hover:text-primary transition-colors">
                     {item.title}
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="mb-4 text-sm text-muted-foreground">
                     {item.description}
                   </p>
                   <Button variant="ghost" size="sm" className="h-8 px-3 text-xs" asChild>
                     <a href={item.link}>
                       Read more
                       <ExternalLink className="ml-1 h-3 w-3" />
                     </a>
                   </Button>
                 </CardContent>
               </Card>
             ))}
           </div>
         </div>
       </section>
     </div>
   );
 };
 
 export default CurrentWork;