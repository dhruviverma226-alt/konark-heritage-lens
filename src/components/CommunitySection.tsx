import { useState } from "react"
import { Heart, MessageCircle, Share2, Camera, Video, MapPin, Plus } from "lucide-react"
import { HeritageButton } from "@/components/ui/heritage-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import userAvatar1 from "@/assets/user-avatar-1.jpg"
import userAvatar2 from "@/assets/user-avatar-2.jpg"
import userAvatar3 from "@/assets/user-avatar-3.jpg"
import konarkTemple from "@/assets/konark-temple-hero.jpg"
import lingarajTemple from "@/assets/lingaraj-temple.jpg"
import udayagiriCaves from "@/assets/udayagiri-caves.jpg"

export const CommunitySection = () => {
  const [newPost, setNewPost] = useState("")

  const posts = [
    {
      id: 1,
      user: {
        name: "Priya Sharma",
        avatar: userAvatar1,
        badge: "Heritage Explorer"
      },
      location: "Konark Temple, Odisha",
      time: "2 hours ago",
      content: "Just visited the magnificent Konark Temple! The intricate wheel carvings are absolutely breathtaking. The morning light creates such beautiful shadows on the stone sculptures.",
      images: [konarkTemple],
      likes: 24,
      comments: 8,
      isLiked: false
    },
    {
      id: 2,
      user: {
        name: "Rajesh Kumar",
        avatar: userAvatar2,
        badge: "Monument Guardian"
      },
      location: "Jagannath Temple, Puri",
      time: "1 day ago",
      content: "Witnessed the evening aarti at Jagannath Temple. The spiritual energy and architectural grandeur never cease to amaze me. Here's a short video of the beautiful ceremony.",
      hasVideo: true,
      likes: 45,
      comments: 12,
      isLiked: true
    },
    {
      id: 3,
      user: {
        name: "Meera Patel",
        avatar: userAvatar3,
        badge: "Cultural Preservationist"
      },
      location: "Lingaraj Temple, Bhubaneswar",
      time: "3 days ago",
      content: "Documenting the restoration work at Lingaraj Temple. It's inspiring to see how traditional craftsmen are preserving these ancient techniques for future generations.",
      images: [
        lingarajTemple,
        udayagiriCaves
      ],
      likes: 67,
      comments: 15,
      isLiked: false
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8 animate-temple-rise">
        <h2 className="text-3xl font-heritage font-bold text-heritage-bronze mb-4">
          Heritage Community
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Share your heritage experiences, contribute to preservation efforts, and connect with fellow heritage enthusiasts.
        </p>
      </div>

      {/* Create New Post */}
      <Card className="mb-8 border-heritage-stone">
        <CardHeader>
          <CardTitle className="text-lg font-heritage text-heritage-bronze">
            Share Your Heritage Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Share your visit, preservation efforts, or heritage discoveries..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px] border-heritage-stone focus:border-primary"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <HeritageButton variant="ghost" size="sm">
                  <Camera className="w-4 h-4" />
                  Photo
                </HeritageButton>
                <HeritageButton variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                  Video
                </HeritageButton>
                <HeritageButton variant="ghost" size="sm">
                  <MapPin className="w-4 h-4" />
                  Location
                </HeritageButton>
              </div>
              <HeritageButton variant="heritage">
                <Plus className="w-4 h-4" />
                Post
              </HeritageButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="border-heritage-stone hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback>{post.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-heritage-bronze">{post.user.name}</h4>
                      <span className="px-2 py-1 bg-heritage-gradient text-white text-xs rounded-full">
                        {post.user.badge}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {post.location}
                      </span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-foreground mb-4">{post.content}</p>
              
              {/* Post Images */}
              {post.images && (
                <div className={`grid gap-2 mb-4 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {post.images.map((image, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg">
                      <img 
                        src={image} 
                        alt={`Post image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Video placeholder */}
              {post.hasVideo && (
                <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Video className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Heritage Video</p>
                  </div>
                </div>
              )}
              
              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-heritage-stone">
                <div className="flex items-center gap-4">
                  <button 
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      post.isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <HeritageButton variant="outline" size="lg">
          Load More Posts
        </HeritageButton>
      </div>
    </div>
  )
}