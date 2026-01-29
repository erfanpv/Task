import Header from '@/components/Header';
import DepartmentForm from '@/components/DepartmentForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AddDepartmentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Add Department" showAddButton={false} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-4">
            <Link href="/departments">
              <Button variant="outline">
                ← Back to Departments
              </Button>
            </Link>
          </div>
          
          <div className="max-w-md mx-auto">
            <DepartmentForm />
          </div>
        </div>
      </main>
    </div>
  );
}
