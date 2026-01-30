'use server';

import { api } from '@/lib/api';
import { getAuthToken } from '@/lib/auth';
import { CreateDepartmentData } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getDepartments() {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }

    const response = await api.getDepartments({ token });
    return { success: true, data: response };
  } catch (error) {
    console.error('Get departments error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch departments'
    };
  }
}

export async function getDepartment({ deptId }: { deptId: string }) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    console.log(deptId, 'ss');
    const response = await api.getDepartment({ deptId, token });
    return { success: true, data: response };
  } catch (error) {
    console.error('Get department error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch department'
    };
  }
}

export async function createDepartment(data: CreateDepartmentData) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    const response = await api.addDepartment({ data, token });

    // Revalidate the departments page to show the new department
    revalidatePath('/departments');

    return { success: true, data: response };
  } catch (error) {
    console.error('Create department error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create department'
    };
  }
}

export async function deleteDepartment({ deptId }: { deptId: string }) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: 'Authentication required' };
    }

    await api.deleteDepartment({ deptId, token });

    // Revalidate the departments page to reflect the deletion
    revalidatePath('/departments');

    return { success: true };
  } catch (error) {
    console.error('Delete department error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete department'
    };
  }
}

