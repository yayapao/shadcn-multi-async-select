import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SelectContentProHeader from './_atom/header';
import Example from './_atom/example';
import ApiDocs from './_atom/api-docs';

export default function SelectContentProPage() {
  return (
    <div className="mx-auto flex flex-col gap-4 mt-12 pb-10 md:mt-20 justify-center items-center">
      <SelectContentProHeader />
      <div className="flex flex-col gap-4 items-center justify-center">
        <Tabs defaultValue="example">
          <TabsList className="grid w-full grid-cols-3 max-w-[660px] mx-auto">
            <TabsTrigger value="example">Example</TabsTrigger>
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="api">Api</TabsTrigger>
          </TabsList>
          <TabsContent value="example" className="w-[760px]">
            <Example />
          </TabsContent>
          <TabsContent value="document" className="w-[760px]">
            {/* <DocumentPanel /> */}
          </TabsContent>
          <TabsContent value="api" className="w-[860px]">
            <ApiDocs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
