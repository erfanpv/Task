'use client';

import { useState } from 'react';
import { deleteDepartment } from '@/app/actions/departments';
import Header from '@/components/Header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ConfirmModal } from '@/components/ui/modal';
import { Department } from '@/types';

interface DepartmentsClientProps {
  initialDepartments: Department[];
}

export default function DepartmentsClient({ initialDepartments }: DepartmentsClientProps) {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (department: Department) => {
    setDepartmentToDelete(department);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!departmentToDelete) return;

    setIsDeleting(true);
    setError('');

    try {
      const result = await deleteDepartment({ deptId: departmentToDelete._id });

      if (result.success) {
        setDepartments(departments.filter(dept => dept._id !== departmentToDelete._id));
        setDeleteModalOpen(false);
        setDepartmentToDelete(null);
      } else {
        setError(result.error || 'Failed to delete department');
      }
    } catch (err) {
      setError('An error occurred while deleting department');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setDepartmentToDelete(null);
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Departments"
        showAddButton={true}
      />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {departments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500 mb-4">No departments found</p>
                <Link href="/departments/add">
                  <Button>
                    Create your first department
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <Card key={dept._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{dept.department}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {dept.description}
                    </CardDescription>
                    <div className="flex space-x-2">
                      <Link href={`/departments/${dept._id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(dept)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Department"
        message={`Are you sure you want to delete "${departmentToDelete?.department}"? This action cannot be undone.`}
        confirmText="Delete Department"
        isLoading={isDeleting}
      />
    </div>
  );
}
