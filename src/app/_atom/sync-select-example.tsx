import { MultiAsyncSelect } from "@/components/open-source/multi-async-select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoFileCode } from "react-icons/go";

interface Props {
  options: {
    label: string;
    value: string;
  }[];
}

const SyncSelectExample = ({ options }: Props) => {
  return (
    <div>
      <div className="flex justify-end">
        <Button className="cursor-pointer gap-0.5" variant="link">
          <Link
            href="https://github.com/yayapao/shadcn-multi-async-select/blob/main/src/app/_atom/sync-select-example.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code
          </Link>
          <GoFileCode />
        </Button>
      </div>
      <MultiAsyncSelect
        options={options}
        onValueChange={(value) => console.log(value)}
        className="w-[540px]"
      />
    </div>
  );
};

export default SyncSelectExample;
