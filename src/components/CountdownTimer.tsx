import { useEffect, useState } from "react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

interface CountdownTimerProps {
  eventDate: Date;
  eventName?: string;
}

export default function CountdownTimer({
  eventDate,
  eventName = "Event",
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const eventTime = eventDate.getTime();
      const difference = eventTime - now;

      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const TimeUnit = ({
    value,
    label,
  }: {
    value: number;
    label: string;
  }) => (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/50 rounded-lg p-4 min-w-20 flex items-center justify-center">
        <span className="text-3xl md:text-4xl font-bold text-green-400">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs md:text-sm text-gray-400 mt-2 uppercase font-semibold">
        {label}
      </span>
    </div>
  );

  if (timeRemaining.isExpired) {
    return (
      <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-green-400 mb-2">
          🎉 Event is Live!
        </h3>
        <p className="text-gray-300">
          The {eventName} is happening right now. See you there!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-green-500/30 rounded-lg p-8 backdrop-blur-sm">
        <h3 className="text-center text-lg md:text-xl font-bold text-white mb-8">
          Time Until {eventName} Begins
        </h3>

        <div className="grid grid-cols-4 gap-3 md:gap-4">
          <TimeUnit value={timeRemaining.days} label="Days" />
          <TimeUnit value={timeRemaining.hours} label="Hours" />
          <TimeUnit value={timeRemaining.minutes} label="Minutes" />
          <TimeUnit value={timeRemaining.seconds} label="Seconds" />
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Get ready for an amazing experience in SEO Strategy, Networking, and
            Coffee at the Rooftop Hotel Roma Conesa!
          </p>
        </div>
      </div>
    </div>
  );
}
