import type { Metadata } from "next";

const title = "Log-in";
const description =
  "We are using modern technologies for authenticate users and provide full aspects of modern security standarts";
const image = `http://static.simplepay.ai/static/logo.jpeg`;

export const metadata: Metadata = {
  title,
  description,
  icons: [`http://static.simplepay.ai/static/logo.jpeg`],
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

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
