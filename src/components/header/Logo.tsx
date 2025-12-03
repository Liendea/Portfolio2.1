import Link from "next/link";
import Logo from "../../../public/icons/LIENDEA.svg";
import Image from "next/image";

export default function Header() {
  return (
    <Link href="/">
      <Image src={Logo} width="200" height="20" alt="Logo" />
    </Link>
  );
}
