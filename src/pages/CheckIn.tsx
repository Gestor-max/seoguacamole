import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, AlertCircle, Camera } from "lucide-react";

export default function CheckIn() {
  const [scannedCode, setScannedCode] = useState<string>("");
  const [checkInStatus, setCheckInStatus] = useState<"idle" | "success" | "error">("idle");
  const [attendeeInfo, setAttendeeInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on input for barcode scanner
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleScan = async (code: string) => {
    if (!code.trim()) return;

    setLoading(true);
    setCheckInStatus("idle");

    try {
      // Extract ticket ID from QR code data
      // Format: TICKET_{ticketId}_{timestamp}
      const parts = code.split("_");
      if (parts.length !== 3 || parts[0] !== "TICKET") {
        setCheckInStatus("error");
        setAttendeeInfo({ error: "Invalid QR code format" });
        setLoading(false);
        return;
      }

      const ticketId = parseInt(parts[1], 10);
      if (isNaN(ticketId)) {
        setCheckInStatus("error");
        setAttendeeInfo({ error: "Invalid ticket ID" });
        setLoading(false);
        return;
      }

      // Call your tRPC procedure to check in the attendee
      // For now, we'll simulate a successful check-in
      setCheckInStatus("success");
      setAttendeeInfo({
        ticketId,
        name: "John Doe",
        email: "john@example.com",
        ticketType: "General Admission",
      });

      // Clear input after successful scan
      setScannedCode("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 2000);
    } catch (error) {
      console.error("Check-in failed:", error);
      setCheckInStatus("error");
      setAttendeeInfo({ error: "Failed to process check-in" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setScannedCode(value);

    // Auto-submit when barcode scanner finishes (usually ends with Enter)
    if (value.includes("\n") || value.length > 50) {
      handleScan(value.trim());
      setScannedCode("");
    }
  };

  const handleManualSubmit = () => {
    handleScan(scannedCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "Montserrat" }}>
            Event Check-In
          </h1>
          <p className="text-xl text-gray-300">
            Scan attendee QR codes to check them in
          </p>
        </div>

        {/* Scanner Input */}
        <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-8 mb-8 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-green-400" />
            <label className="text-white font-semibold">Scan QR Code</label>
          </div>
          <Input
            ref={inputRef}
            type="text"
            value={scannedCode}
            onChange={handleInputChange}
            placeholder="Point barcode scanner here or paste QR code data"
            className="bg-slate-900/50 border-cyan-500/30 text-white placeholder-gray-500 mb-4"
            disabled={loading}
          />
          <Button
            onClick={handleManualSubmit}
            disabled={!scannedCode || loading}
            className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white"
          >
            {loading ? "Processing..." : "Check In"}
          </Button>
        </div>

        {/* Status Messages */}
        {checkInStatus === "success" && attendeeInfo && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-green-400 font-bold text-lg mb-2">Check-In Successful!</h3>
                <div className="space-y-1 text-green-300">
                  <p><strong>Name:</strong> {attendeeInfo.name}</p>
                  <p><strong>Email:</strong> {attendeeInfo.email}</p>
                  <p><strong>Ticket Type:</strong> {attendeeInfo.ticketType}</p>
                  <p><strong>Ticket ID:</strong> #{attendeeInfo.ticketId}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {checkInStatus === "error" && attendeeInfo && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-red-400 font-bold text-lg mb-2">Check-In Failed</h3>
                <p className="text-red-300">{attendeeInfo.error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-slate-800/50 border border-white/10 rounded-lg p-6">
          <h3 className="text-white font-bold mb-4">Instructions</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Use a barcode scanner to scan attendee QR codes</li>
            <li>• Or paste the QR code data manually and click "Check In"</li>
            <li>• Each attendee can only be checked in once</li>
            <li>• Successful check-ins will show a green confirmation message</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
