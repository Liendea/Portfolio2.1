import type { SanityAssetDocument } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "../../sanity/lib/image";
import Image from "next/image";

type backgroundImageProps = {
  backgroundMedia: string | SanityAssetDocument | SanityImageSource;
};
export default function BackgroundImage({
  backgroundMedia,
}: backgroundImageProps) {
  return (
    <Image
      src={
        typeof backgroundMedia === "string"
          ? backgroundMedia
          : urlFor(backgroundMedia).url()
      }
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
