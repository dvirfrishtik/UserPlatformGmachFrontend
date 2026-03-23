"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle, Loader2, ShieldCheck, Trash2, Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/* ——— Small UI pieces (Figma Make parity, no extra packages) ——— */

function ActionButtons({
  onSave,
  onCancel,
}: {
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="flex gap-2 items-center animate-in fade-in slide-in-from-top-1 duration-200"
      dir="rtl"
    >
      <button
        type="button"
        onClick={onCancel}
        className="h-[35px] px-4 py-2 flex items-center justify-center bg-secondary text-secondary-foreground border border-border hover:bg-muted transition-colors"
        style={{
          borderRadius: "var(--radius-button)",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--font-weight-bold)",
        }}
      >
        איפוס שינויים
      </button>
      <button
        type="button"
        onClick={onSave}
        className="h-[35px] px-4 py-2 flex items-center justify-center bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        style={{
          borderRadius: "var(--radius-button)",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--font-weight-bold)",
        }}
      >
        שמירה
      </button>
    </div>
  );
}

function AddButton({
  children,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-white content-stretch flex gap-2 items-center justify-center px-6 py-3 relative rounded-lg hover:bg-gray-50 transition-colors h-9"
    >
      <span
        className="absolute border border-primary border-solid inset-0 pointer-events-none rounded-lg"
        aria-hidden
      />
      <span className="text-[#141e44] text-base font-bold leading-5 whitespace-nowrap">
        {children}
      </span>
      <svg
        className="size-6 shrink-0 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12.8438 8.34375C12.8438 7.87776 12.466 7.5 12 7.5C11.534 7.5 11.1562 7.87776 11.1562 8.34375V11.1562H8.34375C7.87776 11.1562 7.5 11.534 7.5 12C7.5 12.466 7.87776 12.8438 8.34375 12.8438H11.1562V15.6562C11.1562 16.1222 11.534 16.5 12 16.5C12.466 16.5 12.8438 16.1222 12.8438 15.6562V12.8438H15.6562C16.1222 12.8438 16.5 12.466 16.5 12C16.5 11.534 16.1222 11.1562 15.6562 11.1562H12.8438V8.34375Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="h-[45px] w-[45px] flex items-center justify-center bg-transparent text-foreground border border-border rounded-md hover:bg-muted transition-colors"
      style={{ borderRadius: "var(--radius)" }}
      aria-label="מחיקה"
    >
      <Trash2 className="size-5" strokeWidth={1.5} />
    </button>
  );
}

function ConfirmDeleteDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
}) {
  useDialogBodyScrollLock(open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-card max-w-[min(100%,420px)] gap-0 p-0 overflow-hidden border-border/80 shadow-[0_24px_48px_-12px_rgba(23,37,84,0.18)] sm:max-w-[420px]"
        style={{ borderRadius: "var(--radius-card)" }}
        dir="rtl"
      >
        <div className="flex flex-col items-center text-center px-6 sm:px-10 pt-9 pb-1">
          <img
            src="/icons/warning.svg"
            alt=""
            width={80}
            height={80}
            decoding="async"
            draggable={false}
            className="mx-auto mb-5 size-20 shrink-0 select-none pointer-events-none"
            aria-hidden
          />
          <DialogHeader className="w-full space-y-3 text-center sm:text-center">
            <DialogTitle className="text-foreground text-xl font-bold leading-snug tracking-tight">
              {title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-[15px] leading-relaxed max-w-[300px] mx-auto">
              {description}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="mt-6 flex flex-col-reverse items-stretch gap-3 border-t border-border/50 bg-gradient-to-b from-muted/25 to-muted/45 px-6 py-6 sm:flex-row sm:items-center sm:justify-center sm:gap-4 sm:px-10">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-11 min-h-11 w-full sm:w-auto sm:min-w-[132px] px-6 flex items-center justify-center bg-background text-foreground border border-border hover:bg-muted/80 transition-colors font-bold text-sm shadow-sm"
            style={{ borderRadius: "var(--radius-button)" }}
          >
            ביטול
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="h-11 min-h-11 w-full sm:w-auto sm:min-w-[132px] px-6 flex items-center justify-center bg-destructive text-destructive-foreground hover:opacity-95 active:scale-[0.98] transition-all font-bold text-sm shadow-md shadow-destructive/25"
            style={{ borderRadius: "var(--radius-button)" }}
          >
            מחק
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** זמן להמתין אחרי תחילת יציאה לפני unmount — חייב לעבור את משך ה-CSS */
const TOAST_EXIT_MS = 520;
const TOAST_ENTER_MS = 480;
const TOAST_LEAVE_MS = 440;

type PersonalInfoToastState = { id: number; message: string; exiting: boolean };

function Toast({
  message,
  exiting,
  onDismissRequest,
}: {
  message: string;
  exiting: boolean;
  onDismissRequest: () => void;
}) {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      if (inner) cancelAnimationFrame(inner);
    };
  }, []);

  const visible = entered && !exiting;

  /** חייבים רווחים ב-calc(100% + X) — אחרת ה-CSS לא תקין והדפדפן מתעלם מ-transform */
  const transformHidden = "translate3d(0, calc(100% + 1.5rem), 0)";
  const transformVisible = "translate3d(0, 0, 0)";

  return (
    <div
      className="fixed bottom-12 left-1/2 z-[120] -translate-x-1/2 pointer-events-none [contain:layout]"
      aria-live="polite"
    >
      <div
        className={cn(
          "pointer-events-auto origin-bottom will-change-transform motion-reduce:transition-none",
          exiting ? "pointer-events-none" : "",
        )}
        style={{
          transform: visible ? transformVisible : transformHidden,
          opacity: visible ? 1 : 0,
          transitionProperty: "transform, opacity",
          transitionDuration: exiting ? `${TOAST_LEAVE_MS}ms` : `${TOAST_ENTER_MS}ms`,
          transitionTimingFunction: exiting
            ? "cubic-bezier(0.4, 0, 1, 1)"
            : "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        dir="rtl"
      >
        <div
          className="bg-card border overflow-hidden rounded-[var(--radius-button)]"
          style={{
            boxShadow:
              "0px 8px 24px rgba(23, 37, 84, 0.12), 0px 2px 8px rgba(23, 37, 84, 0.08)",
            width: "max-content",
            minWidth: "min(420px, calc(100vw - 2rem))",
            maxWidth: "600px",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center gap-4 px-6 py-4">
            <div className="flex-shrink-0">
              <div
                className="size-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(23, 37, 84, 0.1)" }}
              >
                <CheckCircle className="size-6 text-primary" strokeWidth={2.5} />
              </div>
            </div>
            <p className="text-foreground flex-1 min-w-0" dir="auto">
              {message}
            </p>
            <button
              type="button"
              onClick={onDismissRequest}
              className="flex-shrink-0 size-8 rounded-[var(--radius)] hover:bg-muted/50 flex items-center justify-center transition-colors group"
              aria-label="סגור"
            >
              <X className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function useDialogBodyScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;
    const originalPaddingLeft = body.style.paddingLeft;
    const forceStyles = () => {
      body.style.overflow = "scroll";
      body.style.paddingRight = "0";
      body.style.paddingLeft = "0";
    };
    forceStyles();
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "style") {
          forceStyles();
        }
      }
    });
    observer.observe(body, { attributes: true, attributeFilter: ["style"] });
    return () => {
      observer.disconnect();
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
      body.style.paddingLeft = originalPaddingLeft;
    };
  }, [isOpen]);
}

