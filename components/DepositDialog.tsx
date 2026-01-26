import React, { memo, ReactNode, useEffect, useState } from "react";
import {
  CardDeposit,
  CardDepositDashboard,
  DepositOption,
  StepBankTranserStep1,
  StepBankTranserStep2,
  StepBankTranserStep3,
  StepBankTranserStep4,
} from "./TradeSteps";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Content } from "next/font/google";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ContentDialog } from "./ContentDialog ";
import { v4 as uuidv4 } from "uuid";
import { useActivities } from "@/context/ActivitiesContext";
import { today } from "@/lib/today";
import { useUserContext } from "@/context/UserContext";

export default function DepositDialog() {
  const [content, setContent] = useState("Option");
  const { addToActivities } = useActivities();
  const { payment_method } = useUserContext();
  const [referenceCode, setReferenceCode] = useState(
    uuidv4().replace(/-/g, "").slice(0, 8).toUpperCase(),
  );
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [bankAmount, setBankAmount] = useState("");
  const [cardAmount, setCardAmount] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardImg, setCardImg] = useState("");
  const [digit4, setDigit4] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const data = payment_method.filter((item) => item.is_default === true);
    setCardName(data[0].card_type);
    setDigit4(data[0].last_code);
    setCardImg(data[0].img);
  }, [payment_method]);

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

  const handleTrade = (type: string) => {
    setType(type);
    const amount = type === "bank" ? Number(bankAmount) : Number(cardAmount);
    if (amount <= 0 || isNaN(amount)) {
      toast.warning("Please enter a valid amount.");
      return;
    }
    const payloadBank = {
      id: `activity-deposit-${uuidv4()}`,
      type: "General",
      date: today,
      action: "Deposit",
      depost_detail:
        type === "bank"
          ? {
              deposit_type: "bank",
              deposit_status: "Pending",
              deposit_amount: Number(bankAmount),
              bank_name: "Elvin Mootoosamy",
              bank_number: "15945146",
              bank_reference_code: referenceCode,
            }
          : {
              deposit_status: "Complete",
              deposit_type: "card",
              deposit_amount: Number(cardAmount),
              card_last_num: digit4,
              card_name: cardName,
              card_image: cardImg,
            },
    };
    addToActivities(payloadBank);
    setOpen(false);
    setOpenSuccess(true);
    setContent("Option");
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button variant={"outline"}>
            <Plus></Plus>Deposit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <ContentDialog
            reference_code={referenceCode}
            content={content}
            setContent={setContent}
            referenceCode={referenceCode}
            copied={copied}
            setCopied={setCopied}
            handleCopy={handleCopy}
            bankAmount={bankAmount}
            setBankAmount={setBankAmount}
            cardAmount={cardAmount}
            setCardAmount={setCardAmount}
            handleTrade={handleTrade}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
        <DialogContent>
          <Label variant="h1">Success</Label>
          <Label>
            {type === "bank"
              ? "We’ll notify you as soon as we receive your payment!"
              : `£${Number(cardAmount).toLocaleString()} deposited successfully via card. Your balance has been updated.`}
          </Label>
          <div className="w-full flex justify-end">
            <Button
              onClick={() => {
                setOpen(false);
                setContent("Option");
                setOpenSuccess(false);
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
