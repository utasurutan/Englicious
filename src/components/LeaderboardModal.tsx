import React, { useState } from 'react';
import { 
  Trophy, Flame, Zap, Award, Crown, ArrowUp, ArrowDown, 
  ChevronRight, X, Sparkles, Shield 
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  country: string;
  isCurrentUser?: boolean;
}

const LEAGUES = [
  { name: 'Diamond League', color: 'text-cyan-500 bg-cyan-50 border-cyan-200', icon: '💎' },
  { name: 'Ruby League', color: 'text-rose-500 bg-rose-50 border-rose-200', icon: '🔴' },
  { name: 'Gold League', color: 'text-amber-500 bg-amber-50 border-amber-200', icon: '🥇' },
  { name: 'Silver League', color: 'text-slate-400 bg-slate-50 border-slate-200', icon: '🥈' },
  { name: 'Bronze League', color: 'text-amber-700 bg-amber-50 border-amber-300', icon: '🥉' }
];

const LEADERBOARD_USERS: LeaderboardUser[] = [
  { rank: 1, name: 'Elena Rostova', avatar: '👩‍🔬', xp: 2840, streak: 21, country: '🇬🇧' },
  { rank: 2, name: 'Kenji Takahashi', avatar: '👨‍💻', xp: 2410, streak: 14, country: '🇯🇵' },
  { rank: 3, name: 'Sultan (You)', avatar: '🚀', xp: 1820, streak: 5, country: '🇮🇩', isCurrentUser: true },
  { rank: 4, name: 'Maria Gonzalez', avatar: '👩‍🎨', xp: 1690, streak: 9, country: '🇪🇸' },
  { rank: 5, name: 'Lucas Dubois', avatar: '👨‍🎓', xp: 1540, streak: 8, country: '🇫🇷' },
  { rank: 6, name: 'Amina Al-Mansoor', avatar: '👩‍💼', xp: 1410, streak: 12, country: '🇦🇪' },
  { rank: 7, name: 'David Miller', avatar: '👨‍🏫', xp: 1290, streak: 6, country: '🇺🇸' },
  { rank: 8, name: 'Clara Schmidt', avatar: '👩‍⚕️', xp: 1180, streak: 4, country: '🇩🇪' },
  { rank: 9, name: 'Nguyen Minh', avatar: '👨‍🚀', xp: 950, streak: 3, country: '🇻🇳' },
  { rank: 10, name: 'Sofia Rossi', avatar: '👩‍💻', xp: 820, streak: 2, country: '🇮🇹' }
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUserXp: number;
}

export const LeaderboardModal: React.FC<Props> = ({ isOpen, onClose, currentUserXp }) => {
  const [selectedLeague, setSelectedLeague] = useState('Gold League');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-soft-lg border border-slate-200 overflow-hidden animate-pop-in flex flex-col max-h-[85vh]">
        {/* Top Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-soft-sm">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Weekly League Leaderboard</h3>
              <p className="text-xs text-slate-400">Resets every Sunday at 23:59 GMT</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* League Selector Tabs */}
        <div className="p-3 bg-slate-100/70 border-b border-slate-200/80 overflow-x-auto flex items-center gap-1.5">
          {LEAGUES.map((league) => (
            <button
              key={league.name}
              onClick={() => {
                sounds.playClick();
                setSelectedLeague(league.name);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedLeague === league.name
                  ? 'bg-white text-slate-900 shadow-soft-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{league.icon}</span>
              <span>{league.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Promotion Zone Info Strip */}
        <div className="px-5 py-2.5 bg-mint-50/80 border-b border-mint-100 flex items-center justify-between text-xs text-mint-900 font-semibold">
          <div className="flex items-center gap-1.5">
            <ArrowUp className="w-3.5 h-3.5 text-mint-600 stroke-[3]" />
            <span>Top 3 advance to Diamond League</span>
          </div>
          <span className="text-[11px] font-bold text-mint-700 bg-white px-2 py-0.5 rounded-md border border-mint-200">
            Promotion Zone
          </span>
        </div>

        {/* Leaderboard Rankings List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {LEADERBOARD_USERS.map((user) => {
            const isTop3 = user.rank <= 3;

            return (
              <div
                key={user.rank}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  user.isCurrentUser
                    ? 'bg-brand-50/80 border-brand-300 ring-2 ring-brand-300/30'
                    : 'bg-white border-slate-200/80 shadow-soft-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Rank Badge */}
                  <div className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center flex-shrink-0 ${
                    user.rank === 1
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : user.rank === 2
                      ? 'bg-slate-200 text-slate-800'
                      : user.rank === 3
                      ? 'bg-amber-800/20 text-amber-900'
                      : 'bg-slate-50 text-slate-500'
                  }`}>
                    {user.rank === 1 ? <Crown className="w-4 h-4 text-amber-600 fill-amber-500" /> : user.rank}
                  </div>

                  {/* Avatar & Name */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{user.avatar}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900">
                          {user.name}
                        </span>
                        <span className="text-xs">{user.country}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold">
                        <span className="flex items-center gap-0.5 text-amber-600">
                          <Flame className="w-3 h-3 fill-amber-500" />
                          {user.streak}d streak
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User XP */}
                <div className="flex items-center gap-1 text-xs font-black text-brand-600 bg-brand-50 px-2.5 py-1 rounded-xl">
                  <Zap className="w-3.5 h-3.5 fill-brand-600" />
                  <span>{user.isCurrentUser ? currentUserXp.toLocaleString() : user.xp.toLocaleString()} XP</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center text-xs text-slate-400 font-medium">
          Earn XP by completing interactive lessons, speed drills, and mock exams!
        </div>
      </div>
    </div>
  );
};
