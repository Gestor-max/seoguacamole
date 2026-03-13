import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();

  const faqs = [
    { questionKey: "faq.general.q1", answerKey: "faq.general.a1" },
    { questionKey: "faq.general.q2", answerKey: "faq.general.a2" },
    { questionKey: "faq.general.q3", answerKey: "faq.general.a3" },
    { questionKey: "faq.general.q4", answerKey: "faq.general.a4" }
  ];

  return (
    <section className="py-24 bg-black border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6" style={{ fontFamily: "Montserrat" }}>
            {t("faq.title")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 ml-3">
              {t("faq.subtitle")}
            </span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 text-lg">{t("faq.description")}</p>
        </div>

        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 lg:p-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                <AccordionTrigger className="text-left text-base lg:text-lg font-semibold text-white hover:text-green-400 py-6">
                  {t(faq.questionKey)}
                </AccordionTrigger>
                <AccordionContent className="text-sm lg:text-base text-gray-400 leading-relaxed pb-6">
                  <div dangerouslySetInnerHTML={{ __html: t(faq.answerKey) }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
