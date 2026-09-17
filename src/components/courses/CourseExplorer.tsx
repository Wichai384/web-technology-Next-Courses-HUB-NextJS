"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "../../types/Course";
import CourseCard from "./CourseCard";
import CourseForm, { type CourseDraft } from "./CourseForm";

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({ initialCourses }: CourseExplorerProps) {
  // เก็บรายการรายวิชาที่แสดงผล และอัปเดตเมื่อมีการเพิ่ม ลบ หรือแก้ไข
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  // เก็บข้อความที่ผู้ใช้พิมพ์ในช่องค้นหา
  const [keyword, setKeyword] = useState("");
  // ถ้ามีค่า แปลว่ากำลังแก้ไขรายวิชาที่มี id นี้ ถ้าเป็น null คือกำลังเพิ่มใหม่
  const [editingId, setEditingId] = useState<string | null>(null);

  //เพิ่มรายวิชาใหม่
  function handleCreate(draft: CourseDraft) {
    // เติม: เมธอดที่สร้างรหัสสุ่มไม่ซ้ำกันในรูปแบบ UUID
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
    };

    // ใช้ค่า state ล่าสุดแล้วต่อท้ายด้วยรายวิชาใหม่
    setCourses((currentCourses) => [...currentCourses, newCourse]);
  }

  //ลบรายวิชา
  function handleDelete(id: string) {
    // เติม: เมธอดของ Array ที่คืนเฉพาะสมาชิกที่ผ่านเงื่อนไข
    // filter จะสร้างอาร์เรย์ใหม่โดยเก็บทุกวิชาที่ยังไม่ใช่ id ที่ต้องการลบ
    setCourses((currentCourses) =>
      currentCourses.filter((course) => course.id !== id),
    );
  }

  //แก้ไขรายวิชา
  function handleUpdate(id: string, draft: CourseDraft) {
    // map จะสร้างอาร์เรย์ใหม่ และแทนที่เฉพาะรายวิชาที่มี id ตรงกัน
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === id
          ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credit: Number(draft.credit),
              instructor: draft.instructor.trim(),
            }
          : course,
      ),
    );

    setEditingId(null);
  }

  //รวมการเพิ่มและการแก้ไขไว้ที่ Callback เดียว
  function handleSave(draft: CourseDraft) {
    // ใช้ฟอร์มเดียวกันทั้งตอนเพิ่มและตอนแก้ไข โดยตรวจจาก editingId
    if (editingId === null) {
      handleCreate(draft);
      return;
    }
    handleUpdate(editingId, draft);
  }
  // ค้นหารายวิชาที่กำลังแก้ไขเพื่อส่งข้อมูลเดิมเข้าแบบฟอร์ม
  const editingCourse = courses.find((course) => course.id === editingId);

  // อัปเดตคำค้นหาทุกครั้งที่ผู้ใช้พิมพ์
  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  const searchText = keyword.trim().toLowerCase();
  // เก็บผลค้นหาไว้ที่ตัวแปรใหม่
  const visibleCourses = courses.filter(
    (course) =>
      // ค้นหารายวิชาจากชื่อหรือรหัส โดยไม่สนใจตัวพิมพ์ใหญ่/เล็ก
      course.name.toLowerCase().includes(searchText) ||
      course.code.includes(searchText),
  );

  // เก็บ id ของรายวิชาที่ผู้ใช้เพิ่มไว้ในรายการโปรด
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // ถ้ามีอยู่แล้วให้ลบออก ถ้ายังไม่มีให้เพิ่มเข้าไป
  function handleToggleFavorite(id: string) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id],
    );
  }

  return (
    <div>
      <CourseForm
        // เปลี่ยน key เพื่อให้ฟอร์มโหลดค่าใหม่เมื่อสลับรายวิชาที่แก้ไข
        key={editingId ?? "new"}
        initialCourse={editingCourse}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      <div className="searchBar">
        <input
          className="searchInput"
          type="search"
          aria-label="ค้นหารายวิชา"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
        />
      </div>

      {visibleCourses.length === 0 ? (
        <p>ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
      ) : (
        <section className="courseGrid">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favoriteIds.includes(course.id)}
              onToggleFavorite={handleToggleFavorite}
              onEdit={() => setEditingId(course.id)}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}
    </div>
  );
}