function PhoneVerificationDialog({
  isOpen,
  onClose,
  onSubmit,
  phoneNumber,
  mode,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
  phoneNumber: string;
  mode?: "add" | "edit";
}) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useDialogBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setCode(["", "", "", "", "", ""]);
      setError("");
      setIsLoading(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (!/^\d{6}$/.test(fullCode)) {
      setError("יש להזין קוד בן 6 ספרות");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSubmit(fullCode);
        onClose();
      }, 1200);
    } catch {
      setIsLoading(false);
      setError("קוד שגוי, נסה שוב");
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    if (error) setError("");
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newCode[i] = pastedData[i]!;
    }
    setCode(newCode);
    const nextEmptyIndex = newCode.findIndex((d) => !d);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="bg-card max-w-[500px] p-8 sm:max-w-[500px]"
        style={{ borderRadius: "var(--radius-card)" }}
        dir="rtl"
      >
        <DialogHeader className="text-right space-y-4">
          <DialogTitle className="text-right text-foreground text-[20px] font-bold">
            {mode === "edit" ? "אימות עריכת מספר טלפון" : "אימות מספר טלפון"}
          </DialogTitle>
          <DialogDescription className="text-right text-muted-foreground">
            נשלח קוד אימות בן 6 ספרות למספר הטלפון{" "}
            <span className="font-medium text-foreground">{phoneNumber}</span>.
            <br />
            {mode === "edit"
              ? "יש להזין את הקוד כדי לאשר את עריכת המספר."
              : "יש להזין את הקוד כדי לאשר את השינויים."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <ShieldCheck className="size-14 text-primary" strokeWidth={1.25} />
            <p className="text-foreground text-center">הקוד אומת בהצלחה!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="verification-code-0" className="text-sm font-medium">
                קוד אימות
              </label>
              <div className="flex gap-3 justify-center" dir="ltr">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    id={`verification-code-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-14 text-center text-2xl font-medium bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderRadius: "var(--radius-button)" }}
                    aria-invalid={!!error}
                    disabled={isLoading}
                  />
                ))}
              </div>
              {error ? (
                <p className="text-destructive text-caption text-right">{error}</p>
              ) : null}
            </div>

            {!isLoading ? (
              <div className="text-center -mt-2">
                <button
                  type="button"
                  className="text-primary hover:underline text-sm"
                  onClick={() => {}}
                >
                  לא קיבלתי, שלחו לי קוד חדש
                </button>
              </div>
            ) : null}

            {isLoading ? (
              <div className="flex items-center justify-center gap-3 py-2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <p className="text-muted-foreground">מאמת את הקוד...</p>
              </div>
            ) : null}

            <div className="flex gap-4 justify-center pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="h-10 px-6 flex items-center justify-center bg-secondary text-secondary-foreground border border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderRadius: "var(--radius-button)" }}
              >
                ביטול
              </button>
              <button
                type="submit"
                disabled={isLoading || code.some((d) => !d)}
                className="h-10 px-6 flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderRadius: "var(--radius-button)" }}
              >
                {isLoading ? "מאמת..." : "אישור"}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function EmailVerificationDialog({
  isOpen,
  onClose,
  onSubmit,
  email,
  mode,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
  email: string;
  mode?: "add" | "edit";
}) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useDialogBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setCode(["", "", "", "", "", ""]);
      setError("");
      setIsLoading(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (!/^\d{6}$/.test(fullCode)) {
      setError("יש להזין קוד בן 6 ספרות");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSubmit(fullCode);
        onClose();
      }, 1200);
    } catch {
      setIsLoading(false);
      setError("קוד שגוי, נסה שוב");
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    if (error) setError("");
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newCode[i] = pastedData[i]!;
    }
    setCode(newCode);
    const nextEmptyIndex = newCode.findIndex((d) => !d);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="bg-card max-w-[500px] p-8 sm:max-w-[500px]"
        style={{ borderRadius: "var(--radius-card)" }}
        dir="rtl"
      >
        <DialogHeader className="text-right space-y-4">
          <DialogTitle className="text-right text-foreground text-[20px] font-bold">
            {mode === "edit" ? "אימות עריכת כתובת מייל" : "אימות כתובת מייל"}
          </DialogTitle>
          <DialogDescription className="text-right text-muted-foreground">
            נשלח קוד אימות בן 6 ספרות לכתובת המייל{" "}
            <span className="font-medium text-foreground">{email}</span>.
            <br />
            {mode === "edit"
              ? "יש להזין את הקוד כדי לאשר את עריכת המייל."
              : "יש להזין את הקוד כדי לאשר את השינויים."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <ShieldCheck className="size-14 text-primary" strokeWidth={1.25} />
            <p className="text-foreground text-center">הקוד אומת בהצלחה!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email-verification-code-0" className="text-sm font-medium">
                קוד אימות
              </label>
              <div className="flex gap-3 justify-center" dir="ltr">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    id={`email-verification-code-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-14 text-center text-2xl font-medium bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderRadius: "var(--radius-button)" }}
                    aria-invalid={!!error}
                    disabled={isLoading}
                  />
                ))}
              </div>
              {error ? (
                <p className="text-destructive text-caption text-right">{error}</p>
              ) : null}
            </div>

            {!isLoading ? (
              <div className="text-center -mt-2">
                <button type="button" className="text-primary hover:underline text-sm" onClick={() => {}}>
                  לא קיבלתי, שלחו לי קוד חדש
                </button>
              </div>
            ) : null}

            {isLoading ? (
              <div className="flex items-center justify-center gap-3 py-2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <p className="text-muted-foreground">מאמת את הקוד...</p>
              </div>
            ) : null}

            <div className="flex gap-4 justify-center pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="h-10 px-6 flex items-center justify-center bg-secondary text-secondary-foreground border border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderRadius: "var(--radius-button)" }}
              >
                ביטול
              </button>
              <button
                type="submit"
                disabled={isLoading || code.some((d) => !d)}
                className="h-10 px-6 flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderRadius: "var(--radius-button)" }}
              >
                {isLoading ? "מאמת..." : "אישור"}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function IdVerificationDialog({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useDialogBodyScrollLock(isOpen);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith("image/")) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSubmit(selectedFile);
      setSelectedFile(null);
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleCancel();
      }}
    >
      <DialogContent
        className="bg-card max-w-[500px] p-8 sm:max-w-[500px]"
        style={{ borderRadius: "var(--radius-card)" }}
        dir="rtl"
      >
        <DialogHeader className="text-right space-y-4">
          <DialogTitle className="text-right text-foreground text-[20px] font-bold">
            אימות תעודת זהות
          </DialogTitle>
          <DialogDescription className="text-right text-muted-foreground">
            על מנת לאשר את השינוי במספר תעודת הזהות, יש להעלות תמונה של ספח תעודת הזהות
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 mt-6">
          <div
            className={cn(
              "border-2 border-dashed p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200",
              isDragging ? "border-primary bg-primary/5" : "border-border bg-muted/30",
              selectedFile ? "border-primary bg-primary/5" : "",
            )}
            style={{ borderRadius: "var(--radius-button)" }}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
              className="hidden"
            />

            {selectedFile ? (
              <>
                <div
                  className="flex items-center justify-center w-16 h-16 bg-primary/10"
                  style={{ borderRadius: "var(--radius-button)" }}
                >
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-foreground">{selectedFile.name}</p>
                  <p className="text-caption text-muted-foreground mt-1">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </>
            ) : (
              <>
                <div
                  className="flex items-center justify-center w-16 h-16 bg-muted"
                  style={{ borderRadius: "var(--radius-button)" }}
                >
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-foreground">גרור ושחרר קובץ כאן או לחץ להעלאה</p>
                  <p className="text-caption text-muted-foreground">PNG, JPG עד 10MB</p>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-4 justify-center pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="h-10 px-6 flex items-center justify-center bg-secondary text-secondary-foreground border border-border hover:bg-muted transition-colors"
              style={{ borderRadius: "var(--radius-button)" }}
            >
              ביטול
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedFile}
              className="h-10 px-6 flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderRadius: "var(--radius-button)" }}
            >
              אישור ושמירה
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ReverificationAlert({
  type,
  timePeriod,
  isVerified,
  onReverify,
  attachToField,
}: {
  type: "email" | "phone" | "address";
  timePeriod: string;
  isVerified: boolean;
  onReverify: () => void;
  /** מצמיד ויזואלית לשדה קלט ספציפי (למשל מייל ראשי) */
  attachToField?: boolean;
}) {
  const getTypeText = () => {
    switch (type) {
      case "email":
        return "כתובת המייל";
      case "phone":
        return "מספר הטלפון";
      case "address":
        return "כתובת המגורים";
    }
  };

  const boxClass = cn(
    "w-full animate-in fade-in duration-300 border border-border/80",
    attachToField
      ? "rounded-lg px-3 py-3 bg-muted/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
      : "px-5 py-4 bg-page-section",
  );

  if (isVerified) {
    return (
      <div
        className={cn(boxClass, "flex gap-3 items-center")}
        style={attachToField ? { borderRadius: "var(--radius-button)" } : { borderRadius: "var(--radius-card)" }}
        dir="rtl"
        role="status"
      >
        <CheckCircle className="size-5 text-primary shrink-0" strokeWidth={2} />
        <p
          className={attachToField ? "text-sm font-medium" : ""}
          style={{ fontSize: attachToField ? undefined : "var(--text-lg)", color: "var(--foreground)" }}
        >
          הכתובת עודכנה בהצלחה!
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(boxClass, "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4")}
      style={attachToField ? { borderRadius: "var(--radius-button)" } : { borderRadius: "var(--radius-card)" }}
      dir="rtl"
      role="region"
      aria-label="נדרש אימות מחדש לכתובת המייל"
    >
      <p
        className={cn(
          "flex-1 min-w-0 text-pretty",
          attachToField ? "text-sm leading-snug pe-1" : "min-w-[200px]",
        )}
        style={{ fontSize: attachToField ? undefined : "var(--text-base)", color: "var(--foreground)" }}
      >
        חלפו {timePeriod} מאז שעודכנה {getTypeText()}, יש לאמת את הכתובת מחדש
      </p>
      <button
        type="button"
        onClick={onReverify}
        className="h-[35px] px-4 py-2 flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 transition-opacity shrink-0 self-start sm:self-center"
        style={{
          borderRadius: "var(--radius-button)",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--font-weight-bold)",
        }}
      >
        אימות מחדש
      </button>
    </div>
  );
}

