"use client";

import { Button, Table } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function MyBookingTable({ bookings }) {
  console.log("bookings:", bookings);
  const router = useRouter();
  const [loadingMap, setLoadingMap] = useState({});

  const handleCancel = async (bookingId) => {
    setLoadingMap((prev) => ({ ...prev, [bookingId]: true }));
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      if (!token) {
        toast.error("Please login to cancel booking.");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/cancel/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (res.ok && (result.success || result.modifiedCount > 0)) {
        toast.success("Booking canceled successfully!");
        router.refresh();
      } else {
        toast.error(result.message || result.error || "Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      toast.error("An error occurred while canceling the booking.");
    } finally {
      setLoadingMap((prev) => ({ ...prev, [bookingId]: false }));
    }
  };

  return (
    <div className="mt-10 container mx-auto">
      <h2 className="font-bold text-2xl">My Bookings Table</h2>

      <Table variant="secondary" className="mt-5 rounded-2xl p-5 bg-gray-200">
        <Table.ScrollContainer>
          <Table.Content aria-label="My Bookings Table">
            <Table.Header>
              <Table.Column isRowHeader>Tutor</Table.Column>
              <Table.Column>Student Name</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {bookings && bookings.length > 0 ? (
                bookings.map((booking) => (
                  <Table.Row key={booking._id}>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold uppercase">
                          {booking.tutorName?.charAt(0) || "T"}
                        </div>
                        {booking.tutorName}
                      </div>
                    </Table.Cell>
                    <Table.Cell>{booking.studentName}</Table.Cell>
                    <Table.Cell>{booking.studentEmail}</Table.Cell>
                    <Table.Cell>
                      <span className="capitalize">{booking.status}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white"
                        variant="bordered"
                        size="sm"
                        color={booking.status === "cancel" ? "default" : "danger"}
                        isDisabled={booking.status === "cancel" || loadingMap[booking._id]}
                        isLoading={loadingMap[booking._id]}
                        onPress={() => handleCancel(booking._id)}
                      >
                        {booking.status === "cancel" ? "Canceled" : "Cancel"}
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={5} className="text-center py-8 text-gray-500 text-xl font-medium">
                    No bookings found.
                    <Link href="/all-tutors" className="text-blue-600 text-sm hover:underline font-semibold ml-1">
                      Book a tutor
                    </Link>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}

