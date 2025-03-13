
import React, { useState } from 'react';
import { AlertTriangle, Archive, Clock, LogOut, RefreshCcw, Trash, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AccountControls() {
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out of your account.",
    });
  };

  const handleDeactivate = () => {
    setIsDeactivateDialogOpen(false);
    toast({
      title: "Account deactivated",
      description: "Your account has been temporarily deactivated. You can reactivate it by logging in again within 30 days.",
      variant: "destructive",
    });
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(false);
    toast({
      title: "Account deletion initiated",
      description: "Your account will be permanently deleted after 30 days. You'll receive an email with more information.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Account Controls</h2>
        <p className="text-muted-foreground">
          Manage your account status, deactivation, and deletion options.
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Account Status</h3>
        
        <div className="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 p-4 rounded-lg flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h4 className="font-medium">Your account is active</h4>
            <p className="text-sm text-green-700/80 dark:text-green-400/80">
              Account created on June 15, 2023 · Last login 2 hours ago
            </p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Account Actions</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <LogOut className="h-5 w-5 text-muted-foreground" />
              </div>
              <h4 className="font-medium">Sign Out</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Log out from your current session on this device.
            </p>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
          
          <div className="border rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <RefreshCcw className="h-5 w-5 text-muted-foreground" />
              </div>
              <h4 className="font-medium">Reset Account</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Reset your account settings to default values.
            </p>
            <Button variant="outline" className="w-full">
              Reset Settings
            </Button>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
          <p className="text-sm text-muted-foreground">
            These actions are irreversible or have significant consequences.
          </p>
        </div>
        
        <div className="border border-destructive/20 rounded-lg space-y-6 p-5">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Archive className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h4 className="font-medium">Temporarily Deactivate Account</h4>
                <p className="text-sm text-muted-foreground">
                  Hide your profile and activity for now. You can reactivate anytime within 30 days.
                </p>
              </div>
            </div>
            
            <Dialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-amber-500/50 text-amber-600 hover:bg-amber-500/10">
                  Deactivate Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Temporarily Deactivate Account</DialogTitle>
                  <DialogDescription>
                    Your account will be hidden from other users. You can reactivate by logging in within 30 days.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 p-3 rounded-md flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm">
                      After 30 days of inactivity, your account may be permanently deleted. This action will hide your profile from others but won't delete your data.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deactivate-confirm">Type "DEACTIVATE" to confirm</Label>
                    <Input id="deactivate-confirm" placeholder="DEACTIVATE" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeactivateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeactivate}
                  >
                    Deactivate Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Trash className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h4 className="font-medium">Permanently Delete Account</h4>
                <p className="text-sm text-muted-foreground">
                  Delete your account and all associated data. This cannot be undone.
                </p>
              </div>
            </div>
            
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
                >
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Permanently Delete Account</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. Your account will be scheduled for permanent deletion after a 30-day grace period.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-md flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        What happens when you delete your account:
                      </p>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li>Your profile will be deactivated immediately</li>
                        <li>All your personal data will be scheduled for deletion</li>
                        <li>You'll lose access to your projects and collaborations</li>
                        <li>Your messages will no longer be accessible to recipients</li>
                        <li>You can cancel deletion for up to 30 days by logging in</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="delete-reason">Why are you leaving? (Optional)</Label>
                    <select 
                      id="delete-reason" 
                      className="w-full p-2 rounded-md border bg-background"
                    >
                      <option>Please select a reason</option>
                      <option>I have another account</option>
                      <option>Privacy concerns</option>
                      <option>Too many emails/notifications</option>
                      <option>Not finding value in the platform</option>
                      <option>Other reason</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="delete-confirm">Type "DELETE MY ACCOUNT" to confirm</Label>
                    <Input id="delete-confirm" placeholder="DELETE MY ACCOUNT" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleDelete}
                  >
                    Delete Permanently
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
