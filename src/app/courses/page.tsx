import { courses } from "../../data/coursesdata";
import CourseExplorer from "../../components/CourseExplorer";
export const metadata = {
  title: "รายวิชา",
};

export default function AboutCourses() {
  return (
    <main>
      <CourseExplorer courses={courses} />
    </main>
  );
}
