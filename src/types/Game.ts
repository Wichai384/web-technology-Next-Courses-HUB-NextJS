// โครงสร้างข้อมูลเกมมาตรฐานที่ใช้ร่วมกันทั้ง data, components และ pages
export type Game = {
  Name: string;
  Genre: string;
  Platform: string;
  Storage_space: number;
  playtime?: number;
  Developer: string;
};