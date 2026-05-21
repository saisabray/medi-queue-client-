import MyBookingTable from "@/Component/MyBookingTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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

  const res = await fetch("http://localhost:8000/bookings", {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return <MyBookingTable bookings={data?.data || []} />;
}
