"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChartArea, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  CardDeposit,
  CardDepositIntro,
  CardTailor,
  DepositOption,
  StepBankTranserStep1,
  StepBankTranserStep2,
  StepBankTranserStep3,
  StepBankTranserStep4,
  SuccessDeposit,
} from "./TradeSteps";
import { toast } from "sonner";

export default function AddToMyInvestment() {
  const router = useRouter();

  const handleTradeMyself = () => {
    router.push("/vintage/marketplace");
  };
  const [currentStep, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [openCard, setOpenCard] = useState(false);
  const [open, setOpen] = useState(false);
  const [openBank, setOpenBank] = useState(false);

  const handleClickNo = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleClickYes = () => {
    setCurrentStep(currentStep + 1);
  };

  const referenceCode = "a082809958";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referenceCode);
      setCopied(true);

      // reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  console.log("AMOUNT: ", amount);

  const handleTrade = () => {
    if (amount === 0) {
      toast.warning("Please enter an amount.");
      return;
    } else {
      setOpenBank(true);
    }
  };

  const handleCard = () => {
    setCurrentStep(8);
  };

  const handleDeposit = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSuccess = () => {
    if (amount === 0) {
      toast.warning("Please enter an amount.");
      return;
    } else {
      setCurrentStep(11);
      setOpenCard(true);
    }
  };

  const handlePortfolio = () => {
    location.reload();
  };

  const handleBack = () => {
    if (currentStep === 8) {
      setCurrentStep(3);
    } else if (currentStep === 9) {
      setCurrentStep(8);
    } else if (currentStep === 10) {
      setCurrentStep(1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCardDeposit1 = () => {
    setCurrentStep(10);
  };

  const handleTailor = () => {
    setCurrentStep(9);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Add to My Investment</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-[90%]">
        {/* <Label>Current STEP: {currentStep}</Label> */}
        <div className="absolute">
          {currentStep !== 1 && (
            <Button
              className="rounded-full"
              onClick={handleBack}
              variant={"ghost"}
            >
              <ChevronLeft></ChevronLeft> Back
            </Button>
          )}
        </div>
        <div className="mt-4">
          {currentStep === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle className="w-full flex items-center justify-center flex-col">
                  <ChartArea
                    size={40}
                    className="text-primary-brown"
                  ></ChartArea>
                  <Label variant="h1">Choose your investment type</Label>
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 mt-4">
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  variant={"outline"}
                >
                  Vintage Associates To Trade On My Behalf
                </Button>
                <Button onClick={handleTradeMyself}>Trade Myself</Button>
              </div>
            </>
          ) : currentStep === 2 ? (
            <CardDepositIntro
              onClick={() => setCurrentStep(currentStep + 1)}
            ></CardDepositIntro>
          ) : currentStep === 3 ? (
            <DepositOption
              onClickBank={handleDeposit}
              onClickCard={handleCard}
            ></DepositOption>
          ) : currentStep === 4 ? (
            <StepBankTranserStep1
              onClickYes={handleClickYes}
              onClickNo={handleClickNo}
            ></StepBankTranserStep1>
          ) : currentStep === 5 ? (
            <StepBankTranserStep2
              onClick={handleCopy}
              onClickDone={handleClickYes}
              referenceCode={referenceCode}
              copied={copied}
              setCopied={setCopied}
            ></StepBankTranserStep2>
          ) : currentStep === 6 ? (
            <StepBankTranserStep3
              onClick={handleClickYes}
            ></StepBankTranserStep3>
          ) : currentStep === 7 ? (
            <StepBankTranserStep4
              onClickClose={() => {
                setCurrentStep(1);
                setOpen(false);
                setOpenBank(false);
              }}
              open={openBank}
              onOpenChange={setOpenBank}
              onChange={(e) => setAmount(Number(e.target.value))}
              value={amount}
              onClick={handleTrade}
            ></StepBankTranserStep4>
          ) : currentStep === 8 ? (
            <CardDeposit
              close={() => setOpenCard(false)}
              confirm={handleSuccess}
              open={openCard}
              onOpenChange={setOpenCard}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              onClick={handleCardDeposit1}
            ></CardDeposit>
          ) : currentStep === 9 ? (
            <CardTailor onClick={() => setCurrentStep(3)}></CardTailor>
          ) : (
            <SuccessDeposit
              onClickTrack={handlePortfolio}
              onClickUpdate={handleTailor}
            ></SuccessDeposit>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
