export const metadata = {
  title: "รายวิชา",
};

export default function AboutCourses() {
  type course = {
    id: number;
    code: string;
    title: string;
    credits: string;
    isOpen: boolean;
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
    {
      id: 3,
      code: "10301233",
      title: "Data Structures and Algorithms",
      credits: "3",
      isOpen: true,
    },
    {
      id: 4,
      code: "10301234",
      title: "Computer Networks",
      credits: "3",
      isOpen: true,
    },
    {
      id: 5,
      code: "10301235",
      title: "Mobile Application Development",
      credits: "3",
      isOpen: false,
    },
  ];

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
              <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
            </article>
          ))}
            </section>
        </div>
    </main>
  );
}
