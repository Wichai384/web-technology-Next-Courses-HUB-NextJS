import Image from "next/image";

export const metadata = {
  title: "หน้าแรก",
};

export default function Home() {
  const siteName = "Wichai384-Student Course Hub";
  const courseCount: number = 5;
  const isOpen: boolean = true;

  type Course = {
    id: number;
    code: string;
    title: string;
    credits: string;
    isOpen: boolean;
  };


  return (
    <main className="page">
      <title>Student Course Hub</title>
        <h1>Welcome, Mr. {siteName}</h1>
        <p>
          เว็บไซต์นี้เหมาะสำหรับนักศึกษาที่ต้องการตรวจสอบรายวิชาที่เปิดสอนในแต่ละภาคการศึกษา
        </p>
        <p>จำนวนรายวิชา: {courseCount}</p>
        <p>
          สถานะระบบ: {isOpen ? "เปิดใช้งาน" : "ปิดใช้งาน"}
        </p>
    </main>
  );
}