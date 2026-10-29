import React from 'react';
import {
  Wheat,
  Cpu,
  Microscope,
  Snowflake,
  CloudRain,
  Rocket,
  Fish,
  Bookmark,
  PlaySquare,
  TrendingUp,
  Award,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { ArticleCategory } from '../types/index.ts';
import { toBengaliNumerals } from '../utils/pureLogic.ts';

interface LeftSidebarProps {
  selectedCategory: ArticleCategory;
  onSelectCategory: (category: ArticleCategory) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onScrollToReels: () => void;
  onOpenEditorialPolicy: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  savedCount,
  onOpenSaved,
  onScrollToReels,
  onOpenEditorialPolicy,
}) => {
  const categories: { label: ArticleCategory; icon: React.ReactNode; count: number }[] = [
    { label: 'সকল', icon: <Compass className="w-4 h-4" />, count: 8 },
    { label: 'শস্য ও কৃষিবিজ্ঞান', icon: <Wheat className="w-4 h-4" />, count: 3 },
    { label: 'এগ্রি-টেক ও ড্রোন', icon: <Cpu className="w-4 h-4" />, count: 4 },
    { label: 'গবেষণা সহজ ভাষায়', icon: <Microscope className="w-4 h-4" />, count: 3 },
    { label: 'খাদ্য ও কোল্ড চেইন', icon: <Snowflake className="w-4 h-4" />, count: 2 },
    { label: 'জলবায়ু ও স্থায়িত্ব', icon: <CloudRain className="w-4 h-4" />, count: 3 },
    { label: 'স্টার্টআপ ও উদ্ভাবন', icon: <Rocket className="w-4 h-4" />, count: 2 },
    { label: 'মৎস্য ও প্রাণিসম্পদ', icon: <Fish className="w-4 h-4" />, count: 2 },
  ];

  return (
    <aside className="w-64 xl:w-72 shrink-0 py-4 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-none pr-2">
      {/* User profile / Reader info */}
      <div className="p-3 mb-3 bg-white/70 border border-stone-200/80 rounded-xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#00A693]/15 text-[#00897B] font-bold flex items-center justify-center text-sm ring-1 ring-[#00A693]/20">
          প্লা
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-stone-900 truncate">কৃষি পাঠক ও পর্যবেক্ষক</p>
          <p className="text-[11px] text-stone-500 truncate">ঢাকা, বাংলাদেশ · প্রোফাইল</p>
        </div>
      </div>

      {/* Main Categories Menu */}
      <div className="mb-4">
        <div className="px-2 mb-1.5 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            বিষয়ভিত্তিক অন্বেষণ
          </span>
        </div>
        <nav className="space-y-0.5" aria-label="বিষয়ভিত্তিক ক্যাটাগরি">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => onSelectCategory(cat.label)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                  isSelected
                    ? 'bg-[#00A693] text-white shadow-sm'
                    : 'text-stone-700 hover:bg-stone-200/60 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isSelected ? 'text-white' : 'text-stone-500'}>
                    {cat.icon}
                  </span>
                  <span className="truncate">{cat.label}</span>
                </div>
                <span
                  className={`text-[11px] font-mono tabular-nums px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'text-stone-400'
                  }`}
                >
                  {toBengaliNumerals(cat.count)}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Shortcuts */}
      <div className="mb-4 pt-3 border-t border-stone-200/70">
        <div className="px-2 mb-1.5">
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            দ্রুত নেভিগেশন
          </span>
        </div>
        <div className="space-y-0.5">
          <button
            type="button"
            onClick={onOpenSaved}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-200/60 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <Bookmark className="w-4 h-4 text-amber-600" />
              <span>সংরক্ষিত প্রতিবেদন</span>
            </div>
            {savedCount > 0 && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums">
                {toBengaliNumerals(savedCount)}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onScrollToReels}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-200/60 transition-colors text-left"
          >
            <PlaySquare className="w-4 h-4 text-rose-500" />
            <span>ভিডিও রিলস ও মাঠের চিত্র</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory('শস্য ও কৃষিবিজ্ঞান')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-200/60 transition-colors text-left"
          >
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>বাজারদর ও মৌসুম বিশ্লেষণ</span>
          </button>
        </div>
      </div>

      {/* Institutional Network */}
      <div className="mb-4 pt-3 border-t border-stone-200/70">
        <div className="px-2 mb-2 flex items-center gap-1 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
          <Award className="w-3.5 h-3.5 text-[#00A693]" />
          <span>গবেষণা সহযোগী নেটওয়ার্ক</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 px-1">
          <div className="p-2 bg-white/70 border border-stone-200/80 rounded-lg text-[11px] text-stone-700 hover:border-[#00A693]/40 transition-colors">
            <span className="font-bold text-[#00897B] block">BRRI</span>
            <span className="text-[10px] text-stone-500 line-clamp-1">ধান গবেষণা</span>
          </div>
          <div className="p-2 bg-white/70 border border-stone-200/80 rounded-lg text-[11px] text-stone-700 hover:border-[#00A693]/40 transition-colors">
            <span className="font-bold text-[#00897B] block">BAU</span>
            <span className="text-[10px] text-stone-500 line-clamp-1">কৃষি বিশ্ববিদ্যালয়</span>
          </div>
          <div className="p-2 bg-white/70 border border-stone-200/80 rounded-lg text-[11px] text-stone-700 hover:border-[#00A693]/40 transition-colors">
            <span className="font-bold text-[#00897B] block">BARI</span>
            <span className="text-[10px] text-stone-500 line-clamp-1">কৃষি গবেষণা</span>
          </div>
          <div className="p-2 bg-white/70 border border-stone-200/80 rounded-lg text-[11px] text-stone-700 hover:border-[#00A693]/40 transition-colors">
            <span className="font-bold text-[#00897B] block">SAU</span>
            <span className="text-[10px] text-stone-500 line-clamp-1">শেরেবাংলা কৃষি</span>
          </div>
        </div>
      </div>

      {/* Editorial Standard Card */}
      <div className="p-3 bg-stone-100/90 border border-stone-200 rounded-xl text-stone-700">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00897B] mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>প্লেইনসাইট অঙ্গীকার</span>
        </div>
        <p className="text-[11px] text-stone-600 leading-relaxed mb-2">
          আমরা কৃষক ও তরুণ গবেষকদের কাছে জটিল গবেষণাপত্র সহজ ও তথ্যবহুল বাংলায় উপস্থাপন করি।
        </p>
        <button
          type="button"
          onClick={onOpenEditorialPolicy}
          className="text-[11px] font-medium text-[#00A693] hover:underline"
        >
          আমাদের সম্পাদকীয় নীতিমালা &rarr;
        </button>
      </div>
    </aside>
  );
};
