import { LineShadowText } from "@/components/magicui/line-shadow-text";
import MultiAsyncSelectClient from "./client";

export default async function MultiAsyncSelectPage() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/city`);
  const cities = await data.json();
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 mt-16 md:mt-24 justify-center items-center">
      <div className="flex items-center justify-between">
        <h1 className="text-balance text-6xl font-semibold leading-none tracking-tighter">
          Multi Async
          <LineShadowText className="italic pl-2">Select</LineShadowText>
        </h1>
      </div>
      <div className="w-full">
        <MultiAsyncSelectClient options={cities.data} />
      </div>
    </div>
  );
}
