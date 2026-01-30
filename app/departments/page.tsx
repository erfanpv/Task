import { getDepartments } from '@/app/actions/departments';
import DepartmentsClient from './DepartmentsClient';
import { Department } from '@/types';

export const revalidate = 0;

export default async function DepartmentsPage() {
  const result = await getDepartments();
  const departments = result.success ? (result.data as Department[]) || [] : [];

  return <DepartmentsClient initialDepartments={departments} />;
}
