export default function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] text-gray-50 ${flip ? "rotate-180" : ""}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 48"
        className="w-full h-8 sm:h-12"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,32 C360,64 720,0 1080,24 C1260,36 1380,40 1440,32 L1440,48 L0,48 Z"
        />
      </svg>
    </div>
  );
}
