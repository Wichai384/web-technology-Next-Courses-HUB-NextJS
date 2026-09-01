
import BandCard from "../../components/BandCard";
import { bands } from "../../data/Banddata";

export default function FavoriteBandsPage() {
  return (
    <main>
      <h1>วงดนตรีที่ชื่นชอบ</h1>

      <section className="band-grid">
        {bands.map((band) => (
          <BandCard key={band.id} band={band} />
        ))}
      </section>
    </main>
  );
}
