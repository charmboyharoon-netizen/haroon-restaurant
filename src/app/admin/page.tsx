"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard, ShoppingBag, Calendar, BedDouble, Users,
  TrendingUp, Clock, CheckCircle, XCircle, AlertCircle,
  Search, RefreshCw, Eye, ChevronLeft, ChevronRight,
  DollarSign, Utensils
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { formatPrice } from "@/lib/utils";

type Tab = "overview" | "orders" | "reservations" | "rooms" | "contacts" | "menu";

interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
}

interface Reservation {
  id: number;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  createdAt: string;
}

interface RoomBooking {
  id: number;
  guestName: string;
  guestPhone: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface DashboardStats {
  orders: { total: number; pending: number; completed: number; revenue: number };
  reservations: { total: number; pending: number; confirmed: number };
  rooms: { total: number; pending: number; revenue: number };
  contacts: { total: number };
}

const revenueData = [
  { month: "Jan", revenue: 1200000, orders: 45 },
  { month: "Fév", revenue: 1800000, orders: 62 },
  { month: "Mar", revenue: 1500000, orders: 53 },
  { month: "Avr", revenue: 2100000, orders: 71 },
  { month: "Mai", revenue: 2400000, orders: 84 },
  { month: "Jun", revenue: 2800000, orders: 95 },
  { month: "Juil", revenue: 3200000, orders: 108 },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
  completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusLabels: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmé",
  completed: "Terminé",
  cancelled: "Annulé",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}>
      {statusLabels[status] || status}
    </span>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [rooms, setRooms] = useState<RoomBooking[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<any | null>(null);
  const [newMenuItem, setNewMenuItem] = useState({
  name: "",
  nameEn: "",
  description: "",
  price: "",
  category: "",
  image: "",
});

const addMenuItem = async () => {
  try {
    const res = await fetch(
      editingMenuItem
        ? `/api/menu?id=${editingMenuItem.id}`
        : "/api/menu",
      {
        method: editingMenuItem ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMenuItem),
      }
    );

    const data = await res.json();

    if (editingMenuItem) {
      setMenuItems(
        menuItems.map((item) =>
          item.id === editingMenuItem.id ? data : item
        )
      );
      setEditingMenuItem(null);
    } else {
      setMenuItems([...menuItems, data]);
    }

    setShowMenuForm(false);

    setNewMenuItem({
      name: "",
      nameEn: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
  } catch (error) {
    console.error("Failed to save menu item:", error);
  }
};
const deleteMenuItem = async (id: number) => {
  try {
    await fetch(`/api/menu?id=${id}`, {
      method: "DELETE",
    });

    setMenuItems(menuItems.filter((item) => item.id !== id));

  } catch (error) {
    console.error("Failed to delete menu item:", error);
  }
};


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [ordersRes, reservationsRes, roomsRes, contactsRes, menuRes] = await Promise.all([
  fetch("/api/admin/orders"),
  fetch("/api/admin/reservations"),
  fetch("/api/admin/rooms"),
  fetch("/api/admin/contacts"),
  fetch("/api/menu"),
]); 

      const [ordersData, reservationsData, roomsData, contactsData, menuData] = await Promise.all([
        ordersRes.json(),
        reservationsRes.json(),
        roomsRes.json(),
        contactsRes.json(),
        menuRes.json(),
      ]);

      console.log("ORDERS:", ordersData);
console.log("RESERVATIONS:", reservationsData);
console.log("ROOMS:", roomsData);
console.log("CONTACTS:", contactsData);

      setOrders(ordersData);
      setReservations(reservationsData);
      setRooms(roomsData);
      setContacts(contactsData);
      setMenuItems(menuData);

      setStats({
        orders: {
          total: ordersData.length,
          pending: ordersData.filter((o: Order) => o.status === "pending").length,
          completed: ordersData.filter((o: Order) => o.status === "completed").length,
          revenue: ordersData.reduce((sum: number, o: Order) => sum + o.totalAmount, 0),
        },
        reservations: {
          total: reservationsData.length,
          pending: reservationsData.filter((r: Reservation) => r.status === "pending").length,
          confirmed: reservationsData.filter((r: Reservation) => r.status === "confirmed").length,
        },
        rooms: {
          total: roomsData.length,
          pending: roomsData.filter((r: RoomBooking) => r.status === "pending").length,
          revenue: roomsData.reduce((sum: number, r: RoomBooking) => sum + r.totalAmount, 0),
        },
        contacts: { total: contactsData.length },
      });
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateOrderStatus = async (id: number, status: string) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  const updateReservationStatus = async (id: number, status: string) => {
    await fetch(`/api/admin/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  const tabs = [
    { id: "overview" as Tab, label: "Vue d'ensemble", icon: LayoutDashboard },
    { id: "orders" as Tab, label: "Commandes", icon: ShoppingBag, count: stats?.orders.pending },
    { id: "reservations" as Tab, label: "Réservations", icon: Calendar, count: stats?.reservations.pending },
    { id: "rooms" as Tab, label: "Chambres", icon: BedDouble, count: stats?.rooms.pending },
    { id: "contacts" as Tab, label: "Messages", icon: Users, count: stats?.contacts.total },
    { id: "menu" as Tab, label: "Menu", icon: Utensils },
  ];

  return (
    <div className="min-h-screen bg-[#080A0D]">
      {/* Top Bar */}
      <div className="bg-[#0F1115] border-b border-[#D4AF37]/10 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0B3D2E] to-[#1a6b4e] border border-[#D4AF37]/30 flex items-center justify-center">
              <span className="text-[#D4AF37] font-bold text-[10px]">DA</span>
            </div>
            <span className="text-white font-bold text-sm hidden sm:block" style={{ fontFamily: "'Playfair Display', serif" }}>
              Admin Dashboard
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          </button>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs transition-colors"
          >
            <ChevronLeft size={14} />
            Voir le site
          </Link>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-16 sm:w-56 bg-[#0F1115] border-r border-[#D4AF37]/10 min-h-[calc(100vh-65px)] sticky top-[65px] flex flex-col p-3 sm:p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    activeTab === tab.id
                      ? "bg-[#0B3D2E]/50 text-[#D4AF37] border border-[#D4AF37]/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:block">{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="ml-auto hidden sm:flex w-5 h-5 bg-[#D4AF37] text-[#0F1115] text-[10px] font-bold rounded-full items-center justify-center">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Vue d&apos;ensemble
              </h1>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Revenus Commandes",
                    value: formatPrice(stats?.orders.revenue || 0),
                    sub: `${stats?.orders.total || 0} commandes`,
                    icon: DollarSign,
                    color: "from-[#0B3D2E] to-[#1a6b4e]",
                  },
                  {
                    label: "Réservations",
                    value: stats?.reservations.total || 0,
                    sub: `${stats?.reservations.pending || 0} en attente`,
                    icon: Calendar,
                    color: "from-blue-900 to-blue-700",
                  },
                  {
                    label: "Revenus Chambres",
                    value: formatPrice(stats?.rooms.revenue || 0),
                    sub: `${stats?.rooms.total || 0} réservations`,
                    icon: BedDouble,
                    color: "from-purple-900 to-purple-700",
                  },
                  {
                    label: "Messages",
                    value: stats?.contacts.total || 0,
                    sub: "Contacts reçus",
                    icon: Users,
                    color: "from-orange-900 to-orange-700",
                  },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#141720] border border-[#D4AF37]/10 rounded-2xl p-5"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                        <Icon size={18} className="text-white" />
                      </div>
                      <p className="text-gray-400 text-xs mb-1">{card.label}</p>
                      <p className="text-white font-bold text-xl">{card.value}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{card.sub}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#141720] border border-[#D4AF37]/10 rounded-2xl p-5">
                  <h3 className="text-white font-semibold mb-4 text-sm">Revenus mensuels (GNF)</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1A1D24" />
                      <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#141720", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "12px", color: "#fff" }}
                        formatter={(v) => [formatPrice(Number(v)), "Revenus"]}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-[#141720] border border-[#D4AF37]/10 rounded-2xl p-5">
                  <h3 className="text-white font-semibold mb-4 text-sm">Commandes par mois</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1A1D24" />
                      <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#6B7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#141720", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "12px", color: "#fff" }} />
                      <Bar dataKey="orders" fill="#0B3D2E" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-[#141720] border border-[#D4AF37]/10 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-4 text-sm">Commandes Récentes</h3>
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-[#0F1115]/50 rounded-xl">
                      <div>
                        <p className="text-white text-sm font-medium">{order.customerName}</p>
                        <p className="text-gray-400 text-xs">{order.customerPhone}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#D4AF37] text-sm font-bold">{formatPrice(order.totalAmount)}</p>
                        <StatusBadge status={order.status || "pending"} />
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">Aucune commande pour le moment</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Commandes</h1>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="bg-[#141720] border border-[#D4AF37]/20 rounded-xl pl-8 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 w-48"
                  />
                </div>
              </div>

              <div className="bg-[#141720] border border-[#D4AF37]/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#D4AF37]/10">
                        {["#", "Client", "Téléphone", "Montant", "Paiement", "Statut", "Date", "Actions"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-gray-400 text-xs font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.filter(o => !searchQuery || o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || o.customerPhone.includes(searchQuery)).map((order) => (
                        <tr key={order.id} className="border-b border-[#D4AF37]/5 hover:bg-white/2 transition-colors">
                          <td className="px-4 py-3 text-gray-400 text-xs">#{String(order.id).padStart(5, "0")}</td>
                          <td className="px-4 py-3 text-white text-sm font-medium">{order.customerName}</td>
                          <td className="px-4 py-3 text-gray-400 text-sm">{order.customerPhone}</td>
                          <td className="px-4 py-3 text-[#D4AF37] text-sm font-bold">{formatPrice(order.totalAmount)}</td>
                          <td className="px-4 py-3 text-gray-400 text-xs capitalize">{order.paymentMethod}</td>
                          <td className="px-4 py-3"><StatusBadge status={order.status || "pending"} /></td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{order.createdAt ? new Date(order.createdAt).toLocaleDateString("fr-FR") : "-"}</td>
                          <td className="px-4 py-3">
                            <select
                              defaultValue={order.status || "pending"}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="bg-[#0F1115] border border-[#D4AF37]/20 text-white text-xs rounded-lg px-2 py-1 focus:outline-none"
                            >
                              <option value="pending">En attente</option>
                              <option value="confirmed">Confirmé</option>
                              <option value="completed">Terminé</option>
                              <option value="cancelled">Annulé</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {orders.length === 0 && (
                    <div className="text-center py-12 text-gray-500">Aucune commande trouvée</div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Reservations Tab */}
          {activeTab === "reservations" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Réservations</h1>
              <div className="bg-[#141720] border border-[#D4AF37]/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#D4AF37]/10">
                        {["#", "Nom", "Téléphone", "Date", "Heure", "Personnes", "Statut", "Actions"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-gray-400 text-xs font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((r) => (
                        <tr key={r.id} className="border-b border-[#D4AF37]/5 hover:bg-white/2 transition-colors">
                          <td className="px-4 py-3 text-gray-400 text-xs">#{String(r.id).padStart(5, "0")}</td>
                          <td className="px-4 py-3 text-white text-sm font-medium">{r.name}</td>
                          <td className="px-4 py-3 text-gray-400 text-sm">{r.phone}</td>
                          <td className="px-4 py-3 text-gray-300 text-sm">{r.date}</td>
                          <td className="px-4 py-3 text-gray-300 text-sm">{r.time}</td>
                          <td className="px-4 py-3 text-gray-300 text-sm">{r.guests}</td>
                          <td className="px-4 py-3"><StatusBadge status={r.status || "pending"} /></td>
                          <td className="px-4 py-3">
                            <select
                              defaultValue={r.status || "pending"}
                              onChange={(e) => updateReservationStatus(r.id, e.target.value)}
                              className="bg-[#0F1115] border border-[#D4AF37]/20 text-white text-xs rounded-lg px-2 py-1 focus:outline-none"
                            >
                              <option value="pending">En attente</option>
                              <option value="confirmed">Confirmé</option>
                              <option value="completed">Terminé</option>
                              <option value="cancelled">Annulé</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {reservations.length === 0 && (
                    <div className="text-center py-12 text-gray-500">Aucune réservation trouvée</div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Rooms Tab */}
          {activeTab === "rooms" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Réservations Chambres</h1>
              <div className="bg-[#141720] border border-[#D4AF37]/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#D4AF37]/10">
                        {["#", "Client", "Téléphone", "Chambre", "Check-in", "Check-out", "Montant", "Statut"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-gray-400 text-xs font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.map((r) => (
                        <tr key={r.id} className="border-b border-[#D4AF37]/5 hover:bg-white/2 transition-colors">
                          <td className="px-4 py-3 text-gray-400 text-xs">#{String(r.id).padStart(5, "0")}</td>
                          <td className="px-4 py-3 text-white text-sm font-medium">{r.guestName}</td>
                          <td className="px-4 py-3 text-gray-400 text-sm">{r.guestPhone}</td>
                          <td className="px-4 py-3 text-gray-300 text-sm">{r.roomType}</td>
                          <td className="px-4 py-3 text-gray-300 text-sm">{r.checkIn}</td>
                          <td className="px-4 py-3 text-gray-300 text-sm">{r.checkOut}</td>
                          <td className="px-4 py-3 text-[#D4AF37] font-bold text-sm">{formatPrice(r.totalAmount)}</td>
                          <td className="px-4 py-3"><StatusBadge status={r.status || "pending"} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {rooms.length === 0 && (
                    <div className="text-center py-12 text-gray-500">Aucune réservation de chambre</div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Menu Tab */}
{activeTab === "menu" && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <div className="flex items-center justify-between">
  <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
    Gestion du Menu
  </h1>

 <button
  onClick={() => setShowMenuForm(true)}
  className="bg-[#D4AF37] text-black px-4 py-2 rounded-xl font-semibold"
>
  + Ajouter un plat
</button>
</div>
{showMenuForm && (
  <div className="bg-[#141720] border border-[#D4AF37]/10 rounded-2xl p-5 space-y-4">

    <h2 className="text-white text-xl font-semibold">
      Ajouter un plat
    </h2>

    <input
      placeholder="Nom du plat"
      className="w-full bg-black/20 text-white p-3 rounded-xl"
      value={newMenuItem.name}
      onChange={(e) =>
        setNewMenuItem({
          ...newMenuItem,
          name: e.target.value,
        })
      }
    />

    <input
      placeholder="Nom en anglais"
      className="w-full bg-black/20 text-white p-3 rounded-xl"
      value={newMenuItem.nameEn}
      onChange={(e) =>
        setNewMenuItem({
          ...newMenuItem,
          nameEn: e.target.value,
        })
      }
    />

    <textarea
      placeholder="Description"
      className="w-full bg-black/20 text-white p-3 rounded-xl"
      value={newMenuItem.description}
      onChange={(e) =>
        setNewMenuItem({
          ...newMenuItem,
          description: e.target.value,
        })
      }
    />

    <input
      placeholder="Prix"
      type="number"
      className="w-full bg-black/20 text-white p-3 rounded-xl"
      value={newMenuItem.price}
      onChange={(e) =>
        setNewMenuItem({
          ...newMenuItem,
          price: e.target.value,
        })
      }
    />

    <input
      placeholder="Catégorie"
      className="w-full bg-black/20 text-white p-3 rounded-xl"
      value={newMenuItem.category}
      onChange={(e) =>
        setNewMenuItem({
          ...newMenuItem,
          category: e.target.value,
        })
      }
    />
<button
  onClick={addMenuItem}
  className="bg-[#D4AF37] text-black px-5 py-3 rounded-xl font-semibold"
>
  Enregistrer le plat
</button>

  </div>
)}

    <div className="grid gap-4">
      {menuItems.map((item) => (
        <div key={item.id} className="bg-[#141720] border border-[#D4AF37]/10 rounded-2xl p-5">
          <p className="text-white font-semibold">{item.name}</p>
          <p className="text-gray-400 text-sm">{item.description}</p>
          <p className="text-[#D4AF37] mt-2">{item.price} GNF</p>
          <div className="flex gap-3 mt-4">
 <button
  onClick={() => deleteMenuItem(item.id)}
  className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl"
>
  Supprimer
</button>

  <button
  onClick={() => {
    setEditingMenuItem(item);
    setNewMenuItem({
      name: item.name,
      nameEn: item.nameEn || "",
      description: item.description || "",
      price: item.price.toString(),
      category: item.category || "",
      image: item.image || "",
    });
    setShowMenuForm(true);
  }}
  className="bg-[#D4AF37]/20 text-[#D4AF37] px-4 py-2 rounded-xl"
>
  Modifier
</button>
</div>
        </div>
      ))}

      {menuItems.length === 0 && (
        <div className="bg-[#141720] border border-[#D4AF37]/10 rounded-2xl p-12 text-center text-gray-500">
          Aucun élément du menu
        </div>
      )}
    </div>
  </motion.div>
)}

          {/* Contacts Tab */}
          {activeTab === "contacts" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Messages de Contact</h1>
              <div className="grid gap-4">
                {contacts.map((c) => (
                  <div key={c.id} className="bg-[#141720] border border-[#D4AF37]/10 rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-white font-semibold">{c.name}</p>
                        <p className="text-gray-400 text-xs">{c.email} · {c.phone}</p>
                      </div>
                      {c.subject && (
                        <span className="bg-[#0B3D2E]/50 text-[#D4AF37] border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-full text-xs">
                          {c.subject}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm">{c.message}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString("fr-FR") : ""}
                    </p>
                  </div>
                ))}
                {contacts.length === 0 && (
                  <div className="bg-[#141720] border border-[#D4AF37]/10 rounded-2xl p-12 text-center text-gray-500">
                    Aucun message de contact
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
