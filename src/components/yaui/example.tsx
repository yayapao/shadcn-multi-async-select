import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { GoFileCode } from 'react-icons/go';
import Link from 'next/link';

interface ExampleContainerProps {
  title: string | ReactNode;
  link: string;
  desc: string | ReactNode;
  children?: ReactNode;
}

export default function ExampleContainer({
  title,
  link,
  desc,
  children,
}: ExampleContainerProps) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <Button className="cursor-pointer gap-0.5" variant="link">
          <Link href={link} target="_blank" rel="noopener noreferrer">
            Code
          </Link>
          <GoFileCode />
        </Button>
      </div>
      <p className="text-sm text-gray-600 mb-4 dark:text-gray-400">{desc}</p>
      {children}
    </div>
  );
}
