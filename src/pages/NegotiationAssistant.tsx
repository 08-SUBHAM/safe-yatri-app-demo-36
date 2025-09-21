import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, Search, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NegotiationAssistant = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchItem, setSearchItem] = useState("");
  const [scanResults, setScanResults] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Mock price data
  const mockPriceData = {
    "handicrafts": {
      item: "Handmade Wooden Elephant",
      quotedPrice: 850,
      fairPrice: { min: 250, max: 350 },
      averagePrice: 300,
      markup: 183,
      category: "Handicrafts",
      tips: [
        "Start negotiating at ₹200",
        "Mention you saw similar items elsewhere for less",
        "Be prepared to walk away",
        "Ask for bundle discount if buying multiple items"
      ]
    },
    "textiles": {
      item: "Silk Scarf Set",
      quotedPrice: 1200,
      fairPrice: { min: 400, max: 600 },
      averagePrice: 500,
      markup: 140,
      category: "Textiles",
      tips: [
        "Check fabric quality before negotiating",
        "Compare with nearby shops",
        "Negotiate for ₹450-500 range",
        "Ask about authenticity certificate"
      ]
    },
    "jewelry": {
      item: "Silver Bracelet",
      quotedPrice: 2500,
      fairPrice: { min: 800, max: 1200 },
      averagePrice: 1000,
      markup: 150,
      category: "Jewelry",
      tips: [
        "Ask for silver purity certificate",
        "Check for hallmark stamps",
        "Fair price range: ₹800-1200",
        "Negotiate based on weight and design"
      ]
    }
  };

  const handleScanPrice = () => {
    if (!searchItem) {
      toast({
        title: "Enter Item Name",
        description: "Please enter an item name to get price suggestions",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);

    // Simulate scanning/AI analysis
    setTimeout(() => {
      // Match the search with mock data
      const searchKey = Object.keys(mockPriceData).find(key => 
        searchItem.toLowerCase().includes(key) || 
        mockPriceData[key].item.toLowerCase().includes(searchItem.toLowerCase())
      );

      if (searchKey) {
        setScanResults(mockPriceData[searchKey]);
        toast({
          title: "Price Analysis Complete",
          description: "AI has analyzed current market prices for this item",
        });
      } else {
        // Generic result for other items
        setScanResults({
          item: searchItem,
          quotedPrice: 600,
          fairPrice: { min: 200, max: 300 },
          averagePrice: 250,
          markup: 140,
          category: "General Items",
          tips: [
            "Start with 40-50% of quoted price",
            "Be polite but firm in negotiations",
            "Compare prices at multiple shops",
            "Walk away if they won't negotiate"
          ]
        });
      }
      
      setIsScanning(false);
    }, 2000);
  };

  const getMarkupColor = (markup: number) => {
    if (markup > 200) return "destructive";
    if (markup > 100) return "warning";
    return "success";
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
            <h1 className="text-xl font-semibold">Smart Negotiation Assistant</h1>
          </div>

          <p className="text-sm opacity-90">
            AI-powered fair price suggestions to avoid tourist markups
          </p>
        </div>

        <div className="p-4 space-y-6">
          {/* Search/Scan Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Price Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter item name (e.g., wooden handicrafts, silk scarf)"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      toast({
                        title: "Camera Feature",
                        description: "Scan item with camera (Demo: Use text search instead)",
                      });
                    }}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                <Button 
                  onClick={handleScanPrice}
                  disabled={isScanning || !searchItem}
                  className="w-full bg-gradient-safety hover:opacity-90"
                >
                  {isScanning ? (
                    <>
                      <Search className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Prices...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Get Fair Price Suggestion
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Price Analysis Results */}
          {scanResults && (
            <div className="space-y-4 animate-fade-in">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold">{scanResults.item}</h3>
                    <Badge variant="outline" className="mt-1">
                      {scanResults.category}
                    </Badge>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-destructive/10 rounded-lg">
                      <span className="text-sm">Quoted Price:</span>
                      <span className="font-bold text-destructive">₹{scanResults.quotedPrice}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
                      <span className="text-sm">Fair Price Range:</span>
                      <span className="font-bold text-success">
                        ₹{scanResults.fairPrice.min} - ₹{scanResults.fairPrice.max}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Average Market Price:</span>
                      <span className="font-bold">₹{scanResults.averagePrice}</span>
                    </div>
                  </div>

                  {/* Markup Warning */}
                  <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="text-sm font-medium text-warning">
                        Tourist Markup: {scanResults.markup}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      This price is significantly above market rate
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Negotiation Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-success" />
                    Negotiation Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {scanResults.tips.map((tip: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-white font-bold">{index + 1}</span>
                        </div>
                        <p className="text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Action */}
              <Card className="bg-success/5 border-success/20">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="font-semibold text-success mb-1">Recommended Starting Offer</p>
                  <p className="text-2xl font-bold text-success">₹{scanResults.fairPrice.min}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    You can save up to ₹{scanResults.quotedPrice - scanResults.fairPrice.max} with good negotiation
                  </p>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Price Saved",
                      description: "Fair price information saved to your profile",
                    });
                  }}
                >
                  Save Price Info
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setScanResults(null);
                    setSearchItem("");
                  }}
                >
                  Scan Another Item
                </Button>
              </div>
            </div>
          )}

          {/* Popular Categories */}
          {!scanResults && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Popular Tourist Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(mockPriceData).map(([key, data]) => (
                    <Button
                      key={key}
                      variant="outline"
                      className="h-auto p-3 text-left"
                      onClick={() => setSearchItem(data.item)}
                    >
                      <div>
                        <p className="font-medium text-sm">{data.category}</p>
                        <p className="text-xs text-muted-foreground">
                          Avg. ₹{data.averagePrice}
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default NegotiationAssistant;