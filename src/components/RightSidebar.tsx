import React, { useState } from 'react';
import {
  TrendingUp,
  Microscope,
  UserCheck,
  UserPlus,
  Mail,
  CheckCircle2,
  ExternalLink,
  CloudSun,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';
import { ResearchPaper, FeaturedScientist, MarketCommodity } from '../types/index.ts';
import { toBengaliNumerals } from '../utils/pureLogic.ts';
import { TRENDING_TAGS } from '../data/mockData.ts';

interface RightSidebarProps {
  researchPapers: ResearchPaper[];
  scientists: FeaturedScientist[];
  marketData: MarketCommodity[];
  onOpenResearch: (paper: ResearchPaper) => void;
  onSelectTag: (tag: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  researchPapers,
  scientists: initialScientists,
  marketData,
  onOpenResearch,
  onSelectTag,
}) => {
  const [scientists, setScientists] = useState<FeaturedScientist[]>(initialScientists);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const toggleFollow = (id: string) => {
    setScientists((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFollowing: !s.isFollowing } : s))
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  const featuredPaper = researchPapers[0];

  return (
    <aside className="w-72 xl:w-80 shrink-0 py-4 hidden xl:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-none pl-2">
      <div className="space-y-4">
        
        {/* 1. Trending Topics */}
        <div className="bg-white/90 border border-stone-200/80 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
              <TrendingUp className="w-4 h-4 text-[#00A693]" />
              <span>আজকের শীর্ষ ট্রেন্ডিং</span>
            </div>
            <span className="text-[11px] font-mono text-stone-400">লাইভ</span>
          </div>

          <div className="space-y-2">
            {TRENDING_TAGS.map((item, idx) => (
              <button
                key={item.tag}
                type="button"
                onClick={() => onSelectTag(item.tag)}
                className="w-full text-left group flex items-start justify-between py-1 px-1.5 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xs font-mono font-bold text-stone-400 group-hover:text-[#00A693] mt-0.5">
                    {toBengaliNumerals(idx + 1)}.
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-stone-800 group-hover:text-[#00897B] transition-colors leading-snug">
                      #{item.tag}
                    </p>
                    <p className="text-[11px] text-stone-400">{item.count}</p>
                  </div>
                </div>
                <span className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                  {item.topic}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Research Explained Simply (গবেষণা সহজ ভাষায়) */}
        {featuredPaper && (
          <div className="bg-gradient-to-br from-white to-[#F2FBF9] border border-[#00A693]/20 rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#00897B]">
                <Microscope className="w-4 h-4" />
                <span>গবেষণা সহজ ভাষায়</span>
              </div>
              <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 bg-[#00A693]/10 text-[#00897B] rounded">
                {featuredPaper.institutionCode}
              </span>
            </div>

            <h4 className="text-xs font-bold text-stone-900 leading-snug mb-1.5">
              {featuredPaper.title}
            </h4>
            <p className="text-[11px] text-stone-600 line-clamp-3 leading-relaxed mb-2.5">
              {featuredPaper.summary}
            </p>

            <div className="p-2 bg-white/80 border border-stone-200/60 rounded-lg mb-2.5">
              <span className="text-[10px] font-semibold text-stone-500 uppercase block mb-0.5">
                মাঠের প্রভাব:
              </span>
              <p className="text-[11px] text-emerald-800 font-medium leading-tight">
                {featuredPaper.practicalImpact}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenResearch(featuredPaper)}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-[#00897B] bg-white border border-[#00A693]/30 rounded-lg hover:bg-[#00A693]/5 transition-colors"
            >
              <span>বিশ্লেষণ পড়ুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 3. Live Agri-Market & Weather Bulletin */}
        <div className="bg-white/90 border border-stone-200/80 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
              <CloudSun className="w-4 h-4 text-amber-500" />
              <span>কৃষি বাজারদর ও আবহাওয়া</span>
            </div>
            <span className="text-[10px] text-stone-400">দৈনিক পাইকারি</span>
          </div>

          <div className="space-y-1.5 mb-2.5 divide-y divide-stone-100">
            {marketData.map((item) => (
              <div key={item.id} className="pt-1.5 first:pt-0 flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-stone-800 block leading-tight">{item.name}</span>
                  <span className="text-[10px] text-stone-400">{item.market}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-semibold text-stone-900 tabular-nums">
                    ৳{toBengaliNumerals(item.pricePerKg.toFixed(1))}/কেজি
                  </span>
                  <div className="flex items-center justify-end gap-0.5 text-[10px]">
                    {item.trend === 'up' && (
                      <span className="text-emerald-600 flex items-center">
                        <ArrowUpRight className="w-3 h-3" />
                        +{toBengaliNumerals(item.priceChange)}%
                      </span>
                    )}
                    {item.trend === 'down' && (
                      <span className="text-rose-600 flex items-center">
                        <ArrowDownRight className="w-3 h-3" />
                        {toBengaliNumerals(item.priceChange)}%
                      </span>
                    )}
                    {item.trend === 'stable' && (
                      <span className="text-stone-400 flex items-center">
                        <Minus className="w-3 h-3" /> অপরিবর্তিত
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 bg-amber-50/70 border border-amber-200/50 rounded-lg text-[11px] text-amber-900 leading-snug">
            🌧️ <span className="font-semibold">পূর্বাভাস:</span> আগামী ৪৮ ঘণ্টায় রংপুর ও সিলেটে মাঝারি বৃষ্টিপাত হতে পারে; বোরো বীজতলায় নিষ্কাশন নিশ্চিত করুন।
          </div>
        </div>

        {/* 4. Featured Scientists & Agripreneurs */}
        <div className="bg-white/90 border border-stone-200/80 rounded-xl p-3.5 shadow-xs">
          <div className="mb-2">
            <span className="text-xs font-bold text-stone-900 block">
              মাঠের উদ্ভাবক ও বিজ্ঞানী
            </span>
            <span className="text-[10px] text-stone-400">অনুসরণ করুন নতুন গবেষণার জন্য</span>
          </div>

          <div className="space-y-2.5">
            {scientists.slice(0, 3).map((sci) => (
              <div key={sci.id} className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-stone-800 truncate">{sci.name}</p>
                  <p className="text-[10px] text-stone-500 truncate">{sci.organization}</p>
                  <p className="text-[10px] text-[#00897B] truncate">{sci.focusArea}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFollow(sci.id)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors shrink-0 flex items-center gap-1 ${
                    sci.isFollowing
                      ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      : 'bg-[#00A693] text-white hover:bg-[#00897B]'
                  }`}
                  aria-label={`${sci.name} কে ${sci.isFollowing ? 'আনফলো' : 'ফলো'} করুন`}
                >
                  {sci.isFollowing ? (
                    <>
                      <UserCheck className="w-3 h-3" />
                      <span>যুক্ত</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3 h-3" />
                      <span>ফলো</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Compact Newsletter Box */}
        <div className="bg-[#1C2A28] text-white rounded-xl p-3.5 shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-md bg-[#00A693] flex items-center justify-center">
              <Mail className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-bold text-stone-100">প্লেইনসাইট সাপ্তাহিক ব্রিফ</span>
          </div>
          <p className="text-[11px] text-stone-300 leading-relaxed mb-3">
            প্রতি রবিবার সকালে কৃষি প্রযুক্তি, স্টার্টআপ ফান্ডিং ও গবেষণার সারাংশ আপনার ইনবক্সে।
          </p>

          {subscribed ? (
            <div className="flex items-center gap-2 p-2 bg-[#00A693]/20 border border-[#00A693]/40 rounded-lg text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>ধন্যবাদ! আপনি সফলভাবে যুক্ত হয়েছেন।</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="আপনার ইমেইল দিন..."
                className="w-full px-3 py-1.5 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#00A693]"
              />
              <button
                type="submit"
                className="w-full py-1.5 text-xs font-semibold text-stone-900 bg-[#00A693] hover:bg-[#2DD4BF] text-white rounded-lg transition-colors"
              >
                বিনামূল্যে যুক্ত হোন
              </button>
            </form>
          )}
        </div>

      </div>
    </aside>
  );
};
