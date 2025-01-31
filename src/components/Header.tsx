'use client';
import { HomeIcon, UserRound } from 'lucide-react';
import Link from 'next/link';
import NavButton from '@/components/NavButton';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton icon={HomeIcon} label="Home" href="/home" />
          <Link
            href={'/home'}
            className="flex items-center gap-2 ml-0 justify-center"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0 ml-1">
              Computer Repair Shop
            </h1>
          </Link>
        </div>
        <div className="flex items-center">
          <Button variant="link" size="sm" className="rounded-full">
            <Link href="/tickets" className="font-semibold">
              Tickets
            </Link>
          </Button>
          <Button variant="link" size="sm" className="rounded-full">
            <Link href="/customers" className="font-semibold">
              Customers
            </Link>
          </Button>
          {session?.user ? (
            <Popover>
              <PopoverTrigger className="rounded-full p-2 hover:bg-[#1F2937]">
                <UserRound height={17} />
              </PopoverTrigger>
              <PopoverContent className="w-[100px]">
                <div className="flex flex-col w-full text-center">
                  <Link href="/profile" className="hover:bg-[#1F2937] py-1">
                    Profile
                  </Link>
                  <span
                    className="hover:bg-[#1F2937] cursor-pointer py-1"
                    onClick={() => signOut()}
                  >
                    Logout
                  </span>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <NavButton icon={UserRound} label="Login" href="/login" />
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
