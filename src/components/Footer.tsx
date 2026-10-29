import React from 'react';
import { Mail, Globe, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { ArticleCategory } from '../types/index.ts';

interface FooterProps {
  onSelectCategory: (category: ArticleCategory) => void;
  onOpenCreatePost: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenCreatePost,
}) => {
  return (
    <footer className="bg-[#182321] text-stone-300 border-t border-stone-800 mt-12 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        
        {/* Col 1: Brand & Editorial Mission */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-lg bg-[#00A693] flex items-center justify-center font-bold text-white text-base">
              প্লা
            </div>
            <span className="text-lg font-bold tracking-tight">প্লেইনসাইট | PLAINSYT</span>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            বাংলাদেশের কৃষি রূপান্তর, এগ্রি-টেক, বিশ্ববিদ্যালয় পর্যায়ের গবেষণা ও টেকসই খাদ্যব্যবস্থার তথ্যবহুল ও নিরপেক্ষ ডিজিটাল মিডিয়া ইকোসিস্টেম।
          </p>
          <div className="flex items-center gap-2 text-xs text-[#00A693] font-medium pt-1">
            <ShieldCheck className="w-4 h-4" />
            <span>বিজ্ঞানসম্মত ও জনস্বার্থে স্বাধীন সাংবাদিকতা</span>
          </div>
        </div>

        {/* Col 2: Categories */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            বিষয়ভিত্তিক বিভাগ
          </h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <button
                type="button"
                onClick={() => onSelectCategory('শস্য ও কৃষিবিজ্ঞান')}
                className="hover:text-[#2DD4BF] transition-colors"
              >
                শস্য ও উদ্ভিদবিজ্ঞান (Crop Science)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectCategory('এগ্রি-টেক ও ড্রোন')}
                className="hover:text-[#2DD4BF] transition-colors"
              >
                এগ্রি-টেক ও ড্রোন প্রযুক্তি (Agri-Tech)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectCategory('গবেষণা সহজ ভাষায়')}
                className="hover:text-[#2DD4BF] transition-colors"
              >
                গবেষণা সহজ ভাষায় (Simplified Science)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectCategory('খাদ্য ও কোল্ড চেইন')}
                className="hover:text-[#2DD4BF] transition-colors"
              >
                খাদ্য সংরক্ষণ ও কোল্ড চেইন (Cold Storage)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectCategory('জলবায়ু ও স্থায়িত্ব')}
                className="hover:text-[#2DD4BF] transition-colors"
              >
                জলবায়ু ও ভূগর্ভস্থ পানি (Climate & Water)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Research Partners */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            গবেষণা তথ্যসূত্র ও ইনস্টিটিউট
          </h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li className="flex items-center gap-1.5">
              <span className="text-[#00A693] font-mono font-bold">BRRI:</span>
              <span>বাংলাদেশ ধান গবেষণা ইনস্টিটিউট</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-[#00A693] font-mono font-bold">BAU:</span>
              <span>বাংলাদেশ কৃষি বিশ্ববিদ্যালয়, ময়মনসিংহ</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-[#00A693] font-mono font-bold">BARI:</span>
              <span>বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট, গাজীপুর</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-[#00A693] font-mono font-bold">SAU:</span>
              <span>শেরেবাংলা কৃষি বিশ্ববিদ্যালয়, ঢাকা</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-[#00A693] font-mono font-bold">BARC:</span>
              <span>বাংলাদেশ কৃষি গবেষণা কাউন্সিল</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Pitch */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            যোগাযোগ ও তথ্য প্রেরণ
          </h4>
          <p className="text-xs text-stone-400 leading-relaxed mb-3">
            আপনার এলাকায় কোনো সফল কৃষি প্রযুক্তি উদ্ভাবন বা মাঠের গবেষণা প্রতিবেদন থাকলে আমাদের জানান।
          </p>
          <button
            type="button"
            onClick={onOpenCreatePost}
            className="w-full py-2 px-3 text-xs font-semibold text-stone-900 bg-[#00A693] hover:bg-[#2DD4BF] text-white rounded-lg transition-colors mb-3 flex items-center justify-center gap-1.5"
          >
            <span>মাঠ রিপোর্ট পাঠান &rarr;</span>
          </button>
          <div className="text-[11px] text-stone-500 space-y-1">
            <p>ইমেইল: editorial@plainsyt.media</p>
            <p>ঢাকা, বাংলাদেশ</p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
        <p>© ২০২৬ প্লেইনসাইট মিডিয়া (Plainsyt)। সর্বস্বত্ব সংরক্ষিত।</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-stone-300">গোপনীয়তা নীতি</a>
          <span>·</span>
          <a href="#" className="hover:text-stone-300">ব্যবহারের শর্তাবলী</a>
          <span>·</span>
          <a href="#" className="hover:text-stone-300">সম্পাদকীয় নীতিমালা</a>
        </div>
      </div>
    </footer>
  );
};
