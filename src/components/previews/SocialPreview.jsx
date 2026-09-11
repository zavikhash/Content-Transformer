import { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, ThumbsUp, Send } from 'lucide-react';

const PLATFORM_TABS = [
  { id: 'twitter', label: 'X / Twitter' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
];

function TwitterCard({ platform }) {
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#151D2F] rounded-xl border border-[#23314C] p-5">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1E293B] border border-[#23314C] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            HQ
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-white text-xs">Official Communications</span>
              <span className="text-slate-400 text-xs">@HQ_Press · Just now</span>
            </div>
            <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-line">{platform.post}</p>
            
            <div className="flex items-center gap-6 mt-4 pt-3 border-t border-[#23314C] text-xs text-slate-400">
              <span className="flex items-center gap-1.5 hover:text-white">
                <MessageCircle className="w-3.5 h-3.5" /> 18
              </span>
              <button
                onClick={() => setRetweeted(!retweeted)}
                className={`flex items-center gap-1.5 transition-colors ${retweeted ? 'text-emerald-400' : 'hover:text-emerald-400'}`}
              >
                <Repeat2 className="w-3.5 h-3.5" /> {retweeted ? 89 : 88}
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 transition-colors ${liked ? 'text-red-400' : 'hover:text-red-400'}`}
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} /> {liked ? 512 : 511}
              </button>
              <span className="ml-auto flex items-center gap-1">
                <Share className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {platform.thread && platform.thread.length > 0 && (
        <div className="border border-[#23314C] rounded-xl p-4 bg-[#0B0F19]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-white">Full X / Twitter Thread</span>
            <span className="text-[10px] font-mono text-slate-400">{platform.thread.length} Tweets</span>
          </div>
          <div className="flex flex-col gap-2">
            {platform.thread.map((tweet, i) => (
              <div key={i} className="p-3 bg-[#151D2F] rounded-lg border border-[#23314C] text-xs text-slate-200 leading-relaxed font-mono">
                {tweet}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LinkedInCard({ platform }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bg-[#151D2F] rounded-xl border border-[#23314C] p-5">
      <div className="flex gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold text-xs flex-shrink-0">
          in
        </div>
        <div>
          <p className="font-semibold text-white text-xs">Executive Leadership Council</p>
          <p className="text-slate-400 text-[10px]">Public Affairs & Strategic Communications • 1st</p>
        </div>
      </div>
      {platform.headline && (
        <h3 className="text-white font-semibold text-sm mb-3">{platform.headline}</h3>
      )}
      <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-line">{platform.post}</p>
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#23314C] text-xs">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1.5 ${liked ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>{liked ? 245 : 244}</span>
        </button>
        <span className="text-slate-400 flex items-center gap-1">
          <MessageCircle className="w-3.5 h-3.5" /> 32 comments
        </span>
        <span className="text-slate-400 ml-auto flex items-center gap-1">
          <Send className="w-3.5 h-3.5" /> Repost
        </span>
      </div>
    </div>
  );
}

function InstagramCard({ platform }) {
  return (
    <div className="flex flex-col gap-3 max-w-lg mx-auto">
      <div className="bg-[#151D2F] rounded-xl border border-[#23314C] p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-[#1E293B] border border-[#23314C] flex items-center justify-center text-indigo-400 text-[10px] font-bold">
            IG
          </div>
          <span className="text-white text-xs font-semibold">official_brief</span>
        </div>
        <div className="p-6 bg-[#0B0F19] rounded-lg border border-[#23314C] text-center mb-3">
          <p className="text-sm font-semibold text-white mb-2">{platform.storyText || 'Official Update'}</p>
          <p className="text-[11px] text-slate-400">Swipe for details</p>
        </div>
        <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-line">{platform.caption}</p>
      </div>
    </div>
  );
}

function FacebookCard({ platform }) {
  return (
    <div className="bg-[#151D2F] rounded-xl border border-[#23314C] p-5">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 text-xs font-bold">
          f
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Community & Operational Updates</p>
          <p className="text-[10px] text-slate-400">Public Organization</p>
        </div>
      </div>
      <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-line">{platform.post}</p>
    </div>
  );
}

export default function SocialPreview({ data }) {
  const [activeTab, setActiveTab] = useState('twitter');

  return (
    <div className="flex flex-col gap-4">
      {/* Platform Switcher */}
      <div className="flex items-center justify-between border-b border-[#23314C] pb-3">
        <div className="flex gap-1.5 bg-[#0B0F19] p-1 rounded-xl border border-[#23314C]">
          {PLATFORM_TABS.map(p => (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === p.id ? 'bg-[#4F46E5] text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {data.hashtags?.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{tag}</span>
          ))}
        </div>
      </div>

      {/* View Card */}
      {activeTab === 'twitter' && <TwitterCard platform={data.platforms.twitter} />}
      {activeTab === 'linkedin' && <LinkedInCard platform={data.platforms.linkedin} />}
      {activeTab === 'instagram' && <InstagramCard platform={data.platforms.instagram} />}
      {activeTab === 'facebook' && <FacebookCard platform={data.platforms.facebook} />}
    </div>
  );
}
