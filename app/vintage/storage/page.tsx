import BookInvite from "@/components/storage/BookInvite";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dot } from "lucide-react";
import Image from "next/image";
import React from "react";

const ownerShipBullets = [
  "Vintage Associates does not take ownership or legal title of any wines at any point.",
  "Your wine is held securely under a ringfenced sub-account, separate from other clients and from Vintage Associates’ business operations.",
  "This structure ensures that your wine is fully traceable and protected—even in the unlikely event of business disruption.",
];

const facilityBullets = [
  "24/7 surveillance, access controls, and climate stability ensure that your wines are protected in optimal ageing conditions.",
  "Every case is professionally handled by trained staff under strict operational protocols.",
];

const rotationBullets = [
  "Rotation Number (used to track movement and location)",
  "UID (Unique Identifier) (linked to the individual asset and your sub-account)",
];

const detailBullets = [
  "Logged at the time of storage",
  "Uploaded directly to your account in the Vintage Associates app",
  "Visible under the “Wine Details” section",
  "Downloadable at any time for your personal records or proof of ownership",
];

const cooBullets = [
  "Insuring your collection",
  "Selling or transferring wine",
  "Verifying provenance on the secondary market",
];

const transparencyBullents = [
  "Recorded and fully visible within your portfolio in the Vintage Associates app",
  "Logged with Rotation Numbers and UID references to maintain provenance and traceability",
  "Accompanied by app notifications to keep you informed in real-time of any movement affecting your holdings",
];

const controlBullets = [
  "View your full portfolio in real-time",
  "See all relevant wine details, including Rotation Numbers, UIDs, and provenance notes",
  "Download ownership reports at any time",
  "Track the value and market potential of your stored wine",
  "Receive timely notifications about any activity or transfer involving your wines",
];

const summaryBullets = [
  "100% client-owned wine – never co-mingled or claimed by us",
  "Ringfenced sub-accounts for legal clarity",
  "Industry-leading security and environmental controls",
  "Rotation & UID tracking for every case",
  "Liv-ex recommended documentation standards",
  "Full portfolio visibility and downloadable reports in-app",
  "Real-time transfer logging and app notifications",
];

const collapse = [
  {
    title: "100% Client Ownership – Always",
    desc: "All wine stored through Vintage Associates at Liv-ex Tilbury remains 100% legally owned by you, the client.",
    list: [],
    footer: "",
  },
  {
    title: "Storage in a World-Class Facility",
    desc: "Liv-ex Tilbury is a fully bonded, temperature-controlled facility purpose-built for fine wine. It is widely recognised across the industry as a benchmark for storage excellence.",
    list_desc: "",
    list: [],
    footer: "",
  },
  {
    title: "Rotation Numbers & UID Tracking",
    desc: "Every case of wine stored through us is assigned a unique:",
    list_desc: "These details are:",
    list: detailBullets,
    footer:
      "This level of traceability provides transparency and assurance, giving you a clear record of your holdings at all times.",
  },
  {
    title: "Proof of Ownership & Documentation",
    desc: "Liv-ex recommends that all clients are provided with Rotation Numbers and UIDs as part of their portfolio records. These details act as formal proof of purchase and legal ownership, and are crucial when:",
    list_desc: "",
    list: cooBullets,
    footer:
      "With Vintage Associates, your full wine history and documentation are just a tap away ensuring you’re always in control.",
  },
  {
    title: "Full Transparency of Transfers",
    desc: "All transfers in and out of your sub-account are:",
    list_desc: "",
    list: transparencyBullents,
    footer:
      "This means you will always be up to date on your wine’s location and status, whether adding new purchases or requesting withdrawals.",
  },
];

export default function Storage() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col gap-4 px-4 w-full max-w-[100vh]">
        <div className="rounded-t-2xl overflow-hidden">
          <Image
            src={
              "https://minuman.com/cdn/shop/articles/Uncork-the-Secrets-to-Building-an-Impressive-Wine-Collection.jpg?v=1759201086"
            }
            alt=""
            width={1000}
            height={1000}
            className="w-full rounded-t-4xl rounded-b-full border-b-8 border-primary-brown h-60 object-cover"
          ></Image>
        </div>
        <div className="w-full gap-4 flex flex-col">
          <div className="flex items-center justify-center">
            <Label className="" variant="h1">
              Your Wine, Safely Stored at{"\n"}Liv-ex Tilbury
            </Label>
          </div>
          <Label>
            At Vintage Associates, we take the security, integrity, and legal
            ownership of your fine wine portfolio seriously. That’s why we store
            all client wines at Liv-ex Tilbury, one of the most secure and
            respected bonded wine storage facilities in the UK and globally
            recognised by the fine wine trade.
          </Label>
          <Label>
            Below is everything you need to know about how your wine is stored
            and protected.
          </Label>

          {collapse.map((item, i) => (
            <div key={i}>
              <Label variant="h2" className="text-primary-brown">
                {item.title}
              </Label>
              <Label className="my-2">{item.desc}</Label>
              {item.list_desc !== "" && (
                <Label className="my-2">{item.list_desc}</Label>
              )}

              {item.list.length > 0 && (
                <div className="ml-4 my-2">
                  {item.list.map((item2, ii) => (
                    <div key={ii} className="flex gap-2">
                      <div>
                        <Dot color="white"></Dot>
                      </div>
                      <div>
                        <Label>{item2}</Label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Label>{item.footer}</Label>
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <Label className="" variant="h1">
              Why It Matters
            </Label>
            <Label>
              Storing your wine in a Liv-ex-approved, professionally managed
              account not only preserves the physical condition of your wine but
              also enhances its marketability, resale value, and credibility.
            </Label>
            <Label>
              From secure bonded warehousing to verifiable ownership and
              transparent account activity, every step is designed to protect
              your asset and give you peace of mind.
            </Label>
          </div>
        </div>
        <Card>
          <CardContent className="flex flex-col gap-4 p-4">
            <Label variant="h1" className="text-primary-brown">
              Summary: Key Benefits of Storage with Vintage Associates at Liv-ex
              Tilbury
            </Label>
            <div className="ml-4">
              {summaryBullets.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <div>
                    <Dot color="white"></Dot>
                  </div>
                  <div>
                    <Label>{item}</Label>
                  </div>
                </div>
              ))}
            </div>
            <Label>
              {" "}
              Your wine is valuable. It deserves world-class storage,
              professional oversight, and complete transparency. That’s exactly
              what we deliver.
            </Label>
            <Label>
              If you have any questions about your stored wine, your app
              dashboard, or how to access your documentation, please contact our
              support team.
            </Label>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
          <div className="w-full flex items-center justify-center">
            <Label variant="h1">Book your visit today</Label>
          </div>
          <BookInvite></BookInvite>
        </div>
      </div>
    </div>
  );
}
