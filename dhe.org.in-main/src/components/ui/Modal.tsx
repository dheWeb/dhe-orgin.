"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { getModalMessages } from "@/lib/i18n/modal";
import type { Locale } from "@/lib/i18n/types";
import { isRtlLocale } from "@/lib/i18n/types";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Visible title for aria-labelledby */
  title: string;
  /** Optional longer description for aria-describedby */
  description?: string;
  locale?: Locale;
  /** Allow closing by clicking the backdrop (default: true) */
  closeOnBackdrop?: boolean;
  /** Allow closing with Escape (default: true) */
  closeOnEscape?: boolean;
  className?: string;
};

function ModalComponent({
  isOpen,
  onClose,
  children,
  title,
  description,
  locale = "en",
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = "",
}: ModalProps) {
  const messages = getModalMessages(locale);
  const isRtl = isRtlLocale(locale);

  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(
    null
  );

  useBodyScrollLock(isOpen);
  useFocusTrap(dialogRef, isOpen);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const backgroundSelectors = ["main", "header", "footer"];
    const elements = backgroundSelectors
      .map((sel) => document.querySelector<HTMLElement>(sel))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => el.setAttribute("inert", ""));

    return () => {
      elements.forEach((el) => el.removeAttribute("inert"));
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const focusTimer = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(focusTimer);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
    window.requestAnimationFrame(() => {
      previousFocusRef.current?.focus?.();
    });
  }, [onClose]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeOnEscape, handleClose]);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!closeOnBackdrop) return;
      if (event.target === event.currentTarget) {
        handleClose();
      }
    },
    [closeOnBackdrop, handleClose]
  );

  if (!isOpen || !portalTarget) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-4 md:p-6 overscroll-none"
      style={{
        paddingTop: "max(0.75rem, env(safe-area-inset-top))",
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
        paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
        paddingRight: "max(0.75rem, env(safe-area-inset-right))",
      }}
      onMouseDown={handleBackdropClick}
      aria-hidden={false}
    >
      {/* Backdrop — separate layer; does not cover ads in main document when dismissed */}
      <div
        className="absolute inset-0 bg-black/60 motion-safe:animate-modal-fade-in supports-[backdrop-filter]:backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        dir={isRtl ? "rtl" : "ltr"}
        className={[
          "relative z-10 flex w-full max-w-3xl flex-col",
          "max-h-[min(90dvh,720px)] sm:max-h-[min(85dvh,800px)]",
          "overflow-hidden rounded-2xl sm:rounded-3xl",
          "border border-white/10 bg-gradient-to-br from-dhe-navy via-dhe-navy-mid to-dhe-navy-light",
          "shadow-[0_20px_80px_rgba(0,0,0,0.45)]",
          "motion-safe:animate-modal-scale-in",
          "min-w-0",
          className,
        ].join(" ")}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-500 opacity-20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-dhe-blue-accent opacity-20 blur-3xl"
          aria-hidden="true"
        />

        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleClose}
          aria-label={messages.closeAriaLabel}
          className={[
            "absolute z-20 flex min-h-11 min-w-11 items-center justify-center",
            "rounded-full border border-white/20 bg-white/10 text-lg font-bold text-white",
            "backdrop-blur-md transition-colors duration-200",
            "hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dhe-navy",
            isRtl ? "left-4 top-4 sm:left-5 sm:top-5" : "right-4 top-4 sm:right-5 sm:top-5",
          ].join(" ")}
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">{messages.close}</span>
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="relative z-10 p-4 pb-5 sm:p-6 md:p-8 lg:p-10">
            <h2 id={titleId} className="sr-only">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="sr-only">
                {description}
              </p>
            ) : null}
            {children}
          </div>
        </div>
      </div>
    </div>,
    portalTarget
  );
}

const Modal = memo(ModalComponent);
Modal.displayName = "Modal";

export default Modal;
