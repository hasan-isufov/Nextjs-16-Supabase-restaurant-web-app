"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navList = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Book a Table", href: "/book-a-table" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const NavPage = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="hidden md:flex md:fixed w-full border-b-2 border-gray-500 bg-gray-800/20 justify-center z-50">
      <nav className="flex justify-center gap-6 py-4">
        {navList.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`px-3 py-2 text-md font-bold transition-colors
              ${
                pathname === item.href
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-white hover:text-green-500"
              }`}
          >
            {item.name}
          </Link>
        ))}

        {session ? (
          // Giriş yapılmışsa → Register ve Login linkleri gizlenir
          <div className="flex items-center gap-3">
            {session.user?.image && ( // ← undefined kontrolü
              <Image
                src={session.user.image}
                width={32}
                height={32}
                alt="Profil"
                className="rounded-full"
              />
            )}
            <span className="text-white font-bold">
              Welcome, {session.user?.name}!
            </span>
            <button
              onClick={() => signOut()}
              className="px-3 py-2 text-md font-bold text-white hover:text-red-500 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          // Giriş yapılmamışsa → Login ve Register göster
          <div className="flex gap-4">
            <Link
              href="/login"
              className={`px-3 py-2 text-md font-bold transition-colors
                ${pathname === "/login" ? "text-green-500 border-b-2 border-green-500" : "text-white hover:text-green-500"}`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`px-3 py-2 text-md font-bold transition-colors
                ${pathname === "/register" ? "text-green-500 border-b-2 border-green-500" : "text-white hover:text-green-500"}`}
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavPage;
