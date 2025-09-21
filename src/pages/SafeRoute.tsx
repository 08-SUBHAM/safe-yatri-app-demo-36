import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Navigation, Clock, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SafeRoute = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [destination, setDestination] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [routeCalculated, setRouteCalculated] = useState(false);

  // Mock route data
  const mockRoutes = [
    {
      id: 1,
      name: "Safest Route",
      distance: "2.8 km",
      duration: "12 min",
      safetyScore: 92,
      highlights: ["Well-lit streets", "Police stations nearby", "CCTV coverage"],
      warnings: [],
      color: "success"
    },
    {
      id: 2, 
      name: "Fastest Route",
      distance: "2.1 km",
      duration: "8 min",
      safetyScore: 67,
      highlights: ["Direct path", "Good traffic flow"],
      warnings: ["Dark alleys", "Limited CCTV"],
      color: "warning"
    },
    {
      id: 3,
      name: "Alternate Route",
      distance: "3.2 km", 
      duration: "15 min",
      safetyScore: 45,
      highlights: ["Scenic route"],
      warnings: ["High crime area", "Poor lighting", "Isolated sections"],
      color: "destructive"
    }
  ];

  const calculateRoute = () => {
    if (!destination) {
      toast({
        title: "Enter Destination",
        description: "Please enter your destination to calculate routes.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    
    // Simulate route calculation
    setTimeout(() => {
      setIsCalculating(false);
      setRouteCalculated(true);
      toast({
        title: "Routes Calculated",
        description: "Found 3 routes based on safety data and crime statistics.",
      });
    }, 2000);
  };

  const selectRoute = (route: any) => {
    toast({
      title: `Route Selected: ${route.name}`,
      description: `Starting navigation with safety score ${route.safetyScore}/100`,
    });
    
    // Simulate starting navigation
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-safety text-white p-4">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="text-white hover:bg-white/10 mr-3"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-semibold">Safe Route Generator</h1>
          </div>

          <p className="text-sm opacity-90">
            Find the safest paths based on crime data, weather, and real-time alerts
          </p>
        </div>

        <div className="p-4 space-y-4">
          {/* Current Location */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-medium">Police Bazaar, Shillong</p>
                </div>
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Destination Input */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">To</p>
                  <Input
                    placeholder="Enter destination..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="border-none p-0 h-auto font-medium focus:ring-0"
                  />
                </div>
                <Navigation className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Calculate Button */}
          <Button 
            onClick={calculateRoute}
            disabled={isCalculating || !destination}
            className="w-full bg-gradient-safety hover:opacity-90 font-medium"
          >
            {isCalculating ? "Analyzing Safety Data..." : "Calculate Safe Routes"}
          </Button>

          {/* Route Results */}
          {routeCalculated && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                Recommended Routes
              </h2>

              {mockRoutes.map((route) => (
                <Card 
                  key={route.id}
                  className="cursor-pointer transition-all hover:scale-[1.02] hover:shadow-elevated"
                  onClick={() => selectRoute(route)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold flex items-center">
                          {route.name}
                          {route.id === 1 && (
                            <Badge variant="outline" className="ml-2 text-success border-success text-xs">
                              Recommended
                            </Badge>
                          )}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {route.distance}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {route.duration}
                          </span>
                        </div>
                      </div>

                      {/* Safety Score */}
                      <div className="text-center">
                        <div className={`text-xl font-bold ${
                          route.safetyScore >= 80 ? 'text-success' :
                          route.safetyScore >= 60 ? 'text-warning' : 'text-destructive'
                        }`}>
                          {route.safetyScore}
                        </div>
                        <p className="text-xs text-muted-foreground">Safety Score</p>
                      </div>
                    </div>

                    {/* Route Highlights */}
                    <div className="space-y-2">
                      {route.highlights.length > 0 && (
                        <div>
                          <div className="flex flex-wrap gap-1">
                            {route.highlights.map((highlight, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Warnings */}
                      {route.warnings.length > 0 && (
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                          <div className="flex-1">
                            <div className="flex flex-wrap gap-1">
                              {route.warnings.map((warning, index) => (
                                <Badge key={index} variant="outline" className="text-xs text-warning border-warning">
                                  {warning}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-primary">Safety Analysis Complete</p>
                  <p className="text-xs text-muted-foreground">
                    Routes analyzed using crime data, weather conditions, and real-time alerts
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SafeRoute;