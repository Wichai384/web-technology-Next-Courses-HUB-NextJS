import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar" aria-label="เมนูหลัก">
            <ul className="navList">
                <li>
                    <Link className="navLink" href="____________">หน้าแรก</Link>
                </li>
                <li>
                    <Link className="navLink" href="____________">รายวิชา</Link>
                </li>
                <li>
                    <Link className="navLink" href="____________">เกี่ยวกับ</Link>
                </li>
            </ul>
        </nav>
    );
}