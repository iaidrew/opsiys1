import * as React from "react";
import { 
  Search, 
  ArrowRight, 
  Bot, 
  MessageSquare, 
  Zap, 
  LineChart, 
  Workflow,
  CheckCircle2,
  Menu,
  X,
  Mail,
  User,
  Building2,
  Wallet,
  Twitter,
  Github,
  Linkedin,
  LogIn,
  LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { signInWithGoogle, logout, auth, submitLead, updateProfile, getUserProfile, subscribeToUserLeads } from "./lib/firebase.ts";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

/**
 * BRAND COLORS:
 * Primary: #0B0B0B (Black)
 * Soft Red: #E53935
 * Accent: #A1A1AA (Gray)
 */

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- Components ---

// --- Shared Components ---

const Logo = () => (
  <div className="flex items-center group cursor-pointer h-12">
    <img 
      src="/assets/opsiyslogo.png" 
      alt="OPSIYS" 
      className="h-full w-auto block transition-opacity hover:opacity-80" 
      
    />
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating Pill Navigation */}
      <div className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 md:px-6 flex justify-center pointer-events-none">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-2 md:px-3 py-1.5 md:py-2 rounded-full border transition-all duration-700 max-w-[95vw] sm:max-w-none group",
            scrolled 
              ? "bg-black/95 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/5" 
              : "bg-[#0B0B0B]/90 backdrop-blur-md border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
          )}
        >
          {/* Logo Section */}
          <div className="pl-3 pr-1 transition-all duration-500">
            <Logo />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {["Systems", "Process", "Discovery"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className={cn(
                  "px-4 py-2 text-[12px] font-bold uppercase tracking-widest transition-all duration-300 rounded-full",
                  "text-zinc-400 hover:text-white hover:bg-white/10"
                )}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA / Mobile Toggle */}
          <div className="flex items-center gap-1.5 md:gap-2 pr-1.5">
            <a href="#contact" className="hidden sm:block">
              <Button 
                size="sm" 
                className={cn(
                  "rounded-full px-6 h-9 transition-all duration-500 font-bold text-[11px] uppercase tracking-wider",
                  "bg-white text-black hover:bg-zinc-200"
                )}
              >
                Book a Call
              </Button>
            </a>

            <button 
              className={cn(
                "md:hidden w-9 h-9 flex items-center justify-center rounded-full shrink-0 transition-all duration-500",
                scrolled ? "bg-white text-black" : "bg-black text-white"
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Modern Fullscreen/Overlay Menu for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] bg-black p-6 md:hidden flex flex-col justify-center"
          >
            <button 
              className="absolute top-8 right-8 text-white p-2 border border-white/20 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="flex flex-col gap-8">
              {["Systems", "Process", "Discovery"].map((item, idx) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-extrabold text-white tracking-tighter hover:text-accent transition-colors"
                >
                  {item}
                </motion.a>
              ))}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a href="#contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-white text-black hover:bg-accent hover:text-white rounded-none py-8 text-xl font-bold">
                    Book a Call
                  </Button>
                </a>
              </motion.div>
            </div>
            
            <div className="absolute bottom-12 left-6 right-6 flex justify-between items-end border-t border-white/10 pt-8">
              <div className="text-white/40 text-xs font-bold tracking-widest uppercase">
                OPSIYS Systems © 2026
              </div>
              <div className="flex gap-4">
                <Twitter className="text-white/40" size={20} />
                <Linkedin className="text-white/40" size={20} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AuthPortal = () => {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [portalOpen, setPortalOpen] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showHistory, setShowHistory] = React.useState(false);
  const [profile, setProfile] = React.useState<any>(null);
  const [leads, setLeads] = React.useState<any[]>([]);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const p = await getUserProfile(currentUser.uid);
        setProfile(p || { displayName: currentUser.displayName || "", company: "", role: "", industry: "" });
      } else {
        setProfile(null);
        setLeads([]);
      }
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (!user || !showHistory) return;

    const unsubscribe = subscribeToUserLeads(user.uid, (fetchedLeads) => {
      setLeads(fetchedLeads);
    });

    return () => unsubscribe();
  }, [user, showHistory]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    try {
      await updateProfile(user.uid, profile);
      setShowSettings(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') return;
      console.error("Authentication Error:", error);
    }
  };

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-8 z-[70]">
      {user ? (
        <div className="relative">
          <motion.button 
            whileHover={{ scale: 1.05, borderColor: "black" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPortalOpen(!portalOpen)}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] ring-1 ring-black/5 transition-all cursor-pointer bg-white flex items-center justify-center p-0"
          >
            <img src={user.photoURL || ""} alt={user.displayName || ""} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </motion.button>

          <AnimatePresence>
            {portalOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-72 bg-white border border-zinc-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] p-0 rounded-2xl overflow-hidden"
              >
                <div className="p-6 space-y-6 text-black">
                  <div className="flex items-center gap-4 pb-6 border-b border-zinc-50">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-zinc-100 p-0.5">
                      <img src={user.photoURL || ""} alt={user.displayName || ""} referrerPolicy="no-referrer" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-black truncate leading-tight uppercase tracking-tight">
                        {profile?.displayName || user.displayName}
                      </p>
                      <p className="text-[10px] text-zinc-400 truncate font-bold">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <button 
                      onClick={() => {
                        setShowSettings(true);
                        setPortalOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-zinc-50 transition-colors flex items-center justify-between group/link"
                    >
                      <span className="flex items-center gap-3"><User size={14} className="text-zinc-400 group-hover/link:text-black transition-colors" /> Account Settings</span>
                      <ArrowRight size={12} className="opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                    </button>
                    <button 
                      onClick={() => {
                        setShowHistory(true);
                        setPortalOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-zinc-50 transition-colors flex items-center justify-between group/link"
                    >
                      <span className="flex items-center gap-3"><Workflow size={14} className="text-zinc-400 group-hover/link:text-black transition-colors" /> Project History</span>
                      <ArrowRight size={12} className="opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                    </button>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      logout();
                      setPortalOpen(false);
                    }}
                    className="w-full rounded-full h-11 border-zinc-200 hover:border-black hover:bg-black hover:text-white transition-all text-[10px] font-extrabold uppercase tracking-[0.2em] text-black"
                  >
                    <LogOut size={14} className="mr-2" /> Sign Out
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button 
            onClick={handleSignIn}
            className="bg-black/90 hover:bg-black text-white hover:scale-105 active:scale-95 transition-all rounded-full h-10 md:h-11 px-5 md:px-7 text-[10px] font-extrabold uppercase tracking-widest shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
          >
            <LogIn size={16} className="mr-2" /> 
            <span className="hidden sm:inline">Partner Portal</span>
            <span className="sm:hidden">Login</span>
          </Button>
        </motion.div>
      )}

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white max-w-md w-full relative z-10 shadow-2xl border border-border p-8 rounded-none overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Account Management</h3>
                <button onClick={() => setShowSettings(false)} className="text-muted-foreground hover:text-black">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <User size={12} /> Pro Account Name
                    </label>
                    <Input 
                      value={profile?.displayName || ""} 
                      onChange={e => setProfile({...profile, displayName: e.target.value})}
                      className="rounded-none focus-visible:ring-0" 
                      placeholder="Enter legal name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Building2 size={12} /> Company
                      </label>
                      <Input 
                        value={profile?.company || ""} 
                        onChange={e => setProfile({...profile, company: e.target.value})}
                        className="rounded-none focus-visible:ring-0" 
                        placeholder="Organization"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Mail size={12} /> Industry
                      </label>
                      <Input 
                        value={profile?.industry || ""} 
                        onChange={e => setProfile({...profile, industry: e.target.value})}
                        className="rounded-none focus-visible:ring-0" 
                        placeholder="Sector"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => setShowSettings(false)} className="rounded-none font-bold text-xs uppercase tracking-widest">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving} className="bg-black text-white rounded-none px-8 font-bold text-xs uppercase tracking-widest min-w-[120px]">
                    {isSaving ? "Saving..." : "Update Portal"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white max-w-2xl w-full relative z-10 shadow-2xl border border-border p-8 rounded-none overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Project History</h3>
                <button onClick={() => setShowHistory(false)} className="text-muted-foreground hover:text-black">
                  <X size={24} />
                </button>
              </div>

              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  {leads.length > 0 ? (
                    leads.map((lead, i) => (
                      <div key={lead.id || i} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-zinc-100 hover:border-black transition-colors bg-zinc-50/50">
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                            {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently Submitted"}
                          </p>
                          <h4 className="font-extrabold text-lg tracking-tight uppercase">{lead.projectType || "General Inquiry"}</h4>
                          <p className="text-xs text-muted-foreground uppercase tracking-tighter truncate max-w-[250px]">{lead.message}</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <Badge 
                            variant={lead.status === 'qualified' ? 'secondary' : 'outline'} 
                            className={cn(
                              "rounded-none font-bold uppercase text-[9px] tracking-widest px-3",
                              lead.status === 'new' && "border-accent text-accent",
                              lead.status === 'contacted' && "border-blue-500 text-blue-500",
                              lead.status === 'qualified' && "bg-emerald-500 text-white border-none"
                            )}
                          >
                            {lead.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-zinc-100 text-muted-foreground bg-zinc-50/30">
                      <p className="text-xs font-bold uppercase tracking-widest">No project history found</p>
                    </div>
                  )}
                  
                  {leads.length > 0 && (
                    <div className="text-center py-8 border-t border-zinc-100 text-muted-foreground mt-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em]">End of Transmission</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="mt-8 flex justify-end">
                <Button onClick={() => setShowHistory(false)} className="bg-black text-white rounded-none px-12 font-bold text-[10px] uppercase tracking-[0.2em]">
                  Close Panel
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  const [index, setIndex] = React.useState(0);
  const words = ["systems", "workflows", "agents", "logic"];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-24 pb-16 lg:pt-56 lg:pb-40 px-4 md:px-6 overflow-hidden bg-[#FAFAFA] relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(circle, #000 1.5px, transparent 1.5px)`,
          backgroundSize: '64px 64px' 
        }} 
      />

      {/* Subtle Background Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-accent/10 to-transparent blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-6 md:space-y-8"
        >
          <motion.div variants={fadeIn} className="space-y-3 md:space-y-4">
            <Badge variant="outline" className="rounded-full px-4 py-1 text-[10px] md:text-xs border-accent/20 text-accent bg-accent/5 backdrop-blur-sm">
              Efficiency Redefined
            </Badge>
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95]">
              We build AI <br/>
              <span className="relative inline-block min-w-[180px] xs:min-w-[220px] sm:min-w-[280px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="text-accent absolute left-0"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
                <span className="opacity-0">{words[0]}</span> {/* Spacer */}
              </span>
              <br/>
              that run your business
            </h1>
          </motion.div>
          
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
            Automation, workflows, and scalable operations designed for high-performance teams. Clarity over complexity.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-wrap gap-3 md:gap-4">
            <a href="#contact">
              <Button size="lg" className="bg-black hover:bg-black/90 text-white rounded-none px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold transform transition-transform active:scale-95">
                Book a Call <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </a>
            <a href="#systems">
              <Button variant="outline" size="lg" className="rounded-none px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold border-2 border-black hover:bg-black hover:text-white transition-all duration-300">
                Explore Systems
              </Button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative mt-8 lg:mt-0 max-w-xl mx-auto lg:max-w-none w-full"
        >
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative z-10 bg-white border border-border shadow-2xl rounded-xl p-6 sm:p-10 overflow-hidden transform-gpu"
          >
            <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
              <div className="flex gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-red-400" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-400" />
              </div>
              <div className="text-[11px] font-mono font-bold text-muted-foreground flex items-center gap-3">
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"
                />
                SYSTEM_OPERATIONS_ACTIVE
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                { label: "AI Lead Enrichment", status: "Active", width: "w-full" },
                { label: "WhatsApp CRM Sync", status: "Processing", width: "w-2/3", color: "bg-accent" },
                { label: "Workflow Optimization", status: "Complete", width: "w-5/6" },
                { label: "Internal Agent Bot", status: "Active", width: "w-3/4" }
              ].map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex justify-between text-[13px] font-bold">
                    <span>{item.label}</span>
                    <span className={cn(idx === 1 ? "text-accent" : "text-black", "uppercase tracking-tighter")}>{item.status}</span>
                  </div>
                  <div className="h-2.5 bg-secondary w-full rounded-full overflow-hidden border border-black/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: item.width.split('-')[1] === 'full' ? '100%' : item.width.split('-')[1] === '2/3' ? '66%' : item.width.split('-')[1] === '5/6' ? '83%' : '75%' }}
                      transition={{ duration: 1.5, delay: 0.5 + idx * 0.2 }}
                      className={cn("h-full", item.color ?? "bg-black")}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-10 p-6 bg-zinc-50 rounded-lg border border-zinc-100 shadow-inner"
            >
              <div className="flex items-center gap-4">
                <Zap className="text-accent w-6 h-6 animate-pulse" />
                <div>
                  <div className="text-base font-black tracking-tight">Operational Efficiency</div>
                  <div className="text-xs text-muted-foreground font-medium">Verified gain of +42.8% since logic deployment</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Subtle Background Elements */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-0" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-black/5 rounded-full blur-2xl -z-0" />
        </motion.div>
      </div>
    </section>
  );
};

const Trust = () => {
  const logos = ["LINEAR", "VERCEL", "STRIPE", "REPLICATE", "LANCER", "ANTHROPIC", "OPENAI", "NOTION"];
  
  return (
    <section className="py-12 border-y border-border bg-white overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
      
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Trusted by Innovative Operations Teams
        </p>
      </div>

      <div className="flex overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-16 items-center whitespace-nowrap"
        >
          {[...logos, ...logos].map((logo, idx) => (
            <div key={idx} className="text-2xl font-bold tracking-tighter opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 px-4">
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const systems = [
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "AI Automation Systems",
      desc: "End-to-end business logic automated with state-of-the-art AI agents."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "WhatsApp Automation",
      desc: "Smart CRM integrations and customer interaction bots that feel human."
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "Lead Generation Systems",
      desc: "Cold outreach and lead qualification systems that scale your sales pipeline."
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "Internal Workflow AI",
      desc: "Custom internal tools to help your team focus on high-impact work."
    }
  ];

  return (
    <section id="systems" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <h2 className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4">Core Systems</h2>
          <p className="text-4xl font-extrabold tracking-tight">Structured automation for modern business.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {systems.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeIn}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="p-8 border border-border group hover:border-black transition-all duration-500 space-y-6 bg-white relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-500" />
              <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-sm transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                {item.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Understand your workflow",
      desc: "We dive deep into your manual bottlenecks and paper-trails."
    },
    {
      num: "02",
      title: "Design system",
      desc: "Architecting a custom AI-first logic that fits your operations."
    },
    {
      num: "03",
      title: "Automate & integrate",
      desc: "Building and connecting the tools to your existing stack."
    },
    {
      num: "04",
      title: "Scale",
      desc: "Monitoring, refining, and scaling the system to match growth."
    }
  ];

  return (
    <section id="process" className="py-24 px-6 bg-[#0B0B0B] text-white overflow-hidden relative">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-xs font-bold text-accent uppercase tracking-[0.2em]">The Blueprint</h2>
            <p className="text-4xl md:text-5xl font-extrabold tracking-tight">How we turn chaos into systems.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-sm"
          >
            <p className="text-zinc-400 text-sm">
              Our process is rigorous and outcome-driven. We don't just 'do AI'—we build operational infrastructure.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-zinc-800 -z-0" />
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              className="space-y-6 relative z-10 group flex flex-col items-center md:items-start text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-accent flex items-center justify-center font-bold text-sm text-white rounded-none group-hover:scale-110 transition-transform duration-300">
                {step.num}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors duration-300">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const ToolDiscovery = () => {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const tools = [
    // Agency Proprietary Systems
    { name: "FlowGenie", cat: "Operations", use: "Autonomous revenue operations and workflow orchestration.", status: "Agency", highlight: true, url: "#" },
    { name: "SalesBridge", cat: "Sales", use: "Lead-to-deal pipeline orchestration with AI nurturing.", status: "Agency", highlight: true, url: "#" },
    { name: "DeepEnrich", cat: "Data", use: "Precision lead data enrichment utilizing neural scrapers.", status: "Agency", highlight: true, url: "#" },
    
    // Large Language Models
    { name: "GPT-4o", cat: "Intelligence", use: "Multi-modal foundation model for complex reasoning and logic.", status: "External", url: "https://chatgpt.com" },
    { name: "Claude 3.5 Sonnet", cat: "Intelligence", use: "High-accuracy LLM focused on coding and creative writing.", status: "External", url: "https://claude.ai" },
    { name: "Gemini 1.5 Pro", cat: "Intelligence", use: "Massive context window AI for enterprise-scale data analysis.", status: "External", url: "https://gemini.google.com" },
    
    // Productivity & Creative
    { name: "Midjourney v6", cat: "Creative", use: "State-of-the-art photorealistic image generation workflows.", status: "External", url: "https://midjourney.com" },
    { name: "Jasper", cat: "Marketing", use: "Enterprise-grade content generation for scaling brand voice.", status: "External", url: "https://jasper.ai" },
    { name: "Canva Magic", cat: "Creative", use: "AI-powered design suite for instant visual asset creation.", status: "External", url: "https://canva.com" },
    { name: "Notion AI", cat: "Productivity", use: "Integrated workspace intelligence for docs and project management.", status: "External", url: "https://notion.ai" },
    
    // Agents & Automation
    { name: "Zapier Central", cat: "Operations", use: "Autonomous agents that connect with 6000+ business apps.", status: "External", url: "https://zapier.com" },
    { name: "AutoGPT", cat: "Agents", use: "Semi-autonomous agent framework for multi-step task completion.", status: "OpenSource", url: "https://github.com/Significant-Gravitas/AutoGPT" },
    { name: "Make", cat: "Operations", use: "Advanced visual automation platform for complex integrations.", status: "External", url: "https://make.com" },
    
    // Search & Data
    { name: "Perplexity", cat: "Search", use: "Real-time answer engine with cited sources and logic checks.", status: "External", url: "https://perplexity.ai" },
    { name: "Tableau AI", cat: "Data", use: "Predictive analytics and automated data storytelling for ROI.", status: "External", url: "https://tableau.com" },
    { name: "Copy.ai", cat: "Marketing", use: "GTM (Go-to-Market) automation platform for sales teams.", status: "External", url: "https://copy.ai" },
    
    // Coding & Development
    { name: "Cursor", cat: "Development", use: "AI-native IDE that understands entire codebases natively.", status: "External", url: "https://cursor.com" },
    { name: "GitHub Copilot", cat: "Development", use: "The world's most widely adopted AI pair programmer.", status: "External", url: "https://github.com/features/copilot" }
  ];

  const [search, setSearch] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");

  const filteredTools = tools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(search.toLowerCase()) || 
      tool.use.toLowerCase().includes(search.toLowerCase()) ||
      tool.cat.toLowerCase().includes(search.toLowerCase());
    
    const matchesTab = 
      activeTab === "all" || 
      tool.cat.toLowerCase() === activeTab.toLowerCase() ||
      (activeTab === "proprietary" && tool.status === "Agency");
      
    return matchesSearch && matchesTab;
  });

  const categories = ["All", "Proprietary", "Intelligence", "Operations", "Sales", "Creative", "Data", "Development"];

  return (
    <section id="discovery" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight">AI Tool Discovery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A curated repository of state-of-the-art AI systems. From proprietary agency workflows to global foundation models, we help you discover and integrate the right logic into your stack.
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col gap-6 items-center">
            <div className="relative w-full max-w-3xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search by tool name, use case, or stack category..." 
                className="pl-12 py-7 rounded-none border-2 border-zinc-100 focus-visible:ring-0 focus-visible:border-black transition-all bg-zinc-50/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" className="w-full overflow-x-auto" onValueChange={setActiveTab}>
              <ScrollArea className="w-full whitespace-nowrap pb-4">
                <TabsList className="bg-transparent rounded-none p-0 inline-flex border-b border-zinc-100 w-full justify-start md:justify-center">
                  {categories.map(cat => (
                    <TabsTrigger 
                      key={cat} 
                      value={cat.toLowerCase()} 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-4 font-bold uppercase tracking-widest text-[10px]"
                    >
                      {cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>
            </Tabs>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 relative min-h-[400px]"
          >
            {!user && (
              <div className="absolute inset-0 z-20 bg-white/40 backdrop-blur-[6px] flex items-center justify-center p-6 rounded-xl overflow-hidden border border-zinc-100">
                <div className="bg-white p-8 md:p-10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] border border-black/5 text-center max-w-sm space-y-6 relative">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto shadow-xl ring-8 ring-black/5">
                    <LogIn size={28} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-2xl tracking-tighter uppercase">Agency Access Only</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Unlock the full technical repository and logic roadmaps for our proprietary automation stack.</p>
                  </div>
                  <Button 
                    onClick={async () => {
                      try {
                        await signInWithGoogle();
                      } catch (error: any) {
                        if (error.code === 'auth/popup-closed-by-user') return;
                        console.error(error);
                      }
                    }} 
                    className="w-full bg-black hover:bg-zinc-800 text-white rounded-none py-8 font-bold text-lg transition-all shadow-lg active:scale-95"
                  >
                    Connect Google Account
                  </Button>
                </div>
              </div>
            )}
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool) => (
                <motion.div
                  layout
                  variants={fadeIn}
                  key={tool.name}
                  className="h-full"
                >
                  <a 
                    href={tool.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-full block"
                  >
                    <Card className={cn(
                      "rounded-none border-zinc-100 hover:border-black transition-all duration-500 cursor-pointer group h-full flex flex-col",
                      tool.highlight ? "bg-zinc-50/50 ring-1 ring-black/5 shadow-sm" : ""
                    )}>
                      <CardContent className="p-6 flex flex-col justify-between h-full">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <Badge variant={tool.highlight ? "default" : "secondary"} className="rounded-none uppercase text-[9px] font-bold tracking-widest px-2">
                              {tool.cat}
                            </Badge>
                            <span className={cn(
                              "text-[10px] font-bold uppercase tracking-tight",
                              tool.status === 'Agency' ? "text-accent" : "text-muted-foreground"
                            )}>
                              {tool.status}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-extrabold group-hover:text-accent transition-colors">{tool.name}</h3>
                            <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                              {tool.use}
                            </p>
                          </div>
                        </div>
                        <div className="mt-8 pt-4 border-t border-zinc-50 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest group-hover:text-accent transition-colors">
                          <span>{tool.status === 'Agency' ? 'Technical Specs' : 'Visit Platform'}</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredTools.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 border-2 border-dashed border-zinc-100 text-muted-foreground bg-zinc-50/30"
            >
              <Search className="w-12 h-12 mx-auto mb-4 opacity-10" />
              <p className="text-sm font-medium">No systems matching "{search}" in {activeTab}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "AI Automation",
    urgency: "Medium (1-4 weeks)",
    budget: "",
    message: ""
  });
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = React.useState("");
  const [user, setUser] = React.useState<FirebaseUser | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setFormData(prev => ({
          ...prev,
          name: currentUser.displayName || "",
          email: currentUser.email || ""
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await submitLead({
        ...formData,
        userId: user?.uid
      });
      
      setStatus('success');
      setFeedback("Strategic inquiry captured. Our leads architect will review your technical requirements and contact you within 6 business hours.");
      setFormData({ 
        name: "", 
        email: "", 
        company: "", 
        phone: "",
        projectType: "AI Automation",
        urgency: "Medium (1-4 weeks)",
        budget: "", 
        message: "" 
      });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setFeedback("Encryption layer error: Failed to save strategic data. Please check your network.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const projectTypes = ["AI Automation", "Workflow Analysis", "Custom Agents", "Strategy Consulting"];
  const urgencyLevels = ["High (Immediate)", "Medium (1-4 weeks)", "Low (Planning)"];

  return (
    <section id="contact" className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-50/50 -z-0" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 space-y-12"
        >
          <div className="space-y-6">
            <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-none px-4 py-1.5 rounded-full text-[10px] uppercase font-black tracking-widest">
              Available for Q4 Bookings
            </Badge>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              Book Your <br/><span className="text-accent">Free Call</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-md">
              Secure your spot for a free discovery session. We'll show you exactly how AI can automate your manual work and save you time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {[
              { title: "Discovery Session", desc: "A deep dive into your manual processes and where you can save time." },
              { title: "Savings Analysis", desc: "A clear report on how much money and time AI will save you." },
              { title: "Automation Roadmap", desc: "A step-by-step plan for building and launching your AI systems." }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 group"
              >
                <div className="w-12 h-12 shrink-0 bg-black text-white flex items-center justify-center font-bold text-lg rounded-xl">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm tracking-tight mb-1">{item.title}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="pt-10 border-t border-zinc-100 flex items-center gap-6"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-zinc-100">
                  <img src={`https://picsum.photos/seed/face${i}/100/100`} alt="Client" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Trusted by <span className="text-black">12+ Enterprise Teams</span> this month
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 bg-white border border-zinc-200 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] p-8 md:p-12 rounded-3xl relative"
        >
          <AnimatePresence>
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="absolute inset-x-8 inset-y-12 z-50 bg-white flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black uppercase tracking-tight">Transmission Received</h3>
                  <p className="text-zinc-500 max-w-sm mx-auto font-medium">{feedback}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setStatus('idle')} 
                  className="rounded-full px-8 h-12 border-zinc-200 hover:border-black font-bold uppercase tracking-widest text-[10px]"
                >
                  Return to Form
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <form className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500", status === 'success' && "opacity-0 invisible scale-95")} onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Contact Name</label>
              <Input id="name" value={formData.name} onChange={handleChange} required placeholder="Lead Contact" className="rounded-xl h-14 border-zinc-100 bg-zinc-50/30 focus-visible:ring-black/5 px-5 font-bold" />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Business Email</label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} required placeholder="name@company.com" className="rounded-xl h-14 border-zinc-100 bg-zinc-50/30 focus-visible:ring-black/5 px-5 font-bold" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Organization</label>
              <Input id="company" value={formData.company} onChange={handleChange} required placeholder="Acme Systems" className="rounded-xl h-14 border-zinc-100 bg-zinc-50/30 focus-visible:ring-black/5 px-5 font-bold" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Phone Number</label>
              <Input id="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 (555) 000-0000" className="rounded-xl h-14 border-zinc-100 bg-zinc-50/30 focus-visible:ring-black/5 px-5 font-bold" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Project Category</label>
              <select 
                id="projectType" 
                value={formData.projectType} 
                onChange={handleChange as any}
                className="w-full rounded-xl h-14 border border-zinc-100 bg-zinc-50/30 focus:outline-none focus:border-black/20 px-5 font-bold text-sm appearance-none cursor-pointer"
              >
                {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Target Urgency</label>
              <select 
                id="urgency" 
                value={formData.urgency} 
                onChange={handleChange as any}
                className="w-full rounded-xl h-14 border border-zinc-100 bg-zinc-50/30 focus:outline-none focus:border-black/20 px-5 font-bold text-sm appearance-none cursor-pointer"
              >
                {urgencyLevels.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Investment Range ($)</label>
              <Input id="budget" value={formData.budget} onChange={handleChange} required placeholder="e.g. 5,000 - 15,000" className="rounded-xl h-14 border-zinc-100 bg-zinc-50/30 focus-visible:ring-black/5 px-5 font-bold" />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">System Requirements</label>
              <textarea 
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full min-h-[140px] p-5 text-sm border border-zinc-100 bg-zinc-50/30 rounded-2xl focus:outline-none focus:border-black/20 transition-colors font-bold"
                placeholder="Describe the current manual process you want to automate..."
              />
            </div>
            
            <div className="md:col-span-2 pt-4">
              {status === 'error' && <p className="text-[11px] text-red-500 font-bold mb-4 bg-red-50 p-3 rounded-lg border border-red-100">{feedback}</p>}
              <Button 
                type="submit" 
                disabled={status === 'loading'} 
                className="w-full bg-black hover:bg-zinc-800 text-white rounded-full h-16 text-lg font-black uppercase tracking-widest shadow-2xl shadow-black/20 group overflow-hidden"
              >
                {status === 'loading' ? (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    Submit Project Brief <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 md:py-20 px-4 md:px-6 border-t border-zinc-800 bg-[#0B0B0B] text-zinc-400">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Logo />
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              The premier AI automation agency for high-growth businesses. Building systems that scale while you sleep.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Navigation</h4>
            <div className="flex flex-col gap-3 text-sm text-zinc-500 font-medium">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#systems" className="hover:text-white transition-colors">Systems</a>
              <a href="#process" className="hover:text-white transition-colors">Process</a>
              <a href="#discovery" className="hover:text-white transition-colors">Discovery</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Office</h4>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Based in Singapore.<br/>
              Serving high-performance teams worldwide.
            </p>
            <div className="flex items-center gap-2 text-sm text-accent font-bold">
              <Mail className="w-4 h-4" />
              <span>hello@opsiys.com</span>
            </div>
          </div>
        </div>
        
        <Separator className="bg-zinc-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-600 text-center md:text-left">
          <p>© 2026 OPSIYS SYSTEMS INC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4 md:gap-8">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-accent selection:text-white relative">
      <AuthPortal />
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Features />
        <HowItWorks />
        <ToolDiscovery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
