import { useState } from "react"
import { Edit, MapPin, Calendar, Award, Image, MessageSquare } from "lucide-react"
import { HeritageButton } from "@/components/ui/heritage-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import userAvatar1 from "@/assets/user-avatar-1.jpg"

export const ProfileSection = () => {
  const user = {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    avatar: userAvatar1,
    joinDate: "March 2024",
    location: "Bhubaneswar, Odisha",
    bio: "Heritage enthusiast and cultural preservationist passionate about documenting India's architectural marvels."
  }

  const badges = [
    { name: "12 Places Visited", icon: MapPin, color: "bg-heritage-gradient" },
    { name: "Heritage Explorer", icon: Award, color: "bg-blue-500" },
    { name: "Community Contributor", icon: MessageSquare, color: "bg-green-500" },
    { name: "Photo Documenter", icon: Image, color: "bg-purple-500" }
  ]

  const visitedPlaces = [
    { name: "Konark Temple", date: "Dec 2024", photos: 15 },
    { name: "Jagannath Temple", date: "Nov 2024", photos: 22 },
    { name: "Lingaraj Temple", date: "Oct 2024", photos: 18 },
    { name: "Udayagiri Caves", date: "Sep 2024", photos: 12 },
    { name: "Rajarani Temple", date: "Aug 2024", photos: 20 },
    { name: "Dhauli Peace Pagoda", date: "Jul 2024", photos: 8 }
  ]

  const contributions = [
    { type: "Posts", count: 23, description: "Heritage stories shared" },
    { type: "Photos", count: 156, description: "Heritage photos uploaded" },
    { type: "Comments", count: 89, description: "Community interactions" },
    { type: "Discoveries", count: 5, description: "New heritage sites documented" }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <Card className="mb-8 border-heritage-stone">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-32 h-32 mb-4 border-4 border-heritage-gradient">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl bg-heritage-gradient text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <HeritageButton variant="outline" className="mb-4">
                <Edit className="w-4 h-4" />
                Edit Profile
              </HeritageButton>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-heritage font-bold text-heritage-bronze mb-2">
                {user.name}
              </h1>
              <p className="text-muted-foreground mb-4">{user.bio}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {user.joinDate}
                </span>
              </div>
              
              {/* Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {badges.map((badge, index) => {
                  const Icon = badge.icon
                  return (
                    <div key={index} className="text-center">
                      <div className={`w-12 h-12 rounded-full ${badge.color} flex items-center justify-center mx-auto mb-2`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs font-medium text-heritage-bronze">{badge.name}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="visits" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="visits">Heritage Visits</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="visits">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visitedPlaces.map((place, index) => (
              <Card key={index} className="border-heritage-stone hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-heritage text-heritage-bronze">
                    {place.name}
                  </CardTitle>
                  <CardDescription>Visited in {place.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {place.photos} photos captured
                    </span>
                    <HeritageButton variant="heritage" size="sm">
                      View Gallery
                    </HeritageButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contributions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contributions.map((contribution, index) => (
              <Card key={index} className="text-center border-heritage-stone">
                <CardHeader>
                  <CardTitle className="text-3xl font-heritage text-heritage-bronze">
                    {contribution.count}
                  </CardTitle>
                  <CardDescription className="font-semibold">
                    {contribution.type}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {contribution.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-heritage-stone">
              <CardHeader>
                <CardTitle className="font-heritage text-heritage-bronze">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-heritage-gradient rounded-lg text-white">
                  <Award className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">Heritage Master</p>
                    <p className="text-sm opacity-90">Visited 10+ heritage sites</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-500 rounded-lg text-white">
                  <Image className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">Photo Champion</p>
                    <p className="text-sm opacity-90">Uploaded 100+ heritage photos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-500 rounded-lg text-white">
                  <MessageSquare className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">Community Star</p>
                    <p className="text-sm opacity-90">Active community contributor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-heritage-stone">
              <CardHeader>
                <CardTitle className="font-heritage text-heritage-bronze">Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Heritage Sites Visited</span>
                    <span>12/25</span>
                  </div>
                  <div className="w-full bg-heritage-stone rounded-full h-2">
                    <div className="bg-heritage-gradient h-2 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Photos Contributed</span>
                    <span>156/200</span>
                  </div>
                  <div className="w-full bg-heritage-stone rounded-full h-2">
                    <div className="bg-heritage-gradient h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Community Engagement</span>
                    <span>89/100</span>
                  </div>
                  <div className="w-full bg-heritage-stone rounded-full h-2">
                    <div className="bg-heritage-gradient h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}