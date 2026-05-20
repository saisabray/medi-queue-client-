"use client";

import From from "@/Component/From";
import { parseAvailability } from "@/lib/utilis/parseAvailability";
import { useState } from "react";
import { authClient } from "@/lib/auth-client"; // ✅ THIS WAS MISSING

const AddTutorsPage = () => {
  const [availability, setAvailability] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("submit triggered");

    const { data: sessionData } = await authClient.getSession();
    const user = sessionData?.user;

    console.log("SESSION DATA:", sessionData);

    if (!user) {
      alert("Please login first");
      return;
    }

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
      userId: user.id, 
      userEmail: user.email, 
    };

    console.log("TUTOR DATA:", tutorData);

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
    setAvailability("");
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
