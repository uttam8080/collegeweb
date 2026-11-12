import React, { useState } from 'react';
import { Search, Menu, X, User as UserIcon, LogOut, CheckCircle2 } from 'lucide-react';
import { TekkzyLogo } from './TekkzyLogo';

interface Props {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  completedLessonsCount: number;
}

export const Header: React.FC<Props> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  onOpenAuth,
  user,
  onLogout,
  completedLessonsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'programs', label: 'Academics' },
    { id: 'placements', label: 'Placements' },
    { id: 'campus', label: 'Campus Life' },
    { id: 'notices', label: 'Notices' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (link: { id: string; label: string }) => {
    onNavigate(link.id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: New Brand Logo */}
        <button
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="group shrink-0 cursor-pointer text-left focus:outline-hidden"
          aria-label="TEKKZY College Home"
        >
          <TekkzyLogo variant="dark" />
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-stone-600">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-[#172554] font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF9933] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Search & Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 text-xs text-stone-500 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors border border-stone-200 cursor-pointer"
            title="Search topics (⌘K)"
          >
            <Search className="w-4 h-4 text-stone-600" />
            <span className="hidden sm:inline font-medium">Search</span>
            <kbd className="hidden lg:inline text-[10px] bg-white px-1.5 py-0.5 rounded border border-stone-300 text-stone-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg hover:border-stone-300 transition-colors text-xs font-semibold text-slate-900"
              >
                <div className="w-5 h-5 rounded-full bg-[#172554] text-white flex items-center justify-center text-[10px]">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">{user.name}</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-xl shadow-lg py-2 z-50 text-xs">
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="font-semibold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{completedLessonsCount} Lessons Completed</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('paths');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-stone-50 text-stone-700"
                  >
                    My Learning Paths
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="hidden sm:inline px-3.5 py-1.5 text-xs font-medium text-[#172554] hover:text-amber-800 transition-colors whitespace-nowrap"
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#172554] rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-xs"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {!user && (
            <div className="pt-3 border-t border-stone-100 flex gap-2">
              <button
                onClick={() => {
                  onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-center text-xs font-semibold text-[#172554] border border-stone-300 rounded-lg"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  onOpenAuth('signup');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-center text-xs font-semibold text-white bg-[#172554] rounded-lg"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
