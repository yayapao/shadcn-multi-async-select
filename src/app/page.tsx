import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import HomeHeader from "./_atom/home-header";
import Example from "./_atom/example";

export default async function MultiAsyncSelectPage() {
  // const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/city`);
  // const cities = await data.json();
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 mt-16 md:mt-24 justify-center items-center">
      <HomeHeader />
      <div className="flex flex-col gap-4 items-center justify-center">
        <Tabs defaultValue="example" className="w-[540px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="example">Example</TabsTrigger>
          </TabsList>
          <TabsContent value="example">
            <Example />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
