import Image from "next/image";
import arrow from "../../../public/icons/Arrows_light.svg";

type exploreButtonProps = {
  buttonText: string;
  onExploreClick: () => void;
};

export default function ExploreButton({
  buttonText,
  onExploreClick,
}: exploreButtonProps) {
  return (
    <button onClick={onExploreClick} className="explore-button">
      {buttonText}
      <Image
        src={arrow}
        className="explore-arrow"
        alt="arrow"
        width={40}
        height={40}
      />
    </button>
  );
}
