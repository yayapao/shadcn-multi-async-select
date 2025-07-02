"use client";
import { useMutation } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { MultiAsyncSelect } from "@/components/open/multi-async-select";
import { Button } from "@/components/ui/button";
import { GoFileCode } from "react-icons/go";
import Link from "next/link";
import ComponentContainer from "@/components/yaui/component-container";

const AsyncSelectExample = () => {
  const { isPending, data, error, reset, mutate } = useMutation({
    mutationFn: async (searchString: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/city?keyword=${searchString}`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return res.json();
    },
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    if (!value) {
      // clear data
      reset();
    } else {
      mutate(value);
    }
  }, 500);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h5 className="text-sm font-medium">Async & Multi-select</h5>
        </div>
        <Button className="cursor-pointer gap-0.5" variant="link">
          <Link
            href="https://github.com/yayapao/shadcn-multi-async-select/blob/main/src/app/_atom/async-select-example.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code
          </Link>
          <GoFileCode />
        </Button>
      </div>
      <ComponentContainer>
        <MultiAsyncSelect
          loading={isPending}
          error={error}
          options={data?.data || []}
          onValueChange={(value) => console.log(value)}
          onSearch={handleSearch}
          className="w-[480px]"
          searchPlaceholder="async search..."
          placeholder="Select city"
          maxCount={3}
          async
        />
      </ComponentContainer>
    </div>
  );
};

export default AsyncSelectExample;
