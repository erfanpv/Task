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
    if (description.trim().length < 5) {
      setError('Description must be at least 5 characters');
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
    <Card>
      <CardHeader>
        <CardTitle>Create Department</CardTitle>
        <CardDescription>
          Create a new department for your organization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {isSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Department created successfully! Redirecting...
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="deptName" className="text-sm font-medium">
              Department Name *
            </label>
            <Input
              id="deptName"
              type="text"
              placeholder="Enter department name"
              value={deptName}
              onChange={handleDeptNameChange}
              required
              disabled={isLoading}
              className={error && error.includes('Department name') ? 'border-red-500' : ''}
            />
            {error && error.includes('Department name') && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description *
            </label>
            <textarea
              id="description"
              className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                error && error.includes('Description') ? 'border-red-500' : ''
              }`}
              placeholder="Enter department description (minimum 10 characters)"
              value={description}
              onChange={handleDescriptionChange}
              required
              disabled={isLoading}
            />
            {error && error.includes('Description') && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>
          {error && !error.includes('Department name') && !error.includes('Description') && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="flex space-x-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Department'}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
