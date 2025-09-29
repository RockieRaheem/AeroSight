"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, PanelLeft, Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AeroSightLogo } from "../aerosight-logo";

export function DashboardHeader() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs bg-sidebar text-sidebar-foreground border-none p-0">
          <nav className="grid gap-6 text-lg font-medium p-6">
            <Link
              href="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <AeroSightLogo className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">AeroSight</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            {/* Add other links for mobile nav here */}
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.slice(1).map((segment, index) => (
            <React.Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === pathSegments.length - 2 ? (
                  <BreadcrumbPage className="capitalize">{segment.replace('-', ' ')}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={`/${pathSegments.slice(0, index + 2).join('/')}`} className="capitalize">
                      {segment.replace('-', ' ')}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
       <Button variant="outline" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
       </Button>
    </header>
  );
}

// Minimal Breadcrumb component for use in this header
const React = require("react");
const Breadcrumb = (props: any) => <nav aria-label="breadcrumb" {...props} />;
const BreadcrumbList = React.forwardRef((props: any, ref: any) => <ol ref={ref} className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5" {...props} />);
const BreadcrumbItem = React.forwardRef((props: any, ref: any) => <li ref={ref} className="inline-flex items-center gap-1.5" {...props} />);
const BreadcrumbLink = React.forwardRef(({ asChild, ...props }: any, ref: any) => <a ref={ref} className="transition-colors hover:text-foreground" {...props} />);
const BreadcrumbPage = React.forwardRef((props: any, ref: any) => <span ref={ref} role="link" aria-disabled="true" aria-current="page" className="font-normal text-foreground" {...props} />);
const BreadcrumbSeparator = (props: any) => <li role="presentation" aria-hidden="true" {...props}><svg width="1em" height="1em" viewBox="0 0 24 24"><path d="m9 18l6-6l-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"></path></svg></li>;
