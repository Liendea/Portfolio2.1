import SplashScreen from "@/src/_components/splashScreen/SplashScreen";
import type { SanityColor } from "../../app/(site)/[slug]/page";

type SplashSectionProps = {
  name: string;
  tagline?: string;
  textColor?: SanityColor;
  backgroundColor?: SanityColor;
};

export default function SplashSection({
  name,
  tagline,
  textColor,
  backgroundColor,
}: SplashSectionProps) {
  return (
    <SplashScreen
      name={name}
      tagline={tagline}
      textColor={textColor}
      backgroundColor={backgroundColor}
    />
  );
}
