"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import {
  AuthBrandPanel,
  MobileBrand,
} from "@/components/auth/auth-brand-panel";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/auth-provider";
import { PageLoading } from "@/components/shared/states";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
  rememberMe: z.boolean().optional(),
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && isAuthenticated) router.replace("/dashboard");
  }, [isAuthenticated, isLoading, router]);
  if (isLoading || isAuthenticated) return <main className="flex min-h-screen items-center justify-center bg-background"><PageLoading /></main>;
  const submit = async (values: FormValues) => {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) =>
        setError(issue.path[0] as keyof FormValues, { message: issue.message }),
      );
      return;
    }
    try {
      await login(parsed.data);
    } catch {
      setError("root", {
        message: "Sign in failed. Check your credentials and try again.",
      });
    }
  };
  return (
    <main className="flex min-h-screen w-full bg-background text-foreground">
      <AuthBrandPanel>
        <h1 className="type-display mb-4">
          Operational Excellence, Delivered.
        </h1>
        <p className="type-body-lg text-muted-foreground">
          Sign in to access your dashboard, manage inventory, and optimize your
          kitchen workflow with real-time insights.
        </p>
      </AuthBrandPanel>
      <section className="flex w-full items-center justify-center p-8 sm:p-12 lg:w-1/2 lg:p-24">
        <div className="w-full max-w-md space-y-8">
          <MobileBrand />
          <div>
            <h2 className="type-display">Welcome back</h2>
            <p className="mt-2 text-body-reg text-muted-foreground">
              Please enter your details to sign in.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(submit)}>
            <div className="space-y-4">
              <div className="space-y-1">
                <label
                  className="block text-body-sm font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="manager@prokitchen.com"
                    className="pl-10"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-body-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <PasswordField
                id="password"
                label="Password"
                autoComplete="current-password"
                registration={register("password")}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-body-sm text-muted-foreground">
                <input
                  type="checkbox"
                  className="rounded-[var(--radius-sm)] text-primary focus:ring-primary"
                  {...register("rememberMe")}
                />
                Remember me
              </label>
              <Link
                className="text-body-sm font-medium text-primary hover:text-primary-container"
                href="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
            {errors.root && (
              <p className="text-body-sm text-destructive" role="alert">
                {errors.root.message}
              </p>
            )}
            <Button className="w-full" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Signing in…" : "Sign In"}
            </Button>
          </form>
          <p className="text-center text-body-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a
              className="font-medium text-primary hover:text-primary-container"
              href="mailto:support@prokitchen.com"
            >
              Contact Support
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
