
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, FileSpreadsheet } from 'lucide-react';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ open, onOpenChange }) => {
  const [exportFormat, setExportFormat] = useState('csv');

  const handleExport = () => {
    // Mock export functionality
    console.log(`Exporting data in ${exportFormat} format`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" aria-hidden="true" />
            <span>Export Report Data</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Export Format */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Export Format</Label>
            <RadioGroup value={exportFormat} onValueChange={setExportFormat}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center space-x-2 cursor-pointer">
                  <FileSpreadsheet className="h-4 w-4" aria-hidden="true" />
                  <span>CSV (Excel Compatible)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center space-x-2 cursor-pointer">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  <span>PDF Report</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Data Sections */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Include Sections</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="overview" defaultChecked />
                <Label htmlFor="overview" className="text-sm">Overview & Metrics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="student-analysis" defaultChecked />
                <Label htmlFor="student-analysis" className="text-sm">Student Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="item-analysis" />
                <Label htmlFor="item-analysis" className="text-sm">Item Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="standards-analysis" />
                <Label htmlFor="standards-analysis" className="text-sm">Standards Analysis</Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Additional Options */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Additional Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="include-charts" />
                <Label htmlFor="include-charts" className="text-sm">Include Charts & Visualizations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="anonymize-data" />
                <Label htmlFor="anonymize-data" className="text-sm">Anonymize Student Data</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            Export
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
