"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { AuthBrandPanel, MobileBrand } from "@/components/auth/auth-brand-panel";
import { PasswordField, PasswordRequirement } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm<{ password: string; confirmPassword: string }>();
  const password = watch("password", "");
  const requirements = [{ label: "At least 8 characters", valid: password.length >= 8 }, { label: "One uppercase letter", valid: /[A-Z]/.test(password) }, { label: "One lowercase letter", valid: /[a-z]/.test(password) }, { label: "One number", valid: /\d/.test(password) }, { label: "One special character", valid: /[^A-Za-z0-9]/.test(password) }];
  return <main className="flex min-h-screen w-full bg-background text-foreground"><AuthBrandPanel dark><h2 className="mb-4 text-3xl font-bold text-white">Secure Your Access</h2><p className="type-body-lg leading-relaxed text-rose-100/80">Update your credentials to maintain operational security. Our system ensures strict access controls for high-volume environments.</p></AuthBrandPanel><section className="flex flex-1 flex-col items-center justify-center p-6 sm:p-12 lg:p-24"><div className="w-full max-w-md space-y-8"><MobileBrand /><div className="space-y-2"><Link className="mb-6 inline-flex items-center text-body-sm font-medium text-muted-foreground hover:text-primary" href="/login"><ArrowLeft className="mr-1 h-4 w-4" />Back to Login</Link><h2 className="type-page-title">Create a new password</h2><p className="text-body-reg text-muted-foreground">Please enter your new password below to regain access to your account.</p></div><form className="space-y-6" onSubmit={handleSubmit(async () => {})}><div className="space-y-4"><PasswordField id="password" label="New Password" autoComplete="new-password" registration={register("password")} /><PasswordField id="confirmPassword" label="Confirm Password" autoComplete="new-password" registration={register("confirmPassword")} /></div><div className="space-y-3 rounded-[var(--radius)] border bg-surface-low p-4"><p className="text-body-sm font-semibold">Password must contain:</p><ul className="space-y-2">{requirements.map((item) => <PasswordRequirement key={item.label} valid={item.valid}>{item.label}</PasswordRequirement>)}</ul></div><Button className="w-full" type="submit" disabled={isSubmitting}>Reset Password</Button></form></div></section></main>;
}
