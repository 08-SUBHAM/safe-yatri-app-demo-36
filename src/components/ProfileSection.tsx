import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Edit, LogOut, Shield, Bell, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileSectionProps {
  user: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    joinedDate: string;
    tripsCompleted: number;
    safetyScore: number;
  };
  onClose: () => void;
}

export function ProfileSection({ user, onClose }: ProfileSectionProps) {
  const navigate = useNavigate();
  
  const menuItems = [
    { 
      icon: Settings, 
      label: 'Settings', 
      onClick: () => navigate('/settings') 
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      onClick: () => navigate('/notifications') 
    },
    { 
      icon: Shield, 
      label: 'Privacy & Security', 
      onClick: () => navigate('/privacy') 
    },
    { 
      icon: HelpCircle, 
      label: 'Help & Support', 
      onClick: () => navigate('/support') 
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-end">
      <div className="bg-background h-full w-full max-w-md overflow-y-auto">
        <div className="sticky top-0 bg-background/90 backdrop-blur-sm z-10 p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">My Profile</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-20 w-20 border-2 border-primary">
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarFallback className="text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">{user.phone}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="text-center p-3">
              <p className="text-sm text-muted-foreground">Trips</p>
              <p className="text-lg font-bold">{user.tripsCompleted}</p>
            </Card>
            <Card className="text-center p-3">
              <p className="text-sm text-muted-foreground">Safety</p>
              <p className="text-lg font-bold">{user.safetyScore}/100</p>
            </Card>
            <Card className="text-center p-3">
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="text-sm font-medium">
                {new Date(user.joinedDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short' 
                })}
              </p>
            </Card>
          </div>

          {/* Menu Items */}
          <div className="space-y-2 mb-6">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start h-14 px-4"
                onClick={item.onClick}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Emergency Contacts */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Emergency Contacts</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Police', 'Ambulance', 'Family'].map((contact) => (
                  <div key={contact} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-100 text-red-600 p-2 rounded-full">
                        <Shield className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{contact} {contact === 'Family' ? '(Mom)' : ''}</p>
                        <p className="text-sm text-muted-foreground">
                          {contact === 'Police' ? '100' : 
                           contact === 'Ambulance' ? '108' : 
                           '+91 98765 43210'}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Logout Button */}
          <Button variant="outline" className="w-full" onClick={() => navigate('/login')}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
