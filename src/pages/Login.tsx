import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/App";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useAppContext();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockUser = {
        id: "user123",
        name: "Priya Sharma", 
        email: formData.email,
        phone: "+91 9876543210",
        emergencyContact: "+91 9876543211",
        hasDigitalID: true,
      };
      
      setUser(mockUser);
      setIsLoading(false);
      
      toast({
        title: "Welcome back!",
        description: "Login successful. Redirecting to dashboard...",
      });
      
      navigate('/dashboard');
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-gradient-safety flex flex-col">
        {/* Header */}
        <div className="flex items-center p-4 text-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="ml-4 text-xl font-semibold">Welcome Back</h1>
        </div>

        {/* Login Form */}
        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-sm bg-white/95 backdrop-blur shadow-elevated">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Login to SafeYatri</CardTitle>
              <p className="text-muted-foreground">Enter your credentials to continue</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="transition-smooth"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="transition-smooth pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-safety hover:opacity-90 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => navigate('/signup')}
                    className="text-primary"
                  >
                    Don't have an account? Sign up
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;