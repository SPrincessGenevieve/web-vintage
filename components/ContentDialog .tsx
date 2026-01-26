import { CardDeposit, CardDepositDashboard, DepositOption, StepBankTranserStep1, StepBankTranserStep2, StepBankTranserStep3 } from "./TradeSteps";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ContentDialogProps {
  content: string;
  setContent: (c: string) => void;
  referenceCode: string;
  copied: boolean;
  setCopied: (b: boolean) => void;
  handleCopy: () => void;
  bankAmount: string;
  setBankAmount: (v: string) => void;
  cardAmount: string;
  setCardAmount: (v: string) => void;
  handleTrade: (type: string) => void;
  reference_code: string;
}

export const ContentDialog = ({
  content,
  setContent,
  referenceCode,
  copied,
  setCopied,
  handleCopy,
  bankAmount,
  setBankAmount,
  cardAmount,
  setCardAmount,
  handleTrade,
  reference_code
}: ContentDialogProps) => {
  switch (content) {
    case "Option":
      return (
        <DepositOption
          onClickBank={() => setContent("Bank Transfer")}
          onClickCard={() => setContent("Card Transfer")}
        />
      );

    case "Bank Transfer":
      return (
        <StepBankTranserStep1
          onClickNo={() => setContent("Option")}
          onClickYes={() => setContent("Reference Code")}
        />
      );

    case "Card Transfer":
      return (
        <CardDepositDashboard
          value={Number(cardAmount)}
          onClick={() => handleTrade("card")}
          onChange={(e) => setCardAmount(e.target.value)}
        />
      );

    case "Reference Code":
      return (
        <StepBankTranserStep2
          referenceCode={referenceCode}
          copied={copied}
          setCopied={setCopied}
          onClick={handleCopy}
          onClickDone={() => setContent("TransferFunds")}
        />
      );

    case "TransferFunds":
      return <StepBankTranserStep3 reference_code={reference_code} onClick={() => setContent("EnterAmountBank")} />;

    case "EnterAmountBank":
      return (
        <div className="flex flex-col gap-4">
          <Label variant="h1" className="mb-4">
            Enter the amount you sent below and tap Submit.
          </Label>
          <Input
            value={bankAmount}
            onChange={(e) => setBankAmount(e.target.value)}
            type="text"
            inputMode="decimal"
            className="text-center"
            label="Amount (GBP)"
            placeholder="e.g. 100"
          />
          <Button className="w-full mt-2" onClick={() => handleTrade("bank")}>
            Submit
          </Button>
        </div>
      );

    case "DepositCard":
      return (
        <CardDeposit
          value={Number(cardAmount)}
          onClick={() => setContent("")}
          onChange={(e) => setCardAmount(e.target.value)}
          close={() => setContent("Option")}
        />
      );

    default:
      return null;
  }
};
