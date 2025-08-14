"use client";
import { useEffect, useRef } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export default function PropertyGallery({ images }) {
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!galleryRef.current) return;

    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + galleryRef.current.id,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className="text-base-content/50 bg-base-200 flex h-80 w-full items-center justify-center rounded-lg border">
        No image
      </div>
    );
  }

  return (
    <div
      id="property-gallery"
      ref={galleryRef}
      className="grid grid-cols-1 gap-4 md:grid-cols-3"
    >
      {/* Main image */}
      <div className="col-span-2">
        <a
          href={images[0]}
          data-pswp-width="1600"
          data-pswp-height="900"
          target="_blank"
          rel="noreferrer"
          className="border-base-300 bg-base-200 block h-80 overflow-hidden rounded-lg border"
        >
          <img
            src={images[0]}
            alt="Main property image"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </a>
      </div>

      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {images.slice(1).map((src, i) => (
          <a
            key={i}
            href={src}
            data-pswp-width="1600"
            data-pswp-height="900"
            target="_blank"
            rel="noreferrer"
            className="border-base-300 block overflow-hidden rounded-md border transition-all duration-200 hover:scale-105"
          >
            <img
              src={src}
              alt={`Thumbnail ${i + 2}`}
              className="h-20 w-full object-cover"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
