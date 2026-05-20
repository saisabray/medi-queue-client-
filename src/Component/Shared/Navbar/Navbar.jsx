"use client";
import { useState } from "react";
import { Link, Button, Avatar } from "@heroui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOut";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Tutors", href: "/all-tutors" },
  { name: "Add Tutor", href: "/add-tutor" },
  { name: "My Tutors", href: "/my-tutors" },
  { name: "My Booked Sessions", href: "/my-booked-sessions" },
];

export default function Navbar({ user}) {

  

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <header className="mx-auto flex h-20 max-w-11/12 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt="MediQueue"
              width={180}
              height={60}
              className="object-contain"
            />
          </Link>
        </div>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-base font-medium transition duration-300 no-underline  ${
                  pathname === link.href
                    ? "text-blue-600 border-b-2 border-blue-600 rounded-none"
                    : "text-slate-700 hover:text-cyan-500"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {!user && (
          <div className="hidden items-center gap-4 md:flex border-b-0">
            <Link href="/login" className="no-underline">
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600"
              >
                Login
              </Button>
            </Link>

            <Link href="/signup" className="no-underline">
              <Button className="w-full bg-linear-to-r from-blue-600 to-cyan-500 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
        {user && (
          <div className="flex justify-between items-center gap-3">
            <div>
              <Avatar size="sm">
                <Avatar.Image
                  alt={user?.name}
                  src={user?.image}
                  referrerPolicy="no-referrer"
                />
                <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
            </div>
            <SignOutButton />
          </div>
        )}
      </header>

      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <ul className="flex flex-col items-center gap-4 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-base font-medium no-underline ${
                    pathname === link.href ? "text-blue-600" : "text-slate-700"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <div className="mt-4 flex justify-center items-center gap-3 w-4/5 ">
              {!user && (
                <div className="hidden items-center gap-4 md:flex border-b-0">
                  <Link href="/login" className="no-underline">
                    <Button
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link href="/signup" className="no-underline">
                    <Button className="w-full bg-linear-to-r from-blue-600 to-cyan-500 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
              {user && (
                <div className="flex justify-between items-center gap-3">
                  <div>
                    <Avatar size="sm">
                      <Avatar.Image
                        alt={user?.name}
                        src={user?.image}
                        referrerPolicy="no-referrer"
                      />
                      <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
                    </Avatar>
                  </div>
                  <SignOutButton />
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}
