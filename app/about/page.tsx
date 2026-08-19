export default function AboutCourses() {
    type course = {
    id: number;
    code: string;
    title: string;
    credits: string;
    isOpen: boolean;
    };

    const courses: course[] = 
    [
        {
            id: 1,
            code: "10301231",
            title: "Web Technology",
            credits: "3",
            isOpen: true,
        },
        {
            id: 2,
            code: "10301232",
            title: "Database Systems",
            credits: "3",
            isOpen: false,
        },
    ];

    return (
        <html>
        <div className="box1">
            <h1>#### use 67 ###</h1>   
        </div>
            
        <div className="box2">
        <h1>#### use map ###</h1>
            <section className="courseGrid">{courses.map((course) => 
            (
                <article key={course.id} className="courseCard">
                    <h2>{course.title}</h2>
                    <p>รหัสวิชา: {course.code}</p>
                    <p>{course.credits} หน่วยกิต</p>
                    <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
                </article>
            ))}
            </section>
            </div>
        </html>
    );
}