import Image from "next/image";
import hamburger from "../../../public/icons/Hamburger.svg";

type MenuButtonProps = {
  buttonText: string;
  onExploreClick: () => void;
};

export default function MenuButton({
  buttonText,
  onExploreClick,
}: MenuButtonProps) {
  return (
    <button onClick={onExploreClick} className="menu-button">
      {buttonText}
      <Image
        src={hamburger}
        className="hamburger-icon"
        alt="menu icon"
        width={40}
        height={40}
      />
    </button>
  );
}
