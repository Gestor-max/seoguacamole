import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const agendaItems = [
  {
    time: "16:00",
    titleKey: "agenda.16_00",
    descKey: "agenda.16_00.desc",
    speaker: null,
    speakerTitleKey: null,
    detailsKey: null,
    color: "#00ffff",
    hasModal: false,
  },
  {
    time: "16:30",
    titleKey: "agenda.16_30.aleksandar",
    descKey: "agenda.16_30.aleksandar.desc",
    speaker: "Aleksandar Manok",
    speakerTitleKey: "agenda.16_30.aleksandar.speaker",
    detailsKey: null,
    color: "#4a90e2",
    hasModal: true,
    modalTitleKey: "agenda.16_30.aleksandar.modal.title",
    modalDescKey: "agenda.16_30.aleksandar.modal.description",
  },
  {
    time: "17:15",
    titleKey: "agenda.16_45",
    descKey: "agenda.16_45.desc",
    speaker: "Jimena Sainz",
    speakerTitleKey: "agenda.16_45.speaker",
    detailsKey: null,
    color: "#ff9966",
    hasModal: false,
  },
  {
    time: "17:45",
    titleKey: "agenda.17_30",
    descKey: "agenda.17_30.desc",
    speaker: "Miguel Rodriguez",
    speakerTitleKey: "agenda.17_30.speaker",
    detailsKey: null,
    color: "#ff6b35",
    hasModal: false,
  },
  {
    time: "18:30",
    titleKey: "agenda.18_30",
    descKey: "agenda.18_30.desc",
    speaker: null,
    speakerTitleKey: null,
    detailsKey: null,
    color: "#c27c4e",
    hasModal: false,
  },
  {
    time: "19:00",
    titleKey: "agenda.17_45",
    descKey: "agenda.17_45.desc",
    speaker: "Eduardo Bortolotti Lopez",
    speakerTitleKey: "agenda.17_45.speaker",
    detailsKey: null,
    color: "#ff00ff",
    hasModal: true,
    modalTitleKey: "agenda.17_45.modal.title",
    modalDescKey: "agenda.17_45.modal.description",
  },
  {
    time: "19:30",
    titleKey: "agenda.19_30",
    descKey: "agenda.19_30.desc",
    speaker: "Nestor Vazquez",
    speakerTitleKey: "agenda.19_30.speaker",
    detailsKey: null,
    color: "#00ffff",
    hasModal: false,
  },
  {
    time: "20:15",
    titleKey: "agenda.20_15",
    descKey: "agenda.20_15.desc",
    speaker: null,
    speakerTitleKey: null,
    detailsKey: null,
    color: "#ff00ff",
    hasModal: false,
  },
];

export default function Agenda() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModalIndex, setSelectedModalIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-black border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12">
        <h2
          className="text-4xl font-black text-white mb-4 text-center"
          style={{ fontFamily: "Montserrat" }}
        >
          {t("agenda.title")}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 ml-2">
            {t("agenda.subtitle")}
          </span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mb-16 rounded-full" />

        <div className="max-w-4xl mx-auto relative pl-4">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-cyan-400 to-green-400" />

          {agendaItems.map((item, index) => (
            <div key={index} className="relative pl-12 pb-12 group">
              <div
                className="absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-black flex items-center justify-center z-10 transition-all duration-300"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 20px ${item.color}80`,
                }}
              >
                {item.speaker ? (
                  <i className="fas fa-microphone text-black text-xs" />
                ) : item.time === "10:45" ? (
                  <i className="fas fa-mug-hot text-black text-xs" />
                ) : (
                  <i className="fas fa-circle text-black text-xs" />
                )}
              </div>

              <Card
                className={`bg-slate-900/50 border-white/10 p-6 cursor-pointer transition-all duration-300 hover:border-white/30 ${
                  expandedIndex === index ? "border-white/30" : ""
                }`}
                onClick={() => {
                  if (item.hasModal) {
                    setModalOpen(true);
                    setSelectedModalIndex(index);
                  } else {
                    setExpandedIndex(expandedIndex === index ? null : index);
                  }
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div
                    className="md:w-24 font-mono font-bold text-lg"
                    style={{ color: item.color }}
                  >
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-1">
                      {t(item.titleKey)}
                    </h4>
                    <p className="text-gray-400">{t(item.descKey)}</p>
                    {item.detailsKey && expandedIndex === index && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-gray-300 leading-relaxed">
                          {t(item.detailsKey)}
                        </p>
                      </div>
                    )}
                  </div>
                  {(item.detailsKey || item.hasModal) && (
                    <div className="text-gray-500 hover:text-white transition">
                      <i
                        className={`fas fa-chevron-${
                          expandedIndex === index || (item.hasModal && modalOpen)
                            ? "up"
                            : "down"
                        }`}
                      />
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {selectedModalIndex !== null &&
        agendaItems[selectedModalIndex]?.hasModal && (
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="bg-slate-900 border-white/20 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">
                  {t(agendaItems[selectedModalIndex].modalTitleKey || "")}
                </DialogTitle>
                <DialogDescription className="text-gray-300 mt-4 text-base leading-relaxed">
                  {t(agendaItems[selectedModalIndex].modalDescKey || "")}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: agendaItems[selectedModalIndex].color,
                  }}
                />
                <span className="text-gray-400 font-mono">
                  {agendaItems[selectedModalIndex].time}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-white font-semibold">
                  {agendaItems[selectedModalIndex].speaker}
                </span>
              </div>
            </DialogContent>
          </Dialog>
        )}
    </section>
  );
}
