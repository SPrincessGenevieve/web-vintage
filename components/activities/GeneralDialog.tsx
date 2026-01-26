import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Label } from "../ui/label";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import { ActivitiesT } from "@/lib/types";

interface GeneralT {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  item: ActivitiesT;
}

export default function GeneralDialog({ open, onOpenChange, item }: GeneralT) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>
        <div>
          <Table className="">
            <TableBody>
              <TableRow className="border-primary-brown/30">
                <TableCell>Status</TableCell>
                <TableCell className={`font-semibold `}>
                  <div className="flex">
                    <Label
                      className={`rounded-full px-2 font-semibold ${item.depost_detail?.deposit_status === "Complete" ? "bg-green-600 text-white" : item.depost_detail?.deposit_status === "Pending" ? "bg-blue-700 text-white" : "text-white"}`}
                    >
                      {item.depost_detail?.deposit_status}
                    </Label>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className="border-primary-brown/30">
                <TableCell>
                  {item.depost_detail?.deposit_type === "bank"
                    ? "Bank"
                    : "Card"}
                </TableCell>
                <TableCell className="font-semibold text-white">
                  {item.depost_detail?.deposit_type === "bank"
                    ? item.depost_detail.bank_name
                    : item.depost_detail?.card_name}
                </TableCell>
              </TableRow>
              <TableRow className="border-primary-brown/30">
                <TableCell>
                  {item.depost_detail?.deposit_type === "bank"
                    ? "Sort Code"
                    : "Card Number"}
                </TableCell>
                <TableCell className="font-semibold text-white">
                  {item.depost_detail?.deposit_type === "bank" ? (
                    <div>
                      <Label className="font-semibold text-white">
                        {item.depost_detail.bank_reference_code}
                      </Label>
                    </div>
                  ) : (
                    <div className="flex items-center h-full gap-2">
                      {!item.depost_detail?.card_image ? (
                        <CreditCard></CreditCard>
                      ) : (
                        <Image
                          src={item.depost_detail?.card_image ?? ""}
                          width={500}
                          height={500}
                          alt="card"
                          className="w-auto rounded-[4px] h-5"
                        />
                      )}
                      <Label className="font-semibold text-white">{`**** **** **** ${item.depost_detail?.card_last_num}`}</Label>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
