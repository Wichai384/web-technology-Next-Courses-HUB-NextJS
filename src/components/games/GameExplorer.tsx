"use client";

import { useState, type ChangeEvent } from "react";
import type { Game } from "../../types/Game";
import GameCard from "./GameCard";
import GameForm, { type GameDraft } from "./GameForm";

// รับรายการเริ่มต้นจาก app/games/page.tsx ซึ่งอ่านข้อมูลจาก data/Game.ts
type GameExplorerProps = {
  games: Game[];
};

// เป็น parent component ของ GameForm และ GameCard
// ทำหน้าที่เก็บ state และเชื่อมการทำงานของฟอร์มกับการ์ดเกมเข้าด้วยกัน
export default function GameExplorer({ games }: GameExplorerProps) {
  // รายการเกมที่แสดงอยู่ในหน้าเว็บ
  const [gameList, setGameList] = useState<Game[]>(games);

  // คำค้นหาและชื่อของเกมที่กำลังแก้ไข
  const [keyword, setKeyword] = useState("");
  const [editingName, setEditingName] = useState<string | null>(null);

  // ชื่อของเกมที่ถูกเพิ่มเป็นรายการโปรด
  const [favoriteNames, setFavoriteNames] = useState<string[]>([]);

  // เพิ่มเกมใหม่จากข้อมูล GameDraft ที่ส่งมาจาก GameForm.tsx
  function handleCreate(draft: GameDraft) {
    const newGame: Game = {
      Name: draft.Name.trim(),
      Genre: draft.Genre.trim(),
      Platform: draft.Platform.trim(),
      Storage_space: Number(draft.Storage_space),
      playtime: Number(draft.playtime),
      Developer: draft.Developer.trim(),
    };

    setGameList((currentGames) => [...currentGames, newGame]);
  }

  // ลบเกมตามชื่อ และลบชื่อเดียวกันออกจากรายการโปรด
  function handleDelete(name: string) {
    setGameList((currentGames) =>
      currentGames.filter((game) => game.Name !== name),
    );
    setFavoriteNames((currentNames) =>
      currentNames.filter((favoriteName) => favoriteName !== name),
    );
  }

  // แก้ไขข้อมูลเกมเดิมตามชื่อ
  function handleUpdate(name: string, draft: GameDraft) {
    setGameList((currentGames) =>
      currentGames.map((game) =>
        game.Name === name
          ? {
              Name: draft.Name.trim(),
              Genre: draft.Genre.trim(),
              Platform: draft.Platform.trim(),
              Storage_space: Number(draft.Storage_space),
              playtime: Number(draft.playtime),
              Developer: draft.Developer.trim(),
            }
          : game,
      ),
    );

    setEditingName(null);
  }

  // เป็น callback หลักที่ GameForm เรียกหลัง validation ผ่าน
  // ถ้าไม่มี editingName จะเพิ่มใหม่ ถ้ามีจะอัปเดตเกมเดิม
  function handleSave(draft: GameDraft) {
    if (editingName === null) {
      handleCreate(draft);
      return;
    }

    handleUpdate(editingName, draft);
  }

  // รับค่าจากช่องค้นหาใน JSX แล้วเก็บไว้ใน keyword
  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  // สลับสถานะรายการโปรดโดยใช้ชื่อจาก GameCard.tsx
  function handleToggleFavorite(name: string) {
    setFavoriteNames((currentNames) =>
      currentNames.includes(name)
        ? currentNames.filter((favoriteName) => favoriteName !== name)
        : [...currentNames, name],
    );
  }

  // ค้นหาเกมเดิมด้วยชื่อแล้วส่งเข้า GameForm ตอนแก้ไข
  const editingGame = gameList.find((game) => game.Name === editingName);

  // ////////////////////////////////////////// //
  //     โดนถามรอบแล้ว                          //
  // ///////////////////////////////////////// //
  // สร้างรายการที่จะแสดง โดยค้นจากชื่อ แนวเกม แพลตฟอร์ม หรือผู้พัฒนา
  const searchText = keyword.trim().toLowerCase();
  const visibleGames = gameList.filter((game) =>
    [game.Name, game.Genre, game.Platform, game.Developer].some((value) =>
      value.toLowerCase().includes(searchText),
    ),
  );

  return (
    <div>
      {/* GameForm.tsx ส่งข้อมูลกลับด้วย onSave และยกเลิกด้วย onCancel */}
      <GameForm
        key={editingName ?? "new"}
        initialGame={editingGame}
        existingGames={gameList}
        onSave={handleSave}
        onCancel={() => setEditingName(null)}
      />

      {/* ช่องค้นหา: ทุกครั้งที่พิมพ์จะเรียก handleKeywordChange */}
      <div className="searchBar">
        <input
          className="searchInput"
          type="search"
          aria-label="ค้นหาเกม"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อเกม แนวเกม หรือแพลตฟอร์ม"
        />
      </div>

      {/* แสดง visibleGames โดยสร้าง GameCard.tsx ให้กับเกมแต่ละรายการ */}
      {visibleGames.length === 0 ? (
        <p>ไม่พบเกมที่ตรงกับเงื่อนไข</p>
      ) : (
        <section className="courseGrid">
          {visibleGames.map((game) => (
            <GameCard
              key={game.Name}
              game={game}
              isFavorite={favoriteNames.includes(game.Name)}
              onToggleFavorite={handleToggleFavorite}
              onEdit={() => setEditingName(game.Name)}
              onDelete={() => handleDelete(game.Name)}
            />
          ))}
        </section>
      )}
    </div>
  );
}
