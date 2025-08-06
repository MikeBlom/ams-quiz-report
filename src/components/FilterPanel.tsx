
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Filter } from 'lucide-react';

interface FilterPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-80 sm:w-96">
        <SheetHeader className="space-y-4">
          <SheetTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" aria-hidden="true" />
            <span>Filter Options</span>
          </SheetTitle>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Student Groups */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Student Groups</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="all-students" />
                <Label htmlFor="all-students" className="text-sm">All Students</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="iep-students" />
                <Label htmlFor="iep-students" className="text-sm">IEP Students</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="ell-students" />
                <Label htmlFor="ell-students" className="text-sm">ELL Students</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="gifted-students" />
                <Label htmlFor="gifted-students" className="text-sm">Gifted Students</Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Performance Levels */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Performance Levels</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="mastery" />
                <Label htmlFor="mastery" className="text-sm">Mastery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="near-mastery" />
                <Label htmlFor="near-mastery" className="text-sm">Near Mastery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="below-mastery" />
                <Label htmlFor="below-mastery" className="text-sm">Below Mastery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="not-assessed" />
                <Label htmlFor="not-assessed" className="text-sm">Not Assessed</Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Standards */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Standards</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="algebraic-expressions" />
                <Label htmlFor="algebraic-expressions" className="text-sm">Algebraic Expressions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="linear-equations" />
                <Label htmlFor="linear-equations" className="text-sm">Linear Equations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="graphing-functions" />
                <Label htmlFor="graphing-functions" className="text-sm">Graphing Functions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="systems-equations" />
                <Label htmlFor="systems-equations" className="text-sm">Systems of Equations</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 pt-4 border-t">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="flex-1">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterPanel;
