import Link from "next/link";
import type { Course } from "../../types/Course";

// Props ที่ CourseCard รับมาจาก CourseExplorer
type CourseCardProps = {
  course: Course;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onEdit?: (course: Course) => void;
  onDelete?: (id: string) => void;
};

// แสดงข้อมูลรายวิชา 1 รายการ พร้อมปุ่มจัดการรายวิชา
export default function CourseCard({
  course,
  isFavorite = false,
  onToggleFavorite,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <article className="courseCard">
      {/* ชื่อรายวิชา: กดเพื่อไปยังหน้ารายละเอียด */}
      <h2>
        <Link className="courseTitleLink" href={`/courses/${course.id}`}>
          {course.name}
        </Link>
      </h2>

      {/* ข้อมูลพื้นฐานของรายวิชา */}
      <p>รหัสวิชา: {course.code}</p>
      <p>{course.credit} หน่วยกิต</p>
      <p>ผู้สอน: {course.instructor}</p>

      {/* ปุ่มจัดการรายการโปรด แก้ไข และลบ */}
      <div className="courseCardActions">
        {/* ถ้ามี callback จึงแสดงปุ่มรายการโปรด */}
        {onToggleFavorite ? (
          <button
            type="button"
            className={`favoriteButton${isFavorite ? " isActive" : ""}`}
            onClick={() => onToggleFavorite(course.id)}
            aria-pressed={isFavorite}
          >
            {isFavorite ? "ลบจากรายการโปรด" : "เพิ่มในรายการโปรด"}
          </button>
        ) : null}

        {/* เรียก callback เพื่อเปิดโหมดแก้ไข */}
        {onEdit ? (
          <button
            className="courseActionButton"
            type="button"
            onClick={() => onEdit(course)}
          >
            แก้ไข
          </button>
        ) : null}

        {/* เรียก callback เพื่อลบรายวิชาตาม id */}
        {onDelete ? (
          <button
            className="courseActionButton courseActionButton--delete"
            type="button"
            onClick={() => onDelete(course.id)}
          >
            ลบ
          </button>
        ) : null}
      </div>
    </article>
  );
}
