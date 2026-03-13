import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FreeTicketModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [userCountry, setUserCountry] = useState<string | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<'en' | 'es' | 'pt'>('en');
  const { language } = useLanguage();

  useEffect(() => {
    // Fetch user's country using IP geolocation
    const fetchCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setUserCountry(data.country_code);

        // Set detected language based on country
        if (data.country_code === "BR") {
          setDetectedLanguage('pt');
        } else if (["ES", "AR", "CL", "CO", "PE", "VE", "EC", "BO", "PY", "UY"].includes(data.country_code)) {
          setDetectedLanguage('es');
        } else {
          setDetectedLanguage('en');
        }

        // Show modal only if user is NOT from Mexico
        if (data.country_code !== "MX") {
          // Show modal after 15 seconds
          setTimeout(() => setIsOpen(true), 15000);
        }
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    };

    fetchCountry();
  }, []);

  const getContent = () => {
    // Use detected language from IP geolocation, fallback to user's language preference
    const displayLanguage = userCountry ? detectedLanguage : language;
    
    switch (displayLanguage) {
      case "es":
        return {
          title: "¡Gana un boleto virtual gratis!",
          description: "Envíame un DM en Instagram: seonestor",
          button: "Ir a Instagram",
          close: "Cerrar",
        };
      case "pt":
        return {
          title: "Ganhe um ingresso virtual grátis!",
          description: "Envie-me uma DM no Instagram: seonestor",
          button: "Ir para Instagram",
          close: "Fechar",
        };
      default:
        return {
          title: "Earn a Free Virtual Ticket!",
          description: "Send me a DM on Instagram: seonestor",
          button: "Go to Instagram",
          close: "Close",
        };
    }
  };

  const content = getContent();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg shadow-2xl max-w-md w-full border border-cyan-500/30 p-8 relative">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white">{content.title}</h2>

          {/* Description */}
          <p className="text-gray-300 text-lg leading-relaxed">
            {content.description}
          </p>

          {/* Instagram Link */}
          <a
            href="https://instagram.com/seonestor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {content.button}
          </a>

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-gray-400 hover:text-gray-300 transition-colors py-2"
          >
            {content.close}
          </button>
        </div>
      </div>
    </div>
  );
}
