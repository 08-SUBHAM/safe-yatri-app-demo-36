import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download, Share2, ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/App";

const DigitalID = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(true);
  const [showQR, setShowQR] = useState(false);

  // Mock Digital ID Data
  const digitalIdData = {
    id: "SY-BC-2024-001234",
    name: "Priya Sharma",
    nationality: "Indian",
    verified: true,
    issueDate: new Date().toLocaleDateString(),
    blockchainHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
  };

  useEffect(() => {
    // Simulate blockchain generation
    const timer = setTimeout(() => {
      setIsGenerating(false);
      setShowQR(true);
      
      // Update user context
      setUser(prev => ({
        ...prev,
        digitalId: digitalIdData,
        hasDigitalID: true,
      }));

      toast({
        title: "Digital ID Generated!",
        description: "Your blockchain-secured digital ID is ready.",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [setUser, toast]);

  const handleContinue = () => {
    toast({
      title: "Welcome to SafeYatri!",
      description: "Your account setup is complete. Let's keep you safe!",
    });
    navigate('/dashboard');
  };

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-gradient-safety flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-sm bg-white/95 backdrop-blur shadow-elevated">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-safety flex items-center justify-center">
              {isGenerating ? (
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              ) : (
                <QrCode className="w-8 h-8 text-white" />
              )}
            </div>
            <CardTitle className="text-2xl text-primary">
              {isGenerating ? "Generating Digital ID" : "Blockchain Digital ID"}
            </CardTitle>
            <p className="text-muted-foreground">
              {isGenerating 
                ? "Creating your secure blockchain-verified identity..." 
                : "Your tamper-proof digital identity is ready"
              }
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {isGenerating ? (
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Generating blockchain hash...</p>
                  <p className="text-xs text-muted-foreground">This may take a few moments</p>
                </div>
              </div>
            ) : (
              <>
                {/* QR Code Display */}
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto bg-white border-2 border-muted rounded-lg p-4 shadow-inner flex items-center justify-center">
                    <div className="w-full h-full bg-gray-900 rounded grid grid-cols-8 gap-1 p-2">
                      {/* Mock QR Code Pattern */}
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square rounded-sm ${
                            Math.random() > 0.5 ? 'bg-white' : 'bg-gray-900'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Scan this QR code for instant verification
                  </p>
                </div>

                {/* Digital ID Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ID Number:</span>
                    <span className="text-sm font-mono">{digitalIdData.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Name:</span>
                    <span className="text-sm font-medium">{digitalIdData.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge variant="outline" className="text-success border-success">
                      Blockchain Verified
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Issue Date:</span>
                    <span className="text-sm">{digitalIdData.issueDate}</span>
                  </div>
                </div>

                {/* Blockchain Hash */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Blockchain Hash:</p>
                  <p className="text-xs font-mono break-all">{digitalIdData.blockchainHash}</p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Download className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Share2 className="w-3 h-3 mr-1" />
                    Share
                  </Button>
                </div>
              </>
            )}

            {/* Continue Button */}
            {!isGenerating && (
              <Button 
                onClick={handleContinue}
                className="w-full bg-gradient-safety hover:opacity-90 font-medium"
              >
                Continue to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DigitalID;