"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <nav>
      <Link href="/">
        <div className="relative w-50 h-13">
          <Image
            src="/logo.png"
            alt="StayReserve Logo"
            fill
            className="object-contain"
          />
        </div>
      </Link>

      <ul>
        <li>
          <Link href="#">Recommended Places</Link>
        </li>

        <li>
          <Link href="#">About Us</Link>
        </li>

        <li>
          <Link href="#">Contact us</Link>
        </li>

        <li>
          <Link href="/bookings">Bookings</Link>
        </li>

        {status === "authenticated" ? (
          <li className="flex items-center gap-3">
            <span className="text-sm">{session.user?.name || session.user?.email}</span>
            <button type="button" className="login" onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
          </li>
        ) : (
          <li>
            <Link href="/login" className="login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
