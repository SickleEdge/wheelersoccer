import { StaffMember } from '@/lib/types';
import { Card, CardContent } from "@/components/ui/card";

interface StaffCardProps {
  staff: StaffMember;
}

export function StaffCard({ staff }: StaffCardProps) {
  return (
    <Card className="overflow-hidden hover-scale">
      <CardContent className="p-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-navy">{staff.name}</h3>
          <div className="flex items-center mt-1">
            <div className="bg-navy/10 px-2 py-0.5 rounded text-xs font-medium text-navy animate-pulse">{staff.position}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 