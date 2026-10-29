import React, { useState } from 'react';
import {
  Play,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronRight,
  Sparkles,
  Flame,
  Clock,
  Microscope,
  Compass,
  Building2,
  CheckCircle2,
  Send,
  ExternalLink,
  SearchX,
} from 'lucide-react';
import { Article, StoryReel, FeedFilter, ArticleCategory, Comment } from '../types/index.ts';
import { ImageGraphic } from './ImageGraphic.tsx';
import { toBengaliNumerals, formatBengaliNumberCompact } from '../utils/pureLogic.ts';

interface CentralFeedProps {
  articles: Article[];
  reels: StoryReel[];
  activeFilter: FeedFilter;
  onFilterChange: (filter: FeedFilter) => void;
  selectedCategory: ArticleCategory;
  onSelectCategory: (category: ArticleCategory) => void;
  onOpenArticle: (article: Article) => void;
  onOpenReel: (reelId: string) => void;
  onOpenCreatePost: () => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onToggleLike: (article: Article) => void;
  onAddComment: (articleId: string, comment: Comment) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

export const CentralFeed: React.FC<CentralFeedProps> = ({
  articles,
  reels,
  activeFilter,
  onFilterChange,
  selectedCategory,
  onSelectCategory,
  onOpenArticle,
  onOpenReel,
  onOpenCreatePost,
  bookmarkedIds,
  onToggleBookmark,
  onToggleLike,
  onAddComment,
  searchQuery,
  onClearSearch,
}) => {
  // Inline card comment input states
  const [activeCommentBoxId, setActiveCommentBoxId] = useState<string | null>(null);
  const [inlineCommentInputs, setInlineCommentInputs] = useState<Record<string, string>>({});
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  const toggleCommentBox = (articleId: string) => {
    setActiveCommentBoxId((prev) => (prev === articleId ? null : articleId));
  };

  const handleInlineCommentSubmit = (articleId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = inlineCommentInputs[articleId]?.trim();
    if (!text) return;

    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      author: 'কৃষি অনুরাগী পাঠক',
      role: 'মাঠ পর্যবেক্ষক',
      avatar: '',
      text,
      timestamp: 'এইমাত্র',
      likes: 0,
    };

    onAddComment(articleId, newComment);
    setInlineCommentInputs((prev) => ({ ...prev, [articleId]: '' }));
  };

