 import { useState, useRef } from "react";
 import { ChevronLeft, ChevronRight, Heart, MessageCircle, Repeat2 } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent } from "@/components/ui/card";
 
 // Placeholder LinkedIn posts - these would ideally come from LinkedIn API or manual entry
 const linkedInPosts = [
   {
     id: 1,
     content: "Great teams aren't built by hiring the best individuals—they're built by creating environments where good people become great together. 🚀",
     likes: 142,
     comments: 23,
     reposts: 8,
     date: "2d ago",
   },
   {
     id: 2,
     content: "The best engineering managers I know spend more time removing obstacles than assigning tasks. Your job isn't to direct—it's to enable.",
     likes: 89,
     comments: 15,
     reposts: 4,
     date: "5d ago",
   },
   {
     id: 3,
     content: "Radical candor isn't about being harsh. It's about caring enough to tell someone the truth they need to hear, even when it's uncomfortable.",
     likes: 234,
     comments: 31,
     reposts: 12,
     date: "1w ago",
   },
   {
     id: 4,
     content: "After 15+ years in engineering, the most valuable skill isn't technical—it's the ability to translate between business needs and technical solutions.",
     likes: 178,
     comments: 27,
     reposts: 9,
     date: "1w ago",
   },
   {
     id: 5,
     content: "AI won't replace developers. But developers who use AI effectively will outpace those who don't. Time to adapt.",
     likes: 312,
     comments: 45,
     reposts: 18,
     date: "2w ago",
   },
 ];
 
 export const LinkedInCarousel = () => {
   const scrollRef = useRef<HTMLDivElement>(null);
   const [canScrollLeft, setCanScrollLeft] = useState(false);
   const [canScrollRight, setCanScrollRight] = useState(true);
 
   const checkScroll = () => {
     if (scrollRef.current) {
       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
       setCanScrollLeft(scrollLeft > 0);
       setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
     }
   };
 
   const scroll = (direction: "left" | "right") => {
     if (scrollRef.current) {
       const scrollAmount = 320;
       scrollRef.current.scrollBy({
         left: direction === "left" ? -scrollAmount : scrollAmount,
         behavior: "smooth",
       });
       setTimeout(checkScroll, 300);
     }
   };
 
   return (
     <div className="relative">
       {/* Scroll buttons */}
       <Button
         variant="ghost"
         size="icon"
         className={`absolute -left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm transition-opacity ${
           canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
         }`}
         onClick={() => scroll("left")}
       >
         <ChevronLeft className="h-4 w-4" />
       </Button>
       
       <Button
         variant="ghost"
         size="icon"
         className={`absolute -right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm transition-opacity ${
           canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
         }`}
         onClick={() => scroll("right")}
       >
         <ChevronRight className="h-4 w-4" />
       </Button>
 
       {/* Scrollable container */}
       <div
         ref={scrollRef}
         onScroll={checkScroll}
         className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
       >
         {linkedInPosts.map((post) => (
           <Card 
             key={post.id} 
             className="min-w-[280px] max-w-[280px] flex-shrink-0 transition-all duration-300 hover:border-primary/50"
           >
             <CardContent className="p-4">
               <p className="mb-4 text-sm leading-relaxed text-foreground line-clamp-4">
                 {post.content}
               </p>
               
               <div className="flex items-center justify-between text-xs text-muted-foreground">
                 <div className="flex items-center gap-3">
                   <span className="flex items-center gap-1">
                     <Heart className="h-3 w-3" />
                     {post.likes}
                   </span>
                   <span className="flex items-center gap-1">
                     <MessageCircle className="h-3 w-3" />
                     {post.comments}
                   </span>
                   <span className="flex items-center gap-1">
                     <Repeat2 className="h-3 w-3" />
                     {post.reposts}
                   </span>
                 </div>
                 <span>{post.date}</span>
               </div>
             </CardContent>
           </Card>
         ))}
       </div>
     </div>
   );
 };