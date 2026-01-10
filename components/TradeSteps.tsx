"use client";
import { BellIcon, Building, Check, Copy, Dot, MedalIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import PaymentMethodOption from "./PaymentMethodOption";
import Tailor from "./portfolio/Tailor";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent } from "./ui/dialog";

export const DepositOption = ({
  onClickBank,
  onClickCard,
}: {
  onClickBank: () => void;
  onClickCard: () => void;
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <Label variant="h1">Choose Deposit Method</Label>
      <div className="w-full gap-2 flex items-center justify-center flex-col">
        <Button className="w-full" onClick={onClickBank}>
          Bank Transfer
        </Button>
        <Label>(Recommened for deposits greater than £10,000)</Label>
      </div>
      <Label>Or</Label>
      <Button onClick={onClickCard} variant={"outline"} className="w-full">
        Deposit with Card{" "}
        <Image
          src="/card-logo.png"
          alt=""
          width={400}
          height={400}
          className="w-auto h-6"
        ></Image>
      </Button>
    </div>
  );
};

export const StepBankTranserStep1 = ({
  onClickNo,
  onClickYes,
}: {
  onClickNo: () => void;
  onClickYes: () => void;
}) => {
  const instruction = [
    "Copy the reference code provided. (On next page)",
    "Log in to your online or mobile banking account.",
    "Transfer the deposit using Vintage Associates' bank details. Be sure to include your reference code.",
    "Return to the app to confirm your deposit amount. (As the final step)",
  ];
  return (
    <div>
      <Label variant="h1">How to deposit by bank transfer</Label>
      <div className="flex flex-col gap-2 mt-4">
        {instruction.map((item, index) => (
          <div className="flex gap-4 items-start">
            <Label>{index + 1}.</Label>
            <Label>{item}</Label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-8 items-center justify-center">
        <Label className="text-white font-extralight">Ready to continue?</Label>
        <div className="w-full flex flex-col gap-2">
          <Button onClick={onClickYes} className="w-full">
            Yes
          </Button>
          <Button className="w-full" onClick={onClickNo} variant={"outline"}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

type StepBankTransferStep2Props = {
  referenceCode: string;
  copied: boolean;
  setCopied: (value: boolean) => void;
  onClick: () => void;
  onClickDone: () => void;
};

export const StepBankTranserStep2 = ({
  referenceCode,
  copied,
  setCopied,
  onClick,
  onClickDone,
}: StepBankTransferStep2Props) => {
  return (
    <div className="flex flex-col gap-4">
      <Label variant="h1">Copy your Reference Code:</Label>

      <div className="flex items-end gap-4">
        <Input disabled value={referenceCode} />

        <Button
          variant="outline"
          onClick={onClick}
          aria-label="Copy reference code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="w-full gap-2 flex flex-col items-center justify-center">
        <Label>
          Click <strong>Done</strong> once you’ve copied the reference code.
        </Label>
        <Button onClick={onClickDone} className="w-full">
          Done
        </Button>
      </div>
    </div>
  );
};

export const StepBankTranserStep3 = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex flex-col gap-4">
      <Label variant="h1">Transfer the funds</Label>
      <Label>
        Open your banking app or website and send your deposit to the following.
        You may have to close the app to do this and return here once complete
      </Label>
      <Card>
        <CardContent className="flex flex-col gap-4 p-4">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center justify-center">
              <Building className="text-white"></Building>
              <Label variant="h2" className="text-white">
                Company Bank Details
              </Label>
            </CardTitle>
          </CardHeader>
          <div>
            <div>
              <Label>Account Name: Elvin Mootoosamy</Label>
              <Label>Account Number: 15945146</Label>
              <Label>Sort Code: 04-00-75</Label>
            </div>
          </div>
          <div className="mt-4 w-full flex items-center justify-center">
            <Label className="font-thin">
              Paste the reference you copied in step 1 in the payment reference
              box
            </Label>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 w-full flex flex-col gap-2 items-center justify-center">
        <Label>Click “Done” once you’ve made the transfer with your bank</Label>
        <Button onClick={onClick} className="w-full">
          Done
        </Button>
      </div>
    </div>
  );
};

export const StepBankTranserStep4 = ({
  onClick,
  value,
  onChange,
  open,
  onOpenChange,
  onClickClose
}: {
  onClick: () => void;
  onClickClose: () => void;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  open: boolean;
  onOpenChange: (e: boolean) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <Label variant="h1" className="mb-4">
          Enter the amount you sent below and tap Submit.
        </Label>
        <Input
          value={value}
          onChange={onChange}
          type="number"
          className=""
          label="Amount (GBP)"
          placeholder="e.g. 100"
        ></Input>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        {/* <Label>(We’ll notify you as soon as we receive your payment!)</Label> */}
        <Button className="w-full" onClick={onClick}>
          Submit
        </Button>
      </div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <Label variant="h1">Success</Label>
          <Label>We’ll notify you as soon as we receive your payment!</Label>
          <div className="w-full flex justify-end">
            <Button onClick={onClickClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const CardDeposit = ({
  onClick,
  value,
  onChange,
  open,
  onOpenChange,
  close,
  confirm,
}: {
  open: boolean;
  value: number;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenChange: (e: boolean) => void;
  close: () => void;
  confirm: () => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Input
        value={value}
        onChange={onChange}
        type="number"
        placeholder="Enter amount"
        label="Deposit Amount (£)"
      ></Input>
      <PaymentMethodOption></PaymentMethodOption>
      <Button onClick={onClick}>Deposit 1</Button>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div>
            <Label variant="h1">Submit preference to Concierge</Label>
            <Label>
              Are you sure you want to proceed with a concierge deposit?
            </Label>
          </div>
          <div className="flex justify-end w-full gap-2">
            <Button onClick={close} variant={"outline"}>
              Cancel
            </Button>
            <Button onClick={confirm}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const SuccessDeposit = ({
  onClickTrack,
  onClickUpdate,
}: {
  onClickTrack: () => void;
  onClickUpdate: () => void;
}) => {
  const steps = [
    {
      title: "Step 1: Processing Order",
      desc: "It may take some time for your newly invested wines to appear in your collection.",
      icon: Check,
    },
    {
      title: "Step 2: Quality Assurance",
      desc: "We ensure each bottle meets the premium standards expected by our investors. Once finalised, your new acquisitions will appear in your collection.",
      icon: MedalIcon,
    },
    {
      title: "Step 3: Portfolio Update",
      desc: "A notification will be sent as soon as the wines are added to your collection.",
      icon: BellIcon,
    },
  ];
  return (
    <div className="w-full flex flex-col gap-4">
      <Label variant="h1">Your preferences have been recorded!</Label>
      <Label>
        Our team will use these to guide your next investment or notify you of
        matching opportunities. You may update your selections at any time.
      </Label>
      <Label>As requested, we have begun trading on your behalf.</Label>
      <Label variant="h2" className="text-white">
        What to Expect Next
      </Label>
      <div className="w-full flex">
        <div className="flex flex-col gap-4 relative w-[70%] items-center justify-between">
          <div className="h-[90%] absolute w-1 left-4 bg-primary-brown z-5"></div>
          {steps.map((item, index) => (
            <div className="z-10">
              <div key={index} className="flex">
                <div>
                  <Label className=" border-2 border-primary-brown bg-primary-gray-400 rounded-full p-1 z-30">
                    <item.icon className="text-primary-brown"></item.icon>
                  </Label>
                </div>
                <div className="ml-4">
                  <Label variant="h2" className="text-white">
                    {item.title}
                  </Label>
                  <Label>{item.desc}</Label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={onClickTrack} className="mt-8">
        Track My Portfolio
      </Button>
      <Button onClick={onClickUpdate} variant={"outline"}>
        Update Preferences
      </Button>
    </div>
  );
};

export const CardTailor = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex">
      <Tailor onClick={onClick}></Tailor>
    </div>
  );
};

export const CardDepositIntro = ({ onClick }: { onClick: () => void }) => {
  const services = [
    "Professional, real-time decision-making: Our team continuously tracks market movements and executes trades the moment opportunities appear, something that’s difficult to achieve through manual, individual trading.",
    "Hands-off convenience: Once your deposit is made, we manage everything—research, timing, execution, and ongoing strategy—allowing you to benefit from market activity without the need for day-to-day involvement.",
    "Expert strategy tailored to your goals: We apply structured, risk-aware trading methods aligned with your selected deposit level and preferences.",
    "Immediate opportunity capture: Because funds are pre-deposited, we can act at the exact moment the market presents favourable conditions.",
  ];
  return (
    <div className="flex flex-col gap-4">
      <Label className="text-primary-brown" variant="h1">
        Vintage Associates to Trade on My Behalf
      </Label>
      <Label>
        This section introduces our fully managed trading service, designed for
        clients who prefer a hands-off approach while still benefiting from
        expert market insight. By choosing a deposit amount, you allow our team
        to actively trade on your behalf, operating much like a discretionary
        fund manager. Our role is to monitor markets in real time, identify
        opportunities as they emerge, and execute trades immediately using the
        funds you’ve allocated—ensuring speed, precision, and professional
        oversight.
      </Label>
      <div className="flex flex-col gap-4">
        <Label className="text-primary-brown" variant="h2">
          What This Service Offers
        </Label>
        {services.map((item, index) => (
          <div className="flex gap-2" key={index}>
            <div>
              <Dot></Dot>
            </div>
            <div>
              <Label>{item}</Label>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Label className="text-primary-brown" variant="h2">
          What This Service Offers
        </Label>
        <Label>
          If you prefer a blend of self-directed trading and expert management,
          you can also explore our Portfolio Builder in the Marketplace. It’s
          ideal for clients who enjoy shaping part of their own strategy, while
          still benefiting from our professional execution on the remainder.
        </Label>
      </div>
      <Button onClick={onClick}>Deposit</Button>
    </div>
  );
};
