import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { mockBlogPosts } from "@/lib/mock-data"
import { Calendar, User, ArrowRight } from "lucide-react"

export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-xl text-muted-foreground">
          Tips, insights, and news about smart shopping and flexible payments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {mockBlogPosts.map((post) => (
          <Link key={post.id} href={`/blogs/${post.slug}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
              <div className="aspect-video relative bg-slate-100">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </span>
                </div>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded mb-3">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold mb-2 text-balance">{post.title}</h2>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <span className="text-blue-600 text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
