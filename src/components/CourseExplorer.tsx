"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "../types/Course";
import CourseCard from "./CourseCard";

type CourseExplorerProps = {
  courses: Course[];
};

export default function CourseExplorer({ courses }: CourseExplorerProps) {
  const [keyword, setKeyword] = useState("");

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  const searchText = keyword.trim().toLowerCase();
  // เก็บผลค้นหาไว้ที่ตัวแปรใหม่
  const visibleCourses = courses.filter(
    (course) =>
      // ค้นหารายวิชาจากชื่อหรือรหัส โดยไม่สนใจตัวพิมพ์ใหญ่/เล็ก
      course.title.toLowerCase().includes(searchText) ||
      course.code.includes(searchText),
  );

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  function handleToggleFavorite(id: number) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id],
    );
  }

  return (
    <div>
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
            />
          ))}
        </section>
      )}
    </div>
  );
}
