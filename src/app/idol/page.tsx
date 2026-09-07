
import { bands } from "../../data/Banddata";
import BandExplorer from "../../components/BandExplorer";

export const metadata = {
  title: "วงดนตรีที่ชื่นชอบ",
};

export default function FavoriteBandsPage() {
  return (
    <main>
      <BandExplorer bands={bands} />
    </main>
  );
}
