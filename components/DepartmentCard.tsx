'use client';

import Link from 'next/link';
import { Department } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DepartmentCardProps {
  department: Department;
  onDelete: (deptId: string) => void;
}

export default function DepartmentCard({ department, onDelete }: DepartmentCardProps) {
  const handleDelete = () => {
    onDelete(department._id);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{department.department}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          {department.description}
        </CardDescription>
        <div className="flex space-x-2">
          <Link href={`/departments/${department.id}`}>
            <Button variant="outline" size="sm">
              View
            </Button>
          </Link>
          <Link href={`/departments/${department.id}/edit`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
