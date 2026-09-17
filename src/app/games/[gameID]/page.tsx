import { games } from "@/data/Game";
import type { Metadata } from "next";

// gameID ต้องตรงกับโฟลเดอร์ [gameID] และเป็นชื่อที่ส่งมาจาก GameCard.tsx
type GamePageProps = {
  params: Promise<{ gameID: string }>;
};

// สร้างชื่อหน้าเว็บตามข้อมูลใน data/Game.ts
export async function generateMetadata(
  { params }: GamePageProps,
): Promise<Metadata> {
  const { gameID } = await params;
  const game = games.find((item) => item.Name === gameID);

  return {
    title: game ? game.Name : "ไม่พบเกม 404",
  };
}

// แสดงรายละเอียดเกมตาม gameID ที่ส่งมาจาก URL ของ GameCard.tsx
export default async function GamePage({ params }: GamePageProps) {
  const { gameID } = await params;
  const game = games.find((item) => item.Name === gameID);

  if (!game) {
    return <h1>ไม่พบเกม 404</h1>;
  }

  return (
    <article className="courseDetail">
      <h1>{game.Name}</h1>
      <p>แนวเกม: {game.Genre}</p>
      <p>แพลตฟอร์ม: {game.Platform}</p>
      <p>พื้นที่จัดเก็บ: {game.Storage_space} GB</p>
      <p>เวลาเล่น: {game.playtime ?? "ไม่ระบุ"} ชั่วโมง</p>
      <p>ผู้พัฒนา: {game.Developer}</p>
    </article>
  );
}
