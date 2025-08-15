import connectDB from "@/lib/database";
import Property from "@/models/Property";
import { auth } from "@/auth";

// PATCH /api/properties/:id/feature
export const PATCH = async (request, { params }) => {
  try {
    await connectDB();

    const session = await auth();

    // Check for session
    if (!session || !session.user) {
      return new Response("Unauthorized: Must be logged in", { status: 401 });
    }

    const { id } = params;
    const property = await Property.findById(id);

    if (!property) {
      return new Response("Property Not Found", { status: 404 });
    }

    // Toggle the featured status
    property.featured = !property.featured;

    await property.save();

    return new Response(JSON.stringify(property), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error toggling featured status:", error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
