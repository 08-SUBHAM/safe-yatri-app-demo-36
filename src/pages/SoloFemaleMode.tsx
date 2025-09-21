import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Shield, Users, MapPin, Phone, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SoloFemaleMode = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEnabled, setIsEnabled] = useState(false);

  // Mock female-only services
  const femaleServices = [
    {
      id: 1,
      name: "Women's Safety Zones",
      description: "Well-lit areas with increased security",
      icon: Shield,
      locations: ["Police Bazaar, Shillong", "Iewduh Market", "Laitumkhrah"],
      status: "Available"
    },
    {
      id: 2, 
      name: "Female Tour Guides",
      description: "Verified female guides for solo travelers",
      icon: Users,
      guides: [
        { name: "Sneha Agarwal", rating: 4.8, languages: "Hindi, English" },
        { name: "Priya Mehta", rating: 4.9, languages: "Hindi, English, French" }
      ],
      status: "Available"
    },
    {
      id: 3,
      name: "Women's Escort Services", 
      description: "Safe accompaniment for late hours",
      icon: Shield,
      services: ["Market visits", "Evening tours", "Transport assistance"],
      status: "Available"
    }
  ];

  const handleToggleMode = (enabled: boolean) => {
    setIsEnabled(enabled);
    
    if (enabled) {
      toast({
        title: "Solo Female Mode Activated",
        description: "Dashboard enhanced with women-specific safety features",
      });
    } else {
      toast({
        title: "Solo Female Mode Disabled", 
        description: "Returned to standard safety mode",
      });
    }
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
            <h1 className="text-xl font-semibold">Solo Female Mode</h1>
          </div>

          <p className="text-sm opacity-90">
            Enhanced safety features designed specifically for women travelers
          </p>
        </div>

        <div className="p-4 space-y-6">
          {/* Mode Toggle */}
          <Card className="bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Solo Female Safety Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      {isEnabled ? "Enhanced protection active" : "Activate for women-specific features"}
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={isEnabled} 
                  onCheckedChange={handleToggleMode}
                  className="data-[state=checked]:bg-secondary"
                />
              </div>

              {isEnabled && (
                <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
                  <p className="text-sm text-secondary font-medium">✓ Enhanced Features Active</p>
                  <p className="text-xs text-muted-foreground">
                    Safe zones highlighted, female guides prioritized, enhanced SOS alerts
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Female-Only Services */}
          {isEnabled && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2 text-secondary" />
                Women-Specific Services
              </h2>

              {femaleServices.map((service) => (
                <Card key={service.id} className="transition-all hover:shadow-elevated">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center">
                        <service.icon className="w-5 h-5 mr-2 text-secondary" />
                        {service.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-success border-success text-xs">
                        {service.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Safety Zones */}
                    {service.locations && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Nearby Safe Zones:</p>
                        <div className="flex flex-wrap gap-2">
                          {service.locations.map((location) => (
                            <Badge key={location} variant="secondary" className="text-xs">
                              <MapPin className="w-3 h-3 mr-1" />
                              {location}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Female Guides */}
                    {service.guides && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium">Available Female Guides:</p>
                        {service.guides.map((guide, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{guide.name}</p>
                              <p className="text-xs text-muted-foreground">{guide.languages}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-warning fill-current" />
                                <span className="text-xs font-medium">{guide.rating}</span>
                              </div>
                              <Button size="sm" variant="outline">
                                <Phone className="w-3 h-3 mr-1" />
                                Contact
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Escort Services */}
                    {service.services && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Available Services:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {service.services.map((serv) => (
                            <div key={serv} className="text-xs text-center p-2 bg-secondary/10 rounded border border-secondary/20">
                              {serv}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Emergency Contacts */}
              <Card className="bg-destructive/5 border-destructive/20">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-destructive mb-3 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Women's Helpline Numbers
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Women Helpline:</span>
                      <span className="font-medium">1091</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tourist Helpline:</span>
                      <span className="font-medium">1363</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NE Women Helpline:</span>
                      <span className="font-medium">181</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Tips */}
              <Card className="bg-secondary/5 border-secondary/20">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-secondary mb-3">Quick Safety Tips</h3>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Share your live location with trusted contacts</li>
                    <li>• Avoid isolated areas especially after dark</li>
                    <li>• Keep emergency numbers easily accessible</li>
                    <li>• Trust your instincts and seek help if uncomfortable</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Disabled State */}
          {!isEnabled && (
            <div className="text-center py-8">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                Solo Female Mode Disabled
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Enable Solo Female Mode to access enhanced safety features designed for women travelers
              </p>
              <Button onClick={() => handleToggleMode(true)} className="bg-gradient-safety">
                Enable Solo Female Mode
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoloFemaleMode;