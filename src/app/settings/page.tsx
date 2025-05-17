// app/settings/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  getWithExpiry,
  setWithExpiry,
  NAME_KEY,
  ONE_DAY,
} from "@/utils/storage";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  // Load cached name on mount
  useEffect(() => {
    const cached = getWithExpiry<string>(NAME_KEY);
    if (cached) setName(cached);
  }, []);

  const handleSave = () => {
    if (!name.trim()) return;
    setWithExpiry(NAME_KEY, name.trim(), ONE_DAY);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-4xl font-semibold mb-8">Settings</h1>

      <div className="grid gap-1.5">
        <Label htmlFor="name" className="text-xl font-semibold">
          Your Name
        </Label>
        <span className="text-sm text-zinc-600  mb-4 pl-2">
          This is the name that will be displayed on the website
        </span>
        <Input
          type="text"
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <Button className="mt-4" onClick={handleSave}>
        Save Name
      </Button>

      {saved && <p className="mt-2 text-sm text-green-600">Name saved!</p>}
    </div>
  );
}
