'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteDepartment } from '@/app/actions/departments';
import { Button } from '@/components/ui/button';

interface DeleteButtonProps {
  departmentId: string;
}

export default function DeleteButton({ departmentId }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this department?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteDepartment({ deptId: departmentId });
      
      if (result.success) {
        router.push('/departments');
      } else {
        alert(result.error || 'Failed to delete department');
      }
    } catch (err) {
      alert('An error occurred while deleting department');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button 
      variant="destructive" 
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? 'Deleting...' : 'Delete Department'}
    </Button>
  );
}
