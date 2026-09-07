import CourseCard from "../components/CourseCard";
import { courses } from "../data/coursesdata";

export const metadata = {
  title: "หน้าแรก",
};

export default function Home() {
  const siteName = "Wichai384";
  const courseCount: number = 5;
  const isOpen: boolean = true;

  return (
    <main className="page">
      <title>Student Course Hub</title>
      <h1>Welcome, Mr.{siteName}<br/>Student Course Hub</h1>
      <p>
        เว็บไซต์นี้เหมาะสำหรับนักศึกษาที่ต้องการตรวจสอบรายวิชาที่เปิดสอนในแต่ละภาคการศึกษา
      </p>
      <p>จำนวนรายวิชา: {courseCount}</p>
      <p>สถานะระบบ: {isOpen ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
      <div className="box2">
        <div className="boxhide"></div>
        <section className="courseGrid">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </section>
      </div>
    </main>
  );
}