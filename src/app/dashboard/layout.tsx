"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/protected-route";
import { LogoutButton } from "@/components/logout-button";
import { useAuth } from "@/lib/auth";
import {
  Bell,
  Home,
  LogOut,
  Map,
  Droplets,
  Wrench,
  ChevronDown,
  Video,
  Camera,
  User,
  Settings,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AeroSightLogo } from "@/components/aerosight-logo";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userAvatar = PlaceHolderImages.find((p) => p.id === "user-avatar");

  // Get user display name and email from Firebase Auth
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "";
  const photoURL = user?.photoURL;

  // Generate initials from display name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="grid grid-cols-[auto_1fr] min-h-screen w-full">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2">
                <AeroSightLogo className="w-8 h-8 text-primary" />
                <h2 className="text-lg font-semibold text-foreground tracking-tight">
                  AeroSight
                </h2>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard">
                      <Home />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/route-optimizer">
                      <Map />
                      <span>Route Optimizer</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/damage-assessor">
                      <Camera />
                      <span>Damage Assessor</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/fuel-cost">
                      <Droplets />
                      <span>Fuel Cost</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/maintenance">
                      <Wrench />
                      <span>Maintenance</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/flight-debrief">
                      <Video />
                      <span>Flight Debrief</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 h-auto text-left text-sidebar-foreground hover:bg-muted/80 hover:text-foreground"
                  >
                    <Avatar className="h-8 w-8">
                      {photoURL ? (
                        <AvatarImage src={photoURL} alt={displayName} />
                      ) : userAvatar ? (
                        <AvatarImage
                          src={userAvatar.imageUrl}
                          alt="User Avatar"
                        />
                      ) : null}
                      <AvatarFallback>
                        {getInitials(displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 truncate">
                      <p className="font-semibold text-sm">{displayName}</p>
                      <p className="text-xs text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 mb-2"
                  side="top"
                  align="start"
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarFooter>
          </Sidebar>
          <div className="flex flex-col">
            <DashboardHeader />
            <main className="flex-1 p-4 sm:p-6 bg-muted/30">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
