import { useState, useEffect, useRef } from "react";
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
  Menu,
  Mic,
  Globe,
  FileText,
  Headphones,
  WifiOff,
  DownloadCloud,
  CheckCircle2
} from "lucide-react";
import logoImage from "@/assets/safeyatri_logo-removebg-preview.png";
import { useAppContext } from "@/App";
import { useToast } from "@/hooks/use-toast";
import { ProfileSection } from "@/components/ProfileSection";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { safetyScore, currentLocation, selectedLanguage, setSelectedLanguage, user } = useAppContext();
  const [showAlert, setShowAlert] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [attachments, setAttachments] = useState<{ file: File; url: string; kind: 'image' | 'video' }[]>([]);
  const [showSosConfirm, setShowSosConfirm] = useState(false);
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newItems: { file: File; url: string; kind: 'image' | 'video' }[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const kind: 'image' | 'video' = file.type.startsWith('video') ? 'video' : 'image';
      newItems.push({ file, url, kind });
    });
    setAttachments((prev) => [...prev, ...newItems]);
  };

  const removeAttachment = (idx: number) => {
    setAttachments((prev) => {
      const copy = [...prev];
      const item = copy[idx];
      if (item) URL.revokeObjectURL(item.url);
      copy.splice(idx, 1);
      return copy;
    });
  };

  const displayName = user?.name || 'Traveler';
  const initials = (displayName).split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();

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

  // Unified feature item type for dashboard feature cards
  type FeatureItem = {
    title: string;
    description: string;
    icon: any;
    color: string;
    path?: string;
    action?: () => void;
    badge?: string;
  };

  const mainFeatures = [
    {
      title: "Trip Planner",
      description: "Plan trips, dates & budget",
      icon: FileText,
      path: "/trip-planner",
      color: "bg-gradient-to-br from-blue-600 to-indigo-600",
      badge: "New"
    },
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

  // Core feature items to merge with smart features for a single section
  const additionalFeatures: FeatureItem[] = [
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
      title: "AI Chatbot", 
      description: "Ask travel & safety questions",
      icon: MessageCircle,
      path: "/chatbot",
      color: "text-blue-600"
    }
  ];

  const coreFeatureItems: FeatureItem[] = [
    {
      title: 'Safe Route Generator',
      description: 'Get the safest route to your destination',
      icon: Route,
      path: '/safe-route',
      color: 'text-primary'
    },
    {
      title: 'Local Risk News',
      description: 'Stay updated with local risk news and alerts',
      icon: Newspaper,
      path: '/risk-news',
      color: 'text-orange-500'
    },
    {
      title: 'Smart Price Assistant',
      description: 'Get the best prices for your travel needs',
      icon: Calculator,
      path: '/negotiation',
      color: 'text-green-500'
    },
  ];

  const combinedFeatures: FeatureItem[] = [...coreFeatureItems, ...additionalFeatures];

  

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 relative overflow-hidden">
          
          <div className="relative z-10">
            <div className="flex justify-between items-center h-12 md:h-14 mb-4">
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
                <img src={logoImage} alt="SafeYatri" className="h-full w-auto" />
              </div>
              
              <div className="flex space-x-2 items-center">
                {/* Language button to signal multilingual support */}
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="text-blue-700 bg-white hover:bg-white/90 h-8 px-2 font-semibold"
                  onClick={() => setShowLanguagePicker(true)}
                >
                  <Globe className="w-4 h-4 mr-1" /> {selectedLanguage}
                </Button>
              </div>
            </div>
          </div>

          {/* User Profile & Safety Score */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="border-2 border-white/20">
                <AvatarFallback className="bg-white/20 text-white">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{displayName}</p>
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

        {/* SOS Confirmation Modal */}
        {showSosConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl p-6 w-full max-w-sm mx-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Confirm SOS</h3>
                <p className="text-sm text-muted-foreground">Is this a real emergency? SOS will immediately alert the nearest police and your emergency contacts with your live location.</p>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setShowSosConfirm(false)}>Not Now</Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      setShowSosConfirm(false);
                      toast({
                        title: "🆘 SOS ACTIVATED",
                        description: "Alert sent to nearest police station & emergency contacts with live location.",
                        variant: "destructive",
                      });
                    }}
                  >
                    Yes, Proceed
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                      attachments.forEach(a => URL.revokeObjectURL(a.url));
                      setAttachments([]);
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

                  {/* Attachments */}
                  <div className="space-y-2 mt-3">
                    <label className="text-sm font-medium">Attachments (images/videos)</label>
                    <div className="flex flex-wrap gap-2">
                      <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        multiple
                        onChange={(e) => handleFilesSelected(e.target.files)}
                        className="hidden"
                      />
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        capture
                        multiple
                        onChange={(e) => handleFilesSelected(e.target.files)}
                        className="hidden"
                      />
                      <Button type="button" variant="outline" size="sm" onClick={() => photoInputRef.current?.click()}>
                        📷 Take Photo
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => videoInputRef.current?.click()}>
                        🎥 Record Video
                      </Button>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={(e) => handleFilesSelected(e.target.files)}
                        className="block w-full text-xs text-muted-foreground file:mr-3 file:py-2 file:px-3 file:rounded-md file:border file:border-input file:bg-background file:text-foreground hover:file:bg-muted"
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground">Note: Camera capture depends on device/browser support.</p>
                    {attachments.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {attachments.map((att, idx) => (
                          <div key={idx} className="relative group border rounded-md overflow-hidden">
                            {att.kind === 'image' ? (
                              <img src={att.url} alt={`attachment-${idx}`} className="w-full h-20 object-cover" />
                            ) : (
                              <video src={att.url} className="w-full h-20 object-cover" />
                            )}
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100"
                              onClick={() => removeAttachment(idx)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowReportModal(false);
                        setReportType('');
                        setReportDetails('');
                        attachments.forEach(a => URL.revokeObjectURL(a.url));
                        setAttachments([]);
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
                          description: `Your report about ${reportType} has been received with ${attachments.length} attachment(s). We'll review it shortly.`,
                        });
                        
                        setShowReportModal(false);
                        setReportType('');
                        setReportDetails('');
                        attachments.forEach(a => URL.revokeObjectURL(a.url));
                        setAttachments([]);
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

        {/* Language Picker Modal */}
        {showLanguagePicker && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl p-6 w-full max-w-sm mx-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Choose Language</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowLanguagePicker(false)}>✕</Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { code: 'EN', label: 'English' },
                  { code: 'HI', label: 'हिन्दी' },
                  { code: 'BN', label: 'বাংলা' },
                  { code: 'TE', label: 'తెలుగు' },
                  { code: 'TA', label: 'தமிழ்' },
                  { code: 'MR', label: 'मराठी' },
                ].map(lang => (
                  <Button
                    key={lang.code}
                    variant={selectedLanguage === lang.code ? 'default' : 'outline'}
                    className="justify-start"
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setShowLanguagePicker(false);
                      toast({ title: 'Language updated', description: `${lang.label} (${lang.code}) selected.` });
                    }}
                  >
                    {lang.label} ({lang.code})
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">Note: This prototype demonstrates multilingual support. Content remains in your current language.</p>
            </div>
          </div>
        )}

        <div className="p-4 space-y-6">
          {/* Trip Planner Hero */}
          <Card 
            className="border-0 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
            onClick={() => navigate('/trip-planner')}
          >
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wide opacity-90 mb-1">Plan your journey</div>
                <h2 className="text-2xl font-bold">Trip Planner</h2>
                <p className="text-sm opacity-90 mt-1">Create itineraries, set dates and manage travelers</p>
                <Button className="mt-3 bg-white text-blue-700 hover:bg-white/90" size="sm">
                  Open Planner →
                </Button>
              </div>
              <div className="hidden xs:block text-5xl">🧭</div>
            </CardContent>
          </Card>

          {/* Emergency SOS Button */}
          <div className="text-center py-4">
            <div className="relative inline-block">
              <Button 
                className="sos-button w-36 h-36 rounded-full text-lg font-bold shadow-sos hover:shadow-sos-hover transition-all duration-300 hover:scale-105 relative overflow-hidden"
                onClick={() => setShowSosConfirm(true)}
              >
                <div className="text-center relative z-10">
                  <AlertTriangle className="w-10 h-10 mx-auto mb-1 animate-pulse" />
                  <div className="text-base leading-tight">PANIC<br />SOS</div>
                </div>
                <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
              </Button>
              
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-50 pointer-events-none"></div>
              <div className="absolute inset-2 rounded-full border border-red-300 animate-ping opacity-30 animation-delay-500 pointer-events-none"></div>
            </div>
            <p className="text-sm font-medium text-muted-foreground mt-3">Emergency Assistance</p>
            <p className="text-xs text-muted-foreground">Instantly alerts police & emergency contacts</p>
          </div>

          {/* Features (Smart + Core merged) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Features</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {combinedFeatures.map((feature, idx) => (
                <Card 
                  key={feature.title}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md group ${(combinedFeatures.length % 2 === 1 && idx === combinedFeatures.length - 1) ? 'col-span-2' : ''} ${
                    feature.title === 'Voice Assistant' 
                      ? 'relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-600 text-white'
                      : ''
                  } ${isListening && feature.title === 'Voice Assistant' ? 'ring-2 ring-purple-500' : ''}`}
                  onClick={feature.action || (() => navigate(feature.path))}
                >
                  <CardContent className="p-4 text-center relative">
                    {/* Voice Assistant special styling */}
                    {feature.title === 'Voice Assistant' ? (
                      <>
                        {/* Pulsing aura when listening */}
                        {isListening && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 rounded-xl animate-ping bg-white/10"></div>
                          </div>
                        )}
                        <div className="relative mb-2">
                          <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                            <feature.icon className="w-8 h-8 text-white" />
                          </div>
                          {isListening && (
                            <span className="absolute -top-2 -right-2 text-[10px] px-2 py-0.5 rounded-full bg-white/90 text-purple-700 font-semibold shadow">Listening…</span>
                          )}
                        </div>
                        <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                        <p className="text-xs opacity-90 leading-relaxed">Tap to talk to your assistant</p>
                      </>
                    ) : (
                      <>
                        <div className="relative mb-2">
                          <div className={`p-2 rounded-full ${isOfflineMode && feature.title.includes('Offline') ? 'bg-blue-100' : ''}`}>
                            <feature.icon 
                              className={`w-6 h-6 mx-auto ${feature.color} group-hover:scale-110 transition-transform`} 
                            />
                          </div>
                          {/* Mic badge to hint voice support on AI Chatbot */}
                          {feature.title === 'AI Chatbot' && (
                            <div className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full px-1.5 py-0.5 flex items-center gap-1">
                              <Mic className="w-3 h-3" />
                              <span className="text-[10px] leading-none">Voice</span>
                            </div>
                          )}
                          {isOfflineMode && feature.title.includes('Offline') && (
                            <div className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full p-0.5">
                              <CheckCircle2 className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-medium text-xs mb-1 text-foreground">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {feature.title === 'AI Chatbot' ? 'Text + Voice assistant' : feature.description}
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>


          
        </div>
      </div>
      
      {/* Profile Section */}
      {showProfile && (
        <ProfileSection 
          user={{
            name: user?.name || displayName,
            email: user?.email || "",
            phone: user?.phone || "",
            joinedDate: user?.joinedDate || "2024-01-15",
            tripsCompleted: 0,
            safetyScore: safetyScore
          }}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;