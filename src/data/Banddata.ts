import type { Band } from "../types/Band";

export const bands: Band[] = [
    {
        id: 1,
        name: "Phumin (ภูมิมินท์)",
        genre: "โฟล์ก (Folk)",
        formedYear: 2565,
        description:
            "เพลงโฟล์กฟังสบายของภูมิมินท์ ผู้แต่งเนื้อร้อง ทำนอง และเรียบเรียงดนตรีด้วยตัวเอง",
        imageUrl: "/Phumin.jpg",
        members: [
            { id: 1, name: "ภูมิมินท์ บึงชารี", role: "ร้องนำ / แต่งเพลง / เรียบเรียง" ,imageUrl: "/Phumin.jpg" },
        ],
    },
    {
        id: 2,
        name: "LOSO (โลโซ)",
        genre: "ร็อก (Rock)",
        formedYear: 2539,
        description:
            "วงร็อกไทยในตำนาน ที่สร้างชื่อจากเพลงร็อกแอนด์โรลที่ติดหูคนไทยทั้งประเทศ",
        imageUrl: "/Loso.jpg",
        members: [
            {id: 1,name: "เสก (เสกสรรค์ ศุขพิมาย)",role: "ร้องนำ / กีตาร์ / แต่งเพลง",imageUrl: "/sek.webp"},
            { id: 2, name: "ใหญ่ (กิตติศักดิ์ โคตรคำ)", role: "กลอง",imageUrl:"/Yai.jpg" },
            { id: 3, name: "กลาง (ณัฐพล สุนทรานู)", role: "เบส" ,imageUrl: "/gak.png"  },
        ],
    },
    {
        id: 3,
        name: "Taitosmith (ไททศมิตร)",
        genre: "เพื่อชีวิต (Songs for Life)",
        formedYear: 2561,
        description:
            "วงเพื่อชีวิตร่วมสมัยที่นำเสนอเนื้อหาสะท้อนสังคมผ่านทำนองที่ฟังง่าย ",
        imageUrl: "/taitosmith2.jpg",
        members: [
            { id: 1, name: "จ๋าย (อิชณน์กร พึ่งเกียรติรัศมี)", role: "ร้องนำ / กีตาร์" ,imageUrl:"/jai.jpg" },
            { id: 2, name: "โฟร์โมส (ตฤณสิษฐ์ สิริพัชญาษานต์)", role: "ร้องนำ / กีตาร์" ,imageUrl:"/fomos.jpg" },
            { id: 3, name: "เจ (ธนกฤต สองเมือง)", role: "คีย์บอร์ด" ,imageUrl:"/j.jpg"},
            { id: 4, name: "มีน (ปัณณสิทธิ์ สุขโหตุ)", role: "กีตาร์โซโล่" ,imageUrl:"/meen.jpg"},
            { id: 5, name: "เจต (เจษฎา ปัญญา)", role: "เบส" ,imageUrl:"/jant.jpg"},
            { id: 6, name: "ตุ๊ก (พัฒนภูมิ ชอุ่มผล)", role: "กลอง" ,imageUrl:"/tok.jpg"},
        ],
    },
];
