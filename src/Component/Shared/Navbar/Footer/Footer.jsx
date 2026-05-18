"use client";
import {
  Envelope,
  LogoFacebook,
  LogoGithub,
  LogoTelegram,
} from "@gravity-ui/icons";
import { MapPin, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white mt-20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/assets/images/logo.png"
              alt="MediQueue Logo"
              width={250}
              height={250}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-5">Learning Services</h3>

            <ul className="space-y-3 text-slate-300">
              <li>
                <Link href="/tutors" className="hover:text-cyan-400 transition">
                  Online Tutoring
                </Link>
              </li>

              <li>
                <Link href="/tutors" className="hover:text-cyan-400 transition">
                  Offline Classes
                </Link>
              </li>

              <li>
                <Link href="/tutors" className="hover:text-cyan-400 transition">
                  Academic Coaching
                </Link>
              </li>

              <li>
                <Link href="/tutors" className="hover:text-cyan-400 transition">
                  Programming Mentorship
                </Link>
              </li>

              <li>
                <Link href="/tutors" className="hover:text-cyan-400 transition">
                  Skill Development
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-5">Contact Information</h3>

            <div className="space-y-4 text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-cyan-400" />

                <p>Dhaka, Bangladesh</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400" />

                <p>+880 1234-567890</p>
              </div>

              <div className="flex items-center gap-3">
                <Envelope className="w-5 h-5 text-cyan-400" />

                <p>support@mediqueue.com</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-5">Follow Us</h3>

            <div className="flex items-center gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition duration-300"
              >
                <LogoFacebook className="w-5 h-5" />
              </Link>

              <Link
                href="https://twitter.com"
                target="_blank"
                className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 transition duration-300"
              >
                <X className="w-5 h-5" />
              </Link>

              <Link
                href="https://telegram.org"
                target="_blank"
                className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-500 transition duration-300"
              >
                <LogoTelegram className="w-5 h-5" />
              </Link>

              <Link
                href="https://github.com"
                target="_blank"
                className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gray-700 transition duration-300"
              >
                <LogoGithub className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-slate-400 mt-6 leading-relaxed">
              Stay connected with MediQueue for tutor updates, learning
              resources, and educational tips.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm text-center">
            © {new Date().getFullYear()} MediQueue. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link
              href="/privacy-policy"
              className="hover:text-cyan-400 transition"
            >
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-cyan-400 transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
