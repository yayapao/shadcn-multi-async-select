'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Package } from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

interface SiderProps {
  className?: string;
  defaultOpen?: boolean;
}

const navItems: NavItem[] = [
  {
    title: 'Multi Async Select',
    href: '/',
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: 'Select Content Pro',
    href: '/select-content-pro',
    icon: <Package className="h-4 w-4" />,
  },
];

const Sider = ({ className, defaultOpen = true }: SiderProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <aside
      className={cn(
        'fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-background p-4 transition-all dark:bg-zinc-900',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0',
        className
      )}
      style={{ zIndex: 10 }}
    >
      <div className="flex flex-col space-y-6">
        <div>
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sider;
