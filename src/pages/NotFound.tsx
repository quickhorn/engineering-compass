import { usePageMeta } from "@/hooks/use-page-meta";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Terminal, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  usePageMeta({
    title: "404 — Page Not Found | Derick Grey",
    description: "This page doesn't exist. Let's get you back on track.",
  });

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-lg animate-fade-in">
        {/* Terminal window */}
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-xl">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-destructive/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              ~/derick-grey/portfolio
            </span>
          </div>

          {/* Terminal content */}
          <div className="space-y-3 p-6 font-mono text-sm">
            <div className="flex gap-2">
              <span className="text-primary">$</span>
              <span className="text-foreground">cd {typeof window !== 'undefined' ? window.location.pathname : '/unknown'}</span>
            </div>
            <div className="text-destructive">
              bash: cd: {typeof window !== 'undefined' ? window.location.pathname : '/unknown'}: No such file or directory
            </div>
            <div className="flex gap-2">
              <span className="text-primary">$</span>
              <span className="text-muted-foreground">echo $?</span>
            </div>
            <div className="text-gradient text-7xl font-bold tracking-tighter">
              404
            </div>
            <div className="flex gap-2">
              <span className="text-primary">$</span>
              <span className="text-muted-foreground">
                # Page not found. Looks like this route was never committed.
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">$</span>
              <span className="text-accent">suggest</span>
              <span className="text-muted-foreground">--fix</span>
            </div>
            <div className="text-foreground">
              → Try navigating back home or checking the URL.
            </div>

            {/* Blinking cursor */}
            <div className="flex gap-2">
              <span className="text-primary">$</span>
              <span className="inline-block h-5 w-2 animate-pulse bg-primary" />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="flex-1">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              cd ~
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1" onClick={() => window.history.back()}>
            <span className="cursor-pointer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              git checkout -
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
