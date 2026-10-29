import React from 'react';
import { X, Bookmark, Trash2, ExternalLink, BookOpen } from 'lucide-react';
import { Article } from '../types/index.ts';
import { toBengaliNumerals } from '../utils/pureLogic.ts';
import { ImageGraphic } from './ImageGraphic.tsx';

interface SavedArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onOpenArticle: (article: Article) => void;
  onRemoveBookmark: (id: string) => void;
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onOpenArticle,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="সংরক্ষিত প্রতিবেদন তালিকা"
    >
      <div className="w-full max-w-md h-full bg-[#FAF7F2] border-l border-stone-200 shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#00A693]" />
            <h2 className="text-base font-bold text-stone-900">
              সংরক্ষিত প্রতিবেদন ({toBengaliNumerals(savedArticles.length)})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
          {savedArticles.length === 0 ? (
            <div className="text-center py-16 text-stone-500">
              <BookOpen className="w-12 h-12 mx-auto text-stone-300 mb-3" />
              <p className="text-sm font-semibold text-stone-700">কোনো সংরক্ষিত প্রতিবেদন নেই</p>
              <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                যে কোনো প্রতিবেদনের বুকমার্ক আইকনে ক্লিক করে পরবর্তীতে পড়ার জন্য সংরক্ষণ করুন।
              </p>
            </div>
          ) : (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="p-3 bg-white border border-stone-200/80 rounded-xl hover:border-[#00A693]/40 transition-all flex gap-3 group"
              >
                <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0">
                  <ImageGraphic type={art.imageType} aspect="4/3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold text-[#00897B] font-mono">
                      {art.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveBookmark(art.id)}
                      className="text-stone-400 hover:text-rose-600 p-0.5"
                      title="সংরক্ষণ তালিকা থেকে মুছুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4
                    onClick={() => {
                      onOpenArticle(art);
                      onClose();
                    }}
                    className="text-xs font-bold text-stone-900 line-clamp-2 cursor-pointer group-hover:text-[#00897B] transition-colors leading-snug"
                  >
                    {art.title}
                  </h4>
                  <p className="text-[10px] text-stone-400 font-mono mt-1">
                    {art.author.name} · {toBengaliNumerals(art.readTimeMinutes)} মিনিট পাঠ
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="pt-4 border-t border-stone-200 mt-2 flex items-center justify-between text-xs text-stone-500">
          <span>অফলাইনে পড়ার সুযোগ শীঘ্রই চালু হচ্ছে</span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#00A693] font-semibold hover:underline"
          >
            ফিরে যান
          </button>
        </div>

      </div>
    </div>
  );
};
