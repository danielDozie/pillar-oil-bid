export const menu = {
  admin: {
    upper: [
      { id: 1, name: "Dashboard", icon: "majesticons:home", link: "/u/admin" },
      { id: 2, name: "Vendors", icon: "majesticons:user", link: "/u/admin/vendors" },
      { id: 3, name: "Tenders", icon: "majesticons:analytics", link: "/u/admin/tenders" },
      // { id: 4, name: "FX", icon: "majesticons:dollar-circle", link: "/dashboard/fx" },
      { id: 5, name: "Report", icon: "majesticons:noteblock-text", link: "/u/admin/report" },
    ],
    lower: [
      { id: 6, name: "Settings", icon: "majesticons:cog", link: "/u/admin/settings" },
      { id: 7, name: "Logout", icon: "majesticons:logout", link: "/api/auth/logout" },
    ]
  },
  operator: {
    upper: [
      { id: 1, name: "Dashboard", icon: "majesticons:home", link: "/u/operator" },
      { id: 2, name: "Vendors", icon: "majesticons:user", link: "/u/operator/vendors" },
      { id: 3, name: "Tenders", icon: "majesticons:analytics", link: "/u/operator/tenders" },
      // { id: 4, name: "FX", icon: "majesticons:dollar-circle", link: "/dashboard/fx" },
      { id: 5, name: "Report", icon: "majesticons:noteblock-text", link: "/u/operator/report" },
    ],
    lower: [
      { id: 6, name: "Settings", icon: "majesticons:cog", link: "/u/operator/settings" },
      { id: 7, name: "Logout", icon: "majesticons:logout", link: "/api/auth/logout" },
    ]
  },
  user: {
    upper: [
      { id: 1, name: "Dashboard", icon: "majesticons:home", link: "/u/user" },
      { id: 2, name: "Bids", icon: "majesticons:analytics", link: "/u/user/bids" },
      { id: 3, name: "Report", icon: "majesticons:noteblock-text", link: "/u/user/report" },
    ],
    lower: [
      { id: 4, name: "Settings", icon: "majesticons:cog", link: "/u/user/settings" },
      { id: 5, name: "Logout", icon: "majesticons:logout", link: "/api/auth/logout" },
    ]
  },
  fx: {
    upper: [
      { id: 1, name: "Dashboard", icon: "majesticons:home", link: "/u/fx" },
      { id: 2, name: "Bids", icon: "majesticons:analytics", link: "/u/fx/bids" },
      { id: 3, name: "Report", icon: "majesticons:noteblock-text", link: "/u/fx/report" },
    ],
    lower: [
      { id: 4, name: "Settings", icon: "majesticons:cog", link: "/u/fx/settings" },
      { id: 5, name: "Logout", icon: "majesticons:logout", link: "/api/auth/logout" },
    ]
  },
  fxUser: {
    upper: [
      { id: 1, name: "Dashboard", icon: "majesticons:home", link: "/u/fx-user" },
      { id: 3, name: "Report", icon: "majesticons:noteblock-text", link: "/u/fx-user/report" },
    ],
    lower: [
      { id: 5, name: "Logout", icon: "majesticons:logout", link: "/api/auth/logout" },
    ]
  },
} as const;

