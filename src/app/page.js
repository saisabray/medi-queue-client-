import WhyChooseUs from "@/Component/Choose";
import AvailableTutors from "@/Component/Featured-Card/AvailableTutors";
import Hero from "@/Component/Hero";
import Stats from "@/Component/Stats";
import { getAnimationClass } from "@/lib/utilis/animation";

export default function Home() {
  return (
    <div className={getAnimationClass("pageLoad")}>
      <Hero />
      <AvailableTutors />
      <WhyChooseUs />
      <Stats />
    </div>
  );
}

