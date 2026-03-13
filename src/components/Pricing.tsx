import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import TicketRegistrationModal from "./TicketRegistrationModal";
import FreeTicketClaimModal from "./FreeTicketClaimModal";

export default function Pricing() {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState<"vip" | "virtual">("vip");
  const [freeTicketModalOpen, setFreeTicketModalOpen] = useState(false);

  return (
    <section id="pricing-section" className="py-20 bg-gradient-to-b from-black to-slate-950 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-4" style={{ fontFamily: "Montserrat" }}>
            {t("pricing.title")}
          </h2>
          <p className="text-xl text-gray-400">{t("pricing.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* VIP Ticket - SOLD OUT */}
          <Card className="bg-gradient-to-br from-gray-500/20 to-gray-500/20 border-2 border-red-500 relative overflow-hidden opacity-75">
            {/* SOLD OUT Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-6 py-2 text-sm transform rotate-12 translate-x-8 translate-y-2">
              SOLD OUT
            </div>

            <CardHeader className="text-center pt-12">
              <CardTitle className="text-3xl font-black text-white mb-4" style={{ fontFamily: "Montserrat" }}>
                {t("pricing.vip.title")}
              </CardTitle>
              <p className="text-gray-300 text-lg mb-6">{t("pricing.vip.access")}</p>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-5xl font-black text-white" style={{ fontFamily: "Montserrat" }}>
                    $50
                  </span>
                  <span className="text-2xl text-gray-500 line-through">$100</span>
                </div>
                <p className="text-sm text-gray-400 italic">(estimated 870 Mexican Pesos)</p>
                <div className="inline-block bg-green-500/20 border border-green-400 rounded-full px-4 py-1">
                  <span className="text-green-400 font-bold">{t("pricing.vip.save")}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pb-8">
              {/* Features */}
              <div className="space-y-3 mt-6">
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 rounded-full p-1 mt-1">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-white text-lg">{t("pricing.vip.feature1")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 rounded-full p-1 mt-1">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-white text-lg">{t("pricing.vip.feature2")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 rounded-full p-1 mt-1">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-white text-lg">{t("pricing.vip.feature3")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 rounded-full p-1 mt-1">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-white text-lg">{t("pricing.vip.feature4")}</span>
                </div>
              </div>

              {/* CTA Button - DISABLED */}
              <div className="w-full bg-red-500/30 border border-red-500 text-red-400 font-bold text-lg py-6 mt-6 rounded-lg text-center cursor-not-allowed">
                SOLD OUT
              </div>
            </CardContent>
          </Card>

          {/* Virtual Admission Ticket with Free Ticket Option */}
          <div className="flex flex-col gap-4">
            {/* Free Ticket Card */}
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-400">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-black text-white mb-4" style={{ fontFamily: "Montserrat" }}>
                  {t("pricing.free.title") || "Free Ticket"}
                </CardTitle>
                <p className="text-gray-300 text-sm mb-6">{t("pricing.free.description") || "Follow us on social media and get a free virtual ticket!"}</p>
                <Button
                  onClick={() => setFreeTicketModalOpen(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-lg"
                >
                  {t("pricing.free.cta") || "Claim Free Ticket"}
                </Button>
              </CardHeader>
            </Card>

            {/* Virtual Admission Ticket */}
            <Card className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-2 border-orange-400 relative overflow-hidden flex-1">
              {/* Virtual Badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-400 to-amber-400 text-black font-bold px-6 py-2 text-sm transform rotate-12 translate-x-8 translate-y-2">
                {t("pricing.virtual.badge")}
              </div>

              <CardHeader className="text-center pt-12">
                <CardTitle className="text-3xl font-black text-white mb-4" style={{ fontFamily: "Montserrat" }}>
                  {t("pricing.virtual.title")}
                </CardTitle>
                <p className="text-gray-300 text-lg mb-6">{t("pricing.virtual.access")}</p>

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-5xl font-black text-white" style={{ fontFamily: "Montserrat" }}>
                      $30
                    </span>
                    <span className="text-2xl text-gray-500 line-through">$60</span>
                  </div>
                  <p className="text-sm text-gray-400 italic">(estimated 510 Mexican Pesos)</p>
                  <div className="inline-block bg-orange-500/20 border border-orange-400 rounded-full px-4 py-1">
                    <span className="text-orange-400 font-bold">{t("pricing.virtual.save")}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pb-8">
                {/* Features */}
                <div className="space-y-3 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-500 rounded-full p-1 mt-1">
                      <Check className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-white text-lg">{t("pricing.virtual.feature1")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-500 rounded-full p-1 mt-1">
                      <Check className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-white text-lg">{t("pricing.virtual.feature2")}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-black font-bold text-lg py-6 mt-6"
                  style={{ fontFamily: "Montserrat" }}
                  onClick={() => {
                    setSelectedTicketType("virtual");
                    setModalOpen(true);
                  }}
                >
                  {t("pricing.virtual.cta")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <TicketRegistrationModal open={modalOpen} onOpenChange={setModalOpen} ticketType={selectedTicketType} />
      <FreeTicketClaimModal open={freeTicketModalOpen} onOpenChange={setFreeTicketModalOpen} />
    </section>
  );
}
