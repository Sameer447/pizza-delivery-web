"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthBrandPanel, MobileBrand } from "@/components/auth/auth-brand-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormValues = { email: string };

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>();
  const submit = async () => { setSubmitted(true); };
  return <main className="flex min-h-screen w-full bg-background text-foreground"><AuthBrandPanel><h1 className="type-display mb-4">Operational Excellence.</h1><p className="type-body-lg text-muted-foreground">Streamline your high-volume food service environments with precise, reliable, and fast management tools.</p></AuthBrandPanel><section className="relative flex w-full items-center justify-center overflow-y-auto p-8 sm:p-12 md:p-24 lg:w-1/2"><div className="w-full max-w-md space-y-8"><MobileBrand />{submitted ? <div className="space-y-5 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success"><CheckCircle2 className="h-7 w-7" /></div><div><h1 className="type-page-title mb-2">Check your email</h1><p className="text-body-reg text-muted-foreground">If an account exists for that address, we&apos;ve sent a secure password reset link. Open it to continue to <code className="text-xs">/reset-password?token=...</code>.</p></div></div> : <><div><h1 className="type-page-title mb-2">Forgot your password?</h1><p className="text-body-reg text-muted-foreground">Enter your email address and we&apos;ll send you a link to reset your password.</p></div><form className="space-y-6" onSubmit={handleSubmit(submit)}><div className="space-y-1"><label className="type-label-caps block" htmlFor="email">Email Address</label><div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input id="email" type="email" autoComplete="email" placeholder="chef@kitchen.com" required className="pl-10" {...register("email")} /></div></div><Button className="w-full" type="submit" disabled={isSubmitting}>Send Reset Link</Button></form></>}<Link className="flex items-center justify-center gap-1 text-body-sm font-medium text-primary hover:text-primary-container" href="/login"><ArrowLeft className="h-4 w-4" />Back to Sign In</Link></div><div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" /></section></main>;
}
