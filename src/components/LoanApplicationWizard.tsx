'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

const MARITAL_OPTIONS = [
  { value: 'married', label: 'נשוי' },
  { value: 'engaged', label: 'מאורס' },
  { value: 'single', label: 'רווק' },
  { value: 'divorced', label: 'גרוש' },
  { value: 'widowed', label: 'אלמן' },
] as const;

const WIZARD_STEPS = [
  { id: 1, label: 'פרטי הלווה' },
  { id: 2, label: 'פרטי ההלוואה' },
  { id: 3, label: 'הגדרת ערבים' },
  { id: 4, label: 'פרטי התקשרות' },
  { id: 5, label: 'סיכום והגשה' },
] as const;

const RELATIONSHIP_OPTIONS = [
  { value: '', label: 'בחירת קרבה' },
  { value: 'parent', label: 'הורה' },
  { value: 'grandparent', label: 'סבים' },
  { value: 'uncle', label: 'דוד/דודה' },
  { value: 'other', label: 'אחר' },
];

const CHILD_OPTIONS = [
  { value: '', label: 'בחירת ילד/ה או קרוב/ה' },
  { value: '1', label: 'ילד א' },
  { value: '2', label: 'ילד ב' },
];

export interface LoanWizardStep1Data {
  fullName: string;
  idNumber: string;
  birthDate: string;
  selectedChildId: string;
  phone: string;
  email: string;
  relationship: string;
  maritalStatus: string;
  spouseFullName: string;
  spouseIdNumber: string;
  spouseBirthDate: string;
  spousePhone: string;
  spouseEmail: string;
}

interface LoanApplicationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onExitAndSave?: () => void;
}

const emptyStep1: LoanWizardStep1Data = {
  fullName: '',
  idNumber: '',
  birthDate: '',
  selectedChildId: '',
  phone: '',
  email: '',
  relationship: '',
  maritalStatus: '',
  spouseFullName: '',
  spouseIdNumber: '',
  spouseBirthDate: '',
  spousePhone: '',
  spouseEmail: '',
};

