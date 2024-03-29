const PUBLIC_ROUTE = [
    "/auth/login",
    "/auth/signup",
    "/auth/onboarding",
    "/auth/confirm-otp",
    "/auth/congratulations",
    "/auth/set-password",
    "/auth/forgot-password",
    "/auth/confirm-otp",
    "/auth/congratulations",
];
const PROTECTED_ROUTE = [
    "/api/v1/bids",
    "/api/v1/bids/check-bid-status",
    "/api/v1/bids/manage-bid",
    "/api/v1/fx",
    "/api/v1/fx/add-new-fx",
    "/api/v1/fx/fx-bidders",
    "/api/v1/fx/manage-fx",
    "/api/v1/tenders",
    "/api/v1/tenders/add-tender",
    "/api/v1/tenders/send-tender",
    "/api/v1/tenders/manage-tender",
    "/api/v1/vendors",
    "/api/v1/vendors/add-vendor",
    "/api/v1/vendors/manage-vendor",
    "/api/uploads/tender-files"
];

const Headers = {
    "x-pol-rfx-secret": process.env.X_POL_RFX_SECRET,
    "Content-Type": "application/json",
};

const DOCUMENTS_URL = `https://pub-89612445d44947dd8493fffbc7e59fdf.r2.dev`;

export {
    PROTECTED_ROUTE,
    PUBLIC_ROUTE,
    Headers,
    DOCUMENTS_URL
}