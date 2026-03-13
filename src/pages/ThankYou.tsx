import { useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";


export default function ThankYou() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  // Extract session ID from URL
  const sessionId = new URLSearchParams(search).get("session_id");

  // Add noindex meta tag to prevent search engine indexing
  useEffect(() => {
    // Create or update the noindex meta tag
    let metaTag = document.querySelector('meta[name="robots"]');
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "robots");
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", "noindex, nofollow");

    // Update page title
    document.title = "Thank You - SEO Guacamole Event";

    // Cleanup: restore indexing on unmount (optional)
    return () => {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) {
        robotsMeta.setAttribute("content", "index, follow");
      }
    };
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full blur-2xl opacity-50"></div>
            <CheckCircle2 className="w-24 h-24 text-green-400 relative" />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "Montserrat" }}>
            Thank You!
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Your ticket registration is confirmed
          </p>
          <p className="text-gray-400 mb-8">
            We're excited to see you at the SEO Guacamole Event in Mexico City!
          </p>
        </div>



        {/* Details Card */}
        <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-8 mb-8 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-white mb-6">What's Next?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Check Your Email</h3>
                <p className="text-gray-400">
                  A confirmation email with your ticket details has been sent to your inbox
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <span className="text-cyan-400 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Save Your QR Code</h3>
                <p className="text-gray-400">
                  Download and save your QR code. You'll need it to check in at the event
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Follow Us</h3>
                <p className="text-gray-400">
                  Stay updated with event details by following our social media channels
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12">
          <CountdownTimer
            eventDate={new Date("2026-02-26T09:00:00")}
            eventName="SEO Guacamole Event"
          />
        </div>

        {/* Event Details */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <div className="bg-slate-900/50 border border-white/10 rounded-lg p-6 text-center">
            <p className="text-gray-400 text-sm uppercase font-bold mb-2">Date</p>
            <p className="text-white text-lg font-semibold">February 26, 2026</p>
          </div>
          <div className="bg-slate-900/50 border border-white/10 rounded-lg p-6 text-center">
            <p className="text-gray-400 text-sm uppercase font-bold mb-2">Location</p>
            <p className="text-white text-lg font-semibold">Mexico City, MX</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            size="lg"
            className="border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            Back to Home
          </Button>
          <Button
            onClick={() => window.open("https://www.instagram.com/seonestor/", "_blank")}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white"
          >
            Follow Us on Instagram
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Questions? Contact us at{" "}
            <a href="mailto:hola@nestorvazquez.com" className="text-green-400 hover:text-green-300">
              hola@nestorvazquez.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
