"use client";

import { Doc } from "@/convex/_generated/dataModel";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";

interface PublishProps {
  initialData: Doc<"documents">;
}
export const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  //Function to publish and unpublish the document
  const onPublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing note...",
      success: "Note published successfully!",
      error: "Failed to publish note.",
    });
  };
  const onUnPublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing note...",
      success: "Note removed from public successfully!",
      error: "Failed to unpublish the note.",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          {!initialData.isPublished ? (
            <p className="font-medium">Publish</p>
          ) : (
            <p className=" flex items-center space-x-2 font-medium">
              Live
              <span className="ml-2">
                <Globe className="h-4 w-4 text-sky-500" />
              </span>
            </p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 "
        align="end"
        alignOffset={0}
        sideOffset={2}
        forceMount
      >
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <Globe className="text-sky-500 animate-pulse h-4 w-4" />
                <p className="font-medium text-sm ">
                  This document is live on the web!
                </p>
              </div>
              <p className="ml-6 italic text-xs">
                Copy the link below and share!
              </p>
            </div>
            <div className="flex items-center ">
              <input
                type="text"
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                disabled={true}
                value={url}
              />
              <Button size="sm" onClick={onCopy} disabled={copied}>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onUnPublish}
            >
              Unpublish document
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share this document with everyone!
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
