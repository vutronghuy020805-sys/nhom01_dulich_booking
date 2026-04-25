import { notFound } from "next/navigation";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import FooterSection from "@/components/FooterSection";
import BlogDetailPage from "@/components/blog/BlogDetailPage";
import {
  blogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/data/blogPosts";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Bài viết không tồn tại | VieGo Blog" };
  return {
    title: `${post.title} | VieGo Blog`,
    description: post.excerpt || post.title,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedBlogPosts(post, 4);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HotelsPageHeader active="" />

      <main className="flex-1">
        <BlogDetailPage post={post} relatedPosts={related} />
      </main>

      <FooterSection />
    </div>
  );
}
