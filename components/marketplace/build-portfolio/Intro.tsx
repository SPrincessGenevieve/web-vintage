"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ChartPie, ChevronLeft } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { usePortfolioBuilder } from "@/context/BuildPortfolioContext";
import { v4 as uuidv4 } from "uuid";
import Last from "./Last";

export default function Intro() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const { addToPortfolioBuilder, clearPortfolioBuilder, portfolio_builder } =
    usePortfolioBuilder();
  const portfolio_id = `portfolio-build-${uuidv4()}`;
  const current_id = portfolio_builder[0]?.id ?? "";

  console.log("PORTFOLIO ID: ", portfolio_id);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleAddPortfolioBuild = () => {
    const payload = {
      id: portfolio_id,
    };
    addToPortfolioBuilder(payload);
    setStep(2);
  };

  const handleNew = () => {
    setStep(1);
    clearPortfolioBuilder();
  };

  function NextStep() {
    switch (step) {
      case 1:
        return (
          <Step1 id={current_id} onClick={handleAddPortfolioBuild}></Step1>
        );
      case 2:
        return <Step2 id={current_id} next={handleNext}></Step2>;
      case 3:
        return (
          <Step3
            id={current_id}
            next={handleNext}
            onClick={() => setStep(4)}
          ></Step3>
        );
      case 4:
        return <Step4 id={current_id} next={handleNext}></Step4>;
      case 5:
        return (
          <Step5
            id={current_id}
            edit={() => setStep(2)}
            next={handleNext}
          ></Step5>
        );
      case 6:
        return <Last back={handleNew}></Last>;
    }
  }

  useEffect(() => {
    if (open === false) {
      setStep(1);
    }
  });

  useEffect(() => {
    clearPortfolioBuilder();
  }, [open]);

  console.log("BUILD: ", step);

  const handleBack = () => {
    setStep(step - 1);
    if (step === 2) {
      clearPortfolioBuilder();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          <Label className="text-black text-[12px]">
            <ChartPie></ChartPie>Build Portfolio
          </Label>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0  max-h-[90%] overflow-y-auto flex flex-col gap-2">
        {step !== 1 && step !== 6 && (
          <div className="w-full">
            <Button onClick={handleBack} className="" variant={"ghost"}>
              <ChevronLeft></ChevronLeft>Back
            </Button>
          </div>
        )}
        {step < 6 && (
          <div className="w-full flex items-center justify-center flex-col gap-4">
            <Label
              variant="h1"
              className="font-semibold text-primary-brown mt-4"
            >
              {step === 1
                ? "Portfolio Builder"
                : step === 2
                  ? "Investment Amount"
                  : step === 3
                    ? "Wine Region"
                    : step === 4
                      ? "Your Preference"
                      : "Portfolio Builder"}
            </Label>
            <div className="w-full relative px-4 flex items-center justify-between ">
              {Array.from({ length: 5 }).map((_, i) => {
                const index = i + 1;

                return (
                  <div
                    className={`${index === 5 ? "w-8" : "w-full"} flex items-center`}
                  >
                    <div
                      className={`min-h-8 min-w-8 z-20 border ${step === index ? "bg-primary-brown" : "bg-transparent"} border-primary-brown rounded-full flex items-center justify-center`}
                    >
                      <Label
                        className={`${step === index ? "text-black font-bold" : "text-primary-brown"}  text-[18px]`}
                      >
                        {index}
                      </Label>
                    </div>
                    {index !== 5 && (
                      <div className="w-full flex items-center justify-center">
                        <div className="h-[2px] rounded-2xl w-[70%] bg-primary-brown/30"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <NextStep></NextStep>
      </DialogContent>
    </Dialog>
  );
}
