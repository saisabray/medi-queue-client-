
import AvailableCard from "./AvailableCard";

const fetchTutors = async () => {
  const res = await fetch("http://localhost:8000/tutors");
  return res.json();
};

const AvailableTutors = async () => {
  const tutors = await fetchTutors();
  console.log(tutors);

  return (
    <div className="container mx-auto px-4 py-8 mt-10 md:mt-15">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Available Tutors</h1>
      <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
        {tutors.map((tutor) => (
          <AvailableCard key={tutor._id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

export default AvailableTutors;
