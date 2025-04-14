import MultiAsyncSelectClient from "./client";

export default async function MultiAsyncSelectPage() {
  const data = await fetch("http://localhost:3000/api/city");
  const cities = await data.json();
  return <MultiAsyncSelectClient options={cities.data} />;
}
