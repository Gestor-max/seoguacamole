import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Loader2, Calendar, MapPin, User, Mail, ArrowLeft, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function AttendeeTickets() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedTicket, setExpandedTicket] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  
  const downloadPDFMutation = trpc.tickets.downloadPDF.useMutation();
  
  // Add noindex meta tag to prevent search engine indexing
  useEffect(() => {
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'robots';
      newMeta.content = 'noindex, nofollow';
      document.head.appendChild(newMeta);
    }
    
    return () => {
      const meta = document.querySelector('meta[name="robots"]');
      if (meta) {
        meta.setAttribute('content', 'index, follow');
      }
    };
  }, []);

  const handleDownloadPDF = async (ticketId: number) => {
    try {
      setDownloadingId(ticketId);
      const result = await downloadPDFMutation.mutateAsync({ ticketId });
      
      // Decode base64 and create blob
      const binaryString = atob(result.pdf);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Ticket downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download ticket. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  // Fetch user's tickets
  const { data: tickets, isLoading: ticketsLoading } = trpc.tickets.getUserTickets.useQuery(
    undefined,
    {
      enabled: isAuthenticated && !authLoading,
    }
  );

  if (authLoading || ticketsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-green-400 animate-spin" />
          <p className="text-gray-400">Loading your tickets...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-8">
            You need to be logged in to view your tickets. Please log in to continue.
          </p>
          <Button
            onClick={() => setLocation("/")}
            className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Button
            onClick={() => setLocation("/")}
            variant="ghost"
            className="text-green-400 hover:text-green-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-2" style={{ fontFamily: "Montserrat" }}>
            My Tickets
          </h1>
          <p className="text-gray-400">
            Welcome, {user?.name}! Here are all your event tickets.
          </p>
        </div>

        {/* Tickets List */}
        {tickets && tickets.length > 0 ? (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="bg-slate-800/50 border border-green-500/30 hover:border-green-500/60 transition-all cursor-pointer"
                onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}
              >
                <div className="p-6">
                  {/* Ticket Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {ticket.ticketType === "general" ? "General Admission" : "VIP"}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                          {ticket.status === "confirmed" ? "✓ Confirmed" : "Pending"}
                        </span>
                        {ticket.currency && (
                          <span className="text-sm">
                            {ticket.currency === "USD" ? "$50 USD" : "$870 MXN"}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-sm">Ticket ID</p>
                      <p className="text-white font-mono font-bold">#{ticket.id}</p>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <User className="w-4 h-4 text-cyan-400" />
                      <span>{ticket.attendeeId}</span>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {expandedTicket === ticket.id && (
                    <div className="mt-6 pt-6 border-t border-green-500/20 space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-gray-500 text-sm uppercase font-bold mb-2">Event Date</p>
                          <div className="flex items-center gap-2 text-white">
                            <Calendar className="w-5 h-5 text-green-400" />
                            <span className="text-lg font-semibold">February 26, 2026</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm uppercase font-bold mb-2">Location</p>
                          <div className="flex items-center gap-2 text-white">
                            <MapPin className="w-5 h-5 text-green-400" />
                            <span className="text-lg font-semibold">Mexico City, MX</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="text-gray-500 text-sm uppercase font-bold mb-2">Event Details</p>
                        <p className="text-gray-300">
                          Join us for the SEO Guacamole Event - The SEO Conference, tacos and tequila, arrives in Mexico.
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          Strategy, Networking and Coffee at the Rooftop Hotel Roma Conesa.
                        </p>
                      </div>

                      {ticket.status === "confirmed" && (
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <p className="text-green-400 font-semibold mb-2">✓ Your ticket is confirmed</p>
                          <p className="text-green-300 text-sm">
                            You're all set! Check your email for confirmation details.
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-4">
                        <Button
                          className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
                          disabled={downloadingId === ticket.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadPDF(ticket.id);
                          }}
                        >
                          {downloadingId === ticket.id ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</>
                          ) : (
                            <><Download className="w-4 h-4 mr-2" />Download Ticket</>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-green-500/50 text-green-400 hover:bg-green-500/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Implement share ticket
                          }}
                        >
                          Share
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-slate-800/50 border border-green-500/30 p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">No Tickets Yet</h2>
            <p className="text-gray-400 mb-6">
              You haven't purchased any tickets yet. Get your ticket to the SEO Guacamole Event!
            </p>
            <Button
              onClick={() => setLocation("/")}
              className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white"
            >
              Browse Tickets
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
