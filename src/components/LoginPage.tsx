import { useState } from "react"
import { HeritageButton } from "@/components/ui/heritage-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import heritagePattern from "@/assets/heritage-pattern.png"

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-heritage-gradient relative overflow-hidden"
      style={{
        backgroundImage: `url(${heritagePattern})`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="w-full max-w-md space-y-8 animate-temple-rise relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-heritage font-bold text-white mb-2">
            Digitalधरोहर
          </h1>
          <p className="text-white/90 font-medium">
            Apna Itihas, Apna Pride
          </p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-heritage text-heritage-bronze">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to explore India's digital heritage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-heritage-bronze font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-heritage-stone focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-heritage-bronze font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-heritage-stone focus:border-primary"
                  required
                />
              </div>
              <HeritageButton 
                type="submit" 
                variant="heritage" 
                className="w-full"
                size="lg"
              >
                Enter Heritage Journey
              </HeritageButton>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button className="text-primary hover:underline font-medium">
                  Join the preservation
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-white/80 text-sm">
          <p>Preserving India's heritage through technology</p>
        </div>
      </div>
    </div>
  )
}