import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, ArrowLeft, MapPin, CalendarDays, Plane } from "lucide-react";
// import { useAppContext } from "@/App";
import { useToast } from "@/hooks/use-toast";

const TripPlanner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    startDate: "",
    endDate: "",
    travelers: "1",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Trip planned", description: "Your itinerary is ready." });

    navigate("/dashboard");
  };

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold ml-2">Trip Planner</h1>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <Card className="border-0 shadow-elevated">
            <CardHeader>
              <CardTitle className="text-primary text-xl">Plan your perfect trip</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="origin">Origin</Label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="origin" name="origin" value={form.origin} onChange={handleChange} className="pl-9 h-11" required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative">
                      <Plane className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input id="destination" name="destination" value={form.destination} onChange={handleChange} className="pl-9 h-11" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="startDate">Start date</Label>
                      <div className="relative">
                        <CalendarIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input id="startDate" name="startDate" type="date" value={form.startDate} onChange={handleChange} className="pl-9 h-11" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="endDate">End date</Label>
                      <div className="relative">
                        <CalendarDays className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input id="endDate" name="endDate" type="date" value={form.endDate} onChange={handleChange} className="pl-9 h-11" required />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Travelers</Label>
                    <Select onValueChange={(v) => handleSelect("travelers", v)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder={form.travelers + " person(s)"} />
                      </SelectTrigger>
                      <SelectContent>
                        {["1","2","3","4","5","6+"].map(v => (
                          <SelectItem key={v} value={v} className="text-base">{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setForm({ origin: "", destination: "", startDate: "", endDate: "", travelers: "1" })}>
                    Reset
                  </Button>
                  <Button type="submit" className="ml-auto">Plan Trip</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-0">
            <CardHeader>
              <CardTitle className="text-base">Smart suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Best time to visit popular hill stations: Oct–Mar.</li>
                <li>• Keep copies of ID and emergency contacts handy.</li>
                <li>• Use Safe Route for safest paths during your trip.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
