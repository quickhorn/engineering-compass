import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { posts, categoryLabels, type BlogCategory } from "@/data/posts";
import { usePageMeta } from "@/hooks/use-page-meta";

const categories: Array<{ key: BlogCategory | "all"; label: string }> = [
  { key: "all", label: "All Posts" },
  { key: "leadership", label: categoryLabels.leadership },
  { key: "code", label: categoryLabels.code },
  { key: "ai", label: categoryLabels.ai },
];

const Blog = () => {
  usePageMeta({
    title: "Blog | Derick Grey",
    description: "Leadership insights, technical deep-dives, and thoughts on AI-assisted engineering from Derick Grey.",
  });

  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="container mx-auto max-w-4xl text-center">
          <p className="mb-2 font-mono text-sm text-primary animate-fade-in">// writing</p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="text-gradient">Blog</span>
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Leadership insights, technical deep-dives, and thoughts on AI-assisted engineering.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="container">
          <div className="flex gap-1 overflow-x-auto py-3">
            {categories.map((cat) => (
              <Button
                key={cat.key}
                variant={activeCategory === cat.key ? "default" : "ghost"}
                size="sm"
                className="shrink-0 font-mono text-xs"
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Post list */}
      <section className="py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-6">
            {sorted.map((post, index) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="block group">
                <Card
                  className="transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 animate-fade-in"
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1">
                      <span className="font-mono text-primary">
                        {categoryLabels[post.category]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more <ArrowRight className="h-3 w-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {sorted.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                No posts in this category yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
