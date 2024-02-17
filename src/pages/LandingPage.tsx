import TypewriterEffect from "typewriter-effect";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="text-black dark:text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Discover Your Dream Home</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
          <TypewriterEffect
            options={{
              strings: [
                "Welcome to Your New Home.",
                "Seamless Living Spaces.",
                "Elevate Your Lifestyle.",
                "Experience Luxury Living.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>

        <div className="text-sm md:text-xl font-light text-zinc-400">
          Luxury Living Awaits You.
        </div>
        <Link to={"properties"}>
          <Button
            variant={"default"}
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Find Your Perfect Property
          </Button>
        </Link>
      </div>
    </div>
  );
}
