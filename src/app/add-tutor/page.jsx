"use client";

import From from "@/Component/From";
import { parseAvailability } from "@/lib/utilis/parseAvailability";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { getAnimationClass } from "@/lib/utilis/animation";

const AddTutorsPage = () => {
  const [availability, setAvailability] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("submit triggered");

    const { data: sessionData } = await authClient.getSession();
    const user = sessionData?.user;

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
      hourlyFee: Number(data.hourlyFee),
      totalSlot: Number(data.slot),
      institution: data.institute,
      experience: data.experience,
      location: data.location,
      teachingMode: data.teachingMode,
      sessionDate: data.date,
      userId: user.id,
      userEmail: user.email,
    };
    const { data: tokenData } = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(tutorData),
    });

    const result = await res.json();

    if (result.acknowledged) {
      toast.success("Tutor added successfully!");
    } else {
      toast.error("Failed to add tutor");
    }

    e.target.reset();
    setAvailability("");
  };

  return (
    <div className={getAnimationClass("pageLoad")}>
      <From
        availability={availability}
        setAvailability={setAvailability}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddTutorsPage;

