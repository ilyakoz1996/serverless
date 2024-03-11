'use client'

import * as nProgress from "@/lib/nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function NProgressDone() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	useEffect(() => {nProgress.done()}, [pathname, searchParams]);
	return null;
}