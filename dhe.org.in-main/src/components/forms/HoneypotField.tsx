"use client";

import { HONEYPOT_FIELD } from "@/lib/security/honeypot";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

/** Visually hidden; leave empty. Automated bots often fill every input. */
export default function HoneypotField({ value, onChange }: Props) {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
    >
      <label htmlFor={HONEYPOT_FIELD}>Company website</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
