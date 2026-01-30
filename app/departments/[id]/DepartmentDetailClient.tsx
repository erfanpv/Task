'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteDepartment } from '@/app/actions/departments';
import Header from '@/components/Header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ConfirmModal } from '@/components/ui/modal';
import { Department } from '@/types';

interface DepartmentDetailClientProps {
  department: Department;
}

export default function DepartmentDetailClient({ department }: DepartmentDetailClientProps) {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDeleteClick = () => {
    setError('');
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    setError('');

    try {
      const result = await deleteDepartment({ deptId: department._id });

      if (result.success) {
        router.push('/departments');
        router.refresh();
      } else {
        setError(result.error || 'Failed to delete department');
        setDeleteModalOpen(false);
      }
    } catch (err) {
      setError('An error occurred while deleting department');
      setDeleteModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Department Details" showAddButton={true} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/departments" className="text-gray-500 hover:text-gray-700">
                    Departments
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="text-gray-900 font-medium truncate max-w-xs">
                  {department.department}
                </li>
              </ol>
            </nav>
          </div>

          {/* Department Header Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="px-6 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{department.department}</h1>
                    <p className="text-gray-600 mt-1">Department details and information</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
                    Active
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-lg p-2 mr-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed">
                      {department.description || 'No description provided for this department.'}
                    </p>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="bg-purple-100 rounded-lg p-2 mr-3">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900">Department Information</h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <dl className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <dt className="text-sm font-medium text-gray-500">Department ID</dt>
                        <dd className="text-sm font-mono text-gray-900 bg-gray-50 px-3 py-1 rounded border">
                          {department._id}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd>
                          <div className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
                            Active
                          </div>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Timeline Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="bg-orange-100 rounded-lg p-2 mr-3">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900">Timeline</h2>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 rounded-full p-2 mt-1">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Created</p>
                        <p className="text-sm text-gray-500">
                          {new Date(department.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(department.createdAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 rounded-full p-2 mt-1">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Last Updated</p>
                        <p className="text-sm text-gray-500">
                          {new Date(department.updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(department.updatedAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="bg-gray-100 rounded-lg p-2 mr-3">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <Link href="/departments" className="block w-full">
                      <Button variant="outline" className="w-full justify-start group">
                        <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Departments
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteClick}
                      className="w-full justify-start group"
                    >
                      <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Department
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Department"
        message={`Are you sure you want to delete "${department.department}"? This action cannot be undone and all associated data will be permanently removed.`}
        confirmText="Delete Department"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  );
}
