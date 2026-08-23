import type { SanityAssetDocument } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "../../sanity/lib/image";
import Image from "next/image";

type BackgroundMediaProps = {
  type: "image" | "video";
  backgroundMedia: string | SanityAssetDocument | SanityImageSource;
};

export default function BackgroundMedia({
  type,
  backgroundMedia,
}: BackgroundMediaProps) {
  const src =
    typeof backgroundMedia === "string"
      ? backgroundMedia
      : urlFor(backgroundMedia).url();

  if (type === "video") {
    return (
      <video
        src={src}
        autoPlay
        muted
        playsInline
        style={{
          opacity: 1,
          pointerEvents: "auto",
          transition: "opacity 0.5s ease",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -10,
        }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt="Hero Background"
      fill
      style={{
        objectFit: "cover",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
}
