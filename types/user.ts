export interface VisaRoute {
  id: string;
  country: string;
  visaType: string;
  location: string;
}

export interface UserMetadata {
  subscriptionTier: "free" | "premium" | "enterprise";
  trackedRoutes: VisaRoute[];
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  onboardingCompleted: boolean;
}

export interface VisaSlot {
  id: string;
  country: string;
  location: string;
  visaType: string;
  availableDate: string;
  appointmentTime: string;
  status: "available" | "limited" | "unavailable";
  lastChecked: string;
}
