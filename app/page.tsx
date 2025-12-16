"use client";

import { Label } from "@/components/ui/label";
import Image from "next/image";
import "@/app/globals.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import { useUserContext } from "@/context/UserContext";
import { Spinner } from "@/components/ui/spinner";
import ForgotPasswordDialog from "@/components/forgot-password/ForgotPasswordDialog";
import RegisterSuccessDialog from "@/components/auth/RegisterSuccessDialog";
import { Form } from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormField } from "@/components/ui/InputFormField";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(2, { message: "This field is required." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const router = useRouter();
  const { setUserDetails, register_success } = useUserContext();
  const [open, setOpen] = useState(register_success);
  const [registerLoad, setRegisterLoad] = useState(false);
  const [loginLoad, setLoginLoad] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema), // ✅ Connect Zod schema
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleForgotPass = () => {
    router.push("/auth/forgot-password");
  };

  const handleRegister = () => {
    setRegisterLoad(true);
    router.push("/auth/register/email");
  };

  const handleLogin = (data: FormValues) => {
    setLoginLoad(true);
    router.push("/vintage/dashboard");
  };

  useEffect(() => {
    setTimeout(() => {
      setUserDetails({
        register_success: false,
        forgot_pass_success: false,
      });
      setOpen(false);
    }, 5000);
  }, [register_success]);

  return (
    <div className="w-full h-screen flex landing-cont  bg-primary-gray-600">
      <div className="relative video-cont w-full h-full bg-black flex items-center justify-center">
        <div className="absolute w-full h-full bg-primary-gray-400/30"></div>
        <video className="" src="/cellar.mp4" autoPlay muted loop playsInline />
      </div>
      <div className="bg-primary-gray-600 landing-form-cont max-w-[65vh] gap-4 p-4 py-8 flex flex-col items-center justify-center z-20 w-full bg-primary-gray-400 h-full">
        <LandingHeader></LandingHeader>
        <div className="flex flex-col w-full items-center">
          <div className="w-full max-w-[50vh] flex flex-col gap-4">
            <div className=" flex flex-col gap-4">
              <Form {...form}>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={form.handleSubmit(handleLogin)}
                >
                  <InputFormField
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="johndoe@gmail.com"
                  ></InputFormField>
                  <InputFormField
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="********"
                  ></InputFormField>

                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id="remember_me" />
                      <Label htmlFor="remember_me">Remember me?</Label>
                    </div>
                    <Button
                      onClick={handleForgotPass}
                      className="p-0 underline"
                      variant={"link"}
                      type="button"
                    >
                      Forgot Password?
                    </Button>
                  </div>
                  <div className="w-full flex flex-col gap-4">
                    <Button type={"submit"} className="w-full">
                      {loginLoad ? <Spinner></Spinner> : "Login"}
                    </Button>
                    <Button
                      onClick={handleRegister}
                      className="w-full"
                      variant={"outline"}
                      type="button"
                    >
                      {registerLoad ? (
                        <Spinner></Spinner>
                      ) : (
                        "Apply for Membership"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <RegisterSuccessDialog></RegisterSuccessDialog>
      <ForgotPasswordDialog></ForgotPasswordDialog>
    </div>
  );
}
