import Image from "next/image";

export default function Home() {
  const siteName = "Wichai384-Student Course Hub";
  const courseCount: number = 3;
  const isOpen: boolean = true;
  const topics: string[] = [
  "HTML",
  "CSS",
  "TypeScript",
  "Next.js",
  ];

type course = {
  id: number;
  code: string;
  title: string;
  credits: string;
  isOpen: boolean;
};
const course: course = {
  id: 1,
  code: "10301231",
  title: "Web Technology",
  credits: "3",
  isOpen: true,
};

const courses: course[] = [
  {
    id: 1,
    code: "10301231",
    title: "Web Technology",
    credits: "3",
    isOpen: true,
  },
  {
    id: 2,
    code: "10301232",
    title: "Database Systems",
    credits: "3",
    isOpen: false,
  },
];


  return (
    <main>
      <div className="box1">
        <h1>Welcome , Mr.{siteName}</h1>
        <p>เว็บไซต์รวบรวมข้อมูลรายวิชา</p>
        <p>จำนวนรายวิชา: {courseCount}</p>
        <p>สถานะระบบ:{isOpen ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p> 
      </div>

      <div className="box2">
        <h2>Topics</h2>
        <ul>
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>

      <div className="box3">
        <article>
          <h2>{course.title}</h2>
          <p>รหัสวิชา: {course.code}</p>
          <p>{course.credits} หน่วยกิต</p>
        </article>
      </div>

      <div className="box4">
        <h1>#### use map ###</h1>
        <section className="courseGrid">{courses.map((course) => 
        (
          <article key={course.id} className="courseCard">
            <h2>{course.title}</h2>
            <p>รหัสวิชา: {course.code}</p>
            <p>{course.credits} หน่วยกิต</p>
            <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
          </article>
        ))}
        </section>
      </div>
    </main>
  );
}
