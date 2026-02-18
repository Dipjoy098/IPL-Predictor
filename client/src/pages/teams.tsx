import { SQUADS, TEAMS, Player } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Activity, Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Layout from "@/components/layout";
import { useState } from "react";
import { useParams, Link } from "wouter";

export default function TeamsPage() {
  const { teamId } = useParams();
  const [selectedTeam, setSelectedTeam] = useState<string>(teamId || "MI");

  const currentTeam = TEAMS[selectedTeam];
  const squad = SQUADS[selectedTeam];

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-display font-bold text-slate-900">Teams</h1>
          <p className="text-slate-500 text-lg">Select a team to view their 2025 squad details.</p>
        </div>

        {/* Team Selector */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {Object.entries(TEAMS).map(([key, team]) => (
            <button
              key={key}
              onClick={() => setSelectedTeam(key)}
              className={cn(
                "flex-shrink-0 flex flex-col items-center gap-3 p-4 rounded-2xl transition-all border min-w-[100px]",
                selectedTeam === key
                  ? "bg-white border-blue-200 shadow-lg shadow-blue-100 scale-105"
                  : "bg-white border-slate-100 hover:border-slate-300 opacity-70 hover:opacity-100"
              )}
            >
              <div className="w-16 h-16 relative flex items-center justify-center">
                 {/* Fallback circle if image fails, but image is preferred */}
                 <div className="absolute inset-0 rounded-full opacity-10" style={{ backgroundColor: team.color }}></div>
                 <img src={team.logo} alt={team.name} className="w-12 h-12 object-contain relative z-10" onError={(e) => {
                   (e.target as HTMLImageElement).src = "https://placehold.co/60x60?text=" + team.short;
                 }}/>
              </div>
              <span className={cn("font-display font-semibold", selectedTeam === key ? "text-slate-900" : "text-slate-500")}>
                {team.short}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Team Header */}
        <div className={cn(
          "rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl",
          `team-gradient-${selectedTeam}`
        )}>
          {/* Abstract Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center justify-center shadow-inner border border-white/30">
              <img src={currentTeam.logo} alt={currentTeam.name} className="w-full h-full object-contain drop-shadow-lg" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight">{currentTeam.name}</h2>
              <p className="text-white/80 text-lg mt-2 font-medium">IPL 2025 Season Squad</p>
              
              <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md px-4 py-2 text-sm">
                  {squad?.length || 0} Players
                </Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md px-4 py-2 text-sm">
                  4 Overseas
                </Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md px-4 py-2 text-sm">
                  2 Wicket Keepers
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Squad Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {squad?.map((player, idx) => (
            <PlayerCard key={idx} player={player} teamColor={currentTeam.color} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

function PlayerCard({ player, teamColor }: { player: Player, teamColor: string }) {
  const getRoleIcon = (role: string) => {
    switch(role) {
      case "BAT": return <Trophy className="w-4 h-4 text-amber-500" />;
      case "BOWL": return <Zap className="w-4 h-4 text-blue-500" />;
      case "ALL": return <Activity className="w-4 h-4 text-purple-500" />;
      case "WK": return <User className="w-4 h-4 text-emerald-500" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <Card className="overflow-hidden border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 group bg-white">
      <div className="h-2 w-full" style={{ backgroundColor: teamColor }}></div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
              {player.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider">
                {player.role}
              </Badge>
              {player.captain && (
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-0 text-xs font-bold px-2 py-0.5">
                  CPT
                </Badge>
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
            {getRoleIcon(player.role)}
          </div>
        </div>
        
        <div className="space-y-3">
          {player.role === "BAT" || player.role === "WK" || player.role === "ALL" ? (
            <>
              <StatRow label="Runs" value={player.runs} />
              <StatRow label="Average" value={player.avg} />
              <StatRow label="Strike Rate" value={player.sr} />
            </>
          ) : null}
          
          {player.role === "BOWL" || player.role === "ALL" ? (
            <>
              <StatRow label="Wickets" value={player.wickets || 0} />
              <StatRow label="Economy" value={player.eco} />
              <StatRow label="Average" value={player.avg} />
            </>
          ) : null}
          
          <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
             <span>Matches: {player.matches}</span>
             <span>IPL Career</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StatRow({ label, value }: { label: string, value?: number }) {
  if (value === undefined) return null;
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-mono font-medium text-slate-900">{value}</span>
    </div>
  );
}
