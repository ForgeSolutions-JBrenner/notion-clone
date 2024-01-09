import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/notionLogoLight.svg"
        height={100}
        width={100}
        alt="Logo"
        className="dark:hidden"
      />
      <Image
        src="/notionLogoDark.svg"
        height={100}
        width={100}
        alt="Logo"
        className="hidden dark:block"
      />
    </div>
  );
};
