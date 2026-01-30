"use client";

import { useUser } from "@clerk/nextjs";
import Header from "@/components/Header";
import VisaSlotCard from "@/components/VisaSlotCard";
import { Plus, Settings } from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const mockTrackedRoutes = [
  {
    id: "1",
    country: "United States",
    visaType: "B1/B2 Tourist",
    location: "US Embassy, New Delhi",
  },
];

const mockAvailableSlots = [
  {
    id: "1",
    country: "United States",
    location: "US Embassy, New Delhi",
    visaType: "B1/B2 Tourist",
    availableDate: "2026-02-15",
    appointmentTime: "10:00 AM",
    status: "available" as const,
    lastChecked: new Date().toISOString(),
  },
  {
    id: "2",
    country: "United States",
    location: "US Consulate, Mumbai",
    visaType: "B1/B2 Tourist",
    availableDate: "2026-02-20",
    appointmentTime: "2:30 PM",
    status: "limited" as const,
    lastChecked: new Date().toISOString(),
  },
];

export default function DashboardPage() {
  const { user } = useUser();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName || 'there'}!</h1>
          <p className="text-muted-foreground">
            Track your visa appointment slots and get notified instantly
          </p>
        </div>

        {/* Tracked Routes */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Your Tracked Routes</h2>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Plus className="h-4 w-4" />
              Add Route
            </Link>
          </div>
          
          {mockTrackedRoutes.length > 0 ? (
            <div className="grid gap-4">
              {mockTrackedRoutes.map((route) => (
                <div
                  key={route.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg bg-card"
                >
                  <div>
                    <h3 className="font-semibold">{route.country}</h3>
                    <p className="text-sm text-muted-foreground">{route.visaType} • {route.location}</p>
                  </div>
                  <button className="p-2 hover:bg-accent rounded-md transition-colors">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground mb-4">No routes tracked yet</p>
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Route
              </Link>
            </div>
          )}
        </section>

        {/* Available Slots */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Available Slots</h2>
            <p className="text-muted-foreground">
              Latest visa appointment slots for your tracked routes
            </p>
          </div>
          
          {mockAvailableSlots.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAvailableSlots.map((slot) => (
                <VisaSlotCard key={slot.id} slot={slot} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">
                No available slots at the moment. We&apos;re monitoring 24/7 and will notify you when slots become available.
              </p>
            </div>
          )}
        </section>

        {/* Subscription Info */}
        <section className="mt-12 p-6 border border-border rounded-lg bg-muted/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Free Plan</h3>
              <p className="text-sm text-muted-foreground">
                Tracking 1 route • Email notifications • Checks every 30 minutes
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Upgrade
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
