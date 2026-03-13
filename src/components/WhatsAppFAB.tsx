export default function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/529612645760"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:hidden z-50 group"
      aria-label="Contact us on WhatsApp"
    >
      {/* Floating button with official WhatsApp green */}
      <div className="relative">
        {/* Pulse animation background */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-30 group-hover:opacity-50 transition-opacity"></div>
        
        {/* Main button */}
        <div className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
          {/* Official WhatsApp logo */}
          <svg
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a6.963 6.963 0 00-6.957 6.961 6.96 6.96 0 001.018 3.541l-1.083 3.951 4.039-1.06a6.946 6.946 0 003.33.847h.005c3.837 0 6.957-3.12 6.961-6.961a6.946 6.946 0 00-2.043-4.918 6.936 6.936 0 00-4.918-2.032m11.949-1.01c-5.528-5.528-14.5-5.528-20.028 0-5.528 5.528-5.528 14.5 0 20.028 5.528 5.528 14.5 5.528 20.028 0 5.528-5.528 5.528-14.5 0-20.028" />
          </svg>
        </div>
      </div>
    </a>
  );
}
