import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";

const data = [
  {
    topic: "Vintage Associate",
    items: [
      {
        title: "Annual Fee: 3%",
        desc: "At Vintage Associates, your 3% membership fee opens the door to an exclusive, invite-only world crafted for sports professionals, celebrities, and high-profile collectors. We combine discretion, expertise, and luxury to ensure that your journey with fine wine is seamless, rewarding, and tailored to your lifestyle. Every aspect of our service is designed to enhance your life, from capital growth to unforgettable experiences.",
      },
    ],
  },
  {
    topic: "Your Membership Comes with the Following",
    items: [
      {
        title: "Private Marketplace & App Access",
        desc: "Step into our private marketplace, where exceptional wines are available at bottom-line pricing. Many of these vintages are rare or impossible to find elsewhere, and we are among the few who can deliver them discreetly worldwide. Through the Vintage Associates app, you can track, purchase, and arrange delivery of your collection at any time — giving you complete control and flexibility, wherever you are.",
      },
      {
        title: "Bespoke Storage & Full Insurance",
        desc: "Your collection is cared for in a bespoke, purpose-built facility, with full insurance covering the true value of every bottle. This ensures your assets are protected while you enjoy the freedom to focus on life’s other pleasures.",
      },
      {
        title: "Dedicated Portfolio Manager & Personal Concierge",
        desc: "Your portfolio is handled by a dedicated manager and personal concierge, working solely on your collection to maximise capital growth in a tax-efficient environment. They create tailored exit strategies designed for you and your loved ones, and act as your partner in everything related to fine wine. From sourcing the rarest bottles to orchestrating the perfect event — whether a wedding, birthday, or private celebration — your concierge ensures every detail aligns with your lifestyle.",
      },
      {
        title: "Performance Insights",
        desc: "Receive monthly, tailored reports on your collection’s performance, providing clarity on growth, opportunities, and market trends — all focused on enhancing the value of your portfolio.",
      },
      {
        title: "Celebratory First-Growth Cases",
        desc: "Mark life’s milestones with a case of prestigious First Growth wine, delivered to your door on your birthday and anniversary. These are rare bottles, carefully selected to celebrate the moments that matter.",
      },
      {
        title: "Priority Access to En Primeur",
        desc: "MarEnjoy first access to en primeur wines, purchasing exceptional vintages while they are still in the barrel. This gives you the opportunity to secure wines before they reach the broader market, an experience available to only a privileged few.",
      },
      {
        title: "Curated Events & Vineyard Experiences",
        desc: "As a member, you are invited to four exclusive events each year, fully hosted and included in your membership. From vineyard tours and château visits to fine wine dinners, these experiences are designed to immerse you in the world of wine while connecting you with a network of like-minded collectors.",
      },
      {
        title: "Part of an Exclusive Club",
        desc: "Joining Vintage Associates means becoming part of a highly selective community of sports professionals, celebrities, and collectors who share a passion for fine wine and exceptional experiences. Membership is limited, reinforcing the prestige, exclusivity, and elevated lifestyle of our members.",
      },
    ],
  },
];

export default function Profile() {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <Card>
        <CardContent className="flex w-full gap-4 items-center p-4">
          <div className="flex items-start justify-start">
            <Image
              src={"/status.png"}
              alt="status"
              width={400}
              height={400}
              className="h-full min-w-[100px] max-h-[130px] w-auto object-contain"
            ></Image>
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-white font-thin">Membership</Label>
            <Label className="text-primary-brown font-semibold">
              VINTAGE ASSOCIATE
            </Label>
            <div className="flex">
              <Label className="bg-primary-darkbrown px-2 p-1 rounded-sm font-semibold text-white">
                3% fee
              </Label>
            </div>
            <Label className="text-white">
              At Vintage Associates, your 3% membership fee opens the door to an
              exclusive, invite-only world crafted for sports professionals...
            </Label>
            <Dialog>
              <DialogTrigger>
                <Label className="font-semibold text-primary-brown">
                  Read more
                </Label>
              </DialogTrigger>
              <DialogContent className="max-h-[90%] overflow-y-auto p-4">
                {data.map((item, i) => (
                  <Card key={i} className="bg-primary-gray-600">
                    <CardContent className="bg-transparent p-4 flex flex-col gap-4">
                      <Label
                        variant="h2"
                        className="font-semibold text-primary-brown"
                      >
                        {item.topic}
                      </Label>
                      <div>
                        {item.items.map((item2, i2) => (
                          <div className="flex flex-col gap-4 mb-4" key={i2}>
                            <Label className="font-semibold text-white">
                              {item2.title}
                            </Label>
                            <Label>{item2.desc}</Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full overflow-y-auto">
        <CardContent className="w-full h-full">
          
        </CardContent>
      </Card>
    </div>
  );
}
