'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface ChildOption {
  id: string;
  name: string;
  unitsCount: number;
  gender: 'male' | 'female';
}

interface PurchaseUnitsWizardProps {
  isOpen: boolean;
  onClose: () => void;
  children: ChildOption[];
}

/* ─── Boy Icon (from man.svg) ─── */
function BoyIcon({ size = 28, color = "#272B38" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M4.67334 15.8824C4.67334 21.7794 10.398 27.0275 14.4668 27.0275C19.4089 27.0275 24.2603 21.7794 24.2603 15.8824" stroke={color} strokeWidth="1.4"/>
      <path d="M22.8605 10.1675C21.9896 9.68758 21.1076 9.7206 20.2723 10.2555C18.5761 11.3415 16.4744 11.7845 14.453 11.7845C12.4316 11.7845 10.4667 11.3415 8.77054 10.2555C7.93521 9.7206 6.91641 9.6878 6.04548 10.1676C5.16876 10.6507 4.6453 11.5379 4.64536 12.5411V13.6886C4.38546 13.7385 4.14101 13.8323 3.91955 13.9617C3.88373 13.6044 3.86511 13.2438 3.86511 12.8832C3.86517 7.0187 8.61488 2.24756 14.453 2.24756C20.2911 2.24756 25.0408 7.0187 25.0408 12.8832C25.0408 13.2437 25.0221 13.6043 24.9863 13.9616C24.7649 13.8321 24.5206 13.7385 24.2608 13.6886V12.541C24.2607 11.5378 23.7373 10.6505 22.8605 10.1675Z" stroke={color} strokeWidth="1.4"/>
      <path d="M11.8462 22.229C11.8462 22.229 12.8593 22.8826 14.3299 22.8826C15.8005 22.8826 16.8136 22.229 16.8136 22.229" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M10.9313 14.9413C10.9313 14.9413 10.4247 14.6145 9.68943 14.6145C8.95413 14.6145 8.44759 14.9413 8.44759 14.9413" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M20.866 14.8105C20.866 14.8105 20.3594 14.4837 19.6241 14.4837C18.8888 14.4837 18.3823 14.8105 18.3823 14.8105" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M4.77341 13.582C4.0915 13.8031 3.59692 14.4441 3.59692 15.1987C3.59692 15.9593 4.09922 16.6048 4.78955 16.8209" stroke={color} strokeWidth="1.4"/>
      <path d="M24.2294 13.582C24.9113 13.8031 25.4059 14.4441 25.4059 15.1987C25.4059 15.9593 24.9036 16.6048 24.2133 16.8209" stroke={color} strokeWidth="1.4"/>
    </svg>
  );
}

/* ─── Girl Icon (from woman.svg) ─── */
function GirlIcon({ size = 28, color = "#272B38" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M5.14873 6.22239C5.0841 6.33341 5.02164 6.44761 4.96297 6.56175C4.00164 8.43321 3.37036 10.2602 4.19992 12.6C5.02948 14.9397 5.05691 14.9713 5.59994 14.7C6.14296 14.4287 9.22756 12.5479 10.016 10.6301C11.0955 11.7564 15.7806 14.1851 18.7307 14.5297C21.6808 14.8743 22.1894 15.4114 23.0033 16.0896C23.8171 16.7677 24.8324 8.91968 23.79 6.56175C22.7477 4.20383 21.833 3.58844 20.2227 2.66143C18.3075 1.55896 16.1748 1.40304 13.9558 1.48219C12.0677 1.54953 10.3133 2.46414 9.14244 3.99148C9.04214 4.12224 8.88792 4.20037 8.72312 4.20383L8.71559 4.20396C7.23009 4.22085 5.86334 4.99425 5.14873 6.22239Z" stroke={color} strokeWidth="1.4"/>
      <path d="M19.3769 11.6312C15.4 11.6312 14.7 9.80004 14 9.00977" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M23.1 16.1C22.977 19.8465 23.8477 24.572 24.8157 26.2233C22.8996 26.8022 20.8698 26.8119 18.7712 26.2509C18.0755 26.065 17.2739 25.4048 16.8 25.2" stroke={color} strokeWidth="1.4"/>
      <path d="M11.3046 17.1392C11.3046 17.1392 10.779 16.8001 10.016 16.8001C9.25305 16.8001 8.72745 17.1392 8.72745 17.1392" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M20.0532 17.1392C20.0532 17.1392 19.5276 16.8001 18.7647 16.8001C18.0017 16.8001 17.4761 17.1392 17.4761 17.1392" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M11.8141 22.4C11.8141 22.4 12.8653 23.0782 14.3912 23.0782C15.9171 23.0782 16.9683 22.4 16.9683 22.4" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M5.60002 16.8C5.72312 20.5466 4.94818 24.5721 3.9802 26.2234C5.89629 26.8022 7.92611 26.812 10.0247 26.251C10.7204 26.0651 11.4262 25.4049 11.9 25.2" stroke={color} strokeWidth="1.4"/>
      <path d="M5.74348 13.3483L5.74341 16.8902C5.74341 21.6395 9.60718 25.5032 14.3564 25.5032C19.1056 25.5032 22.9694 21.6395 22.9694 16.8902V15.944" stroke={color} strokeWidth="1.4"/>
    </svg>
  );
}

