import { Github, Mail, Menu } from "lucide-react";
import { Button } from "./ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Button variant={"ghost"} size={"icon"} className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="w-[350px] sm:w-[420px] md:w-[540px] flex flex-col"
        >
          <SheetHeader>
            <SheetTitle className="text-primary text-center uppercase text-6xl sm:text-4xl py-6">
              ESTATE PROPERTY
            </SheetTitle>
          </SheetHeader>

          <div className="flex justify-center items-start mt-[25%]">
            <div className="w-full flex flex-col gap-6">
              <Link to={"/properties"} onClick={() => setOpen(false)}>
                <Button
                  className="w-full p-4"
                  variant={
                    pathname.startsWith("/properties") ? "default" : "secondary"
                  }
                >
                  PROPERTIES
                </Button>
              </Link>
              <Link to={"/new-property"} onClick={() => setOpen(false)}>
                <Button
                  className={"w-full p-4"}
                  variant={
                    pathname.startsWith("/new-property")
                      ? "default"
                      : "secondary"
                  }
                >
                  Add new property
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative mt-auto flex flex-col items-center justify-center text-center gap-2">
            <p className="text-zinc-400">Designed and Developed by Faris</p>
            <div className="flex gap-2 items-center text-primary">
              <a
                href="https://github.com/farism9q/real-estate-exercise"
                target="_blank"
              >
                <Github className="hover:text-primary/90" />
              </a>
              <a
                href="mailto:faris20alqahtani@gmail.com"
                target="_blank"
                title="Send me an email"
              >
                {" "}
                <Mail className="hover:text-primary/90" />
              </a>
            </div>
          </div>
          <div className="absolute bottom-0 right-5">
            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
