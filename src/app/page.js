import Banner from "@/components/Banner";
import Image from "next/image";
import AllRoomsPage from "./rooms/page";

export default function Home() {
  return (
    <div>
      <Banner />
      <AllRoomsPage />
    </div>
  );
}
