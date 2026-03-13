import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import TicketRegistrationModal from "./TicketRegistrationModal";

export default function Tickets() {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="tickets-section" className="py-20 bg-gradient-to-r from-black to-slate-900 border-t border-b border-white/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-900/50 border-red-500/50 p-8 md:p-12 text-center relative overflow-hidden opacity-75 hover:border-red-500/60 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

            <div className="relative z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-red-500/20 text-red-400 text-sm font-bold uppercase tracking-wider mb-6 border border-red-500/30">
                SOLD OUT
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "Montserrat" }}>
                {t("tickets.title")}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                  {t("tickets.subtitle")}
                </span>
              </h2>

              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                {t("tickets.description")}
                <strong className="text-white block mt-2">{t("tickets.price")}</strong>
              </p>

              <Button
                size="lg"
                disabled
                className="bg-red-600 hover:bg-red-600 text-white font-bold text-lg px-12 py-6 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-300 cursor-not-allowed opacity-75 group"
              >
                <span>SOLD OUT</span>
              </Button>

              <p className="mt-6 text-sm text-gray-500">
                <i className="fas fa-lock mr-1" /> {t("tickets.secure")}
              </p>
            </div>
          </Card>
        </div>
      </div>

      <TicketRegistrationModal 
        open={modalOpen} 
        onOpenChange={setModalOpen}
        ticketType="regular"
      />
    </section>
  );
}
