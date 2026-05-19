import MytutorsClient from "@/Component/MytutorsClient";

const fetchTutors = async () => {
  const res = await fetch("http://localhost:8000/tutors/all", {
    cache: "no-store",
  });
  return res.json();
};

export default async function Mytutors() {
  const tutors = await fetchTutors();

  return <MytutorsClient tutors={tutors} />;
}
