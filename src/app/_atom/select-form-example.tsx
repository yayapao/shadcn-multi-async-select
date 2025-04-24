import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { MultiAsyncSelect } from "@/components/open-source/multi-async-select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedCallback } from "use-debounce";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { GoFileCode } from "react-icons/go";
import Link from "next/link";
import { useEffect, useState } from "react";
const formSchema = z.object({
  city: z.array(z.string()),
});

type Props = {
  formData: {
    city: string[];
  };
};

const SelectFormExample = ({ formData }: Props) => {
  const [cityList, setCityList] = useState<{ label: string; value: string }[]>(
    []
  );
  const { isPending, error, reset, mutate } = useMutation({
    mutationFn: async (searchString: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/city?keyword=${searchString}`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return res.json();
    },
    onSuccess: (data) => {
      setCityList(data.data);
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  useEffect(() => {
    setCityList(formData.city.map((city) => ({ label: city, value: city })));
  }, [formData.city]);

  return (
    <div>
      <div className="flex justify-end">
        <Button className="cursor-pointer gap-0.5" variant="link">
          <Link
            href="https://github.com/yayapao/shadcn-multi-async-select/blob/main/src/app/_atom/select-form-example.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code
          </Link>
          <GoFileCode />
        </Button>
      </div>
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <MultiAsyncSelect
                        loading={isPending}
                        error={error}
                        options={cityList}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="w-[500px]"
                        onSearch={handleSearch}
                        async
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end mt-4">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectFormExample;
