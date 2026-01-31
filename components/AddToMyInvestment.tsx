"use client";

import React, { useEffect, useState } from "react";
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
import { v4 as uuidv4 } from "uuid";
import { today } from "@/lib/today";
import { useActivities } from "@/context/ActivitiesContext";
import { useUserContext } from "@/context/UserContext";

export default function AddToMyInvestment() {
  const router = useRouter();

  const handleTradeMyself = () => {
    router.push("/vintage/marketplace");
  };
  const { payment_method } = useUserContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [openCard, setOpenCard] = useState(false);
  const [open, setOpen] = useState(false);
  const [openBank, setOpenBank] = useState(false);
  const { addToActivities } = useActivities();
  const [cardAmount, setCardAmount] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardImg, setCardImg] = useState("");
  const [digit4, setDigit4] = useState("");

  useEffect(() => {
    const data = payment_method.filter((item) => item.is_default === true);
    setCardName(data[0]?.card_type ?? "");
    setDigit4(data[0]?.last_code ?? "");
    setCardImg(data[0]?.img ?? "");
  }, [payment_method]);

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
      const payloadBank = {
        id: `activity-deposit-${uuidv4()}`,
        type: "General",
        date: today,
        action: "Deposit",
        depost_detail: {
          deposit_type: "bank",
          deposit_status: "Pending",
          deposit_amount: Number(amount),
          bank_name: "Elvin Mootoosamy",
          bank_number: "15945146",
          bank_reference_code: referenceCode,
        },
      };
      addToActivities(payloadBank);
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
    console.log("CLICKED");
    console.log("CARD: ", cardName);
    if (!cardName) {
      toast.warning("Please select a payment method.");
      return;
    }
    const payloadBank = {
      id: `activity-deposit-${uuidv4()}`,
      type: "General",
      date: today,
      action: "Deposit",
      depost_detail: {
        deposit_status: "Complete",
        deposit_type: "card",
        deposit_amount: amount,
        card_last_num: digit4,
        card_name: cardName,
        card_image: cardImg,
      },
    };
    addToActivities(payloadBank);
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
              reference_code={referenceCode}
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
