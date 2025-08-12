import connectDB from "@/lib/database";
import Property from "@/models/Property";
import PropertyDetail from "@/components/PropertyDetail";

export default async function PropertyPage({ params }) {
  await connectDB();
  const { id } = await params;
  const property = await Property.findById(id).lean();

  if (!property) {
    return (
      <div className="mx-auto max-w-4xl p-8">
        <h1 className="text-2xl font-semibold">Properti tidak ditemukan</h1>
        <p className="mt-2 text-gray-600">ID: {id}</p>
      </div>
    );
  }

  return <PropertyDetail property={JSON.parse(JSON.stringify(property))} />;
}
