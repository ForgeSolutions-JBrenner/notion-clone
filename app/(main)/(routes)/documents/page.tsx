"use client";

import Image from "next/image";
import empty from "@/components/assets/images/empty.png";
import emptyDark from "@/components/assets/images/empty-dark.png";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" });

    //Add toast notification
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note",
    });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4 ">
      <Image
        src={empty}
        className="dark:hidden"
        height={300}
        width={300}
        alt="Empty"
      />
      <Image
        src={emptyDark}
        className="hidden dark:block"
        height={300}
        width={300}
        alt="Empty"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
