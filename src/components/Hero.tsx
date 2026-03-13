import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663322702325/xZffJnBKEwxuAnyw.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/5 border border-green-500/30 rounded-full">
              <i className="fas fa-location-dot text-green-400 text-sm" />
              <span className="text-sm font-semibold text-green-400 uppercase">{t("hero.edition")}</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6 text-white" style={{ fontFamily: "Montserrat" }}>
              {t("hero.title")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-green-400">
                {t("hero.subtitle")}
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 font-light max-w-2xl mb-8">
              {t("hero.description")}
              <span className="block text-green-400 font-semibold mt-2">{t("hero.tagline")}</span>
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10 border-t border-white/10 pt-8">
              <div>
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">{t("hero.date")}</p>
                <p className="text-lg font-bold text-white">26 Feb 2026</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">{t("hero.location")}</p>
                <p className="text-lg font-bold text-white">CDMX</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Price</p>
                <p className="text-lg font-bold text-green-400">{t("tickets.price")}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-400 text-black font-bold w-full sm:w-auto"
                asChild
              >
                <a href="#pricing-section">{t("hero.cta.primary")}</a>
              </Button>
              <Button variant="outline" size="lg" className="border-cyan-400/50 text-cyan-400 w-full sm:w-auto" asChild>
                <a href="#speakers-section">
                  <i className="fas fa-arrow-down mr-2" />
                  {t("hero.cta.secondary")}
                </a>
              </Button>
            </div>
          </div>

          <div className={`hidden lg:block transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div className="relative h-96 flex items-center justify-center">
              <div className="absolute w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="relative z-10 text-center">
                <i className="fas fa-chart-line text-6xl text-green-400 mb-4 block" />
                <p className="text-gray-400 text-lg font-semibold">SEO Strategy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <i className="fas fa-chevron-down text-green-400 text-2xl" />
      </div>


    </section>
  );
}
