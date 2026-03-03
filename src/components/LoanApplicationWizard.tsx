'use client';

import { useState } from 'react';
import { X, ChevronDown, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';

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

      {/* ─── Body: sidebar + content + info panel ─── */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* ── Wizard Sidebar (ימין) ── */}
        <aside
          className="hidden md:flex flex-col shrink-0 py-10 px-8"
          style={{
            width: '240px',
            background: '#FFFFFF',
            borderLeft: '1px solid #E5E9F9',
          }}
        >
          {WIZARD_STEPS.map((step, index) => {
            const active = step.id === currentStep;
            const completed = completedSteps.includes(step.id);
            const clickable = canNavigateToStep(step.id);
            const filled = active || completed;
            const isLast = index === WIZARD_STEPS.length - 1;

            return (
              <div key={step.id} className="flex flex-col items-end">
                <div className="flex flex-row-reverse items-center gap-3">
                  <button
                    type="button"
                    onClick={() => clickable && setCurrentStep(step.id)}
                    disabled={!clickable}
                    className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 border-0 transition-colors"
                    style={{
                      background: filled ? '#172554' : '#F1F5F9',
                      color: filled ? '#FFFFFF' : '#9CA3AF',
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
                      color: active ? '#172554' : '#6B7280',
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
                      height: 20,
                      marginLeft: 'auto',
                      marginRight: 19,
                      marginTop: 4,
                      marginBottom: 4,
                      borderRight: `2px dashed ${filled && completedSteps.includes(step.id) ? '#172554' : '#D9DDEC'}`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </aside>

        {/* ── Main Area ── */}
        <div className="flex-1 flex min-w-0 overflow-hidden">
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
              <Settings size={18} style={{ color: '#6B7280', flexShrink: 0 }} />
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
                fontSize: '13px',
                color: '#6B7280',
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
      </div>

      {/* ─── Footer ─── */}
      <footer
        className="flex flex-row items-center justify-between shrink-0 px-6 md:px-10 py-4"
        style={{
          background: '#172554',
          minHeight: '72px',
        }}
      >
        {/* ימין (RTL) – יציאה ושמירה */}
        <button
          type="button"
          onClick={handleExitAndSave}
          className="inline-flex items-center justify-center h-11 px-6 rounded-lg font-semibold cursor-pointer transition-opacity hover:opacity-80"
          style={{
            fontFamily: 'SimplerPro',
            fontSize: '15px',
            color: '#FFFFFF',
            background: 'transparent',
            border: '1.5px solid rgba(255,255,255,0.4)',
          }}
        >
          יציאה ושמירה
        </button>

        {/* שמאל (RTL) – המשך */}
        <button
          type="button"
          onClick={handleContinue}
          className="inline-flex items-center justify-center h-11 px-8 rounded-lg font-semibold border-0 cursor-pointer transition-opacity hover:opacity-90"
          style={{
            fontFamily: 'SimplerPro',
            fontSize: '15px',
            color: '#172554',
            background: '#FFFFFF',
          }}
        >
          המשך
        </button>
      </footer>
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
          fontFamily: 'SimplerPro',
          fontWeight: 700,
          fontSize: '22px',
          color: '#172554',
          lineHeight: 1.3,
          textAlign: 'center',
          marginBottom: 32,
        }}
      >
        פרטי הלווה
      </h2>

      <div className="flex flex-col gap-5 max-w-[720px] mx-auto w-full">
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
      </div>
    </>
  );
}

/* ─── Form Field ─── */
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
            fontFamily: 'SimplerPro',
            fontSize: '14px',
            fontWeight: 400,
            color: '#495157',
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
        className="w-full h-[42px] rounded-md border bg-white text-right px-3"
        style={{
          fontFamily: 'SimplerPro',
          fontSize: '14px',
          color: '#141E44',
          borderColor: '#D9DDEC',
        }}
      />
    </div>
  );
}

/* ─── Select Field ─── */
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
            fontFamily: 'SimplerPro',
            fontSize: '14px',
            fontWeight: 400,
            color: '#495157',
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
          className="w-full h-[42px] rounded-md border bg-white text-right cursor-pointer appearance-none pr-3 pl-9"
          style={{
            fontFamily: 'SimplerPro',
            fontSize: '14px',
            color: value ? '#141E44' : '#9CA3AF',
            borderColor: '#D9DDEC',
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
            color: '#9CA3AF',
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
