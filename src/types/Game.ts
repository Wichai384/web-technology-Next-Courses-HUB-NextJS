// โครงสร้างข้อมูลเกมมาตรฐานที่ใช้ร่วมกันทั้ง data, components และ pages
export type Game = {
  Name: string; //PK ตัวระบุหลัก
  Genre: string;
  Platform: string;
  Storage_space: number;
  playtime?: number;
  Developer: string;
};

/*
การพิ่มเกม = กดแก้ไข -> กรอกข้อมูล -> กดบันทึก -> จะตรวจสอบ validate -> ถ้าผ่านจะทำ draft และส่งให้ Explorer 
-> Explorer จะทำ handleCreate(draft) -> setGameList([...gameList, newGame]) -> ส่งไปให้ card
*/

/*
แก้ไข คือ กดแก้GameCard -> ค้าหาข้อมูลที่อยู่ใน Gamelist [] ตามชื่อ -> ขึ้นมาแสดง ในช่องกรอกข้อมูล 
-> พอแก้ไขเสร็จ กดบันทึก ->ส่งไปตรวจ ->ถ้าผ่าน ส่งดราฟ 
-> เข้า Explorer เพื่ออัปเดตข้อมูล และเรียก handleUpdate(editingName, draft) map โดยใช้ชื่อเกมเดิมหาและแทนที่ข้อมูล 
-> ส่งไปให้ card
*/

/*
ลบเกม คือ กดลบ GameCard -> ส่งชื่อเกมไป handleDelete(name) -> filter ชื่อเกมออกจาก gamelist [] -> ส่งไปให้ card
*/

