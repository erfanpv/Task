'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDepartment } from '@/app/actions/departments';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Department, CreateDepartmentData } from '@/types';

interface DepartmentFormProps {
  onSuccess?: (department: Department) => void;
}

export default function DepartmentForm({ onSuccess }: DepartmentFormProps) {
  const [deptName, setDeptName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleDeptNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeptName(e.target.value);
    if (error && error.includes('Department name')) {
      setError('');
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (error && error.includes('Description')) {
      setError('');
    }
  };

  const validateForm = () => {
    if (!deptName.trim()) {
      setError('Department name is required');
      return false;
    }
    if (deptName.trim().length < 2) {
      setError('Department name must be at least 2 characters');
      return false;
    }
    if (!description.trim()) {
      setError('Description is required');
      return false;
    }
    if (description.trim().length < 10) {
      setError('Description must be at least 10 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await createDepartment({
        dept_name: deptName.trim(),
        description: description.trim(),
      });

      if (result.success) {
        setIsSuccess(true);
        if (onSuccess) {
          onSuccess(result.data as Department);
        } else {
          // Show success message briefly before redirect
          setTimeout(() => {
            router.push('/departments');
            router.refresh();
          }, 1500);
        }
      } else {
        setError(result.error || 'Failed to create department');
      }
    } catch (err) {
      setError('An error occurred while creating department');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onSuccess) {
      // For modal usage, we don't pass data when cancelling
      onSuccess({} as Department);
    } else {
      router.push('/departments');
    }
  };

  return (
    <div className="space-y-6">
      {/* Success State */}
      {isSuccess && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Department Created Successfully!</h3>
              <p className="text-gray-600 mb-4">Redirecting to departments list...</p>
              <div className="flex justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      {!isSuccess && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Department Information</h2>
            <p className="text-sm text-gray-600 mt-1">Fill in the required information to create a new department</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
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

            {/* Department Name Field */}
            <div className="space-y-2">
              <label htmlFor="deptName" className="block text-sm font-medium text-gray-700">
                Department Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <Input
                  id="deptName"
                  type="text"
                  placeholder="e.g., Human Resources, Engineering, Marketing"
                  value={deptName}
                  onChange={handleDeptNameChange}
                  required
                  disabled={isLoading}
                  className={`pl-10 ${error && error.includes('Department name') ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                />
              </div>
              {error && error.includes('Department name') && (
                <p className="text-red-500 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  rows={4}
                  className={`block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none ${
                    error && error.includes('Description') ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Provide a detailed description of the department's responsibilities, functions, and role within the organization..."
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                  disabled={isLoading}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {description.length}/10 min characters
                </div>
              </div>
              {error && error.includes('Description') && (
                <p className="text-red-500 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            {/* Form Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Requirements</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Department name must be at least 2 characters long</li>
                      <li>Description must be at least 10 characters long</li>
                      <li>Use clear, descriptive names that reflect the department's purpose</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Department...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Department
                  </div>
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel} 
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
