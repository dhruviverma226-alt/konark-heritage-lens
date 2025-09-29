import { useState } from "react"
import { MapPin, ZoomIn, ZoomOut, RotateCcw, Maximize } from "lucide-react"
import { HeritageButton } from "@/components/ui/heritage-button"
import { Card, CardContent } from "@/components/ui/card"
import konarkTemple from "@/assets/konark-temple-hero.jpg"
import kingNarsimhadeva from "@/assets/king-narsimhadeva.png"

export const ARSection = () => {
  const [isLocationDetected, setIsLocationDetected] = useState(true)
  const [showKingDialog, setShowKingDialog] = useState(false)

  const arTools = [
    { icon: ZoomIn, label: "Zoom In" },
    { icon: ZoomOut, label: "Zoom Out" },
    { icon: RotateCcw, label: "Reset View" },
    { icon: Maximize, label: "Fullscreen" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Location Detection */}
      <div className="mb-6 animate-temple-rise">
        <Card className="bg-sunrise-gradient border-0 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <div>
                <p className="font-semibold">Location Detected</p>
                <p className="text-sm opacity-90">Konark Temple, Odisha, India</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AR View Container */}
      <div className="relative">
        <Card className="overflow-hidden border-heritage-bronze shadow-xl">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-black">
              <img 
                src={konarkTemple} 
                alt="Konark Temple AR View"
                className="w-full h-full object-cover"
              />
              
              {/* AR Overlay UI */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20">
                
                {/* AR Tools */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {arTools.map((tool, index) => {
                    const Icon = tool.icon
                    return (
                      <HeritageButton
                        key={index}
                        variant="outline"
                        size="icon"
                        className="bg-white/90 backdrop-blur-sm border-white/50 hover:bg-white"
                        title={tool.label}
                      >
                        <Icon className="w-4 h-4" />
                      </HeritageButton>
                    )
                  })}
                </div>

                {/* AI Avatar */}
                <div className="absolute bottom-20 left-4">
                  <div 
                    className="relative cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => setShowKingDialog(!showKingDialog)}
                  >
                    <div className="w-16 h-16 rounded-full bg-heritage-gradient p-1 animate-heritage-glow">
                      <img 
                        src={kingNarsimhadeva}
                        alt="King Narsimhadeva I"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                </div>

                {/* King's Dialog */}
                {showKingDialog && (
                  <div className="absolute bottom-40 left-4 max-w-sm animate-temple-rise">
                    <Card className="bg-white/95 backdrop-blur-sm border-heritage-bronze">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <img 
                            src={kingNarsimhadeva}
                            alt="King Narsimhadeva I"
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-semibold text-heritage-bronze text-sm">
                              King Narsimhadeva I
                            </p>
                            <p className="text-sm text-foreground mt-1">
                              "I am King Narsimhadeva I and I built Konark Temple in Odisha in the 13th century. 
                              This Sun Temple was designed as a colossal chariot with 24 wheels, dedicated to Surya, the Sun God."
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* AR Information Panel */}
                <div className="absolute bottom-4 left-4 right-4">
                  <Card className="bg-black/70 backdrop-blur-sm border-white/20">
                    <CardContent className="p-4">
                      <div className="text-white">
                        <h3 className="font-heritage text-lg font-semibold mb-2">
                          Konark Sun Temple
                        </h3>
                        <p className="text-sm opacity-90 mb-3">
                          Built in the 13th century, this UNESCO World Heritage Site represents the Sun God's chariot 
                          with 24 intricately carved wheels and seven horses.
                        </p>
                        <div className="flex gap-2">
                          <HeritageButton 
                            variant="heritage" 
                            size="sm"
                            onClick={() => setShowKingDialog(!showKingDialog)}
                          >
                            Talk to King
                          </HeritageButton>
                          <HeritageButton variant="outline" size="sm" className="text-white border-white/50">
                            Learn More
                          </HeritageButton>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}