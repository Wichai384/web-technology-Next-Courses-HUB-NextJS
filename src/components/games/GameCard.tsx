import Link from "next/link";
import type { Game } from "../../types/Game";

// รับข้อมูล Game จาก GameExplorer และรับฟังก์ชันจัดการปุ่มจาก parent
type GameCardProps = {
  game: Game;
  isFavorite?: boolean;
  onToggleFavorite?: (name: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

// แสดงการ์ดเกม 1 รายการ
// เชื่อมกับ GameExplorer.tsx ที่ส่งข้อมูลและ callback เข้ามา
// ลิงก์ชื่อเกมไปยัง app/games/[gameID]/page.tsx
export default function GameCard({
  game,
  isFavorite = false,
  onToggleFavorite,
  onEdit,
  onDelete,
}: GameCardProps) {
  // แสดงข้อมูลเกมและปุ่มที่ผู้ใช้สามารถกดจัดการได้
  return (
    <article className="courseCard">
      {/* ชื่อเกมกดไปยัง app/games/[gameID]/page.tsx โดยใช้ชื่อเป็น URL */}
      <h2>
        <Link href={`/games/${encodeURIComponent(game.Name)}`}>
          {game.Name}
        </Link>
      </h2>

      {/* ข้อมูลหลักของเกม */}
      <p>แนวเกม: {game.Genre}</p>
      <p>แพลตฟอร์ม: {game.Platform}</p>
      <p>พื้นที่จัดเก็บ: {game.Storage_space} GB</p>
      <p>เวลาเล่น: {game.playtime ?? "ไม่ระบุ"} ชั่วโมง</p>
      <p>นักพัฒนา: {game.Developer}</p>

      {/* ปุ่มเหล่านี้เรียกฟังก์ชันที่ส่งมาจาก GameExplorer.tsx */}
      <div className="courseCardActions">
        {onToggleFavorite ? (
          <button
            type="button"
            className={`favoriteButton${isFavorite ? " isActive" : ""}`}
            onClick={() => onToggleFavorite(game.Name)}
            aria-pressed={isFavorite}
          >
            {isFavorite ? "ลบจากรายการโปรด" : "รายการโปรด"}
          </button>
        ) : null}

        {onEdit ? (
          <button type="button" className="courseActionButton" onClick={onEdit}>
            แก้ไข
          </button>
        ) : null}

        {onDelete ? (
          <button
            type="button"
            className="courseActionButton courseActionButton--delete"
            onClick={onDelete}
          >
            ลบ
          </button>
        ) : null}
      </div>
    </article>
  );
}
