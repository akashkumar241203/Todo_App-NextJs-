"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { ModeToggle } from "../toggle-theme";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IconProps {
  className?: string;
}

function PowerIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v10" />
      <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
    </svg>
  );
}

export default function Navbar() {
  const [cookie, setCookie] = useState<string | undefined>();
  const cookieValue = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    setCookie(cookieValue);
    if (!cookieValue) {
      router.push("/login");
    }
  }, [cookieValue, router]);

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
    window.location.reload();
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 min-w-[370px] max-w-[470px]">
      <Card className="rounded-full shadow-md">
        <CardContent className="flex items-center justify-between px-4 py-2">
          <Link href="#">
            <div className="flex items-center gap-1 cursor-pointer">
              <Image src={"/logo.png"} width={45} height={45} alt={"logo"} />
              <h2 className="font-bold">TODO</h2>
            </div>
          </Link>
          <div className="space-x-1">
            <ModeToggle />
            {cookie && (
              <Button
                onClick={handleLogout}
                className="rounded-md"
                size="icon"
                variant="ghost"
              >
                <PowerIcon className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
