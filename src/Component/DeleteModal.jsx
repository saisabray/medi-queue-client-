"use client";

import { AlertDialog, Button } from "@heroui/react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const deleteModal = ({ tutor }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/tutors/all/${tutor._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete tutor");
      }

      const result = await res.json();

      if (result.deletedCount > 0) {
        toast.success(`Tutor "${tutor.tutorName}" deleted successfully!`);
        router.refresh();
      } else {
        toast.error("Failed to delete tutor.");
      }
    } catch (error) {
      console.error("Error deleting tutor:", error);
      toast.error("An error occurred while deleting the tutor.");
    }
  };

  return (
    <AlertDialog>
      <Button variant="danger"><Trash></Trash></Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Tutor permanently
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{tutor.tutorName}</strong> tutor data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onPress={handleDelete}>
                Delete 
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
export default deleteModal;