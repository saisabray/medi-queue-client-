import AvailableCard from "@/Component/Featured-Card/AvailableCard";

const fetchTutors = async () => {
  const res = await fetch("http://localhost:8000/tutors/all");
  return res.json();
};

const Tutors = async () => {
  const tutors = await fetchTutors();

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Tutors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {tutors.map((tutor) => (
          <AvailableCard key={tutor._id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

export default Tutors;
