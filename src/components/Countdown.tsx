import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const { t } = useLanguage();
  const eventDate = new Date("2026-02-26T09:00:00-06:00"); // CDMX timezone (UTC-6)

  const calculateTimeLeft = (): TimeLeft => {
    const difference = eventDate.getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-slate-950 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2
            className="text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            {t("countdown.title")}
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            {t("countdown.subtitle")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-xl p-8 backdrop-blur-sm">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-2">
                {timeLeft.days.toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-gray-400 uppercase font-bold tracking-wider">
                {t("countdown.days")}
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/20 to-green-500/20 border border-cyan-500/30 rounded-xl p-8 backdrop-blur-sm">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-2">
                {timeLeft.hours.toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-gray-400 uppercase font-bold tracking-wider">
                {t("countdown.hours")}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-xl p-8 backdrop-blur-sm">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-2">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-gray-400 uppercase font-bold tracking-wider">
                {t("countdown.minutes")}
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/20 to-green-500/20 border border-cyan-500/30 rounded-xl p-8 backdrop-blur-sm">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-2">
                {timeLeft.seconds.toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-gray-400 uppercase font-bold tracking-wider">
                {t("countdown.seconds")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
