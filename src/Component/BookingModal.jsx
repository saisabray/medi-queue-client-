"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Lock, Sparkles } from "lucide-react";

export default function BookingModal({ tutor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const currentDate = new Date();
  const sessionDate = tutor?.sessionDate ? new Date(tutor.sessionDate) : null;
  const isNotAvailableYet = sessionDate ? currentDate < sessionDate : false;
  const isFullyBooked =
    tutor?.totalSlot !== undefined && Number(tutor.totalSlot) <= 0;

  let buttonText = "Book Session";
  let isButtonDisabled = false;

  if (isFullyBooked) {
    buttonText = "Fully Booked";
    isButtonDisabled = true;
  } else if (isNotAvailableYet) {
    buttonText = "Booking Not Open Yet";
    isButtonDisabled = true;
  }

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book a session.");
      router.push("/login");
      return;
    }

    if (!phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    setLoading(true);

    const bookingData = {
      tutorId: tutor?._id,
      tutorName: tutor?.tutorName,
      tutorEmail: tutor?.tutorEmail,

      studentId: user?.id,
      studentName: user?.name,
      studentEmail: user?.email,

      phone,
      bookingDate: new Date().toISOString(),
      status: "booked",
    };
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch("http://localhost:8000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         authorization : `Bearer ${token}`,
      
      },
      body: JSON.stringify(bookingData),
    });

    await res.json();

    setIsOpen(false);
    setPhone("");

    toast.success("Session booked successfully!");

    router.refresh();
    router.push(`/tutor/${tutor?._id}`);

    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        className={`font-semibold px-6 rounded-2xl transition-all duration-200 ${
          isButtonDisabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
            : "bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 active:scale-95"
        }`}
        disabled={isButtonDisabled}
        onPress={() => !isButtonDisabled && setIsOpen(true)}
      >
        {buttonText}
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md rounded-3xl bg-white shadow-2xl">
            <Modal.CloseTrigger />

            <Modal.Header className="px-6 pt-6 border-b pb-4">
              <Modal.Icon>
                <Sparkles className="w-5 h-5" />
              </Modal.Icon>
              <Modal.Heading>Book Session</Modal.Heading>
              <p className="text-sm text-gray-500">
                Confirm your booking details
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              {user ? (
                <Surface>
                  <Form onSubmit={handleBooking} className="space-y-4 w-full">
                    <TextField>
                      <Label>Student Name</Label>
                      <Input disabled value={user?.name || ""} />
                    </TextField>

                    <TextField>
                      <Label>Student Email</Label>
                      <Input disabled value={user?.email || ""} />
                    </TextField>

                    <TextField>
                      <Label>Phone *</Label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone number"
                      />
                    </TextField>

                    <TextField>
                      <Label>Tutor ID</Label>
                      <Input disabled value={tutor?._id || ""} />
                    </TextField>

                    <TextField>
                      <Label>Tutor Name</Label>
                      <Input disabled value={tutor?.tutorName || ""} />
                    </TextField>

                    <div className="flex gap-3 pt-4 border-t">
                      <Button
                        type="button"
                        variant="secondary"
                        onPress={() => setIsOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        isLoading={loading}
                        className="flex-1 bg-blue-600 text-white"
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </Form>
                </Surface>
              ) : (
                <div className="text-center py-6">
                  <Lock className="mx-auto mb-3" />
                  <h2 className="font-bold">Login Required</h2>
                  <p className="text-sm text-gray-500">
                    Please login to book a session
                  </p>

                  <Button
                    className="mt-4"
                    onPress={() => {
                      setIsOpen(false);
                      router.push("/login");
                    }}
                  >
                    Go to Login
                  </Button>
                </div>
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
