import Layout from "@/components/layout";
import { SCHEDULE, TEAMS } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function PredictionsPage() {
  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-display font-bold text-slate-900">Predictions</h1>
          <p className="text-slate-500 text-lg">AI-powered forecasts for upcoming matches.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SCHEDULE.map((match) => (
            <PredictionCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

function PredictionCard({ match }: { match: any }) {
  const team1 = TEAMS[match.t1];
  const team2 = TEAMS[match.t2];
  
  // Dummy prediction logic for visual purposes
  const winProb1 = 40 + (match.id * 5) % 30; // Random-ish probability
  const winProb2 = 100 - winProb1;
  const predictedWinner = winProb1 > winProb2 ? team1 : team2;

  return (
    <Link href={`/match/${match.id}`}>
      <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-slate-200 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-blue-500 transition-colors"></div>
        
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{match.date} • {match.time}</span>
            </div>
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold border-slate-200">Match {match.no}</Badge>
          </div>

          {/* Teams Face-off */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-20 h-20 rounded-full bg-slate-50 p-3 border border-slate-100 group-hover:scale-110 transition-transform">
                <img src={team1.logo} alt={team1.name} className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-bold text-xl text-slate-900">{match.t1}</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-display font-bold text-slate-300">VS</span>
            </div>

            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-20 h-20 rounded-full bg-slate-50 p-3 border border-slate-100 group-hover:scale-110 transition-transform">
                <img src={team2.logo} alt={team2.name} className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-bold text-xl text-slate-900">{match.t2}</span>
            </div>
          </div>

          {/* Prediction Bar */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex justify-between items-end mb-2">
              <div className="text-sm">
                <span className="text-slate-500">AI Predicts: </span>
                <span className="font-bold text-blue-600">{predictedWinner.name} Win</span>
              </div>
              <div className="font-mono font-bold text-lg text-slate-900">{Math.max(winProb1, winProb2)}%</div>
            </div>
            
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
              <div className="h-full transition-all duration-1000" style={{ width: `${winProb1}%`, backgroundColor: team1.color }}></div>
              <div className="h-full transition-all duration-1000" style={{ width: `${winProb2}%`, backgroundColor: team2.color }}></div>
            </div>
            
            <div className="flex justify-between mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>{match.t1}</span>
              <span>{match.t2}</span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 justify-center">
             <MapPin className="w-3 h-3" />
             {match.venue}
          </div>
        </div>
      </Card>
    </Link>
  );
}
