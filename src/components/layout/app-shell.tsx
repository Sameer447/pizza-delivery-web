"use client";
import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
export function AppShell({ children }: { children: ReactNode }) { const [sidebarOpen, setSidebarOpen] = useState(false); return <div className="flex min-h-screen"><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><div className="flex min-w-0 flex-1 flex-col"><Header onMenuClick={() => setSidebarOpen(true)} /><main className="min-h-0 flex-1">{children}</main></div></div>; }
