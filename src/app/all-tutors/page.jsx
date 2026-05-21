import AvailableCard from "@/Component/Featured-Card/AvailableCard";
import SearchFilter from "@/Component/Search&Filter";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const fetchTutors = async (searchParams) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const queryParams = new URLSearchParams();
  if (searchParams?.search) {
    queryParams.append("search", searchParams.search);
  }
  if (searchParams?.startDate) {
    queryParams.append("startDate", searchParams.startDate);
  }
  if (searchParams?.endDate) {
    queryParams.append("endDate", searchParams.endDate);
  }

  const queryString = queryParams.toString();
  const url = `http://localhost:8000/tutors/all${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

const Tutors = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const tutors = await fetchTutors(resolvedParams);

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Tutors</h1>
      <SearchFilter/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {Array.isArray(tutors) && tutors.length > 0 ? (
          tutors.map((tutor) => (
            <AvailableCard key={tutor._id} tutor={tutor} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No tutors found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Tutors;
