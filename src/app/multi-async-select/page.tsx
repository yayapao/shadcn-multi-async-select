import { LineShadowText } from "@/components/yaui/text/magic-line-shadow-text";
import MultiAsyncSelectClient from "./client";

export default async function MultiAsyncSelectPage() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/city`);
  const cities = await data.json();
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 mt-16 md:mt-24 justify-center items-center">
      <div className="flex items-center justify-between">
        <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          Multi Async
          <LineShadowText className="italic">Select</LineShadowText>
        </h1>
      </div>
      <div className="w-full">
        <MultiAsyncSelectClient options={cities.data} />
      </div>
    </div>
  );
}
