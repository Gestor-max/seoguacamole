import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, MessageCircle, Twitter, Linkedin, Facebook, Youtube } from "lucide-react";

interface FreeTicketClaimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FreeTicketClaimModal({ open, onOpenChange }: FreeTicketClaimModalProps) {
  const { t } = useLanguage();

  const socialPlatforms = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/seoguacamole/",
      color: "bg-pink-500 hover:bg-pink-600",
      username: "@seoguacamole"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com/seoguacamole",
      color: "bg-blue-400 hover:bg-blue-500",
      username: "@seoguacamole"
    },
    {
      name: "TikTok",
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 5.1-1.82V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.96-.1z" />
        </svg>
      ),
      url: "https://www.tiktok.com/@seoguacamole",
      color: "bg-black hover:bg-gray-800",
      username: "@seoguacamole"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/company/seo-guacamole/",
      color: "bg-blue-700 hover:bg-blue-800",
      username: "SEO Guacamole"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/seoguacamole/",
      color: "bg-blue-600 hover:bg-blue-700",
      username: "@seoguacamole"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@seoguacamole",
      color: "bg-red-600 hover:bg-red-700",
      username: "@seoguacamole"
    }
  ];

  const handleFollowAndClaim = (platform: string) => {
    // Open social platform in new tab
    const platformData = socialPlatforms.find(p => p.name === platform);
    if (platformData) {
      window.open(platformData.url, "_blank");
    }
  };

  const handleWhatsAppDM = () => {
    const message = encodeURIComponent("Hola! Acabo de seguir tu cuenta en redes sociales. Me gustaría reclamar mi ticket gratuito para SEO Guacamole.");
    window.open(`https://wa.me/529612645760?text=${message}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-slate-900 border-cyan-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-400">
            {t("freeTicket.title") || "Get Your Free Ticket"}
          </DialogTitle>
          <DialogDescription className="text-gray-300 mt-2">
            {t("freeTicket.description") || "Follow us on social media and claim your free virtual ticket!"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Step 1: Follow Instructions */}
          <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-4">
            <h3 className="font-semibold text-cyan-400 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500 text-slate-900 text-sm font-bold">1</span>
              {t("freeTicket.step1") || "Follow Us"}
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              {t("freeTicket.step1Desc") || "Click on any platform below to follow our account:"}
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <button
                    key={platform.name}
                    onClick={() => handleFollowAndClaim(platform.name)}
                    className={`${platform.color} text-white p-3 rounded-lg transition-all hover:scale-105 flex items-center justify-center`}
                    title={`Follow on ${platform.name}`}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Send DM */}
          <div className="bg-slate-800/50 border border-green-500/20 rounded-lg p-4">
            <h3 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-slate-900 text-sm font-bold">2</span>
              {t("freeTicket.step2") || "Send Proof"}
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              {t("freeTicket.step2Desc") || "Send us a screenshot or DM proof that you followed:"}
            </p>
            <Button
              onClick={handleWhatsAppDM}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              {t("freeTicket.sendViaWhatsapp") || "Send via WhatsApp"}
            </Button>
          </div>

          {/* Step 3: Receive Ticket */}
          <div className="bg-slate-800/50 border border-orange-500/20 rounded-lg p-4">
            <h3 className="font-semibold text-orange-400 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-slate-900 text-sm font-bold">3</span>
              {t("freeTicket.step3") || "Get Your Ticket"}
            </h3>
            <p className="text-sm text-gray-300">
              {t("freeTicket.step3Desc") || "We'll verify your follow and send you a free ticket code within 24 hours!"}
            </p>
          </div>
        </div>

        <Button
          onClick={() => onOpenChange(false)}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-cyan-500/30"
        >
          {t("freeTicket.close") || "Close"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
