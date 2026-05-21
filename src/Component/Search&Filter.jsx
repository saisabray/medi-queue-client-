"use client";

import { useState, useEffect } from "react";
import { Input, Button } from "@heroui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SearchFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sessionStartDate, setSessionStartDate] = useState(
    searchParams.get("startDate")
      ? new Date(searchParams.get("startDate"))
      : null,
  );
  const [sessionEndDate, setSessionEndDate] = useState(
    searchParams.get("endDate") ? new Date(searchParams.get("endDate")) : null,
  );

  const [prevSearchParamsStr, setPrevSearchParamsStr] = useState(
    searchParams.toString(),
  );
  if (searchParams.toString() !== prevSearchParamsStr) {
    setPrevSearchParamsStr(searchParams.toString());
    setSearch(searchParams.get("search") || "");
    setSessionStartDate(
      searchParams.get("startDate")
        ? new Date(searchParams.get("startDate"))
        : null,
    );
    setSessionEndDate(
      searchParams.get("endDate")
        ? new Date(searchParams.get("endDate"))
        : null,
    );
  }

  useEffect(() => {
    const currentParam = searchParams.get("search") || "";
    if (search === currentParam) return;

    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(handler);
  }, [search, searchParams, pathname, router]);

  const handleStartDateChange = (date) => {
    setSessionStartDate(date);
    const params = new URLSearchParams(searchParams.toString());
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      params.set("startDate", `${year}-${month}-${day}`);
    } else {
      params.delete("startDate");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleEndDateChange = (date) => {
    setSessionEndDate(date);
    const params = new URLSearchParams(searchParams.toString());
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      params.set("endDate", `${year}-${month}-${day}`);
    } else {
      params.delete("endDate");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setSearch("");
    setSessionStartDate(null);
    setSessionEndDate(null);
    router.push(pathname);
  };

  const inputStyle =
    "h-14 w-full lg:w-80 bg-transparent border border-default-300 hover:border-default-400 rounded-xl px-4 outline-none";

  return (
    <div className="w-full flex flex-col lg:flex-row items-center gap-4 p-4 border border-default-200 rounded-2xl">
      <Input
        type="text"
        placeholder="Search session..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="bordered"
        radius="lg"
        className={inputStyle}
      />

      <div className="w-full lg:w-56">
        <DatePicker
          selected={sessionStartDate}
          onChange={handleStartDateChange}
          placeholderText="Start Date"
          dateFormat="dd MMM yyyy"
          popperPlacement="bottom-start"
          className="w-full h-14 border border-default-300 rounded-xl px-4 outline-none bg-transparent"
        />
      </div>

      <div className="w-full lg:w-56">
        <DatePicker
          selected={sessionEndDate}
          onChange={handleEndDateChange}
          placeholderText="End Date"
          dateFormat="dd MMM yyyy"
          popperPlacement="bottom-start"
          className="w-full h-14 border border-default-300 rounded-xl px-4 outline-none bg-transparent"
        />
      </div>

      <Button
        color="primary"
        radius="lg"
        onPress={handleReset}
        className="h-14 w-full lg:w-auto px-6"
      >
        Reset
      </Button>
    </div>
  );
}
