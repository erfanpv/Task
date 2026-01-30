import { getDepartment } from '@/app/actions/departments';
import DepartmentDetailClient from './DepartmentDetailClient';
import { Department } from '@/types';
import { notFound } from 'next/navigation';

interface DepartmentDetailPageProps {
  params: {
    id: string;
  };
}

export default async function DepartmentDetailPage({ params }: DepartmentDetailPageProps) {
  const { id } = await params;

  const result = await getDepartment({ deptId: id });

  if (!result.success) {
    console.error('Failed to fetch department:', result.error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Department</h2>
          <p className="text-gray-600 mb-6">{result.error || 'Failed to load department details'}</p>
          <a 
            href="/departments"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Departments
          </a>
        </div>
      </div>
    );
  }

  if (!result.data) {
    notFound();
  }

  const department = result.data as Department;

  return <DepartmentDetailClient department={department} />;
}
