import test from 'node:test';
import assert from 'node:assert/strict';
import {
  toBengaliNumerals,
  formatBengaliNumberCompact,
  calculateBengaliReadingTime,
  filterArticles,
  toggleBookmarkId,
  toggleArticleReaction,
  appendArticleComment,
} from './pureLogic.ts';
import { Article } from '../types/index.ts';

test('toBengaliNumerals converts ASCII digits to Bengali digits', () => {
  assert.equal(toBengaliNumerals('12345'), '১২৩৪৫');
  assert.equal(toBengaliNumerals(2026), '২০২৬');
  assert.equal(toBengaliNumerals('Page 4 of 10'), 'Page ৪ of ১০');
});

test('formatBengaliNumberCompact formats large numbers into lakh and thousand notation', () => {
  assert.equal(formatBengaliNumberCompact(500), '৫০০');
  assert.equal(formatBengaliNumberCompact(1500), '১.৫ হাজার');
  assert.equal(formatBengaliNumberCompact(120000), '১.২ লাখ');
});

test('calculateBengaliReadingTime calculates reading minutes accurately', () => {
  const shortText = ['একটি সাধারণ অনুচ্ছেদ'];
  assert.equal(calculateBengaliReadingTime(shortText), 1);

  // 360 words should be ~2 minutes
  const words = Array(360).fill('শব্দ').join(' ');
  assert.equal(calculateBengaliReadingTime([words]), 2);
});

test('toggleBookmarkId adds or removes IDs immutably', () => {
  const initial: string[] = ['art-1'];
  const added = toggleBookmarkId(initial, 'art-2');
  assert.deepEqual(added, ['art-1', 'art-2']);

  const removed = toggleBookmarkId(added, 'art-1');
  assert.deepEqual(removed, ['art-2']);
});

test('toggleArticleReaction toggles userLiked and adjusts like count', () => {
  const mockArticle: Article = {
    id: 'test-1',
    title: 'টেস্ট প্রতিবেদন',
    subtitle: 'সাবটাইটেল',
    category: 'শস্য ও কৃষিবিজ্ঞান',
    categoryEn: 'Crops',
    imageType: 'drone',
    author: { name: 'ড. জামান', designation: 'গবেষক', organization: 'BAU', avatar: '' },
    publishedAt: '2026-10-25T08:00:00Z',
    readTimeMinutes: 4,
    content: ['বিবরণ'],
    takeaways: ['মূল তথ্য'],
    stats: { views: 100, likes: 10, commentsCount: 2, shares: 1 },
    comments: [],
    userLiked: false,
  };

  const liked = toggleArticleReaction(mockArticle);
  assert.equal(liked.userLiked, true);
  assert.equal(liked.stats.likes, 11);

  const unliked = toggleArticleReaction(liked);
  assert.equal(unliked.userLiked, false);
  assert.equal(unliked.stats.likes, 10);
});

test('filterArticles filters by category and search query correctly', () => {
  const mockArticles: Article[] = [
    {
      id: 'a1',
      title: 'হাওরে ড্রোন প্রযুক্তি',
      subtitle: 'কৃষি বিপ্লব',
      category: 'এগ্রি-টেক ও ড্রোন',
      categoryEn: 'Agri-Tech',
      imageType: 'drone',
      author: { name: 'মাহমুদ', designation: '', organization: 'BRRI', avatar: '' },
      publishedAt: '2026-10-20T00:00:00Z',
      readTimeMinutes: 3,
      content: [],
      takeaways: ['ড্রোন স্প্রে'],
      stats: { views: 500, likes: 20, commentsCount: 0, shares: 5 },
      comments: [],
    },
    {
      id: 'a2',
      title: 'সোলার কোল্ড স্টোরেজ পাবনা',
      subtitle: 'পেঁয়াজ সংরক্ষণ',
      category: 'খাদ্য ও কোল্ড চেইন',
      categoryEn: 'Cold Chain',
      imageType: 'solar',
      author: { name: 'রফিক', designation: '', organization: 'BARI', avatar: '' },
      publishedAt: '2026-10-22T00:00:00Z',
      readTimeMinutes: 5,
      content: [],
      takeaways: ['বিদ্যুৎ সাশ্রয়ী'],
      stats: { views: 200, likes: 50, commentsCount: 0, shares: 10 },
      comments: [],
    },
  ];

  // Category filter
  const agriTechOnly = filterArticles(mockArticles, '', 'এগ্রি-টেক ও ড্রোন', 'latest');
  assert.equal(agriTechOnly.length, 1);
  assert.equal(agriTechOnly[0].id, 'a1');

  // Search filter
  const searchResults = filterArticles(mockArticles, 'পাবনা', 'সকল', 'latest');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 'a2');
});

test('appendArticleComment adds a comment and increments comments count', () => {
  const mockArticle: Article = {
    id: 'c1',
    title: 'টেস্ট',
    subtitle: '',
    category: 'সকল',
    categoryEn: '',
    imageType: 'drone',
    author: { name: 'ক', designation: '', organization: '', avatar: '' },
    publishedAt: '',
    readTimeMinutes: 1,
    content: [],
    takeaways: [],
    stats: { views: 10, likes: 1, commentsCount: 0, shares: 0 },
    comments: [],
  };

  const updated = appendArticleComment(mockArticle, {
    id: 'comm-1',
    author: 'শাকিল',
    avatar: '',
    role: 'কৃষি উদ্যোক্তা',
    text: 'খুবই তথ্যবহুল!',
    timestamp: '১ মিনিট আগে',
    likes: 0,
  });

  assert.equal(updated.comments.length, 1);
  assert.equal(updated.stats.commentsCount, 1);
  assert.equal(updated.comments[0].text, 'খুবই তথ্যবহুল!');
});
