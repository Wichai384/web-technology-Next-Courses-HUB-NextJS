export type Course = {
  id: number;
  code: string;
  title: string;
  credits: number;
  isOpen: boolean;
};

type CourseCardProps = {
  course: Course;
  description?: string;
};

export default function CourseCard({ course, description }: CourseCardProps) {
  return (
    <article className="course-card">
      <h2>{course.title}</h2>
      <p>รหัสวิชา: {course.code}</p>
      <p>{course.credits} หน่วยกิต</p>
      <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
    </article>
  );
}
