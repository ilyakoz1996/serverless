'use client'

import { useRouter } from "next/navigation"
import nProgress from "@/lib/nprogress"
import { useEffect } from "react"
import Link from "next/link"
import LStorage from "@/core/localStorage"
import AuthPopup from "@/components/ui/loginButton"
import { useAuth } from "@/core/providers/authProvider"

export default function LoginPage () {

    const storage = new LStorage()

    useEffect(() => {
        storage.projects.deleteProjects()
        storage.users.deleteUser()
    }, [])

    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (user?.id) {
            nProgress.start()
            router.push('/dashboard')
        } else {
            console.log("NO SESSION!")
            return
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center w-full hd-screen">
            <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
                        <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Login
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Share access to your credentials from Simple ID App
                        </p>
                        </div>
                       <AuthPopup /> 
                    </div>
                    <div className="flex flex-col w-full mt-6 max-w-md">
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                            </p>
                    </div>
                </div>
        </div>
    )
}