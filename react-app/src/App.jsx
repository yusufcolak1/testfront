import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import IntroCanvas from './components/IntroCanvas';
import LoginModal from './components/LoginModal';
import { Coins, Crown, Star, Search, Activity, Smartphone, Sofa, Shirt, BookOpen, Music, Bike, Watch, Gamepad2, Box, ArrowRight, Award, Home as HomeIcon, Compass, PlusCircle, MessageCircle, Heart, X, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import CreateAd from './pages/CreateAd';
import Messages from './pages/Messages';
import Leaderboard from './pages/Leaderboard';
import Premium from './pages/Premium';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
import AdDetail from './pages/AdDetail';
import Discover from './pages/Discover';
import Footer from './components/Footer';
import HelpCenter from './pages/support/HelpCenter';
import MakeOffer from './pages/MakeOffer';
import CategoryPage from './pages/CategoryPage';
import SafeSwapGuide from './pages/support/SafeSwapGuide';
import KVKK from './pages/support/KVKK';
import PersonalSettings from './pages/settings/PersonalSettings';
import SecuritySettings from './pages/settings/SecuritySettings';
import AddressSettings from './pages/settings/AddressSettings';
import NewsletterSettings from './pages/settings/NewsletterSettings';
import MyAds from './pages/settings/MyAds';
import SwapHistory from './pages/settings/SwapHistory';
import PremiumDetails from './pages/settings/PremiumDetails';
import ListingPage from './pages/ListingPage';

// Global Scroll to Top Helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const [activeLeaderNavBar, setActiveLeaderNavBar] = useState(0);

  const leaders = [
    { name: 'Hasan K.', medal: '🥇' },
    { name: 'Mehmet Y.', medal: '🥈' },
    { name: 'Selin K.', medal: '🥉' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLeaderNavBar((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(timer);
  }, []);
  const [navSearchTerm, setNavSearchTerm] = useState('');

  // Animasyonun bu oturumda oynatılıp oynatılmadığını kontrol et
  // Mobil cihazlarda (768px altı) performansı artırmak ve direkt erişim için animasyonu tamamen atlıyoruz
  const [hasPlayedIntro, setHasPlayedIntro] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      sessionStorage.setItem('takason_intro_played', 'true');
      return true;
    }
    return sessionStorage.getItem('takason_intro_played') === 'true';
  });

  // Eğer ana sayfadaysak ve henüz animasyon oynamadıysa Intro'yu göster
  const showIntro = isHome && !hasPlayedIntro;

  const handleNavSearch = (e) => {
    if (e) e.preventDefault();
    if (navSearchTerm.trim()) {
      navigate(`/arama?q=${encodeURIComponent(navSearchTerm.trim())}`);
      setIsSearchOpen(false);
      setNavSearchTerm('');
    }
  };

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) return;
    const image = new Image();
    image.src = '/logo.png';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      // En-boy oranını bozmadan sığdır ve %30 büyüt (Zoom efekti)
      const scaleFactor = 1.3;
      const ratio = Math.min(canvas.width / image.width, canvas.height / image.height) * scaleFactor;
      const nw = image.width * ratio;
      const nh = image.height * ratio;
      const x = (canvas.width - nw) / 2;
      const y = (canvas.height - nh) / 2;
      ctx.clearRect(0, 0, 32, 32);
      ctx.drawImage(image, x, y, nw, nh);
      favicon.href = canvas.toDataURL('image/png');
    };
  }, []);

  return (
    <>
      {showIntro && <IntroCanvas onComplete={() => {
        sessionStorage.setItem('takason_intro_played', 'true');
        setHasPlayedIntro(true);
      }} />}

      <div id="ui-container" className={showIntro ? "fixed top-[15vh] left-0 w-full pointer-events-none z-10 overflow-hidden opacity-0" : "relative z-10 w-full"}>

        <header className={`header-modern shadow-2xl shrink-0 transition-all duration-500 ease-in-out ${isSearchOpen ? 'h-[120px] lg:h-24' : 'h-16 lg:h-24'} overflow-hidden flex flex-col`}>
          {/* Ana Satır: Logo ve Navigasyon */}
          <div className="container mx-auto px-4 md:px-6 h-16 lg:h-24 flex items-center justify-between relative shrink-0">

            {/* Sol Blok: Logo + Masaüstü Arama + Navigasyon */}
            <div className="flex items-center gap-4 lg:gap-8 shrink-0 relative z-30 justify-start h-full">
              <Link to="/" className="flex items-center gap-1 lg:gap-3 group transition-all duration-500 shrink min-w-0">
                <div className="w-8 md:w-10 lg:w-28 shrink flex items-center justify-center">
                  <img src="/logo.png" alt="Logo" className="w-full h-auto scale-110" />
                </div>
                <div className="flex flex-col justify-end min-w-0 shrink">
                  <h1 className="font-serif font-black tracking-tighter text-stone-900 leading-none uppercase whitespace-nowrap" style={{ fontSize: 'clamp(10px, 4vw, 36px)' }}>
                    TAKAS<span className="text-[#5a4a40]">ON</span>
                  </h1>
                  <p className="hidden lg:block text-[11px] text-stone-500 font-serif italic font-medium tracking-wide mt-1.5 whitespace-nowrap">Sizin paranız burada geçmez.</p>
                </div>
              </Link>

              {/* Masaüstü Arama Grubu (Sadece MD ve üzerinde görünür) */}
              <div className="hidden md:flex items-center ml-2">
                {!isSearchOpen ? (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2.5 bg-stone-900/5 border border-stone-200 rounded-xl text-stone-600 hover:text-stone-900 hover:border-stone-400 transition-all duration-300 shadow-sm"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left duration-300">
                    <div className="relative w-[300px] lg:w-[400px]">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Hızlı arama..."
                        value={navSearchTerm}
                        onChange={(e) => setNavSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleNavSearch()}
                        className="w-full bg-white border border-stone-200 py-2.5 pl-11 pr-10 rounded-xl outline-none focus:border-stone-400 transition-all text-sm font-serif italic"
                      />
                      <button
                        onClick={() => { setIsSearchOpen(false); setNavSearchTerm(''); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-stone-100 rounded-lg text-stone-400 group"
                      >
                        <X className="w-4 h-4 group-hover:text-stone-900" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobil Arama Tetikleyici (Sadece mobil için, arama açıkken kendini gizler) */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`md:hidden p-2 bg-stone-100 border border-stone-200 rounded-xl text-stone-600 transition-all active:scale-90 ${isSearchOpen ? 'w-0 h-0 opacity-0 overflow-hidden' : 'w-10 h-10 opacity-100 ml-1'}`}
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Orta Blok: Masaüstü Navigasyon (Esnek Ortalı) */}
            <nav className="hidden lg:flex flex-1 justify-center items-center gap-2 lg:gap-6 transition-all duration-500 z-20 min-w-0 mx-4">
              {[
                { name: 'Ana Sayfa', path: '/', icon: HomeIcon },
                { name: 'Keşfet', path: '/kesfet', icon: Compass },
                { name: 'İlan Ver', path: '/ilan-ver', icon: PlusCircle },
                { name: 'Mesajlar', path: '/mesajlar', icon: MessageCircle },
                { name: 'Favorilerim', path: '/favoriler', icon: Heart }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-center transition-all duration-500 relative group h-12 text-base font-serif italic font-medium tracking-wide shrink min-w-0
                    ${location.pathname === item.path ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'}
                    ${isSearchOpen ? 'w-8 lg:w-10 mx-0' : 'w-auto px-2'}`}
                >
                  {/* İkon: Sadece arama açıkken görünür */}
                  <div className={`flex lg:absolute lg:inset-0 items-center justify-center transition-all duration-500 ${isSearchOpen ? 'lg:opacity-100 lg:scale-100' : 'lg:opacity-0 lg:scale-0 lg:pointer-events-none'}`}>
                    <item.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>

                  {/* Metin: Sadece masaüstünde arama kapalıyken görünür */}
                  <span className={`hidden lg:block transition-all duration-500 whitespace-nowrap ${isSearchOpen ? 'opacity-0 scale-75 w-0 overflow-hidden pointer-events-none' : 'opacity-100 scale-100'}`}>
                    {item.name}
                  </span>

                  <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-stone-900 rounded-full transition-all duration-500 ${isSearchOpen && 'opacity-0'}
                    ${location.pathname === item.path && !isSearchOpen ? 'w-6 opacity-100' : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-50'}`}
                  />
                </Link>
              ))}
            </nav>

            {/* Sağ Blok: Sadece Profil ve Liderler */}
            <div className="flex items-center h-full shrink-0 relative z-30 justify-end gap-2 md:gap-4">
              <div role="button" onClick={() => navigate('/liderler')} className="flex items-center gap-1 bg-[#f5f1ed] border border-[#e6e2de] rounded-full px-3 md:px-4 py-1.5 shadow-inner hover:shadow-md hover:scale-105 transition-all cursor-pointer h-9 group overflow-hidden min-w-[80px] w-auto max-w-[140px] md:w-36 shrink relative">
                {leaders.map((leader, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center gap-1.5 transition-all duration-500 ease-in-out
                      ${index === activeLeaderNavBar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
                  >
                    <span className="text-sm shrink-0">{leader.medal}</span>
                    <span className="text-[10px] md:text-[11px] font-black text-stone-700 whitespace-nowrap overflow-hidden text-ellipsis">{leader.name}</span>
                  </div>
                ))}
              </div>

              {isAuthenticated ? (
                <div className="relative group shrink-0">
                  <Link to="/profil" className="block">
                    <div className="flex items-center gap-1 md:gap-3 bg-white border border-stone-200 pl-1 md:pl-4 pr-1 py-1 rounded-full hover:bg-stone-50 hover:border-stone-400 hover:shadow-lg transition-all group-active:scale-95 shadow-sm">
                      <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest hidden md:block group-hover:text-stone-900 transition-colors">
                        {user?.profile?.firstName || 'Kullanıcı'}
                      </span>
                      <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-stone-900 flex items-center justify-center text-xs font-black text-[#FFF8E7] border border-stone-800 shadow-md">
                        {(user?.profile?.firstName?.[0] || 'K').toUpperCase()}
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={logout}
                    className="absolute top-full right-0 mt-2 px-4 py-2 bg-white border border-stone-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex items-center gap-2 text-sm hover:bg-stone-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Çıkış Yap
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-full hover:bg-stone-800 transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <User className="w-4 h-4" />
                  <span className="text-xs font-bold hidden md:block">Giriş Yap</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobil Arama Satırı (Sadece mobil için ve arama açıkken görünür) */}
          <div className={`md:hidden flex items-center px-4 bg-[#fbfaf8] transition-all duration-500 ease-in-out border-t border-stone-100 ${isSearchOpen ? 'h-14 opacity-100' : 'h-0 opacity-0'}`}>
            <div className="relative w-full group py-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Hızlı arama..."
                value={navSearchTerm}
                autoFocus={isSearchOpen}
                onChange={(e) => setNavSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNavSearch()}
                className="w-full bg-stone-50 border border-stone-200 py-2 pl-10 pr-10 rounded-xl outline-none focus:border-stone-400 focus:bg-white transition-all text-sm font-serif italic shadow-inner"
              />
              <button
                onClick={() => { setIsSearchOpen(false); setNavSearchTerm(''); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-stone-100 rounded-lg text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-[#f5f1ed]/90 backdrop-blur-2xl border-t border-stone-200 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-[9999] h-[72px] px-6 flex items-center justify-between pb-safe">
          {[
            { name: 'Ana', path: '/', icon: HomeIcon },
            { name: 'Keşfet', path: '/kesfet', icon: Compass },
            { name: 'İlan Ver', path: '/ilan-ver', icon: PlusCircle, special: true },
            { name: 'Mesaj', path: '/mesajlar', icon: MessageCircle, requireAuth: true },
            { name: 'Favoriler', path: '/favoriler', icon: Heart }
          ].filter(item => !item.requireAuth || isAuthenticated).map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 transition-all relative ${item.special ? '-translate-y-4' : ''}`}
              >
                <div className={`
                  flex items-center justify-center transition-all duration-300
                  ${item.special ? 'w-14 h-14 bg-stone-900 text-[#FFF8E7] rounded-[1.5rem] shadow-2xl scale-110' : 'w-8 h-8'}
                  ${!item.special && isActive ? 'text-stone-900 scale-110' : 'text-stone-400'}
                `}>
                  <Icon className={item.special ? 'w-7 h-7' : 'w-6 h-6'} />
                </div>
                {!item.special && (
                  <span className={`text-[8px] font-black uppercase tracking-tight transition-all ${isActive ? 'text-stone-900' : 'text-stone-400'}`}>
                    {item.name}
                  </span>
                )}
                {isActive && !item.special && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-stone-900 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <main className="pt-16 lg:pt-24 min-h-screen pb-16 lg:pb-0">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kesfet" element={<Discover />} />
            <Route path="/teklif-ver/:id" element={<MakeOffer />} />
            <Route path="/kategori/:slug" element={<CategoryPage />} />
            <Route path="/favoriler" element={<Favorites />} />
            <Route path="/ilan-ver" element={<CreateAd />} />
            <Route path="/mesajlar" element={<Messages />} />
            <Route path="/liderler" element={<Leaderboard />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/arama" element={<SearchResults />} />
            <Route path="/ilan/:id" element={<AdDetail />} />
            <Route path="/son-ilanlar" element={<ListingPage title="Son İlanlar" />} />
            <Route path="/one-cikan-ilanlar" element={<ListingPage title="Öne Çıkan İlanlar" />} />
            <Route path="/populer-ilanlar" element={<ListingPage title="Popüler İlanlar" />} />
            <Route path="/profil/kisisel-bilgiler" element={<PersonalSettings />} />
            <Route path="/profil/guvenlik" element={<SecuritySettings />} />
            <Route path="/profil/adreslerim" element={<AddressSettings />} />
            <Route path="/profil/bulten" element={<NewsletterSettings />} />
            <Route path="/profil/ilanlarim" element={<MyAds />} />
            <Route path="/profil/takas-gecmisi" element={<SwapHistory />} />
            <Route path="/profil/premium-detay" element={<PremiumDetails />} />
            <Route path="/profil/ayarlar/adres" element={<AddressSettings />} />
            <Route path="/yardim" element={<HelpCenter />} />
            <Route path="/guvenli-takas" element={<SafeSwapGuide />} />
            <Route path="/kvkk" element={<KVKK />} />
          </Routes>
        </main>
        <Footer />
        
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      </div>
    </>
  );
}

export default App;
