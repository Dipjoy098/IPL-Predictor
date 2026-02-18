import Layout from "@/components/layout";
import { SCHEDULE, TEAMS, PAST_MATCHES } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { Link, useRoute } from "wouter";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const upcomingMatch = SCHEDULE[0]; // Next match
  const team1 = TEAMS[upcomingMatch.t1];
  const team2 = TEAMS[upcomingMatch.t2];

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Hero Section - Next Match */}
        <section className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 text-white">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          {/* Gradient Background combining both team colors */}
          <div className="absolute inset-0 opacity-40" 
               style={{ background: `linear-gradient(135deg, ${team1.bg} 0%, ${team2.bg} 100%)` }}>
          </div>
          
          <div className="relative z-10 p-8 md:p-12 flex flex-col items-center">
            <Badge className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-0 mb-6 uppercase tracking-widest text-xs font-bold px-4 py-1.5">
              Next Upcoming Match
            </Badge>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-4xl">
              {/* Team 1 */}
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full p-4 backdrop-blur-sm border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <img src={team1.logo} className="w-full h-full object-contain drop-shadow-lg" />
                </div>
                <div>
                   <h2 className="text-3xl md:text-5xl font-display font-bold">{upcomingMatch.t1}</h2>
                   <p className="text-white/60 text-lg hidden md:block">{team1.name}</p>
                </div>
              </div>

              {/* VS */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-6xl md:text-8xl font-display font-black text-white/10 select-none">VS</span>
                <div className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-2 border border-white/10 flex flex-col items-center">
                  <span className="text-2xl font-mono font-bold">{upcomingMatch.time.split(' ')[0]}</span>
                  <span className="text-xs uppercase tracking-wider opacity-80">{upcomingMatch.time.split(' ')[1]} IST</span>
                </div>
              </div>

              {/* Team 2 */}
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full p-4 backdrop-blur-sm border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <img src={team2.logo} className="w-full h-full object-contain drop-shadow-lg" />
                </div>
                <div>
                   <h2 className="text-3xl md:text-5xl font-display font-bold">{upcomingMatch.t2}</h2>
                   <p className="text-white/60 text-lg hidden md:block">{team2.name}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center gap-6 text-white/70 text-sm md:text-base font-medium">
               <div className="flex items-center gap-2">
                 <Calendar className="w-5 h-5" />
                 {upcomingMatch.date}
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
               <div className="flex items-center gap-2">
                 <MapPin className="w-5 h-5" />
                 {upcomingMatch.venue}
               </div>
            </div>

            <Link href={`/match/${upcomingMatch.id}`}>
               <Button size="lg" className="mt-8 rounded-full bg-white text-slate-900 hover:bg-blue-50 border-0 font-bold px-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
                 View Match Prediction <ArrowRight className="w-4 h-4 ml-2" />
               </Button>
            </Link>
          </div>
        </section>

        {/* Schedule Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-display font-bold text-slate-900">Upcoming Fixtures</h3>
            <Link href="/predictions">
              <Button variant="ghost" className="text-slate-500 hover:text-blue-600 cursor-pointer">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SCHEDULE.slice(1, 4).map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>

      </div>
    </Layout>
  );
}

function MatchCard({ match }: { match: any }) {
  const t1 = TEAMS[match.t1];
  const t2 = TEAMS[match.t2];

  return (
    <Link href={`/match/${match.id}`}>
      <Card className="hover:border-blue-300 transition-all cursor-pointer hover:shadow-lg group">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
             <Badge variant="secondary" className="text-[10px] uppercase font-bold text-slate-500">Match {match.no}</Badge>
             <span className="text-xs font-medium text-slate-400">{match.date}</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={t1.logo} className="w-8 h-8 object-contain" />
                <span className="font-display font-bold text-lg text-slate-900">{t1.name}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={t2.logo} className="w-8 h-8 object-contain" />
                <span className="font-display font-bold text-lg text-slate-900">{t2.name}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {match.venue.split(',')[0]}
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 text-xs font-bold flex items-center gap-1">
              Analyze <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
