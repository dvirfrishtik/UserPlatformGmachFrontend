'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface AddChildFormData {
  name: string;
  idNumber: string;
  idSupplement: string;
  gender: 'male' | 'female';
  birthDate: string;
}

interface AddChildPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchaseUnits: () => void;
}

const emptyForm: AddChildFormData = {
  name: '',
  idNumber: '',
  idSupplement: '',
  gender: 'male',
  birthDate: '',
};

export function AddChildPopup({ isOpen, onClose, onPurchaseUnits }: AddChildPopupProps) {
  const [form, setForm] = useState<AddChildFormData>(emptyForm);
  const [supplementFile, setSupplementFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [addedName, setAddedName] = useState('');
  const [addedGender, setAddedGender] = useState<'male' | 'female'>('male');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setForm(emptyForm);
      setSupplementFile(null);
      setShowSuccess(false);
      setAddedName('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setAddedName(form.name.trim());
    setAddedGender(form.gender);
    setShowSuccess(true);
  };

  const handleClose = () => {
    setForm(emptyForm);
    setShowSuccess(false);
    onClose();
  };

  const handlePurchaseUnits = () => {
    setForm(emptyForm);
    setShowSuccess(false);
    onClose();
    onPurchaseUnits();
  };

  const canSubmit = form.name.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 2, 4, 0.45)', backdropFilter: 'blur(6px)' }}
      onClick={handleClose}
    >
      <div
        className="relative flex flex-col"
        style={{
          width: 'min(1100px, 92vw)',
          height: 'min(900px, 90vh)',
          background: 'linear-gradient(180deg, #F7F8FA 0%, #F7F8FA 100%)',
          borderRadius: '12px',
          border: '1px solid #E5E9F9',
          boxShadow: '0 0 12px rgba(24, 47, 67, 0.08), 0 32px 64px -16px rgba(23, 37, 84, 0.18)',
          overflow: 'hidden',
        }}
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header – same as PurchaseUnitsWizard */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{
            padding: '20px 32px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ width: '36px' }} />
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              lineHeight: '1.3',
              textAlign: 'center',
            }}
          >
            הוספת ילד/ה
          </h2>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:bg-[rgba(0,0,0,0.04)]"
            style={{ border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
            aria-label="סגור"
          >
            <X size={20} style={{ color: 'var(--muted-foreground)' }} />
          </button>
        </div>

        {showSuccess ? (
          <AddChildSuccessScreen
            childName={addedName}
            gender={addedGender}
            onClose={handleClose}
            onPurchaseUnits={handlePurchaseUnits}
          />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto" style={{ padding: '32px 40px' }}>
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--foreground)',
                  fontWeight: 'var(--font-weight-normal)',
                  textAlign: 'right',
                  marginBottom: '24px',
                  lineHeight: '22px',
                }}
              >
                יש להזין את פרטי הילד/ה
              </p>

              <div className="flex flex-col gap-4">
                <FormField
                  label="שם"
                  required
                  value={form.name}
                  onChange={(v) => setForm((prev) => ({ ...prev, name: v }))}
                  placeholder="הזן שם מלא"
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="מס׳ ת.ז."
                    value={form.idNumber}
                    onChange={(v) => setForm((prev) => ({ ...prev, idNumber: v }))}
                    placeholder="מספר ת.ז."
                  />
                  {/* ספח ת.ז. – העלאת קובץ (עיצוב עדין וקטן) */}
                  <div dir="rtl">
                    <label
                      style={{
                        display: 'block',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-normal)',
                        color: 'var(--muted-foreground)',
                        marginBottom: '8px',
                        textAlign: 'right',
                      }}
                    >
                      ספח ת.ז.
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) setSupplementFile(f);
                        e.target.value = '';
                      }}
                    />
                    <div className="flex flex-col gap-1.5">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center justify-center gap-1.5 transition-colors w-fit rounded-md border border-[var(--border)] bg-[var(--muted)]/30 text-muted-foreground hover:bg-[var(--muted)]/50 hover:text-foreground"
                        style={{
                          padding: '0 12px',
                          fontSize: '13px',
                          fontWeight: 'var(--font-weight-normal)',
                          cursor: 'pointer',
                          height: '32px',
                          minHeight: '32px',
                        }}
                      >
                        <Upload size={14} />
                        העלאת קובץ
                      </button>
                      {supplementFile && (
                        <p className="text-right text-xs text-muted-foreground truncate" title={supplementFile.name}>
                          {supplementFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* שורה אחת: תאריך לידה + מין (הסדר: תאריך ואז מין) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full" dir="rtl">
                  {/* תאריך לידה – יישור ימינה, תאריך ואז אייקון (RTL) */}
                  <FormField
                    label="תאריך לידה"
                    type="date"
                    value={form.birthDate}
                    onChange={(v) => setForm((prev) => ({ ...prev, birthDate: v }))}
                    placeholder=""
                    dir="rtl"
                  />
                  {/* מין */}
                  <div className="w-full">
                    <label
                      style={{
                        display: 'block',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-normal)',
                        color: 'var(--muted-foreground)',
                        marginBottom: '8px',
                        textAlign: 'right',
                      }}
                    >
                      מין
                    </label>
                    <div className="flex gap-4 w-full justify-start" dir="rtl">
                      <label className="flex items-center gap-2 cursor-pointer flex-row-reverse">
                        <input
                          type="radio"
                          name="gender"
                          checked={form.gender === 'male'}
                          onChange={() => setForm((prev) => ({ ...prev, gender: 'male' }))}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>זכר</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer flex-row-reverse">
                        <input
                          type="radio"
                          name="gender"
                          checked={form.gender === 'female'}
                          onChange={() => setForm((prev) => ({ ...prev, gender: 'female' }))}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>נקבה</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer – כפתור הוסף ילד/ה לאורך כל הרוחב */}
            <div
              className="shrink-0 w-full"
              style={{ padding: '20px 40px 30px 40px' }}
            >
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full inline-flex items-center justify-center transition-all"
                style={{
                  height: '48px',
                  padding: '0 24px',
                  borderRadius: 'var(--radius-button)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: canSubmit ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                  backgroundColor: canSubmit ? 'var(--primary)' : 'var(--muted)',
                  border: 'none',
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  opacity: canSubmit ? 1 : 0.6,
                }}
                onMouseEnter={(e) => {
                  if (canSubmit) e.currentTarget.style.backgroundColor = '#0F1A3E';
                }}
                onMouseLeave={(e) => {
                  if (canSubmit) e.currentTarget.style.backgroundColor = 'var(--primary)';
                }}
              >
                הוסף ילד/ה
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: 'text' | 'date';
  required?: boolean;
  dir?: 'rtl' | 'ltr';
}) {
  return (
    <div dir={dir}>
      <label
        style={{
          display: 'block',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-normal)',
          color: 'var(--muted-foreground)',
          marginBottom: '8px',
          textAlign: 'right',
        }}
      >
        {label}
        {required && <span style={{ color: 'var(--muted-foreground)', marginRight: '2px' }}>*</span>}
      </label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-full text-right rounded-[6px] px-3.5 py-2 border-border bg-input-background text-foreground"
        dir={dir}
        style={dir === 'rtl' ? { direction: 'rtl', textAlign: 'right' } : undefined}
      />
    </div>
  );
}

