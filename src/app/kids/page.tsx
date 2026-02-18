'use client';

import { useState, useRef, useEffect } from "react";
import { Plus, ChevronDown, ShoppingCart, FileText, Eye, Pencil, Clock } from "lucide-react";
import { PurchaseUnitsWizard } from "@/components/PurchaseUnitsWizard";

/* ─── Types ─── */
interface ChildData {
  id: string;
  name: string;
  gender: "male" | "female";
  birthDate: string;
  idNumber: string;
  unitsCount: number;
  redeemedUnits: number;
  totalDonation: number;
  paidDonation: number;
  futureEligibility: number;
  takenLoanAmount: number;
}

/* ─── Constants ─── */
const UNIT_VALUE = 4000;

/* ─── Raw units data (same source as donation units page) ─── */
const rawUnits = [
  { id: "1", childId: "child6", childName: "מיכל שולמית", paidPayments: "78/120" },
  { id: "2", childId: "child6", childName: "מיכל שולמית", paidPayments: "60/120" },
  { id: "3", childId: "child6", childName: "מיכל שולמית", paidPayments: "95/120" },
  { id: "4", childId: "child6", childName: "מיכל שולמית", paidPayments: "30/120" },
  { id: "5", childId: "child1", childName: "שמחה", paidPayments: "45/120" },
  { id: "6", childId: "child1", childName: "שמחה", paidPayments: "50/120" },
  { id: "7", childId: "child1", childName: "שמחה", paidPayments: "52/120" },
  { id: "8", childId: "child1", childName: "שמחה", paidPayments: "48/120" },
  { id: "9", childId: "child2", childName: "דוד משה", paidPayments: "120/120" },
  { id: "10", childId: "child2", childName: "דוד משה", paidPayments: "120/120" },
  { id: "11", childId: "child2", childName: "דוד משה", paidPayments: "120/120" },
  { id: "12", childId: "child2", childName: "דוד משה", paidPayments: "120/120" },
  { id: "13", childId: "child3", childName: "יוני שמעון", paidPayments: "120/120" },
  { id: "14", childId: "child3", childName: "יוני שמעון", paidPayments: "120/120" },
  { id: "15", childId: "child3", childName: "יוני שמעון", paidPayments: "120/120" },
  { id: "16", childId: "child4", childName: "חיים יעקב", paidPayments: "120/120" },
  { id: "17", childId: "child4", childName: "חיים יעקב", paidPayments: "120/120" },
  { id: "18", childId: "child5", childName: "יניב אהרון", paidPayments: "80/120" },
  { id: "19", childId: "child5", childName: "יניב אהרון", paidPayments: "90/120" },
  { id: "20", childId: "child5", childName: "יניב אהרון", paidPayments: "105/120" },
  { id: "21", childId: "child5", childName: "יניב אהרון", paidPayments: "35/120" },
  { id: "22", childId: "child5", childName: "יניב אהרון", paidPayments: "68/120" },
  { id: "23", childId: "child5", childName: "יניב אהרון", paidPayments: "75/120" },
  { id: "24", childId: "child5", childName: "יניב אהרון", paidPayments: "80/120" },
  { id: "25", childId: "child5", childName: "יניב אהרון", paidPayments: "65/120" },
  { id: "26", childId: "child7", childName: "אברהם צבי", paidPayments: "0/120" },
  { id: "27", childId: "child7", childName: "אברהם צבי", paidPayments: "0/120" },
  { id: "28", childId: "child7", childName: "אברהם צבי", paidPayments: "0/120" },
  { id: "29", childId: "child7", childName: "אברהם צבי", paidPayments: "0/120" },
  { id: "30", childId: "child8", childName: "שמעון אהרון", paidPayments: "120/120" },
];

/* ─── Compute child-level aggregated data ─── */
const computePaidFromRatio = (paidPayments: string): number => {
  const [paid, total] = paidPayments.split('/').map(Number);
  return Math.round((paid / total) * UNIT_VALUE);
};

