"use client";

import { Envelope } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import { Edit } from "lucide-react";
import { useState } from "react";
import From from "./From";
import { parseAvailability } from "@/lib/utilis/parseAvailability";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function EditModal({ tutor }) {
  const [availability, setAvailability] = useState(`${tutor?.availableDays || ""} ${tutor?.availableTime || ""}`);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleEdit = async (e) => {
    e.preventDefault();

    const { days, time } = parseAvailability(availability);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const updatedData = {
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
    };
    const { data: tokenData } = await authClient.token();
    try {
      const res = await fetch(`http://localhost:8000/tutors/all/${tutor._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (result.modifiedCount > 0 || result.acknowledged) {
        toast.success("Tutor updated successfully!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to update tutor or no changes made.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the tutor.");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button isIconOnly className="bg-transparent text-blue-600 hover:bg-blue-50" onPress={() => setIsOpen(true)}>
        <Edit size={18} />
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-w-3xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edit Tutor: {tutor?.tutorName}</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-4 overflow-y-auto max-h-[80vh]">
              <From
                availability={availability}
                setAvailability={setAvailability}
                handleSubmit={handleEdit}
                className="w-full "
                tutor={tutor}
              />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