/* ─── Animated Checkmark (same as PurchaseUnitsWizard success) ─── */
function AnimatedCheckmark() {
  return (
    <div style={{ width: '120px', height: '120px', position: 'relative' }}>
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
        .add-child-check-circle {
          stroke-dasharray: 314;
          stroke-dashoffset: 314;
          animation: circle-draw 0.6s ease-out 0.2s forwards, circle-fill 0.4s ease-out 0.7s forwards;
        }
        .add-child-check-mark {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: check-draw 0.4s ease-out 0.7s forwards;
        }
        .add-child-check-container {
          animation: scale-bounce 0.5s ease-out 0.1s both;
        }
        .add-child-confetti-dot { opacity: 0; }
        .add-child-confetti-1 { animation: confetti-fall-1 1s ease-out 1s forwards; }
        .add-child-confetti-2 { animation: confetti-fall-2 1.1s ease-out 1.05s forwards; }
        .add-child-confetti-3 { animation: confetti-fall-3 0.9s ease-out 1.1s forwards; }
        .add-child-confetti-4 { animation: confetti-fall-4 1.2s ease-out 1.02s forwards; }
        .add-child-confetti-5 { animation: confetti-fall-5 1s ease-out 1.08s forwards; }
        .add-child-confetti-6 { animation: confetti-fall-6 1.1s ease-out 1.15s forwards; }
      `}</style>
      <svg width="120" height="120" viewBox="0 0 120 120" className="add-child-check-container">
        <circle className="add-child-check-circle" cx="60" cy="60" r="50" stroke="#3B82F6" strokeWidth="4" fill="transparent" />
        <path className="add-child-check-mark" d="M38 62 L52 76 L82 46" fill="none" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle className="add-child-confetti-dot add-child-confetti-1" cx="30" cy="20" r="3" fill="#3B82F6" />
        <rect className="add-child-confetti-dot add-child-confetti-2" x="85" y="15" width="6" height="6" rx="1" fill="#CCA559" />
        <circle className="add-child-confetti-dot add-child-confetti-3" cx="15" cy="55" r="2.5" fill="#172554" />
        <rect className="add-child-confetti-dot add-child-confetti-4" x="97" y="50" width="5" height="5" rx="1" fill="#3B82F6" />
        <circle className="add-child-confetti-dot add-child-confetti-5" cx="25" cy="90" r="3" fill="#CCA559" />
        <rect className="add-child-confetti-dot add-child-confetti-6" x="90" y="85" width="6" height="6" rx="1" fill="#172554" />
      </svg>
    </div>
  );
}

/* Success screen – same animation as PurchaseUnitsWizard SuccessScreen */
function AddChildSuccessScreen({
  childName,
  gender,
  onClose,
  onPurchaseUnits,
}: {
  childName: string;
  gender: 'male' | 'female';
  onClose: () => void;
  onPurchaseUnits: () => void;
}) {
  const isMale = gender === 'male';
  const successTitle = isMale ? `${childName} נוסף בהצלחה` : `${childName} נוספה בהצלחה`;
  const successDesc = isMale
    ? 'הילד נוסף לחשבונך ותוכל לצפות בו בעמוד הילדים שלי.'
    : 'הילדה נוספה לחשבונך ותוכלי לצפות בה בעמוד הילדים שלי.';

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center"
      style={{ padding: '40px' }}
    >
      <div style={{ width: '160px', height: '160px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatedCheckmark />
      </div>

      <p
        style={{
          fontSize: '22px',
          fontWeight: 'var(--font-weight-bold)',
          color: '#141E44',
          lineHeight: '30px',
          textAlign: 'center',
          marginTop: '32px',
          marginBottom: '8px',
        }}
      >
        {successTitle}
      </p>
      <p
        style={{
          fontSize: '16px',
          color: '#495157',
          lineHeight: '24px',
          textAlign: 'center',
          marginBottom: '32px',
        }}
      >
        {successDesc}
      </p>

      <div className="flex gap-3" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={onPurchaseUnits}
          className="inline-flex items-center justify-center transition-all"
          style={{
            height: '48px',
            padding: '0 24px',
            borderRadius: 'var(--radius-button)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--primary-foreground)',
            backgroundColor: 'var(--primary)',
            border: 'none',
            cursor: 'pointer',
            minWidth: '160px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0F1A3E';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary)';
          }}
        >
          רכישת יחידות תרומה
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center transition-all"
          style={{
            height: '48px',
            padding: '0 24px',
            borderRadius: 'var(--radius-button)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)',
            backgroundColor: 'transparent',
            border: '1.5px solid var(--foreground)',
            cursor: 'pointer',
            minWidth: '160px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          סגירת חלון
        </button>
      </div>
    </div>
  );
}
