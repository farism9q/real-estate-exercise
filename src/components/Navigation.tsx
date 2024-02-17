import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import Heading from "./Heading";

export default function Navigation() {
  const { pathname } = useLocation();
  return (
    <div className="hidden md:flex items-center justify-between px-6 sticky top-0 bg-muted z-10">
      <Heading title="ESTATE PROPERTY" />

      <div className="flex justify-end items-center gap-4 py-4 px-2">
        <Link to="/properties">
          <Button
            variant={
              pathname.startsWith("/properties") ? "default" : "secondary"
            }
            className="hover:bg-primary hover:text-white transition-colors duration-300"
          >
            Properties
          </Button>
        </Link>
        <Link to="/new-property">
          <Button
            variant={
              pathname.startsWith("/new-property") ? "default" : "secondary"
            }
            className="hover:bg-primary hover:text-white transition-colors duration-300"
          >
            New Property
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
}
