import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Add noindex meta tag to prevent search engine indexing
  useEffect(() => {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, []);

  const createContactMutation = trpc.contactForms.create.useMutation({
    onSuccess: () => {
      toast.success(t("contact.form.success"));
      setName("");
      setEmail("");
      setMessage("");
    },
    onError: (error) => {
      toast.error(t("contact.form.error"));
      console.error("Contact form error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createContactMutation.mutate({ name, email, message });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-black to-slate-900">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 
              className="text-5xl lg:text-7xl font-black text-white mb-6"
              style={{ fontFamily: "Montserrat" }}
            >
              {t("contact.title")}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t("contact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="bg-slate-900/50 border-green-500/30">
              <CardHeader>
                <CardTitle 
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {t("contact.form.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t("contact.form.name")}
                    </label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-slate-800 border-gray-700 text-white"
                      placeholder={t("contact.form.namePlaceholder")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t("contact.form.email")}
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-slate-800 border-gray-700 text-white"
                      placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t("contact.form.message")}
                    </label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={6}
                      className="bg-slate-800 border-gray-700 text-white"
                      placeholder={t("contact.form.messagePlaceholder")}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={createContactMutation.isPending}
                    className="w-full bg-gradient-to-r from-green-400 to-cyan-400 hover:from-green-500 hover:to-cyan-500 text-black font-bold text-lg py-6"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {createContactMutation.isPending
                      ? t("contact.form.sending")
                      : t("contact.form.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-slate-900/50 border-cyan-500/30">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-cyan-500/20 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {t("contact.info.email")}
                      </h3>
                      <p className="text-gray-300">hola@nestorvazquez.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-green-500/30">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/20 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {t("contact.info.phone")}
                      </h3>
                      <div className="flex flex-col gap-3">
                        <a
                          href="tel:+529612645760"
                          className="text-gray-300 hover:text-green-400 transition"
                        >
                          +52 9612645760
                        </a>
                        <a
                          href="https://wa.me/529612645760"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition w-fit"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span>{t("contact.info.whatsapp")}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-white/30">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {t("contact.info.location")}
                      </h3>
                      <p className="text-gray-300">
                        Mexico City, CDMX<br />
                        Mexico
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-16">
            <Card className="bg-slate-900/50 border-cyan-500/30 overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.8234!2d-99.1658458!3d19.4135829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff452d82a217%3A0xe63695c7f9418c6c!2sRoma%20Conesa%20Hotel%20Boutique!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/10 py-12">
        <div className="container mx-auto px-6 lg:px-12 text-center text-gray-500">
          <p>{t("footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
}
