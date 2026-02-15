'use client';

interface ActionsDropdownProps {
  onClose?: () => void;
  onPurchaseUnits?: () => void;
}

export function ActionsDropdown({ onClose, onPurchaseUnits }: ActionsDropdownProps) {
  const actions = [
    { id: "1", label: "רכישת יחידות", onClick: () => onPurchaseUnits?.() },
    { id: "2", label: 'הפקת ק"ח ייחודית', onClick: () => console.log('הפקת ק"ח ייחודית') },
    { id: "3", label: "לצפייה בהיסטוריית תשלום", onClick: () => console.log("לצפייה בהיסטוריית תשלום") },
    { id: "4", label: "לצפייה בתנועות עתידיות", onClick: () => console.log("לצפייה בתנועות עתידיות") },
  ];

  return (
    <div
      className="absolute top-full left-0 mt-2 bg-popover rounded-[var(--radius-lg)] shadow-[var(--elevation-sm)] border border-border w-[240px] overflow-hidden z-50"
      dir="rtl"
    >
      <div className="py-2">
        {actions.map((action, index) => (
          <button
            key={action.id}
            onClick={() => {
              action.onClick();
              onClose?.();
            }}
            className={`w-full px-4 py-3 text-right hover:bg-muted/30 transition-colors border-b border-border last:border-b-0 ${
              index === 0 ? 'pt-3' : ''
            } ${
              index === actions.length - 1 ? 'pb-3' : ''
            }`}
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--popover-foreground)",
              fontWeight: "var(--font-weight-normal)",
            }}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
