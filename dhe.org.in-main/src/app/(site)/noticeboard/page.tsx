import dynamic from "next/dynamic";
import ParticipationPathways from "@/components/sections/ParticipationPathways";

const NoticeBoard = dynamic(() => import("@/components/notices/NoticeBoard"), {
  loading: () => (
    <div className="min-h-[200px] animate-pulse bg-gray-50 rounded-lg" aria-busy="true" />
  ),
});

export default function NoticeboardPage() {
  return (
    <div className="dhe-container py-6 sm:py-10 space-y-10 max-w-2xl mx-auto">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-color text-center">
          DHE Notice Board
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-600 text-center leading-relaxed max-w-xl mx-auto">
          Official notices from the Department of Holistic Education (DHE). Current
          and past listings are published here when available.
        </p>
      </header>
      <NoticeBoard />
      <ParticipationPathways
        variant="compact"
        className="border-t border-gray-200 pt-8"
      />
    </div>
  );
}
