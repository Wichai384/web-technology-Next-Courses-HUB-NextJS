import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="เมนูหลัก">
      <ul className="navList">
        <li>
          <Link className="navLink" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="navLink" href="/courses">
            Courses
          </Link>
        </li>
        <li>
          <Link className="navLink" href="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="navLink" href="/idol">
            Bands
          </Link>
        </li>
      </ul>
    </nav>
  );
}
