import { getDepartment } from '@/app/actions/departments';
import Header from '@/components/Header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Department } from '@/types';
import { notFound } from 'next/navigation';
import DeleteButton from './DeleteButton';

interface DepartmentDetailPageProps {
  params: {
    id: string;
  };
}

export default async function DepartmentDetailPage({ params }: DepartmentDetailPageProps) {
  const result = await getDepartment({ deptId: params.id });

  if (!result.success || !result.data) {
    notFound();
  }

  const department = result.data as Department;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Department Details" showAddButton={false} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-4">
            <Link href="/departments">
              <Button variant="outline">
                ← Back to Departments
              </Button>
            </Link>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardDescription>Department Information</CardDescription>
                  <h3 className="text-lg font-semibold mb-2">Depertment Name</h3>
                <CardTitle className="text-2xl">{department.department}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{department.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Department ID</h3>
                  <p className="text-gray-600 font-mono">{department._id}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Created At</h3>
                  <p className="text-gray-600">
                    {new Date(department.createdAt).toLocaleString()}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Last Updated</h3>
                  <p className="text-gray-600">
                    {new Date(department.updatedAt).toLocaleString()}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex space-x-2">
                    <Link href="/departments">
                      <Button variant="outline">
                        Back to Departments
                      </Button>
                    </Link>
                    <DeleteButton departmentId={department._id} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
