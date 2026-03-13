import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Location() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-slate-950 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-black text-white mb-16 text-center" style={{ fontFamily: "Montserrat" }}>
          {t("location.title")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/50 border-green-500/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">{t("location.name")}</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-sm uppercase font-bold mb-2">Address</p>
                  <p className="text-white text-lg">{t("location.address")}</p>
                  <p className="text-gray-400">{t("location.city")}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm uppercase font-bold mb-2">Date</p>
                  <p className="text-white text-lg">{t("location.date")}</p>
                  <p className="text-gray-400">{t("location.time")}</p>
                </div>

                <div className="inline-flex items-center gap-2 text-green-400 font-semibold mt-4">
                  {t("location.map")}
                  <i className="fas fa-arrow-right" />
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-slate-900/50 border-cyan-500/30 h-full overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.8234!2d-99.1658458!3d19.4135829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff452d82a217%3A0xe63695c7f9418c6c!2sRoma%20Conesa%20Hotel%20Boutique!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
