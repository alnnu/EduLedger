"use  client";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import WalletButton from "../WalletButton";




const TopMenu = [
  {
    name: "Criar certificado", href: "/criar"
  },
  { name: "certificados", href: "/certificado" },
];

const Logo = () => {
  return (
    <Link href="/" className="flex space-x-2 py-3 items-center">
      <h1 className="text-xl font-bold flex items-center gap-2 text-white">
        <Image
          src="/favicon.ico"
          alt="logo"
          width={32}
          height={32}
        />
        EduLedger
      </h1>
    </Link>
  );
};


export default function Navbar() {

  return (
    <header className="py-4 px-8 z-50 bg-black">
      <div className=" justify-between min-w-full mx-3 md:mx-0">
        <nav className="hidden justify-between md:flex">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
          </div>
          <div className="items-center flex gap-6">
            <div className="flex items-center">
              {TopMenu.map((menu, idx) => (
                <a
                  key={idx}
                  className={cn(
                    "text-muted-foreground text-white",
                    navigationMenuTriggerStyle,
                    buttonVariants({ variant: "ghost" })
                  )}
                  href={menu.href}
                >
                  {menu.name}
                </a>
              ))}
              <WalletButton />
            </div>
          </div>
        </nav >

        {/* Mobile Menu */}
        < div className="block md:hidden" >
          <div className="flex items-center justify-between">
            <Logo />
            <Sheet>
              <div className="flex items-center">
                <SheetTrigger asChild>
                  <Button variant={"outline"} size={"icon"}>
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
              </div>
              <SheetContent className="overflow-y-auto px-4">
                <SheetHeader className="p-0 pt-4">
                  <SheetTitle>
                    <div className="flex items-center">
                      <Logo />
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-4 flex flex-col gap-0">
                  {TopMenu.map((menu, idx) => (
                    <a
                      key={idx}
                      href={menu.href}
                      className="font-semibold text-lg py-2"
                    >
                      {menu.name}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div >
      </div >
    </header >
  );
}
