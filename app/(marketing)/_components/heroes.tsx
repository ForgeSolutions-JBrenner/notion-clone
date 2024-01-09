import Image from "next/image";
import doc from "@/components/assets/images/documents.png";
import reading from "@/components/assets/images/reading.png";
import docDark from "@/components/assets/images/documents-dark.png";
import readingDark from "@/components/assets/images/reading-dark.png";
export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
          <Image
            src={doc}
            alt="Documents"
            className="object-contain dark:hidden "
          />
          <Image src={docDark} alt="Documents" className="object-contain" />
        </div>
        <div className="relative w-[400px] h-[400px] hidden md:block">
          <Image
            src={reading}
            alt="Reading"
            className="object-contain dark:hidden "
          />
          <Image src={readingDark} alt="Reading" className="object-contain" />
        </div>
      </div>
    </div>
  );
};
