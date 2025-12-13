"use client";

import RegisterHeader from "@/components/auth/RegisterHeader";
import { Button } from "@/components/ui/button";
import { DropdownFormField } from "@/components/ui/DropdownFormField";
import { FileUploadFormField } from "@/components/ui/FileUploadFormField";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/ui/InputFormField";
import { Label } from "@/components/ui/label";
import { SimpleDropdownInput } from "@/components/ui/simple-dropdown-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserContext } from "@/context/UserContext";
import { feedback, id_type } from "@/lib/selection";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  id_document: z.string().min(2, { message: "This field is required." }),
  documentFile: z
    .any()
    .refine((file) => file instanceof File, { message: "Please upload a file" })
    .refine((file: File) => file.size <= 5_000_000, {
      message: "File size must be ≤ 5MB",
    }),
  feedback: z.string().min(2, { message: "This field is required." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function page() {
  const { setUserDetails, register_step_three } = useUserContext();
  const router = useRouter();
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    const done = sessionStorage.getItem("register_step2_complete");
    if (!done) {
      setShow(false);
      router.back();
    } else {
      setShow(true);
    }
  }, [router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema), // ✅ Connect Zod schema
    defaultValues: {
      id_document: register_step_three?.idType || "",
      documentFile: register_step_three?.image || "",
      feedback: register_step_three?.feedback || "",
    },
  });

  const selectedDocumentType = form.watch("id_document");
  const selectedFeedback = form.watch("feedback");

  const onSubmit = (values: FormValues) => {
    sessionStorage.removeItem("register_intial_complete");
    sessionStorage.removeItem("register_step2_complete");
    setUserDetails({
      register_success: true,
      register_email: "",
      register_step_one: null,
      register_step_two: null,
      register_step_three: null,
    });
    router.replace("/");
  };

  return (
    <div className="w-full max-w-[50vh] h-full flex flex-col gap-4 my-4">
      <RegisterHeader step={3}></RegisterHeader>
      {show ? (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <SimpleDropdownInput
                control={form.control}
                name="id_document"
                label="ID Document Type"
                placeholder="Select document type"
                options={id_type}
                onChange={(value) =>
                  setUserDetails({
                    register_step_three: {
                      idType: value,
                      image: register_step_three?.image ?? null,
                      feedback: register_step_three?.feedback ?? "",
                    },
                  })
                }
              />
              {selectedDocumentType === "Other" && (
                <InputFormField
                  control={form.control}
                  name="otherDocumentType"
                  label="Specify document"
                  placeholder="Enter your document type"
                  onChange={(value) =>
                    setUserDetails({
                      register_step_three: {
                        idType: value,
                        image: register_step_three?.image ?? null,
                        feedback: register_step_three?.feedback ?? "",
                      },
                    })
                  }
                />
              )}

              <FileUploadFormField
                control={form.control}
                name="documentFile"
                label="Upload ID Document"
                accept="image/*,application/pdf"
                onChange={(value) =>
                  setUserDetails({
                    register_step_three: {
                      idType: register_step_three?.idType ?? "",
                      image: value,
                      feedback: register_step_three?.feedback ?? "",
                    },
                  })
                }
              ></FileUploadFormField>
              <SimpleDropdownInput
                control={form.control}
                name="feedback"
                label="Where did you hear about us?"
                placeholder="Select document type"
                options={feedback}
                onChange={(value) =>
                  setUserDetails({
                    register_step_three: {
                      idType: register_step_three?.idType ?? "",
                      image: register_step_three?.image ?? null,
                      feedback: value,
                    },
                  })
                }
              />

              <Button>Apply for Membership</Button>
            </form>
          </Form>
          <Button
            onClick={() => router.back()}
            variant={"ghost"}
            className="w-full"
          >
            <ArrowLeft></ArrowLeft>Back
          </Button>
        </>
      ) : (
        <>
          <div className="flex flex-col w-full items-center space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2 w-full">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
