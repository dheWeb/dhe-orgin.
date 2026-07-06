/** Primary site navigation — single source for Header desktop + mobile menus */

export type NavItem = {
  path: string;
  title: string;
  navTitle?: string;
  external?: boolean;
  subMenu?: NavItem[];
};

export const headerNavItems: NavItem[] = [
  { path: "/programs", title: "Programs" },
  {
    path: "/structure",
    title: "About DHE",
    subMenu: [
      { path: "/messages", title: "Director Message" },
      { path: "/structure", title: "Cells & Structure" },
      { path: "/advisory", title: "Advisory Council" },
      { path: "/leadership", title: "LMC Members" },
      { path: "/people", title: "Cell Co-ordinators" },
    ],
  },
  {
    path: "/upcomingevent",
    title: "Events",
    subMenu: [
      { path: "/events", title: "All Events" },
      { path: "/noticeboard", title: "Notice Board" },
      { path: "/upcomingevent", title: "Upcoming Events" },
      { path: "/pastevent", title: "Past Events" },
      { path: "/workshop", title: "Workshops" },
      { path: "/residentialcamps", title: "Residential Camps" },
    ],
  },
  {
    path: "/publications",
    title: "Publications",
    subMenu: [
      { path: "/publications", title: "Publications Hub" },
      { path: "/books", title: "Books" },
      { path: "/journals", title: "Journals" },
      {
        path: "https://pub.dhe.org.in",
        title: "pub.dhe.org.in",
        external: true,
      },
    ],
  },
  { path: "/donation", title: "Donate" },
  { path: "/contact", title: "Contact" },
  {
    path: "/accountdetails",
    title: "More",
    subMenu: [
      { path: "/contribute", title: "Join DHE — Membership" },
      { path: "/logos", title: "Media & Logos" },
      { path: "/accountdetails", title: "Accounts" },
      { path: "/feedback", title: "Feedback" },
      { path: "/hi", title: "हिंदी" },
      {
        path: "https://ep.sarvatr.co.in/public/careers/8d8a9c3384a936495a752596fe2a0b4d",
        title: "Careers — Open Positions",
        external: true,
      },
      { path: "/Recruitment-Policy.pdf", title: "Recruitment Policy (PDF)", external: true },
      { path: "/nitsri", title: "Chapter — NIT Srinagar" },
      { path: "/iitrpr", title: "Chapter — IIT Ropar" },
      { path: "/nitj", title: "Chapter — NIT Jalandhar" },
      { path: "/nitkkr", title: "Chapter — NIT Kurukshetra" },
    ],
  },
];

export function isNavPathExternal(path: string): boolean {
  return path.startsWith("http") || path.endsWith(".pdf");
}

export function isNavItemActive(pathname: string, item: NavItem): boolean {
  if (isNavPathExternal(item.path)) return false;

  if (pathname === item.path) return true;

  if (item.subMenu?.length) {
    return item.subMenu.some((sub) => {
      if (isNavPathExternal(sub.path)) return false;
      return (
        pathname === sub.path ||
        (sub.path !== "/" && pathname.startsWith(`${sub.path}/`))
      );
    });
  }

  if (item.path !== "/" && pathname.startsWith(`${item.path}/`)) return true;

  return false;
}
