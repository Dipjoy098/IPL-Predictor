import Layout from "@/components/layout";
import { SCHEDULE, TEAMS, PAST_MATCHES } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, TrendingUp, History, AlertCircle } from "lucide-react";
import { useRoute } from "wouter";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export default function MatchDetailsPage() {
  const [, params] = useRoute("/match/:id");
  const matchId = parseInt(params?.id || "0");
  const match = SCHEDULE.find(m => m.id === matchId);

  if (!match) return <div>Match not found</div>;

  const t1 = TEAMS[match.t1];
  const t2 = TEAMS[match.t2];

  // Mock prediction data
  const prediction = {
    winner: Math.random() > 0.5 ? t1 : t2,
    probability: 60 + Math.floor(Math.random() * 20),
    keyStats: [
      { label: "Head to Head (Last 5)", val1: 2, val2: 3 },
      { label: "Win Probability", val1: 45, val2: 55 },
      { label: "Avg First Innings", val1: 182, val2: 175 },
    ]
  };

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
                AI Match Prediction
              </h3>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span style={{ color: t1.color }}>{t1.name}</span>
                    <span className="text-slate-400">Win Probability</span>
                    <span style={{ color: t2.color }}>{t2.name}</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                    <div style={{ width: '45%', backgroundColor: t1.color }} className="h-full"></div>
                    <div style={{ width: '55%', backgroundColor: t2.color }} className="h-full"></div>
                  </div>
                  <div className="flex justify-between text-xs mt-2 font-mono text-slate-500">
                    <span>45%</span>
                    <span>55%</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                 <p className="text-slate-600 leading-relaxed">
                   Based on recent form and venue history, <span className="font-bold" style={{ color: prediction.winner.color }}>{prediction.winner.name}</span> has a slight edge. The pitch at {match.venue.split(',')[0]} typically favors chasing teams.
                 </p>
              </div>
            </Card>

            <Card className="p-6 border-slate-200 shadow-sm">
               <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-slate-600" />
                Recent Head-to-Head
              </h3>
              
              <div className="space-y-4">
                 {PAST_MATCHES.map((past) => (
                   <div key={past.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-slate-900">{past.winner} won by runs/wickets</span>
                        <span className="text-xs text-slate-500">{past.date} • {past.venue}</span>
                      </div>
                      <Badge variant={past.ok ? "default" : "destructive"} className="uppercase text-[10px]">
                        {past.ok ? "Predicted Correctly" : "Upset"}
                      </Badge>
                   </div>
                 ))}
                 <div className="text-center p-4 text-sm text-slate-400 italic">
                   Showing last 3 encounters
                 </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <Card className="p-6 border-slate-200">
              <h3 className="font-display font-bold text-lg mb-4">Key Stats</h3>
              <div className="space-y-4">
                {prediction.keyStats.map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>{t1.short}</span>
                      <span>{t2.short}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="font-mono text-sm font-bold w-8 text-right">{stat.val1}</span>
                       <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden flex">
                         <div style={{ width: `${(stat.val1 / (stat.val1 + stat.val2)) * 100}%` }} className="bg-slate-300 h-full"></div>
                       </div>
                       <span className="font-mono text-sm font-bold w-8">{stat.val2}</span>
                    </div>
                    <p className="text-center text-xs font-medium text-slate-600 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-amber-200 bg-amber-50">
               <div className="flex items-start gap-3">
                 <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                 <div>
                   <h4 className="font-bold text-amber-900 text-sm">Pitch Report</h4>
                   <p className="text-amber-800/80 text-xs mt-1 leading-relaxed">
                     Dew is expected to play a significant role in the second innings. Win toss and bowl first is the recommended strategy.
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
