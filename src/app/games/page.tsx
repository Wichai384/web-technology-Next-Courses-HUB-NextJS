import GameExplorer from "../../components/games/GameExplorer";
import { games } from "../../data/Game";

// ชื่อที่แสดงบนแท็บของหน้าเกม
export const metadata = {
  title: "เพิ่มเกม",
};

// หน้าแรกของระบบจัดการเกม
// อ่าน games จาก data/Game.ts แล้วส่งให้ GameExplorer.tsx
export default function GamesPage() {
  return (
    <main>
      <GameExplorer games={games} />
    </main>
  );
}