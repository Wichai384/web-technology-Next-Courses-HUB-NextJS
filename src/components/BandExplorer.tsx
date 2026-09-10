"use client";

import { useState, type ChangeEvent } from "react";
import type { Band } from "../types/Band";
import BandCard from "./BandCard";

type BandExplorerProps = {
  bands: Band[];
};

export default function BandExplorer ({ bands }: BandExplorerProps) {
  // เก็บคำค้นหาที่ผู้ใช้พิมพ์ในช่องค้นหา
  const [keyword, setKeyword] = useState("");

  // เก็บรายการ id ของวงที่ผู้ใช้กดติดตาม
  const [followingIds, setFollowingIds] = useState<number[]>([]);

  // กำหนดว่าจะกรองให้แสดงเฉพาะวงที่ติดตามอยู่หรือไม่
  const [showFollowingOnly, setShowFollowingOnly] = useState(false);

  // เก็บจำนวนไลก์ของแต่ละวง โดยใช้ id วงเป็น key
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

  // อัปเดตคำค้นหาเมื่อผู้ใช้พิมพ์ข้อความ
  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  // แปลงคำค้นหาให้เป็นตัวพิมพ์เล็กและตัดช่องว่างหัวท้าย
  const searchText = keyword.trim().toLowerCase();

  // กรองวงด้วยชื่อหรือแนวเพลง และกรองซ้ำตามสถานะการติดตามถ้าเปิดใช้งาน
  const visibleBands = bands.filter(
    (band) =>
      (band.name.toLowerCase().includes(searchText) ||
        band.genre.toLowerCase().includes(searchText)) &&
      (!showFollowingOnly || followingIds.includes(band.id)),
  );

  // เพิ่มหรือลบวงออกจากรายการที่กำลังติดตาม
  function handleToggleFollowing(id: number) {
    setFollowingIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((followingId) => followingId !== id)
        : [...prevIds, id],
    );
  }

  // เพิ่มจำนวนไลก์ให้กับวงที่ผู้ใช้กดถูกใจ
  function handleLike(id: number) {
    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] ?? 0) + 1,
    }));
  }

  // แสดงช่องค้นหา ปุ่มกรอง และรายการวงดนตรี
  return (
    <div>
      {/* แถบค้นหาและปุ่มดูวงที่กำลังติดตาม */}
      <div className="searchBar">
        <input
          className="searchInput"
          type="search"
          aria-label="ค้นหาชื่อวงดนตรี"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวงดนตรีหรือแนวเพลง"
        />

        {/* ปุ่มสลับระหว่างการแสดงวงทั้งหมดกับวงที่ติดตาม */}
        <button
          type="button"
          className={`followingFilterButton${showFollowingOnly ? " isActive" : ""}`}
          aria-pressed={showFollowingOnly}
          onClick={() => setShowFollowingOnly((isVisible) => !isVisible)}
        >
          {showFollowingOnly ? "แสดงทุกวง" : "ดูวงที่ติดตาม"} ({followingIds.length})
        </button>
      </div>

      {/* แสดงข้อความเมื่อไม่พบวงตามเงื่อนไขที่เลือก */}
      {visibleBands.length === 0 ? (
        <p className="emptyState">
          {showFollowingOnly
            ? "ยังไม่มีวงดนตรีที่กำลังติดตาม"
            : "ไม่พบวงดนตรีที่ตรงกับเงื่อนไข"}
        </p>
      ) : (
        /* แสดงการ์ดของวงที่ผ่านเงื่อนไขการค้นหาและการกรอง */
        <section className="band-grid">
          {visibleBands.map((band) => (
            // ส่งข้อมูลวงและ callback สำหรับปุ่มติดตามกับปุ่มไลก์ไปยังการ์ด
            <BandCard
              key={band.id}
              band={band}
              isFollowing={followingIds.includes(band.id)}
              onToggleFollowing={handleToggleFollowing}
              isLiked={(likeCounts[band.id] ?? 0) > 0}
              likeCount={likeCounts[band.id] ?? 0}
              onToggleLike={handleLike}
            />
          ))}
        </section>
      )}
    </div>
  );
}