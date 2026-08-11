import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="docs-brand" aria-label="Aramon UI home">
      <span className="docs-mark" aria-hidden="true">
        <Image src="/aramon-mark.svg" width={22} height={22} alt="" unoptimized />
      </span>
      <span>Aramon UI</span>
    </Link>
  );
}
