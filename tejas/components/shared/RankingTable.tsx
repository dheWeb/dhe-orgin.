import { cn } from "@/lib/utils";
import type { RankingRow } from "@/types";

interface RankingTableProps {
  rows: RankingRow[];
  className?: string;
}

export function RankingTable({ rows, className }: RankingTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-tejas", className)}>
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-stone-200 bg-tejas-ivory">
            <th scope="col" className="px-6 py-4 font-semibold text-tejas-ink">Rank</th>
            <th scope="col" className="px-6 py-4 font-semibold text-tejas-ink">Student</th>
            <th scope="col" className="px-6 py-4 font-semibold text-tejas-ink">School</th>
            <th scope="col" className="px-6 py-4 font-semibold text-tejas-ink">State</th>
            <th scope="col" className="px-6 py-4 font-semibold text-tejas-ink">Score</th>
            <th scope="col" className="px-6 py-4 font-semibold text-tejas-ink">Percentile</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.rank} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/80">
              <td className="px-6 py-4">
                <span
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                    row.rank <= 3 ? "bg-tejas-gold/20 text-amber-800" : "bg-stone-100 text-tejas-muted"
                  )}
                >
                  {row.rank}
                </span>
              </td>
              <td className="px-6 py-4 font-medium text-tejas-ink">{row.name}</td>
              <td className="px-6 py-4 text-tejas-muted">{row.school}</td>
              <td className="px-6 py-4 text-tejas-muted">{row.state}</td>
              <td className="px-6 py-4 font-semibold text-tejas-blue">{row.score}</td>
              <td className="px-6 py-4 text-tejas-emerald">{row.percentile}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
