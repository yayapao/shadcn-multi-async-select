import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import HomeHeader from "./_atom/home-header";
import AsyncSelectExample from "./_atom/async-select-example";

export default async function MultiAsyncSelectPage() {
  // const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/city`);
  // const cities = await data.json();
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 mt-16 md:mt-24 justify-center items-center">
      <HomeHeader />
      <div className="flex flex-col gap-4 items-center justify-center">
        <Tabs defaultValue="async" className="w-[540px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="async">Async</TabsTrigger>
          </TabsList>
          <TabsContent value="async">
            <div>
              <h5 className="text-sm font-medium mb-4">
                Async data-loading multi-select, support search & debounce,
                built with shadcn/ui{" "}
                <a
                  href="https://ui.shadcn.com/docs/components/popover"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Popover
                </a>
                ,{" "}
                <a
                  href="https://ui.shadcn.com/docs/components/command"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Command
                </a>
                , and more.
              </h5>
              <AsyncSelectExample />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
