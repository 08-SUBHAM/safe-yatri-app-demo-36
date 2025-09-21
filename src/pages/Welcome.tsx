import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, MapPin, Users } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-6 text-white">
        {/* App Logo & Branding */}
        <div className={`text-center mb-8 transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">SafeYatri</h1>
          <p className="text-lg opacity-90">Your Smart Travel Safety Companion</p>
        </div>

        {/* Feature Preview Cards */}
        <div className={`space-y-4 mb-8 w-full max-w-sm transition-all duration-700 delay-300 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="flex items-center p-4 text-white">
              <Shield className="w-6 h-6 mr-3" />
              <div>
                <p className="font-medium">Real-time Safety Alerts</p>
                <p className="text-sm opacity-80">Stay informed about local risks</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="flex items-center p-4 text-white">
              <MapPin className="w-6 h-6 mr-3" />
              <div>
                <p className="font-medium">Smart Route Planning</p>
                <p className="text-sm opacity-80">Find the safest paths</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="flex items-center p-4 text-white">
              <Users className="w-6 h-6 mr-3" />
              <div>
                <p className="font-medium">Emergency SOS</p>
                <p className="text-sm opacity-80">Instant help when needed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className={`space-y-4 w-full max-w-sm transition-all duration-700 delay-500 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            onClick={() => navigate('/signup')}
            className="w-full bg-white text-primary hover:bg-white/90 font-medium py-3"
          >
            Get Started - Sign Up
          </Button>
          
          <Button 
            onClick={() => navigate('/login')}
            variant="outline-light" 
            className="w-full font-medium py-3"
          >
            Already have an account? Login
          </Button>
        </div>

        {/* Bottom Tagline */}
        <div className={`mt-8 text-center transition-all duration-700 delay-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm opacity-70">Trusted by 50,000+ travelers worldwide</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;