import { useLanguage } from "@/contexts/LanguageContext";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function EarlyBirdBanner() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("earlyBirdBannerDismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("earlyBirdBannerDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-500 via-cyan-500 to-green-500 animate-gradient-x">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-4 text-black">
          <span className="text-sm md:text-base font-bold uppercase tracking-wide">
            🎉 {t("earlyBird.label")}
          </span>
          <span className="hidden md:inline text-sm font-medium">
            {t("earlyBird.message")}
          </span>
          <span className="text-sm md:text-base font-black">
            {t("earlyBird.discount")}
          </span>
        </div>
        <button
          onClick={handleDismiss}
          className="ml-4 p-1 hover:bg-black/10 rounded-full transition-colors"
          aria-label="Close banner"
        >
          <X className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );
}
