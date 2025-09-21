import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, Clock, MapPin, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RiskNews = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  
  // Mock news data
  const mockNews = [
    {
      id: 1,
      type: "crime",
      severity: "high",
      title: "Pickpocketing Alert - MG Road Area",
      description: "Multiple incidents of pickpocketing reported near MG Road area. Tourists advised to be extra cautious.",
      location: "MG Road, Guwahati",
      timestamp: "15 minutes ago",
      source: "Assam Police",
      verified: true
    },
    {
      id: 2,
      type: "weather",
      severity: "medium", 
      title: "Heavy Rain Alert",
      description: "Meteorological department warns of heavy rainfall in the next 2 hours. Flooding possible in low-lying areas.",
      location: "Shillong, Meghalaya",
      timestamp: "30 minutes ago",
      source: "IMD Weather",
      verified: true
    },
    {
      id: 3,
      type: "traffic",
      severity: "low",
      title: "Road Closure - Ward Lake Area",
      description: "Ward Lake area temporarily closed for maintenance work. Use alternate routes via Police Bazaar.",
      location: "Ward Lake, Shillong",
      timestamp: "45 minutes ago", 
      source: "Traffic Police",
      verified: true
    },
    {
      id: 4,
      type: "crime",
      severity: "high",
      title: "Tourist Scam Alert - Kamakhya Temple",
      description: "Fake tour guides targeting tourists near Kamakhya Temple. Always verify credentials before hiring guides.",
      location: "Kamakhya Temple, Guwahati",
      timestamp: "1 hour ago",
      source: "Tourism Authority",
      verified: true
    },
    {
      id: 5,
      type: "safety", 
      severity: "medium",
      title: "Cultural Festival - Police Bazaar",
      description: "Traditional cultural festival at Police Bazaar from 3-5 PM. Expect crowd and traffic delays.",
      location: "Police Bazaar, Shillong",
      timestamp: "2 hours ago",
      source: "Meghalaya Police",
      verified: true
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "warning"; 
      case "low": return "success";
      default: return "secondary";
    }
  };

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case "crime": return "🚨";
      case "weather": return "🌧️";
      case "traffic": return "🚧"; 
      case "safety": return "⚠️";
      default: return "📢";
    }
  };

  const filteredNews = filter === "all" 
    ? mockNews 
    : mockNews.filter(news => news.type === filter);

  useEffect(() => {
    toast({
      title: "Real-time Updates Active",
      description: "Receiving live safety alerts for your area",
    });
  }, [toast]);

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
            <h1 className="text-xl font-semibold">Local Risk News</h1>
          </div>

          <p className="text-sm opacity-90">
            Real-time safety alerts and risk updates for your area
          </p>
        </div>

        <div className="p-4 space-y-4">
          {/* Filter Options */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {[
              { id: "all", label: "All", count: mockNews.length },
              { id: "crime", label: "Crime", count: mockNews.filter(n => n.type === "crime").length },
              { id: "weather", label: "Weather", count: mockNews.filter(n => n.type === "weather").length },
              { id: "traffic", label: "Traffic", count: mockNews.filter(n => n.type === "traffic").length },
              { id: "safety", label: "Safety", count: mockNews.filter(n => n.type === "safety").length },
            ].map((filterOption) => (
              <Button
                key={filterOption.id}
                variant={filter === filterOption.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterOption.id)}
                className="whitespace-nowrap"
              >
                {filterOption.label} ({filterOption.count})
              </Button>
            ))}
          </div>

          {/* News Feed */}
          <div className="space-y-4">
            {filteredNews.map((news) => (
              <Card 
                key={news.id}
                className="transition-all hover:shadow-elevated"
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className="text-2xl">
                      {getSeverityIcon(news.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm leading-tight">
                            {news.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className={`text-xs text-${getSeverityColor(news.severity)} border-${getSeverityColor(news.severity)}`}
                            >
                              {news.severity.toUpperCase()}
                            </Badge>
                            {news.verified && (
                              <Badge variant="outline" className="text-xs text-success border-success">
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {news.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {news.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {news.timestamp}
                          </span>
                        </div>
                        <span className="text-primary font-medium">
                          {news.source}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Emergency Alert */}
          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
              <p className="text-sm font-medium text-destructive">Stay Alert & Safe</p>
              <p className="text-xs text-muted-foreground">
                Always verify information and report suspicious activities to local authorities
              </p>
            </CardContent>
          </Card>

          {/* Refresh Button */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              toast({
                title: "News Updated", 
                description: "Latest safety alerts refreshed",
              });
            }}
          >
            Refresh Latest Updates
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RiskNews;