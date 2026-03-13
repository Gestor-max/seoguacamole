import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: t("hero.title") },
    { path: "/#speakers-section", label: t("speakers.title") + " " + t("speakers.subtitle") },
    { path: "/contact", label: t("contact.title") }
  ];

  const scrollToSection = (hash: string) => {
    if (hash.startsWith("/#")) {
      const sectionId = hash.substring(2);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="SEO Guacamole" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.path === location || (link.path === "/" && location === "/");
              const isHashLink = link.path.startsWith("/#");
              
              if (isHashLink) {
                return (
                  <button
                    key={link.path}
                    onClick={() => {
                      if (location !== "/") {
                        window.location.href = link.path;
                      } else {
                        scrollToSection(link.path);
                      }
                    }}
                    className="text-gray-300 hover:text-green-400 transition-colors font-medium"
                  >
                    {link.label}
                  </button>
                );
              }

              return (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`transition-colors font-medium ${
                    isActive 
                      ? "text-green-400" 
                      : "text-gray-300 hover:text-green-400"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-400 text-black font-bold px-3 py-2 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300 flex items-center gap-2">
                  <span className="text-lg">
                    {language === "en" && "🇺🇸"}
                    {language === "es" && "🇲🇽"}
                    {language === "pt" && "🇧🇷"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer">
                  <span className="mr-2">🇺🇸</span> English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("es")} className="cursor-pointer">
                  <span className="mr-2">🇲🇽</span> Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("pt")} className="cursor-pointer">
                  <span className="mr-2">🇧🇷</span> Português
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = link.path === location || (link.path === "/" && location === "/");
                const isHashLink = link.path.startsWith("/#");
                
                if (isHashLink) {
                  return (
                    <button
                      key={link.path}
                      onClick={() => {
                        if (location !== "/") {
                          window.location.href = link.path;
                        } else {
                          scrollToSection(link.path);
                        }
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-gray-300 hover:text-green-400 transition-colors font-medium py-2"
                    >
                      {link.label}
                    </button>
                  );
                }

                return (
                  <Link 
                    key={link.path} 
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 transition-colors font-medium ${
                      isActive 
                        ? "text-green-400" 
                        : "text-gray-300 hover:text-green-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
