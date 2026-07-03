import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  className?: string;
}

export function Testimonial({ quote, author, role, className }: TestimonialProps) {
  return (
    <blockquote
      className={cn(
        "rounded-2xl border border-stone-200 bg-white p-8 shadow-tejas",
        className
      )}
    >
      <Quote className="h-8 w-8 text-tejas-saffron/40" aria-hidden />
      <p className="mt-4 text-lg leading-relaxed text-tejas-ink">&ldquo;{quote}&rdquo;</p>
      <footer className="mt-6">
        <cite className="not-italic">
          <span className="font-semibold text-tejas-blue">{author}</span>
          <span className="block text-sm text-tejas-muted">{role}</span>
        </cite>
      </footer>
    </blockquote>
  );
}
