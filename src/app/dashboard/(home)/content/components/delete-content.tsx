/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import Swal from "sweetalert2";
import { deleteContent } from "../lib/action";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteContentProps {
  id: number;
}

const DeleteContent: FC<DeleteContentProps> = ({ id }) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteContent(id);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Content deleted successfully",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });

        window.location.reload();
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <Button size="sm" variant="destructive" onClick={handleDelete}>
      <Trash className="mr-2 h-4 w-4" />
      Delete
    </Button>
  );
};

export default DeleteContent;
