"use client";

import { AlertDialog, Button } from "@heroui/react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { getAnimationClass } from "@/lib/utilis/animation";

const DeleteModal = ({ tutor }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/all/${tutor._id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
      });

      if (!res.ok) {
        toast.error("Failed to delete tutor");
      }

      const result = await res.json();

      if (result.deletedCount > 0) {
        toast.success(`Tutor "${tutor.tutorName}" deleted successfully!`);
        router.refresh();
      } else {
        toast.error("Failed to delete tutor.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the tutor.");
    }
  };

  return (
    <AlertDialog>
      <Button variant="danger" className={getAnimationClass("hoverPulse")}><Trash></Trash></Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className={`sm:max-w-[400px] ${getAnimationClass("modal")}`}>
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
              <Button slot="close" variant="tertiary" className={getAnimationClass("hoverPulse")}>
                Cancel
              </Button>
              <Button slot="close" variant="danger" onPress={handleDelete} className={getAnimationClass("hoverPulse")}>
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
export default DeleteModal;