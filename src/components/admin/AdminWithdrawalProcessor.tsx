
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Withdrawal {
  id: string;
  user_id: string;
  amount: number;
  payment_method: string;
  payment_details: any;
  status: string;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
    referral_code: string;
  };
}

const AdminWithdrawalProcessor = () => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const fetchWithdrawals = async () => {
    try {
      const { data, error } = await supabase
        .from('withdrawals')
        .select(`
          *,
          profiles:user_id(full_name, email, referral_code)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWithdrawals(data || []);
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch withdrawals',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const processWithdrawal = async (withdrawalId: string, action: 'approve' | 'reject') => {
    setProcessing(withdrawalId);
    try {
      const { data, error } = await supabase.rpc('admin_process_withdrawal', {
        p_withdrawal_id: withdrawalId,
        p_action: action,
        p_notes: notes[withdrawalId] || null,
      });

      if (error) throw error;

      const result = data as { success: boolean; error?: string };

      if (result.success) {
        toast({
          title: 'Success',
          description: `Withdrawal ${action}d successfully`,
        });
        await fetchWithdrawals();
        setNotes(prev => ({ ...prev, [withdrawalId]: '' }));
      } else {
        toast({
          title: 'Error',
          description: result.error || `Failed to ${action} withdrawal`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error(`Error ${action}ing withdrawal:`, error);
      toast({
        title: 'Error',
        description: `Failed to ${action} withdrawal`,
        variant: 'destructive',
      });
    } finally {
      setProcessing(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdrawal Processing</CardTitle>
        <CardDescription>Review and process user withdrawal requests</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading withdrawals...</div>
        ) : (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{withdrawal.profiles?.full_name}</div>
                        <div className="text-sm text-gray-600">{withdrawal.profiles?.referral_code}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold">₹{withdrawal.amount.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="capitalize">{withdrawal.payment_method.replace('_', ' ')}</div>
                        <div className="text-xs text-gray-500">
                          {withdrawal.payment_details?.upi_id || 
                           withdrawal.payment_details?.account_number ||
                           'Details available'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(withdrawal.status)}
                        {getStatusBadge(withdrawal.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(withdrawal.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {withdrawal.status === 'pending' && (
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Admin notes (optional)"
                            value={notes[withdrawal.id] || ''}
                            onChange={(e) => setNotes(prev => ({
                              ...prev,
                              [withdrawal.id]: e.target.value
                            }))}
                            className="min-h-[60px]"
                          />
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => processWithdrawal(withdrawal.id, 'approve')}
                              disabled={processing === withdrawal.id}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              {processing === withdrawal.id ? 'Processing...' : 'Approve'}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => processWithdrawal(withdrawal.id, 'reject')}
                              disabled={processing === withdrawal.id}
                              className="text-red-600 hover:text-red-700"
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminWithdrawalProcessor;
