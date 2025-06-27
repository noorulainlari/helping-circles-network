
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar, Coins } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface ROIData {
  totalROI: number;
  todaysROI: number;
  daysCompleted: number;
  totalDays: number;
  packageAmount: number;
  roiPercentage: number;
}

const ROITracker = () => {
  const [roiData, setROIData] = useState<ROIData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchROIData = async () => {
    if (!user) return;

    try {
      // Get user profile with package info
      const { data: profile } = await supabase
        .from('profiles')
        .select(`
          total_roi_earned,
          package_activated_at,
          package_id
        `)
        .eq('id', user.id)
        .eq('status', 'active')
        .single();

      if (profile && profile.package_id) {
        // Get package details
        const { data: packageData } = await supabase
          .from('packages')
          .select('amount, roi_percentage, roi_days')
          .eq('id', profile.package_id)
          .single();

        if (packageData && profile.package_activated_at) {
          const activatedAt = new Date(profile.package_activated_at);
          const now = new Date();
          const daysDiff = Math.floor((now.getTime() - activatedAt.getTime()) / (1000 * 60 * 60 * 24));
          
          // Get today's ROI
          const { data: todayROI } = await supabase
            .from('roi_distributions')
            .select('amount')
            .eq('user_id', user.id)
            .gte('created_at', new Date().toISOString().split('T')[0])
            .single();

          setROIData({
            totalROI: profile.total_roi_earned || 0,
            todaysROI: todayROI?.amount || 0,
            daysCompleted: Math.max(0, daysDiff),
            totalDays: packageData.roi_days,
            packageAmount: packageData.amount,
            roiPercentage: packageData.roi_percentage,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching ROI data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchROIData();
  }, [user]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading ROI data...</div>
        </CardContent>
      </Card>
    );
  }

  if (!roiData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            ROI Tracker
          </CardTitle>
          <CardDescription>No active package found</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const progressPercentage = (roiData.daysCompleted / roiData.totalDays) * 100;
  const dailyROI = (roiData.packageAmount * roiData.roiPercentage) / 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
          ROI Tracker
        </CardTitle>
        <CardDescription>Track your Return on Investment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ROI Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">ROI Progress</span>
            <Badge className="bg-green-100 text-green-800">
              {roiData.daysCompleted}/{roiData.totalDays} days
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="text-xs text-gray-500">
            {Math.max(0, roiData.totalDays - roiData.daysCompleted)} days remaining
          </div>
        </div>

        {/* ROI Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <Coins className="w-4 h-4 mr-1" />
              Today's ROI
            </div>
            <div className="text-lg font-bold text-green-600">
              ₹{roiData.todaysROI.toLocaleString()}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              Total ROI
            </div>
            <div className="text-lg font-bold text-blue-600">
              ₹{roiData.totalROI.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Daily ROI Info */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm font-medium">Daily ROI Rate</span>
            </div>
            <div className="text-sm font-bold text-blue-600">
              ₹{dailyROI.toLocaleString()} ({roiData.roiPercentage}%)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ROITracker;
