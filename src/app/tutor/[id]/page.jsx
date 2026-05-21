import { Card } from "@heroui/react";
import Image from "next/image";
import {
  MapPin,
  GraduationCap,
  Clock,
  CalendarDays,
  BookOpen,
  MonitorPlay,
} from "lucide-react";
import Booking from "@/Component/BookingModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getAnimationClass } from "@/lib/utilis/animation";

export const metadata = {
  title: "MediQueue | Tutor Details",
  description:
    "View detailed information about a specific tutor on the MediQueue platform.",
};
const TutorDetails = async ({ params }) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/all/${id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const tutor = await res.json();

  return (
    <div className={`max-w-5xl mx-auto container px-5 py-6 ${getAnimationClass("pageLoad")}`}>
      <h2 className="text-3xl font-bold text-gray-900 my-8">Tutor Details</h2>
      <div className=" flex-1 flex flex-col  gap-6">
        <Card className="p-8 border-none shadow-xl rounded-3xl bg-white flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left">
          <div className="relative h-40 w-40 sm:h-48 sm:w-48 shrink-0 overflow-hidden rounded-full shadow-2xl border-4 border-white bg-white mx-auto sm:mx-0">
            <Image
              className="object-cover"
              fill
              src={tutor?.tutorPhoto}
              alt={tutor?.tutorName}
            />
          </div>

          <div className="flex flex-col flex-1 w-full">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-black">
                {tutor?.tutorName}
              </h1>

              <h2 className="text-base sm:text-lg font-medium text-gray-500 mt-2">
                {tutor?.tutorEmail}
              </h2>

              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-5">
                <span className="text-base sm:text-lg font-semibold px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                  {tutor?.subject}
                </span>

                <span className="text-base sm:text-lg font-semibold px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                  {tutor?.experience}
                </span>

                <span className="text-base sm:text-lg font-semibold px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                  Slots: {tutor?.totalSlot}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center sm:justify-start">
              <Booking tutor={tutor} />
            </div>
          </div>
        </Card>

        <Card className="p-8 sm:p-10 border-none shadow-xl rounded-3xl bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
            About Me
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
            {tutor?.bio ||
              "This tutor has not provided a biography yet. However, they are highly qualified in their respective subjects. Book a session to know more!"}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 border-b pb-4">
            Session Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-gray-700">
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-gray-100">
              <div className="bg-blue-100 p-3 rounded-2xl text-blue-600 shadow-sm">
                <GraduationCap size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">
                  Institution
                </p>
                <p className="font-bold text-gray-900 text-lg">
                  {tutor.institution}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-gray-100">
              <div className="bg-red-100 p-3 rounded-2xl text-red-600 shadow-sm">
                <MapPin size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">Location</p>
                <p className="font-bold text-gray-900 text-lg">
                  {tutor.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-gray-100">
              <div className="bg-purple-100 p-3 rounded-2xl text-purple-600 shadow-sm">
                <MonitorPlay size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">
                  Teaching Mode
                </p>
                <p className="font-bold text-gray-900 text-lg">
                  {tutor.teachingMode}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-gray-100">
              <div className="bg-orange-100 p-3 rounded-2xl text-orange-600 shadow-sm">
                <CalendarDays size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">
                  Available Days
                </p>
                <p className="font-bold text-gray-900 text-lg">
                  {tutor.availableDays}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-gray-100">
              <div className="bg-teal-100 p-3 rounded-2xl text-teal-600 shadow-sm">
                <Clock size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">Time</p>
                <p className="font-bold text-gray-900 text-lg">
                  {tutor.availableTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-gray-100">
              <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600 shadow-sm">
                <BookOpen size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">
                  Session Starts
                </p>
                <p className="font-bold text-gray-900 text-lg">
                  {new Date(tutor.sessionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TutorDetails;
