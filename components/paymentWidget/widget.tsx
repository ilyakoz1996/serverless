"use client";

import WidgetContainer from "./widget-container";
import WidgetProvider from "./widget-provider";

export default function Widget({ id }: { id: string }) {

  return (
    <div className="flex flex-col w-full items-center justify-end lg:justify-center hd-screen">
      <WidgetProvider>
          <WidgetContainer paymentLinkId={id} />
      </WidgetProvider>
    </div>
  );
}
