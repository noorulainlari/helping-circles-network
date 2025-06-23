
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const AdminSetup = () => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSetupAdmin = async () => {
    if (!userId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid user ID",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // This would require a database function to update the admin logic
      // For now, we'll show the user what they need to do
      toast({
        title: "Admin Setup Instructions",
        description: `To set up admin access, you need to update the get_user_role function in your database to include user ID: ${userId}`,
      });

      console.log('User ID to make admin:', userId);
      console.log('Current user ID:', user?.id);
      
    } catch (error) {
      console.error('Error setting up admin:', error);
      toast({
        title: "Error",
        description: "Failed to set up admin access",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyCurrentUserId = () => {
    if (user?.id) {
      setUserId(user.id);
      navigator.clipboard.writeText(user.id);
      toast({
        title: "User ID Copied",
        description: "Your current user ID has been copied and filled in",
      });
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Admin Setup</CardTitle>
        <CardDescription>
          Set up admin access by providing a user ID that should have admin privileges
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {user && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Your User ID:</strong> {user.id}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyCurrentUserId}
              className="mt-2"
            >
              Use My ID as Admin
            </Button>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="userId">User ID to Grant Admin Access</Label>
          <Input
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user UUID"
          />
        </div>

        <Button 
          onClick={handleSetupAdmin} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Setting up...' : 'Show Setup Instructions'}
        </Button>

        <div className="text-xs text-gray-600 space-y-2">
          <p><strong>Next Steps:</strong></p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Copy the user ID above</li>
            <li>Go to your Supabase SQL Editor</li>
            <li>Update the get_user_role function with the new user ID</li>
            <li>The user will then have admin access to /admin</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSetup;
