"use client";

import Image from "next/image";
import Link from "next/link";
import error from "@/components/assets/images/error.png";
import errorDark from "@/components/assets/images/error-dark.png";
import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={error}
        height="300"
        width="300"
        alt="Error"
        className="dark:hidden"
      />
      <Image
        src={errorDark}
        height="300"
        width="300"
        alt="Error"
        className="dark:block hidden"
      />
      <h2 className="text-xl font-medium max-w-xl text-center">
        Something went wrong, this error automatically generated a support
        ticket. We are on it...
      </h2>
      <Button asChild>
        <Link href="/documents">Go back</Link>
      </Button>
    </div>
  );
};

export default Error;
