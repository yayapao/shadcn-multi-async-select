"use client";
import { useMutation } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { MultiAsyncSelect } from "@/components/open-source/multi-async-select";

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
    <MultiAsyncSelect
      loading={isPending}
      error={error}
      options={data?.data || []}
      onValueChange={(value) => console.log(value)}
      className="w-[540px]"
      onSearch={handleSearch}
      searchPlaceholder="async..."
      placeholder="select city"
      async
    />
  );
};

export default AsyncSelectExample;
