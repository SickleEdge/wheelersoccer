import { StaffMember } from '@/lib/types';
import { Card, CardContent } from "@/components/ui/card";

interface StaffCardProps {
  staff: StaffMember;
}

export function StaffCard({ staff }: StaffCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold text-navy mb-1">{staff.name}</h3>
        <p className="text-muted-foreground">{staff.position}</p>
      </CardContent>
    </Card>
  );
} 