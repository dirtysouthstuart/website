"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { site } from "@/lib/site";

// The Google Map iframe only loads after the visitor opts in (no third-party
// requests or cookies until then).
export function MapWithConsent() {
  const [showMap, setShowMap] = useState(false);

  if (showMap) {
    return (
      <div className="w-full h-[340px] border-[3px] border-ink bg-sand">
        <iframe
          title={`Map to ${site.name}, ${site.address.street}, ${site.address.city}, ${site.address.region}`}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1774.3084541982632!2d-80.25461370859831!3d27.199774809865666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88dedd7c499acae7%3A0xc2e71ded9def1b34!2sDirty%20South!5e0!3m2!1sen!2sus!4v1791402286624!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
    );
  }

  return (
    <div className="w-full h-[340px] bg-sand flex flex-col items-center justify-center p-8 text-center border-[3px] border-dashed border-ink">
      <MapPin className="w-10 h-10 text-navy mb-4" aria-hidden />
      <p className="ultra text-2xl mb-2">Find us in Stuart</p>
      <p className="mb-6 max-w-sm">
        {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
      </p>
      <button type="button" onClick={() => setShowMap(true)} className="btn-block cursor-pointer">
        Load Map
      </button>
    </div>
  );
}
