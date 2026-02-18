'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Minus, ChevronDown, Info } from 'lucide-react';

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
  initialSelectedChildId?: string | null;
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

/* ─── Avatar Icon (shared with kids page) ─── */
function AvatarIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#EDD097"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.5008 14C15.5008 11.5147 17.5155 9.5 20.0008 9.5C22.4861 9.5 24.5008 11.5147 24.5008 14C24.5008 16.4853 22.4861 18.5 20.0008 18.5C17.5155 18.5 15.5008 16.4853 15.5008 14Z" fill="#172554"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.7521 28.1053C11.8294 23.6156 15.4928 20 20.0008 20C24.5089 20 28.1724 23.6157 28.2496 28.1056C28.2547 28.4034 28.0832 28.676 27.8125 28.8002C25.4335 29.8918 22.7873 30.5 20.0011 30.5C17.2147 30.5 14.5683 29.8917 12.1891 28.7999C11.9185 28.6757 11.7469 28.4031 11.7521 28.1053Z" fill="#172554"/>
    </svg>
  );
}

export function PurchaseUnitsWizard({ isOpen, onClose, children, initialSelectedChildId }: PurchaseUnitsWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [unitCount, setUnitCount] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState<"קלאסי" | "פריסה מורחבת">("קלאסי");
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const totalSteps = 4;

  useEffect(() => {
    if (isOpen) {
      if (initialSelectedChildId) {
        setSelectedChildId(initialSelectedChildId);
      } else {
        setSelectedChildId(null);
      }
      setCurrentStep(1);
      setUnitCount(0);
      setSelectedTrack("קלאסי");
      setSelectedPaymentId(null);
      setShowSuccess(false);
    }
  }, [isOpen, initialSelectedChildId]);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (currentStep === totalSteps) {
      setShowSuccess(true);
    } else if (currentStep < totalSteps) {
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
    setUnitCount(0);
    setSelectedTrack("קלאסי");
    setSelectedPaymentId(null);
    setShowSuccess(false);
    onClose();
  };

  const isNextDisabled =
    (currentStep === 1 && !selectedChildId) ||
    (currentStep === 2 && unitCount === 0) ||
    (currentStep === 3 && !selectedPaymentId);

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

        {showSuccess ? (
          <SuccessScreen onClose={handleClose} />
        ) : (
          <>
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
                <StepDefineUnits
                  unitCount={unitCount}
                  onUnitCountChange={setUnitCount}
                  selectedTrack={selectedTrack}
                  onTrackChange={setSelectedTrack}
                />
              )}
              {currentStep === 3 && (
                <StepSelectPayment
                  selectedPaymentId={selectedPaymentId}
                  onSelect={setSelectedPaymentId}
                />
              )}
              {currentStep === 4 && (
                <StepSummary
                  childName={children.find(c => c.id === selectedChildId)?.name ?? ""}
                  unitCount={unitCount}
                  selectedTrack={selectedTrack}
                  paymentMethod={PAYMENT_METHODS.find(p => p.id === selectedPaymentId) ?? null}
                />
              )}
            </div>

            {/* ── Step Progress Bar ── */}
            <StepProgressBar currentStep={currentStep} totalSteps={totalSteps} />

            {/* ── Footer ── */}
            <div
              className="flex items-center shrink-0"
              style={{
                padding: "20px 40px 30px 40px",
                gap: "12px",
              }}
            >
              {/* RTL: first child = RIGHT side */}
              {/* Secondary action - Back (RIGHT in RTL) */}
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="transition-all"
                  style={{
                    padding: "14px 24px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "#141E44",
                    backgroundColor: "transparent",
                    border: "1.5px solid #141E44",
                    cursor: "pointer",
                    height: "48px",
                    minWidth: "160px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  חזרה לשלב הקודם
                </button>
              )}

              {/* Step indicator (CENTER) */}
              {currentStep > 1 && (
                <p dir="ltr" style={{
                  fontSize: "15px",
                  color: "#6B7280",
                  fontWeight: "var(--font-weight-normal)",
                  flex: 1,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}>
                  {currentStep} / {totalSteps}
                </p>
              )}

              {/* Primary action - Continue (LEFT in RTL) */}
              <button
                onClick={handleContinue}
                disabled={isNextDisabled}
                className="transition-all"
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
                  flex: currentStep === 1 ? 1 : "none",
                  minWidth: currentStep > 1 ? "160px" : undefined,
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
          </>
        )}
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

  return (
    <button
      className="flex items-center gap-4 transition-all"
      style={{
        padding: "20px 24px",
        borderRadius: "8px",
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
          : "0 0 12px rgba(24, 47, 67, 0.06)",
        textAlign: "right",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar icon */}
      <div className="shrink-0">
        <AvatarIcon size={44} />
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

/* ─── Units info table (spec: יחידות, תרומה חודשית, תשלומים, סך התרומה, הלוואה, החזר חודשי, מענק) ─── */
type UnitsTableTrack = "קלאסי" | "פריסה מורחבת";

const UNITS_TABLE_CLASSIC = [
  { units: 1, monthlyContribution: 40, paymentsSpan: 120, totalContribution: 4800, loan: 40000, monthlyRepayment: 400, repaymentNote: "X100", grant: 2400 },
  { units: 2, monthlyContribution: 80, paymentsSpan: 120, totalContribution: 9600, loan: 80000, monthlyRepayment: 800, repaymentNote: "X100", grant: 4800 },
  { units: 3, monthlyContribution: 120, paymentsSpan: 120, totalContribution: 14400, loan: 120000, monthlyRepayment: 1200, repaymentNote: "X100", grant: 7200 },
  { units: 4, monthlyContribution: 160, paymentsSpan: 120, totalContribution: 19200, loan: 160000, monthlyRepayment: 1600, repaymentNote: "X100", grant: 9600 },
  { units: 5, monthlyContribution: 200, paymentsSpan: 120, totalContribution: 24000, loan: 200000, monthlyRepayment: 2000, repaymentNote: "X100", grant: 12000 },
  { units: 6, monthlyContribution: 240, paymentsSpan: 120, totalContribution: 28800, loan: 240000, monthlyRepayment: 2400, repaymentNote: "X100", grant: 14400 },
  { units: 7, monthlyContribution: 280, paymentsSpan: 120, totalContribution: 33600, loan: 280000, monthlyRepayment: 2800, repaymentNote: "X100", grant: 16800 },
  { units: 8, monthlyContribution: 320, paymentsSpan: 120, totalContribution: 38400, loan: 320000, monthlyRepayment: 3200, repaymentNote: "X100", grant: 19200 },
];

const UNITS_TABLE_EXTENDED = [
  { units: 1, monthlyContribution: 50, paymentsSpan: 192, totalContribution: 9600, loan: 40000, monthlyRepayment: 260, repaymentNote: "X154", grant: 6400 },
  { units: 2, monthlyContribution: 100, paymentsSpan: 192, totalContribution: 19200, loan: 80000, monthlyRepayment: 520, repaymentNote: "X154", grant: 12800 },
  { units: 3, monthlyContribution: 150, paymentsSpan: 192, totalContribution: 28800, loan: 120000, monthlyRepayment: 780, repaymentNote: "X154", grant: 19200 },
  { units: 4, monthlyContribution: 200, paymentsSpan: 192, totalContribution: 38400, loan: 160000, monthlyRepayment: 1040, repaymentNote: "X154", grant: 25600 },
  { units: 5, monthlyContribution: 250, paymentsSpan: 192, totalContribution: 48000, loan: 200000, monthlyRepayment: 1300, repaymentNote: "X154", grant: 32000 },
  { units: 6, monthlyContribution: 300, paymentsSpan: 192, totalContribution: 57600, loan: 240000, monthlyRepayment: 1560, repaymentNote: "X154", grant: 38400 },
  { units: 7, monthlyContribution: 350, paymentsSpan: 192, totalContribution: 67200, loan: 280000, monthlyRepayment: 1820, repaymentNote: "X154", grant: 44800 },
  { units: 8, monthlyContribution: 400, paymentsSpan: 192, totalContribution: 76800, loan: 320000, monthlyRepayment: 2080, repaymentNote: "X154", grant: 51200 },
];

function UnitsInfoTable() {
  const [track, setTrack] = useState<UnitsTableTrack>("קלאסי");
  const rows = track === "קלאסי" ? UNITS_TABLE_CLASSIC : UNITS_TABLE_EXTENDED;
  const paymentsValue = rows[0]?.paymentsSpan ?? 120;
  const classicPaymentsRowSpan = 5;
  const extendedPaymentsRowSpan = 8;

  const headerStyle = {
    padding: "10px 12px",
    fontSize: "14px",
    fontWeight: "var(--font-weight-semibold)" as const,
    color: "#141E44",
    backgroundColor: "#E8EDF2",
    border: "1px solid #E5E9F9",
    textAlign: "center" as const,
  };
  const cellStyle = {
    padding: "10px 12px",
    fontSize: "14px",
    fontWeight: "var(--font-weight-normal)" as const,
    color: "#141E44",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E9F9",
    textAlign: "center" as const,
  };

  const isClassic = track === "קלאסי";
  const paymentsRowSpan = isClassic ? classicPaymentsRowSpan : extendedPaymentsRowSpan;
  const paymentsFirstRowIndex = isClassic ? 3 : 0;

  return (
    <div className="w-full" dir="rtl">
      {/* Toggle: מסלול קלאסי | מסלול פריסה מורחבת (same style as page.tsx view toggle), aligned right with table */}
      <div className="flex justify-start mb-4">
        <div
          className="flex p-1 gap-1 rounded-full"
          style={{ backgroundColor: "var(--page-section)", borderRadius: "300px" }}
        >
          <button
            type="button"
            onClick={() => setTrack("קלאסי")}
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors whitespace-nowrap border-none cursor-pointer"
            style={{
              backgroundColor: isClassic ? "#172554" : "transparent",
              fontSize: "13px",
              fontWeight: isClassic ? "var(--font-weight-semibold)" : "var(--font-weight-normal)",
              color: isClassic ? "#FFFFFF" : "var(--muted-foreground)",
            }}
          >
            מסלול קלאסי
          </button>
          <button
            type="button"
            onClick={() => setTrack("פריסה מורחבת")}
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors whitespace-nowrap border-none cursor-pointer"
            style={{
              backgroundColor: !isClassic ? "#172554" : "transparent",
              fontSize: "13px",
              fontWeight: !isClassic ? "var(--font-weight-semibold)" : "var(--font-weight-normal)",
              color: !isClassic ? "#FFFFFF" : "var(--muted-foreground)",
            }}
          >
            מסלול פריסה מורחבת
          </button>
        </div>
      </div>

      {/* Desktop/tablet: full table with horizontal scroll when needed */}
      <div className="hidden sm:block overflow-x-auto -mx-1" style={{ WebkitOverflowScrolling: "touch" }}>
        <table
          className="w-full border-collapse"
          style={{ minWidth: "560px", tableLayout: "fixed" }}
        >
          <thead>
            <tr>
              <th style={{ ...headerStyle, width: "12%" }}>יחידות</th>
              <th style={{ ...headerStyle, width: "16%" }}>תרומה חודשית</th>
              <th style={{ ...headerStyle, width: "12%" }}>תשלומים</th>
              <th style={{ ...headerStyle, width: "16%" }}>סך התרומה</th>
              <th style={{ ...headerStyle, width: "16%" }}>הלוואה</th>
              <th style={{ ...headerStyle, width: "18%" }}>החזר חודשי</th>
              <th style={{ ...headerStyle, width: "14%" }}>מענק</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${track}-${row.units}`}>
                <td style={cellStyle}>{row.units}</td>
                <td style={cellStyle}>₪{row.monthlyContribution.toLocaleString("he-IL")}</td>
                {index < paymentsFirstRowIndex ? (
                  <td style={cellStyle} />
                ) : index === paymentsFirstRowIndex ? (
                  <td rowSpan={paymentsRowSpan} style={{ ...cellStyle, verticalAlign: "middle" }}>
                    {paymentsValue}
                  </td>
                ) : null}
                <td style={cellStyle}>₪{row.totalContribution.toLocaleString("he-IL")}</td>
                <td style={cellStyle}>₪{row.loan.toLocaleString("he-IL")}</td>
                <td style={cellStyle}>({row.repaymentNote}) ₪{row.monthlyRepayment.toLocaleString("he-IL")}</td>
                <td style={cellStyle}>₪{row.grant.toLocaleString("he-IL")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: card list (each row = card) */}
      <div className="sm:hidden flex flex-col gap-3">
        {rows.map((row, index) => (
          <div
            key={`${track}-${row.units}`}
            className="rounded-lg border overflow-hidden"
            style={{
              borderColor: "#E5E9F9",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div
              style={{
                padding: "10px 14px",
                backgroundColor: "#E8EDF2",
                fontSize: "14px",
                fontWeight: "var(--font-weight-semibold)",
                color: "#141E44",
                textAlign: "center",
              }}
            >
              {row.units} יחידות
            </div>
            <div
              className="grid grid-cols-2 gap-x-4 gap-y-2"
              style={{ padding: "12px 14px", fontSize: "13px", color: "#141E44" }}
            >
              <div className="flex justify-between">
                <span style={{ color: "#6B7280" }}>תרומה חודשית</span>
                <span>₪{row.monthlyContribution.toLocaleString("he-IL")}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#6B7280" }}>סך התרומה</span>
                <span>₪{row.totalContribution.toLocaleString("he-IL")}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#6B7280" }}>תשלומים</span>
                <span>{paymentsValue}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#6B7280" }}>הלוואה</span>
                <span>₪{row.loan.toLocaleString("he-IL")}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#6B7280" }}>החזר חודשי</span>
                <span>({row.repaymentNote}) ₪{row.monthlyRepayment.toLocaleString("he-IL")}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#6B7280" }}>מענק</span>
                <span>₪{row.grant.toLocaleString("he-IL")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 2: Define Units ─── */
function StepDefineUnits({
  unitCount,
  onUnitCountChange,
  selectedTrack,
  onTrackChange,
}: {
  unitCount: number;
  onUnitCountChange: (count: number) => void;
  selectedTrack: "קלאסי" | "פריסה מורחבת";
  onTrackChange: (track: "קלאסי" | "פריסה מורחבת") => void;
}) {
  const [isTrackDropdownOpen, setIsTrackDropdownOpen] = useState(false);
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);

  const isExtended = selectedTrack === "פריסה מורחבת";
  const MONTHLY_PER_UNIT = isExtended ? 50 : 40;
  const LOAN_PER_UNIT = isExtended ? 50000 : 40000;
  const GRANT_PER_UNIT = isExtended ? 6400 : 2400;
  const TOTAL_MONTHS = isExtended ? 192 : 120;

  const monthlyPayment = unitCount * MONTHLY_PER_UNIT;
  const loanEligibility = unitCount * LOAN_PER_UNIT;
  const grantEligibility = unitCount * GRANT_PER_UNIT;

  const handleIncrement = () => onUnitCountChange(unitCount + 1);
  const handleDecrement = () => { if (unitCount > 0) onUnitCountChange(unitCount - 1); };

  return (
    <div className="flex flex-col items-end w-full">
      {/* Title */}
      <p style={{
        fontSize: "16px",
        color: "#141E44",
        fontWeight: "var(--font-weight-normal)",
        textAlign: "right",
        marginBottom: "12px",
        lineHeight: "20px",
        width: "100%",
      }}>
        הגדרת יחידות תרומה לרכישה
      </p>

      {/* Main card */}
      <div
        className="w-full"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          boxShadow: "0 0 12px rgba(24, 47, 67, 0.06)",
          overflow: "hidden",
        }}
      >
        {/* Top row: Quantity + Track side by side, right-aligned */}
        <div
          className="flex items-end gap-6"
          style={{ padding: "24px 28px" }}
        >
          {/* Quantity selector */}
          <div className="flex flex-col gap-2 shrink-0">
            <p style={{ fontSize: "14px", color: "#6B7280", fontWeight: "var(--font-weight-normal)", textAlign: "right" }}>
              כמות יחידות
            </p>
            <div className="flex items-center" dir="ltr">
              <button
                onClick={handleDecrement}
                className="flex items-center justify-center transition-colors"
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "6px 0 0 6px",
                  backgroundColor: "#FFFFFF",
                  cursor: unitCount === 0 ? "not-allowed" : "pointer",
                  opacity: unitCount === 0 ? 0.4 : 1,
                }}
                onMouseEnter={(e) => { if (unitCount > 0) e.currentTarget.style.backgroundColor = "#F9FAFB"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; }}
                disabled={unitCount === 0}
              >
                <Minus size={16} style={{ color: "#374151" }} />
              </button>
              <div
                className="flex items-center justify-center"
                style={{
                  width: "48px",
                  height: "36px",
                  borderTop: "1px solid #D1D5DB",
                  borderBottom: "1px solid #D1D5DB",
                  backgroundColor: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#141E44",
                }}
              >
                {unitCount}
              </div>
              <button
                onClick={handleIncrement}
                className="flex items-center justify-center transition-colors"
                style={{
                  width: "36px",
                  height: "36px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "0 6px 6px 0",
                  backgroundColor: "#FFFFFF",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F9FAFB"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; }}
              >
                <Plus size={16} style={{ color: "#374151" }} />
              </button>
            </div>
          </div>

          {/* Track selector - fills remaining width */}
          <div className="flex flex-col gap-2 flex-1">
            <p style={{ fontSize: "14px", color: "#6B7280", fontWeight: "var(--font-weight-normal)", textAlign: "right" }}>
              מסלול יחידה
            </p>
            <div className="relative w-full">
              <button
                onClick={() => setIsTrackDropdownOpen(!isTrackDropdownOpen)}
                className="flex items-center gap-2 transition-colors w-full"
                style={{
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "1px solid #D1D5DB",
                  backgroundColor: "#FFFFFF",
                  cursor: "pointer",
                  justifyContent: "space-between",
                  height: "36px",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F9FAFB"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; }}
              >
                <span style={{ fontSize: "15px", color: "#141E44", fontWeight: "var(--font-weight-normal)" }}>
                  {selectedTrack}
                </span>
                <ChevronDown
                  size={16}
                  style={{
                    color: "#6B7280",
                    transform: isTrackDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>
              {isTrackDropdownOpen && (
                <div
                  className="absolute z-10 w-full"
                  style={{
                    top: "calc(100% + 4px)",
                    right: 0,
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E9F9",
                    borderRadius: "6px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                  }}
                >
                  {(["קלאסי", "פריסה מורחבת"] as const).map((track) => (
                    <button
                      key={track}
                      onClick={() => {
                        onTrackChange(track);
                        setIsTrackDropdownOpen(false);
                      }}
                      className="w-full transition-colors"
                      style={{
                        padding: "10px 14px",
                        textAlign: "right",
                        fontSize: "15px",
                        color: selectedTrack === track ? "#141E44" : "#495157",
                        fontWeight: selectedTrack === track ? "var(--font-weight-semibold)" : "var(--font-weight-normal)",
                        backgroundColor: selectedTrack === track ? "#F0F4FF" : "#FFFFFF",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedTrack !== track) e.currentTarget.style.backgroundColor = "#F9FAFB";
                      }}
                      onMouseLeave={(e) => {
                        if (selectedTrack !== track) e.currentTarget.style.backgroundColor = "#FFFFFF";
                      }}
                    >
                      {track}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: "100%", height: "1px", backgroundColor: "#E5E9F9" }} />

        {/* Info row: computed values (RTL: first child = right) */}
        <div
          className="flex items-start"
          style={{ padding: "20px 28px" }}
        >
          {/* Payment details */}
          <div className="flex flex-col gap-1 flex-1" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "#6B7280", fontWeight: "var(--font-weight-normal)" }}>
              פירוט תשלומים
            </p>
            <p style={{
              fontSize: "14px",
              color: unitCount > 0 ? "#141E44" : "#9CA3AF",
              fontWeight: "var(--font-weight-semibold)",
            }}>
              {unitCount > 0
                ? `₪${monthlyPayment.toLocaleString('he-IL')} בחודש למשך ${TOTAL_MONTHS} חודשים`
                : "-"
              }
            </p>
          </div>

          {/* Divider */}
          <div className="shrink-0 mx-4" style={{ width: "1px", height: "36px", backgroundColor: "#E5E9F9" }} />

          {/* Loan eligibility */}
          <div className="flex flex-col gap-1 flex-1" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "#6B7280", fontWeight: "var(--font-weight-normal)" }}>
              זכאות להלוואה עתידית
            </p>
            <p style={{
              fontSize: "14px",
              color: unitCount > 0 ? "#141E44" : "#9CA3AF",
              fontWeight: "var(--font-weight-semibold)",
            }}>
              {unitCount > 0
                ? `₪${loanEligibility.toLocaleString('he-IL')}`
                : "-"
              }
            </p>
          </div>

          {/* Divider */}
          <div className="shrink-0 mx-4" style={{ width: "1px", height: "36px", backgroundColor: "#E5E9F9" }} />

          {/* Grant eligibility */}
          <div className="flex flex-col gap-1 flex-1" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "#6B7280", fontWeight: "var(--font-weight-normal)" }}>
              זכאות למענק עתידי
            </p>
            <p style={{
              fontSize: "14px",
              color: unitCount > 0 ? "#141E44" : "#9CA3AF",
              fontWeight: "var(--font-weight-semibold)",
            }}>
              {unitCount > 0
                ? `₪${grantEligibility.toLocaleString('he-IL')}`
                : "-"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Additional info accordion - RTL: Info icon RIGHT, text, chevron LEFT */}
      <button
        onClick={() => setIsInfoExpanded(!isInfoExpanded)}
        className="flex items-center gap-2 transition-colors"
        style={{
          marginTop: "20px",
          padding: "10px 0",
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        <Info size={15} style={{ color: "#6B7280" }} />
        <span style={{ fontSize: "14px", color: "#495157", fontWeight: "var(--font-weight-normal)" }}>
          מידע נוסף על מסלולי היחידות
        </span>
        <ChevronDown
          size={15}
          style={{
            color: "#6B7280",
            transform: isInfoExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      {/* Expandable info content: units reference table */}
      {isInfoExpanded && (
        <div
          className="w-full"
          style={{
            marginTop: "8px",
            padding: "20px 24px",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            boxShadow: "0 0 12px rgba(24, 47, 67, 0.06)",
          }}
        >
          <UnitsInfoTable />
        </div>
      )}
    </div>
  );
}

/* ─── Bank Icon ─── */
function BankIcon({ size = 28, color = "#676767" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M2.33325 9.99723C2.33325 8.60168 2.89603 7.74644 4.06065 7.09831L8.85477 4.43033C11.3669 3.03232 12.6229 2.33331 13.9999 2.33331C15.3769 2.33331 16.633 3.03232 19.145 4.43033L23.9392 7.09831C25.1038 7.74644 25.6666 8.6017 25.6666 9.99723C25.6666 10.3756 25.6666 10.5649 25.6253 10.7204C25.4082 11.5377 24.6676 11.6666 23.9524 11.6666H4.04741C3.33223 11.6666 2.59169 11.5377 2.37458 10.7204C2.33325 10.5649 2.33325 10.3756 2.33325 9.99723Z" stroke={color} />
      <path d="M13.9951 8.16669H14.0061" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.66675 11.6667V21.5834M9.33341 11.6667V21.5834" stroke={color} />
      <path d="M18.6667 11.6667V21.5834M23.3334 11.6667V21.5834" stroke={color} />
      <path d="M22.1666 21.5833H5.83325C3.90026 21.5833 2.33325 23.1503 2.33325 25.0833C2.33325 25.4054 2.59442 25.6666 2.91659 25.6666H25.0833C25.4054 25.6666 25.6666 25.4054 25.6666 25.0833C25.6666 23.1503 24.0996 21.5833 22.1666 21.5833Z" stroke={color} />
    </svg>
  );
}

/* ─── Credit Card Icon ─── */
function CreditCardIcon({ size = 28, color = "#676767" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M1.75 14C1.75 9.6666 1.75 7.49988 3.03968 6.05331C3.24596 5.82195 3.47331 5.60797 3.71914 5.41383C5.25611 4.20001 7.55824 4.20001 12.1625 4.20001H15.8375C20.4418 4.20001 22.7439 4.20001 24.2808 5.41383C24.5267 5.60797 24.754 5.82195 24.9603 6.05331C26.25 7.49988 26.25 9.6666 26.25 14C26.25 18.3334 26.25 20.5001 24.9603 21.9467C24.754 22.1781 24.5267 22.392 24.2808 22.5862C22.7439 23.8 20.4418 23.8 15.8375 23.8H12.1625C7.55824 23.8 5.25611 23.8 3.71914 22.5862C3.47331 22.392 3.24596 22.1781 3.03968 21.9467C1.75 20.5001 1.75 18.3334 1.75 14Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.55 18.9H13.3875" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.0625 18.9H21.35" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.75 10.325H26.25" stroke={color} strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Payment Method Data ─── */
interface PaymentMethod {
  id: string;
  type: 'bank' | 'credit';
  name: string;
  accountNumber: string;
  monthlyCharge: number;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm-1",
    type: "bank",
    name: "דיסקונט",
    accountNumber: "10-4839853",
    monthlyCharge: 6043,
  },
  {
    id: "pm-2",
    type: "credit",
    name: "MAX",
    accountNumber: "4932",
    monthlyCharge: 1232,
  },
  {
    id: "pm-3",
    type: "bank",
    name: "לאומי",
    accountNumber: "10-4839853",
    monthlyCharge: 0,
  },
];

/* ─── Step 3: Select Payment Method ─── */
function StepSelectPayment({
  selectedPaymentId,
  onSelect,
}: {
  selectedPaymentId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col items-end w-full">
      {/* Title */}
      <p style={{
        fontSize: "16px",
        color: "#141E44",
        fontWeight: "var(--font-weight-normal)",
        textAlign: "right",
        marginBottom: "20px",
        lineHeight: "20px",
        width: "100%",
      }}>
        בחירת אמצעי תשלום
      </p>

      {/* Payment methods grid - 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 w-full" style={{ gap: "14px" }}>
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedPaymentId === method.id;
          return (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isSelected={isSelected}
              onClick={() => onSelect(method.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ─── Payment Method Card ─── */
function PaymentMethodCard({
  method,
  isSelected,
  onClick,
}: {
  method: PaymentMethod;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = method.type === 'bank' ? BankIcon : CreditCardIcon;
  const iconColor = isSelected ? "#172554" : "#676767";

  return (
    <button
      className="flex flex-col items-center gap-3 transition-all"
      style={{
        padding: "28px 20px 24px",
        borderRadius: "8px",
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
          : "0 0 12px rgba(24, 47, 67, 0.06)",
        textAlign: "center",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon with subtle circle background */}
      <div
        className="flex items-center justify-center transition-all duration-200"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          backgroundColor: isSelected ? "#EFF6FF" : "#F3F5FA",
        }}
      >
        <IconComponent size={24} color={iconColor} />
      </div>

      {/* Account name & number */}
      <p style={{
        fontSize: "16px",
        fontWeight: isSelected ? "var(--font-weight-bold)" : "var(--font-weight-semibold)",
        color: isSelected ? "#141E44" : "#495157",
        lineHeight: "22px",
        transition: "color 0.2s ease",
      }}>
        {method.name} {method.accountNumber}
      </p>

      {/* Monthly charge */}
      <span style={{
        fontSize: "14px",
        color: "#6B7280",
        fontWeight: "var(--font-weight-normal)",
        lineHeight: "20px",
      }}>
        חיוב חודשי נוכחי {method.monthlyCharge > 0 ? `₪${method.monthlyCharge.toLocaleString('he-IL')}` : "₪0"}
      </span>
    </button>
  );
}

/* ─── Step 4: Summary ─── */
function StepSummary({
  childName,
  unitCount,
  selectedTrack,
  paymentMethod,
}: {
  childName: string;
  unitCount: number;
  selectedTrack: "קלאסי" | "פריסה מורחבת";
  paymentMethod: PaymentMethod | null;
}) {
  const isExtended = selectedTrack === "פריסה מורחבת";
  const monthlyAmount = unitCount * (isExtended ? 50 : 40);
  const loanEligibility = unitCount * (isExtended ? 50000 : 40000);
  const grantEligibility = unitCount * (isExtended ? 6400 : 2400);
  const totalMonths = isExtended ? 192 : 120;
  const totalDonation = unitCount * 4000;
  const designationYear = new Date().getFullYear() + 10;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Title */}
      <p style={{
        fontSize: "18px",
        color: "#141E44",
        fontWeight: "var(--font-weight-bold)",
        lineHeight: "24px",
        textAlign: "center",
        marginBottom: "24px",
      }}>
        סיכום רכישת יחידות תרומה
      </p>

      {/* Summary card */}
      <div
        className="w-full"
        style={{
          maxWidth: "580px",
          backgroundColor: "#FFFFFF",
          borderRadius: "10px",
          border: "1px solid #E5E9F9",
          padding: "28px 32px",
        }}
      >
        {/* Purchase details rows */}
        <SummaryRow label="מס׳ יחידות תרומה" value={`${unitCount} יחידות`} />
        <SummaryRow label="עבור" value={childName} />
        <SummaryRow label="סכום חודשי לתרומה" value={`₪${monthlyAmount.toLocaleString('he-IL')}`} bold />
        <SummaryRow label="משך תקופת התרומה" value={`${totalMonths} חודשים`} />
        <SummaryRow label="אמצעי תשלום" value={paymentMethod ? `${paymentMethod.name} ${paymentMethod.accountNumber}` : "-"} isLast />

        {/* Spacer between sections */}
        <div style={{ height: "20px" }} />

        {/* Future benefits rows */}
        <SummaryRow label="שנת ייעוד" value={`${designationYear}`} />
        <SummaryRow label="סכום זכאות להלוואה" value={`₪${loanEligibility.toLocaleString('he-IL')}`} bold />
        <SummaryRow label="סכום זכאות למענק" value={`₪${grantEligibility.toLocaleString('he-IL')}`} bold isLast />
      </div>

      {/* Disclaimer */}
      <p style={{
        fontSize: "13px",
        color: "#9CA3AF",
        textAlign: "center",
        marginTop: "24px",
        lineHeight: "20px",
        maxWidth: "480px",
      }}>
        בלחיצה על ״אישור רכישה״ אני מאשר/ת את תנאי הרכישה ואת החיוב החודשי באמצעי התשלום שנבחר.
      </p>
    </div>
  );
}

/* ─── Summary Row Component ─── */
function SummaryRow({
  label,
  value,
  bold,
  isLast,
}: {
  label: string;
  value: string;
  bold?: boolean;
  isLast?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        padding: "12px 0",
        borderBottom: isLast ? "none" : "1px solid #F0F1F5",
      }}
    >
      <span style={{
        fontSize: "15px",
        color: "#6B7280",
        fontWeight: "var(--font-weight-normal)",
      }}>
        {label}
      </span>
      <span style={{
        fontSize: "15px",
        color: "#141E44",
        fontWeight: bold ? "var(--font-weight-semibold)" : "var(--font-weight-normal)",
      }}>
        {value}
      </span>
    </div>
  );
}

/* ─── Illustration Icon (donate jar) ─── */
function IllustrationIcon({ size = 140 }: { size?: number }) {
  return (
    <img
      src="/illustration-donate.png"
      alt="illustration"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
      draggable={false}
    />
  );
}

/* ─── Animated Checkmark SVG ─── */
function AnimatedCheckmark() {
  return (
    <div style={{ width: "120px", height: "120px", position: "relative" }}>
      <style>{`
        @keyframes circle-draw {
          0% { stroke-dashoffset: 314; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes check-draw {
          0% { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes circle-fill {
          0% { fill: transparent; }
          100% { fill: rgba(59, 130, 246, 0.08); }
        }
        @keyframes scale-bounce {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes confetti-fall-1 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(-40px, 60px) rotate(360deg); opacity: 0; }
        }
        @keyframes confetti-fall-2 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(35px, 55px) rotate(-270deg); opacity: 0; }
        }
        @keyframes confetti-fall-3 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(-20px, 70px) rotate(180deg); opacity: 0; }
        }
        @keyframes confetti-fall-4 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(45px, 45px) rotate(-360deg); opacity: 0; }
        }
        @keyframes confetti-fall-5 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(-50px, 40px) rotate(270deg); opacity: 0; }
        }
        @keyframes confetti-fall-6 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(25px, 65px) rotate(-180deg); opacity: 0; }
        }
        .check-circle {
          stroke-dasharray: 314;
          stroke-dashoffset: 314;
          animation: circle-draw 0.6s ease-out 0.2s forwards, circle-fill 0.4s ease-out 0.7s forwards;
        }
        .check-mark {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: check-draw 0.4s ease-out 0.7s forwards;
        }
        .check-container {
          animation: scale-bounce 0.5s ease-out 0.1s both;
        }
        .confetti-dot {
          opacity: 0;
        }
        .confetti-1 { animation: confetti-fall-1 1s ease-out 1s forwards; }
        .confetti-2 { animation: confetti-fall-2 1.1s ease-out 1.05s forwards; }
        .confetti-3 { animation: confetti-fall-3 0.9s ease-out 1.1s forwards; }
        .confetti-4 { animation: confetti-fall-4 1.2s ease-out 1.02s forwards; }
        .confetti-5 { animation: confetti-fall-5 1s ease-out 1.08s forwards; }
        .confetti-6 { animation: confetti-fall-6 1.1s ease-out 1.15s forwards; }
      `}</style>
      <svg width="120" height="120" viewBox="0 0 120 120" className="check-container">
        <circle className="check-circle" cx="60" cy="60" r="50" stroke="#3B82F6" strokeWidth="4" fill="transparent" />
        <path className="check-mark" d="M38 62 L52 76 L82 46" fill="none" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle className="confetti-dot confetti-1" cx="30" cy="20" r="3" fill="#3B82F6" />
        <rect className="confetti-dot confetti-2" x="85" y="15" width="6" height="6" rx="1" fill="#CCA559" />
        <circle className="confetti-dot confetti-3" cx="15" cy="55" r="2.5" fill="#172554" />
        <rect className="confetti-dot confetti-4" x="97" y="50" width="5" height="5" rx="1" fill="#3B82F6" />
        <circle className="confetti-dot confetti-5" cx="25" cy="90" r="3" fill="#CCA559" />
        <rect className="confetti-dot confetti-6" x="90" y="85" width="6" height="6" rx="1" fill="#172554" />
      </svg>
    </div>
  );
}

/* ─── Success Screen ─── */
function SuccessScreen({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<"illustration" | "checkmark">("illustration");
  const [showTitle, setShowTitle] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 800);
    const detailsTimer = setTimeout(() => setShowDetails(true), 1400);
    const switchTimer = setTimeout(() => setPhase("checkmark"), 2800);
    const buttonTimer = setTimeout(() => setShowButton(true), 3800);
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(detailsTimer);
      clearTimeout(switchTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: "40px" }}>
      {/* Icon area - fixed height to prevent layout shift */}
      <div style={{ width: "160px", height: "160px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Illustration - shows first, then fades out */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: phase === "illustration" ? 1 : 0,
            transform: phase === "illustration" ? "scale(1)" : "scale(0.6)",
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
          }}
        >
          <div style={{
            animation: "illustration-entrance 0.6s ease-out both",
          }}>
            <IllustrationIcon size={140} />
          </div>
        </div>

        {/* Checkmark - hidden first, then fades in */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: phase === "checkmark" ? 1 : 0,
            transform: phase === "checkmark" ? "scale(1)" : "scale(1.3)",
            transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
            pointerEvents: phase === "checkmark" ? "auto" : "none",
          }}
        >
          {phase === "checkmark" && <AnimatedCheckmark />}
        </div>
      </div>

      <style>{`
        @keyframes illustration-entrance {
          0% { transform: scale(0.5) translateY(10px); opacity: 0; }
          60% { transform: scale(1.06) translateY(-2px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Title - fades in during illustration */}
      <div style={{ marginTop: "32px", textAlign: "center" }}>
        <p style={{
          fontSize: "22px",
          fontWeight: "var(--font-weight-bold)",
          color: "#141E44",
          lineHeight: "30px",
          marginBottom: "12px",
          opacity: showTitle ? 1 : 0,
          transform: showTitle ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}>
          הרכישה בוצעה בהצלחה!
        </p>

        {/* Details - fade in staggered after title */}
        <p style={{
          fontSize: "16px",
          color: "#495157",
          lineHeight: "26px",
          maxWidth: "420px",
          marginBottom: "8px",
          opacity: showDetails ? 1 : 0,
          transform: showDetails ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}>
          אישור על הרכישה ישלח לכתובת האימייל שלך בדקות הקרובות.
        </p>

        <p style={{
          fontSize: "15px",
          color: "#6B7280",
          lineHeight: "24px",
          maxWidth: "400px",
          opacity: showDetails ? 1 : 0,
          transform: showDetails ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.5s ease-out 0.15s, transform 0.5s ease-out 0.15s",
        }}>
          היחידות נוספו בהצלחה לחשבונך ותוכל לצפות בהן בעמוד יחידות התרומה.
        </p>
      </div>

      {/* Close button - fades in after checkmark */}
      <div
        style={{
          marginTop: "40px",
          opacity: showButton ? 1 : 0,
          transform: showButton ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}
      >
        <button
          onClick={onClose}
          className="transition-all"
          style={{
            padding: "14px 48px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "var(--font-weight-semibold)",
            color: "#FFFFFF",
            backgroundColor: "#172554",
            border: "none",
            cursor: "pointer",
            height: "48px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0F1A3E";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#172554";
          }}
        >
          סגירה
        </button>
      </div>
    </div>
  );
}