const childAggregated: Record<string, { paidAmount: number; unitsCount: number; redeemedUnits: number }> = {};
rawUnits.forEach(unit => {
  if (!childAggregated[unit.childId]) {
    childAggregated[unit.childId] = { paidAmount: 0, unitsCount: 0, redeemedUnits: 0 };
  }
  childAggregated[unit.childId].paidAmount += computePaidFromRatio(unit.paidPayments);
  childAggregated[unit.childId].unitsCount += 1;
  if (unit.paidPayments === "120/120") {
    childAggregated[unit.childId].redeemedUnits += 1;
  }
});

/* ─── Child metadata ─── */
const childMeta: Record<string, { name: string; gender: "male" | "female"; birthDate: string; idNumber: string; futureEligibility: number; takenLoanAmount: number }> = {
  child1: { name: "שמחה", gender: "female", birthDate: "16.01.1998", idNumber: "573848543", futureEligibility: 40000, takenLoanAmount: 0 },
  child2: { name: "דוד משה", gender: "male", birthDate: "16.01.1998", idNumber: "573848543", futureEligibility: 0, takenLoanAmount: 240000 },
  child3: { name: "יוני שמעון", gender: "male", birthDate: "16.01.1998", idNumber: "573848543", futureEligibility: 0, takenLoanAmount: 240000 },
  child4: { name: "חיים יעקב", gender: "male", birthDate: "16.01.1998", idNumber: "573848543", futureEligibility: 0, takenLoanAmount: 240000 },
  child5: { name: "יניב אהרון", gender: "male", birthDate: "16.01.1998", idNumber: "573848543", futureEligibility: 140000, takenLoanAmount: 80000 },
  child6: { name: "מיכל שולמית", gender: "female", birthDate: "16.01.1998", idNumber: "573848543", futureEligibility: 120000, takenLoanAmount: 240000 },
  child7: { name: "אברהם צבי", gender: "male", birthDate: "16.01.1998", idNumber: "573848543", futureEligibility: 0, takenLoanAmount: 0 },
  child8: { name: "שמעון אהרון", gender: "male", birthDate: "16.01.1998", idNumber: "573848543", futureEligibility: 0, takenLoanAmount: 240000 },
};

/* ─── Build children data ─── */
const childrenData: ChildData[] = Object.entries(childMeta).map(([id, meta]) => {
  const agg = childAggregated[id] || { paidAmount: 0, unitsCount: 0, redeemedUnits: 0 };
  return {
    id,
    name: meta.name,
    gender: meta.gender,
    birthDate: meta.birthDate,
    idNumber: meta.idNumber,
    unitsCount: agg.unitsCount,
    redeemedUnits: agg.redeemedUnits,
    totalDonation: agg.unitsCount * UNIT_VALUE,
    paidDonation: agg.paidAmount,
    futureEligibility: meta.futureEligibility,
    takenLoanAmount: meta.takenLoanAmount,
  };
});

