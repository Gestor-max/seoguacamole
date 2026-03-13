import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const partners = [
  {
    name: "WhitePress",
    logo: "https://www.whitepress.com/web/images/common/logo-black-red.svg",
    url: "https://www.whitepress.com/es/"
  }
];

const odysBrand = {
  name: "Odys Marketplace",
  logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322702325/tMjOqJcLaVKYRVTV.png",
  url: "https://odys.global/marketplace?utm_source=mx_fb"
};

export default function Partners() {
  const { t } = useLanguage();

  return (
    <section className="bg-black py-24 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-wider" style={{ fontFamily: "Montserrat" }}>
            {t("partners.title")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 ml-2">
              {t("partners.subtitle")}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto rounded-full" />
        </div>

        <div className="flex justify-center max-w-5xl mx-auto mb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="w-full max-w-sm"
            >
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity"
              >
                <Card className="bg-white p-8 rounded-xl flex items-center justify-center h-40 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-24 w-auto object-contain"
                  />
                </Card>
              </a>
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-16">
          <a
            href={odysBrand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity"
          >
            <img
              src={odysBrand.logo}
              alt={odysBrand.name}
              className="max-h-20 w-auto object-contain"
            />
          </a>
        </div>

        <div className="border-t border-white/10 pt-10 text-center">
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold mb-8">{t("partners.media")}</p>
          <div className="flex flex-wrap justify-center gap-10 items-center">
            <a
              href="https://gggroup.media/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-16 w-40 flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663322702325/iEeryfJWcFytCBXa.jpg"
                alt="GG Group Media"
                className="max-h-16 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
