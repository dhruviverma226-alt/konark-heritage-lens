import { MapPin, Camera, Users, User } from "lucide-react"
import { HeritageButton } from "@/components/ui/heritage-button"

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navbar = ({ activeSection, onSectionChange }: NavbarProps) => {
  const navItems = [
    { id: "ar", label: "AR View", icon: Camera },
    { id: "explore", label: "Explore", icon: MapPin },
    { id: "community", label: "Community", icon: Users },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-heritage-stone shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-heritage font-bold text-heritage-bronze">
              Digitalधरोहर
            </h1>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              
              return (
                <HeritageButton
                  key={item.id}
                  variant={isActive ? "heritage" : "ghost"}
                  onClick={() => onSectionChange(item.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </HeritageButton>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}