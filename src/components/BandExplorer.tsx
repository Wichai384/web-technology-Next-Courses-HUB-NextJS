"use client";

import { useState, type ChangeEvent } from "react";
import type { Band } from "../types/Band";
import BandCard from "./BandCard";

type BandExplorerProps = {
  bands: Band[];
};

export default function BandExplorer ({ bands }: BandExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [followingIds, setFollowingIds] = useState<number[]>([]);
  const [showFollowingOnly, setShowFollowingOnly] = useState(false);
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  const searchText = keyword.trim().toLowerCase();
  const visibleBands = bands.filter(
    (band) =>
      (band.name.toLowerCase().includes(searchText) ||
        band.genre.toLowerCase().includes(searchText)) &&
      (!showFollowingOnly || followingIds.includes(band.id)),
  );

  function handleToggleFollowing(id: number) {
    setFollowingIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((followingId) => followingId !== id)
        : [...prevIds, id],
    );
  }

  function handleLike(id: number) {
    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] ?? 0) + 1,
    }));
  }

  return (
    <div>
      <div className="searchBar">
        <input
          className="searchInput"
          type="search"
          aria-label="ค้นหาชื่อวงดนตรี"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวงดนตรีหรือแนวเพลง"
        />
        <button
          type="button"
          className={`followingFilterButton${showFollowingOnly ? " isActive" : ""}`}
          aria-pressed={showFollowingOnly}
          onClick={() => setShowFollowingOnly((isVisible) => !isVisible)}
        >
          {showFollowingOnly ? "แสดงทุกวง" : "ดูวงที่ติดตาม"}
        </button>
      </div>

      <p className="followingCount">
        ติดตามอยู่ {followingIds.length} วง
      </p>

      {visibleBands.length === 0 ? (
        <p className="emptyState">
          {showFollowingOnly
            ? "ยังไม่มีวงดนตรีที่กำลังติดตาม"
            : "ไม่พบวงดนตรีที่ตรงกับเงื่อนไข"}
        </p>
      ) : (
        <section className="band-grid">
          {visibleBands.map((band) => (
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