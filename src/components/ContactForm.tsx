import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const createContactMutation = trpc.contactForms.create.useMutation({
    onSuccess: () => {
      toast.success(t("contact.success") || "Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    },
    onError: (error) => {
      toast.error(t("contact.error") || "Failed to send message. Please try again.");
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createContactMutation.mutate({ name, email, message });
  };

  return (
    <Card className="bg-slate-900/80 border-cyan-500/30 p-8">
      <h3 className="text-2xl font-bold text-white mb-6">
        {t("contact.title") || "Contact Us"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="contact-name" className="text-gray-300">
            {t("contact.name") || "Name"}
          </Label>
          <Input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-slate-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label htmlFor="contact-email" className="text-gray-300">
            {t("contact.email") || "Email"}
          </Label>
          <Input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-slate-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label htmlFor="message" className="text-gray-300">
            {t("contact.message") || "Message"}
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="bg-slate-800 border-gray-700 text-white"
          />
        </div>
        <Button
          type="submit"
          disabled={createContactMutation.isPending}
          className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-bold"
        >
          {createContactMutation.isPending
            ? (t("contact.submitting") || "Sending...")
            : (t("contact.submit") || "Send Message")}
        </Button>
      </form>
    </Card>
  );
}
