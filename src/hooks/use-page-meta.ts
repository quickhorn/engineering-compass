import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
}

/**
 * Sets document title and meta description per page.
 * OG tags in index.html serve as defaults for crawlers;
 * this hook updates the live DOM for client-side navigation.
 */
export function usePageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  ogType = "website",
  ogImage,
}: PageMetaOptions) {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    setMeta("description", description);

    // OG tags
    setMetaProperty("og:title", ogTitle ?? title);
    setMetaProperty("og:description", ogDescription ?? description);
    setMetaProperty("og:type", ogType);
    if (ogImage) {
      setMetaProperty("og:image", ogImage);
      setMeta("twitter:image", ogImage);
    }
  }, [title, description, ogTitle, ogDescription, ogType, ogImage]);
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.content = content;
}
