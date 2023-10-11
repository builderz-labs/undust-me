import BrandW from "../public/images/builderz-white.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Logo = ({ isDark }: any) => {


  return (
    <Link href="/" passHref>
      <Image
        src={BrandW}
        alt=""
        className="w-32 lg:w-64 max-w-[140px] cursor-pointer"
      />
    </Link>
  );
};
