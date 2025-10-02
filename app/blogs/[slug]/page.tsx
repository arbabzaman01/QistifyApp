import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { mockBlogPosts } from "@/lib/mock-data"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = mockBlogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded mb-4">{post.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{post.title}</h1>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="aspect-video relative bg-slate-100 rounded-lg overflow-hidden mb-8">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        <div className="prose prose-slate max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>

          <p className="leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Understanding the Benefits</h2>
          <p className="leading-relaxed mb-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Flexible payment options that fit your budget</li>
            <li>No hidden fees or surprise charges</li>
            <li>Quick and easy approval process</li>
            <li>Access to premium products immediately</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Making the Right Choice</h2>
          <p className="leading-relaxed mb-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>

          <p className="leading-relaxed mb-4">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t">
          <Link href="/blogs">
            <Button variant="outline">View All Posts</Button>
          </Link>
        </div>
      </article>
    </div>
  )
}
