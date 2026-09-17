"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Game } from "../../types/Game";

// รูปแบบข้อมูลชั่วคราวของฟอร์ม ก่อนแปลงกลับเป็น Game ใน GameExplorer.tsx
// ตัวเลขเป็น string เพราะค่าที่อ่านจาก input HTML จะเป็น string เสมอ
export type GameDraft = Omit<Game, "Storage_space" | "playtime"> & {
  Storage_space: string;
  playtime?: string;
};

// เก็บข้อความ error แยกตามชื่อช่อง input
type FormErrors = Partial<Record<keyof GameDraft, string>>;

// รับข้อมูลเกมเดิมตอนแก้ไข และส่งข้อมูลใหม่กลับไปที่ GameExplorer.tsx
type GameFormProps = {
  initialGame?: Game;
  existingGames: Game[];
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

// ค่าเริ่มต้นตอนกดเพิ่มเกมใหม่
const emptyDraft: GameDraft = {
  Name: "",
  Genre: "",
  Platform: "",
  Storage_space: "",
  playtime: "",
  Developer: "",
};

// แปลง Game จาก GameExplorer ให้เป็น GameDraft สำหรับแสดงใน input
function toDraft(game?: Game): GameDraft {
  if (!game) {
    return emptyDraft;
  }

  return {
    Name: game.Name,
    Genre: game.Genre,
    Platform: game.Platform,
    Storage_space: String(game.Storage_space),
    playtime: game.playtime === undefined ? "" : String(game.playtime),
    Developer: game.Developer,
  };
}

// ฟอร์มนี้ใช้ร่วมกันทั้งการเพิ่มเกมใหม่และแก้ไขเกมเดิม
export default function GameForm({
  initialGame,
  existingGames,
  onSave,
  onCancel,
}: GameFormProps) {
  // draft คือค่าที่กำลังกรอก ส่วน errors คือข้อความแจ้งเตือนของแต่ละช่อง
  const [draft, setDraft] = useState<GameDraft>(() => toDraft(initialGame));
  const [errors, setErrors] = useState<FormErrors>({});

  // ตรวจสอบข้อมูลทุกช่องก่อนอนุญาตให้ส่ง draft ไป GameExplorer.tsx
  function validate(value: GameDraft): FormErrors {
    const nextErrors: FormErrors = {};
    const storageSpace = Number(value.Storage_space);
    const playtime = Number(value.playtime);

    if (value.Name.trim() === "") {
      nextErrors.Name = "กรุณาระบุชื่อเกม";
    }

    // ตรวจชื่อซ้ำโดยไม่สนตัวพิมพ์เล็ก/ใหญ่ และไม่นับเกมที่กำลังแก้ไข
    const normalizedName = value.Name.trim().toLowerCase();
    const duplicateName = existingGames.some(
      (game) =>
        game.Name !== initialGame?.Name &&
        game.Name.trim().toLowerCase() === normalizedName,
    );
    if (normalizedName !== "" && duplicateName) {
      nextErrors.Name = "มีเกมชื่อนี้อยู่แล้ว กรุณาใช้ชื่ออื่น";
    }
    if (value.Genre.trim() === "") {
      nextErrors.Genre = "กรุณาระบุแนวเกม";
    }
    if (value.Platform.trim() === "") {
      nextErrors.Platform = "กรุณาระบุแพลตฟอร์มที่รองรับ";
    }
    if (
      value.Storage_space.trim() === "" ||
      !Number.isInteger(storageSpace) ||
      storageSpace < 1
    ) {
      nextErrors.Storage_space = "กรุณาระบุพื้นที่จัดเก็บอย่างน้อย 1 GB";
    }
    if (
      value.playtime?.trim() === "" ||
      !Number.isInteger(playtime) ||
      playtime < 0
    ) {
      nextErrors.playtime = "กรุณาระบุเวลาเล่นตั้งแต่ 0 ชั่วโมงขึ้นไป";
    }
    if (value.Developer.trim() === "") {
      nextErrors.Developer = "กรุณาระบุนักพัฒนา";
    }

    return nextErrors;
  }

  // อ่าน name/value จาก input แล้วอัปเดต field ที่ตรงกันใน draft
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((currentDraft) => ({ ...currentDraft, [name]: value }));
  }

  // หยุดการ reload หน้าเว็บ ตรวจสอบข้อมูล และเรียก onSave เมื่อข้อมูลถูกต้อง
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form className="courseForm" onSubmit={handleSubmit} noValidate>
      {/* ช่องกรอกข้อมูลเกม: ทุกช่องใช้ handleChange ร่วมกัน */}
      <div className="courseField">
        <label htmlFor="Name">ชื่อเกม:</label>
        <input
          id="Name"
          name="Name"
          type="text"
          value={draft.Name}
          onChange={handleChange}
          aria-invalid={!!errors.Name}
          aria-describedby={errors.Name ? "name-error" : undefined}
        />
        {errors.Name ? <p id="name-error">{errors.Name}</p> : null}
      </div>

      <div className="courseField">
        <label htmlFor="Genre">แนวเกม:</label>
        <input
          id="Genre"
          name="Genre"
          type="text"
          value={draft.Genre}
          onChange={handleChange}
          aria-invalid={!!errors.Genre}
          aria-describedby={errors.Genre ? "genre-error" : undefined}
        />
        {errors.Genre ? <p id="genre-error">{errors.Genre}</p> : null}
      </div>

      <div className="courseField">
        <label htmlFor="Platform">แพลตฟอร์ม:</label>
        <input
          id="Platform"
          name="Platform"
          type="text"
          value={draft.Platform}
          onChange={handleChange}
          aria-invalid={!!errors.Platform}
          aria-describedby={errors.Platform ? "platform-error" : undefined}
        />
        {errors.Platform ? <p id="platform-error">{errors.Platform}</p> : null}
      </div>

      <div className="courseField">
        <label htmlFor="Storage_space">พื้นที่จัดเก็บ (GB):</label>
        <input
          id="Storage_space"
          name="Storage_space"
          type="number"
          min="1"
          step="1"
          value={draft.Storage_space}
          onChange={handleChange}
          aria-invalid={!!errors.Storage_space}
          aria-describedby={errors.Storage_space ? "storage-error" : undefined}
        />
        {errors.Storage_space ? (
          <p id="storage-error">{errors.Storage_space}</p>
        ) : null}
      </div>

      <div className="courseField">
        <label htmlFor="playtime">เวลาเล่น (ชั่วโมง):</label>
        <input
          id="playtime"
          name="playtime"
          type="number"
          min="0"
          step="1"
          value={draft.playtime ?? ""}
          onChange={handleChange}
          aria-invalid={!!errors.playtime}
          aria-describedby={errors.playtime ? "playtime-error" : undefined}
        />
        {errors.playtime ? <p id="playtime-error">{errors.playtime}</p> : null}
      </div>

      <div className="courseField">
        <label htmlFor="Developer">นักพัฒนา:</label>
        <input
          id="Developer"
          name="Developer"
          type="text"
          value={draft.Developer}
          onChange={handleChange}
          aria-invalid={!!errors.Developer}
          aria-describedby={errors.Developer ? "developer-error" : undefined}
        />
        {errors.Developer ? <p id="developer-error">{errors.Developer}</p> : null}
      </div>

      {/* onSubmit ส่ง draft ไป GameExplorer ส่วน onCancel ยกเลิกการแก้ไข */}
      <div className="courseFormActions">
        <button
          className="courseActionButton courseActionButton--save"
          type="submit"
        >
          บันทึก
        </button>
        {initialGame ? (
          <button className="courseActionButton" type="button" onClick={onCancel}>
            ยกเลิก
          </button>
        ) : null}
      </div>
    </form>
  );
}
