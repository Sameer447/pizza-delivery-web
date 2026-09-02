import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function ForgotPasswordPage() { return <Card className="w-full max-w-md"><CardHeader><CardTitle>Password recovery</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-sm text-muted-foreground">Password reset will be available when the backend flow is enabled.</p><Link className="block text-center text-sm underline" href="/login">Return to sign in</Link></CardContent></Card>; }
