import MyTutorsTable from "@/Component/MyTutorsTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getAnimationClass } from "@/lib/utilis/animation";

export const metadata = {
  title: "MediQueue | My Tutors",
  description:
    "View and manage your tutors on the MediQueue platform.",
};
const fetchTutors = async (userId) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${userId}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export default async function MyTutors() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!userId) {
    return <p className="text-center py-20">Please login first</p>;
  }

  const tutors = await fetchTutors(userId);

  return (
    <div className={getAnimationClass("pageLoad")}>
      <MyTutorsTable tutors={tutors} />
    </div>
  );
}

