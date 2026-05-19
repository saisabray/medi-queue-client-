"use client";

import {
  FieldError,
  Input,
  Select,
  Label,
  TextField,
  ListBox,
  Form,
  Button,
  DateField,
} from "@heroui/react";
import { Check } from "lucide-react";
import { useState } from "react";

const parseAvailability = (value) => {
  if (!value) return { days: "", time: "" };

  const cleaned = value.trim().replace(/\s+/g, " ");

  const match = cleaned.match(/^(.+?)\s+(.+)$/);

  if (!match) {
    return { days: "", time: "" };
  }

  let staticDays = match[1];
  let staticTime = match[2];

 const days = staticDays
    .replace(/\s*-\s*/g, " - ") 
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase()); 

  
  const time = staticTime
    .replace(/(\d)(AM|PM)/gi, "$1 $2") 
    .replace(/\s*-\s*/g, " - ") 
    .replace(/\s+/g, " ") 
    .trim();

  return {
    days,
    time,
  };
};

const AddTutorsPage = () => {
  const [availability, setAvailability] = useState("");
  const { days, time } = parseAvailability(availability);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (res.ok) {
      alert("Tutor added successfully!");
    } else {
      alert("Failed to add tutor");
    }
    e.target.reset();
    availability && setAvailability("");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="container mx-auto max-w-3xl bg-gray-200 p-8 rounded-lg mt-10"
    >
      <div className="flex justify-between items-center gap-5 w-full my-4">
        <TextField name="name" type="text" className="w-full">
          <Label>Name</Label>
          <Input placeholder="Enter your name" />
          <FieldError />
        </TextField>

        <TextField name="image" type="url" className="w-full">
          <Label>Image URL</Label>
          <Input placeholder="Image URL" />
          <FieldError />
        </TextField>
      </div>

      <TextField name="email" type="email" className="w-full my-4">
        <Label>Email</Label>
        <Input placeholder="Enter your email" />
        <FieldError />
      </TextField>

      <TextField name="bio" type="text" className="w-full my-4">
        <Label>Bio</Label>
        <Input placeholder="Write a short biography" />
        <FieldError />
      </TextField>

      <div className="my-4 w-full">
        <Select
          name="subject"
          className="w-full"
          placeholder="Select one"
        >
          <Label>Subject</Label>

          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              <ListBox.Item id="Mathematics" textValue="Mathematics">
                Mathematics
              </ListBox.Item>

              <ListBox.Item id="Physics" textValue="Physics">
                Physics
              </ListBox.Item>

              <ListBox.Item id="Chemistry" textValue="Chemistry">
                Chemistry
              </ListBox.Item>

              <ListBox.Item id="Biology" textValue="Biology">
                Biology
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <div className="flex justify-between items-center gap-5 w-full my-4">
        <TextField
          name="availableDays"
          type="text"
          className="w-full"
        >
          <Label>Available Days & Time</Label>
          <Input
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            placeholder="e.g.Sun - Thu 5:00 PM - 10:00 PM"
          />
          <FieldError />
        </TextField>
        <DateField className="w-full" name="date">
          <Label>Session Date</Label>
          <DateField.Group>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
        </DateField>
      </div>

      <div className="flex justify-between items-center gap-5 w-full my-4">
        <TextField name="hourlyFee" type="number" className="w-full">
          <Label>Hourly Fee</Label>
          <Input placeholder="500" />
          <FieldError />
        </TextField>

        <TextField name="slot" type="number" className="w-full">
          <Label>Slot</Label>
          <Input placeholder="10" />
          <FieldError />
        </TextField>
      </div>

      <div className="flex justify-between items-center gap-5 w-full my-4">
        <TextField name="institute" type="text" className="w-full">
          <Label>Institute</Label>
          <Input placeholder="Dhaka University" />
          <FieldError />
        </TextField>

        <TextField name="experience" type="text" className="w-full">
          <Label>Experience</Label>
          <Input placeholder="5 years" />
          <FieldError />
        </TextField>
      </div>

      <div className="my-4 w-full flex justify-between items-center gap-5">
        <TextField name="location" type="text" className="w-full">
          <Label>Location(Area/City)</Label>
          <Input placeholder="Dhaka" />
          <FieldError />
        </TextField>

        <Select
          name="teachingMode"
          className="w-full"
          placeholder="Select one"
        >
          <Label>Teaching Mode</Label>

          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              <ListBox.Item id="Online" textValue="Online">
                Online
              </ListBox.Item>

              <ListBox.Item id="Offline" textValue="Offline">
                Offline
              </ListBox.Item>

              <ListBox.Item id="Both" textValue="Both">
                Both
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <div className="w-full mt-5 flex items-center justify-center">
        <Button
          type="submit"
          className="w-[30%] rounded-2xl bg-primary text-white flex items-center justify-center gap-2"
        >
          <Check />
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default AddTutorsPage;