export function LoanApplicationWizard({ isOpen, onClose, onExitAndSave }: LoanApplicationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [step1, setStep1] = useState<LoanWizardStep1Data>(emptyStep1);

  if (!isOpen) return null;

  const canNavigateToStep = (stepId: number) =>
    stepId <= currentStep || completedSteps.includes(stepId);

  const handleContinue = () => {
    if (currentStep < 5) {
      setCompletedSteps((prev) =>
        prev.includes(currentStep) ? prev : [...prev, currentStep]
      );
      setCurrentStep((s) => s + 1);
    }
  };

  const handleExitAndSave = () => {
    onExitAndSave?.();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ backgroundColor: '#FAFAFA', direction: 'rtl' }}
      dir="rtl"
    >
      {/* ─── Header – זהה למסך המקדים ─── */}
      <header
        className="flex flex-row justify-between items-center shrink-0 px-4 py-3 min-h-[56px] md:min-h-[72px] md:px-[38px] md:py-4"
        style={{
          background: '#F8FAFC',
          borderBottom: '1px solid #E8EDF2',
          boxShadow: '9.53704px 7.80303px 43.3502px rgba(33, 132, 213, 0.1)',
        }}
      >
        <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1" style={{ textAlign: 'right' }}>
          <span
            className="text-base md:text-xl font-bold truncate"
            style={{ fontFamily: 'SimplerPro', color: '#172554' }}
          >
            תהליך בקשת הלוואה
          </span>
          <span
            className="text-xs md:text-sm"
            style={{ fontFamily: 'SimplerPro', fontWeight: 400, color: '#495157' }}
          >
            עבור ילד/ה או קרוב/ה
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:bg-[rgba(0,0,0,0.06)]"
          style={{ border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
          aria-label="סגור"
        >
          <X size={20} style={{ color: '#495157' }} />
        </button>
      </header>

      {/* ─── Body: sidebar נמשך עד למטה, תוכן + פוטר לצידו ─── */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* ── Wizard Sidebar – כחול כהה, full height ── */}
        <aside
          className="hidden md:flex flex-col shrink-0 py-10 px-8"
          style={{
            width: '240px',
            background: '#172554',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex flex-col gap-8">
            {WIZARD_STEPS.map((step, index) => {
              const active = step.id === currentStep;
              const completed = completedSteps.includes(step.id);
              const clickable = canNavigateToStep(step.id);
              const filled = active || completed;
              const isLast = index === WIZARD_STEPS.length - 1;

              return (
                <div key={step.id} className="flex flex-col">
                  <div className="flex flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => clickable && setCurrentStep(step.id)}
                      disabled={!clickable}
                      className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 border-0 transition-colors"
                      style={{
                        background: filled ? '#CCA559' : 'rgba(255,255,255,0.1)',
                        color: filled ? '#172554' : 'rgba(255,255,255,0.4)',
                        fontWeight: 700,
                        fontSize: '14px',
                        fontFamily: 'SimplerPro',
                        cursor: clickable ? 'pointer' : 'default',
                      }}
                    >
                      {String(step.id).padStart(2, '0')}
                    </button>
                    <span
                      style={{
                        fontFamily: 'SimplerPro',
                        fontWeight: active ? 700 : 400,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: active ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                        cursor: clickable ? 'pointer' : 'default',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      style={{
                        width: 0,
                        height: 16,
                        marginRight: 19,
                        marginTop: 4,
                        borderRight: `2px dashed ${completed ? '#CCA559' : 'rgba(255,255,255,0.15)'}`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* ── Right side: content area + info panel + footer stacked ── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1 flex min-w-0 min-h-0 overflow-hidden">
            {/* Center – Form */}
            <div className="flex-1 min-w-0 overflow-y-auto py-8 px-6 md:px-12 lg:px-16">
              {/* Mobile step indicator */}
              <div className="md:hidden flex flex-row items-center gap-2 mb-5" style={{ justifyContent: 'flex-end' }}>
                <span style={{ fontFamily: 'SimplerPro', fontSize: '12px', color: '#9CA3AF' }}>
                  שלב {currentStep} מתוך 5
                </span>
                <span style={{ fontFamily: 'SimplerPro', fontWeight: 600, fontSize: '14px', color: '#172554' }}>
                  {WIZARD_STEPS[currentStep - 1]?.label}
                </span>
              </div>

              {currentStep === 1 && (
                <Step1Form step1={step1} setStep1={setStep1} />
              )}
              {currentStep > 1 && (
                <div
                  className="flex-1 flex items-center justify-center h-full"
                  style={{ color: '#9CA3AF', fontFamily: 'SimplerPro' }}
                >
                  שלב {currentStep} – בהמשך יוטמע
                </div>
              )}
            </div>

            {/* ── Info Panel (שמאל) ── */}
            <aside
              className="hidden lg:flex flex-col shrink-0 w-[280px] xl:w-[320px] py-8 px-6 overflow-y-auto"
              style={{
                background: '#F1F5F9',
                borderRight: '1px solid #E5E9F9',
              }}
            >
              <div className="flex flex-row items-center gap-2 mb-2">
                <Image src="/icons/lamp.svg" alt="" width={20} height={20} unoptimized className="shrink-0" />
                <span
                  style={{
                    fontFamily: 'SimplerPro',
                    fontWeight: 700,
                    fontSize: '16px',
                    color: '#172554',
                  }}
                >
                  תנאים לזכאות לווה
                </span>
              </div>
              <span
                className="mb-5"
                style={{
                  fontFamily: 'SimplerPro',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--muted-foreground)',
                }}
              >
                תנאים לזכאות לווה
              </span>

              <div className="flex flex-col gap-3">
                <InfoCard>
                  אם נמצאו במערכת מספר תיקים אפשריים לאותו לווה, הבקשה תועבר לבדיקה לפני המשך התהליך.
                </InfoCard>
                <InfoCard>
                  אם היו ללווה שלוש החזרות לחיוב בשנה האחרונה, הבקשה תועבר לאישור מיוחד.
                </InfoCard>
                <InfoCard>
                  אם ללווה יש הלוואות פעילות מאותו תורם, והסכום הכולל לאחר ההלוואה החדשה עולה על: 160,000 ₪ (הלוואה רגילה) – 240,000 ₪ (הלוואה למטרת דירה) – הבקשה תועבר לאישור מיוחד.
                </InfoCard>
              </div>
            </aside>
          </div>

          {/* ─── Footer – בתוך אזור התוכן, לא חוצה את ה-sidebar ─── */}
          <footer
            className="flex flex-row items-center justify-between shrink-0 px-6 md:px-10 py-4"
            style={{
              background: 'var(--card)',
              borderTop: '1px solid var(--border)',
              minHeight: '72px',
            }}
          >
            <button
              type="button"
              onClick={handleExitAndSave}
              className="inline-flex items-center justify-center h-11 px-6 rounded-lg font-semibold cursor-pointer transition-all hover:bg-[rgba(0,0,0,0.03)]"
              style={{
                fontFamily: 'SimplerPro',
                fontSize: 'var(--text-base)',
                color: 'var(--primary)',
                background: 'transparent',
                border: '1.5px solid var(--primary)',
              }}
            >
              יציאה ושמירה
            </button>

            <button
              type="button"
              onClick={handleContinue}
              className="inline-flex items-center justify-center h-11 px-8 rounded-lg font-semibold border-0 cursor-pointer transition-opacity hover:opacity-90"
              style={{
                fontFamily: 'SimplerPro',
                fontSize: 'var(--text-base)',
                color: 'var(--primary-foreground)',
                background: 'var(--primary)',
              }}
            >
              המשך
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 1: פרטי הלווה ─── */
function Step1Form({
  step1,
  setStep1,
}: {
  step1: LoanWizardStep1Data;
  setStep1: React.Dispatch<React.SetStateAction<LoanWizardStep1Data>>;
}) {
  return (
    <>
      <h2
        style={{
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-bold)',
          fontSize: 'var(--text-xl)',
          color: 'var(--primary)',
          lineHeight: 1.3,
          textAlign: 'right',
          marginBottom: 32,
        }}
      >
        פרטי הלווה
      </h2>

      <div className="flex flex-col gap-5 max-w-[720px] w-full">
        {/* Row 1: שם מלא | ת.ז. | תאריך לידה */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <WizardInput
            label="שם מלא"
            value={step1.fullName}
            onChange={(v) => setStep1((p) => ({ ...p, fullName: v }))}
            placeholder="הזן שם מלא"
          />
          <WizardInput
            label="ת.ז."
            value={step1.idNumber}
            onChange={(v) => setStep1((p) => ({ ...p, idNumber: v }))}
            placeholder="מספר ת.ז."
          />
          <WizardInput
            label="תאריך לידה"
            type="date"
            value={step1.birthDate}
            onChange={(v) => setStep1((p) => ({ ...p, birthDate: v }))}
          />
        </div>

        {/* Row 1.5: בחירת ילד/ה (שדה בודד) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <WizardSelect
            label=""
            value={step1.selectedChildId}
            onChange={(v) => setStep1((p) => ({ ...p, selectedChildId: v }))}
            options={CHILD_OPTIONS}
          />
        </div>

        {/* Row 2: טלפון | אימייל | הקשר שלי ללווה */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <WizardInput
            label="טלפון"
            value={step1.phone}
            onChange={(v) => setStep1((p) => ({ ...p, phone: v }))}
            placeholder="מס׳ טלפון"
          />
          <WizardInput
            label="אימייל"
            type="email"
            value={step1.email}
            onChange={(v) => setStep1((p) => ({ ...p, email: v }))}
            placeholder="דוא״ל"
          />
          <WizardSelect
            label="הקשר שלי ללווה"
            value={step1.relationship}
            onChange={(v) => setStep1((p) => ({ ...p, relationship: v }))}
            options={RELATIONSHIP_OPTIONS}
          />
        </div>

        {/* ─── מצב אישי של הלווה ─── */}
        <div className="mt-4">
          <label
            className="block mb-3"
            style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-normal)',
              color: 'var(--muted-foreground)',
              textAlign: 'right',
            }}
          >
            מצב אישי של הלווה
          </label>
          <div className="flex flex-row flex-wrap gap-3">
            {MARITAL_OPTIONS.map((opt) => {
              const selected = step1.maritalStatus === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStep1((p) => ({ ...p, maritalStatus: opt.value }))}
                  className="inline-flex items-center gap-2 px-4 h-10 rounded-lg cursor-pointer transition-all border"
                  style={{
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: selected ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
                    color: selected ? 'var(--primary)' : 'var(--muted-foreground)',
                    background: selected ? '#F0F4FF' : 'var(--card)',
                    borderColor: selected ? 'var(--primary)' : 'var(--border)',
                  }}
                >
                  <span
                    className="flex items-center justify-center w-4 h-4 rounded-full border-2 shrink-0"
                    style={{
                      borderColor: selected ? 'var(--primary)' : 'var(--border)',
                    }}
                  >
                    {selected && (
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--primary)' }}
                      />
                    )}
                  </span>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── פרטי בת הזוג של הלווה (מוצג רק כשנשוי) ─── */}
        {step1.maritalStatus === 'married' && (
          <div
            className="rounded-xl px-6 py-6 mt-2"
            style={{
              background: '#F1F5F9',
              border: '1px solid var(--border)',
            }}
          >
            <h3
              className="mb-5"
              style={{
                fontFamily: 'var(--font-family-base)',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: 'var(--text-base)',
                color: 'var(--primary)',
                textAlign: 'right',
              }}
            >
              פרטי בת הזוג של הלווה
            </h3>
            <div className="flex flex-col gap-4">
              {/* Row: שם מלא | ת.ז. | תאריך לידה */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <WizardInput
                  label="שם מלא"
                  value={step1.spouseFullName}
                  onChange={(v) => setStep1((p) => ({ ...p, spouseFullName: v }))}
                  placeholder="שם מלא"
                />
                <WizardInput
                  label="ת.ז."
                  value={step1.spouseIdNumber}
                  onChange={(v) => setStep1((p) => ({ ...p, spouseIdNumber: v }))}
                  placeholder="מספר ת.ז."
                />
                <WizardInput
                  label="תאריך לידה"
                  type="date"
                  value={step1.spouseBirthDate}
                  onChange={(v) => setStep1((p) => ({ ...p, spouseBirthDate: v }))}
                />
              </div>
              {/* Row: טלפון | אימייל */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <WizardInput
                  label="טלפון"
                  value={step1.spousePhone}
                  onChange={(v) => setStep1((p) => ({ ...p, spousePhone: v }))}
                  placeholder="מס׳ טלפון"
                />
                <WizardInput
                  label="אימייל"
                  type="email"
                  value={step1.spouseEmail}
                  onChange={(v) => setStep1((p) => ({ ...p, spouseEmail: v }))}
                  placeholder="דוא״ל"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ─── Form Field (DSM tokens) ─── */
function WizardInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'email';
}) {
  return (
    <div className="w-full" dir="rtl">
      {label && (
        <label
          className="block mb-2"
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-normal)',
            color: 'var(--muted-foreground)',
            textAlign: 'right',
          }}
        >
          {label}
        </label>
      )}
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir="rtl"
        className="w-full h-9 rounded-md border border-border bg-input-background text-right px-3 text-sm"
        style={{
          fontFamily: 'var(--font-family-base)',
          color: 'var(--foreground)',
        }}
      />
    </div>
  );
}

/* ─── Select Field (DSM tokens) ─── */
function WizardSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="w-full" dir="rtl">
      {label && (
        <label
          className="block mb-2"
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-normal)',
            color: 'var(--muted-foreground)',
            textAlign: 'right',
          }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir="rtl"
          className="w-full h-9 rounded-md border border-border bg-input-background text-right cursor-pointer appearance-none pr-3 pl-9 text-sm"
          style={{
            fontFamily: 'var(--font-family-base)',
            color: value ? 'var(--foreground)' : 'var(--muted-foreground)',
          }}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="absolute pointer-events-none"
          style={{
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--muted-foreground)',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Info Card (sidebar) ─── */
function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg px-4 py-3"
      style={{
        background: '#E8EDF2',
        border: '1px solid #D9DDEC',
      }}
    >
      <p
        className="m-0 leading-relaxed"
        style={{
          fontFamily: 'SimplerPro',
          fontSize: '13px',
          fontWeight: 400,
          color: '#495157',
          textAlign: 'right',
          lineHeight: 1.6,
        }}
      >
        <span style={{ color: '#172554', fontWeight: 600 }}>• </span>
        {children}
      </p>
    </div>
  );
}
