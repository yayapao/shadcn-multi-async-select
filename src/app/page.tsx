import HomeHeader from "./_atom/home-header";
import MultiAsyncSelectClient from "./client";

export default async function MultiAsyncSelectPage() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/city`);
  const cities = await data.json();
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 mt-16 md:mt-24 justify-center items-center">
      <HomeHeader />
      <div className="w-full">
        <MultiAsyncSelectClient options={cities.data} />
      </div>
    </div>
  );
}
