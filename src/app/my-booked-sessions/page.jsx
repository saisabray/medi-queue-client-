import MyBookingTable from "@/Component/MyBookingTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAnimationClass } from "@/lib/utilis/animation";

export const metadata = {
  title: "MediQueue | My Booked Sessions",
  description:
    "View and manage your booked tutoring sessions on the MediQueue platform.",
};
export default async function BookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return (
    <div className={getAnimationClass("pageLoad")}>
      <MyBookingTable bookings={data?.data || []} />
    </div>
  );
}

