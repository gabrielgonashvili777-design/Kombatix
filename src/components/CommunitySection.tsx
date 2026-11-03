import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../data/mmaData';
import {
  Users,
  Flame,
  MessageSquare,
  Share2,
  ShieldCheck,
  Video,
  ThumbsUp,
  Search,
  CheckCircle2,
  Lock,
  Plus
} from 'lucide-react';

interface CommunityPost {
  id: string;
  author: string;
  authorNickname: string;
  discipline: string;
  timeAgo: string;
  content: string;
  rounds: number;
  likes: number;
  commentsCount: number;
  hasVideo?: boolean;
  isLiked?: boolean;
}

export const CommunitySection: React.FC = () => {
  const { profile, showToast } = useApp();

  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 'post-1',
      author: 'Marcus "The Razor" Vance',
      authorNickname: 'Welterweight Pro',
      discipline: 'MMA',
      timeAgo: '2h ago',
      content: 'Finished 5 rounds of cage takedown defense drills. The key cue that changed everything for me was jacking up the whizzer high to the ceiling and keeping forehead glued under the chin.',
      rounds: 5,
      likes: 24,
      commentsCount: 6,
      hasVideo: true,
      isLiked: false
    },
    {
      id: 'post-2',
      author: 'Elena "The Viper" Rostova',
      authorNickname: 'Strawweight Contender',
      discipline: 'BJJ',
      timeAgo: '5h ago',
      content: 'Tested the dogfight underhook sweep from half guard during live open mat today. Worked 3 out of 4 times against heavy top pressure. Highly recommend the FightLab position map breakdown!',
      rounds: 6,
      likes: 38,
      commentsCount: 9,
      hasVideo: false,
      isLiked: true
    },
    {
      id: 'post-3',
      author: 'Tariq "Thunder" Khan',
      authorNickname: 'Lightweight Striker',
      discipline: 'Muay Thai',
      timeAgo: '1d ago',
      content: 'Ran an AI Shadowboxing scan this morning: score jumped from 76 to 85 after focusing on pivot angle cuts rather than stepping straight backward. Keep your chin tucked guys!',
      rounds: 4,
      likes: 52,
      commentsCount: 14,
      hasVideo: true,
      isLiked: false
    }
  ]);

  const [newPostContent, setNewPostContent] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            isLiked: !p.isLiked
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: profile.username,
      authorNickname: profile.nickname,
      discipline: profile.preferredDiscipline,
      timeAgo: 'Just now',
      content: newPostContent,
      rounds: 5,
      likes: 1,
      commentsCount: 0,
      isLiked: true
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setShowShareModal(false);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Community Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-[#141824] via-[#10131d] to-[#0a0b0e] p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-500 uppercase tracking-widest">
            <Users className="w-4 h-4" />
            <span>Fighter Community Network</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">1,480 Active Athletes</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading uppercase text-white tracking-wide">
            MMA Community & Sparring Network
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Share training milestones, examine sparring footage, discuss technical mechanics with fellow martial artists, and participate in global community challenges.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setShowShareModal(true)}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Share Training Update</span>
            </button>
          </div>
        </div>
      </div>

      {/* Community Challenge Highlight */}
      <div className="p-5 bg-gradient-to-r from-rose-950/40 to-[#12151f] border border-rose-900/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
            <Flame className="w-4 h-4 fill-current" />
            <span>Global Monthly Challenge</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-white font-heading uppercase">
            100-Round November Sparring & Conditioning Push
          </div>
          <div className="text-xs text-slate-400">
            1,240 fighters currently on track. Complete 100 rounds across any discipline before month's end.
          </div>
        </div>

        <button
          onClick={() => showToast('Registered in the 100-Round Challenge! Every completed round logs toward this badge.', 'success')}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shrink-0 shadow-sm"
        >
          Join Challenge
        </button>
      </div>

      {/* Share Update Dialog */}
      {showShareModal && (
        <div className="bg-[#10131d] border border-rose-900/60 rounded-2xl p-6 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-heading uppercase text-white">
              Post to Fighter Feed
            </h3>
            <button onClick={() => setShowShareModal(false)} className="text-slate-400 hover:text-white">
              ✕
            </button>
          </div>

          <form onSubmit={handleCreatePost} className="space-y-3">
            <textarea
              rows={3}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What techniques, combinations, or sparring rounds did you drill today?"
              className="w-full px-4 py-3 bg-[#0a0b0e] border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-rose-500"
            />

            {/* Moderation safety notice */}
            <div className="p-3 bg-black/40 border border-slate-800 rounded-lg flex items-start gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Safety & Moderation:</strong> All shared training footage and posts comply with strict martial arts sportsmanship guidelines. No unsanctioned street altercations.
              </span>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg"
              >
                Publish Update
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Community Feed */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-heading uppercase text-white tracking-wide">
          Recent Fighter Activity
        </h2>

        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-5 sm:p-6 bg-[#10131d] border border-slate-800 rounded-2xl space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-rose-500 text-sm border border-slate-700">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      <span>{post.author}</span>
                      <span className="text-[11px] font-normal text-slate-400">"{post.authorNickname}"</span>
                    </div>
                    <div className="text-[11px] text-slate-500">{post.timeAgo} · {post.discipline}</div>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded bg-[#181c28] border border-slate-800 text-xs font-bold text-rose-400 tabular-nums">
                  {post.rounds} Rounds Logged
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {post.content}
              </p>

              {post.hasVideo && (
                <div className="p-3 bg-[#0a0b0e] border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-rose-500" />
                    <span className="font-medium">Attached Sparring Reel (42s) · Verified Technique</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Moderated
                  </span>
                </div>
              )}

              <div className="flex items-center gap-4 pt-2 border-t border-slate-800/60 text-xs text-slate-400">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    post.isLiked ? 'text-rose-500 font-bold' : 'hover:text-slate-200'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes} Resonates</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.commentsCount} Comments</span>
                </div>

                <div className="flex items-center gap-1.5 ml-auto text-slate-500 text-[11px]">
                  <span>MMA Community Safe</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
