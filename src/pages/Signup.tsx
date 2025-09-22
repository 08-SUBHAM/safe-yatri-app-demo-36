import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/App";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser, setLastTripBlockchainId } = useAppContext();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    idType: "",
    idNumber: "",
    emergencyContact: "",
    emergencyName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Account created!",
        description: "Welcome to SafeYatri",
      });
      // Save basic user info to global context
      setUser({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        joinedDate: new Date().toISOString().slice(0, 10),
      });

      // Generate and store a fake blockchain-like ID at signup
      const randomHex = () => Array.from(crypto.getRandomValues(new Uint8Array(20)))
        .map(b => b.toString(16).padStart(2, '0')).join('');
      const signupChainId = `0x${randomHex()}`;
      setLastTripBlockchainId(signupChainId);

      toast({
        title: "Digital Trip ID Ready",
        description: `Blockchain ID: ${signupChainId}`,
      });
      
      // Navigate to dashboard so details appear immediately
      navigate('/dashboard');
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-gradient-safety">
        {/* Header */}
        <div className="flex items-center p-4 text-white sticky top-0 z-10 bg-gradient-safety">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">Create Account</h1>
        </div>

        {/* Signup Form */}
        <div className="p-4">
          <Card className="w-full bg-white/95 backdrop-blur shadow-elevated border-0">
            <CardHeader className="text-center px-4 pt-6 pb-2">
              <CardTitle className="text-xl text-primary font-bold">Join SafeYatri</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Complete KYC verification for secure travel</p>
            </CardHeader>

            <CardContent className="px-4 pb-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Personal Information */}
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="h-11 text-base"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-11 text-base"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-11 text-base"
                    required
                  />
                </div>

                {/* KYC Information */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">ID Type</Label>
                  <Select onValueChange={(value) => handleSelectChange('idType', value)}>
                    <SelectTrigger className="h-11 text-base">
                      <SelectValue placeholder="Select ID Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar" className="text-base">Aadhaar</SelectItem>
                      <SelectItem value="passport" className="text-base">Passport</SelectItem>
                      <SelectItem value="license" className="text-base">Driving License</SelectItem>
                      <SelectItem value="voter" className="text-base">Voter ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="idNumber" className="text-sm font-medium">ID Number</Label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    className="h-11 text-base"
                    required
                  />
                </div>

                {/* Emergency Contact */}
                <div className="space-y-1.5">
                  <Label htmlFor="emergencyName" className="text-sm font-medium">Emergency Contact Name</Label>
                  <Input
                    id="emergencyName"
                    name="emergencyName"
                    value={formData.emergencyName}
                    onChange={handleInputChange}
                    className="h-11 text-base"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="emergencyContact" className="text-sm font-medium">Emergency Phone</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="h-11 text-base"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="h-11 text-base pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="h-11 text-base pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-5">
                  Already have an account?{' '}
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto text-primary font-medium text-sm"
                    onClick={() => navigate('/login')}
                  >
                    Sign in
                  </Button>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;