import { Article, ArticleCategory, FeedFilter, Comment } from '../types/index.ts';

/**
 * Converts Western digits (0-9) to standard Bengali digits (০-৯)
 */
export function toBengaliNumerals(input: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(input).replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

/**
 * Format view/like numbers into compact human-readable Bengali notation
 * e.g. 1200 -> ১.২ হাজার, 125000 -> ১.২ লাখ
 */
export function formatBengaliNumberCompact(num: number): string {
  if (num >= 100000) {
    const lakh = (num / 100000).toFixed(1).replace(/\.0$/, '');
    return `${toBengaliNumerals(lakh)} লাখ`;
  }
  if (num >= 1000) {
    const thousand = (num / 1000).toFixed(1).replace(/\.0$/, '');
    return `${toBengaliNumerals(thousand)} হাজার`;
  }
  return toBengaliNumerals(num);
}

/**
 * Calculate estimated reading time based on Bengali word count (~180 words/min)
 */
export function calculateBengaliReadingTime(paragraphs: string[]): number {
  const fullText = paragraphs.join(' ');
  const wordCount = fullText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / 180);
  return Math.max(1, minutes);
}

/**
 * Pure filter logic for articles across search queries, categories, and feed tabs
 */
export function filterArticles(
  articles: Article[],
  searchQuery: string,
  selectedCategory: ArticleCategory,
  activeFilter: FeedFilter
): Article[] {
  let result = [...articles];

  // 1. Filter by category
  if (selectedCategory !== 'সকল') {
    result = result.filter(
      (a) => a.category === selectedCategory || a.categoryEn.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }

  // 2. Filter by search query (Bangla and English keywords)
  if (searchQuery.trim().length > 0) {
    const query = searchQuery.toLowerCase().trim();
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.subtitle.toLowerCase().includes(query) ||
        a.author.name.toLowerCase().includes(query) ||
        a.author.organization.toLowerCase().includes(query) ||
        a.takeaways.some((t) => t.toLowerCase().includes(query))
    );
  }

  // 3. Filter / sort by feed tab
  if (activeFilter === 'trending') {
    result.sort((a, b) => b.stats.views + b.stats.likes * 2 - (a.stats.views + a.stats.likes * 2));
  } else if (activeFilter === 'latest') {
    result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } else if (activeFilter === 'research') {
    result = result.filter((a) => Boolean(a.researchBasis) || a.category === 'গবেষণা সহজ ভাষায়');
  } else if (activeFilter === 'field-stories') {
    result = result.filter((a) => a.category === 'শস্য ও কৃষিবিজ্ঞান' || a.category === 'স্টার্টআপ ও উদ্ভাবন');
  }

  return result;
}

/**
 * Toggle bookmark state for an article in an immutable list of bookmarked IDs
 */
export function toggleBookmarkId(savedIds: string[], targetId: string): string[] {
  if (savedIds.includes(targetId)) {
    return savedIds.filter((id) => id !== targetId);
  }
  return [...savedIds, targetId];
}

/**
 * Toggle like reaction for an article
 */
export function toggleArticleReaction(article: Article): Article {
  const currentlyLiked = Boolean(article.userLiked);
  return {
    ...article,
    userLiked: !currentlyLiked,
    stats: {
      ...article.stats,
      likes: currentlyLiked ? Math.max(0, article.stats.likes - 1) : article.stats.likes + 1,
    },
  };
}

/**
 * Add a new comment to an article
 */
export function appendArticleComment(article: Article, newComment: Comment): Article {
  return {
    ...article,
    comments: [newComment, ...article.comments],
    stats: {
      ...article.stats,
      commentsCount: article.stats.commentsCount + 1,
    },
  };
}
