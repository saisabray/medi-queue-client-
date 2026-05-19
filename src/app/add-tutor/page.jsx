"use client";

import From from "@/Component/From";
import { parseAvailability } from "@/lib/utilis/parseAvailability";
import { useState } from "react";

const AddTutorsPage = () => {
  const [availability, setAvailability] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { days, time } = parseAvailability(availability);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const tutorData = {
      tutorName: data.name,
      tutorEmail: data.email,
      bio: data.bio,
      tutorPhoto: data.image,
      subject: data.subject,
      availableDays: days,
      availableTime: time,
      hourlyFee: data.hourlyFee,
      totalSlot: data.slot,
      institution: data.institute,
      experience: data.experience,
      location: data.location,
      teachingMode: data.teachingMode,
      sessionDate: data.date,
    };
    console.log(tutorData);
    const res = await fetch("http://localhost:8000/tutors/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutorData),
    });

    const result = await res.json();

    if (result.acknowledged) {
      alert("Tutor added successfully!");
    } else {
      alert("Failed to add tutor");
    }
    e.target.reset();
    availability && setAvailability("");
  };
  return (
    <From
      availability={availability}
      setAvailability={setAvailability}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddTutorsPage;
