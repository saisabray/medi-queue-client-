import MyTutorsTable from "@/Component/MyTutorsTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const fetchTutors = async (userId) => {
  const res = await fetch(`http://localhost:8000/tutors/${userId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tutors");
  }

  return res.json();
};

export default async function MyTutors() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!userId) {
    return <p>Please login first</p>;
  }

  const tutors = await fetchTutors(userId);

  return <MyTutorsTable tutors={tutors} />;
}
