// Assuming these are your Prisma model types or simplified versions for demonstration
type FxBidder = {
    email: string;
    role: string;
    verified: boolean;
};

type Contractor = {
    email: string;
    role: string;
    verified: boolean;
};

// A union type for user, since it can be either a FxBidder or a Contractor
type User = FxBidder | Contractor;

/// <reference types="astro/client" />
declare namespace App {
    interface Locals {
        user?: User;
        isLoggedIn: boolean;
    }
}
