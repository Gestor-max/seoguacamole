import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { toast } from "sonner";

export default function AttendeeRegistrationForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission (frontend only)
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(t("registration.success") || "Registration successful!");
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      toast.error(t("registration.error") || "Registration failed. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-slate-900/80 border-green-500/30 p-8">
      <h3 className="text-2xl font-bold text-white mb-6">
        {t("registration.title") || "Register for the Event"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-300">
            {t("registration.name") || "Name"}
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-slate-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-gray-300">
            {t("registration.email") || "Email"}
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-slate-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-gray-300">
            {t("registration.phone") || "Phone (Optional)"}
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-slate-800 border-gray-700 text-white"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black font-bold"
        >
          {isSubmitting
            ? (t("registration.submitting") || "Submitting...")
            : (t("registration.submit") || "Register Now")}
        </Button>
      </form>
    </Card>
  );
}
