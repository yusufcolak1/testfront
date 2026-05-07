import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, ArrowRight, ShieldCheck, HelpCircle, FileText } from 'lucide-react';

export default function Footer() {
    const [scale, setScale] = useState(1);
    const [baseHeight, setBaseHeight] = useState(500);
    const footerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setScale(window.innerWidth / 1024);
            } else {
                setScale(1);
            }
            if (footerRef.current) {
                setBaseHeight(footerRef.current.offsetHeight);
            }
        };
        handleResize();
        setTimeout(handleResize, 100);
        setTimeout(handleResize, 500); // Extra timeout for fonts loading height shift
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className="w-full relative overflow-hidden"
            style={{ height: scale < 1 ? `${baseHeight * scale}px` : 'auto' }}
        >
            <footer
                ref={footerRef}
                className="bg-stone-900 text-white pt-24 pb-28 lg:pb-12 rounded-t-[4rem] relative origin-top-left"
                style={{
                    transform: scale < 1 ? `scale(${scale})` : 'none',
                    width: scale < 1 ? '1024px' : '100%',
                    position: scale < 1 ? 'absolute' : 'relative',
                    top: 0,
                    left: 0
                }}
            >
                {/* Subtle Texture Background */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none rounded-t-[4rem]"></div>

                <div className="container mx-auto px-6 relative z-10 w-full">
                    {/* Always 4 columns */}
                    <div className="grid grid-cols-4 gap-16 mb-20">
                        {/* Brand Section */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-serif font-black italic tracking-tighter mb-2">
                                    TAKASON<span className="text-amber-500">.</span>
                                </h2>
                                <p className="text-stone-400 text-sm font-medium leading-relaxed italic font-serif">
                                    "Sizin paranız burada geçmez." Türkiye'nin en büyük takas topluluğuna hoş geldin.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-stone-900 hover:-translate-y-1 transition-all">
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links: Discover */}
                        <div className="space-y-8">
                            <h4 className="text-[10px] font-black tracking-[0.3em] text-amber-500/50 uppercase">KEŞFET</h4>
                            <ul className="space-y-4">
                                {['Elektronik', 'Mobilya', 'Vasıta', 'Giyim', 'Antika'].map((link) => (
                                    <li key={link}>
                                        <Link to={`/arama?q=${link}`} className="text-stone-400 hover:text-white hover:translate-x-2 transition-all flex items-center gap-2 group text-sm font-bold uppercase tracking-widest">
                                            <div className="w-1.5 h-1.5 bg-stone-700 rounded-full group-hover:bg-amber-500 transition-colors"></div>
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links: Help & Support */}
                        <div className="space-y-8">
                            <h4 className="text-[10px] font-black tracking-[0.3em] text-amber-500/50 uppercase">DESTEK</h4>
                            <ul className="space-y-4">
                                <li>
                                    <Link to="/yardim" className="text-stone-400 hover:text-white flex items-center gap-3 transition-colors text-sm font-bold uppercase tracking-widest">
                                        <HelpCircle className="w-4 h-4 text-stone-600" />
                                        Yardım Merkezi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/guvenli-takas" className="text-stone-400 hover:text-white flex items-center gap-3 transition-colors text-sm font-bold uppercase tracking-widest">
                                        <ShieldCheck className="w-4 h-4 text-stone-600" />
                                        Güvenli Takas Rehberi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/kvkk" className="text-stone-400 hover:text-white flex items-center gap-3 transition-colors text-sm font-bold uppercase tracking-widest">
                                        <FileText className="w-4 h-4 text-stone-600" />
                                        KVKK Aydınlatma Metni
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/liderler" className="text-stone-400 hover:text-white flex items-center gap-3 transition-colors text-sm font-bold uppercase tracking-widest">
                                        <ArrowRight className="w-4 h-4 text-stone-600" />
                                        Liderler Tablosu
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter / Contact */}
                        <div className="space-y-8">
                            <h4 className="text-[10px] font-black tracking-[0.3em] text-amber-500/50 uppercase">İLETİŞİM</h4>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-stone-400 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-stone-900 transition-all">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-stone-600 font-black">E-POSTA</p>
                                        <p className="text-sm font-bold text-stone-300">destek@takason.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-stone-400 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-stone-900 transition-all">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-stone-600 font-black">MÜŞTERİ HİZMETLERİ</p>
                                        <p className="text-sm font-bold text-stone-300">0850 123 45 67</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar: Always ROW */}
                    <div className="pt-12 border-t border-white/5 flex flex-row items-center justify-between gap-8 text-left">
                        <p className="text-stone-500 text-[10px] font-black tracking-widest uppercase truncate min-w-0">
                            © 2026 TAKASON. TÜM HAKLARI SAKLIDIR.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-8 shrink-0">
                            {['Kullanım Koşulları', 'Çerez Politikası', 'Gizlilik Sözleşmesi'].map((link) => (
                                <Link key={link} to="#" className="text-stone-500 hover:text-amber-500 text-[10px] font-black tracking-widest uppercase transition-colors">
                                    {link}
                                </Link>
                            ))}
                        </div>
                        {/* Mini "Made with" note */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 shrink-0">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[9px] font-black tracking-[0.2em] text-stone-400 uppercase">SİSTEM AKTİF</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