/* ——— Main form ——— */

type PhoneEntry = {
  id: number;
  value: string;
  isDefault: boolean;
};

function phoneFieldLabel(index: number) {
  return `מס׳ טלפון (${index + 1})`;
}

type EmailEntry = {
  id: number;
  value: string;
  label: string;
  isDefault: boolean;
};

export function PersonalInfoForm() {
  const [originalValues, setOriginalValues] = useState({
    firstName: "יצחק",
    lastName: "נאמן",
    idNumber: "201125633",
    birthDate: "28/12/1979",
    city: "תל אביב",
    street: "הירדן",
    houseNumber: "18",
    postalCode: "8526918",
  });

  const [formValues, setFormValues] = useState({ ...originalValues });

  const [phones, setPhones] = useState<PhoneEntry[]>([
    { id: 1, value: "0548755233", isDefault: true },
  ]);
  const [originalPhones, setOriginalPhones] = useState<PhoneEntry[]>(
    () => structuredClone(phones),
  );

  const [emails, setEmails] = useState<EmailEntry[]>([
    { id: 1, value: "help@support.temu.com", label: "כתובת מייל", isDefault: true },
  ]);
  const [originalEmails, setOriginalEmails] = useState<EmailEntry[]>(
    () => structuredClone(emails),
  );

  const [isAddingPhone, setIsAddingPhone] = useState(false);
  const [isAddingEmail, setIsAddingEmail] = useState(false);
  const [newPhoneValue, setNewPhoneValue] = useState("");
  const [newEmailValue, setNewEmailValue] = useState("");
  const [focusedPhoneId, setFocusedPhoneId] = useState<number | null>(null);
  const [focusedEmailId, setFocusedEmailId] = useState<number | null>(null);

  const [newPhoneError, setNewPhoneError] = useState("");
  const [newEmailError, setNewEmailError] = useState("");

  const toastIdRef = useRef(0);
  const [toast, setToast] = useState<PersonalInfoToastState | null>(null);

  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const [isPhoneVerificationDialogOpen, setIsPhoneVerificationDialogOpen] = useState(false);
  const [isEmailVerificationDialogOpen, setIsEmailVerificationDialogOpen] = useState(false);
  const [phoneNumberToVerify, setPhoneNumberToVerify] = useState("");
  const [emailToVerify, setEmailToVerify] = useState("");
  const [pendingPhoneChange, setPendingPhoneChange] = useState<"add" | "edit" | null>(null);
  const [pendingEmailChange, setPendingEmailChange] = useState<"add" | "edit" | null>(null);

  const [emailNeedsReverification, setEmailNeedsReverification] = useState(true);
  const [emailReverified, setEmailReverified] = useState(false);

  const [pendingDelete, setPendingDelete] = useState<
    null | { type: "phone" | "email"; id: number }
  >(null);

  const hasPersonalDetailsChanges = useCallback(() => {
    return (["firstName", "lastName", "idNumber", "birthDate"] as const).some(
      (key) => formValues[key] !== originalValues[key],
    );
  }, [formValues, originalValues]);

  const hasPhonesChanges = useCallback(() => {
    return JSON.stringify(phones) !== JSON.stringify(originalPhones);
  }, [phones, originalPhones]);

  const hasEmailsChanges = useCallback(() => {
    return JSON.stringify(emails) !== JSON.stringify(originalEmails);
  }, [emails, originalEmails]);

  const hasAddressChanges = useCallback(() => {
    return (["city", "street", "houseNumber", "postalCode"] as const).some(
      (key) => formValues[key] !== originalValues[key],
    );
  }, [formValues, originalValues]);

  const showPersonalDetailsSaveButtons = hasPersonalDetailsChanges();
  const showPhonesSaveButtons = hasPhonesChanges();
  const showEmailsSaveButtons = hasEmailsChanges();
  const showAddressSaveButtons = hasAddressChanges();

  useEffect(() => {
    if (!toast || toast.exiting) return;
    const t = setTimeout(() => {
      setToast((prev) => (prev && !prev.exiting ? { ...prev, exiting: true } : prev));
    }, 10000);
    return () => clearTimeout(t);
  }, [toast?.id, toast?.exiting]);

  useEffect(() => {
    if (!toast?.exiting) return;
    const t = setTimeout(() => setToast(null), TOAST_EXIT_MS);
    return () => clearTimeout(t);
  }, [toast?.exiting, toast?.id]);

  const showToast = (message: string) => {
    toastIdRef.current += 1;
    setToast({ id: toastIdRef.current, message, exiting: false });
  };

  const dismissToast = () => {
    setToast((prev) => (prev && !prev.exiting ? { ...prev, exiting: true } : prev));
  };

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/[\s-]/g, "");
    const phoneRegex = /^0(5[0-9]|[2-4]|[8-9])[0-9]{7}$/;
    return phoneRegex.test(cleanPhone);
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAddPhone = () => {
    setNewPhoneValue("");
    setIsAddingPhone(true);
  };

  const handleSavePhone = () => {
    if (validatePhone(newPhoneValue)) {
      setPhoneNumberToVerify(newPhoneValue);
      setPendingPhoneChange("add");
      setIsPhoneVerificationDialogOpen(true);
    } else {
      setNewPhoneError("מס׳ הטלפון לא תקין");
    }
  };

  const handleCancelPhone = () => {
    setIsAddingPhone(false);
    setNewPhoneValue("");
    setNewPhoneError("");
  };

  const handleConfirmDelete = () => {
    if (!pendingDelete) return;
    if (pendingDelete.type === "phone") {
      setPhones((prev) => {
        if (prev.length <= 1) return prev;
        const deleted = prev.find((p) => p.id === pendingDelete.id);
        const next = prev.filter((p) => p.id !== pendingDelete.id);
        const mustPromoteDefault =
          Boolean(deleted?.isDefault) || !next.some((p) => p.isDefault);
        if (mustPromoteDefault) {
          return next.map((p, i) => ({ ...p, isDefault: i === 0 }));
        }
        return next;
      });
    } else {
      setEmails((prev) => {
        if (prev.length <= 1) return prev;
        const deleted = prev.find((e) => e.id === pendingDelete.id);
        const next = prev.filter((e) => e.id !== pendingDelete.id);
        const mustPromoteDefault =
          Boolean(deleted?.isDefault) || !next.some((e) => e.isDefault);
        if (mustPromoteDefault) {
          return next.map((e, i) => ({ ...e, isDefault: i === 0 }));
        }
        return next;
      });
    }
    setFocusedPhoneId(null);
    setFocusedEmailId(null);
    showToast("השדה נמחק בהצלחה");
  };

  const handleAddEmail = () => {
    setNewEmailValue("");
    setIsAddingEmail(true);
  };

  const handleSaveEmail = () => {
    if (validateEmail(newEmailValue)) {
      setEmailToVerify(newEmailValue);
      setPendingEmailChange("add");
      setIsEmailVerificationDialogOpen(true);
    } else {
      setNewEmailError("כתובת המייל לא תקינה");
    }
  };

  const handleCancelEmail = () => {
    setIsAddingEmail(false);
    setNewEmailValue("");
    setNewEmailError("");
  };

  const handleSaveChanges = () => {
    if (formValues.idNumber !== originalValues.idNumber) {
      setIsVerificationDialogOpen(true);
      return;
    }

    const hasPhoneChanges = JSON.stringify(phones) !== JSON.stringify(originalPhones);

    if (hasPhoneChanges) {
      const changedPhone = phones.find((current) => {
        const original = originalPhones.find((orig) => orig.id === current.id);
        return !original || original.value !== current.value;
      });
      if (changedPhone) {
        setPhoneNumberToVerify(changedPhone.value);
        setPendingPhoneChange("edit");
        setIsPhoneVerificationDialogOpen(true);
        return;
      }
    }

    const hasEmailChanges = JSON.stringify(emails) !== JSON.stringify(originalEmails);
    if (hasEmailChanges) {
      const changedEmail = emails.find((current) => {
        const original = originalEmails.find((orig) => orig.id === current.id);
        return !original || original.value !== current.value;
      });
      if (changedEmail) {
        setEmailToVerify(changedEmail.value);
        setPendingEmailChange("edit");
        setIsEmailVerificationDialogOpen(true);
        return;
      }
    }

    setOriginalValues({ ...formValues });
    setOriginalPhones(structuredClone(phones));
    setOriginalEmails(structuredClone(emails));
    showToast("השינויים נשמרו בהצלחה");
  };

  const handlePhoneVerificationSubmit = () => {
    if (pendingPhoneChange === "add") {
      const newPhone: PhoneEntry = {
        id: Date.now(),
        value: newPhoneValue,
        isDefault: false,
      };
      const updatedPhones = [...phones, newPhone];
      setPhones(updatedPhones);
      setOriginalPhones(structuredClone(updatedPhones));
      setNewPhoneError("");
      setIsAddingPhone(false);
      setNewPhoneValue("");
      showToast("מס׳ הטלפון נוסף בהצלחה לאחר אימות");
    } else if (pendingPhoneChange === "edit") {
      setOriginalValues({ ...formValues });
      setOriginalPhones(structuredClone(phones));
      setOriginalEmails(structuredClone(emails));
      showToast("השינויים נשמרו בהצלחה לאחר אימות");
    }
    setPendingPhoneChange(null);
    setPhoneNumberToVerify("");
  };

  const handleEmailVerificationSubmit = () => {
    if (pendingEmailChange === "add") {
      const count = emails.length + 1;
      const newEmail: EmailEntry = {
        id: Date.now(),
        value: newEmailValue,
        label: `כתובת מייל (${count})`,
        isDefault: false,
      };
      const updatedEmails = [...emails, newEmail];
      setEmails(updatedEmails);
      setOriginalEmails(structuredClone(updatedEmails));
      setNewEmailError("");
      setIsAddingEmail(false);
      setNewEmailValue("");
      showToast("כתובת המייל נוספה בהצלחה לאחר אימות");
    } else if (pendingEmailChange === "edit") {
      setOriginalValues({ ...formValues });
      setOriginalPhones(structuredClone(phones));
      setOriginalEmails(structuredClone(emails));
      showToast("השינויים נשמרו בהצלחה לאחר אימות");
    }
    setPendingEmailChange(null);
    setEmailToVerify("");
  };

  const handleVerificationSubmit = (_file: File) => {
    setOriginalValues({ ...formValues });
    setOriginalPhones(structuredClone(phones));
    setOriginalEmails(structuredClone(emails));
    showToast("השינויים נשמרו בהצלחה לאחר אימות");
  };

  const handleResetChanges = () => {
    setFormValues({ ...originalValues });
    setPhones(structuredClone(originalPhones));
    setEmails(structuredClone(originalEmails));
    setIsAddingPhone(false);
    setIsAddingEmail(false);
    setNewPhoneValue("");
    setNewEmailValue("");
    setNewPhoneError("");
    setNewEmailError("");
    showToast("השינויים אופסו בהצלחה");
  };

  const handleEmailReverification = () => {
    setEmailReverified(true);
    setEmailNeedsReverification(false);
    showToast("כתובת המייל אומתה מחדש בהצלחה");
    setTimeout(() => setEmailReverified(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8 relative">
      {toast ? (
        <Toast
          key={toast.id}
          message={toast.message}
          exiting={toast.exiting}
          onDismissRequest={dismissToast}
        />
      ) : null}

      <IdVerificationDialog
        isOpen={isVerificationDialogOpen}
        onClose={() => setIsVerificationDialogOpen(false)}
        onSubmit={handleVerificationSubmit}
      />

      <PhoneVerificationDialog
        isOpen={isPhoneVerificationDialogOpen}
        onClose={() => setIsPhoneVerificationDialogOpen(false)}
        onSubmit={handlePhoneVerificationSubmit}
        phoneNumber={phoneNumberToVerify}
        mode={pendingPhoneChange || "add"}
      />

      <EmailVerificationDialog
        isOpen={isEmailVerificationDialogOpen}
        onClose={() => setIsEmailVerificationDialogOpen(false)}
        onSubmit={handleEmailVerificationSubmit}
        email={emailToVerify}
        mode={pendingEmailChange || "add"}
      />

      <ConfirmDeleteDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
        title="לאשר מחיקה?"
        description={
          pendingDelete?.type === "email"
            ? "פעולה זו תסיר את כתובת המייל מהרשימה. האם אתה בטוח שברצונך למחוק?"
            : "פעולה זו תסיר את מספר הטלפון מהרשימה. האם אתה בטוח שברצונך למחוק?"
        }
        onConfirm={handleConfirmDelete}
      />

      <div
        className="bg-card shadow-[var(--elevation-sm)] rounded-[var(--radius-card)] p-6 md:p-8"
        dir="rtl"
      >
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-4">
            <h3 className="text-[20px] font-bold">פרטים אישיים</h3>
            {showPersonalDetailsSaveButtons ? (
              <ActionButtons onSave={handleSaveChanges} onCancel={handleResetChanges} />
            ) : null}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                שם פרטי
              </label>
              <Input
                id="firstName"
                type="text"
                value={formValues.firstName}
                onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                שם משפחה
              </label>
              <Input
                id="lastName"
                type="text"
                value={formValues.lastName}
                onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="idNumber" className="text-sm font-medium">
                מספר ת.ז
              </label>
              <Input
                id="idNumber"
                type="text"
                value={formValues.idNumber}
                onChange={(e) => setFormValues({ ...formValues, idNumber: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="birthDate" className="text-sm font-medium">
                תאריך לידה
              </label>
              <Input
                id="birthDate"
                type="text"
                value={formValues.birthDate}
                onChange={(e) => setFormValues({ ...formValues, birthDate: e.target.value })}
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-card shadow-[var(--elevation-sm)] rounded-[var(--radius-card)] p-6 md:p-8"
        dir="rtl"
      >
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-4">
            <div className="flex flex-col gap-1">
              <h4>מספרי טלפון</h4>
              <p className="text-muted-foreground">החלפת מס׳ טלפון דורשת אימות בקוד טלפוני</p>
            </div>
            {isAddingPhone ? (
              <ActionButtons onSave={handleSavePhone} onCancel={handleCancelPhone} />
            ) : showPhonesSaveButtons ? (
              <ActionButtons onSave={handleSaveChanges} onCancel={handleResetChanges} />
            ) : null}
          </div>

          {phones.map((phone, index) => (
            <div key={phone.id} className="flex gap-2 items-end">
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <label htmlFor={`phone-${phone.id}`} className="text-sm font-medium">
                  {phoneFieldLabel(index)}
                </label>
                <Input
                  id={`phone-${phone.id}`}
                  type="text"
                  value={phone.value}
                  onFocus={() => setFocusedPhoneId(phone.id)}
                  onBlur={() => setFocusedPhoneId(null)}
                  onChange={(e) => {
                    setPhones(
                      phones.map((p) => (p.id === phone.id ? { ...p, value: e.target.value } : p)),
                    );
                  }}
                />
              </div>
              {phones.length > 1 ? (
                <div
                  className={cn(
                    "transition-all duration-200 overflow-hidden shrink-0",
                    focusedPhoneId === phone.id ? "w-[45px] opacity-100" : "w-0 opacity-0 pointer-events-none",
                  )}
                >
                  <DeleteButton onClick={() => setPendingDelete({ type: "phone", id: phone.id })} />
                </div>
              ) : null}
            </div>
          ))}

          {isAddingPhone ? (
            <div className="flex gap-8 items-end">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="newPhone" className="text-sm font-medium">
                  {phoneFieldLabel(phones.length)}
                </label>
                <Input
                  id="newPhone"
                  type="text"
                  value={newPhoneValue}
                  onChange={(e) => {
                    setNewPhoneValue(e.target.value);
                    if (newPhoneError) setNewPhoneError("");
                  }}
                  aria-invalid={!!newPhoneError}
                />
                {newPhoneError ? (
                  <p className="text-destructive text-caption">{newPhoneError}</p>
                ) : null}
              </div>
            </div>
          ) : null}

          {!isAddingPhone ? (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-stretch sm:items-end sm:justify-end">
              <AddButton onClick={handleAddPhone}>הוספת מס׳ טלפון</AddButton>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className="bg-card shadow-[var(--elevation-sm)] rounded-[var(--radius-card)] p-6 md:p-8"
        dir="rtl"
      >
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-4">
            <div className="flex flex-col gap-1">
              <h4>מייל החשבון</h4>
              <p className="text-muted-foreground">החלפת הכתובת דורשת אימות במייל</p>
            </div>
            {isAddingEmail ? (
              <ActionButtons onSave={handleSaveEmail} onCancel={handleCancelEmail} />
            ) : showEmailsSaveButtons ? (
              <ActionButtons onSave={handleSaveChanges} onCancel={handleResetChanges} />
            ) : null}
          </div>

          {emails.map((email) => (
            <div key={email.id} className="flex flex-col gap-2 w-full min-w-0">
              <div className="flex gap-2 items-end">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <label htmlFor={`email-${email.id}`} className="text-sm font-medium">
                    {email.label}
                  </label>
                  <Input
                    id={`email-${email.id}`}
                    type="email"
                    value={email.value}
                    onFocus={() => setFocusedEmailId(email.id)}
                    onBlur={() => setFocusedEmailId(null)}
                    onChange={(e) => {
                      setEmails(
                        emails.map((em) =>
                          em.id === email.id ? { ...em, value: e.target.value } : em,
                        ),
                      );
                    }}
                    aria-describedby={
                      email.isDefault && emailNeedsReverification
                        ? "email-reverify-banner"
                        : undefined
                    }
                  />
                </div>
                {emails.length > 1 ? (
                  <div
                    className={cn(
                      "transition-all duration-200 overflow-hidden shrink-0",
                      focusedEmailId === email.id ? "w-[45px] opacity-100" : "w-0 opacity-0 pointer-events-none",
                    )}
                  >
                    <DeleteButton onClick={() => setPendingDelete({ type: "email", id: email.id })} />
                  </div>
                ) : null}
              </div>
              {email.isDefault && emailNeedsReverification ? (
                <div id="email-reverify-banner" className="w-full">
                  <ReverificationAlert
                    type="email"
                    timePeriod="שנתיים"
                    isVerified={emailReverified}
                    onReverify={handleEmailReverification}
                    attachToField
                  />
                </div>
              ) : null}
            </div>
          ))}

          {isAddingEmail ? (
            <div className="flex gap-8 items-end">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="newEmail" className="text-sm font-medium">
                  כתובת מייל
                </label>
                <Input
                  id="newEmail"
                  type="email"
                  value={newEmailValue}
                  onChange={(e) => {
                    setNewEmailValue(e.target.value);
                    if (newEmailError) setNewEmailError("");
                  }}
                  aria-invalid={!!newEmailError}
                />
                {newEmailError ? (
                  <p className="text-destructive text-caption">{newEmailError}</p>
                ) : null}
              </div>
            </div>
          ) : null}

          {!isAddingEmail ? (
            <div className="flex gap-8 items-end justify-end">
              <AddButton onClick={handleAddEmail}>הוספת מייל</AddButton>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className="bg-card shadow-[var(--elevation-sm)] rounded-[var(--radius-card)] p-6 md:p-8"
        dir="rtl"
      >
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-4">
            <div className="flex flex-col gap-1">
              <h4>כתובת מגורים</h4>
              <p className="text-muted-foreground">הכתובת אליה יישלחו מכתבים מאיתנו</p>
            </div>
            {showAddressSaveButtons ? (
              <ActionButtons onSave={handleSaveChanges} onCancel={handleResetChanges} />
            ) : null}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="text-sm font-medium">
                עיר
              </label>
              <Input
                id="city"
                type="text"
                value={formValues.city}
                onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="street" className="text-sm font-medium">
                רחוב
              </label>
              <Input
                id="street"
                type="text"
                value={formValues.street}
                onChange={(e) => setFormValues({ ...formValues, street: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="houseNumber" className="text-sm font-medium">
                מספר בית
              </label>
              <Input
                id="houseNumber"
                type="text"
                value={formValues.houseNumber}
                onChange={(e) => setFormValues({ ...formValues, houseNumber: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="postalCode" className="text-sm font-medium">
                מיקוד
              </label>
              <Input
                id="postalCode"
                type="text"
                value={formValues.postalCode}
                onChange={(e) => setFormValues({ ...formValues, postalCode: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
