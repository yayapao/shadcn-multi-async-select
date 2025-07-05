import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import HomeHeader from "./_atom/home-header";
import Example from "./_atom/example";
import DocumentPanel from "./_atom/document";
import ApiDocs from "./_example/api-docs";

export default async function MultiAsyncSelectPage() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/city`);
  const cities = (await data.json()).data;
  return (
    <div className="mx-auto flex flex-col gap-4 mt-12 pb-10 md:mt-20 justify-center items-center">
      <HomeHeader />
      <div className="flex flex-col gap-4 items-center justify-center">
        <Tabs defaultValue="example">
          <TabsList className="grid w-full grid-cols-3 max-w-[660px] mx-auto">
            <TabsTrigger value="example">Example</TabsTrigger>
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="api">Api</TabsTrigger>
          </TabsList>
          <TabsContent value="example" className="w-[760px]">
            <Example options={cities} />
          </TabsContent>
          <TabsContent value="document" className="w-[760px]">
            <DocumentPanel />
          </TabsContent>
          <TabsContent value="api" className="w-[860px]">
            <ApiDocs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
