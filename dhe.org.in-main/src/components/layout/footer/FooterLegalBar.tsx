export default function FooterLegalBar() {
  return (
    <div className="border-t border-gray-700/80 py-6 flex flex-col lg:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-400 text-center lg:text-left">
        © {new Date().getFullYear()} Department of Holistic Education. All rights reserved.
      </p>
      <p className="text-xs text-gray-400 text-center lg:text-right max-w-md">
        Operated under VBITR Trust · NEP 2020 aligned · Section 80G donations
      </p>
    </div>
  );
}
