import { Spinner } from "@heroui/react";

const TutorsLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
      </div>
    </div>
  );
};

export default TutorsLoading;
