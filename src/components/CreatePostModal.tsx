import React, { useState } from 'react';
import { X, Sparkles, Send, MapPin, Tag } from 'lucide-react';
import { Article, ArticleCategory } from '../types/index.ts';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitArticle: (article: Article) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmitArticle,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<ArticleCategory>('শস্য ও কৃষিবিজ্ঞান');
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newArticle: Article = {
      id: `user-post-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || `${location ? `[${location}] ` : ''}মাঠ পর্যায়ের পর্যবেক্ষণ ও অভিজ্ঞতা।`,
      category,
      categoryEn: 'Field Insights',
      imageType: 'sensor',
      author: {
        name: authorName.trim() || 'মাঠ গবেষক / উদ্যোক্তা',
        designation: 'কৃষি অনুরাগী ও অবদানকারী',
        organization: location ? `মাঠ প্রতিনিধি, ${location}` : 'প্লেইনসাইট কমিউনিটি',
        avatar: '',
      },
      publishedAt: new Date().toISOString(),
      readTimeMinutes: 2,
      takeaways: [
        'মাঠ পর্যায়ের বাস্তব পর্যবেক্ষণ থেকে সরাসরি সংগৃহীত তথ্য।',
        'অন্যান্য কৃষক ও উদ্যোক্তাদের সঙ্গে তাৎক্ষণিক অভিজ্ঞতা বিনিময়।',
      ],
      content: [content.trim()],
      stats: {
        views: 12,
        likes: 1,
        commentsCount: 0,
        shares: 0,
      },
      comments: [],
      userLiked: true,
    };

    onSubmitArticle(newArticle);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  const categories: ArticleCategory[] = [
    'শস্য ও কৃষিবিজ্ঞান',
    'এগ্রি-টেক ও ড্রোন',
    'গবেষণা সহজ ভাষায়',
    'খাদ্য ও কোল্ড চেইন',
    'জলবায়ু ও স্থায়িত্ব',
    'স্টার্টআপ ও উদ্ভাবন',
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="নতুন কৃষি তথ্য বা অভিজ্ঞতা শেয়ার করুন"
    >
      <div className="w-full max-w-lg bg-[#FAF7F2] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-white/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00A693]/15 text-[#00897B] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">মাঠের তথ্য বা অভিজ্ঞতা জানান</h3>
              <p className="text-[11px] text-stone-500">আপনার এলাকার কৃষি সমস্যা বা উদ্ভাবন সবার সাথে শেয়ার করুন</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3">
              ✓
            </div>
            <h4 className="text-base font-bold text-stone-900 mb-1">সফলভাবে ফিডে যুক্ত হয়েছে!</h4>
            <p className="text-xs text-stone-600">আপনার মাঠ রিপোর্টটি এখন প্লেইনসাইট ফিডের শীর্ষে প্রদর্শিত হচ্ছে।</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                শিরোনাম বা প্রধান বিষয় <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="যেমন: বগুড়ায় আলুর আগাম ব্লাইট প্রতিরোধে নতুন ট্রাইকোডার্মা স্প্রে"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#00A693]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  বিষয় / ক্যাটাগরি
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#00A693]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  এলাকা / জেলা
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="যেমন: শিবগঞ্জ, বগুড়া"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#00A693]"
                  />
                  <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                আপনার নাম
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="নাম বা প্রতিষ্ঠানের পরিচয়"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#00A693]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                বিস্তারিত বিবরণ বা পর্যবেক্ষণ <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="কী প্রযুক্তি ব্যবহার করলেন? ফলন বা খরচে কী প্রভাব পড়ল? সংক্ষেপে লিখুন..."
                className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#00A693]"
              />
            </div>

            <div className="pt-2 border-t border-stone-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#00A693] hover:bg-[#00897B] rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ফিডে প্রকাশ করুন</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
