import * as React from "react";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";
import AboutPage from "./pages/About";
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
  LogOut,
  Info
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
      onError={(e) => {
        (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/opsiys/200/50?text=OPSIYS';
      }}
    />
  </div>
);

const Navbar = ({ 
  user, 
  handleSignIn, 
  logout, 
  profile, 
  onOpenSettings, 
  onOpenHistory 
}: { 
  user: any, 
  handleSignIn: any, 
  logout: any, 
  profile: any,
  onOpenSettings: () => void,
  onOpenHistory: () => void
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [portalOpen, setPortalOpen] = React.useState(false);
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = isAboutPage 
    ? [{ name: "Home", href: "/" }] 
    : [
        { name: "Systems", href: "#systems" },
        { name: "Process", href: "#process" },
        { name: "Discovery", href: "#discovery" },
        { name: "About", href: "/about" }
      ];

  return (
    <>
      {/* Floating Pill Navigation */}
      <div className="fixed top-4 md:top-6 left-0 right-0 z-[60] px-4 md:px-6 flex justify-start md:justify-center pointer-events-none">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-2 md:px-3 py-1 md:py-1.5 rounded-full border transition-all duration-700 w-full md:w-auto md:max-w-none group shadow-2xl relative",
            scrolled || isAboutPage
              ? "bg-black/95 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/5" 
              : "bg-[#0B0B0B]/90 backdrop-blur-md border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
          )}
        >
          {/* Logo Section */}
          <Link to="/" className="pl-3 pr-1 transition-all duration-500">
            <Logo />
          </Link>

          {/* Table (Desktop) */}
          <div className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              item.href.startsWith("/") ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-4 py-2 text-[12px] font-bold uppercase tracking-widest transition-all duration-300 rounded-full shrink-0",
                    "text-zinc-400 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.name}
                </Link>
              ) : (
                <a 
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-[12px] font-bold uppercase tracking-widest transition-all duration-300 rounded-full shrink-0",
                    "text-zinc-400 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.name}
                </a>
              )
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-2 pr-1.5 shrink-0">
            {/* Unified Partner Access */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setPortalOpen(!portalOpen)}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border border-white/20 transition-all ring-1 ring-white/10 active:scale-95 shadow-lg"
                >
                  <img src={user.photoURL || ""} alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
                <AnimatePresence>
                  {portalOpen && (
                    <div className="absolute right-0 mt-4 w-64 bg-white border border-zinc-100 shadow-2xl p-4 rounded-2xl overflow-hidden text-black z-[100] pointer-events-auto">
                      <div className="flex items-center gap-3 pb-4 border-b border-zinc-50">
                        <img src={user.photoURL || ""} alt="User" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full border border-zinc-100" />
                        <div className="min-w-0">
                          <p className="text-[11px] font-black truncate uppercase tracking-tight leading-none mb-1">{profile?.displayName || user.displayName}</p>
                          <p className="text-[9px] text-zinc-400 truncate font-bold">{user.email}</p>
                        </div>
                      </div>
                      <div className="py-2 space-y-1">
                        <Button 
                          variant="ghost" 
                          onClick={() => { onOpenHistory(); setPortalOpen(false); }}
                          className="w-full justify-start text-[9px] font-extrabold uppercase tracking-widest h-9 hover:bg-emerald-50 rounded-xl group"
                        >
                          <LineChart size={12} className="mr-2 group-hover:text-emerald-600" /> Project History
                        </Button>
                        <Button 
                          variant="ghost" 
                          onClick={() => { onOpenSettings(); setPortalOpen(false); }}
                          className="w-full justify-start text-[9px] font-extrabold uppercase tracking-widest h-9 hover:bg-blue-50 rounded-xl group"
                        >
                          <User size={12} className="mr-2 group-hover:text-blue-600" /> Account Settings
                        </Button>
                        <div className="pt-1 mt-1 border-t border-zinc-50">
                          <Button 
                            variant="ghost" 
                            onClick={() => { logout(); setPortalOpen(false); }}
                            className="w-full justify-start text-[9px] font-extrabold uppercase tracking-widest h-9 hover:bg-red-50 text-red-600 rounded-xl"
                          >
                            <LogOut size={12} className="mr-2" /> Sign Out
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button 
                onClick={handleSignIn}
                className="bg-accent/90 hover:bg-accent text-white hover:scale-105 active:scale-95 transition-all rounded-full h-8 md:h-9 px-3 md:px-5 text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest shadow-lg"
              >
                <LogIn size={12} className="mr-0 md:mr-2" /> 
                <span className="hidden sm:inline">Partner Portal</span>
                <span className="sm:hidden">Login</span>
              </Button>
            )}

            <a href="/#contact" className="hidden sm:block transition-all">
              <Button 
                size="sm" 
                className="rounded-full px-6 h-8 sm:h-9 transition-all duration-500 font-bold text-[11px] uppercase tracking-wider bg-white text-black hover:bg-zinc-200"
              >
                Book a Call
              </Button>
            </a>
            
            {/* Mobile Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-8 h-8 rounded-full text-white hover:bg-white/10 shrink-0"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[55] bg-black/95 flex items-center justify-center p-6 md:hidden"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-sm space-y-12"
            >
              <div className="flex flex-col items-center gap-8">
                {navItems.map((item, idx) => (
                   item.href.startsWith("/") ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-extrabold uppercase tracking-tighter text-zinc-500 hover:text-white transition-colors"
                    >
                      <motion.span
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {item.name}
                      </motion.span>
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-extrabold uppercase tracking-tighter text-zinc-500 hover:text-white transition-colors"
                    >
                      <motion.span
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {item.name}
                      </motion.span>
                    </a>
                  )
                ))}
              </div>

              {user && (
                <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-6 w-full">
                  <button 
                    onClick={() => { onOpenHistory(); setIsOpen(false); }}
                    className="flex items-center gap-4 text-2xl font-bold uppercase text-zinc-500 hover:text-white transition-colors"
                  >
                    <LineChart size={24} /> History
                  </button>
                  <button 
                    onClick={() => { onOpenSettings(); setIsOpen(false); }}
                    className="flex items-center gap-4 text-2xl font-bold uppercase text-zinc-500 hover:text-white transition-colors"
                  >
                    <User size={24} /> Settings
                  </button>
                  <button 
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="flex items-center gap-4 text-2xl font-bold uppercase text-red-500 hover:text-red-400 transition-colors"
                  >
                    <LogOut size={24} /> Sign Out
                  </button>
                </div>
              )}
              
              <div className="pt-12 border-t border-white/10 flex flex-col items-center gap-6">
                <a href="/#contact" onClick={() => setIsOpen(false)} className="w-full">
                  <Button className="w-full h-16 rounded-none bg-white text-black font-bold text-lg uppercase tracking-widest hover:bg-zinc-200">
                    Book Discovery Call
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AuthPortal = () => {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showHistory, setShowHistory] = React.useState(false);
  const [profile, setProfile] = React.useState<any>(null);
  const [leads, setLeads] = React.useState<any[]>([]);
  const [isSaving, setIsSaving] = React.useState(false);
  const [showWelcome, setShowWelcome] = React.useState(false);

  React.useEffect(() => {
    // Show welcome modal after 2.5 seconds if user is not logged in
    const timer = setTimeout(() => {
      onAuthStateChanged(auth, (u) => {
        if (!u) setShowWelcome(true);
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

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
    <>
      <Navbar 
        user={user} 
        handleSignIn={handleSignIn} 
        logout={logout} 
        profile={profile} 
        onOpenSettings={() => setShowSettings(true)}
        onOpenHistory={() => setShowHistory(true)}
      />
      
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

      {/* Welcome Login Modal */}
      <AnimatePresence>
        {showWelcome && !user && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWelcome(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white max-w-lg w-full relative z-[210] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-zinc-100 overflow-hidden rounded-[3rem] p-10 md:p-16 text-center"
            >
              <button 
                onClick={() => setShowWelcome(false)} 
                className="absolute top-8 right-8 text-zinc-300 hover:text-black transition-colors"
                aria-label="Close"
              >
                <X size={28} />
              </button>

              <div className="space-y-10">
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <Bot size={40} />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
                    Partner <br/> <span className="text-zinc-300">Access</span>
                  </h2>
                  <p className="text-zinc-500 font-medium text-sm md:text-lg leading-relaxed max-w-xs mx-auto">
                    Sign in to access your project dashboard and proprietary resource libraries.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={async () => {
                      await handleSignIn();
                      setShowWelcome(false);
                    }}
                    className="w-full h-16 rounded-full bg-black text-white font-black text-sm uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl"
                  >
                    Continue with Google
                  </Button>
                  <button 
                    onClick={() => setShowWelcome(false)}
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-300 hover:text-zinc-500 transition-colors"
                  >
                    I'll Explore First
                  </button>
                </div>
              </div>

              <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r from-transparent via-zinc-100 to-transparent" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
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
    <section className="pt-24 pb-10 md:pt-56 md:pb-40 px-4 md:px-6 overflow-hidden bg-[#FAFAFA] relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(circle, #000 1.5px, transparent 1.5px)`,
          backgroundSize: '64px 64px' 
        }} 
      />

      {/* Subtle Background Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-accent/10 to-transparent blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center relative z-10 px-4 sm:px-10">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-8 md:space-y-12 text-left"
        >
          <motion.div variants={fadeIn} className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="rounded-full px-3 py-0.5 text-[9px] md:text-xs border-accent/20 text-accent bg-accent/5 backdrop-blur-sm">
                Efficiency Redefined
              </Badge>
            </div>
            
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] uppercase">
              We build AI <br/>
              <span className="relative inline-block min-w-[150px] xs:min-w-[200px] sm:min-w-[280px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
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
          
          <motion.div variants={fadeIn} className="space-y-8 md:space-y-10">
            <p className="text-sm md:text-xl text-muted-foreground max-w-md leading-relaxed font-medium">
              Automation, workflows, and scalable operations designed for high-performance teams. Clarity over complexity.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              <a href="#contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-black hover:bg-zinc-800 text-white rounded-none px-8 py-7 md:px-10 md:py-8 text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-all active:scale-95 shadow-2xl shadow-black/10">
                  Book a Call <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <a href="#systems" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-none px-8 py-7 md:px-10 md:py-8 text-xs md:text-sm font-bold uppercase tracking-[0.2em] border-2 border-zinc-100 hover:border-black transition-all">
                  Explore stack
                </Button>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative lg:mt-0 w-full"
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
    <section className="py-10 border-y border-border bg-white overflow-hidden relative">
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
    <section id="systems" className="py-12 md:py-32 px-6 sm:px-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-4 md:mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-zinc-200" /> Core Systems
            </h2>
            <p className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight uppercase">
              Structured automation <br className="hidden sm:block" /> for modern business.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden lg:block pb-2"
          >
            <p className="text-zinc-500 text-base leading-relaxed border-l-2 border-zinc-100 pl-6 max-w-md">
              We build specialized engines that handle the heavy lifting, allowing your core talent to focus on innovation and growth.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {systems.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeIn}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="p-6 md:p-8 border border-zinc-100 group hover:border-black transition-all duration-500 space-y-6 md:space-y-8 bg-white relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-500" />
              <div className="w-14 h-14 bg-zinc-50 border border-zinc-100 flex items-center justify-center rounded-none transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:border-black">
                {item.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold tracking-tight uppercase group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-sm font-medium">
                  {item.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-zinc-50 flex justify-between items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-[10px] font-bold uppercase tracking-widest">Active Logic</span>
                <ArrowRight size={14} className="text-accent" />
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
    <section id="process" className="py-12 md:py-32 px-6 sm:px-10 bg-[#0B0B0B] text-white overflow-hidden relative">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-20 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 md:space-y-6"
          >
            <h2 className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] flex items-center gap-4">
               <span className="w-8 md:w-12 h-px bg-white/10" /> The Blueprint
            </h2>
            <p className="text-3xl xs:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter leading-tight uppercase">How we turn <br/> chaos into <span className="text-accent underline decoration-white/10 underline-offset-8">clarity</span>.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-sm border-l border-white/10 pl-6 md:pl-8 pb-2"
          >
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-medium">
              Our process is rigorous and outcome-driven. We don't just 'do AI'—we build operational infrastructure.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 relative">
          <div className="hidden lg:block absolute top-[2.25rem] left-0 right-0 h-px bg-white/5 -z-0" />
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              className="space-y-6 md:space-y-8 relative z-10 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white text-black flex items-center justify-center font-bold text-xs md:text-sm rounded-none group-hover:bg-accent group-hover:text-white transition-all duration-500 transform group-hover:-rotate-12">
                {step.num}
              </div>
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-500">{step.title}</h3>
                <p className="text-zinc-500 text-[13px] md:text-sm leading-relaxed font-medium">
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
    <section id="discovery" className="py-12 md:py-32 px-6 sm:px-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase">AI Tool Discovery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-xs md:text-base font-medium">
            A curated repository of state-of-the-art AI systems and proprietary workflows.
          </p>
        </div>

        <div className="space-y-6 md:space-y-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between items-center bg-zinc-50 p-4 md:p-6 rounded-none border border-zinc-100">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-3.5 h-3.5" />
              <Input 
                placeholder="Search tools..." 
                className="pl-10 py-5 md:pl-12 md:py-7 rounded-none border-zinc-200 focus:border-black focus-visible:ring-0 transition-all bg-white text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" className="w-full lg:w-auto overflow-x-auto" onValueChange={setActiveTab}>
              <ScrollArea className="w-full whitespace-nowrap pb-1">
                <TabsList className="bg-transparent rounded-none p-0 inline-flex border-b border-zinc-200 w-full lg:w-auto">
                  {categories.map(cat => (
                    <TabsTrigger 
                      key={cat} 
                      value={cat.toLowerCase()} 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none px-4 md:px-6 py-3 md:py-4 font-bold uppercase tracking-widest text-[8px] md:text-[9px] text-zinc-400 hover:text-black transition-colors"
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
            viewport={{ once: true, margin: "200px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 relative min-h-[500px]"
          >
            {!user && (
              <div className="absolute inset-x-0 top-0 bottom-0 z-20 bg-white/40 backdrop-blur-[24px] flex items-start justify-center p-6 md:p-12 overflow-hidden pointer-events-none">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="bg-white p-10 md:p-20 border border-zinc-100 shadow-[0_100px_150px_-50px_rgba(0,0,0,0.2)] text-center max-w-[340px] md:max-w-xl space-y-10 relative mt-16 md:mt-32 pointer-events-auto rounded-[3rem]"
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-black text-white rounded-full flex items-center justify-center mx-auto shadow-2xl transition-transform hover:scale-110 duration-500">
                    <LogIn size={40} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-black text-3xl md:text-6xl tracking-tighter uppercase leading-[0.8] text-black">
                      Log In <br/><span className="text-zinc-200">First</span>
                    </h3>
                    <p className="text-[11px] md:text-lg text-zinc-400 leading-relaxed font-medium max-w-[280px] md:max-w-md mx-auto">
                      Sign in to explore our collection of AI tools designed to help you work smarter, not harder.
                    </p>
                  </div>
                  <div className="pt-4 flex flex-col items-center gap-6">
                    <Button 
                      onClick={async () => {
                        try {
                          await signInWithGoogle();
                        } catch (error: any) {
                          if (error.code === 'auth/popup-closed-by-user') return;
                          console.error("Auth Error:", error);
                        }
                      }}
                      className="w-full h-16 md:h-20 rounded-full bg-black text-white font-black text-xs md:text-sm uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-xl active:scale-95"
                    >
                      Connect with Google
                    </Button>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-300">Ready to boost your workflow?</p>
                  </div>
                </motion.div>
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
                      "rounded-none border-zinc-100 hover:border-black transition-all duration-500 cursor-pointer group h-full flex flex-col shadow-none hover:shadow-xl hover:shadow-black/[0.02]",
                      tool.highlight ? "bg-zinc-50/50 ring-1 ring-black/5 shadow-sm" : ""
                    )}>
                      <CardContent className="p-5 md:p-6 flex flex-col justify-between h-full">
                        <div className="space-y-3 md:space-y-4">
                          <div className="flex justify-between items-start">
                            <Badge variant={tool.highlight ? "default" : "secondary"} className="rounded-none uppercase text-[8px] md:text-[9px] font-bold tracking-widest px-2">
                              {tool.cat}
                            </Badge>
                            <span className={cn(
                              "text-[9px] md:text-[10px] font-bold uppercase tracking-tight",
                              tool.status === 'Agency' ? "text-accent" : "text-muted-foreground"
                            )}>
                              {tool.status}
                            </span>
                          </div>
                          <div className="space-y-1 md:space-y-2">
                            <h3 className="text-base md:text-lg font-extrabold group-hover:text-accent transition-colors uppercase tracking-tight leading-tight">{tool.name}</h3>
                            <p className="text-muted-foreground text-[11px] md:text-xs leading-relaxed line-clamp-2 md:line-clamp-3">
                              {tool.use}
                            </p>
                          </div>
                        </div>
                        <div className="mt-6 md:mt-8 pt-4 border-t border-zinc-50 flex items-center justify-between text-[8px] md:text-[10px] font-bold uppercase tracking-widest group-hover:text-accent transition-colors">
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
              className="text-center py-20 md:py-32 border-2 border-dashed border-zinc-100 text-muted-foreground bg-zinc-50/30"
            >
              <Search className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 opacity-10" />
              <p className="text-xs md:text-sm font-medium">No matches found for "{search}"</p>
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
    <section id="contact" className="py-12 md:py-32 px-6 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-50/50 -z-0" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 space-y-10 md:space-y-12"
        >
          <div className="space-y-4 md:space-y-6">
            <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-none px-4 py-1.5 rounded-full text-[9px] uppercase font-bold tracking-widest">
              Available for Q4 Bookings
            </Badge>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              Book Your <br/><span className="text-accent">Free Call</span>
            </h2>
            <p className="text-zinc-500 text-sm md:text-xl font-medium leading-relaxed max-w-sm">
              Secure your spot for a discovery session. We'll show you exactly how AI can automate your manual work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {[
              { title: "Discovery Session", desc: "A deep dive into your manual processes." },
              { title: "Savings Analysis", desc: "A report on money and time AI will save you." },
              { title: "Automation Roadmap", desc: "A step-by-step plan for launching your systems." }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 md:gap-6 group"
              >
                <div className="w-8 h-8 md:w-12 md:h-12 shrink-0 bg-black text-white flex items-center justify-center font-black text-xs md:text-lg rounded-xl">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="font-black uppercase text-[10px] md:text-sm tracking-tight mb-0.5">{item.title}</h4>
                  <p className="text-zinc-400 text-[10px] md:text-sm leading-snug">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="pt-8 md:pt-10 border-t border-zinc-100 flex items-center gap-4 md:gap-6"
          >
            <div className="flex -space-x-2 md:-space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden bg-zinc-100">
                  <img src={`https://picsum.photos/seed/face${i}/100/100`} alt="Client" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Trusted by <span className="text-black">12+ Enterprise Teams</span>
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
                  <h3 className="text-3xl font-extrabold uppercase tracking-tight">Transmission Received</h3>
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

          <form className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 transition-all duration-500", status === 'success' && "opacity-0 invisible scale-95")} onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1 leading-none">Contact Name</label>
              <Input id="name" value={formData.name} onChange={handleChange} required placeholder="Lead Contact" className="rounded-xl h-12 md:h-14 border-zinc-100 bg-zinc-50/30 focus-visible:ring-black/5 px-4 font-bold text-xs md:text-base" />
            </div>
            
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1 leading-none">Business Email</label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} required placeholder="name@company.com" className="rounded-xl h-12 md:h-14 border-zinc-100 bg-zinc-50/30 focus-visible:ring-black/5 px-4 font-bold text-xs md:text-base" />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1 leading-none">Organization</label>
              <Input id="company" value={formData.company} onChange={handleChange} required placeholder="Acme Systems" className="rounded-xl h-12 md:h-14 border-zinc-100 bg-zinc-50/30 focus-visible:ring-black/5 px-4 font-bold text-xs md:text-base" />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1 leading-none">Phone Number</label>
              <Input id="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 (555) 000-0000" className="rounded-xl h-12 md:h-14 border-zinc-100 bg-zinc-50/30 focus-visible:ring-black/5 px-4 font-bold text-xs md:text-base" />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1 leading-none">Project Category</label>
              <select 
                id="projectType" 
                value={formData.projectType} 
                onChange={handleChange as any}
                className="w-full rounded-xl h-12 md:h-14 border border-zinc-100 bg-zinc-50/30 focus:outline-none focus:border-black/20 px-4 font-bold text-xs appearance-none cursor-pointer"
              >
                {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1 leading-none">Target Urgency</label>
              <select 
                id="urgency" 
                value={formData.urgency} 
                onChange={handleChange as any}
                className="w-full rounded-xl h-12 md:h-14 border border-zinc-100 bg-zinc-50/30 focus:outline-none focus:border-black/20 px-4 font-bold text-xs appearance-none cursor-pointer"
              >
                {urgencyLevels.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1 leading-none">Investment Range ($)</label>
              <Input id="budget" value={formData.budget} onChange={handleChange} required placeholder="e.g. 5,000 - 15,000" className="rounded-xl h-12 md:h-14 border-zinc-100 bg-zinc-50/30 focus-visible:ring-black/5 px-4 font-bold text-xs md:text-base" />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1 leading-none">System Requirements</label>
              <textarea 
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full min-h-[100px] md:min-h-[140px] p-4 text-xs md:text-sm border border-zinc-100 bg-zinc-50/30 rounded-2xl focus:outline-none focus:border-black/20 transition-colors font-bold"
                placeholder="Describe the current manual process you want to automate..."
              />
            </div>
            
            <div className="md:col-span-2 pt-2">
              {status === 'error' && <p className="text-[10px] text-red-500 font-bold mb-4 bg-red-50 p-2 rounded-lg border border-red-100">{feedback}</p>}
              <Button 
                type="submit" 
                disabled={status === 'loading'} 
                className="w-full bg-black hover:bg-zinc-800 text-white rounded-full h-12 md:h-16 text-base md:text-lg font-extrabold uppercase tracking-widest shadow-xl shadow-black/10 group overflow-hidden"
              >
                {status === 'loading' ? (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    Submit Project Brief <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
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
    <footer className="py-12 md:py-20 px-6 sm:px-10 border-t border-zinc-800 bg-[#0B0B0B] text-zinc-400">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          <div className="col-span-2 md:col-span-2 space-y-6">
            <Logo />
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-sm">
              The premier AI automation agency for high-growth businesses. Building systems that scale while you sleep.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Twitter size={18} className="md:size-5" /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Github size={18} className="md:size-5" /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Linkedin size={18} className="md:size-5" /></a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white">Navigation</h4>
            <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm text-zinc-500 font-medium font-mono uppercase tracking-tight">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <a href="#systems" className="hover:text-white transition-colors">Systems</a>
              <a href="#process" className="hover:text-white transition-colors">Process</a>
              <a href="#discovery" className="hover:text-white transition-colors">Discovery</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white">Office</h4>
            <div className="space-y-3">
              <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-mono uppercase tracking-tight">
                Based in India.<br/>
                Serving globally.
              </p>
              <div className="flex items-center gap-2 text-[10px] md:text-sm text-accent font-bold font-mono">
                <Mail className="w-3 h-3 md:w-4 md:h-4" />
                <span>opsiyss@gmail.com</span>
              </div>
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

// --- HomePage Component ---

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Trust />
      <Features />
      <HowItWorks />
      <ToolDiscovery />
      <Contact />
    </main>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans selection:bg-accent selection:text-white relative">
        <AuthPortal />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
