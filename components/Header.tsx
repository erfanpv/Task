'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { logoutUser } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
  showAddButton?: boolean;
  showBackButton?: boolean;
  backUrl?: string;
  onAddClick?: () => void;
}

export default function Header({ title, showAddButton = false, showBackButton = false, backUrl = '/departments' }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link href={backUrl}>
                <Button variant="outline">Back</Button>
              </Link>
            )}
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            {showAddButton && (
              <Link href="/departments/add">
                <Button>
                  Add Department
                </Button>
              </Link>
            )}

            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