/* ═══════════════════════════════════════════════════════ */
/* ─── Page Component ─── */
/* ═══════════════════════════════════════════════════════ */
export default function KidsPage() {
  const [hoveredChildId, setHoveredChildId] = useState<string | null>(null);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [isPurchaseWizardOpen, setIsPurchaseWizardOpen] = useState(false);
  const [purchaseWizardChildId, setPurchaseWizardChildId] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (activeDropdownId) {
        const ref = dropdownRefs.current[activeDropdownId];
        if (ref && !ref.contains(e.target as Node)) {
          setActiveDropdownId(null);
        }
      }
    }
    if (activeDropdownId) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [activeDropdownId]);

  const handleToggleDropdown = (childId: string) => {
    setActiveDropdownId(prev => prev === childId ? null : childId);
  };

  return (
    <div className="w-full min-w-0 overflow-x-hidden" dir="rtl">
      {/* ─── Page Header ─── */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h1 style={{
          fontSize: "clamp(20px, 3vw, 28px)",
          fontWeight: 700,
          color: "#141E44",
          lineHeight: "1.3",
        }}>
          הילדים שלי{" "}
          <span style={{ fontWeight: 400, color: "#929CB0" }}>
            ({childrenData.length})
          </span>
        </h1>

        <button
          className="flex items-center gap-2 transition-all"
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#FFFFFF",
            backgroundColor: "#172554",
            border: "none",
            cursor: "pointer",
            height: "42px",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0F1A3E"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#172554"; }}
        >
          <Plus size={16} strokeWidth={2.5} />
          הוספת ילד
        </button>
      </div>

      {/* ─── White Block Wrapper ─── */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0px 0px 24px 0px rgba(14, 78, 134, 0.09)",
        padding: "clamp(12px, 2vw, 24px)",
      }}>
        {/* ─── Children Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
          {childrenData.map((child) => {
          const isHovered = hoveredChildId === child.id;
          const isDropdownOpen = activeDropdownId === child.id;

          return (
            <div
              key={child.id}
              className="relative"
              ref={(el) => { dropdownRefs.current[child.id] = el; }}
              onMouseEnter={() => setHoveredChildId(child.id)}
              onMouseLeave={() => {
                setHoveredChildId(null);
                if (!isDropdownOpen) setActiveDropdownId(null);
              }}
            >
              {/* ─── Card ─── */}
              <div
                className="transition-all"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  border: isHovered || isDropdownOpen ? "1px solid #D9DDEC" : "1px solid #EBEEF9",
                  boxShadow: "none",
                  position: "relative",
                  overflow: "visible",
                }}
              >
                {/* ─── Card Header ─── */}
                <div style={{
                  padding: "20px 20px 16px",
                  backgroundColor: "#F1F4F9",
                  borderRadius: "12px 12px 0 0",
                }}>
                  <div className="flex items-center gap-3">
                    {/* Child avatar */}
                    <div className="shrink-0">
                      <AvatarIcon size={40} />
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <h3 style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#141E44",
                        lineHeight: "100%",
                      }}>
                        {child.name}
                      </h3>
                      <p style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#929CB0",
                        lineHeight: "16px",
                      }}>
                        {child.birthDate}
                        <span style={{ margin: "0 5px", opacity: 0.35 }}>|</span>
                        {child.idNumber}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ─── Full-width divider ─── */}
                <div style={{ height: "1px", backgroundColor: "#EBEEF9" }} />

                {/* ─── Row 1: Units Status + Donation Status ─── */}
                <div className="grid grid-cols-1 min-[400px]:grid-cols-2" style={{ padding: "16px 20px" }}>
                  <DataCell
                    label="סטטוס יחידות"
                    value={
                      <span style={{ fontWeight: 700, color: "#141E44" }}>
                        <span dir="ltr" style={{ unicodeBidi: "embed" }}>{child.redeemedUnits}/{child.unitsCount}</span>
                        {" "}יח׳ מומשו
                      </span>
                    }
                  />
                  <DataCell
                    label="סטטוס תרומה"
                    value={
                      <span style={{ color: "#495157", fontWeight: 400 }}>
                        <span style={{ fontWeight: 700, color: "#141E44" }}>{child.paidDonation.toLocaleString('he-IL')}₪</span>
                        {" "}מתוך{" "}
                        <span style={{ fontWeight: 700, color: "#141E44" }}>{child.totalDonation.toLocaleString('he-IL')}₪</span>
                      </span>
                    }
                  />
                </div>

                {/* ─── Content-width divider between units and loans ─── */}
                <div style={{ height: "1px", backgroundColor: "#EBEEF9", margin: "0 20px" }} />

                {/* ─── Row 2: Loans Taken + Future Eligibility ─── */}
                <div className="grid grid-cols-1 min-[400px]:grid-cols-2" style={{ padding: "16px 20px" }}>
                  <DataCell
                    label="הלוואות שנלקחו"
                    value={
                      <span style={{ fontWeight: 700, color: "#141E44" }}>
                        {child.takenLoanAmount > 0 ? `${child.takenLoanAmount.toLocaleString('he-IL')}₪` : "—"}
                      </span>
                    }
                  />
                  <DataCell
                    label="זכאות עתידית"
                    value={
                      <span style={{ fontWeight: 700, color: "#141E44" }}>
                        {child.futureEligibility > 0 ? `${child.futureEligibility.toLocaleString('he-IL')}₪` : "—"}
                      </span>
                    }
                  />
                </div>

                {/* ─── Hover Action Button ─── */}
                <div
                  className="transition-all"
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    opacity: isHovered || isDropdownOpen ? 1 : 0,
                    transform: isHovered || isDropdownOpen ? "translateY(0)" : "translateY(-4px)",
                    pointerEvents: isHovered || isDropdownOpen ? "auto" : "none",
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                    zIndex: 10,
                  }}
                >
                  <button
                    onClick={() => handleToggleDropdown(child.id)}
                    className="flex items-center gap-1.5 transition-colors"
                    style={{
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      backgroundColor: "#172554",
                      border: "1px solid #172554",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span>פעולות ומידע</span>
                    <ChevronDown
                      size={14}
                      style={{
                        transition: "transform 0.2s ease",
                        transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                </div>
              </div>

              {/* ─── Actions Dropdown ─── */}
              {isDropdownOpen && (
                <div
                  className="absolute top-[52px] left-4 bg-popover rounded-[var(--radius-lg)] shadow-[var(--elevation-sm)] border border-border w-[240px] overflow-hidden z-50"
                  dir="rtl"
                >
                  <div className="py-2">
                    {[
                      { icon: <ShoppingCart size={16} />, label: "רכישת יחידות", action: "purchase" },
                      { icon: <FileText size={16} />, label: 'הפקת דו"ח יחידות', action: "report" },
                      { icon: <Clock size={16} />, label: "לצפייה בהיסטוריית תנועות", action: "history" },
                      { icon: <Eye size={16} />, label: "בקשת הרשאת צפייה", action: "view" },
                      { icon: <Pencil size={16} />, label: "עריכת פרטי ילד/ה", action: "edit" },
                    ].map((item, index, arr) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (item.action === "purchase") {
                            setPurchaseWizardChildId(child.id);
                            setIsPurchaseWizardOpen(true);
                          }
                          setActiveDropdownId(null);
                        }}
                        className={`w-full px-4 py-3 text-right hover:bg-muted/30 transition-colors flex items-center gap-2.5 border-b border-border last:border-b-0`}
                        style={{
                          fontSize: "var(--text-sm)",
                          color: "var(--popover-foreground)",
                          fontWeight: "var(--font-weight-normal)",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ color: "var(--muted-foreground)", flexShrink: 0, display: "flex" }}>{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
          })}
        </div>
      </div>

      {/* ─── Purchase Units Wizard ─── */}
      <PurchaseUnitsWizard
        isOpen={isPurchaseWizardOpen}
        onClose={() => { setIsPurchaseWizardOpen(false); setPurchaseWizardChildId(null); }}
        children={childrenData.map(c => ({ id: c.id, name: c.name, unitsCount: c.unitsCount, gender: c.gender }))}
        initialSelectedChildId={purchaseWizardChildId}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* ─── Sub-components ─── */
/* ═══════════════════════════════════════════════════════ */

function DataCell({ label, value }: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 py-1 min-w-0">
      <p style={{
        fontSize: "13px",
        fontWeight: 400,
        color: "#929CB0",
        lineHeight: "18px",
      }}>
        {label}
      </p>
      <p style={{
        fontSize: "14px",
        fontWeight: 700,
        color: "#141E44",
        lineHeight: "20px",
      }}>
        {value}
      </p>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════ */
/* ─── Avatar Icon ─── */
/* ═══════════════════════════════════════════════════════ */

function AvatarIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#EDD097"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.5008 14C15.5008 11.5147 17.5155 9.5 20.0008 9.5C22.4861 9.5 24.5008 11.5147 24.5008 14C24.5008 16.4853 22.4861 18.5 20.0008 18.5C17.5155 18.5 15.5008 16.4853 15.5008 14Z" fill="#172554"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.7521 28.1053C11.8294 23.6156 15.4928 20 20.0008 20C24.5089 20 28.1724 23.6157 28.2496 28.1056C28.2547 28.4034 28.0832 28.676 27.8125 28.8002C25.4335 29.8918 22.7873 30.5 20.0011 30.5C17.2147 30.5 14.5683 29.8917 12.1891 28.7999C11.9185 28.6757 11.7469 28.4031 11.7521 28.1053Z" fill="#172554"/>
    </svg>
  );
}

