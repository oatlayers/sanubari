// app/properties/edit/[id]/page.jsx
import React from "react";
import connectDB from "@/lib/database";
import Property from "@/models/Property";
import PropertyEditForm from "@/components/PropertyEditForm";

export default async function EditPropertyById({ params }) {
  await connectDB();
  const { id } = await params;
  const propertyDoc = await Property.findById(id).lean();

  if (!propertyDoc) {
    return <div>Property not found</div>;
  }

  const property = JSON.parse(JSON.stringify(propertyDoc));

  return <PropertyEditForm property={property} />;
}
