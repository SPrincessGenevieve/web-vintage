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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, CheckCircle, CircleCheck } from "lucide-react";
import { useUserContext } from "@/context/UserContext";
import { Spinner } from "@/components/ui/spinner";
import ForgotPasswordDialog from "@/components/forgot-password/ForgotPasswordDialog";
import RegisterSuccessDialog from "@/components/auth/RegisterSuccessDialog";

export default function Login() {
  const router = useRouter();
  const { setUserDetails, register_success } = useUserContext();
  const [open, setOpen] = useState(register_success);
  const [registerLoad, setRegisterLoad] = useState(false);
  const [loginLoad, setLoginLoad] = useState(false);

  const handleForgotPass = () => {
    router.push("/auth/forgot-password");
  };

  const handleRegister = () => {
    setRegisterLoad(true);
    router.push("/auth/register/email");
  };

  const handleLogin = () => {
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
      <div  className="bg-primary-gray-600 landing-form-cont max-w-[65vh] gap-4 p-4 py-8 flex flex-col items-center justify-center z-20 w-full bg-primary-gray-400 h-full">
        <LandingHeader></LandingHeader>
        <div className="flex flex-col w-full items-center">
          <div className="w-full max-w-[50vh] flex flex-col gap-4">
            <div className=" flex flex-col gap-4">
              <Input label="Email Address"></Input>
              <Input securityOff label="Password" type="password"></Input>
            </div>
            <div className="w-full flex items-center justify-between">
              <Button variant={"ghost"} className="p-0">
                <Checkbox
                  id={"remember_me"}
                  className="cursor-pointer"
                ></Checkbox>
                <Label htmlFor="remember_me">Remember me?</Label>
              </Button>
              <Button
                onClick={handleForgotPass}
                className="p-0 underline"
                variant={"link"}
              >
                Forgot Password?
              </Button>
            </div>
            <div className="w-full flex flex-col gap-4">
              <Button className="w-full" onClick={handleLogin}>
                {loginLoad ? <Spinner></Spinner> : "Login"}
              </Button>
              <Button
                onClick={handleRegister}
                className="w-full"
                variant={"outline"}
              >
                {registerLoad ? <Spinner></Spinner> : "Apply for Membership"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <RegisterSuccessDialog></RegisterSuccessDialog>
      <ForgotPasswordDialog></ForgotPasswordDialog>
    </div>
  );
}
