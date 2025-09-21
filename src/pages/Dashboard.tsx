import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  Route,
  Newspaper,
  MessageCircle,
  Calculator,
  User,
  Menu,
  Bell,
  Settings,
  Mic,
  Globe,
  FileText,
  Headphones,
  WifiOff,
  DownloadCloud,
  CheckCircle2
} from "lucide-react";
import logoImage from "@/assets/safeyatri_logo.jpg";
import { useAppContext } from "@/App";
import { useToast } from "@/hooks/use-toast";
import { ProfileSection } from "@/components/ProfileSection";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { safetyScore, currentLocation } = useAppContext();
  const [showAlert, setShowAlert] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Safety score color logic
  const getSafetyScoreColor = (score: number) => {
    if (score >= 75) return "safety-high";
    if (score >= 50) return "safety-medium";
    return "safety-low";
  };

  const getSafetyScoreLabel = (score: number) => {
    if (score >= 75) return "SAFE";
    if (score >= 50) return "MODERATE";
    return "HIGH RISK";
  };

  // Simulate geo-fencing alert
  useEffect(() => {
    const alertTimer = setTimeout(() => {
      setShowAlert(true);
      toast({
        title: "⚠️ Geo-fence Alert",
        description: "You are entering a high-risk zone. Would you like to reroute?",
        variant: "destructive",
      });
    }, 5000);

    return () => clearTimeout(alertTimer);
  }, [toast]);

  useEffect(() => {
    if (!isListening) return;
    
    // @ts-ignore - Web Speech API types
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        title: "Voice commands not supported",
        description: "Your browser doesn't support the Web Speech API",
        variant: "destructive",
      });
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      
      setTranscript(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      toast({
        title: "Voice command error",
        description: "Could not process voice command",
        variant: "destructive",
      });
      setIsListening(false);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [isListening, toast]);

  const mainFeatures = [
    {
      title: "Safe Route Generator",
      description: "AI-powered safe paths",
      icon: Route,
      path: "/safe-route",
      color: "bg-gradient-to-br from-primary to-primary-variant",
      badge: "Smart"
    },
    {
      title: "Local Risk News",
      description: "Real-time safety alerts",
      icon: Newspaper,
      path: "/risk-news",
      color: "bg-gradient-to-br from-warning to-warning/80",
      badge: "Live"
    },
    {
      title: "Smart Price Assistant",
      description: "Fair price suggestions",
      icon: Calculator,
      path: "/negotiation",
      color: "bg-gradient-to-br from-success to-success/80",
      badge: "AI"
    },
    {
      title: "Voice Assistant",
      description: "Voice commands & help",
      icon: Mic,
      action: () => setIsListening(!isListening),
      color: "bg-gradient-to-br from-purple-500 to-indigo-600",
      badge: "New"
    },
  ];

  const additionalFeatures = [
    {
      title: "Solo Female Mode", 
      description: "Enhanced safety features for women travelers",
      icon: Shield, 
      path: "/solo-female",
      color: "text-pink-500"
    },
    {
      title: "Report Misconduct", 
      description: "Quick vendor & service reporting",
      icon: FileText, 
      action: () => setShowReportModal(true),
      color: "text-orange-500"
    },
    {
      title: isOfflineMode ? "Offline Mode Active" : "Offline Mode", 
      description: isOfflineMode ? "Working offline" : "Works without internet",
      icon: isOfflineMode ? WifiOff : Globe,
      action: () => {
        const newMode = !isOfflineMode;
        setIsOfflineMode(newMode);
        toast({
          title: newMode ? "🔄 Offline Mode Enabled" : "🌐 Online Mode",
          description: newMode 
            ? "Essential features are now available offline" 
            : "You're back online with full functionality",
        });
      },
      color: isOfflineMode ? "text-blue-600" : "text-blue-500",
      badge: isOfflineMode ? "Active" : undefined
    },
    {
      title: "Voice Assistant", 
      description: "Hands-free navigation & help",
      icon: Mic, 
      action: () => setIsListening(!isListening),
      color: "text-purple-500"
    }
  ];

  const quickActions = [
    { 
      title: "Solo Female Mode", 
      path: "/solo-female", 
      icon: Shield,
      action: () => navigate('/solo-female')
    },
    { 
      title: "Police Dashboard", 
      path: "/police", 
      icon: User,
      action: () => navigate('/police')
    },
    { 
      title: "My Profile", 
      icon: User,
      action: () => setShowProfile(true)
    },
  ];

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-travel text-white p-4 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/20 -translate-x-16 -translate-y-16"></div>
            <div className="absolute top-8 right-0 w-20 h-20 rounded-full bg-white/10 translate-x-10"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10"
                onClick={() => setShowProfile(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
              
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <img src={logoImage} alt="SafeYatri" className="h-8 w-auto" />
              </div>
              
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* User Profile & Safety Score */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="border-2 border-white/20">
                <AvatarFallback className="bg-white/20 text-white">PS</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Priya Sharma</p>
                <div className="flex items-center text-sm opacity-90">
                  <MapPin className="w-3 h-3 mr-1" />
                  {currentLocation}
                </div>
              </div>
            </div>

            {/* Safety Score */}
            <div className="text-center relative">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getSafetyScoreColor(safetyScore)} shadow-lg`}>
                <Shield className="w-4 h-4 mr-2" />
                {getSafetyScoreLabel(safetyScore)}
              </div>
              <p className="text-xs opacity-90 mt-1 font-medium">Safety Score: {safetyScore}/100</p>
              <div className="w-16 h-1 bg-white/20 rounded-full mx-auto mt-1">
                <div 
                  className="h-full bg-white/60 rounded-full transition-all duration-500" 
                  style={{ width: `${safetyScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Geo-fencing Alert */}
        {showAlert && (
          <div className="mx-4 mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg animate-bounce-in">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <div className="flex-1">
                <p className="text-sm font-medium text-destructive">High-Risk Zone Alert</p>
                <p className="text-xs text-muted-foreground">You are entering a high-risk area</p>
              </div>
              <div className="space-x-2">
                <Button size="sm" variant="outline" onClick={() => navigate('/safe-route')}>
                  Reroute
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowAlert(false)}>
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 space-y-6">
          {/* Main Features Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Core Features</h2>
              <Badge variant="outline" className="text-xs">All Offline Ready</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mainFeatures.map((feature) => (
                <Card 
                  key={feature.title}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-elevated border-0 overflow-hidden ${isListening && feature.title === 'Voice Assistant' ? 'ring-2 ring-purple-500' : ''}`}
                  onClick={feature.action || (() => navigate(feature.path))}
                >
                  <CardContent className="p-4 text-center relative">
                    <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl ${feature.color} flex items-center justify-center shadow-lg relative overflow-hidden`}>
                      <feature.icon className="w-7 h-7 text-white relative z-10" />
                      <div className="absolute inset-0 bg-white/20 rounded-full w-6 h-6 top-1 right-1"></div>
                    </div>
                    
                    <div className="relative">
                      {feature.badge && (
                        <Badge className="absolute -top-8 -right-2 text-xs px-2 py-0 bg-background text-foreground">
                          {feature.badge}
                        </Badge>
                      )}
                      <h3 className="font-semibold text-sm mb-1 text-foreground">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Emergency SOS Button */}
          <div className="text-center py-4">
            <div className="relative inline-block">
              <Button 
                className="sos-button w-36 h-36 rounded-full text-lg font-bold shadow-sos hover:shadow-sos-hover transition-all duration-300 hover:scale-105 relative overflow-hidden"
                onClick={() => {
                  toast({
                    title: "🆘 SOS ACTIVATED",
                    description: "Alert sent to nearest police station & emergency contacts with live location.",
                    variant: "destructive",
                  });
                }}
              >
                <div className="text-center relative z-10">
                  <AlertTriangle className="w-10 h-10 mx-auto mb-1 animate-pulse" />
                  <div className="text-base leading-tight">PANIC<br />SOS</div>
                </div>
                <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
              </Button>
              
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-50"></div>
              <div className="absolute inset-2 rounded-full border border-red-300 animate-ping opacity-30 animation-delay-500"></div>
            </div>
            <p className="text-sm font-medium text-muted-foreground mt-3">Emergency Assistance</p>
            <p className="text-xs text-muted-foreground">Instantly alerts police & emergency contacts</p>
          </div>

          {/* Additional Features */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Smart Features</h2>
              <Badge variant="secondary" className="text-xs">New</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {additionalFeatures.map((feature) => (
                <Card 
                  key={feature.title}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md group ${isListening && feature.title === 'Voice Assistant' ? 'ring-2 ring-purple-500' : ''}`}
                  onClick={feature.action || (() => navigate(feature.path))}
                >
                  <CardContent className="p-4 text-center">
                    <div className="relative mb-2">
                      <div className={`p-2 rounded-full ${isOfflineMode && feature.title.includes('Offline') ? 'bg-blue-100' : ''}`}>
                        <feature.icon 
                          className={`w-6 h-6 mx-auto ${feature.color} group-hover:scale-110 transition-transform`} 
                        />
                      </div>
                      {isOfflineMode && feature.title.includes('Offline') && (
                        <div className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full p-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-xs mb-1 text-foreground">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Report Misconduct Modal */}
          {showReportModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-background rounded-2xl p-6 w-full max-w-md mx-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Report Misconduct</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        setShowReportModal(false);
                        setReportType('');
                        setReportDetails('');
                      }}
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">What type of issue would you like to report?</p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {['Overcharging', 'Harassment', 'Unsafe Vehicle', 'Fraud', 'Other'].map((type) => (
                        <Button
                          key={type}
                          variant={reportType === type ? 'default' : 'outline'}
                          className="h-auto py-2 whitespace-normal"
                          onClick={() => setReportType(type)}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Details (optional)</label>
                      <textarea
                        className="w-full p-3 border rounded-lg text-sm min-h-[100px]"
                        placeholder="Please provide more details about the incident..."
                        value={reportDetails}
                        onChange={(e) => setReportDetails(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setShowReportModal(false);
                          setReportType('');
                          setReportDetails('');
                        }}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={async () => {
                          if (!reportType) {
                            toast({
                              title: "Please select an issue type",
                              variant: "destructive",
                            });
                            return;
                          }
                          
                          setIsSubmitting(true);
                          // Simulate API call
                          await new Promise(resolve => setTimeout(resolve, 1000));
                          
                          toast({
                            title: "✅ Report Submitted",
                            description: `Your report about ${reportType} has been received. We'll review it shortly.`,
                          });
                          
                          setShowReportModal(false);
                          setReportType('');
                          setReportDetails('');
                          setIsSubmitting(false);
                        }}
                        disabled={isSubmitting}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Report'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Access Panels */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Quick Access</h2>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Card 
                  key={action.title}
                  className="cursor-pointer transition-all hover:bg-muted/50 border-l-4 border-l-primary" 
                  onClick={action.action}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <action.icon className={`w-5 h-5 mr-3 ${
                        action.title.includes('Solo Female') ? 'text-pink-500' : 
                        action.title.includes('Police') ? 'text-amber-500' : 'text-primary'
                      }`} />
                      <div>
                        <span className="font-medium text-sm">{action.title}</span>
                        <p className="text-xs text-muted-foreground">
                          {action.title.includes('Solo Female') ? 'Enhanced safety & verified guides' :
                           action.title.includes('Police') ? 'Tourist assistance & monitoring' :
                           'View and manage your profile'}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={action.title.includes('Profile') ? 'secondary' : 'default'}
                      className={`text-xs ${
                        action.title.includes('Solo Female') ? 'bg-pink-100 text-pink-700' : ''
                      }`}
                    >
                      {action.title.includes('Solo Female') ? 'Active' : 
                       action.title.includes('Profile') ? 'View' : 'New'}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-success mr-2" />
                    <span>Safety check completed</span>
                  </div>
                  <span className="text-muted-foreground">2 min ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Route className="w-4 h-4 text-primary mr-2" />
                    <span>Safe route calculated</span>
                  </div>
                  <span className="text-muted-foreground">5 min ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-warning mr-2" />
                    <span>Risk alert: MG Road area</span>
                  </div>
                  <span className="text-muted-foreground">15 min ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Profile Section */}
      {showProfile && (
        <ProfileSection 
          user={{
            name: "Priya Sharma",
            email: "priya.sharma@example.com",
            phone: "+91 98765 43210",
            joinedDate: "2024-01-15",
            tripsCompleted: 24,
            safetyScore: safetyScore
          }}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;