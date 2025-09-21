import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Activity, AlertTriangle, Wifi } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SmartBandSimulation = () => {
  const { toast } = useToast();
  const [heartRate, setHeartRate] = useState(72);
  const [isConnected, setIsConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(87);
  const [alertTriggered, setAlertTriggered] = useState(false);

  // Simulate heart rate monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate natural heart rate variation
      const newRate = Math.floor(Math.random() * 20) + 65; // 65-85 BPM range
      setHeartRate(newRate);

      // Simulate abnormal heart rate detection
      if (newRate > 100 || newRate < 50) {
        if (!alertTriggered) {
          setAlertTriggered(true);
          toast({
            title: "⚠️ Abnormal Heart Rate Detected",
            description: `Heart rate: ${newRate} BPM. Emergency contacts notified.`,
            variant: "destructive",
          });
        }
      } else {
        setAlertTriggered(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [alertTriggered, toast]);

  // Simulate battery drain
  useEffect(() => {
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => {
        const newLevel = Math.max(0, prev - 1);
        if (newLevel === 20) {
          toast({
            title: "Low Battery Warning",
            description: "Smart band battery at 20%. Please charge soon.",
            variant: "destructive",
          });
        }
        return newLevel;
      });
    }, 10000);

    return () => clearInterval(batteryInterval);
  }, [toast]);

  const getHeartRateColor = (rate: number) => {
    if (rate > 100 || rate < 50) return "destructive";
    if (rate > 90 || rate < 60) return "warning";
    return "success";
  };

  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-primary" />
            SafeYatri Smart Band
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success' : 'bg-destructive'}`}></div>
            <Wifi className={`w-4 h-4 ${isConnected ? 'text-success' : 'text-muted-foreground'}`} />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Heart Rate Monitor */}
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <Heart className={`w-6 h-6 ${alertTriggered ? 'text-destructive animate-pulse' : 'text-success'}`} />
            <div>
              <p className="text-sm text-muted-foreground">Heart Rate</p>
              <p className="text-2xl font-bold">{heartRate}</p>
              <p className="text-xs text-muted-foreground">BPM</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`text-${getHeartRateColor(heartRate)} border-${getHeartRateColor(heartRate)}`}
          >
            {heartRate > 100 || heartRate < 50 ? 'Abnormal' : 
             heartRate > 90 || heartRate < 60 ? 'Elevated' : 'Normal'}
          </Badge>
        </div>

        {/* Location Tracking */}
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium text-sm">Police Bazaar, Shillong</p>
              <p className="text-xs text-muted-foreground">Accurate within 3m</p>
            </div>
          </div>
          <Badge variant="outline" className="text-success border-success">
            Tracking
          </Badge>
        </div>

        {/* Device Status */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">Battery</p>
            <p className="text-lg font-bold">{batteryLevel}%</p>
            <div className="w-full bg-muted rounded-full h-1.5 mt-1">
              <div 
                className={`h-1.5 rounded-full transition-all ${
                  batteryLevel > 50 ? 'bg-success' : 
                  batteryLevel > 20 ? 'bg-warning' : 'bg-destructive'
                }`}
                style={{ width: `${batteryLevel}%` }}
              />
            </div>
          </div>

          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">Connection</p>
            <p className="text-lg font-bold">{isConnected ? 'Connected' : 'Offline'}</p>
            <p className={`text-xs ${isConnected ? 'text-success' : 'text-destructive'}`}>
              {isConnected ? '4G LTE' : 'No Signal'}
            </p>
          </div>
        </div>

        {/* Alert Status */}
        {alertTriggered && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg animate-pulse">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <p className="text-sm font-medium text-destructive">Health Alert Active</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Emergency contacts and nearby medical facilities have been notified
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              toast({
                title: "Emergency SOS Triggered",
                description: "Alert sent via Smart Band to emergency contacts",
                variant: "destructive",
              });
            }}
          >
            Emergency SOS
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              setIsConnected(!isConnected);
              toast({
                title: isConnected ? "Device Disconnected" : "Device Connected",
                description: isConnected ? "Smart band is offline" : "Smart band connected successfully",
              });
            }}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartBandSimulation;