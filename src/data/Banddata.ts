import type { Band } from "../types/Band";

export const bands: Band[] = [
    {
        id: 1,
        name: "Phumin (ภูมิมินท์)",
        genre: "โฟล์ก (Folk)",
        formedYear: 2565,
        description:
            "เพลงโฟล์กฟังสบายของภูมิมินท์ ผู้แต่งเนื้อร้อง ทำนอง และเรียบเรียงดนตรีด้วยตัวเอง",
        imageUrl: "/images/bands/Phumin/Phumin.jpg",
        members: [
            { id: 1, name: "ภูมิมินท์ บึงชารี", role: "ร้องนำ / แต่งเพลง / เรียบเรียง" ,imageUrl: "/images/bands/Phumin/Phumin.jpg" },
        ],
    },
    {
        id: 2,
        name: "LOSO (โลโซ)",
        genre: "ร็อก (Rock)",
        formedYear: 2539,
        description:
            "วงร็อกไทยในตำนาน ที่สร้างชื่อจากเพลงร็อกแอนด์โรลที่ติดหูคนไทยทั้งประเทศ",
        imageUrl: "/images/bands/LOSO/Loso.jpg",
        members: [
            {id: 1,name: "เสก (เสกสรรค์ ศุขพิมาย)",role: "ร้องนำ / กีตาร์ / แต่งเพลง",imageUrl: "/images/bands/LOSO/sek.webp"},
            { id: 2, name: "ใหญ่ (กิตติศักดิ์ โคตรคำ)", role: "กลอง",imageUrl:"/images/bands/LOSO/Yai.jpg" },
            { id: 3, name: "กลาง (ณัฐพล สุนทรานู)", role: "เบส" ,imageUrl: "/images/bands/LOSO/gak.png"  },
        ],
    },
    {
        id: 3,
        name: "Taitosmith (ไททศมิตร)",
        genre: "เพื่อชีวิต (Songs for Life)",
        formedYear: 2561,
        description:
            "วงเพื่อชีวิตร่วมสมัยที่นำเสนอเนื้อหาสะท้อนสังคมผ่านทำนองที่ฟังง่าย ",
        imageUrl: "/images/bands/Taitosmith/taitosmith2.jpg",
        members: [
            { id: 1, name: "จ๋าย (อิชณน์กร พึ่งเกียรติรัศมี)", role: "ร้องนำ / กีตาร์" ,imageUrl:"/images/bands/Taitosmith/jai.jpg" },
            { id: 2, name: "โฟร์โมส (ตฤณสิษฐ์ สิริพัชญาษานต์)", role: "ร้องนำ / กีตาร์" ,imageUrl:"/images/bands/Taitosmith/fomos.jpg" },
            { id: 3, name: "เจ (ธนกฤต สองเมือง)", role: "คีย์บอร์ด" ,imageUrl:"/images/bands/Taitosmith/j.jpg"},
            { id: 4, name: "มีน (ปัณณสิทธิ์ สุขโหตุ)", role: "กีตาร์โซโล่" ,imageUrl:"/images/bands/Taitosmith/meen.jpg"},
            { id: 5, name: "เจต (เจษฎา ปัญญา)", role: "เบส" ,imageUrl:"/images/bands/Taitosmith/jant.jpg"},
            { id: 6, name: "ตุ๊ก (พัฒนภูมิ ชอุ่มผล)", role: "กลอง" ,imageUrl:"/images/bands/Taitosmith/tok.jpg"},
        ],
    },
];
