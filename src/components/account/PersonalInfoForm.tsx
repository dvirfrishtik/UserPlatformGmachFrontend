'use client';

import { useState } from "react";
import { Input } from "../ui/input";

export function PersonalInfoForm() {
  const [formValues, setFormValues] = useState({
    firstName: "יצחק",
    lastName: "נאמן",
    idNumber: "201125633",
    birthDate: "28/12/1979",
    city: "תל אביב",
    street: "הירדן",
    houseNumber: "18",
    postalCode: "8526918",
  });

  const [phones] = useState([
    { id: 1, value: "0548755233", label: "טלפון נייד", type: "mobile" as const, isDefault: true }
  ]);

  const [emails] = useState([
    { id: 1, value: "help@support.temu.com", label: "כתובת מייל", isDefault: true }
  ]);

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Personal Details Card */}
      <div className="bg-card shadow-[var(--elevation-sm)] rounded-[var(--radius-card)] p-6 md:p-8" dir="rtl">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-4">
            <h3 className="text-[20px] font-bold">פרטים אישיים</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-sm font-medium">שם פרטי</label>
              <Input
                id="firstName"
                type="text"
                value={formValues.firstName}
                onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-sm font-medium">שם משפחה</label>
              <Input
                id="lastName"
                type="text"
                value={formValues.lastName}
                onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="idNumber" className="text-sm font-medium">מספר ת.ז</label>
              <Input
                id="idNumber"
                type="text"
                value={formValues.idNumber}
                onChange={(e) => setFormValues({ ...formValues, idNumber: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="birthDate" className="text-sm font-medium">תאריך לידה</label>
              <Input
                id="birthDate"
                type="text"
                value={formValues.birthDate}
                onChange={(e) => setFormValues({ ...formValues, birthDate: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Phone Numbers Card */}
      <div className="bg-card shadow-[var(--elevation-sm)] rounded-[var(--radius-card)] p-6 md:p-8" dir="rtl">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-1">
            <h4>מספר טלפון</h4>
            <p className="text-muted-foreground">החלפת טלפון נייד דורשת אימות בקוד טלפוני</p>
          </div>
          {phones.map((phone) => (
            <div key={phone.id} className="flex gap-2 items-end">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor={`phone-${phone.id}`} className="text-sm font-medium">{phone.label}</label>
                <Input id={`phone-${phone.id}`} type="text" value={phone.value} readOnly />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Section Card */}
      <div className="bg-card shadow-[var(--elevation-sm)] rounded-[var(--radius-card)] p-6 md:p-8" dir="rtl">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-1">
            <h4>מייל החשבון</h4>
            <p className="text-muted-foreground">החלפת הכתובת דורשת אימות במייל</p>
          </div>
          {emails.map((email) => (
            <div key={email.id} className="flex gap-2 items-end">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor={`email-${email.id}`} className="text-sm font-medium">{email.label}</label>
                <Input id={`email-${email.id}`} type="email" value={email.value} readOnly />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-card shadow-[var(--elevation-sm)] rounded-[var(--radius-card)] p-6 md:p-8" dir="rtl">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-1">
            <h4>כתובת מגורים</h4>
            <p className="text-muted-foreground">הכתובת אליה יישלחו מכתבים מאיתנו</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="text-sm font-medium">עיר</label>
              <Input
                id="city"
                type="text"
                value={formValues.city}
                onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="street" className="text-sm font-medium">רחוב</label>
              <Input
                id="street"
                type="text"
                value={formValues.street}
                onChange={(e) => setFormValues({ ...formValues, street: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="houseNumber" className="text-sm font-medium">מספר בית</label>
              <Input
                id="houseNumber"
                type="text"
                value={formValues.houseNumber}
                onChange={(e) => setFormValues({ ...formValues, houseNumber: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="postalCode" className="text-sm font-medium">מיקוד</label>
              <Input
                id="postalCode"
                type="text"
                value={formValues.postalCode}
                onChange={(e) => setFormValues({ ...formValues, postalCode: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
