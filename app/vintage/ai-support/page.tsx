import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";

export default function AISupport() {
  return (
    <Card className="h-full">
      <CardContent className="h-full">
        <object
          className="w-full h-full rounded-2xl"
          data="https://aichatbot.vintage-associates.com/"
          type="text/html"
          aria-label="Vintage Associates Chatbot"
        >
          <Label>
            Your browser does not support embedding external content.
          </Label>
        </object>
      </CardContent>
    </Card>
  );
}
