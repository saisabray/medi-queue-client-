import { Button, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const AvailableCard = ({ tutor }) => {
  return (
    <div className="card bg-slate-50 rounded-xl shadow-xl hover:shadow-2xl transition-all overflow-hidden relative h-full flex flex-col">
      <Chip
        color="accent"
        variant="secondary"
        className="absolute top-6 right-5 z-1 py-1 px-3 font-bold"
      >
        <Chip.Label>Hourly Fee : ${tutor.hourlyFee.toFixed(2)}</Chip.Label>
      </Chip>

      <Link href={`/tutor/${tutor._id}`}>
        <div className="relative w-full overflow-hidden aspect-square">
          <Image
            src={tutor?.tutorPhoto}
            alt={tutor?.tutorName}
            fill
            className="object-center rounded-2xl transition-transform duration-300 hover:scale-105 "
          />
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <Link href={`/tutor/${tutor._id}`}>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-primary transition-colors">
            {tutor?.tutorName}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-2 mb-5">
          <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
            {tutor?.subject}
          </span>

          <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
            {tutor?.experience}
          </span>

          <span className="text-xs px-3 py-1 bg-sky-100 text-sky-700 rounded-full">
            {tutor?.location}
          </span>

          <span className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
            {tutor?.teachingMode}
          </span>
        </div>

        <div className="mt-auto">
          <Link href={`/tutor/${tutor._id}`}>
            <Button className="w-full rounded-2xl bg-primary text-white">
              Book a Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AvailableCard;
