import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

export default function Navigation() {
  const { pathname } = useLocation();
  return (
    <div className="hidden md:flex justify-end items-center gap-4 py-4 px-2">
      <Link to="/properties">
        <Button
          variant={pathname.startsWith("/properties") ? "default" : "secondary"}
          className="hover:bg-primary transition-colors duration-300"
        >
          Properties
        </Button>
      </Link>
      <Link to="/form">
        <Button
          variant={pathname.startsWith("/form") ? "default" : "secondary"}
          className="hover:bg-primary transition-colors duration-300"
        >
          New Property
        </Button>
      </Link>
      <ModeToggle />
    </div>
  );
}
