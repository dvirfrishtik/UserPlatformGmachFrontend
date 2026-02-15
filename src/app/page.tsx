'use client';

import { useState, useRef, useEffect } from "react";
import { ActionsDropdown } from "@/components/ActionsDropdown";
import { PurchaseUnitsWizard } from "@/components/PurchaseUnitsWizard";
import { ChevronDown, Info, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

// Types
interface Unit {
  id: string;
  childId: string;
  childName: string;
  joinDate: string;
  designatedYear: string;
  track: string;
  paymentMethod: string;
  monthlyAmount: string;
  paidPayments: string;
  remainingDonation: string;
  paidAmount: number;
  totalAmount: number;
}

interface UnitGroup {
  groupKey: string;
  units: Unit[];
  sharedData: {
    childName: string;
    joinDate: string;
    designatedYear: string;
    track: string;
    paymentMethod: string;
  };
}

export default function DonationUnitsPage() {
  const [activeTab, setActiveTab] = useState<"table" | "timeline">("table");
  const [selectedChild, setSelectedChild] = useState<string>("all");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);
  const [isPurchaseWizardOpen, setIsPurchaseWizardOpen] = useState(false);
  const actionsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (actionsDropdownRef.current && !actionsDropdownRef.current.contains(event.target as Node)) {
        setIsActionsDropdownOpen(false);
      }
    }
    if (isActionsDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isActionsDropdownOpen]);

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupKey)) newSet.delete(groupKey);
      else newSet.add(groupKey);
      return newSet;
    });
  };

  // All units data
  const allUnits: Unit[] = [
    { id: "1", childId: "child6", childName: "מיכל שולמית", joinDate: "27.08.2021", designatedYear: "2026", track: "קלאסי", paymentMethod: "ויזה 1316", monthlyAmount: "80 ₪", paidPayments: "78/120", remainingDonation: "שולם 3,120 ₪ מתוך 4,500 ₪", paidAmount: 3120, totalAmount: 4500 },
    { id: "2", childId: "child6", childName: "מיכל שולמית", joinDate: "15.03.2020", designatedYear: "2025", track: "פרעון מורחב", paymentMethod: "מסטרכארד 4422", monthlyAmount: "100 ₪", paidPayments: "60/120", remainingDonation: "שולם 6,000 ₪ מתוך 12,000 ₪", paidAmount: 6000, totalAmount: 12000 },
    { id: "3", childId: "child6", childName: "מיכל שולמית", joinDate: "12.11.2019", designatedYear: "2024", track: "קלאסי", paymentMethod: "ויזה 1316", monthlyAmount: "150 ₪", paidPayments: "95/120", remainingDonation: "שולם 14,250 ₪ מתוך 18,000 ₪", paidAmount: 14250, totalAmount: 18000 },
    { id: "4", childId: "child6", childName: "מיכל שולמית", joinDate: "08.07.2022", designatedYear: "2027", track: "פרעון מורחב", paymentMethod: "אמריקן אקספרס 9876", monthlyAmount: "90 ₪", paidPayments: "30/120", remainingDonation: "שולם 2,700 ₪ מתוך 10,800 ₪", paidAmount: 2700, totalAmount: 10800 },
    { id: "5", childId: "child1", childName: "שמחה", joinDate: "10.01.2022", designatedYear: "2027", track: "קלאסי", paymentMethod: "אמריקן אקספרס 9876", monthlyAmount: "120 ₪", paidPayments: "45/120", remainingDonation: "שולם 5,400 ₪ מתוך 14,400 ₪", paidAmount: 5400, totalAmount: 14400 },
    { id: "6", childId: "child1", childName: "שמחה", joinDate: "05.04.2021", designatedYear: "2026", track: "קלאסי", paymentMethod: "ויזה 2244", monthlyAmount: "85 ₪", paidPayments: "50/120", remainingDonation: "שולם 4,250 ₪ מתוך 10,200 ₪", paidAmount: 4250, totalAmount: 10200 },
    { id: "7", childId: "child1", childName: "שמחה", joinDate: "05.04.2021", designatedYear: "2026", track: "קלאסי", paymentMethod: "ויזה 2244", monthlyAmount: "90 ₪", paidPayments: "52/120", remainingDonation: "שולם 4,680 ₪ מתוך 10,800 ₪", paidAmount: 4680, totalAmount: 10800 },
    { id: "8", childId: "child1", childName: "שמחה", joinDate: "05.04.2021", designatedYear: "2026", track: "קלאסי", paymentMethod: "ויזה 2244", monthlyAmount: "95 ₪", paidPayments: "48/120", remainingDonation: "שולם 4,560 ₪ מתוך 11,400 ₪", paidAmount: 4560, totalAmount: 11400 },
    { id: "9", childId: "child2", childName: "דוד משה", joinDate: "14.06.2020", designatedYear: "2025", track: "קלאסי", paymentMethod: "ויזה 2244", monthlyAmount: "100 ₪", paidPayments: "120/120", remainingDonation: "שולם 12,000 ₪ מתוך 12,000 ₪", paidAmount: 12000, totalAmount: 12000 },
    { id: "10", childId: "child2", childName: "דוד משה", joinDate: "03.02.2021", designatedYear: "2026", track: "פרעון מורחב", paymentMethod: "אמריקן אקספרס 9876", monthlyAmount: "125 ₪", paidPayments: "120/120", remainingDonation: "שולם 15,000 ₪ מתוך 15,000 ₪", paidAmount: 15000, totalAmount: 15000 },
    { id: "11", childId: "child2", childName: "דוד משה", joinDate: "29.08.2019", designatedYear: "2024", track: "קלאסי", paymentMethod: "מסטרכארד 4422", monthlyAmount: "80 ₪", paidPayments: "120/120", remainingDonation: "שולם 9,600 ₪ מתוך 9,600 ₪", paidAmount: 9600, totalAmount: 9600 },
    { id: "12", childId: "child2", childName: "דוד משה", joinDate: "11.11.2022", designatedYear: "2027", track: "פרעון מורחב", paymentMethod: "ויזה 1316", monthlyAmount: "90 ₪", paidPayments: "120/120", remainingDonation: "שולם 10,800 ₪ מתוך 10,800 ₪", paidAmount: 10800, totalAmount: 10800 },
    { id: "13", childId: "child3", childName: "יוני שמעון", joinDate: "05.09.2019", designatedYear: "2024", track: "קלאסי", paymentMethod: "ויזה 2244", monthlyAmount: "150 ₪", paidPayments: "120/120", remainingDonation: "שולם 18,000 ₪ מתוך 18,000 ₪", paidAmount: 18000, totalAmount: 18000 },
    { id: "14", childId: "child3", childName: "יוני שמעון", joinDate: "17.03.2020", designatedYear: "2025", track: "פרעון מורחב", paymentMethod: "מסטרכארד 5533", monthlyAmount: "130 ₪", paidPayments: "120/120", remainingDonation: "שולם 15,600 ₪ מתוך 15,600 ₪", paidAmount: 15600, totalAmount: 15600 },
    { id: "15", childId: "child3", childName: "יוני שמעון", joinDate: "23.07.2021", designatedYear: "2026", track: "קלאסי", paymentMethod: "אמריקן אקספרס 9876", monthlyAmount: "140 ₪", paidPayments: "120/120", remainingDonation: "שולם 16,800 ₪ מתוך 16,800 ₪", paidAmount: 16800, totalAmount: 16800 },
    { id: "16", childId: "child4", childName: "חיים יעקב", joinDate: "30.01.2020", designatedYear: "2025", track: "פרעון מורחב", paymentMethod: "ויזה 1316", monthlyAmount: "110 ₪", paidPayments: "120/120", remainingDonation: "שולם 13,200 ₪ מתוך 13,200 ₪", paidAmount: 13200, totalAmount: 13200 },
    { id: "17", childId: "child4", childName: "חיים יעקב", joinDate: "19.10.2021", designatedYear: "2026", track: "קלאסי", paymentMethod: "מסטרכארד 4422", monthlyAmount: "100 ₪", paidPayments: "120/120", remainingDonation: "שולם 12,000 ₪ מתוך 12,000 ₪", paidAmount: 12000, totalAmount: 12000 },
    { id: "18", childId: "child5", childName: "יניב אהרון", joinDate: "20.06.2021", designatedYear: "2026", track: "קלאסי", paymentMethod: "מסטרכארד 5533", monthlyAmount: "200 ₪", paidPayments: "80/120", remainingDonation: "שולם 16,000 ₪ מתוך 24,000 ₪", paidAmount: 16000, totalAmount: 24000 },
    { id: "19", childId: "child5", childName: "יניב אהרון", joinDate: "12.02.2020", designatedYear: "2025", track: "פרעון מורחב", paymentMethod: "ויזה 2244", monthlyAmount: "180 ₪", paidPayments: "90/120", remainingDonation: "שולם 16,200 ₪ מתוך 21,600 ₪", paidAmount: 16200, totalAmount: 21600 },
    { id: "20", childId: "child5", childName: "יניב אהרון", joinDate: "08.08.2019", designatedYear: "2024", track: "קלאסי", paymentMethod: "אמריקן אקספרס 9876", monthlyAmount: "170 ₪", paidPayments: "105/120", remainingDonation: "שולם 17,850 ₪ מתוך 20,400 ₪", paidAmount: 17850, totalAmount: 20400 },
    { id: "21", childId: "child5", childName: "יניב אהרון", joinDate: "25.11.2022", designatedYear: "2027", track: "פרעון מורחב", paymentMethod: "ויזה 1316", monthlyAmount: "160 ₪", paidPayments: "35/120", remainingDonation: "שולם 5,600 ₪ מתוך 19,200 ₪", paidAmount: 5600, totalAmount: 19200 },
    { id: "22", childId: "child5", childName: "יניב אהרון", joinDate: "04.04.2021", designatedYear: "2026", track: "קלאסי", paymentMethod: "מסטרכארד 4422", monthlyAmount: "150 ₪", paidPayments: "68/120", remainingDonation: "שולם 10,200 ₪ מתוך 18,000 ₪", paidAmount: 10200, totalAmount: 18000 },
    { id: "23", childId: "child5", childName: "יניב אהרון", joinDate: "16.09.2020", designatedYear: "2025", track: "פרעון מורחב", paymentMethod: "ויזה 2244", monthlyAmount: "190 ₪", paidPayments: "75/120", remainingDonation: "שולם 14,250 ₪ מתוך 22,800 ₪", paidAmount: 14250, totalAmount: 22800 },
    { id: "24", childId: "child5", childName: "יניב אהרון", joinDate: "16.09.2020", designatedYear: "2025", track: "פרעון מורחב", paymentMethod: "ויזה 2244", monthlyAmount: "200 ₪", paidPayments: "80/120", remainingDonation: "שולם 16,000 ₪ מתוך 24,000 ₪", paidAmount: 16000, totalAmount: 24000 },
    { id: "25", childId: "child5", childName: "יניב אהרון", joinDate: "16.09.2020", designatedYear: "2025", track: "פרעון מורחב", paymentMethod: "ויזה 2244", monthlyAmount: "170 ₪", paidPayments: "65/120", remainingDonation: "שולם 11,050 ₪ מתוך 20,400 ₪", paidAmount: 11050, totalAmount: 20400 },
  ];

  const childUnitsCount: Record<string, number> = {};
  allUnits.forEach(unit => { childUnitsCount[unit.childId] = (childUnitsCount[unit.childId] || 0) + 1; });
  const totalUnitsCount = allUnits.length;

  const children = [
    { id: "all", name: "כל הילדים", paidAmount: "4,043", totalAmount: "14,000", unitsCount: totalUnitsCount, progressPercentage: 29, gender: "male" as const },
    { id: "child1", name: "שמחה", paidAmount: "4,043", totalAmount: "14,000", unitsCount: childUnitsCount["child1"] || 0, progressPercentage: 29, gender: "female" as const },
    { id: "child2", name: "דוד משה", paidAmount: "14,000", totalAmount: "14,000", unitsCount: childUnitsCount["child2"] || 0, progressPercentage: 100, gender: "male" as const },
    { id: "child3", name: "יוני שמעון", paidAmount: "14,000", totalAmount: "14,000", unitsCount: childUnitsCount["child3"] || 0, progressPercentage: 100, gender: "male" as const },
    { id: "child4", name: "חיים יעקב", paidAmount: "8,000", totalAmount: "8,000", unitsCount: childUnitsCount["child4"] || 0, progressPercentage: 100, gender: "male" as const },
    { id: "child5", name: "יניב אהרון", paidAmount: "22,000", totalAmount: "48,000", unitsCount: childUnitsCount["child5"] || 0, progressPercentage: 46, gender: "male" as const },
    { id: "child6", name: "מיכל שולמית", paidAmount: "11,043", totalAmount: "32,000", unitsCount: childUnitsCount["child6"] || 0, progressPercentage: 35, gender: "female" as const },
  ];

  const filteredUnits = selectedChild === "all" ? allUnits : allUnits.filter(unit => unit.childId === selectedChild);

  const groupUnits = (units: Unit[]): UnitGroup[] => {
    const groups: UnitGroup[] = [];
    const processedUnits = new Set<string>();
    units.forEach((unit, index) => {
      if (processedUnits.has(unit.id)) return;
      const groupUnitsArr: Unit[] = [unit];
      processedUnits.add(unit.id);
      for (let i = index + 1; i < units.length; i++) {
        const nextUnit = units[i];
        if (processedUnits.has(nextUnit.id)) continue;
        if (nextUnit.childName === unit.childName && nextUnit.joinDate === unit.joinDate && nextUnit.designatedYear === unit.designatedYear && nextUnit.track === unit.track && nextUnit.paymentMethod === unit.paymentMethod) {
          groupUnitsArr.push(nextUnit);
          processedUnits.add(nextUnit.id);
        }
      }
      groups.push({
        groupKey: `${unit.childName}-${unit.joinDate}-${unit.designatedYear}-${unit.track}-${unit.paymentMethod}`,
        units: groupUnitsArr,
        sharedData: { childName: unit.childName, joinDate: unit.joinDate, designatedYear: unit.designatedYear, track: unit.track, paymentMethod: unit.paymentMethod },
      });
    });
    return groups;
  };

  const unitGroups = groupUnits(filteredUnits);
  const selectedChildData = children.find(child => child.id === selectedChild);
  const displayedUnitsCount = filteredUnits.length;

  const calculateStats = () => {
    if (selectedChild === "all") {
      const completedUnits = allUnits.filter(unit => unit.paidPayments === "120/120").length;
      return { completedUnits, totalUnits: allUnits.length, monthlyCharges: "1,600", potentialGrants: "56,000", totalLoans: "800,000" };
    } else {
      const childUnits = allUnits.filter(unit => unit.childId === selectedChild);
      const completedUnits = childUnits.filter(unit => unit.paidPayments === "120/120").length;
      return { completedUnits, totalUnits: childUnits.length, monthlyCharges: "450", potentialGrants: "18,000", totalLoans: "150,000" };
    }
  };
  const stats = calculateStats();

  // Carousel logic
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const handleScrollLeft = () => { carouselRef.current?.scrollTo({ left: carouselRef.current.scrollLeft - 300, behavior: 'smooth' }); };
  const handleScrollRight = () => { carouselRef.current?.scrollTo({ left: carouselRef.current.scrollLeft + 300, behavior: 'smooth' }); };

  const updateArrowsVisibility = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const hasScroll = scrollWidth > clientWidth;
      if (!hasScroll) { setShowLeftArrow(false); setShowRightArrow(false); return; }
      const maxScrollLeft = scrollWidth - clientWidth;
      setShowLeftArrow(Math.abs(scrollLeft) < maxScrollLeft - 5);
      setShowRightArrow(scrollLeft < -5);
    }
  };

  useEffect(() => {
    const currentRef = carouselRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", updateArrowsVisibility);
      updateArrowsVisibility();
      const handleResize = () => updateArrowsVisibility();
      window.addEventListener('resize', handleResize);
      return () => { currentRef.removeEventListener("scroll", updateArrowsVisibility); window.removeEventListener('resize', handleResize); };
    }
  }, []);

  return (
    <div className="w-full min-w-0 overflow-x-hidden" dir="rtl">
      {/* Selection Instruction */}
      <h4 className="mb-3 md:mb-4 text-right" style={{ fontSize: "clamp(14px, 2vw, var(--text-xl))" }}>בחר ילד/ה או קרוב להצגת פירוט יחידות:</h4>

      {/* Children Cards Carousel */}
      <div className="relative w-full px-5 sm:px-6">
        <div
          style={{ overflowX: "auto", overflowY: "visible", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="carousel-container w-full"
          ref={carouselRef}
        >
          <style>{`.carousel-container::-webkit-scrollbar { display: none; }`}</style>
          <div className="flex gap-2 md:gap-2.5 pt-1 pb-6" dir="rtl" style={{ paddingLeft: "40px" }}>
            {children.map((child) => (
              <ChildCard
                key={child.id}
                name={child.id === "all" ? (<><span style={{ fontWeight: "var(--font-weight-bold)" }}>כל הילדים </span><span style={{ fontWeight: "var(--font-weight-normal)" }}>(6)</span></>) : child.name}
                paidAmount={child.paidAmount}
                totalAmount={child.totalAmount}
                unitsCount={child.unitsCount}
                progressPercentage={child.progressPercentage}
                isSelected={selectedChild === child.id}
                onClick={() => setSelectedChild(child.id)}
              />
            ))}
          </div>
        </div>
        {/* Left fade gradient - only shows when content overflows */}
        {showLeftArrow && (
          <div
            className="pointer-events-none absolute top-0 left-0 h-full z-[5]"
            style={{ width: "70px", background: "linear-gradient(to right, var(--page-section) 10%, transparent 100%)" }}
          />
        )}
        {showRightArrow && (
          <button onClick={handleScrollRight} className="absolute top-1/2 -translate-y-1/2 hidden sm:flex" style={{ right: "0px", width: "32px", height: "32px", backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "50%", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "var(--elevation-sm)", zIndex: 10 }} aria-label="גלול ימינה">
            <ChevronRight size={18} style={{ color: "var(--foreground)" }} />
          </button>
        )}
        {showLeftArrow && (
          <button onClick={handleScrollLeft} className="absolute top-1/2 -translate-y-1/2 hidden sm:flex" style={{ left: "0px", width: "32px", height: "32px", backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "50%", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "var(--elevation-sm)", zIndex: 10 }} aria-label="גלול שמאלה">
            <ChevronLeft size={18} style={{ color: "var(--foreground)" }} />
          </button>
        )}
      </div>

      {/* Units Table Section */}
      <div className="mt-4 sm:mt-6">
        <div className="w-full" style={{ backgroundColor: "white", borderRadius: "12px", boxShadow: "0px 0px 20px 0px rgba(14, 78, 134, 0.04)" }}>
          <div className="px-3 sm:px-4 md:px-6 pt-4 sm:pt-6">
            <div className="w-full min-w-0">
              {/* Info Bar - Desktop XL+ (single row) */}
              <div className="hidden xl:flex items-center justify-between px-4 2xl:px-9 py-3 mb-4 gap-3 2xl:gap-8" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", minHeight: "68px" }} dir="rtl">
                <div className="flex items-center gap-3 2xl:gap-6 flex-1 min-w-0" dir="rtl">
                  <div className="flex flex-col gap-0.5 text-right shrink-0">
                    <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "18px", whiteSpace: "nowrap" }}>סטטוס יחידות</p>
                    <p style={{ fontSize: "13px", lineHeight: "18px", whiteSpace: "nowrap" }}><span style={{ fontWeight: "var(--font-weight-bold)" }}>{stats.completedUnits}</span><span>/{stats.totalUnits}</span><span style={{ fontWeight: "var(--font-weight-bold)" }}> יחידות מומשו</span></p>
                  </div>
                  <div className="shrink-0" style={{ width: "1px", height: "40px", backgroundColor: "var(--border)" }} />
                  <div className="flex flex-col gap-0.5 text-right min-w-0">
                    <p className="truncate" style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "18px" }}>סך ההלוואות שתוכל לבקש לילדיך</p>
                    <p style={{ fontSize: "13px", fontWeight: "var(--font-weight-bold)", lineHeight: "18px", whiteSpace: "nowrap" }}>{stats.totalLoans} ₪</p>
                  </div>
                  <div className="shrink-0" style={{ width: "1px", height: "40px", backgroundColor: "var(--border)" }} />
                  <div className="flex items-start gap-1 text-right min-w-0">
                    <div className="pt-0.5 shrink-0"><Info size={13} style={{ color: "var(--muted-foreground)" }} /></div>
                    <div className="flex flex-col gap-0.5 text-right min-w-0">
                      <p className="truncate" style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "18px" }}>מענקים שתוכל לבקש בסיום ההלוואות</p>
                      <p style={{ fontSize: "13px", fontWeight: "var(--font-weight-bold)", lineHeight: "18px", whiteSpace: "nowrap" }}>{stats.potentialGrants} ₪</p>
                    </div>
                  </div>
                  <div className="shrink-0" style={{ width: "1px", height: "40px", backgroundColor: "var(--border)" }} />
                  <div className="flex flex-col gap-0.5 text-right shrink-0">
                    <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "18px", whiteSpace: "nowrap" }}>חיובים לחודש ינואר</p>
                    <p style={{ fontSize: "13px", fontWeight: "var(--font-weight-bold)", lineHeight: "18px", whiteSpace: "nowrap" }}>{stats.monthlyCharges} ₪</p>
                  </div>
                </div>
                <div className="relative shrink-0" ref={actionsDropdownRef}>
                  <button onClick={() => setIsActionsDropdownOpen(!isActionsDropdownOpen)} className="flex items-center gap-2 px-3 py-2 shrink-0 transition-colors" style={{ backgroundColor: isActionsDropdownOpen ? "var(--muted)" : "var(--card)", border: "1px solid var(--muted-foreground)", borderRadius: "var(--radius-md)", cursor: "pointer" }}>
                    <p style={{ fontSize: "13px", fontWeight: "var(--font-weight-semibold)", color: "var(--foreground)", whiteSpace: "nowrap" }}>פעולות ומידע</p>
                    <ChevronDown size={16} style={{ color: "var(--foreground)", transform: isActionsDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
                  </button>
                  {isActionsDropdownOpen && <ActionsDropdown onClose={() => setIsActionsDropdownOpen(false)} onPurchaseUnits={() => setIsPurchaseWizardOpen(true)} />}
                </div>
              </div>

              {/* Info Bar - Tablet (md to XL) - 2x2 grid */}
              <div className="hidden md:flex xl:hidden flex-col gap-3 p-4 lg:p-6 mb-4" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)" }} dir="rtl">
                <div className="flex items-center justify-between gap-4 lg:gap-8">
                  <div className="flex flex-col gap-0.5 text-right flex-1 min-w-0">
                    <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "20px" }}>סטטוס יחידות</p>
                    <p style={{ fontSize: "14px", lineHeight: "20px" }}><span style={{ fontWeight: "var(--font-weight-bold)" }}>{stats.completedUnits}</span>/{stats.totalUnits}<span style={{ fontWeight: "var(--font-weight-bold)" }}> יחידות מומשו</span></p>
                  </div>
                  <div className="shrink-0" style={{ width: "1px", height: "40px", backgroundColor: "var(--border)" }} />
                  <div className="flex flex-col gap-0.5 text-right flex-1 min-w-0">
                    <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "20px" }}>חיובים לחודש ינואר</p>
                    <p style={{ fontSize: "14px", fontWeight: "var(--font-weight-bold)", lineHeight: "20px" }}>{stats.monthlyCharges} ₪</p>
                  </div>
                </div>
                <div style={{ width: "100%", height: "1px", backgroundColor: "var(--border)" }} />
                <div className="flex items-center justify-between gap-4 lg:gap-8">
                  <div className="flex flex-col gap-0.5 text-right flex-1 min-w-0">
                    <p className="truncate" style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "20px" }}>סך ההלוואות שתוכל לבקש לילדיך</p>
                    <p style={{ fontSize: "14px", fontWeight: "var(--font-weight-bold)", lineHeight: "20px" }}>{stats.totalLoans} ₪</p>
                  </div>
                  <div className="shrink-0" style={{ width: "1px", height: "40px", backgroundColor: "var(--border)" }} />
                  <div className="flex items-start gap-1 text-right flex-1 min-w-0">
                    <div className="pt-0.5 shrink-0"><Info size={13} style={{ color: "var(--muted-foreground)" }} /></div>
                    <div className="flex flex-col gap-0.5 text-right min-w-0">
                      <p className="truncate" style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "20px" }}>מענקים שתוכל לבקש בסיום ההלוואות</p>
                      <p style={{ fontSize: "14px", fontWeight: "var(--font-weight-bold)", lineHeight: "20px" }}>{stats.potentialGrants} ₪</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Bar - Mobile (stacked) */}
              <div className="md:hidden flex flex-col gap-3 p-3 sm:p-4 mb-4" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)" }} dir="rtl">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 text-right">
                    <p style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>סטטוס יחידות</p>
                    <p style={{ fontSize: "14px", fontWeight: "var(--font-weight-bold)" }}>{stats.completedUnits}/{stats.totalUnits} מומשו</p>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <p style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>חיובים חודשיים</p>
                    <p style={{ fontSize: "14px", fontWeight: "var(--font-weight-bold)" }}>{stats.monthlyCharges} ₪</p>
                  </div>
                </div>
                <div style={{ width: "100%", height: "1px", backgroundColor: "var(--border)" }} />
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 text-right">
                    <p style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>סך ההלוואות</p>
                    <p style={{ fontSize: "14px", fontWeight: "var(--font-weight-bold)" }}>{stats.totalLoans} ₪</p>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <p style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>מענקים פוטנציאליים</p>
                    <p style={{ fontSize: "14px", fontWeight: "var(--font-weight-bold)" }}>{stats.potentialGrants} ₪</p>
                  </div>
                </div>
              </div>

              {/* Title + View Toggle */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-3">
                <h1 className="text-right order-1" style={{ fontSize: "clamp(18px, 3vw, 24px)" }}>
                  {selectedChild === "all" ? `סה"כ ${totalUnitsCount} יחידות לכל הילדים` : `סה"כ ${displayedUnitsCount} יחידות עבור ${selectedChildData?.name}`}
                </h1>
                <div className="flex items-center gap-2 order-2 justify-end sm:justify-start shrink-0">
                  <p className="hidden md:block" style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>תצוגה:</p>
                  <div className="flex p-1 gap-1" style={{ backgroundColor: "var(--page-section)", borderRadius: "300px" }}>
                    <button onClick={() => setActiveTab("table")} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors" style={{ backgroundColor: activeTab === "table" ? "#CCA559" : "transparent", fontSize: "13px", fontWeight: activeTab === "table" ? "var(--font-weight-semibold)" : "var(--font-weight-normal)", color: activeTab === "table" ? "#FFFFFF" : "var(--muted-foreground)", cursor: "pointer", border: "none", whiteSpace: "nowrap" }}>
                      טבלת יחידות
                    </button>
                    <button onClick={() => setActiveTab("timeline")} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors" style={{ backgroundColor: activeTab === "timeline" ? "#CCA559" : "transparent", fontSize: "13px", fontWeight: activeTab === "timeline" ? "var(--font-weight-semibold)" : "var(--font-weight-normal)", color: activeTab === "timeline" ? "#FFFFFF" : "var(--muted-foreground)", cursor: "pointer", border: "none", whiteSpace: "nowrap" }}>
                      ציר זמן תשלומים
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Content */}
          {activeTab === "table" && (
            <div className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-6">
              <div className="w-full min-w-0">
                {/* Desktop Table */}
                <div className="hidden md:block w-full min-w-0" dir="rtl">
                  <div className="w-full overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", borderRadius: "var(--radius-lg)" }}>
                    <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)" }}>
                      <table className="w-full" style={{ tableLayout: "auto", minWidth: "500px" }} dir="rtl">
                        <thead>
                          <tr style={{ backgroundColor: "var(--muted)" }}>
                            <TableHeader>מס׳ יחידה</TableHeader>
                            <TableHeader>עבור ילד/ה</TableHeader>
                            <TableHeader className="hidden xl:table-cell">תאריך הצטרפות</TableHeader>
                            <TableHeader className="hidden lg:table-cell">שנת ייעוד</TableHeader>
                            <TableHeader className="hidden lg:table-cell">מסלול</TableHeader>
                            <TableHeader className="hidden xl:table-cell">אמצעי תשלום</TableHeader>
                            <TableHeader>סכום חודשי</TableHeader>
                            <TableHeader className="hidden 2xl:table-cell">תשלומים ששולמו</TableHeader>
                            <TableHeader style={{ whiteSpace: "normal", minWidth: "150px" }}>יתרת תרומה</TableHeader>
                          </tr>
                        </thead>
                        <tbody>
                          {unitGroups.map((group) => {
                            const isExpanded = expandedGroups.has(group.groupKey);
                            const isGroup = group.units.length > 1;

                            if (!isGroup) {
                              const unit = group.units[0];
                              return (
                                <tr key={unit.id} style={{ borderBottom: "1px solid var(--border)" }}>
                                  <TableCell>יחידה {unit.id}</TableCell>
                                  <TableCell><div className="truncate max-w-[80px] lg:max-w-[100px] xl:max-w-[140px] 2xl:max-w-none" title={unit.childName}>{unit.childName}</div></TableCell>
                                  <TableCell className="hidden xl:table-cell">{unit.joinDate}</TableCell>
                                  <TableCell className="hidden lg:table-cell">{unit.designatedYear}</TableCell>
                                  <TableCell className="hidden lg:table-cell"><div className="truncate max-w-[80px] 2xl:max-w-none" title={unit.track}>{unit.track}</div></TableCell>
                                  <TableCell className="hidden xl:table-cell"><div className="truncate max-w-[90px] 2xl:max-w-none" title={unit.paymentMethod}>{unit.paymentMethod}</div></TableCell>
                                  <TableCell>{unit.monthlyAmount}</TableCell>
                                  <TableCell className="hidden 2xl:table-cell">{unit.paidPayments}</TableCell>
                                  <TableCell style={{ whiteSpace: "normal", minWidth: "150px" }}>
                                    <div className="flex flex-col gap-1.5" dir="rtl">
                                      <p style={{ fontSize: "14px", color: "var(--foreground)" }}>{unit.remainingDonation}</p>
                                      <ProgressBar paidAmount={unit.paidAmount} totalAmount={unit.totalAmount} />
                                    </div>
                                  </TableCell>
                                </tr>
                              );
                            }

                            const unitIds = group.units.map(u => u.id);
                            const unitRange = `יחידות ${unitIds[0]}-${unitIds[unitIds.length - 1]}`;
                            const totalMonthlyAmount = group.units.reduce((sum, u) => sum + parseInt(u.monthlyAmount.replace(/[^\d]/g, '')), 0);
                            const totalPaidPayments = group.units.reduce((sum, u) => sum + parseInt(u.paidPayments.split('/')[0]), 0);
                            const totalMaxPayments = group.units.reduce((sum, u) => sum + parseInt(u.paidPayments.split('/')[1]), 0);
                            const totalPaidAmount = group.units.reduce((sum, u) => sum + u.paidAmount, 0);
                            const totalTotalAmount = group.units.reduce((sum, u) => sum + u.totalAmount, 0);

                            return [
                              <tr key={`group-${group.groupKey}`} style={{ backgroundColor: isExpanded ? "var(--page-section)" : "var(--card)", borderBottom: "1px solid var(--border)", cursor: "pointer" }} onClick={() => toggleGroup(group.groupKey)}>
                                <TableCell style={{ fontWeight: "var(--font-weight-semibold)" }}>
                                  <div className="flex items-center gap-2" dir="rtl">
                                    <span>{unitRange}</span>
                                    <div style={{ transition: "transform 0.2s ease", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}><ChevronDown size={16} style={{ color: "var(--foreground)" }} /></div>
                                  </div>
                                </TableCell>
                                <TableCell style={{ fontWeight: "var(--font-weight-semibold)" }}><div className="truncate max-w-[80px] lg:max-w-[100px] xl:max-w-[140px] 2xl:max-w-none">{group.sharedData.childName}</div></TableCell>
                                <TableCell className="hidden xl:table-cell" style={{ fontWeight: "var(--font-weight-semibold)" }}>{group.sharedData.joinDate}</TableCell>
                                <TableCell className="hidden lg:table-cell" style={{ fontWeight: "var(--font-weight-semibold)" }}>{group.sharedData.designatedYear}</TableCell>
                                <TableCell className="hidden lg:table-cell" style={{ fontWeight: "var(--font-weight-semibold)" }}>{group.sharedData.track}</TableCell>
                                <TableCell className="hidden xl:table-cell" style={{ fontWeight: "var(--font-weight-semibold)" }}>{group.sharedData.paymentMethod}</TableCell>
                                <TableCell style={{ fontWeight: "var(--font-weight-semibold)" }}>{totalMonthlyAmount.toLocaleString('he-IL')} ₪</TableCell>
                                <TableCell className="hidden 2xl:table-cell" style={{ fontWeight: "var(--font-weight-semibold)" }}>{totalPaidPayments}/{totalMaxPayments}</TableCell>
                                <TableCell style={{ fontWeight: "var(--font-weight-semibold)", whiteSpace: "normal", minWidth: "150px" }}>
                                  <div className="flex flex-col gap-1.5" dir="rtl">
                                    <p style={{ fontSize: "14px" }}>שולם {totalPaidAmount.toLocaleString('he-IL')} ₪ מתוך {totalTotalAmount.toLocaleString('he-IL')} ₪</p>
                                    <ProgressBar paidAmount={totalPaidAmount} totalAmount={totalTotalAmount} />
                                  </div>
                                </TableCell>
                              </tr>,
                              ...(isExpanded ? group.units.map((unit) => (
                                <tr key={unit.id} style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--card)" }}>
                                  <TableCell style={{ paddingRight: "48px" }}>{unit.id}</TableCell>
                                  <TableCell style={{ color: "var(--muted-foreground)" }}>-</TableCell>
                                  <TableCell className="hidden xl:table-cell" style={{ color: "var(--muted-foreground)" }}>-</TableCell>
                                  <TableCell className="hidden lg:table-cell" style={{ color: "var(--muted-foreground)" }}>-</TableCell>
                                  <TableCell className="hidden lg:table-cell" style={{ color: "var(--muted-foreground)" }}>-</TableCell>
                                  <TableCell className="hidden xl:table-cell" style={{ color: "var(--muted-foreground)" }}>-</TableCell>
                                  <TableCell>{unit.monthlyAmount}</TableCell>
                                  <TableCell className="hidden 2xl:table-cell">{unit.paidPayments}</TableCell>
                                  <TableCell style={{ whiteSpace: "normal", minWidth: "150px" }}>
                                    <div className="flex flex-col gap-1.5" dir="rtl">
                                      <p style={{ fontSize: "14px" }}>{unit.remainingDonation}</p>
                                      <ProgressBar paidAmount={unit.paidAmount} totalAmount={unit.totalAmount} />
                                    </div>
                                  </TableCell>
                                </tr>
                              )) : [])
                            ];
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden flex flex-col gap-3" dir="rtl">
                  {unitGroups.map((group) => {
                    const isGroup = group.units.length > 1;
                    if (!isGroup) {
                      const unit = group.units[0];
                      return <UnitCard key={unit.id} unit={unit} />;
                    }
                    const isExpanded = expandedGroups.has(group.groupKey);
                    const unitIds = group.units.map(u => u.id);
                    const unitRange = `יחידות ${unitIds[0]}-${unitIds[unitIds.length - 1]}`;
                    const totalPaidAmount = group.units.reduce((sum, u) => sum + u.paidAmount, 0);
                    const totalTotalAmount = group.units.reduce((sum, u) => sum + u.totalAmount, 0);

                    return (
                      <div key={`group-mobile-${group.groupKey}`}>
                        <div className="p-3 sm:p-4" style={{ backgroundColor: isExpanded ? "var(--page-section)" : "var(--card)", border: "1px solid var(--border)", borderRadius: isExpanded ? "var(--radius-lg) var(--radius-lg) 0 0" : "var(--radius-lg)", cursor: "pointer" }} dir="rtl" onClick={() => toggleGroup(group.groupKey)}>
                          <div className="flex flex-col gap-2.5 sm:gap-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2"><p style={{ fontSize: "13px", fontWeight: "var(--font-weight-bold)" }}>{unitRange}</p><ChevronDown size={14} style={{ color: "var(--foreground)", transition: "transform 0.2s ease", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }} /></div>
                              <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>מספר יחידה</p>
                            </div>
                            <MobileRow label="עבור ילד/ה" value={group.sharedData.childName} />
                            <MobileRow label="תאריך הצטרפות" value={group.sharedData.joinDate} />
                            <MobileRow label="שנת ייעוד" value={group.sharedData.designatedYear} />
                            <div className="flex flex-col gap-2"><p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>יתרת תרומה</p>
                              <p style={{ fontSize: "13px", fontWeight: "var(--font-weight-bold)" }}>שולם {totalPaidAmount.toLocaleString('he-IL')} ₪ מתוך {totalTotalAmount.toLocaleString('he-IL')} ₪</p>
                              <ProgressBar paidAmount={totalPaidAmount} totalAmount={totalTotalAmount} />
                            </div>
                          </div>
                        </div>
                        {isExpanded && group.units.map((unit, idx) => (
                          <div key={unit.id} className="p-3 sm:p-4" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderTop: "none", borderRadius: idx === group.units.length - 1 ? "0 0 var(--radius-lg) var(--radius-lg)" : "0", marginRight: "12px" }} dir="rtl">
                            <div className="flex flex-col gap-2.5 sm:gap-3">
                              <MobileRow label="מס׳ יחידה" value={unit.id} />
                              <MobileRow label="סכום חודשי" value={unit.monthlyAmount} />
                              <MobileRow label="תשלומים ששולמו" value={unit.paidPayments} />
                              <div className="flex flex-col gap-2 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                                <MobileRow label="יתרת תרומה" value={unit.remainingDonation} />
                                <ProgressBar paidAmount={unit.paidAmount} totalAmount={unit.totalAmount} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-6">
              <div className="flex flex-col items-center justify-center gap-4 py-12 sm:py-16 md:py-24" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)" }} dir="rtl">
                <div className="flex items-center justify-center" style={{ width: "64px", height: "64px", backgroundColor: "var(--muted)", borderRadius: "50%" }}>
                  <Calendar size={32} style={{ color: "var(--muted-foreground)" }} />
                </div>
                <p className="px-4" style={{ fontSize: "16px", fontWeight: "var(--font-weight-semibold)", color: "var(--foreground)", textAlign: "center" }}>כאן יופיע ציר זמן תשלומים</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Purchase Units Wizard */}
      <PurchaseUnitsWizard
        isOpen={isPurchaseWizardOpen}
        onClose={() => setIsPurchaseWizardOpen(false)}
        children={children.filter(c => c.id !== "all").map(c => ({ id: c.id, name: c.name, unitsCount: c.unitsCount, gender: c.gender }))}
      />
    </div>
  );
}

// Helper Components
function ProgressBar({ paidAmount, totalAmount }: { paidAmount: number; totalAmount: number }) {
  return (
    <div style={{ width: "100%", height: "6px", backgroundColor: "var(--muted)", borderRadius: "100px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${(paidAmount / totalAmount) * 100}%`, backgroundColor: "var(--primary)", borderRadius: "100px", transition: "width 0.3s ease" }} />
    </div>
  );
}

function MobileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2 min-w-0">
      <p className="truncate min-w-0" style={{ fontSize: "13px", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)" }}>{value}</p>
      <p className="shrink-0" style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>{label}</p>
    </div>
  );
}

function ChildCard({ name, paidAmount, totalAmount, unitsCount, progressPercentage, isSelected, onClick }: {
  name: React.ReactNode; paidAmount: string; totalAmount: string; unitsCount: number; progressPercentage: number; isSelected: boolean; onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <button
      className="relative shrink-0 cursor-pointer"
      style={{
        backgroundColor: "var(--card)",
        padding: "14px 18px",
        borderRadius: "12px",
        border: isSelected ? "2px solid var(--primary)" : "2px solid var(--border)",
        boxShadow: isSelected
          ? "0 4px 12px -2px rgba(23, 37, 84, 0.18), 0 8px 20px -4px rgba(23, 37, 84, 0.10)"
          : "var(--elevation-sm)",
        minWidth: "170px",
        maxWidth: "240px",
        outline: "none",
        transition: "border-color 0.2s ease, opacity 0.2s ease, box-shadow 0.25s ease",
        opacity: isSelected ? 1 : (isHovered ? 0.9 : 0.6),
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 justify-center" dir="rtl">
        <div className="relative shrink-0" style={{ width: "64px", height: "64px" }}>
          <svg width="64" height="64" viewBox="0 0 90 90" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="45" cy="45" r={radius} fill="none" stroke="var(--border)" strokeWidth="7" />
            <circle cx="45" cy="45" r={radius} fill="none" stroke="var(--primary)" strokeWidth="7" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.6s ease" }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p style={{ fontSize: "20px", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", lineHeight: "1" }}>{unitsCount}</p>
            <p style={{ fontSize: "10px", color: "var(--muted-foreground)", marginTop: "2px" }}>יחידות</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-end text-right min-w-0" style={{ flex: 1 }}>
          <h4 className="truncate w-full" style={{ marginBottom: "2px", textAlign: "right", fontWeight: "var(--font-weight-bold)", fontSize: "15px", lineHeight: "1.3" }} dir="rtl">{name}</h4>
          <div className="flex flex-col gap-0.5 items-end text-right w-full" dir="rtl">
            <p style={{ fontSize: "13px", color: "var(--muted-foreground)", textAlign: "right", whiteSpace: "nowrap" }}>שולם <span style={{ fontWeight: "var(--font-weight-bold)", color: "var(--primary)" }}>{paidAmount} ₪</span></p>
            <p style={{ fontSize: "13px", color: "var(--muted-foreground)", textAlign: "right", whiteSpace: "nowrap" }}>מתוך <span style={{ fontWeight: "var(--font-weight-bold)" }}>{totalAmount} ₪</span></p>
          </div>
        </div>
      </div>
    </button>
  );
}

function UnitCard({ unit }: { unit: Unit }) {
  return (
    <div className="p-3 sm:p-4" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)" }} dir="rtl">
      <div className="flex flex-col gap-2.5 sm:gap-3">
        <MobileRow label="מס׳ יחידה" value={unit.id} />
        <MobileRow label="עבור ילד/ה" value={unit.childName} />
        <MobileRow label="תאריך הצטרפות" value={unit.joinDate} />
        <MobileRow label="שנת ייעוד" value={unit.designatedYear} />
        <MobileRow label="מסלול" value={unit.track} />
        <MobileRow label="אמצעי תשלום" value={unit.paymentMethod} />
        <MobileRow label="סכום חודשי" value={unit.monthlyAmount} />
        <MobileRow label="תשלומים ששולמו" value={unit.paidPayments} />
        <div className="flex flex-col gap-2 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
          <MobileRow label="יתרת תרומה" value={unit.remainingDonation} />
          <ProgressBar paidAmount={unit.paidAmount} totalAmount={unit.totalAmount} />
        </div>
      </div>
    </div>
  );
}

function TableHeader({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <th className={`px-1.5 lg:px-2 xl:px-3 2xl:px-4 py-2.5 lg:py-3 text-right ${className || ""}`} style={{ color: "var(--muted-foreground)", fontSize: "14px", fontWeight: "var(--font-weight-normal)", whiteSpace: "nowrap", ...style }}>
      {children}
    </th>
  );
}

function TableCell({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <td className={`px-1.5 lg:px-2 xl:px-3 2xl:px-4 py-3 lg:py-4 text-right ${className || ""}`} style={{ color: "var(--foreground)", fontSize: "14px", fontWeight: "var(--font-weight-normal)", whiteSpace: "nowrap", ...style }}>
      {children}
    </td>
  );
}
