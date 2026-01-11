import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");

  const sortedPosts = posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "Return Signals Blog",
    description:
      "Insights on ecommerce returns, post-purchase experience, and how AI is transforming customer service",
    site: context.site || "https://www.returnsignals.com",
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
      author: post.data.author || "Return Signals Team",
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>
<copyright>Copyright ${new Date().getFullYear()} Return Signals</copyright>
<webMaster>noreply@returnsignals.com (Return Signals)</webMaster>
<managingEditor>noreply@returnsignals.com (Return Signals Team)</managingEditor>
<ttl>1440</ttl>`,
  });
}
