"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { agreement_list_2 } from "@/lib/selection";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/UserContext";

const renderHtmlText = (
  htmlString: string,
  baseStyle?: React.CSSProperties
) => {
  const withLineBreaks = htmlString.replace(/<br\s*\/?>/g, "\n");
  const parts = withLineBreaks.split(/<\/?b>/);

  const elements = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;

    if (i % 2 === 1) {
      elements.push(
        <span
          key={i}
          style={{ ...baseStyle, fontWeight: "bold" }}
          className="font-poppins-bold"
        >
          {part}
        </span>
      );
    } else {
      elements.push(
        <span key={i} style={baseStyle} className="font-poppins-light">
          {part}
        </span>
      );
    }
  }

  return <span style={baseStyle}>{elements}</span>;
};

export default function AgreementDialog() {
  const {
    setUserDetails,
    agree_terms_condition,
    agree_collection_warning,
    agree_liquidity_risk,
    agree_price_risk,
  } = useUserContext();

  return (
    <Dialog>
      <DialogTrigger>
        <Card>
          <CardContent>
            <CardHeader className="p-0 flex items-center gap-4">
              <Checkbox checked={agree_terms_condition}></Checkbox>
              <CardTitle className="flex items-center gap-4 text-white">
                <Label htmlFor="agree" className="underline text-primary-brown">
                  Accept terms and conditions *
                </Label>
              </CardTitle>
            </CardHeader>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="h-full max-h-[90%] overflow-y-auto scroll-area">
        <DialogHeader>
          <DialogTitle>Terms and Agreement</DialogTitle>
        </DialogHeader>
        {agreement_list_2.map((agreement_list_2, index) =>
          agreement_list_2.content.map((item, index_1) => (
            <div className="px-4 flex flex-col w-full " key={index_1}>
              {item.title !== "" && (
                <div className="flex flex-row my-4 w-full  items-start gap-2 border-t border-[#A27B5C]">
                  <Label
                    style={{ color: "white" }}
                    className="text-xl font-poppins-semibold text-primary-gold w-8"
                  >
                    {index_1 + 1}.
                  </Label>
                  <Label
                    style={{ color: "white" }}
                    className="font-poppins-semibold w-[90%] text-xl text-primary-gold"
                  >
                    {item.title}
                  </Label>
                </div>
              )}
              {/* 👇 MODIFICATION HERE: Use the utility function to render the description */}
              {item.description !== "" && (
                <Label className="text-[14px] font-poppins-regular text-white/70">
                  {renderHtmlText(item.description)}
                </Label>
              )}
              {item.bullets.map((item_2, index2) => (
                <div className="items-start ml-8">
                  <div key={index2} className="flex flex-row gap-2 items-start">
                    <div>
                      <div
                        style={{ borderRadius: 100 }}
                        className="w-[5px] h-[5px] mt-2 rounded-full bg-white/70"
                      ></div>
                    </div>
                    <div>
                      <Label className=" text-white/70 ">
                        {renderHtmlText(item_2.title)}
                      </Label>
                    </div>
                  </div>
                  {/* <div key={index2} className="flex-row gap-2 ml-8 items-start">
                        <div style={{ borderRadius: 100 }} className="w-[5px] h-[5px] mt-2 rounded-full border"></div>
                        <Label className="">{renderHtmlText(item_3.subtitle)}</Label>
                      </div> */}

                  {item_2.bullets.length > 0 &&
                    item_2.bullets.map((item_3, index3) => {
                      const isString = typeof item_3 === "string";

                      return (
                        <div
                          key={index3}
                          className="flex flex-row gap-2 ml-8 items-start"
                        >
                          <div>
                            <div
                              style={{ borderRadius: 100 }}
                              className="w-[5px] h-[5px] mt-2 rounded-full bg-white/70"
                            ></div>
                          </div>

                          {isString ? (
                            <Label className=" text-white/70">
                              {renderHtmlText(item_3)}
                            </Label>
                          ) : (
                            <div>
                              {item_3.title ? (
                                <Label className=" text-white/70">
                                  {item_3.title}
                                </Label>
                              ) : null}

                              {item_3.bullets?.map((sub, i) => (
                                <Label className=" text-white/70" key={i}>
                                  {renderHtmlText(sub)}
                                </Label>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              ))}

              <div className="gap-4">
                {item.sub_data.map((item_sub, index_sub) => (
                  <div className="ml-8">
                    <div className="flex flex-row gap-2">
                      <Label className="w-6 font-semibold text-white/70">
                        {index_1 + 1}.{index_sub + 1}
                      </Label>
                      <Label
                        style={{ fontWeight: "700" }}
                        className="font-semibold text-white/70"
                      >
                        {renderHtmlText(item_sub.subtitle)}
                      </Label>
                    </div>
                    {item_sub.subdescription !== "" && (
                      <Label className="text-white/70">
                        {renderHtmlText(item_sub.subdescription)}
                      </Label>
                    )}
                    <div>
                      {item_sub.subbullets.map(
                        (item_sub_bullets, item_sub_index) => (
                          <div
                            key={item_sub_index}
                            className="flex flex-row gap-2 ml-8 items-start"
                          >
                            <div>
                              <div
                                style={{ borderRadius: 100 }}
                                className="w-[5px] h-[5px] mt-2 rounded-full bg-white/70"
                              ></div>
                            </div>
                            <Label className=" text-white/70">
                              {renderHtmlText(item_sub_bullets.title)}
                            </Label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {item.footer !== "" && (
                <Label className="text-[14px] font-poppins-regular text-white/70">
                  {renderHtmlText(item.footer)}
                </Label>
              )}
            </div>
          ))
        )}

        <div className="p-4">
          {agreement_list_2.map((item_content, index_content) =>
            item_content.footer.map((item, index) => {
              return (
                <div key={index}>
                  {/* Footer Title */}

                  <div className="flex flex-row my-4 w-full items-start gap-2 border-t border-[#A27B5C]">
                    <Label
                      style={{ color: "white" }}
                      className="text-xl font-poppins-semibold text-primary-gold w-8"
                    >
                      22.
                    </Label>
                    <Label
                      style={{ color: "white" }}
                      className="font-poppins-semibold w-[90%] text-xl text-primary-gold"
                    >
                      {item.title}
                    </Label>
                  </div>

                  {/* Content Loop */}
                  {item.content.map((item_2, index_2) => {
                    const isString = typeof item_2 === "string";

                    return (
                      <div key={index_2} className="flex flex-col">
                        {isString ? (
                          // If it's a string → render HTML
                          <Label className=" text-white/70">
                            {renderHtmlText(item_2)}
                          </Label>
                        ) : (
                          // If it's an object → display title + description
                          <div className="flex flex-col gap-4 my-2">
                            <div className="flex flex-col">
                              <Label className=" text-white/70">
                                {item_2.title ? (
                                  <Label
                                    style={{ fontWeight: "600" }}
                                    className=" text-white/70"
                                  >
                                    {renderHtmlText(item_2.title)}
                                  </Label>
                                ) : null}
                              </Label>

                              {item_2.description ? (
                                <Label className="text-white/70">
                                  {renderHtmlText(item_2.description)}
                                </Label>
                              ) : null}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
        <div className="w-full">
          <Button
            variant={"ghost"}
            className="gap-2 flex  flex-row items-center p-4"
          >
            <Checkbox
              checked={agree_terms_condition}
              onCheckedChange={(value) =>
                setUserDetails({
                  agree_terms_condition: value === true,
                })
              }
              id="agree_true"
            />
            <Label htmlFor="agree_true" className="text-white/70 underline">
              Accept terms and conditions. *
            </Label>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
