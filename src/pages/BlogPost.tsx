import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPostBySlug, categoryLabels } from "@/data/posts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Button variant="ghost" asChild>
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  // Simple markdown-ish rendering: headings and paragraphs
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={i} className="mt-8 mb-3 text-xl font-bold text-foreground">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={i} className="mt-6 mb-2 text-lg font-semibold text-foreground">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }

      // Handle bullet lists
      if (trimmed.startsWith("- ")) {
        const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="my-3 ml-4 space-y-1 list-disc text-muted-foreground">
            {items.map((item, j) => {
              const text = item.replace(/^- /, "");
              return (
                <li key={j} dangerouslySetInnerHTML={{ __html: inlineFormat(text) }} />
              );
            })}
          </ul>
        );
      }

      // Numbered lists
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split("\n").filter((l) => /^\d+\.\s/.test(l));
        return (
          <ol key={i} className="my-3 ml-4 space-y-1 list-decimal text-muted-foreground">
            {items.map((item, j) => {
              const text = item.replace(/^\d+\.\s/, "");
              return (
                <li key={j} dangerouslySetInnerHTML={{ __html: inlineFormat(text) }} />
              );
            })}
          </ol>
        );
      }

      return (
        <p
          key={i}
          className="my-3 text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: inlineFormat(trimmed) }}
        />
      );
    });
  };

  return (
    <div className="flex flex-col">
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <Button variant="ghost" size="sm" className="mb-8 -ml-2" asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
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

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-8 text-gradient">
              {post.title}
            </h1>

            <article className="prose-custom">{renderContent(post.content)}</article>
          </div>
        </div>
      </section>
    </div>
  );
};

/** Bold and italic inline formatting */
function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong class='text-foreground font-semibold'>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

export default BlogPost;
