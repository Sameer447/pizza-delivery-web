import { Ban } from "lucide-react";
import { AuthStateCard } from "@/components/auth/auth-state-card";
export default function AccessDeniedPage() { return <AuthStateCard icon={Ban} title="Access denied" message="You don't have permission to access this area. If you believe this is an error, please contact your system administrator." action="Return to Dashboard" />; }
