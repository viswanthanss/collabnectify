
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Eye, EyeOff, Fingerprint, Lock, Shield, Smartphone, User, UserX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SecuritySettings() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const { toast } = useToast();
  
  const handlePasswordChange = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
  };

  const handleTwoFactorToggle = () => {
    toast({
      title: "Two-factor authentication enabled",
      description: "Your account is now more secure with 2FA.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Security & Privacy</h2>
        <p className="text-muted-foreground">
          Manage your account security, privacy settings, and data controls.
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Password Management</h3>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input 
                  id="currentPassword" 
                  type={showCurrentPassword ? "text" : "password"} 
                  placeholder="Enter your current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input 
                  id="newPassword" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm new password"
              />
            </div>
            
            <div className="bg-muted/50 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2">Password Requirements:</h4>
              <ul className="text-xs space-y-1">
                <li className="flex items-center">
                  <span className="w-4 h-4 mr-2 text-green-500">✓</span>
                  Minimum 8 characters
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 mr-2 text-green-500">✓</span>
                  At least one uppercase letter
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 mr-2 text-green-500">✓</span>
                  At least one number
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 mr-2 text-gray-300">○</span>
                  At least one special character
                </li>
              </ul>
            </div>
            
            <Button onClick={handlePasswordChange}>Change Password</Button>
          </CardContent>
        </Card>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Two-Factor Authentication (2FA)</h3>
        
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
              </div>
              <Switch onChange={handleTwoFactorToggle} />
            </div>
            
            <div className="p-6 bg-muted/30 flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-32 h-32 bg-white p-2 rounded-md mx-auto sm:mx-0">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=example" alt="QR Code" className="w-full h-full" />
              </div>
              
              <div className="space-y-4 flex-1">
                <div>
                  <h5 className="font-medium">Set Up Authenticator App</h5>
                  <p className="text-sm text-muted-foreground mt-1">
                    Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="authCode">Verification Code</Label>
                  <div className="flex space-x-2">
                    <Input id="authCode" placeholder="Enter 6-digit code" className="max-w-[180px]" />
                    <Button>Verify</Button>
                  </div>
                </div>
                
                <div className="text-sm">
                  <p className="font-medium">Recovery codes</p>
                  <p className="text-muted-foreground">Save these backup codes in a safe place in case you lose access to your authentication app.</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <code className="bg-muted p-1 rounded text-xs">ABCD-EFGH-1234</code>
                    <code className="bg-muted p-1 rounded text-xs">IJKL-MNOP-5678</code>
                    <code className="bg-muted p-1 rounded text-xs">QRST-UVWX-9012</code>
                    <code className="bg-muted p-1 rounded text-xs">YZAB-CDEF-3456</code>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Active Sessions</h3>
        
        <div className="space-y-3">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/10 p-2 rounded-full">
                      <Fingerprint className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium flex items-center">
                        Current Session
                        <Badge className="ml-2 bg-green-500/20 text-green-700 hover:bg-green-500/20">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        MacBook Pro · Chrome · San Francisco, CA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="divide-y">
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Smartphone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">iPhone 13</div>
                        <p className="text-sm text-muted-foreground">
                          Safari · New York, NY · Last active 2 hours ago
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Sign Out</Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Smartphone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">iPad Pro</div>
                        <p className="text-sm text-muted-foreground">
                          Chrome · San Francisco, CA · Last active 5 days ago
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Sign Out</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full">
            Sign Out From All Devices
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Privacy Controls</h3>
        
        <div className="space-y-3">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h4 className="font-medium">Blocked Users</h4>
              
              <div className="divide-y">
                <div className="py-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">Jane Smith</div>
                      <p className="text-sm text-muted-foreground">
                        Blocked on June 12, 2023
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Unblock
                  </Button>
                </div>
                
                <div className="py-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">Mike Johnson</div>
                      <p className="text-sm text-muted-foreground">
                        Blocked on April 3, 2023
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Unblock
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Data Sharing & Controls</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="dataAnalytics">Analytics & Usage Data</Label>
              <p className="text-sm text-muted-foreground">
                Share anonymous usage data to help improve the platform
              </p>
            </div>
            <Switch id="dataAnalytics" defaultChecked={true} />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="personalization">Personalization Using My Data</Label>
              <p className="text-sm text-muted-foreground">
                Allow us to use your activity to provide personalized experiences
              </p>
            </div>
            <Switch id="personalization" defaultChecked={true} />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <Label htmlFor="thirdPartySharing">Third-Party Data Sharing</Label>
              <p className="text-sm text-muted-foreground">
                Allow sharing data with trusted third-party partners
              </p>
            </div>
            <Switch id="thirdPartySharing" defaultChecked={false} />
          </div>
        </div>
        
        <div className="pt-2">
          <Button variant="outline">Download My Data</Button>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}
