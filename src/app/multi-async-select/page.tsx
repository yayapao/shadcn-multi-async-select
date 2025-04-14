import MultiAsyncSelectClient from "./client";

export default async function MultiAsyncSelectPage() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/city`);
  const cities = await data.json();
  return (
    <div className="flex flex-col gap-4 p-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Multi Async Select</h1>
      </header>
      <main>
        <MultiAsyncSelectClient options={cities.data} />
      </main>
    </div>
  );
}
