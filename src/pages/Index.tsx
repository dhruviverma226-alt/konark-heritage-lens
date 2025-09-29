import { useState } from "react"
import { LoginPage } from "@/components/LoginPage"
import { Navbar } from "@/components/Navbar"
import { ARSection } from "@/components/ARSection"
import { ExploreSection } from "@/components/ExploreSection"
import { CommunitySection } from "@/components/CommunitySection"
import { ProfileSection } from "@/components/ProfileSection"

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeSection, setActiveSection] = useState("ar")

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "ar":
        return <ARSection />
      case "explore":
        return <ExploreSection />
      case "community":
        return <CommunitySection />
      case "profile":
        return <ProfileSection />
      default:
        return <ARSection />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main>
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;
