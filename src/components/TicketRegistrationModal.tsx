import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface TicketRegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketType?: "vip" | "virtual" | "regular";
}

export default function TicketRegistrationModal({ open, onOpenChange, ticketType = "regular" }: TicketRegistrationModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    couponCode: "",
    currency: "USD" as "USD" | "MXN",
    hearAboutUs: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Determine ticket type and pricing based on props
  const getTicketInfo = () => {
    if (ticketType === "virtual") {
      return {
        type: "VIRTUAL_ADMISSION",
        title: t("modal.title.virtual") || "Virtual Admission",
        usdPrice: "$30",
        mnxPrice: "$510",
        borderColor: "border-orange-500/30",
        bgColor: "bg-slate-900",
        buttonColor: "bg-orange-500",
        isSoldOut: false
      };
    }
    return {
      type: "GENERAL_ADMISSION",
      title: t("modal.title.vip") || "General Admission",
      usdPrice: "$50",
      mnxPrice: "$870",
      borderColor: "border-green-500/30",
      bgColor: "bg-slate-900",
      buttonColor: "bg-green-500",
      isSoldOut: true
    };
  };

  const ticketInfo = getTicketInfo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (ticketInfo.isSoldOut) {
      toast.error(t("modal.soldOut") || "This ticket type is sold out");
      return;
    }
    
    if (!formData.name || !formData.email || !formData.phone || !formData.hearAboutUs) {
      toast.error(t("registration.fillAll"));
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate checkout (frontend only)
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(t("registration.redirectingToCheckout") || "Registration submitted successfully!");
      setFormData({ name: "", email: "", phone: "", couponCode: "", currency: "USD", hearAboutUs: "" });
      onOpenChange(false);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(t("registration.error") || "An error occurred");
      setIsProcessing(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-[500px] ${ticketInfo.bgColor} ${ticketInfo.borderColor}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {ticketInfo.title}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {t("modal.description") || "Complete your registration to purchase your ticket"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">{t("registration.name")}</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-800 border-green-500/30 text-white"
              placeholder={t("registration.namePlaceholder") || "Your name"}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">{t("registration.email")}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-800 border-green-500/30 text-white"
              placeholder={t("registration.emailPlaceholder") || "your@email.com"}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">{t("registration.phone")}</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-slate-800 border-green-500/30 text-white"
              placeholder={t("registration.phonePlaceholder") || "+1 (555) 000-0000"}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coupon" className="text-white">{t("registration.coupon") || "Promo Code"} (Optional)</Label>
            <Input
              id="coupon"
              type="text"
              value={formData.couponCode}
              onChange={(e) => setFormData({ ...formData, couponCode: e.target.value.toUpperCase() })}
              className="bg-slate-800 border-green-500/30 text-white uppercase"
              placeholder={t("registration.couponPlaceholder") || "Enter promo code"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hearAboutUs" className="text-white">Where did you hear from us?</Label>
            <select
              id="hearAboutUs"
              value={formData.hearAboutUs}
              onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value })}
              className="w-full bg-slate-800 border border-green-500/30 text-white rounded-md px-3 py-2 focus:outline-none focus:border-green-500"
              required
            >
              <option value="">Select an option</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">Twitter</option>
              <option value="google_search">Google Search</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="tiktok">TikTok</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency" className="text-white">{t("registration.currency") || "Currency"}</Label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, currency: "USD" })}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                  formData.currency === "USD"
                    ? `${ticketInfo.buttonColor} text-black`
                    : "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700"
                }`}
              >
                USD ({ticketInfo.usdPrice})
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, currency: "MXN" })}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                  formData.currency === "MXN"
                    ? `${ticketInfo.buttonColor} text-black`
                    : "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700"
                }`}
              >
                MXN ({ticketInfo.mnxPrice})
              </button>
            </div>
          </div>

          <div className={`bg-slate-800/50 p-4 rounded-lg ${ticketInfo.borderColor}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">{t("modal.ticketType")}</span>
              <span className="text-white font-bold">{ticketInfo.title}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{t("modal.price")}</span>
              <span className="text-2xl font-bold" style={{ color: ticketType === "virtual" ? "#fb923c" : "#4ade80" }}>
                {formData.currency === "USD" ? `${ticketInfo.usdPrice} USD` : `${ticketInfo.mnxPrice} MXN`}
              </span>
            </div>
            {formData.couponCode && (
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-cyan-500/20">
                <span className="text-gray-400">{t("modal.discount") || "Discount (10%)"}</span>
                <span className="text-lg font-bold text-green-400">
                  {formData.currency === "USD" ? "-$5 USD" : "-$87 MXN"}
                </span>
              </div>
            )}
          </div>

          {ticketInfo.isSoldOut ? (
            <div className="w-full bg-red-500/20 border border-red-500/50 text-red-400 font-bold py-6 text-lg rounded-lg text-center">
              {t("modal.soldOut") || "SOLD OUT"}
            </div>
          ) : (
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black font-bold py-6 text-lg"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("modal.processing") || "Processing..."}
                </div>
              ) : (
                t("modal.submit") || "Complete Registration"
              )}
            </Button>
          )}

          <p className="text-xs text-gray-500 text-center">
            {t("modal.securePayment") || "Secure payment powered by Stripe"}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
