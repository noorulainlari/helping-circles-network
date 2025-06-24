
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Download, CheckCircle2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminWithdrawalProcessor = () => {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  // Mock data for batch processing
  const [batchWithdrawals] = useState([
    { id: "W001", user: "John Doe", amount: 5000, method: "Bank Transfer", account: "****1234" },
    { id: "W002", user: "Jane Smith", amount: 2500, method: "UPI", account: "jane@paytm" },
    { id: "W003", user: "Mike Johnson", amount: 7500, method: "Bank Transfer", account: "****5678" },
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const handleBatchProcess = async () => {
    setProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
    toast({
      title: "Batch Processing Complete",
      description: `${batchWithdrawals.length} withdrawals have been processed.`,
    });
  };

  const handleExportPending = () => {
    toast({
      title: "Export Started",
      description: "Pending withdrawals are being exported to CSV.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Batch Processing Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2 text-blue-500" />
            Batch Withdrawal Processing
          </CardTitle>
          <CardDescription>
            Upload payment confirmations and process multiple withdrawals at once
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="batch-file">Upload Payment Confirmation File</Label>
              <Input
                id="batch-file"
                type="file"
                accept=".csv,.xlsx,.txt"
                onChange={handleFileUpload}
              />
              {uploadedFile && (
                <p className="text-sm text-green-600">
                  ✅ {uploadedFile.name} uploaded
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Quick Actions</Label>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleBatchProcess}
                  disabled={!uploadedFile || processing}
                  className="flex-1"
                >
                  {processing ? "Processing..." : "Process Batch"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleExportPending}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Pending
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Batch Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Current Batch Preview</CardTitle>
          <CardDescription>Preview of withdrawals ready for processing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Withdrawal ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batchWithdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id}>
                    <TableCell className="font-mono">{withdrawal.id}</TableCell>
                    <TableCell>{withdrawal.user}</TableCell>
                    <TableCell className="font-semibold">₹{withdrawal.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{withdrawal.method}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">{withdrawal.account}</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Ready
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-blue-900">Batch Summary</h4>
                <p className="text-sm text-blue-700">
                  {batchWithdrawals.length} withdrawals • Total: ₹{batchWithdrawals.reduce((sum, w) => sum + w.amount, 0).toLocaleString()}
                </p>
              </div>
              <Button 
                onClick={handleBatchProcess}
                disabled={processing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {processing ? "Processing..." : "Process All"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processed Today</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Queue</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold">₹1.2L</p>
              </div>
              <Download className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminWithdrawalProcessor;
