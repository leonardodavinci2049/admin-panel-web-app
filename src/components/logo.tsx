import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/images/logo/logo-favicon.png"
        alt={(process.env.NEXT_PUBLIC_COMPANY_NAME || "Logo") + " Logo"}
        width={32}
        height={32}
        className="h-7 w-7 sm:h-8 sm:w-8"
      />
      <span className="text-lg font-bold sm:text-xl">
        {process.env.NEXT_PUBLIC_COMPANY_NAME}
      </span>
    </div>
  );
}
