import React, { useState } from 'react';
import { Search, Bookmark, Bell, X, SlidersHorizontal, BookOpen, Sparkles } from 'lucide-react';
import { ArticleCategory } from '../types/index.ts';
import { toBengaliNumerals } from '../utils/pureLogic.ts';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ArticleCategory;
  onSelectCategory: (category: ArticleCategory) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenNewPost: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  savedCount,
  onOpenSaved,
  onOpenNewPost,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Top nav categories (concise single-line)
  const navCategories: { label: string; value: ArticleCategory }[] = [
    { label: 'সকল', value: 'সকল' },
    { label: 'শস্যবিজ্ঞান', value: 'শস্য ও কৃষিবিজ্ঞান' },
    { label: 'এগ্রি-টেক', value: 'এগ্রি-টেক ও ড্রোন' },
    { label: 'গবেষণা', value: 'গবেষণা সহজ ভাষায়' },
    { label: 'কোল্ড চেইন', value: 'খাদ্য ও কোল্ড চেইন' },
    { label: 'জলবায়ু', value: 'জলবায়ু ও স্থায়িত্ব' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Primary Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 lg:gap-6">
        
        {/* Zone 1: Distinctive Brand Mark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            className="flex items-center gap-2 group text-stone-900 transition-opacity hover:opacity-95"
            aria-label="Plainsyt হোমপেজ"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00A693] to-[#047857] flex items-center justify-center text-white shadow-sm ring-1 ring-[#00A693]/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11a9 9 0 0 1 9-9Z" />
                <path d="M12 7v10" />
                <path d="M8 12c2 1 4 1 8-2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-xl tracking-tight text-stone-900 font-sans">
                  প্লেইনসাইট
                </span>
                <span className="text-[11px] font-semibold tracking-widest text-[#00A693] font-mono uppercase">
                  PLAINSYT
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Zone 2: Concise Single-Line Navigation Categories */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2 overflow-x-auto py-1 scrollbar-none"
          aria-label="মূল বিভাগসমূহ"
        >
          {navCategories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => onSelectCategory(cat.value)}
                className={`px-3 py-1.5 text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 rounded-md ${
                  isActive
                    ? 'text-[#00897B] font-semibold bg-[#00A693]/10'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Search & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Desktop Search Bar */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="সংবাদ, গবেষণা বা ড্রোন খুঁজুন..."
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-white/90 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#00A693] focus:border-[#00A693] transition-all"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                aria-label="অনুসন্ধান মুছুন"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Search Toggle */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-200/60"
            aria-label="অনুসন্ধান খুলুন"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Saved Articles / Bookmarks Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenSaved}
            className="relative p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
            title="সংরক্ষিত প্রতিবেদন"
            aria-label={`সংরক্ষিত প্রতিবেদন (${toBengaliNumerals(savedCount)})`}
          >
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#00A693] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {toBengaliNumerals(savedCount)}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
              title="বিজ্ঞপ্তি"
              aria-label="বিজ্ঞপ্তি দেখুন"
            >
              <Bell className="w-5 h-5" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-stone-200 rounded-xl shadow-xl p-3 z-50 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-xs font-semibold text-stone-800">সর্বশেষ আপডেট ও বুলেটিন</span>
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto">
                  <div className="py-2.5 text-xs text-stone-700">
                    <p className="font-medium text-stone-900">🌾 বিআরআরআই (BRRI) নতুন গবেষণা প্রকাশ</p>
                    <p className="text-stone-500 mt-0.5">হাওরে ব্রি-১০২ ধানের প্রাথমিক ফলন প্রতিবেদন উন্মুক্ত হয়েছে।</p>
                    <span className="text-[10px] text-stone-400 mt-1 block">২০ মিনিট আগে</span>
                  </div>
                  <div className="py-2.5 text-xs text-stone-700">
                    <p className="font-medium text-stone-900">🚁 বগুড়া ড্রোন স্প্রে ওয়ার্কশপ</p>
                    <p className="text-stone-500 mt-0.5">আগামী বৃহস্পতিবার শিবগঞ্জে মাঠ প্রদর্শনী অনুষ্ঠিত হবে।</p>
                    <span className="text-[10px] text-stone-400 mt-1 block">২ ঘণ্টা আগে</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Button: শেয়ার করুন / তথ্য জানান */}
          <button
            type="button"
            onClick={onOpenNewPost}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#00A693] hover:bg-[#00897B] rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>তথ্য জানান</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Expansion */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-stone-200/60 bg-white">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="খুঁজুন (যেমন: ড্রোন, পেঁয়াজ সংরক্ষণ, ব্রি-১০২)..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#00A693]"
              autoFocus
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Horizontal Category Bar */}
      <div className="lg:hidden border-t border-stone-200/60 px-4 py-2 overflow-x-auto scrollbar-none flex items-center gap-2 bg-[#FAF7F2]">
        {navCategories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onSelectCategory(cat.value)}
              className={`px-3 py-1 text-xs whitespace-nowrap rounded-md font-medium transition-colors ${
                isActive
                  ? 'bg-[#00A693] text-white shadow-sm'
                  : 'bg-white border border-stone-200/80 text-stone-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
