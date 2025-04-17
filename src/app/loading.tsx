import PageSpinner from "@/components/yaui/spinner/page-spinner";

export default function ServerNodeManagementLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <PageSpinner />
    </div>
  );
}
