import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
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

        <li>
          <Link href="/login" className="login">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
