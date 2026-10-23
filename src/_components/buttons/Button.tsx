import Link from "next/link";
import Image from "next/image";
import arrow from "../../../public/icons/Arrow_right.svg";
import styles from "./Button.module.scss";
type Buttonprops = {
  children: string;
};
export default function Button({ children }: Buttonprops) {
  return (
    <Link
      href="https://www.linkedin.com/in/bengtsson-linda"
      className={styles.button}
      target="_blank"
    >
      {children}
      <Image
        width={15}
        height={15}
        alt="arrow"
        src={arrow}
        className="button-arrow"
      />
    </Link>
  );
}
