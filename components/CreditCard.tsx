"use client";
import { Cpu, CreditCardIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Label } from "./ui/label";
import creditCardType, {
  getTypeInfo,
  types as CardType,
} from "credit-card-type";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { card_list } from "@/lib/billing/payment_method";
import { useUserContext } from "@/context/UserContext";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

export default function CreditCard() {
  const [cardNum, setCardNum] = useState("");
  const [exp, setExp] = useState("00/00");
  const [owner, setOwner] = useState("");
  const [cvc, setCVC] = useState("1234");
  const cleanCardNumber = cardNum.replace(/\D/g, "");
  const [expired, setExpired] = useState(false);
  const { addPaymentMethod, updatePaymentDefault } = useUserContext();
  const [loading, setLoading] = useState(false);

  const detected = creditCardType(cleanCardNumber)[0];

  const cardFromList = detected
    ? card_list.find((c) => c.id === detected.type)
    : null;

  const cardLogo = cardFromList?.images.small;
  const cardName = detected?.niceType ?? "Card";
  const maxLength = detected?.lengths?.[0] ?? 16;

  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // remove non-digits

    // Limit to 4 digits (MMYY)
    if (value.length > 4) value = value.slice(0, 4);

    // Auto-add slash after 2 digits
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setExp(value);

    // Check expiration
    if (value.length === 5) {
      // MM/YY
      const [monthStr, yearStr] = value.split("/");
      const month = parseInt(monthStr, 10);
      const year = parseInt("20" + yearStr, 10); // assuming 20YY

      const today = new Date();
      const expDate = new Date(year, month - 1, 1); // first day of month

      setExpired(expDate < new Date(today.getFullYear(), today.getMonth(), 1));
    } else {
      setExpired(false);
    }
  };

  const handleSave = () => {
    setLoading(true);
    if (!cardNum || !exp  || !cardName) {
      toast.error("All fields are requried.");
      setLoading(false);
      return;
    }
    try {
      addPaymentMethod({
        last_code: cardNum,
        exp: exp,
        img: cardLogo?.url || "",
        card_type: cardName,
        is_default: true,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col  h-65 p-4 bg-linear-to-r from-primary-gray-500/30 to-primary-gray-600 credit-card-cont rounded-2xl border border-primary-brown/30">
        <div className="h-[20%] card-name-cont flex items-start justify-end w-full">
          <Label className="text-white" variant="h2">
            {cardName}
          </Label>
        </div>
        <div className="h-[60%] w-full flex flex-col">
          <Image src={"/chip.png"} alt="" width={400} height={400} className="w-18 h-12"></Image>
          <div className="flex mt-4 gap-4">
            <Label variant="h1" className="text-white font-thin">
              {cardNum || "1234 5678 9123 4567"}
            </Label>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-4 justify-between h-full">
              <div className="flex gap-4">
                <div className="mt-2">
                  <Label className="text-[10px] font-thin">MONTH/YEAR</Label>
                  <Label className="text-white font-thin">EXP {exp}</Label>
                </div>
                <div className="mt-2">
                  <Label className="text-[10px] font-thin">CVC</Label>
                  <Label className="text-white font-thin">{cvc}</Label>
                </div>
              </div>
              <Label className="text-white font-thin uppercase">{owner || "JOHN DOE"}</Label>
            </div>
            <div className="h-full flex items-end">
              {cardLogo && (
                <Image
                  src={cardLogo.url}
                  alt={cardName}
                  width={cardLogo.width}
                  height={cardLogo.height}
                  className="w-12"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 mt-4">
        <Input
          type="text"
          label="Card Number"
          value={cardNum}
          onChange={(e) => {
            let raw = e.target.value.replace(/\D/g, "");
            if (raw.length > 16) {
              raw = raw.slice(0, 16);
            }
            const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
            setCardNum(formatted);
          }}
        />
        <Input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="uppercase"
          label="Card Holder"
        ></Input>
        <div className="flex gap-2">
          <Input
            value={exp}
            onChange={handleExpChange}
            label="Exp. Date (MM/YY)"
            placeholder="MM/YY"
          />

          <Input
            value={cvc}
            onChange={(e) => {
              let raw = e.target.value.replace(/\D/g, "");
              if (raw.length > 4) {
                raw = raw.slice(0, 4);
              }
              setCVC(raw);
            }}
            label="CVC"
          ></Input>
        </div>
        <div className="h-5">
          {expired && (
            <Label className="text-red-500 text-sm font-semibold">
              Expired
            </Label>
          )}
        </div>
        <Button onClick={handleSave} className="mt-4">
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <>
              <CreditCardIcon></CreditCardIcon>Save
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
