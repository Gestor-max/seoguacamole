import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const speakers = [
  {
    name: "Aleksandar Manok",
    titleKey: "speakers.aleksandar.title",
    bioKey: "speakers.aleksandar.bio",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322702325/oIQBjuAtUlEilLoJ.jpg",
    accentColor: "#4a90e2",
    socials: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/seo-hero/", icon: "fab fa-linkedin" },
      { platform: "website", url: "https://odys.global/marketplace?utm_source=mx_fb", icon: "fas fa-globe" }
    ]
  },
  {
    name: "Jimena Sainz",
    titleKey: "speakers.jimena.title",
    bioKey: "speakers.jimena.bio",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663322702325/tXVpnDUgJxQKtYYf.jpg",
    accentColor: "#ff9966",
    socials: [
      { platform: "instagram", url: "#", icon: "fab fa-instagram" },
      { platform: "linkedin", url: "#", icon: "fab fa-linkedin" },
      { platform: "twitter", url: "#", icon: "fab fa-twitter" }
    ]
  },
  {
    name: "Miguel Rodriguez",
    titleKey: "speakers.miguel.title",
    bioKey: "speakers.miguel.bio",
    image: "https://marketsolutions.click/miguel-avatar.png",
    accentColor: "#ff6b35",
    socials: []
  },
  {
    name: "Eduardo Bortolotti Lopez",
    titleKey: "speakers.eduardo.title",
    bioKey: "speakers.eduardo.bio",
    image: "https://marketsolutions.click/eduardo-b-avatar.png",
    accentColor: "#ff00ff",
    socials: []
  },
  {
    name: "Nestor Vazquez",
    titleKey: "speakers.nestor.title",
    bioKey: "speakers.nestor.bio",
    image: "https://marketsolutions.click/nestor-avatar.png",
    accentColor: "#00ffff",
    socials: [
      { platform: "instagram", url: "https://www.instagram.com/seonestor/", icon: "fab fa-instagram" },
      { platform: "linkedin", url: "https://www.linkedin.com/in/nestorvazquez/", icon: "fab fa-linkedin" },
      { platform: "twitter", url: "https://twitter.com/seonestor", icon: "fab fa-twitter" }
    ]
  }
];

export default function Speakers() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-slate-950 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6" style={{ fontFamily: "Montserrat" }}>
            {t("speakers.title")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 ml-3">
              {t("speakers.subtitle")}
            </span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {speakers.map((speaker, index) => (
            <Card
              key={index}
              className="bg-slate-900/50 border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 group hover:shadow-2xl hover:shadow-green-500/10"
            >
              <div className="h-80 lg:h-96 w-full overflow-hidden border-b border-white/10 bg-gray-900">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8 relative">
                <div
                  className="absolute top-0 left-0 w-full h-1.5"
                  style={{
                    background: `linear-gradient(to right, ${speaker.accentColor}, #00ffff)`
                  }}
                />
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{speaker.name}</h3>
                <p
                  className="text-sm font-bold uppercase tracking-wider mb-6"
                  style={{ color: speaker.accentColor }}
                >
                  {t(speaker.titleKey)}
                </p>
                <p className="text-gray-400 text-sm lg:text-base leading-relaxed mb-6">
                  {t(speaker.bioKey)}
                </p>
                <div className="flex gap-4 pt-4 border-t border-white/10">
                  {speaker.socials.length > 0 ? (
                    speaker.socials.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-cyan-400 transition-colors"
                        title={social.platform}
                      >
                        <i className={`${social.icon} text-xl`} />
                      </a>
                    ))
                  ) : (
                    <>
                      <div className="text-gray-500 hover:text-green-400 transition-colors cursor-pointer">
                        <i className="fab fa-linkedin text-xl" />
                      </div>
                      <div className="text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer">
                        <i className="fas fa-globe text-xl" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
