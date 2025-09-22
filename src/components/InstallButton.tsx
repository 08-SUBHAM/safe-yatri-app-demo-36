import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Smartphone, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const InstallButton = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if user is on iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOS);
    
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(isStandalone);

    // Handle the appinstalled event
    const handleAppInstalled = () => {
      setIsStandalone(true);
    };

    window.addEventListener('appinstalled', handleAppInstalled);
    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    setShowInstructions(true);
  };

  const handleNativeInstall = () => {
    const deferredPrompt = (window as any).deferredPrompt;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        (window as any).deferredPrompt = null;
      });
    }
    setShowInstructions(false);
  };

  // Don't show the install button if the app is already installed
  if (isStandalone) return null;

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleInstallClick}
        className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 border-blue-200"
      >
        <Download className="w-4 h-4" />
        Install App
      </Button>

      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className="sm:max-w-[425px] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Install SafeYatri</DialogTitle>
            <DialogDescription>
              Follow these steps to install the app on your device
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            {isIOS ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                      <path d="m13 7 5 5"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Tap the Share button</h4>
                    <p className="text-sm text-muted-foreground">In Safari, tap the share icon at the bottom of the screen</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                      <polyline points="16 6 12 2 8 6"/>
                      <line x1="12" x2="12" y1="2" y2="15"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Add to Home Screen</h4>
                    <p className="text-sm text-muted-foreground">Scroll down and select "Add to Home Screen"</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/>
                      <path d="M12 5v14"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Install the App</h4>
                    <p className="text-sm text-muted-foreground">Click the button below to install SafeYatri on your device</p>
                  </div>
                </div>
                <Button 
                  onClick={handleNativeInstall}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Install SafeYatri
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InstallButton;
