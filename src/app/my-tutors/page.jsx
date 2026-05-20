import MyTutorsTable from "@/Component/MyTutorsTable";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client"; 


const fetchTutors = async (userId) => {
        const { data: tokenData } = await authClient.token();

  const res = await fetch(`http://localhost:8000/tutors/${userId}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${tokenData?.token}`,
    },
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
