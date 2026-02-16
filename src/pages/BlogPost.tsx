import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { getPostBySlug, categoryLabels } from "@/data/posts";
import { usePageMeta } from "@/hooks/use-page-meta";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  usePageMeta({
    title: post ? `${post.title} | Derick Grey` : "Post Not Found | Derick Grey",
    description: post?.excerpt ?? "Blog post not found.",
    ogType: "article",
  });

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

            <article className="prose dark:prose-invert prose-headings:font-mono prose-headings:tracking-tight prose-a:text-primary max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
