import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
const formSchema = z.object({
  city: z.array(z.string()),
});

const SelectForm = () => {
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Use with shadcn/ui Form</CardTitle>
      </CardHeader>
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
                      options={data?.data || []}
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
  );
};

export default SelectForm;
