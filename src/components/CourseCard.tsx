import type { Course } from "../types/Course";

type CourseCardProps = {
  course: Course;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
};

export default function CourseCard({
  course,
  isFavorite = false,
  onToggleFavorite,
}: CourseCardProps) {
  return (
    <article className="courseCard">
      <h2>{course.title}</h2>
      <p>รหัสวิชา: {course.code}</p>
      <p>{course.credits} หน่วยกิต</p>
      <p className={course.isOpen ? "status-open" : "status-closed"}>
        {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
      </p>
      {onToggleFavorite && (
        <button
          type="button"
          className={`favoriteButton${isFavorite ? " isActive" : ""}`}
          onClick={() => onToggleFavorite(course.id)}
          aria-pressed={isFavorite}
        >
          {isFavorite ? "ลบจากรายการโปรด" : "เพิ่มในรายการโปรด"}
        </button>
      )}
    </article>
  );
}
