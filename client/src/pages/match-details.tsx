import Layout from "@/components/layout";
import { SCHEDULE, TEAMS, PAST_MATCHES, SQUADS, VENUE_STATS, Player } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, TrendingUp, History, AlertCircle, Users, Trophy, Zap } from "lucide-react";
import { useRoute } from "wouter";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useMemo } from "react";

export default function MatchDetailsPage() {
  const [, params] = useRoute("/match/:id");
  const matchId = parseInt(params?.id || "0");
  const match = SCHEDULE.find(m => m.id === matchId);

  if (!match) return <div>Match not found</div>;

  const t1 = TEAMS[match.t1];
  const t2 = TEAMS[match.t2];

  const prediction = useMemo(() => {
    // 1. Head to Head Logic
    const h2h = PAST_MATCHES.filter(m => 
      (m.t1 === match.t1 && m.t2 === match.t2) || 
      (m.t1 === match.t2 && m.t2 === match.t1)
    );
    const t1H2HWins = h2h.filter(m => m.winner === match.t1).length;
    const t2H2HWins = h2h.filter(m => m.winner === match.t2).length;

    // 2. Venue Logic
    const venueData = VENUE_STATS[match.venue];
    const t1VenueWinRate = venueData?.[match.t1]?.winRate || 50;
    const t2VenueWinRate = venueData?.[match.t2]?.winRate || 50;

    // 3. Match Importance (Knockout vs League)
    const isKnockout = match.no > 70; // Mock logic for knockout
    const t1BigMatchBonus = isKnockout && match.t1 === "MI" ? 10 : 0; // MI big match pedigree
    const t2BigMatchBonus = isKnockout && match.t2 === "CSK" ? 10 : 0; // CSK big match pedigree

    // Calculate overall probability
    let t1Score = 50 + (t1H2HWins - t2H2HWins) * 5 + (t1VenueWinRate - 50) + t1BigMatchBonus;
    let t2Score = 50 + (t2H2HWins - t1H2HWins) * 5 + (t2VenueWinRate - 50) + t2BigMatchBonus;

    const total = t1Score + t2Score;
    const t1Prob = Math.round((t1Score / total) * 100);
    const t2Prob = 100 - t1Prob;

    // 4. Top Performers Prediction
    const getTopPerformers = (teamId: string, opponentId: string) => {
      const squad = SQUADS[teamId] || [];
      const batsmen = [...squad]
        .filter(p => p.role === "BAT" || p.role === "WK" || p.role === "ALL")
        .sort((a, b) => {
          const aOppScore = a.vsOpponentStats?.[opponentId]?.runs || 0;
          const bOppScore = b.vsOpponentStats?.[opponentId]?.runs || 0;
          return (b.runs || 0) + bOppScore * 2 - ((a.runs || 0) + aOppScore * 2);
        })
        .slice(0, 3);

      const bowlers = [...squad]
        .filter(p => p.role === "BOWL" || p.role === "ALL")
        .sort((a, b) => {
          const aOppWkts = a.vsOpponentStats?.[opponentId]?.wickets || 0;
          const bOppWkts = b.vsOpponentStats?.[opponentId]?.wickets || 0;
          return (b.wickets || 0) + bOppWkts * 5 - ((a.wickets || 0) + aOppWkts * 5);
        })
        .slice(0, 3);

      return { batsmen, bowlers };
    };

    const t1Performers = getTopPerformers(match.t1, match.t2);
    const t2Performers = getTopPerformers(match.t2, match.t1);

    return {
      t1Prob,
      t2Prob,
      winner: t1Prob > t2Prob ? t1 : t2,
      t1Performers,
      t2Performers,
      analysis: `AI Analysis suggests ${t1Prob > t2Prob ? t1.name : t2.name} are favorites due to their ${t1Prob > t2Prob ? t1VenueWinRate : t2VenueWinRate}% win rate at ${match.venue.split(',')[0]} and superior head-to-head record in recent seasons.`
    };
  }, [match]);

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Match Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
           <div className="flex flex-col items-center">
             <div className="flex items-center gap-2 text-slate-500 mb-6 font-medium">
               <Calendar className="w-4 h-4" /> {match.date} • {match.time}
               <span className="mx-2">|</span>
               <MapPin className="w-4 h-4" /> {match.venue}
             </div>

             <div className="flex items-center justify-between w-full max-w-3xl">
               <div className="flex flex-col items-center gap-4">
                 <div className="w-24 h-24 rounded-full p-4 border border-slate-100 bg-slate-50">
                   <img src={t1.logo} alt={t1.name} className="w-full h-full object-contain" />
                 </div>
                 <h2 className="text-2xl font-display font-bold text-slate-900">{t1.short}</h2>
               </div>

               <div className="flex flex-col items-center">
                 <span className="text-4xl font-display font-black text-slate-200">VS</span>
                 <Badge variant="outline" className="mt-2 text-xs uppercase tracking-wider">Match {match.no}</Badge>
               </div>

               <div className="flex flex-col items-center gap-4">
                 <div className="w-24 h-24 rounded-full p-4 border border-slate-100 bg-slate-50">
                   <img src={t2.logo} alt={t2.name} className="w-full h-full object-contain" />
                 </div>
                 <h2 className="text-2xl font-display font-bold text-slate-900">{t2.short}</h2>
               </div>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Prediction Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border-slate-200 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="w-32 h-32 text-blue-600" />
              </div>
              
              <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Advanced Prediction Engine
              </h3>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span style={{ color: t1.color }}>{t1.name}</span>
                    <span className="text-slate-400">Win Probability</span>
                    <span style={{ color: t2.color }}>{t2.name}</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                    <div style={{ width: `${prediction.t1Prob}%`, backgroundColor: t1.color }} className="h-full transition-all duration-1000"></div>
                    <div style={{ width: `${prediction.t2Prob}%`, backgroundColor: t2.color }} className="h-full transition-all duration-1000"></div>
                  </div>
                  <div className="flex justify-between text-xs mt-2 font-mono text-slate-500">
                    <span>{prediction.t1Prob}%</span>
                    <span>{prediction.t2Prob}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                 <p className="text-slate-600 leading-relaxed">
                   {prediction.analysis}
                 </p>
              </div>
            </Card>

            {/* Top 3 Predictions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="p-6 border-slate-200">
                  <h4 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" /> Predicted Top Batsmen
                  </h4>
                  <div className="space-y-4">
                    {[...prediction.t1Performers.batsmen.slice(0, 2), prediction.t2Performers.batsmen[0]].map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 font-bold">#{i+1}</span>
                          <span className="font-semibold text-slate-900">{p.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">{p.role}</Badge>
                      </div>
                    ))}
                  </div>
               </Card>
               <Card className="p-6 border-slate-200">
                  <h4 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" /> Predicted Top Bowlers
                  </h4>
                  <div className="space-y-4">
                    {[...prediction.t1Performers.bowlers.slice(0, 2), prediction.t2Performers.bowlers[0]].map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 font-bold">#{i+1}</span>
                          <span className="font-semibold text-slate-900">{p.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">{p.role}</Badge>
                      </div>
                    ))}
                  </div>
               </Card>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <Card className="p-6 border-slate-200">
              <h3 className="font-display font-bold text-lg mb-4">Venue Insights</h3>
              <div className="space-y-4">
                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Avg First Innings</span>
                    <div className="text-2xl font-display font-bold text-slate-900 mt-1">
                      {VENUE_STATS[match.venue]?.[match.t1]?.firstInningsAvg || 175} Runs
                    </div>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Toss Advantage</span>
                    <div className="text-sm font-medium text-slate-700 mt-2">
                      Teams batting first win <span className="text-blue-600 font-bold">58%</span> of matches here.
                    </div>
                 </div>
              </div>
            </Card>

            <Card className="p-6 border-amber-200 bg-amber-50">
               <div className="flex items-start gap-3">
                 <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                 <div>
                   <h4 className="font-bold text-amber-900 text-sm">Strategic Factor</h4>
                   <p className="text-amber-800/80 text-xs mt-1 leading-relaxed">
                     {match.no > 70 ? "This is a high-pressure knockout. MI and CSK historically perform 15% better in these scenarios." : "Regular season match. Focus on individual player matchups and current form."}
                   </p>
                 </div>
               </div>
            </Card>
          </div>
        </div>

      </div>
    </Layout>
  );
}

