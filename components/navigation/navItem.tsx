import Link from "next/link";
import { usePathname } from "next/navigation";

import navigationStyles from "@styles/common/navigation.module.scss";

export default function NavItem({ href, title }: any) {
  const pathname = usePathname();

  return (
    <a
      className={pathname === href ? navigationStyles.current_page : ""}
      href={href}
    >
      {title}
    </a>
  );
}