/* ─── Step Progress Bar ─── */
function StepProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex w-full shrink-0" style={{ padding: "0 40px", gap: "4px" }}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        return (
          <div
            key={i}
            className="flex-1 transition-all duration-500"
            style={{
              height: "3px",
              borderRadius: "100px",
              backgroundColor: isCompleted
                ? "#3B82F6"
                : isCurrent
                ? "#3B82F6"
                : "#D9DDEC",
            }}
          />
        );
      })}
    </div>
  );
}

export function PurchaseUnitsWizard({ isOpen, onClose, children }: PurchaseUnitsWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const totalSteps = 4;

  if (!isOpen) return null;

  const handleContinue = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedChildId(null);
    onClose();
  };

  const isNextDisabled = currentStep === 1 && !selectedChildId;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 2, 4, 0.45)", backdropFilter: "blur(6px)" }}
      onClick={handleClose}
    >
      {/* Modal */}
      <div
        className="relative flex flex-col"
        style={{
          width: "min(1100px, 92vw)",
          height: "min(900px, 90vh)",
          background: "linear-gradient(180deg, #F7F8FA 0%, #F7F8FA 100%)",
          borderRadius: "12px",
          border: "1px solid #E5E9F9",
          boxShadow: "0 0 12px rgba(24, 47, 67, 0.08), 0 32px 64px -16px rgba(23, 37, 84, 0.18)",
          overflow: "hidden",
        }}
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{
            padding: "20px 32px",
            borderBottom: "1px solid #E5E9F9",
          }}
        >
          {/* Spacer to balance (right side in RTL) */}
          <div style={{ width: "36px" }} />

          {/* Title - centered */}
          <h2 style={{
            fontSize: "20px",
            fontWeight: "var(--font-weight-bold)",
            color: "#141E44",
            lineHeight: "1.3",
            textAlign: "center",
          }}>
            רכישת יחידות תרומה
          </h2>

          {/* Close button (left side visually = end in RTL) */}
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:bg-[rgba(0,0,0,0.04)]"
            style={{ border: "none", cursor: "pointer", backgroundColor: "transparent" }}
            aria-label="סגור"
          >
            <X size={20} style={{ color: "#495157" }} />
          </button>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "32px 40px" }}>
          {currentStep === 1 && (
            <StepSelectChild
              childOptions={children}
              selectedChildId={selectedChildId}
              onSelect={setSelectedChildId}
            />
          )}
          {currentStep === 2 && (
            <StepPlaceholder title="הגדרת יחידות" description="בשלב זה תגדיר את מספר היחידות וסוג המסלול" />
          )}
          {currentStep === 3 && (
            <StepPlaceholder title="אמצעי תשלום" description="בשלב זה תבחר את אמצעי התשלום החודשי" />
          )}
          {currentStep === 4 && (
            <StepPlaceholder title="סיכום ואישור" description="בדוק את כל הפרטים ואשר את הרכישה" />
          )}
        </div>

        {/* ── Step Progress Bar ── */}
        <StepProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        {/* ── Footer ── */}
        <div
          className="flex items-center shrink-0"
          style={{
            padding: "20px 40px 30px 40px",
          }}
        >
          {/* Primary action button - full width like in the Figma reference */}
          <button
            onClick={handleContinue}
            disabled={isNextDisabled}
            className="transition-all w-full"
            style={{
              padding: "14px 24px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "var(--font-weight-semibold)",
              color: isNextDisabled ? "#495157" : "#FFFFFF",
              backgroundColor: isNextDisabled ? "#E5E9F9" : "#172554",
              border: "none",
              cursor: isNextDisabled ? "not-allowed" : "pointer",
              opacity: isNextDisabled ? 0.6 : 1,
              height: "48px",
            }}
            onMouseEnter={(e) => {
              if (!isNextDisabled) {
                e.currentTarget.style.backgroundColor = "#0F1A3E";
              }
            }}
            onMouseLeave={(e) => {
              if (!isNextDisabled) {
                e.currentTarget.style.backgroundColor = "#172554";
              }
            }}
          >
            {currentStep === totalSteps ? "אישור רכישה" : "המשך"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 1: Select Child ─── */
function StepSelectChild({
  childOptions,
  selectedChildId,
  onSelect,
}: {
  childOptions: ChildOption[];
  selectedChildId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col items-end w-full">
      {/* Instruction - right aligned, close to cards */}
      <p style={{
        fontSize: "16px",
        color: "#141E44",
        fontWeight: "var(--font-weight-normal)",
        textAlign: "right",
        marginBottom: "20px",
        lineHeight: "20px",
        width: "100%",
      }}>
        יש לבחור ילד/ה או קרוב/ה עבורם תרצו לרכוש יחידות תרומה:
      </p>

      {/* Children grid - 2 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full" style={{ gap: "14px" }}>
        {childOptions.map((child) => {
          const isSelected = selectedChildId === child.id;
          return (
            <ChildSelectCard
              key={child.id}
              child={child}
              isSelected={isSelected}
              onClick={() => onSelect(child.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ─── Child Selection Card (Figma popup style: white card on gray bg) ─── */
function ChildSelectCard({
  child,
  isSelected,
  onClick,
}: {
  child: ChildOption;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = child.gender === 'female' ? GirlIcon : BoyIcon;
  const iconColor = isSelected ? "#3B82F6" : "#495157";

  return (
    <button
      className="flex items-center gap-4 transition-all"
      style={{
        padding: "20px 24px",
        borderRadius: "6px",
        backgroundColor: "#FFFFFF",
        border: isSelected
          ? "1.5px solid #3B82F6"
          : "1.5px solid transparent",
        cursor: "pointer",
        outline: "none",
        boxShadow: isSelected
          ? "0 0 12px rgba(59, 130, 246, 0.12)"
          : isHovered
          ? "0 0 12px rgba(24, 47, 67, 0.12)"
          : "0 0 12px rgba(24, 47, 67, 0.08)",
        textAlign: "right",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center shrink-0 transition-all duration-200"
        style={{ width: "44px", height: "44px" }}
      >
        <IconComponent size={34} color={iconColor} />
      </div>

      {/* Text content */}
      <div className="flex flex-col items-start gap-0.5">
        {/* Name */}
        <p style={{
          fontSize: "17px",
          fontWeight: isSelected ? "var(--font-weight-bold)" : "var(--font-weight-semibold)",
          color: isSelected ? "#141E44" : "#495157",
          lineHeight: "24px",
          transition: "color 0.2s ease",
        }}>
          {child.name}
        </p>

        {/* Units count */}
        <span style={{
          fontSize: "14px",
          color: "#6B7280",
          fontWeight: "var(--font-weight-normal)",
          lineHeight: "20px",
        }}>
          {child.unitsCount} יחידות
        </span>
      </div>
    </button>
  );
}

/* ─── Placeholder for steps 2-4 ─── */
function StepPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <p style={{
        fontSize: "22px",
        fontWeight: "var(--font-weight-bold)",
        color: "var(--foreground)",
      }}>
        {title}
      </p>
      <p style={{
        fontSize: "15px",
        color: "var(--muted-foreground)",
        textAlign: "center",
        lineHeight: "1.6",
      }}>
        {description}
      </p>
    </div>
  );
}
