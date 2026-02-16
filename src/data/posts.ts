import fm from "front-matter";

export type BlogCategory = "leadership" | "code" | "ai";

export interface BlogPost {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  content: string;
  date: string;
  readingTime: string;
}

export const categoryLabels: Record<BlogCategory, string> = {
  leadership: "Leadership Lab",
  code: "Code & Context",
  ai: "AI-Assisted Engineering",
};

// ── Load all markdown files at build time ─────────────────────────

interface PostFrontmatter {
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readingTime: string;
}

const markdownFiles = import.meta.glob<string>("../../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function buildPosts(): BlogPost[] {
  const result: BlogPost[] = [];

  for (const [filepath, raw] of Object.entries(markdownFiles)) {
    const filename = filepath.split("/").pop() ?? "";
    const slug = filename.replace(/\.md$/, "");

    const { attributes, body } = fm<PostFrontmatter>(raw);

    result.push({
      slug,
      title: attributes.title ?? slug,
      category: (attributes.category as BlogCategory) ?? "code",
      excerpt: attributes.excerpt ?? "",
      content: body,
      date: attributes.date ?? "",
      readingTime: attributes.readingTime ?? "",
    });
  }

  return result;
}

export const posts: BlogPost[] = buildPosts();

// ── Query helpers ─────────────────────────────────────────────────

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return posts.filter((p) => p.category === category);
}
