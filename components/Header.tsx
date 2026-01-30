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
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 sm:py-6">
          {/* Left side - Title and Back Button */}
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            {showBackButton && (
              <Link href={backUrl} className="flex-shrink-0">
                <Button variant="outline" size="sm" className="sm:hidden">
                  ←
                </Button>
                <Button variant="outline" className="hidden sm:flex">
                  Back
                </Button>
              </Link>
            )}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
              {title}
            </h1>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {showAddButton && (
              <Link href="/departments/add">
                <Button size="sm" className="sm:default">
                  Add Department
                </Button>
              </Link>
            )}

            <Button variant="outline" size="sm" className="sm:default" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
