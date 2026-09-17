import type { Game } from "../types/Game";

// ข้อมูลเริ่มต้นที่ส่งจาก app/games/page.tsx เข้า GameExplorer.tsx
export const games: Game[] = [
    {
        Name: "WARDOGS",
        Genre: "Action-Tactical",
        Platform: "PC",
        Storage_space: 50,
        playtime: 50,
        Developer: "BULKHEAD",
    },
    {
        Name: "PUBG:BATTLEGROUNDS",
        Genre: "FPS",
        Platform: "PC",
        Storage_space: 50,
        playtime: 200,
        Developer: "PUBG Corporation",
    },
];