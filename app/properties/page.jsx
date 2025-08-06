import React from "react";
import properties from "@/properties.json";
import PropertyCard from "../components/PropertyCard";

const Properties = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 items-center gap-6 p-10 md:grid-cols-3">
      {!properties || properties.length === 0 ? (
        <div>There are no properties</div>
      ) : (
        properties.map((property) => (
          <PropertyCard key={property.namaProperti} {...property} />
        ))
      )}
    </div>
  );
};

export default Properties;
