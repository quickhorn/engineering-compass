 import { useMemo } from "react";
 
 // Generate mock contribution data for the heatmap
 const generateContributions = () => {
   const contributions: { date: string; count: number; level: number }[] = [];
   const today = new Date();
   
   // Generate 52 weeks of data
   for (let week = 51; week >= 0; week--) {
     for (let day = 0; day < 7; day++) {
       const date = new Date(today);
       date.setDate(date.getDate() - (week * 7 + (6 - day)));
       
       // Random contribution count with some patterns
       const isWeekday = day > 0 && day < 6;
       const baseChance = isWeekday ? 0.7 : 0.3;
       const hasContribution = Math.random() < baseChance;
       const count = hasContribution ? Math.floor(Math.random() * 12) + 1 : 0;
       
       // Level: 0 = none, 1-4 = intensity
       let level = 0;
       if (count > 0) level = 1;
       if (count > 3) level = 2;
       if (count > 6) level = 3;
       if (count > 9) level = 4;
       
       contributions.push({
         date: date.toISOString().split("T")[0],
         count,
         level,
       });
     }
   }
   
   return contributions;
 };
 
 const levelColors = [
   "bg-muted/50",                    // Level 0 - no contributions
   "bg-primary/20",                  // Level 1
   "bg-primary/40",                  // Level 2
   "bg-primary/60",                  // Level 3
   "bg-primary/90",                  // Level 4
 ];
 
 export const GitHubHeatmap = () => {
   const contributions = useMemo(() => generateContributions(), []);
   
   // Group by weeks
   const weeks: typeof contributions[] = [];
   for (let i = 0; i < contributions.length; i += 7) {
     weeks.push(contributions.slice(i, i + 7));
   }
   
   const totalContributions = contributions.reduce((sum, c) => sum + c.count, 0);
   
   return (
     <div className="rounded-lg border border-border/50 bg-card/50 p-4">
       {/* Heatmap grid */}
       <div className="overflow-x-auto pb-2">
         <div className="flex gap-[3px]" style={{ minWidth: "max-content" }}>
           {weeks.map((week, weekIndex) => (
             <div key={weekIndex} className="flex flex-col gap-[3px]">
               {week.map((day, dayIndex) => (
                 <div
                   key={`${weekIndex}-${dayIndex}`}
                   className={`h-[10px] w-[10px] rounded-sm ${levelColors[day.level]} transition-colors hover:ring-1 hover:ring-primary/50`}
                   title={`${day.date}: ${day.count} contributions`}
                 />
               ))}
             </div>
           ))}
         </div>
       </div>
       
       {/* Legend and stats */}
       <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
         <span className="font-mono">{totalContributions.toLocaleString()} contributions in the last year</span>
         
         <div className="flex items-center gap-1">
           <span className="mr-1">Less</span>
           {levelColors.map((color, i) => (
             <div
               key={i}
               className={`h-[10px] w-[10px] rounded-sm ${color}`}
             />
           ))}
           <span className="ml-1">More</span>
         </div>
       </div>
     </div>
   );
 };