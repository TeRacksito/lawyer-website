import Link from "next/link";

export interface INavItemProps {
  href: string;
  label: string;
}

export default function NavItem (props: INavItemProps) {
  const { href, label } = props;
  return (
    <Link
      href={href}
      className="text-sm font-medium text-primary transition hover:text-primary/80"
    >
      {label}
    </Link>
  );
}
