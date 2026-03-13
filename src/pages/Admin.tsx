import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Download, Loader2, Users, Ticket, Mail, Search } from "lucide-react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = trpc.admin.getAllData.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });

  const filteredAttendees = useMemo(() => {
    if (!data?.attendees) return [];
    if (!searchQuery.trim()) return data.attendees;
    
    const query = searchQuery.toLowerCase();
    return data.attendees.filter(attendee => 
      attendee.name.toLowerCase().includes(query) ||
      attendee.email.toLowerCase().includes(query)
    );
  }, [data?.attendees, searchQuery]);

  const filteredTickets = useMemo(() => {
    if (!data?.tickets) return [];
    return data.tickets;
  }, [data?.tickets]);

  const filteredContactForms = useMemo(() => {
    if (!data?.contactForms) return [];
    if (!searchQuery.trim()) return data.contactForms;
    
    const query = searchQuery.toLowerCase();
    return data.contactForms.filter(form => 
      form.name.toLowerCase().includes(query) ||
      form.email.toLowerCase().includes(query)
    );
  }, [data?.contactForms, searchQuery]);

  const exportToCSV = (dataArray: any[], filename: string) => {
    if (!dataArray || dataArray.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = Object.keys(dataArray[0]);
    const csvContent = [
      headers.join(","),
      ...dataArray.map(row =>
        headers.map(header => {
          const value = row[header];
          if (value === null || value === undefined) return "";
          const stringValue = String(value);
          return stringValue.includes(",") ? `"${stringValue}"` : stringValue;
        }).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-slate-900 border-green-500/30 p-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-6">Please login to access the admin dashboard.</p>
            <Button
              onClick={() => window.location.href = getLoginUrl()}
              className="bg-green-500 hover:bg-green-400 text-black font-bold"
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-slate-900 border-red-500/30 p-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-6">You do not have permission to access this page.</p>
            <Button
              onClick={() => setLocation("/")}
              className="bg-green-500 hover:bg-green-400 text-black font-bold"
            >
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-slate-900 border-red-500/30 p-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">{error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: "Montserrat" }}>
              Admin Dashboard
            </h1>
            <p className="text-gray-400">SEO Guacamole Event Management</p>
          </div>
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            className="border-green-500/30 text-green-500 hover:bg-green-500/10"
          >
            Back to Home
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-900 border-green-500/30 text-white placeholder:text-gray-500 focus:border-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-900 border-green-500/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Attendees</CardTitle>
              <Users className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{data?.attendees.length || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-cyan-500/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Tickets</CardTitle>
              <Ticket className="w-4 h-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{data?.tickets.length || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-white/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Contact Forms</CardTitle>
              <Mail className="w-4 h-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{data?.contactForms.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="attendees" className="space-y-4">
          <TabsList className="bg-slate-900 border border-green-500/30">
            <TabsTrigger value="attendees" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              Attendees
            </TabsTrigger>
            <TabsTrigger value="tickets" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black">
              Tickets
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-white data-[state=active]:text-black">
              Contact Forms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendees">
            <Card className="bg-slate-900 border-green-500/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Attendee Registrations</CardTitle>
                <Button
                  onClick={() => exportToCSV(filteredAttendees, "attendees")}
                  className="bg-green-500 hover:bg-green-400 text-black font-bold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                {searchQuery && (
                  <p className="text-gray-400 text-sm mb-4">
                    Showing {filteredAttendees.length} of {data?.attendees.length || 0} attendees
                  </p>
                )}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-green-500/30">
                        <TableHead className="text-gray-400">ID</TableHead>
                        <TableHead className="text-gray-400">Name</TableHead>
                        <TableHead className="text-gray-400">Email</TableHead>
                        <TableHead className="text-gray-400">Phone</TableHead>
                        <TableHead className="text-gray-400">Registered At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAttendees.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                            No attendees found matching "{searchQuery}"
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredAttendees.map((attendee) => (
                          <TableRow key={attendee.id} className="border-green-500/20">
                            <TableCell className="text-white">{attendee.id}</TableCell>
                            <TableCell className="text-white">{attendee.name}</TableCell>
                            <TableCell className="text-white">{attendee.email}</TableCell>
                            <TableCell className="text-white">{attendee.phone || "N/A"}</TableCell>
                            <TableCell className="text-white">
                              {new Date(attendee.createdAt).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets">
            <Card className="bg-slate-900 border-cyan-500/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Ticket Purchases</CardTitle>
                <Button
                  onClick={() => exportToCSV(filteredTickets, "tickets")}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-cyan-500/30">
                        <TableHead className="text-gray-400">ID</TableHead>
                        <TableHead className="text-gray-400">Attendee ID</TableHead>
                        <TableHead className="text-gray-400">Ticket Type</TableHead>
                        <TableHead className="text-gray-400">Price</TableHead>
                        <TableHead className="text-gray-400">Status</TableHead>
                        <TableHead className="text-gray-400">Purchased At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.tickets.map((ticket) => (
                        <TableRow key={ticket.id} className="border-cyan-500/20">
                          <TableCell className="text-white">{ticket.id}</TableCell>
                          <TableCell className="text-white">{ticket.attendeeId}</TableCell>
                          <TableCell className="text-white">{ticket.ticketType}</TableCell>
                          <TableCell className="text-white">${ticket.price}</TableCell>
                          <TableCell className="text-white">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              ticket.status === "confirmed" ? "bg-green-500/20 text-green-500" :
                              ticket.status === "cancelled" ? "bg-red-500/20 text-red-500" :
                              "bg-yellow-500/20 text-yellow-500"
                            }`}>
                              {ticket.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-white">
                            {new Date(ticket.purchaseDate).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card className="bg-slate-900 border-white/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Contact Form Submissions</CardTitle>
                <Button
                  onClick={() => exportToCSV(filteredContactForms, "contact_forms")}
                  className="bg-white hover:bg-gray-200 text-black font-bold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                {searchQuery && (
                  <p className="text-gray-400 text-sm mb-4">
                    Showing {filteredContactForms.length} of {data?.contactForms.length || 0} contact forms
                  </p>
                )}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/30">
                        <TableHead className="text-gray-400">ID</TableHead>
                        <TableHead className="text-gray-400">Name</TableHead>
                        <TableHead className="text-gray-400">Email</TableHead>
                        <TableHead className="text-gray-400">Message</TableHead>
                        <TableHead className="text-gray-400">Submitted At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContactForms.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                            No contact forms found matching "{searchQuery}"
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredContactForms.map((form) => (
                          <TableRow key={form.id} className="border-white/20">
                            <TableCell className="text-white">{form.id}</TableCell>
                            <TableCell className="text-white">{form.name}</TableCell>
                            <TableCell className="text-white">{form.email}</TableCell>
                            <TableCell className="text-white max-w-md truncate">{form.message}</TableCell>
                            <TableCell className="text-white">
                              {new Date(form.createdAt).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
