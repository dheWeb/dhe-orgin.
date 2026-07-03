import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-bold text-tejas-saffron/20">404</p>
      <h1 className="mt-4 text-3xl font-bold text-tejas-ink">Page Not Found</h1>
      <p className="mt-3 max-w-md text-tejas-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="mt-8">
        <Button size="lg">Return Home</Button>
      </Link>
    </section>
  );
}
