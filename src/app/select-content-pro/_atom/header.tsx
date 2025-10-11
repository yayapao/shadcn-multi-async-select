import { Button } from '@/components/ui/button';
import { BiSolidCopyAlt } from 'react-icons/bi';
import Link from 'next/link';
import { AuroraText } from '@/components/magicui/aurora-text';

export default function SelectContentProHeader() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="text-balance text-[36px] font-semibold leading-none tracking-tighter">
          Select Content
          <AuroraText className="italic pl-2">Pro</AuroraText>
        </h1>
      </div>
      <div className="flex flex-col gap-4 justify-between">
        <Button variant="link" size="lg">
          <Link
            className="flex flex-row items-center gap-1"
            href="https://github.com/yayapao/shadcn-multi-async-select/blob/main/src/components/open/select-content-pro.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copy component
            <BiSolidCopyAlt />
          </Link>
        </Button>
      </div>
      <div className="text-balance text-lg">
        <b>Override</b> the content of the select component with custom content
        built with{' '}
        <a
          href="https://ui.shadcn.com/"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          shadcn/ui.
        </a>
      </div>
    </div>
  );
}
