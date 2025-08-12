import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-96 items-center justify-center rounded-lg bg-gray-100">
      <p>Loading map...</p>
    </div>
  ),
});

export default DynamicMap;
