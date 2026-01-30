"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Plane } from "lucide-react";

export default function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity">
              <Plane className="h-6 w-6" />
              <span>Find Visa Slot</span>
            </Link>
          </div>

          <nav className="flex items-center gap-6">
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/pricing"
                  className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
