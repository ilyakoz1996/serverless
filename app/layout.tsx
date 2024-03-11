import { ThemeProvider } from "@/core/providers/theme-provider";
import { Metadata } from "next";
import QueryProvider from "@/core/providers/queryProvider";
import "./globals.css";
import { Suspense } from "react";
import NProgressDone from "@/components/ui/loadingBar";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/core/providers/authProvider";

const title = "Crypto processing gateway";
const description =
  "This is a crypto processing gateway helping business to accept crypto payments";
const image = "https://styles.redditmedia.com/t5_2zeuzg/styles/communityIcon_5l86dvdpvhy61.png";

export const metadata: Metadata = {
  title,
  description,
  icons: ["https://styles.redditmedia.com/t5_2zeuzg/styles/communityIcon_5l86dvdpvhy61.png"],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@simplepay",
  },
  metadataBase: new URL(`http://localhost:3000`),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="flex flex-col h-full w-full" suppressHydrationWarning={true}>
        <Suspense fallback={null}>
		      <NProgressDone />
	      </Suspense>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
