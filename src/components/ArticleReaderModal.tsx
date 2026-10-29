import React, { useState } from 'react';
import {
  X,
  Bookmark,
  Share2,
  Heart,
  Volume2,
  VolumeX,
  Play,
  Pause,
  CheckCircle2,
  MessageCircle,
  Send,
  Building2,
  Calendar,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Article, Comment } from '../types/index.ts';
import { ImageGraphic } from './ImageGraphic.tsx';
import { toBengaliNumerals, formatBengaliNumberCompact } from '../utils/pureLogic.ts';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onToggleLike: (article: Article) => void;
  onAddComment: (articleId: string, comment: Comment) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onToggleLike,
  onAddComment,
}) => {
  if (!article) return null;

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  // Keyboard Escape listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: commentAuthor.trim() || 'সম্মানিত পাঠক',
      role: 'কৃষি অনুরাগী',
      avatar: '',
      text: commentText.trim(),
      timestamp: 'এইমাত্র',
      likes: 0,
    };

    onAddComment(article.id, newComment);
    setCommentText('');
    setCommentAuthor('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-article-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-4 sm:my-8 text-stone-900 flex flex-col max-h-[92vh]">
        
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 bg-[#FAF7F2]/95 backdrop-blur-md px-6 py-3.5 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00897B] font-mono uppercase tracking-wide">
            <span>{article.category}</span>
            <span>·</span>
            <span className="text-stone-500 font-sans">{toBengaliNumerals(article.readTimeMinutes)} মিনিট পাঠ</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-700'
                  : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
              title="সংরক্ষণ করুন"
              aria-label={isBookmarked ? 'সংরক্ষণ বাতিল' : 'সংরক্ষণ করুন'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-stone-900 transition-colors relative"
              title="লিংক কপি করুন"
              aria-label="প্রতিবেদন শেয়ার করুন"
            >
              <Share2 className="w-4 h-4" />
              {copiedShare && (
                <span className="absolute -bottom-7 right-0 text-[10px] bg-stone-900 text-white px-2 py-0.5 rounded shadow whitespace-nowrap">
                  লিংক কপি হয়েছে!
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors ml-1"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-6 scrollbar-thin">
          
          {/* Main Visual Graphic Banner */}
          <div className="mb-6 rounded-xl overflow-hidden border border-stone-200/80 shadow-xs">
            <ImageGraphic type={article.imageType} aspect="16/9" />
          </div>

          {/* Title & Deck */}
          <h1
            id="reader-article-title"
            className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-snug mb-3"
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-6 font-medium">
            {article.subtitle}
          </p>

          {/* Byline Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-y border-stone-200/70 mb-6 bg-white/60 -mx-6 sm:-mx-10 px-6 sm:px-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#00A693]/15 text-[#00897B] font-bold flex items-center justify-center text-sm ring-1 ring-[#00A693]/30">
                {article.author.name.slice(0, 2)}
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">{article.author.name}</p>
                <p className="text-[11px] text-stone-500">{article.author.designation}</p>
                <div className="flex items-center gap-1 text-[10px] text-[#00897B] font-medium mt-0.5">
                  <Building2 className="w-3 h-3" />
                  <span>{article.author.organization}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-stone-500 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(article.publishedAt).toLocaleDateString('bn-BD', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{toBengaliNumerals(article.readTimeMinutes)} মিনিট</span>
              </span>
            </div>
          </div>

          {/* Audio Explainer Player Simulation */}
          <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-[#00A693]/30 rounded-xl mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-10 h-10 rounded-full bg-[#00A693] text-white flex items-center justify-center hover:bg-[#00897B] transition-colors shadow-xs"
                aria-label={isPlayingAudio ? 'অডিও থামান' : 'অডিও শুনুন'}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>
              <div>
                <span className="text-xs font-bold text-stone-900 block leading-tight">
                  শুনুন: প্রতিবেদনের অডিও সারাংশ
                </span>
                <span className="text-[11px] text-stone-500">
                  {isPlayingAudio ? 'চলছে... (১:৪৫ মিনিট)' : 'কৃষি গবেষকদের তৈরি কণ্ঠ সংস্করণ'}
                </span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#00897B] font-mono">
              <Volume2 className="w-4 h-4" />
              <span>বাংলা অডিও</span>
            </div>
          </div>

          {/* Key Takeaways Box (গবেষণার মূল প্রাপ্তি) */}
          <div className="p-4 bg-white border border-stone-200/90 rounded-xl shadow-xs mb-6">
            <h3 className="text-xs font-bold text-[#00897B] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>গবেষণার মূল প্রাপ্তি ও কৃষকের লাভ</span>
            </h3>
            <ul className="space-y-2">
              {article.takeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-stone-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A693] mt-2 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial Long-form Body with Drop Cap on the First Paragraph */}
          <div className="prose prose-stone max-w-none text-stone-800 space-y-4 text-sm sm:text-base leading-relaxed mb-8">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'first-letter:text-4xl first-letter:font-bold first-letter:text-[#00897B] first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 leading-relaxed'
                    : 'leading-relaxed'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Research Basis / Citation Box */}
          {article.researchBasis && (
            <div className="p-3.5 bg-stone-100/90 border border-stone-200 rounded-xl text-xs text-stone-700 mb-8">
              <span className="font-bold text-stone-900 block mb-1">গবেষণার উৎস ও তথ্যসূত্র:</span>
              <p className="text-stone-600 mb-0.5">{article.researchBasis.journalOrInst}</p>
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono pt-1 border-t border-stone-200/60 mt-1.5">
                <span>সূত্র কোড: {article.researchBasis.doiOrSource}</span>
                <span className="text-[#00897B] font-semibold">{article.researchBasis.keyMetric}</span>
              </div>
            </div>
          )}

          {/* Interactive Reactions Bar */}
          <div className="flex items-center justify-between py-3 border-y border-stone-200 mb-8 bg-white/40 -mx-6 sm:-mx-10 px-6 sm:px-10">
            <button
              type="button"
              onClick={() => onToggleLike(article)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                article.userLiked
                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${article.userLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{formatBengaliNumberCompact(article.stats.likes)} পছন্দ</span>
            </button>

            <div className="flex items-center gap-4 text-xs text-stone-500 font-mono">
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{toBengaliNumerals(article.comments.length)} মন্তব্য</span>
              </span>
              <span>·</span>
              <span>{formatBengaliNumberCompact(article.stats.views)} বার পঠিত</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-stone-900 mb-3">
              পাঠকদের প্রতিক্রিয়া ও অভিজ্ঞতা ({toBengaliNumerals(article.comments.length)})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="p-3.5 bg-white border border-stone-200 rounded-xl mb-4 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="আপনার নাম বা পদবি (ঐচ্ছিক)"
                  className="px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#00A693]"
                />
              </div>
              <textarea
                rows={2}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="আপনার মাঠের অভিজ্ঞতা বা প্রশ্ন লিখুন..."
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#00A693] mb-2"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#00A693] hover:bg-[#00897B] disabled:opacity-40 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>মন্তব্য যোগ করুন</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-2.5">
              {article.comments.map((comm) => (
                <div key={comm.id} className="p-3 bg-white border border-stone-200/80 rounded-xl text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-900">{comm.author}</span>
                    <span className="text-[10px] text-stone-400 font-mono">{comm.timestamp}</span>
                  </div>
                  {comm.role && <p className="text-[10px] text-[#00897B] mb-1">{comm.role}</p>}
                  <p className="text-stone-700 leading-relaxed">{comm.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
