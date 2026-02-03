import { Badge } from "@/components/ui/badge";

export function AvailabilityBadge() {
  return (
    <Badge 
      variant="outline" 
      className="border-primary/50 bg-primary/10 text-primary hover:bg-primary/20 transition-colors pulse-availability"
    >
      <span className="mr-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
      Seeking Engineering Manager Roles
    </Badge>
  );
}
