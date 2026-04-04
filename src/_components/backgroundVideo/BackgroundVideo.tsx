import { urlFor } from "../../sanity/lib/image";
import type { SanityAssetDocument } from "@sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type backgroundVideoProps = {
  backgroundMedia: string | SanityAssetDocument | SanityImageSource;
};
export default function BackgroundVideo({
  backgroundMedia,
}: backgroundVideoProps) {
  const videostyling: React.CSSProperties = {
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
  };

  return (
    <video
      src={
        typeof backgroundMedia === "string"
          ? backgroundMedia
          : urlFor(backgroundMedia).url()
      }
      autoPlay
      muted
      playsInline
      style={videostyling}
    />
  );
}
