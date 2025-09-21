import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Users, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Search, 
  QrCode,
  FileText,
  Shield,
  Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PoliceDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for police dashboard
  const touristClusters = [
    { area: "Connaught Place", count: 847, riskLevel: "Medium", lastUpdate: "5 min ago" },
    { area: "India Gate", count: 1205, riskLevel: "Low", lastUpdate: "2 min ago" },
    { area: "Red Fort", count: 623, riskLevel: "High", lastUpdate: "1 min ago" },
    { area: "Chandni Chowk", count: 892, riskLevel: "High", lastUpdate: "3 min ago" },
    { area: "Lotus Temple", count: 456, riskLevel: "Low", lastUpdate: "8 min ago" }
  ];

  const activeSOS = [
    {
      id: "SOS-2024-001",
      tourist: "Priya Sharma", 
      location: "MG Road, Near Metro Station",
      time: "2 minutes ago",
      priority: "High",
      status: "Active",
      digitalId: "SY-BC-2024-001234"
    },
    {
      id: "SOS-2024-002",
      tourist: "John Williams",
      location: "Karol Bagh Market", 
      time: "5 minutes ago",
      priority: "Medium",
      status: "Responding",
      digitalId: "SY-BC-2024-005678"
    },
    {
      id: "SOS-2024-003", 
      tourist: "Sarah Chen",
      location: "Chandni Chowk",
      time: "8 minutes ago", 
      priority: "Low",
      status: "Resolved",
      digitalId: "SY-BC-2024-009876"
    }
  ];

  const autoFIRs = [
    {
      id: "FIR-AUTO-2024-445",
      incident: "Pickpocketing Report",
      tourist: "Mike Johnson",
      location: "Palika Bazaar", 
      time: "45 minutes ago",
      status: "Filed",
      officer: "SI Rajesh Kumar"
    },
    {
      id: "FIR-AUTO-2024-446",
      incident: "Overcharging Complaint", 
      tourist: "Lisa Park",
      location: "Janpath Market",
      time: "1 hour ago",
      status: "Under Review", 
      officer: "ASI Meera Singh"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High": return "destructive";
      case "Medium": return "warning"; 
      case "Low": return "success";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "warning";
      case "Low": return "success"; 
      default: return "secondary";
    }
  };

  const handleSearchDigitalID = () => {
    if (!searchQuery) {
      toast({
        title: "Enter Digital ID",
        description: "Please enter a tourist's digital ID to search",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Digital ID Found", 
      description: `Tourist verification successful for ID: ${searchQuery}`,
    });
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
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Police Control Dashboard</h1>
              <p className="text-sm opacity-90">Tourist Safety Management System</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">4,023</p>
              <p className="text-xs opacity-80">Active Tourists</p>
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs opacity-80">Active SOS</p>
            </div>
            <div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs opacity-80">Auto FIRs</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <Tabs defaultValue="heatmap" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 text-xs">
              <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
              <TabsTrigger value="sos">SOS Alerts</TabsTrigger>
              <TabsTrigger value="digital-id">Digital ID</TabsTrigger>
              <TabsTrigger value="fir">Auto FIR</TabsTrigger>
            </TabsList>

            {/* Tourist Heatmap */}
            <TabsContent value="heatmap" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    Tourist Cluster Heatmap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {touristClusters.map((cluster, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium">{cluster.area}</h3>
                            <Badge variant="outline" className={`text-${getRiskColor(cluster.riskLevel)} border-${getRiskColor(cluster.riskLevel)}`}>
                              {cluster.riskLevel}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground space-x-4">
                            <span className="flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {cluster.count} tourists
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {cluster.lastUpdate}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SOS Alerts */}
            <TabsContent value="sos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
                    Active SOS Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activeSOS.map((sos) => (
                      <Card key={sos.id} className="border-l-4 border-l-destructive">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{sos.tourist}</h3>
                              <p className="text-xs text-muted-foreground">ID: {sos.digitalId}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Badge variant="outline" className={`text-${getPriorityColor(sos.priority)} border-${getPriorityColor(sos.priority)}`}>
                                {sos.priority}
                              </Badge>
                              <Badge variant={sos.status === "Active" ? "destructive" : sos.status === "Responding" ? "default" : "secondary"}>
                                {sos.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-2 text-muted-foreground" />
                              <span>{sos.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-2 text-muted-foreground" />
                              <span>{sos.time}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2 mt-3">
                            <Button size="sm" variant="destructive">
                              <Phone className="w-3 h-3 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <MapPin className="w-3 h-3 mr-1" />
                              Locate
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Digital ID Lookup */}
            <TabsContent value="digital-id" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <QrCode className="w-5 h-5 mr-2 text-primary" />
                    Digital ID Lookup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter Digital ID or scan QR code"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSearchDigitalID}>
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>

                  {searchQuery && (
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                            <Shield className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">Priya Sharma</h3>
                            <p className="text-sm text-muted-foreground">Digital ID: {searchQuery}</p>
                            <div className="flex space-x-2 mt-2">
                              <Badge variant="outline" className="text-success border-success text-xs">
                                Verified
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Indian Citizen
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Emergency Contact:</p>
                            <p className="font-medium">+91 9876543211</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Last Location:</p>
                            <p className="font-medium">Connaught Place</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Auto FIR */}
            <TabsContent value="fir" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-primary" />
                    Auto E-FIR Filing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {autoFIRs.map((fir) => (
                      <Card key={fir.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{fir.incident}</h3>
                              <p className="text-xs text-muted-foreground">FIR: {fir.id}</p>
                            </div>
                            <Badge variant={fir.status === "Filed" ? "default" : "secondary"}>
                              {fir.status}
                            </Badge>
                          </div>

                          <div className="space-y-1 text-sm">
                            <p><strong>Tourist:</strong> {fir.tourist}</p>
                            <p><strong>Location:</strong> {fir.location}</p>
                            <p><strong>Officer:</strong> {fir.officer}</p>
                            <p><strong>Filed:</strong> {fir.time}</p>
                          </div>

                          <Button size="sm" variant="outline" className="mt-3">
                            <FileText className="w-3 h-3 mr-1" />
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;