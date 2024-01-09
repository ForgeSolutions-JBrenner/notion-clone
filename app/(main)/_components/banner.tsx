"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { AlertCircle, Trash, Undo } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Document being removed...",
      success: "Document removed",
      error: "Error removing document",
    });
    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Document restoring...",
      success: "Document restored",
      error: "Error restoring document",
    });
  };

  return (
    <div className="w-full bg-red-600/80 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-between">
      <div className="flex space-x-2 items-center">
        <AlertCircle className="h-4 w-4" />
        <span>This page is currently in the trash</span>
      </div>
      <div className="flex flex-row gap-x-2">
        <Button
          size="sm"
          onClick={onRestore}
          variant="outline"
          className=" gap-x-2 border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          <Undo className="h-4 w-4" />
          <span className="hidden sm:block">Restore Document</span>
        </Button>
        <ConfirmModal onConfirm={onRemove}>
          <Button
            size="sm"
            variant="destructive"
            className="gap-x-2 border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
          >
            <Trash className="h-4 w-4" />
            <span className="hidden sm:block">Remove Permanently</span>
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
};
