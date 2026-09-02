import { AlertCircle, Inbox } from "lucide-react";
export function PageLoading() { return <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground" role="status">Loading…</div>; }
export function TableSkeleton() { return <div className="h-48 animate-pulse rounded-lg bg-muted" aria-label="Loading table" />; }
export function CardSkeleton() { return <div className="h-28 animate-pulse rounded-lg bg-muted" aria-label="Loading card" />; }
export function ErrorState({ message = "Something went wrong. Please try again." }: { message?: string }) { return <div className="flex min-h-48 flex-col items-center justify-center gap-2 text-center"><AlertCircle className="text-destructive" /><p className="text-sm text-muted-foreground">{message}</p></div>; }
export function EmptyState({ message = "Nothing to show yet." }: { message?: string }) { return <div className="flex min-h-48 flex-col items-center justify-center gap-2 text-center"><Inbox className="text-muted-foreground" /><p className="text-sm text-muted-foreground">{message}</p></div>; }
