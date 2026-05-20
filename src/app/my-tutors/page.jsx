import MyTutorsTable from "@/Component/MyTutorsTable";

const fetchTutors = async () => {
  const res = await fetch("http://localhost:8000/tutors/all", {
    cache: "no-store",
  });
  return res.json();
};

export default async function MyTutors() {
  const tutors = await fetchTutors();

  return <MyTutorsTable tutors={tutors} />;
}
