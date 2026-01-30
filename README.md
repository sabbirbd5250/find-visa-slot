# Find Visa Slot

Never miss a visa appointment slot. Get real-time notifications for visa appointment availability.

## Features

- 🔐 **Clerk Authentication**: Sign-in, sign-up, and protected routes
- 🎨 **Premium Design**: Lovable/Linear aesthetic with Inter font
- ✈️ **Flight Ticket Style Cards**: Beautiful visa slot cards
- 📱 **Responsive**: Works on all devices
- 🔔 **Real-time Alerts**: Track visa appointments 24/7
- 🌍 **Global Coverage**: 100+ countries and locations
- ⚡ **Fast Monitoring**: Check every 5 minutes (Premium)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Clerk account ([clerk.com](https://clerk.com))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sabbirbd5250/find-visa-slot.git
cd find-visa-slot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

Get your Clerk keys from the [Clerk Dashboard](https://dashboard.clerk.com).

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── (auth)/
│   │   ├── sign-in/        # Sign in page
│   │   └── sign-up/        # Sign up page
│   ├── dashboard/          # Protected dashboard
│   ├── onboarding/         # Route selection onboarding
│   ├── pricing/            # Pricing page
│   ├── layout.tsx          # Root layout with Clerk provider
│   └── page.tsx            # Landing page
├── components/
│   ├── Header.tsx          # Navigation header
│   └── VisaSlotCard.tsx    # Flight ticket style card
├── types/
│   └── user.ts             # User metadata types
└── middleware.ts           # Route protection middleware
```

## Pages

- **Landing Page** (`/`): Hero, Live Feed, Pricing, Footer
- **Sign In** (`/sign-in`): Authentication page
- **Sign Up** (`/sign-up`): Registration page
- **Onboarding** (`/onboarding`): Select visa routes to track
- **Dashboard** (`/dashboard`): Protected user dashboard
- **Pricing** (`/pricing`): Subscription plans

## User Metadata Structure

```typescript
interface UserMetadata {
  subscriptionTier: "free" | "premium" | "enterprise";
  trackedRoutes: VisaRoute[];
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  onboardingCompleted: boolean;
}
```

## License

MIT

## Support

For support, email support@findvisaslot.com
