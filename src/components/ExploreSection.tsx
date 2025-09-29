import { MapPin, Clock, Camera } from "lucide-react"
import { HeritageButton } from "@/components/ui/heritage-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const ExploreSection = () => {
  const heritageSites = [
    {
      name: "Jagannath Temple",
      location: "Puri, Odisha",
      period: "12th Century",
      description: "Sacred temple dedicated to Lord Jagannath, famous for the annual Rath Yatra festival.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      distance: "65 km"
    },
    {
      name: "Lingaraj Temple",
      location: "Bhubaneswar, Odisha",
      period: "11th Century",
      description: "Magnificent temple dedicated to Lord Shiva, showcasing Kalinga architecture.",
      image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=400",
      distance: "35 km"
    },
    {
      name: "Udayagiri Caves",
      location: "Bhubaneswar, Odisha",
      period: "1st-2nd Century",
      description: "Ancient rock-cut caves with intricate Jain and Buddhist sculptures.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
      distance: "40 km"
    },
    {
      name: "Rajarani Temple",
      location: "Bhubaneswar, Odisha",
      period: "11th Century",
      description: "Temple of Love known for its exquisite sculptural art and architectural beauty.",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400",
      distance: "38 km"
    },
    {
      name: "Dhauli Peace Pagoda",
      location: "Bhubaneswar, Odisha",
      period: "Modern (Buddhist Site)",
      description: "Peace pagoda built where Emperor Ashoka embraced Buddhism after Kalinga War.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      distance: "42 km"
    },
    {
      name: "Chilika Lake",
      location: "Odisha",
      period: "Natural Heritage",
      description: "Asia's largest brackish water lagoon, home to diverse flora and fauna.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      distance: "50 km"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8 animate-temple-rise">
        <h2 className="text-3xl font-heritage font-bold text-heritage-bronze mb-4">
          Explore Odisha's Heritage
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the rich cultural heritage of Odisha through our immersive AR experiences 
          and virtual tours of ancient temples and monuments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {heritageSites.map((site, index) => (
          <Card 
            key={index} 
            className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-heritage-stone"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={site.image} 
                alt={site.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-heritage-bronze font-heritage">
                {site.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {site.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {site.period}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {site.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-primary">
                  {site.distance} away
                </span>
                <div className="flex gap-2">
                  <HeritageButton variant="heritage" size="sm">
                    <Camera className="w-3 h-3" />
                    AR View
                  </HeritageButton>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <HeritageButton variant="outline" size="lg" className="px-8">
          Load More Heritage Sites
        </HeritageButton>
      </div>
    </div>
  )
}