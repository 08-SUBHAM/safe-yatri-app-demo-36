import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, Shield, Phone, ArrowRight } from "lucide-react";

const ProfileComplete = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const verificationSteps = [
    { id: 1, label: "Email Verification", icon: CheckCircle, status: "complete" },
    { id: 2, label: "Phone Verification", icon: Phone, status: "complete" },
    { id: 3, label: "KYC Document Verification", icon: User, status: "complete" },
    { id: 4, label: "Security Setup", icon: Shield, status: "complete" },
  ];

  useEffect(() => {
    // Simulate verification progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(timer);
          return 100;
        }
        return prev + 25;
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  const handleContinue = () => {
    navigate('/digital-id');
  };

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-gradient-safety flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-sm bg-white/95 backdrop-blur shadow-elevated">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-safety flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-primary">Profile Setup</CardTitle>
            <p className="text-muted-foreground">Verifying your information for secure travel</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Verification Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-safety h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Verification Steps */}
            <div className="space-y-3">
              {verificationSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
                    progress >= (index + 1) * 25 
                      ? 'bg-success/10 border border-success/20' 
                      : 'bg-muted/50'
                  }`}
                >
                  <step.icon className={`w-5 h-5 ${
                    progress >= (index + 1) * 25 ? 'text-success' : 'text-muted-foreground'
                  }`} />
                  <span className={`flex-1 ${
                    progress >= (index + 1) * 25 ? 'text-success font-medium' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                  {progress >= (index + 1) * 25 && (
                    <Badge variant="outline" className="text-success border-success">
                      Verified
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            {/* Success Message */}
            {isComplete && (
              <div className="text-center space-y-4 animate-fade-in">
                <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-success">Verification Complete!</h3>
                  <p className="text-muted-foreground text-sm">
                    Your profile has been successfully verified. 
                    Ready to generate your Blockchain Digital ID.
                  </p>
                </div>
              </div>
            )}

            {/* Continue Button */}
            <Button 
              onClick={handleContinue}
              disabled={!isComplete}
              className={`w-full font-medium transition-all duration-300 ${
                isComplete 
                  ? 'bg-gradient-safety hover:opacity-90' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {isComplete ? (
                <>
                  Generate Digital ID
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                "Verifying..."
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileComplete;