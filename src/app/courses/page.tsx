import { courses } from "../../data/coursesdata";

export const metadata = {
  title: "รายวิชา",
};

export default function AboutCourses() {
  return (
    <main>
        <div className="box2">
          <div className="boxhide"></div>
          <section className="courseGrid">
          {courses.map((course) => (
            <article key={course.id} className="courseCard">
              <h2>{course.title}</h2>
              <p>รหัสวิชา: {course.code}</p>
              <p>{course.credits} หน่วยกิต</p>
              <p className={course.isOpen ? "status-open" : "status-closed"}>
                {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
              </p>
            </article>
          ))}
            </section>
        </div>
    </main>
  );
}
