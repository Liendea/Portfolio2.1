import Image from "next/image";
import hamburger from "../../../public/icons/Hamburger.svg";

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
        src={hamburger}
        className="explore-arrow"
        alt="menu icon"
        width={40}
        height={40}
      />
    </button>
  );
}
