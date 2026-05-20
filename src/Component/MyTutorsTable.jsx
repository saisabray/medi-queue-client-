import { Button, Table } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

export default function MyTutorsTable({ tutors }) {
  console.log("tutors:", tutors);
  return (
    <div className="mt-10 container mx-auto ">
      <h2 className="font-bold text-2xl">My Tutors Table</h2>

      <Table variant="secondary" className="mt-5  rounded-2xl p-5 bg-gray-200 ">
        <Table.ScrollContainer>
          <Table.Content aria-label="My Tutors Table">
            <Table.Header>
              <Table.Column isRowHeader>Tutor</Table.Column>
              <Table.Column>Subject</Table.Column>
              <Table.Column>Institution</Table.Column>
              <Table.Column>Availability</Table.Column>
              <Table.Column>Fee</Table.Column>
              <Table.Column>Mode</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {tutors && tutors.length > 0 ? (
                tutors.map((tutor) => (
                  <Table.Row key={tutor._id}>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full  overflow-hidden">
                          <Image
                            src={tutor.tutorPhoto}
                            alt={tutor.tutorName}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        {tutor.tutorName}
                      </div>
                    </Table.Cell>
                    <Table.Cell>{tutor.subject}</Table.Cell>
                    <Table.Cell>{tutor.institution}</Table.Cell>
                    <Table.Cell>
                      {tutor.availableDays} | {tutor.availableTime}
                    </Table.Cell>
                    <Table.Cell>${tutor.hourlyFee}/hr</Table.Cell>
                    <Table.Cell>{tutor.teachingMode}</Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <EditModal tutor={tutor} />
                        <DeleteModal tutor={tutor} />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={7} className="text-center py-8 text-gray-500 text-xl font-medium">
                    No tutors found.
                    <Link href="/add-tutor" className="text-blue-600 text-sm hover:underline font-semibold ml-1">
                      Add tutor
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
