export const mainNav = [
  { label: "Olympiads", href: "/olympiads" },
  { label: "Editions", href: "/editions" },
  { label: "Prepare", href: "/prepare" },
  { label: "Resources", href: "/resources" },
  { label: "Schools", href: "/schools" },
  { label: "Rankings", href: "/rankings" },
  { label: "Hall of Fame", href: "/hall-of-fame" },
  { label: "Scholarships", href: "/scholarships" },
] as const;

export const footerNav = {
  platform: [
    { label: "About TEJAS", href: "/about" },
    { label: "Current Editions", href: "/editions" },
    { label: "Previous Editions", href: "/editions/previous" },
    { label: "Mock Tests", href: "/prepare/mock-tests" },
  ],
  olympiads: [
    { label: "Mathematics", href: "/olympiads/mathematics" },
    { label: "Science", href: "/olympiads/science" },
    { label: "Technology", href: "/olympiads/technology" },
    { label: "English", href: "/olympiads/english" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "For Schools", href: "/schools" },
  ],
  dhe: [
    { label: "DHE Website", href: "https://www.dhe.org.in", external: true },
    {
      label: "DHE Olympiads Program",
      href: "https://www.dhe.org.in/programs/dhe-olympiads",
      external: true,
    },
  ],
} as const;
