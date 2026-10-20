import { useState } from "react";

const STORAGE_KEY = "cookie_banner_dismissed";

function hasDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(() => !hasDismissed());

  function handleAccept() {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
        
    }
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Information om cookies"
      className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white shadow-lg"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Vi använder en nödvändig cookie för att hålla dig inloggad. Den används inte
          för spårning eller marknadsföring.
        </p>
        <button
          onClick={handleAccept}
          className="shrink-0 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 cursor-pointer"
        >
          OK, jag förstår
        </button>
      </div>
    </div>
  );
}