  const handleShareArticle = (articleId: string) => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShareId(articleId);
    setTimeout(() => setCopiedShareId(null), 2000);
  };

  const filterTabs: { id: FeedFilter; label: string; icon: React.ReactNode }[] = [
    { id: 'trending', label: 'আলোচিত', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'latest', label: 'সাম্প্রতিক', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'research', label: 'গবেষণা সহজ ভাষায়', icon: <Microscope className="w-3.5 h-3.5" /> },
    { id: 'field-stories', label: 'মাঠের গল্প', icon: <Compass className="w-3.5 h-3.5" /> },
  ];

  return (
    <main className="flex-1 max-w-2xl xl:max-w-3xl py-4 space-y-4 min-w-0" id="main-content">
      
      {/* 1. Horizontal Short-Form Video Reels Carousel */}
      <section
        id="reels-carousel"
        aria-label="কৃষি রিলস ও মাঠের ভিডিও"
        className="bg-white/90 border border-stone-200/80 rounded-2xl p-3.5 shadow-xs"
      >
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-rose-600 ml-0.5" />
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-stone-900">
              কৃষি রিলস ও মাঠের ভিডিও
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-[#00A693] hover:underline cursor-pointer">
            সকল রিলস &rarr;
          </span>
        </div>

        {/* Carousel container */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin scroll-smooth snap-x snap-mandatory">
          {reels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => onOpenReel(reel.id)}
              className="relative w-32 sm:w-36 h-52 sm:h-56 shrink-0 rounded-xl overflow-hidden cursor-pointer group shadow-xs snap-start transition-transform hover:-translate-y-0.5 select-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onOpenReel(reel.id);
              }}
              aria-label={`ভিডিও দেখুন: ${reel.title}`}
            >
              {/* Vibrant gradient backdrop */}
              <div className={`absolute inset-0 bg-gradient-to-b ${reel.gradientTheme} opacity-95 transition-opacity group-hover:opacity-100`} />

              {/* Creator avatar on top */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full ring-2 ring-white/90 bg-white/20 text-white flex items-center justify-center text-[10px] font-bold">
                  {reel.creator.slice(0, 2)}
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-9 h-9 rounded-full bg-black/40 group-hover:bg-[#00A693] text-white flex items-center justify-center transition-colors backdrop-blur-xs">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
              </div>

              {/* Bottom details */}
              <div className="absolute inset-x-0 bottom-0 p-2.5 z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">
                <p className="text-[11px] font-bold line-clamp-2 leading-tight drop-shadow mb-1">
                  {reel.title}
                </p>
                <div className="flex items-center justify-between text-[10px] text-white/80 font-mono">
                  <span>{formatBengaliNumberCompact(reel.views)} ভিউ</span>
                  <span>{toBengaliNumerals(reel.duration)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Create Post / Share Tip Box (Facebook web style) */}
      <section
        aria-label="মাঠের তথ্য জানান"
        className="bg-white/90 border border-stone-200/80 rounded-2xl p-3.5 shadow-xs"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#00A693]/15 text-[#00897B] font-bold flex items-center justify-center text-xs shrink-0 ring-1 ring-[#00A693]/20">
            প্লা
          </div>
          <button
            type="button"
            onClick={onOpenCreatePost}
            className="flex-1 text-left px-4 py-2 bg-stone-100/80 hover:bg-stone-200/60 rounded-full text-xs text-stone-500 transition-colors truncate"
          >
            আপনার এলাকার ফসলের রোগ, ড্রোন বা মাঠের অভিজ্ঞতা জানান...
          </button>
        </div>

        <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-stone-100 text-xs text-stone-600">
          <button
            type="button"
            onClick={onOpenCreatePost}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg hover:bg-stone-100 transition-colors text-emerald-700 font-medium"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>মাঠের আপডেট</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectCategory('গবেষণা সহজ ভাষায়')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg hover:bg-stone-100 transition-colors text-[#00897B] font-medium"
          >
            <Microscope className="w-4 h-4 text-[#00A693]" />
            <span>গবেষণা প্রশ্ন</span>
          </button>
          <button
            type="button"
            onClick={onOpenCreatePost}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg hover:bg-stone-100 transition-colors text-amber-700 font-medium"
          >
            <span>💡 সফল চাষাবাদ টিপস</span>
          </button>
        </div>
      </section>

      {/* 3. Feed Filter Controls (Segmented clean buttons) */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1 p-1 bg-stone-200/60 rounded-xl" role="tablist">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => onFilterChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className={isActive ? 'text-[#00A693]' : 'text-stone-500'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active search or category tag indicator */}
        {(searchQuery || selectedCategory !== 'সকল') && (
          <div className="flex items-center gap-1.5 text-xs text-stone-500 whitespace-nowrap shrink-0">
            <span>ফিল্টার:</span>
            <span className="font-semibold text-[#00897B]">
              {selectedCategory !== 'সকল' ? selectedCategory : `"${searchQuery}"`}
            </span>
            <button
              type="button"
              onClick={() => {
                onClearSearch();
                onSelectCategory('সকল');
              }}
              className="text-stone-400 hover:text-stone-600 ml-1 underline"
            >
              রিসেট
            </button>
          </div>
        )}
      </div>

      {/* 4. Article Feed List */}
      {articles.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center shadow-xs">
          <SearchX className="w-12 h-12 mx-auto text-stone-300 mb-3" />
          <h3 className="text-sm font-bold text-stone-800 mb-1">কোনো প্রতিবেদন খুঁজে পাওয়া যায়নি</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
            আপনার অনুসন্ধান বা নির্বাচিত ক্যাটাগরির সাথে মিলে এমন কোনো ফলাফল নেই। অন্য কোনো শব্দ দিয়ে চেষ্টা করুন।
          </p>
          <button
            type="button"
            onClick={() => {
              onClearSearch();
              onSelectCategory('সকল');
            }}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#00A693] hover:bg-[#00897B] rounded-lg transition-colors"
          >
            সব প্রতিবেদন দেখুন
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article, index) => {
            const isBookmarked = bookmarkedIds.includes(article.id);
            const isCommentBoxOpen = activeCommentBoxId === article.id;
            const isCopied = copiedShareId === article.id;
            const isLeadStory = index === 0 && selectedCategory === 'সকল' && !searchQuery;

            return (
              <article
                key={article.id}
                className={`bg-white border rounded-2xl overflow-hidden transition-all shadow-xs hover:border-[#00A693]/40 ${
                  isLeadStory ? 'border-[#00A693]/30 ring-1 ring-[#00A693]/10' : 'border-stone-200/80'
                }`}
              >
                {/* Visual Header Graphic */}
                <div
                  className="cursor-pointer group relative"
                  onClick={() => onOpenArticle(article)}
                >
                  <ImageGraphic
                    type={article.imageType}
                    title={article.title}
                    aspect={isLeadStory ? '16/9' : '16/9'}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                </div>

                {/* Card Content Area */}
                <div className="p-4 sm:p-5">
                  
                  {/* Clean unboxed metadata kicker (Zero-Pill Discipline) */}
                  <div className="flex items-center gap-2 text-xs text-[#00897B] font-mono mb-2">
                    <span className="font-semibold uppercase">{article.category}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="text-stone-500 font-sans">
                      {toBengaliNumerals(article.readTimeMinutes)} মিনিট পাঠ
                    </span>
                    {article.researchBasis && (
                      <>
                        <span aria-hidden="true" className="text-stone-300">·</span>
                        <span className="text-emerald-700 font-sans font-medium">বিজ্ঞানভিত্তিক প্রতিবেদন</span>
                      </>
                    )}
                  </div>

                  {/* Title & Deck */}
                  <h2
                    onClick={() => onOpenArticle(article)}
                    className={`font-bold text-stone-900 hover:text-[#00897B] transition-colors cursor-pointer leading-snug tracking-tight mb-2 ${
                      isLeadStory ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                    }`}
                    style={{ textWrap: 'balance' }}
                  >
                    {article.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
                    {article.subtitle}
                  </p>

                  {/* Key Takeaways preview for lead story */}
                  {isLeadStory && article.takeaways && article.takeaways.length > 0 && (
                    <div className="mb-4 p-3 bg-stone-50 border border-stone-200/70 rounded-xl">
                      <span className="text-[11px] font-bold text-[#00897B] uppercase block mb-1.5">
                        প্রধান প্রাপ্তি:
                      </span>
                      <p className="text-xs text-stone-700 leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00A693] mt-1.5 shrink-0" />
                        <span>{article.takeaways[0]}</span>
                      </p>
                    </div>
                  )}

                  {/* Author Byline */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-100 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#00A693]/15 text-[#00897B] font-bold flex items-center justify-center text-xs shrink-0 ring-1 ring-[#00A693]/20">
                        {article.author.name.slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-900 truncate">
                          {article.author.name}
                        </p>
                        <p className="text-[10px] text-stone-500 truncate">
                          {article.author.organization}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenArticle(article)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#00897B] hover:text-[#00695C] shrink-0"
                    >
                      <span>সম্পূর্ণ পড়ুন</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Interactive Reactions Strip (Social media style) */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-stone-600">
                    <div className="flex items-center gap-1 sm:gap-2">
                      {/* Like Reaction */}
                      <button
                        type="button"
                        onClick={() => onToggleLike(article)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          article.userLiked
                            ? 'text-rose-600 bg-rose-50 font-semibold'
                            : 'hover:bg-stone-100 text-stone-600 hover:text-stone-900'
                        }`}
                        aria-label={`লাইক করুন (${formatBengaliNumberCompact(article.stats.likes)})`}
                      >
                        <Heart className={`w-4 h-4 ${article.userLiked ? 'fill-rose-600' : ''}`} />
                        <span className="font-mono tabular-nums">
                          {formatBengaliNumberCompact(article.stats.likes)}
                        </span>
                      </button>

                      {/* Comments toggle */}
                      <button
                        type="button"
                        onClick={() => toggleCommentBox(article.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          isCommentBoxOpen
                            ? 'bg-[#00A693]/10 text-[#00897B]'
                            : 'hover:bg-stone-100 text-stone-600 hover:text-stone-900'
                        }`}
                        aria-label={`মন্তব্য দেখুন (${toBengaliNumerals(article.comments.length)})`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-mono tabular-nums">
                          {toBengaliNumerals(article.comments.length)}
                        </span>
                      </button>

                      {/* Share */}
                      <button
                        type="button"
                        onClick={() => handleShareArticle(article.id)}
                        className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors"
                        aria-label="প্রতিবেদন লিংক কপি করুন"
                      >
                        <Share2 className="w-4 h-4" />
                        <span className="hidden sm:inline font-mono tabular-nums">
                          {toBengaliNumerals(article.stats.shares)}
                        </span>
                        {isCopied && (
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-stone-900 text-white px-2 py-0.5 rounded shadow whitespace-nowrap">
                            কপি হয়েছে!
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Bookmark */}
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(article.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarked
                          ? 'text-amber-600 bg-amber-50'
                          : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                      }`}
                      title={isBookmarked ? 'সংরক্ষিত' : 'সংরক্ষণ করুন'}
                      aria-label={isBookmarked ? 'সংরক্ষণ বাতিল' : 'সংরক্ষণ করুন'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600' : ''}`} />
                    </button>
                  </div>

                  {/* Expandable Inline Comments Area */}
                  {isCommentBoxOpen && (
                    <div className="mt-3 pt-3 border-t border-stone-100 space-y-2.5 animate-in fade-in duration-150">
                      {/* Comments stream */}
                      {article.comments.length > 0 && (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs scrollbar-none">
                          {article.comments.map((comm) => (
                            <div key={comm.id} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="font-bold text-stone-800">{comm.author}</span>
                                <span className="text-[10px] text-stone-400 font-mono">{comm.timestamp}</span>
                              </div>
                              <p className="text-stone-700">{comm.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Comment Input */}
                      <form
                        onSubmit={(e) => handleInlineCommentSubmit(article.id, e)}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={inlineCommentInputs[article.id] || ''}
                          onChange={(e) =>
                            setInlineCommentInputs((prev) => ({
                              ...prev,
                              [article.id]: e.target.value,
                            }))
                          }
                          placeholder="আপনার মতামত বা পর্যবেক্ষণ যোগ করুন..."
                          className="flex-1 px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#00A693]"
                        />
                        <button
                          type="submit"
                          disabled={!inlineCommentInputs[article.id]?.trim()}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-[#00A693] hover:bg-[#00897B] disabled:opacity-40 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>পাঠান</span>
                        </button>
                      </form>
                    </div>
                  )}

                </div>
              </article>
            );
          })}
        </div>
      )}

    </main>
  );
};
