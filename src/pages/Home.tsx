import Hero from "@/components/Hero";
import Speakers from "@/components/Speakers";
import Agenda from "@/components/Agenda";
import Location from "@/components/Location";
import Tickets from "@/components/Tickets";
import Partners from "@/components/Partners";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

import Countdown from "@/components/Countdown";

import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <div className="min-h-screen bg-black pt-20">
      <Hero />

      <Countdown />

      <section className="py-20 bg-black border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 text-center" style={{ fontFamily: "Montserrat" }}>
              {t("about.title")}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed text-center mb-8" dangerouslySetInnerHTML={{ __html: t("about.description") }} />
            <p className="text-lg text-gray-400 leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: t("about.details") }} />
          </div>

          <div className="flex justify-center mb-8">
            <a
              href="https://youtube.com/playlist?list=PLE35XyTk9RsKOJm2bn4daRSaAwKZCMn1T&si=eyUwJ-DB3loDXaMb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-6 py-2 rounded-full border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
            >
              Meet Nestor →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Card className="bg-slate-900/50 border-green-500/30 p-6 text-center">
              <span className="block text-4xl font-bold text-white mb-2">5</span>
              <span className="text-sm text-gray-400 uppercase font-bold">{t("about.speakers")}</span>
            </Card>
            <Card className="bg-slate-900/50 border-cyan-500/30 p-6 text-center">
              <span className="block text-4xl font-bold text-white mb-2">4h</span>
              <span className="text-sm text-gray-400 uppercase font-bold">{t("about.duration")}</span>
            </Card>
            <Card className="bg-slate-900/50 border-green-400/30 p-6 text-center">
              <span className="block text-4xl font-bold text-white mb-2">+80</span>
              <span className="text-sm text-gray-400 uppercase font-bold">{t("about.attendees")}</span>
            </Card>
            <Card className="bg-slate-900/50 border-white/30 p-6 text-center">
              <span className="block text-4xl font-bold text-white mb-2">∞</span>
              <span className="text-sm text-gray-400 uppercase font-bold">{t("about.coffee")}</span>
            </Card>
          </div>
        </div>
      </section>

      <section id="speakers-section">
        <Speakers />
      </section>

      <Agenda />

      <Pricing />

      <Location />

      <Tickets />

      <Partners />

      <FAQ />

      <footer className="bg-slate-950 border-t border-white/10 py-12">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Social Media Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://x.com/seoguacamole"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label="Twitter/X"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-9.5 5M21 20.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/seo-guacamole/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@seo.guacamole"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label="TikTok"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02C12.3477 0 12.1695.0212 12 .0547V0h-.5C5.88 0 .474 5.338 .471 11.5c0 .052.002.104.005.156A11.996 11.996 0 0023.75 11.5c0-.5-.054-.988-.141-1.469-.087-.48-.21-.952-.368-1.41-.158-.458-.35-.905-.574-1.338.164.041.331.083.497.118.99.2 1.966.27 2.926.11 1.014-.173 1.964-.64 2.686-1.368.722-.728 1.189-1.678 1.362-2.692.173-1.014.1-1.99-.21-2.926-.31-.936-.92-1.751-1.728-2.303-.808-.552-1.804-.83-2.8-.83-.996 0-1.992.278-2.8.83-.808.552-1.418 1.367-1.728 2.303-.31.936-.383 1.912-.21 2.926.173 1.014.64 1.964 1.362 2.692.722.728 1.672 1.195 2.686 1.368.96.16 1.936.09 2.926-.11.166-.035.333-.077.497-.118-.224.433-.416.88-.574 1.338-.158.458-.281.93-.368 1.41-.087.481-.141.969-.141 1.469 0 6.162-5.406 11.5-12.074 11.5h-.5V23.453c.169.0335.3477.0547.525.0547 6.627 0 12-5.373 12-12S18.627.02 12.525.02z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/seoguacamole/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/seoguacamole/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@seoguacamole"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://www.pinterest.com/seoguacamole/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              aria-label="Pinterest"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4-4 1.79-4 4z" fill="currentColor" />
              </svg>
            </a>
          </div>
          {/* Copyright */}
          <p className="text-center text-gray-500">{t("footer.copyright")}</p>
        </div>
      </footer>
    </div>
    </>
  );
}
