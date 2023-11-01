import React from "react";
import Image from "next/image";
import doc from "@/components/assets/images/documents.png";
import reading from "@/components/assets/images/reading.png";
const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
        <Image src={doc} alt="Documents" className="object-contain" />
      </div>
      <div className="relative w-[400px] h-[400px] hidden md:block">
        <Image src={reading} alt="Reading" className="object-contain" />
      </div>
    </div>
  );
};

export default Heroes;
