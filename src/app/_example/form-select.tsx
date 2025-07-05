"use client";
import { useMutation } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { MultiAsyncSelect } from "@/components/open/multi-async-select";
import { Button } from "@/components/ui/button";
import { GoFileCode } from "react-icons/go";
import Link from "next/link";
import ComponentContainer from "@/components/yaui/component-container";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  cities: z.array(z.string()),
});

const FormSelectExample = () => {
  const [cities, setCities] = useState<{ label: string; value: string }[]>([
    { label: "Paris", value: "PAR" },
  ]);
  const { isPending, error, reset, mutate } = useMutation({
    mutationFn: async (searchString: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/city?keyword=${searchString}`
      );
      await new Promise((resolve) => setTimeout(resolve, 200));
      return res.json();
    },
    onSuccess: (data) => {
      setCities(data.data || []);
    },
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    if (!value) {
      // clear data
      reset();
    } else {
      mutate(value);
    }
  }, 100);

  // set default value
  const initData = {
    cities: ["PAR"],
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: initData,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.success("Submit success", {
      description: JSON.stringify(data),
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Using in Form</h2>
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
      <p className="text-sm text-gray-500 mb-4">
        This example demonstrates how to use the MultiAsyncSelect component in{" "}
        <Link
          href="https://ui.shadcn.com/docs/components/form"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          shadcn/ui Form.
        </Link>
      </p>
      <ComponentContainer>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (err) => {
              console.log(err);
            })}
          >
            <FormField
              control={form.control}
              name="cities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cities</FormLabel>
                  <FormControl>
                    <MultiAsyncSelect
                      loading={isPending}
                      error={error}
                      options={cities}
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      onSearch={handleSearch}
                      className="w-[480px]"
                      searchPlaceholder="search city..."
                      placeholder="Select cities..."
                      maxCount={3}
                      async
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end mt-4">
              <Button type="submit" size="sm" className="cursor-pointer">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </ComponentContainer>
    </div>
  );
};

export default FormSelectExample;
