import AvailableCard from "@/Component/Featured-Card/AvailableCard";
import { authClient } from "@/lib/auth-client";

const fetchTutors = async () => {
      const { data: tokenData } = await authClient.token();

    const res = await fetch("http://localhost:8000/tutors/all", {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${tokenData?.token}`,
      },
    });
    return res.json();
  
};

const Tutors = async () => {
  const tutors = await fetchTutors();

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Tutors</h1>
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
