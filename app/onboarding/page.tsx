"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { CheckCircle2 } from "lucide-react";

const countries = [
  { id: "us", name: "United States", visaTypes: ["B1/B2 Tourist", "F1 Student", "H1B Work"] },
  { id: "uk", name: "United Kingdom", visaTypes: ["Standard Visitor", "Student", "Work"] },
  { id: "ca", name: "Canada", visaTypes: ["Temporary Resident", "Study Permit", "Work Permit"] },
  { id: "au", name: "Australia", visaTypes: ["Visitor", "Student", "Work and Holiday"] },
  { id: "de", name: "Germany", visaTypes: ["Schengen Tourist", "Student", "Work"] },
];

const locations = {
  us: ["US Embassy, New Delhi", "US Consulate, Mumbai", "US Consulate, Chennai"],
  uk: ["VFS Global, New Delhi", "VFS Global, Mumbai", "VFS Global, Bengaluru"],
  ca: ["VAC, New Delhi", "VAC, Mumbai", "VAC, Bengaluru"],
  au: ["AVAC, New Delhi", "AVAC, Mumbai"],
  de: ["VFS Global, New Delhi", "VFS Global, Mumbai"],
};

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedVisaType, setSelectedVisaType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleCountrySelect = (countryId: string) => {
    setSelectedCountry(countryId);
    setSelectedVisaType("");
    setSelectedLocation("");
    setStep(2);
  };

  const handleVisaTypeSelect = (visaType: string) => {
    setSelectedVisaType(visaType);
    setStep(3);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const handleComplete = async () => {
    // In a real app, this would save to user metadata
    // For now, we'll just redirect to dashboard
    await user?.update({
      unsafeMetadata: {
        onboardingCompleted: true,
        trackedRoutes: [
          {
            id: Date.now().toString(),
            country: countries.find(c => c.id === selectedCountry)?.name,
            visaType: selectedVisaType,
            location: selectedLocation,
          },
        ],
      },
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Let&apos;s Get You Set Up</h1>
          <p className="text-lg text-muted-foreground">
            Select the visa route you want to track
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {step > 1 ? <CheckCircle2 className="h-5 w-5" /> : '1'}
              </div>
              <span className="text-sm font-medium">Country</span>
            </div>
            <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-border'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {step > 2 ? <CheckCircle2 className="h-5 w-5" /> : '2'}
              </div>
              <span className="text-sm font-medium">Visa Type</span>
            </div>
            <div className={`w-16 h-0.5 ${step >= 3 ? 'bg-primary' : 'bg-border'}`} />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {step > 3 ? <CheckCircle2 className="h-5 w-5" /> : '3'}
              </div>
              <span className="text-sm font-medium">Location</span>
            </div>
          </div>
        </div>

        {/* Step 1: Select Country */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-6">Select a country</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {countries.map((country) => (
                <button
                  key={country.id}
                  onClick={() => handleCountrySelect(country.id)}
                  className="p-6 text-left border border-border rounded-lg hover:border-primary hover:bg-accent transition-colors"
                >
                  <h3 className="font-semibold text-lg">{country.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {country.visaTypes.length} visa types available
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Visa Type */}
        {step === 2 && selectedCountry && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Select visa type</h2>
              <button
                onClick={() => setStep(1)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Change country
              </button>
            </div>
            <div className="grid gap-4">
              {countries.find(c => c.id === selectedCountry)?.visaTypes.map((visaType) => (
                <button
                  key={visaType}
                  onClick={() => handleVisaTypeSelect(visaType)}
                  className="p-6 text-left border border-border rounded-lg hover:border-primary hover:bg-accent transition-colors"
                >
                  <h3 className="font-semibold">{visaType}</h3>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select Location */}
        {step === 3 && selectedCountry && selectedVisaType && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Select location</h2>
              <button
                onClick={() => setStep(2)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Change visa type
              </button>
            </div>
            <div className="grid gap-4">
              {locations[selectedCountry as keyof typeof locations]?.map((location) => (
                <button
                  key={location}
                  onClick={() => handleLocationSelect(location)}
                  className={`p-6 text-left border rounded-lg transition-colors ${
                    selectedLocation === location
                      ? 'border-primary bg-accent'
                      : 'border-border hover:border-primary hover:bg-accent'
                  }`}
                >
                  <h3 className="font-semibold">{location}</h3>
                </button>
              ))}
            </div>
            
            {selectedLocation && (
              <div className="mt-8 p-6 border border-border rounded-lg bg-card">
                <h3 className="font-semibold mb-4">Your Selection</h3>
                <div className="space-y-2 text-sm mb-6">
                  <p><span className="text-muted-foreground">Country:</span> {countries.find(c => c.id === selectedCountry)?.name}</p>
                  <p><span className="text-muted-foreground">Visa Type:</span> {selectedVisaType}</p>
                  <p><span className="text-muted-foreground">Location:</span> {selectedLocation}</p>
                </div>
                <button
                  onClick={handleComplete}
                  className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Start Tracking
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
