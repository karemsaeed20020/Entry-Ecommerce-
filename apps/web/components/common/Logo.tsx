import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const Logo = ({className, logoUrl} : {className?: string; logoUrl?: string | null}) => {
  return (
    <Link href={'/'}>
        <Image
        src={logoUrl || 'https://github.com/noorjsdivs/entry-ecommerce-app-free/blob/main/apps/web/assets/images/logo.png?raw=true'}
        alt="logo"
        className={cn("w-32 lg:w-44", className)}
        width={176}
        height={40}
        style={{ width: "auto", height: "auto" }}
        priority
         />
    </Link>
  )
}

export default Logo