'use client';

import svgPaths from "../../imports/svg-uq5jcfbn1j";
import { useState } from "react";

function IconRefresh() {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path d={svgPaths.p16638f80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

interface ChargeRow {
  id: number;
  type: "loan" | "unit";
  identifier: string;
  childName: string;
  monthlyAmount: string;
  paidPayments: {
    count: number;
    totalAmount: string;
  };
}

interface ChargesTableProps {
  charges: ChargeRow[];
}

export function ChargesTable({ charges }: ChargesTableProps) {
  const [hoveredChargeId, setHoveredChargeId] = useState<number | null>(null);

  return (
    <div className="flex flex-col w-full" dir="rtl">
      {/* Desktop Table View */}
      <div
        className="bg-muted/30 w-full relative hidden md:block"
        style={{
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--border)",
        }}
      >
        <div style={{ overflow: "hidden", borderRadius: "var(--radius-card)" }}>
          {/* Table Header */}
          <div
            className="bg-muted/50 flex items-center"
            style={{
              paddingRight: "var(--spacing-6, 24px)",
              paddingLeft: "var(--spacing-6, 24px)",
              paddingTop: "var(--spacing-3, 12px)",
              paddingBottom: "var(--spacing-3, 12px)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center justify-start" style={{ width: "200px", paddingLeft: "var(--spacing-4, 16px)" }}>
              <p className="text-muted-foreground text-right" style={{ fontSize: "var(--text-sm, 14px)", fontWeight: "var(--font-weight-bold, 700)", lineHeight: "18px" }}>
                תשלום עבור
              </p>
            </div>
            <div className="flex items-center justify-start" style={{ width: "200px", paddingLeft: "var(--spacing-4, 16px)" }}>
              <p className="text-muted-foreground text-right" style={{ fontSize: "var(--text-sm, 14px)", fontWeight: "var(--font-weight-bold, 700)", lineHeight: "18px" }}>
                מס׳ מזהה
              </p>
            </div>
            <div className="flex items-center justify-start flex-1" style={{ paddingLeft: "var(--spacing-4, 16px)" }}>
              <p className="text-muted-foreground text-right" style={{ fontSize: "var(--text-sm, 14px)", fontWeight: "var(--font-weight-bold, 700)", lineHeight: "18px" }}>
                סכום חודשי
              </p>
            </div>
            <div style={{ width: "48px" }} />
          </div>

          {/* Table Rows */}
          <div className="flex flex-col">
            {charges.map((charge, index) => (
              <div
                key={charge.id}
                className="bg-card flex items-center"
                style={{
                  paddingRight: "var(--spacing-6, 24px)",
                  paddingLeft: "var(--spacing-6, 24px)",
                  paddingTop: "var(--spacing-4, 16px)",
                  paddingBottom: "var(--spacing-4, 16px)",
                  borderBottom: index < charges.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div className="flex items-center justify-start" style={{ width: "200px", paddingLeft: "var(--spacing-4, 16px)" }}>
                  <p className="text-foreground text-right" style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-normal)", lineHeight: "20px" }}>
                    {charge.type === "loan" ? "הלוואה" : "יחידה"}
                  </p>
                </div>
                <div className="flex flex-col items-start justify-center" style={{ width: "200px", paddingLeft: "var(--spacing-4, 16px)" }}>
                  <p className="text-foreground text-right" style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-normal)", lineHeight: "20px" }}>
                    {charge.identifier}
                  </p>
                  {charge.type === "unit" && (
                    <p className="text-muted-foreground text-right" style={{ fontSize: "var(--text-sm, 14px)", fontWeight: "var(--font-weight-normal)", lineHeight: "18px", marginTop: "var(--spacing-0-5, 2px)" }}>
                      עבור {charge.childName}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-start flex-1" style={{ paddingLeft: "var(--spacing-4, 16px)" }}>
                  <p className="text-foreground text-right" style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-bold, 700)", lineHeight: "20px" }}>
                    {charge.monthlyAmount}
                  </p>
                </div>
                <div className="relative">
                  <button
                    className="flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
                    style={{ width: "40px", height: "40px", borderRadius: "var(--radius-button)" }}
                    onMouseEnter={() => setHoveredChargeId(charge.id)}
                    onMouseLeave={() => setHoveredChargeId(null)}
                    aria-label="החלפת אמצעי תשלום"
                  >
                    <IconRefresh />
                  </button>
                  {hoveredChargeId === charge.id && (
                    <div
                      className="absolute bg-card text-foreground border border-border pointer-events-none z-50"
                      style={{
                        bottom: "calc(100% + 8px)",
                        left: "0",
                        borderRadius: "var(--radius-button)",
                        paddingLeft: "var(--spacing-3, 12px)",
                        paddingRight: "var(--spacing-3, 12px)",
                        paddingTop: "var(--spacing-2, 8px)",
                        paddingBottom: "var(--spacing-2, 8px)",
                        whiteSpace: "nowrap",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)",
                      }}
                    >
                      <p style={{ fontSize: "var(--text-sm, 14px)", fontWeight: "var(--font-weight-normal)", lineHeight: "18px" }}>
                        החלפת אמצעי תשלום
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="flex flex-col gap-4 md:hidden">
        {charges.map((charge) => (
          <div
            key={charge.id}
            className="bg-card flex flex-col"
            style={{
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--border)",
              padding: "var(--spacing-4, 16px)",
              gap: "var(--spacing-3, 12px)",
            }}
          >
            <div className="flex items-start justify-between w-full">
              <div className="flex flex-col items-start" style={{ gap: "var(--spacing-1, 4px)" }}>
                <p className="text-muted-foreground text-right" style={{ fontSize: "var(--text-sm, 14px)", fontWeight: "var(--font-weight-bold, 700)", lineHeight: "18px" }}>
                  {charge.type === "loan" ? "הלוואה" : "יחידה"}
                </p>
                <p className="text-foreground text-right" style={{ fontSize: "var(--text-base, 16px)", fontWeight: "var(--font-weight-bold, 700)", lineHeight: "20px" }}>
                  {charge.identifier}
                </p>
                {charge.type === "unit" && (
                  <p className="text-muted-foreground text-right" style={{ fontSize: "var(--text-sm, 14px)", fontWeight: "var(--font-weight-normal)", lineHeight: "18px" }}>
                    עבור {charge.childName}
                  </p>
                )}
              </div>
              <p className="text-foreground text-left" style={{ fontSize: "var(--text-xl, 20px)", fontWeight: "var(--font-weight-bold, 700)", lineHeight: "24px" }}>
                {charge.monthlyAmount}
              </p>
            </div>
            <button
              className="flex items-center justify-center text-primary hover:bg-muted/40 transition-all w-full"
              style={{
                borderRadius: "var(--radius-button)",
                padding: "var(--spacing-2, 8px)",
                gap: "var(--spacing-2, 8px)",
                border: "1px solid var(--border)",
              }}
            >
              <p style={{ fontSize: "var(--text-sm, 14px)", fontWeight: "var(--font-weight-semibold, 600)", lineHeight: "18px" }}>
                החלפת אמצעי תשלום
              </p>
              <IconRefresh />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
