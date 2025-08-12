// app/api/cloudinary-signature/route.js
import crypto from "crypto";

/**
 * Returns a signature and timestamp for secure (signed) Cloudinary uploads.
 * Expects a JSON body with optional folder and eager presets, but minimal
 * implementation here uses only timestamp and folder to create the signature.
 *
 * Ensure these env vars are set:
 * - process.env.CLOUDINARY_API_KEY
 * - process.env.CLOUDINARY_API_SECRET
 * - process.env.CLOUDINARY_CLOUD_NAME
 */
export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const folder = body.folder || "propertypulse";
    const timestamp = Math.floor(Date.now() / 1000);

    // Build the string to sign. Cloudinary expects keys sorted lexicographically.
    // Include any additional params you will send from the client (e.g., folder).
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!apiSecret) {
      return new Response(
        JSON.stringify({ error: "Missing CLOUDINARY_API_SECRET" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + apiSecret)
      .digest("hex");

    return new Response(
      JSON.stringify({
        signature,
        timestamp,
        folder,
        api_key: process.env.CLOUDINARY_API_KEY || null,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Signature generation failed:", err);
    return new Response(JSON.stringify({ error: "signature_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
