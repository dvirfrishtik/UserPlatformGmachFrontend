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
                    icon={<UnitIcon />}
                    label="סטטוס יחידות"
                    value={
                      <span style={{ fontWeight: 700, color: "#141E44" }}>
                        <span dir="ltr" style={{ unicodeBidi: "embed" }}>{child.redeemedUnits}/{child.unitsCount}</span>
                        {" "}יח׳ מומשו
                      </span>
                    }
                  />
                  <DataCell
                    icon={<DepositIcon />}
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
                    icon={<SuitcaseIcon />}
                    label="הלוואות שנלקחו"
                    value={
                      <span style={{ fontWeight: 700, color: "#141E44" }}>
                        {child.takenLoanAmount > 0 ? `${child.takenLoanAmount.toLocaleString('he-IL')}₪` : "—"}
                      </span>
                    }
                  />
                  <DataCell
                    icon={<BinocularsIcon />}
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

function DataCell({ icon, label, value }: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5 py-1">
      <div className="shrink-0" style={{ marginTop: "2px", opacity: 0.45 }}>{icon}</div>
      <div className="flex flex-col gap-1 min-w-0">
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

/* ═══════════════════════════════════════════════════════ */
/* ─── Data Icons (from provided SVGs) ─── */
/* ═══════════════════════════════════════════════════════ */

function UnitIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M11.8869 11.9764C12.1504 11.1725 12.2821 10.7706 12.5512 10.4942C12.679 10.3628 12.8275 10.254 12.9904 10.1722C13.3334 10 13.7501 10 14.5834 10C15.4166 10 15.8333 10 16.1762 10.1722C16.3392 10.254 16.4876 10.3628 16.6155 10.4942C16.8846 10.7706 17.0164 11.1725 17.2799 11.9764L17.5519 12.8063C17.8799 13.8073 18.044 14.3078 17.7988 14.6539C17.5534 15 17.0347 15 15.997 15H13.1697C12.132 15 11.6132 15 11.3679 14.6539C11.1226 14.3078 11.2867 13.8073 11.6149 12.8063L11.8869 11.9764Z" stroke="#272B38"/>
      <path d="M7.30286 5.30991C7.56636 4.50604 7.69811 4.10409 7.96721 3.82765C8.09506 3.6963 8.24351 3.5875 8.40643 3.50569C8.74943 3.3335 9.1661 3.3335 9.99935 3.3335C10.8326 3.3335 11.2493 3.3335 11.5923 3.50569C11.7552 3.5875 11.9036 3.6963 12.0315 3.82765C12.3006 4.10409 12.4324 4.50604 12.6959 5.30991L12.9679 6.13975C13.296 7.14083 13.46 7.64133 13.2148 7.98741C12.9695 8.3335 12.4507 8.3335 11.413 8.3335H8.58568C7.54803 8.3335 7.02923 8.3335 6.78393 7.98741C6.53865 7.64133 6.70272 7.14083 7.03084 6.13975L7.30286 5.30991Z" stroke="#272B38"/>
      <path d="M2.72082 11.9764C2.98432 11.1725 3.11607 10.7706 3.38518 10.4942C3.51303 10.3628 3.66147 10.254 3.82443 10.1722C4.16742 10 4.58405 10 5.41731 10C6.25058 10 6.66721 10 7.0102 10.1722C7.17316 10.254 7.32161 10.3628 7.44946 10.4942C7.71856 10.7706 7.8503 11.1725 8.1138 11.9764L8.38583 12.8063C8.71391 13.8073 8.878 14.3078 8.63275 14.6539C8.38741 15 7.86863 15 6.83101 15H4.00362C2.966 15 2.44719 15 2.20191 14.6539C1.95662 14.3078 2.12068 13.8073 2.4488 12.8063L2.72082 11.9764Z" stroke="#272B38"/>
    </svg>
  );
}

function DepositIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M16.5835 10.85C17.2558 9.88628 17.65 8.71413 17.65 7.45001C17.65 4.16391 14.9861 1.5 11.7 1.5C8.4139 1.5 5.75 4.1639 5.75 7.45001C5.75 8.36257 5.95544 9.2271 6.32259 10" stroke="#272B38" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.7 4.89981C10.7611 4.89981 10 5.47064 10 6.17481C10 6.87897 10.7611 7.44981 11.7 7.44981C12.6389 7.44981 13.4 8.02064 13.4 8.72481C13.4 9.42895 12.6389 9.99981 11.7 9.99981M11.7 4.89981C12.4402 4.89981 13.0699 5.2546 13.3033 5.74981M11.7 4.89981V4.0498M11.7 9.99981C10.9598 9.99981 10.3301 9.64502 10.0967 9.14981M11.7 9.99981V10.8498" stroke="#272B38" strokeLinecap="round"/>
      <path d="M2.34961 11.7002H4.38521C4.63524 11.7002 4.88183 11.7566 5.10546 11.8648L6.84114 12.7046C7.06477 12.8128 7.31136 12.869 7.56139 12.869H8.4476C9.30474 12.869 9.99962 13.5415 9.99962 14.3709C9.99962 14.4044 9.97667 14.4339 9.94335 14.4431L7.78355 15.0403C7.39612 15.1474 6.98126 15.1101 6.62086 14.9356L4.76541 14.038M9.99962 13.8252L13.9035 12.6258C14.5956 12.4101 15.3437 12.6658 15.7772 13.2662C16.0906 13.7002 15.963 14.3218 15.5063 14.5853L9.11808 18.2711C8.71178 18.5056 8.23241 18.5628 7.7855 18.4302L2.34961 16.8171" stroke="#272B38" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SuitcaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M1.83594 11.6331C1.83594 8.76993 1.83594 7.3383 2.57729 6.37475C2.713 6.19835 2.86464 6.03661 3.03001 5.89184C3.93334 5.10107 5.27545 5.10107 7.95967 5.10107H12.0422C14.7264 5.10107 16.0685 5.10107 16.9719 5.89184C17.1372 6.03661 17.2888 6.19835 17.4245 6.37475C18.1659 7.3383 18.1659 8.76993 18.1659 11.6331C18.1659 14.4962 18.1659 15.9278 17.4245 16.8914C17.2888 17.0678 17.1372 17.2295 16.9719 17.3743C16.0685 18.165 14.7264 18.165 12.0422 18.165H7.95967C5.27545 18.165 3.93334 18.165 3.03001 17.3743C2.86464 17.2295 2.713 17.0678 2.57729 16.8914C1.83594 15.9278 1.83594 14.4962 1.83594 11.6331Z" stroke="#272B38"/>
      <path d="M13.2664 5.10095C13.2664 3.56135 13.2664 2.79155 12.7881 2.31326C12.3098 1.83496 11.54 1.83496 10.0004 1.83496C8.46078 1.83496 7.69096 1.83496 7.21267 2.31326C6.73437 2.79155 6.73438 3.56135 6.73438 5.10095" stroke="#272B38" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.0002 9.18369C9.09828 9.18369 8.36719 9.73205 8.36719 10.4084C8.36719 11.0848 9.09828 11.6332 10.0002 11.6332C10.9021 11.6332 11.6332 12.1815 11.6332 12.8579C11.6332 13.5343 10.9021 14.0827 10.0002 14.0827M10.0002 9.18369C10.7112 9.18369 11.3161 9.52449 11.5403 10.0002M10.0002 9.18369V8.36719M10.0002 14.0827C9.28918 14.0827 8.68432 13.7419 8.46011 13.2662M10.0002 14.0827V14.8992" stroke="#272B38" strokeLinecap="round"/>
      <path d="M5.10193 10H1.83594" stroke="#272B38" strokeLinecap="round"/>
      <path d="M18.1644 10H14.8984" stroke="#272B38" strokeLinecap="round"/>
    </svg>
  );
}

function BinocularsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M18.2132 12.9168L15.7755 4.67238C15.5411 3.87897 14.8045 3.3335 13.9674 3.3335C12.8965 3.3335 12.0411 4.21401 12.0857 5.27047L12.5007 13.3335M18.334 13.7502C18.334 15.361 17.0282 16.6668 15.4173 16.6668C13.8065 16.6668 12.5007 15.361 12.5007 13.7502C12.5007 12.1393 13.8065 10.8335 15.4173 10.8335C17.0282 10.8335 18.334 12.1393 18.334 13.7502Z" stroke="#272B38" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.33333 6.6665H11.6667M7.5 13.3332H12.5" stroke="#272B38" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.7868 12.9168L4.22491 4.67238C4.45928 3.87897 5.1959 3.3335 6.03297 3.3335C7.10389 3.3335 7.9593 4.21401 7.91472 5.27047L7.49972 13.3335M7.49935 13.7502C7.49935 15.361 6.19352 16.6668 4.58268 16.6668C2.97185 16.6668 1.66602 15.361 1.66602 13.7502C1.66602 12.1393 2.97185 10.8335 4.58268 10.8335C6.19352 10.8335 7.49935 12.1393 7.49935 13.7502Z" stroke="#272B38" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
