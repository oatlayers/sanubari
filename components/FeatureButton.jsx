// /components/FeatureButton.js

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

const FeatureButton = ({ propertyId, isFeatured }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFeatureToggle = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/properties/${propertyId}/feature`, {
        method: "PATCH",
      });

      if (res.ok) {
        // Refresh the page to show the updated status
        // This is a simple and effective way to update the UI
        router.refresh();
      } else {
        console.error("Failed to toggle feature status");
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleFeatureToggle}
      disabled={isLoading}
      className={`btn btn-accent items-center rounded-xl ${
        isLoading ? "loading" : ""
      }`}
    >
      <Star
        size={20}
        className={isFeatured ? "fill-current text-yellow-400" : ""}
      />
      {isLoading ? "Updating..." : isFeatured ? "Unfeature" : "Feature"}
    </button>
  );
};

export default FeatureButton;
