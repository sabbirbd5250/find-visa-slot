"use client";

import { Calendar, Clock, MapPin, Plane } from "lucide-react";
import type { VisaSlot } from "@/types/user";

interface VisaSlotCardProps {
  slot: VisaSlot;
}

export default function VisaSlotCard({ slot }: VisaSlotCardProps) {
  const statusColors = {
    available: "bg-green-500",
    limited: "bg-yellow-500",
    unavailable: "bg-gray-400",
  };

  const statusLabels = {
    available: "Available",
    limited: "Limited Slots",
    unavailable: "Unavailable",
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
      {/* Flight ticket style perforated edge */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background -ml-4"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background -mr-4"></div>
      
      {/* Status indicator */}
      <div className="absolute top-4 right-4">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white ${statusColors[slot.status]}`}>
          {statusLabels[slot.status]}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-3">
              <Plane className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{slot.country}</h3>
              <p className="text-sm text-muted-foreground">{slot.visaType}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 border-t border-dashed border-border pt-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{slot.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{new Date(slot.availableDate).toLocaleDateString('en-US', { 
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{slot.appointmentTime}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Last checked: {new Date(slot.lastChecked).toLocaleTimeString()}
          </p>
          <button className="text-sm font-medium text-primary hover:underline">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
