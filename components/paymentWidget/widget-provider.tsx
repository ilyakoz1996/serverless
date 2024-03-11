"use client";

import { IPaymentLink, IProduct, IProject, IToken } from "@/core/types";
import { createContext, useContext, useState } from "react";

const WidgetContext = createContext<any>(null);

export default function WidgetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [paymentLink, setPaymentLink] = useState<{data: IPaymentLink | null | undefined, isLoading: boolean}>({
    data: null, isLoading: true
  });
  const [project, setProject] = useState<{data: IProject| null | undefined, isLoading: boolean}>({
    data: null, isLoading: true
  });
  const [product, setProduct] = useState<{data: IProduct| null | undefined, isLoading: boolean}>({
    data: null, isLoading: true
  });
  const [tokens, setTokens] = useState<{data: IToken[] | null | undefined, isLoading: boolean}>({
    data: null, isLoading: true
  });
  const [transaction, setTransaction] = useState<number | undefined>(0);
  const [invoice, setInvoice] = useState<any | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [fields, setFields] = useState<any | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [token, setToken] = useState<IToken | null>(null);
  const [step, setStep] = useState<
  | "main"
  | "fields"
  | "selectToken"
  | "connectWallet"
  | "payment"
  | "processing"
  | "succsess"
>("main");

  const value = {
    invoice,
    tokens,
    email,
    fields,
    paymentLink,
    project,
    product,
    wallet,
    token,
    step,
    price,
    transaction,
    setInvoice,
    setTransaction,
    setPrice,
    setTokens,
    setEmail,
    setFields,
    setPaymentLink,
    setProject,
    setProduct,
    setWallet,
    setToken,
    setStep
  };

  return (
    <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>
  );
}

export const useWidgetContext = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
