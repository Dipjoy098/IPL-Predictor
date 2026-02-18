
// ─── TEAM DATA ────────────────────────────────────────────────
export const TEAMS: Record<string, { name: string; short: string; color: string; bg: string; logo: string }> = {
  MI:   { name:"Mumbai Indians",              short:"MI",   color:"#004BA0", bg:"#003580",
    logo:"https://scores.iplt20.com/ipl/teamicons/Mumbai_Indians.png" },
  CSK:  { name:"Chennai Super Kings",         short:"CSK",  color:"#F9CD05", bg:"#a68900",
    logo:"https://scores.iplt20.com/ipl/teamicons/Chennai_Super_Kings.png" },
  RCB:  { name:"Royal Challengers Bengaluru", short:"RCB",  color:"#C8102E", bg:"#8e0b20",
    logo:"https://scores.iplt20.com/ipl/teamicons/Royal_Challengers_Bangalore.png" },
  KKR:  { name:"Kolkata Knight Riders",       short:"KKR",  color:"#8B6BD9", bg:"#3A225D",
    logo:"https://scores.iplt20.com/ipl/teamicons/Kolkata_Knight_Riders.png" },
  DC:   { name:"Delhi Capitals",              short:"DC",   color:"#4299e1", bg:"#17479E",
    logo:"https://scores.iplt20.com/ipl/teamicons/Delhi_Capitals.png" },
  SRH:  { name:"Sunrisers Hyderabad",         short:"SRH",  color:"#FF6B00", bg:"#b34a00",
    logo:"https://scores.iplt20.com/ipl/teamicons/Sunrisers_Hyderabad.png" },
  PBKS: { name:"Punjab Kings",                short:"PBKS", color:"#DD4257", bg:"#AA1A2B",
    logo:"https://scores.iplt20.com/ipl/teamicons/Punjab_Kings.png" },
  RR:   { name:"Rajasthan Royals",            short:"RR",   color:"#EA1A85", bg:"#a8105d",
    logo:"https://scores.iplt20.com/ipl/teamicons/Rajasthan_Royals.png" },
  GT:   { name:"Gujarat Titans",              short:"GT",   color:"#5B8DEF", bg:"#1C4E9D",
    logo:"https://scores.iplt20.com/ipl/teamicons/Gujarat_Titans.png" },
  LSG:  { name:"Lucknow Super Giants",        short:"LSG",  color:"#E84393", bg:"#A72056",
    logo:"https://scores.iplt20.com/ipl/teamicons/Lucknow_Super_Giants.png" },
};

export const TEAM_EMOJI: Record<string, string> = { MI:"🔵", CSK:"🟡", RCB:"🔴", KKR:"🟣", DC:"🔵", SRH:"🟠", PBKS:"⚪", RR:"🩷", GT:"🔷", LSG:"🟥" };

export interface Player {
  name: string;
  role: "BAT" | "BOWL" | "ALL" | "WK";
  runs?: number;
  avg?: number;
  sr?: number;
  matches?: number;
  wickets?: number;
  eco?: number;
  captain?: boolean;
}

export const SQUADS: Record<string, Player[]> = {
  MI: [
    { name:"Rohit Sharma",      role:"BAT", runs:6211, avg:29.6, sr:130.1, matches:243, captain:true },
    { name:"Hardik Pandya",     role:"ALL", runs:1736, wickets:42, avg:26.2, sr:142.0, eco:8.8, matches:122 },
    { name:"Suryakumar Yadav",  role:"BAT", runs:5019, avg:31.4, sr:148.1, matches:188 },
    { name:"Jasprit Bumrah",    role:"BOWL", wickets:170, eco:7.41, avg:23.4, matches:143 },
    { name:"Tilak Varma",       role:"BAT", runs:897, avg:34.5, sr:141.2, matches:34 },
    { name:"Naman Dhir",        role:"BAT", runs:412, avg:28.1, sr:138.4, matches:18 },
    { name:"Robin Minz",        role:"WK",  runs:210, avg:26.2, sr:128.0, matches:12 },
    { name:"Deepak Chahar",     role:"BOWL", wickets:89, eco:7.43, avg:24.6, matches:91 },
  ],
  CSK: [
    { name:"MS Dhoni",          role:"WK",  runs:5243, avg:38.1, sr:135.9, matches:250, captain:true },
    { name:"Ruturaj Gaikwad",   role:"BAT", runs:2800, avg:36.4, sr:137.8, matches:87 },
    { name:"Ravindra Jadeja",   role:"ALL", runs:2692, wickets:160, avg:26.6, sr:127.3, eco:7.61, matches:236 },
    { name:"Devon Conway",      role:"BAT", runs:925, avg:37.0, sr:139.5, matches:28 },
    { name:"Rachin Ravindra",   role:"ALL", runs:744, wickets:18, avg:31.0, sr:141.0, eco:8.3, matches:28 },
    { name:"Shivam Dube",       role:"ALL", runs:1100, wickets:20, avg:32.0, sr:156.0, eco:9.2, matches:58 },
    { name:"Matheesha Pathirana",role:"BOWL", wickets:59, eco:8.12, avg:21.3, matches:36 },
    { name:"Khaleel Ahmed",     role:"BOWL", wickets:74, eco:8.45, avg:26.8, matches:62 },
  ],
  RCB: [
    { name:"Virat Kohli",       role:"BAT", runs:7624, avg:37.3, sr:130.1, matches:243, captain:true },
    { name:"Rajat Patidar",     role:"BAT", runs:1024, avg:33.6, sr:148.2, matches:38 },
    { name:"Glenn Maxwell",     role:"ALL", runs:2178, wickets:36, avg:22.5, sr:154.0, eco:8.5, matches:111 },
    { name:"Phil Salt",         role:"WK",  runs:1230, avg:35.1, sr:162.3, matches:42 },
    { name:"Liam Livingstone",  role:"ALL", runs:1480, wickets:28, avg:29.6, sr:157.2, eco:8.9, matches:56 },
    { name:"Mohammed Siraj",    role:"BOWL", wickets:102, eco:8.32, avg:27.6, matches:101 },
    { name:"Yash Dayal",        role:"BOWL", wickets:48, eco:8.76, avg:25.4, matches:34 },
    { name:"Krunal Pandya",     role:"ALL", runs:1436, wickets:62, avg:22.8, sr:134.0, eco:7.9, matches:116 },
  ],
  KKR: [
    { name:"Ajinkya Rahane",    role:"BAT", runs:3872, avg:31.3, sr:126.0, matches:148, captain:true },
    { name:"Sunil Narine",      role:"ALL", runs:1445, wickets:182, avg:14.9, sr:163.0, eco:6.67, matches:177 },
    { name:"Andre Russell",     role:"ALL", runs:2245, wickets:94, avg:29.4, sr:179.4, eco:9.2, matches:119 },
    { name:"Rinku Singh",       role:"BAT", runs:1120, avg:44.8, sr:148.7, matches:48 },
    { name:"Venkatesh Iyer",    role:"ALL", runs:1248, wickets:12, avg:29.0, sr:142.0, eco:9.1, matches:57 },
    { name:"Varun Chakravarthy",role:"BOWL", wickets:83, eco:7.25, avg:22.4, matches:62 },
    { name:"Harshit Rana",      role:"BOWL", wickets:46, eco:8.91, avg:24.2, matches:28 },
    { name:"Ramandeep Singh",   role:"ALL", runs:380, wickets:18, avg:21.0, sr:143.0, eco:9.4, matches:28 },
  ],
  DC: [
    { name:"Axar Patel",        role:"ALL", runs:1264, wickets:91, avg:24.1, sr:138.0, eco:7.82, matches:98, captain:true },
    { name:"KL Rahul",          role:"WK",  runs:4683, avg:47.3, sr:135.9, matches:115 },
    { name:"Faf du Plessis",    role:"BAT", runs:3468, avg:34.6, sr:135.5, matches:116 },
    { name:"Tristan Stubbs",    role:"BAT", runs:540, avg:30.0, sr:152.5, matches:22 },
    { name:"Mitchell Starc",    role:"BOWL", wickets:56, eco:8.54, avg:23.8, matches:34 },
    { name:"Kuldeep Yadav",     role:"BOWL", wickets:104, eco:8.07, avg:21.4, matches:82 },
    { name:"Jake Fraser-McGurk",role:"BAT", runs:628, avg:26.2, sr:177.4, matches:24 },
    { name:"Ashutosh Sharma",   role:"ALL", runs:490, wickets:14, avg:28.0, sr:156.0, eco:9.3, matches:22 },
  ],
  SRH: [
    { name:"Pat Cummins",       role:"ALL", runs:414, wickets:65, avg:22.4, sr:148.0, eco:9.04, matches:47, captain:true },
    { name:"Travis Head",       role:"BAT", runs:903, avg:47.5, sr:167.4, matches:22 },
    { name:"Heinrich Klaasen",  role:"WK",  runs:1566, avg:39.1, sr:152.3, matches:52 },
    { name:"Abhishek Sharma",   role:"ALL", runs:1140, wickets:18, avg:30.0, sr:162.5, eco:8.9, matches:48 },
    { name:"Nitish Kumar Reddy",role:"ALL", runs:740, wickets:22, avg:27.4, sr:144.0, eco:9.1, matches:34 },
    { name:"Bhuvneshwar Kumar", role:"BOWL", wickets:181, eco:7.59, avg:25.4, matches:163 },
    { name:"Mohammed Shami",    role:"BOWL", wickets:115, eco:8.00, avg:23.9, matches:94 },
    { name:"Harshal Patel",     role:"BOWL", wickets:139, eco:8.82, avg:22.5, matches:118 },
  ],
  PBKS: [
    { name:"Shreyas Iyer",      role:"BAT", runs:3127, avg:31.6, sr:125.8, matches:115, captain:true },
    { name:"Prabhsimran Singh", role:"WK",  runs:1240, avg:31.0, sr:155.2, matches:48 },
    { name:"Jonny Bairstow",    role:"WK",  runs:1423, avg:36.5, sr:144.8, matches:44 },
    { name:"Sam Curran",        role:"ALL", runs:690, wickets:48, avg:19.7, sr:137.0, eco:8.7, matches:52 },
    { name:"Arshdeep Singh",    role:"BOWL", wickets:108, eco:8.38, avg:24.7, matches:88 },
    { name:"Yuzvendra Chahal",  role:"BOWL", wickets:187, eco:7.62, avg:22.9, matches:152 },
    { name:"Nehal Wadhera",     role:"BAT", runs:620, avg:27.8, sr:151.2, matches:28 },
    { name:"Marco Jansen",      role:"ALL", runs:280, wickets:32, avg:22.0, sr:138.0, eco:9.0, matches:24 },
  ],
  RR: [
    { name:"Sanju Samson",      role:"WK",  runs:4410, avg:34.4, sr:141.2, matches:151, captain:true },
    { name:"Jos Buttler",       role:"WK",  runs:3641, avg:41.4, sr:149.0, matches:102 },
    { name:"Yashasvi Jaiswal",  role:"BAT", runs:1704, avg:36.2, sr:163.5, matches:54 },
    { name:"Riyan Parag",       role:"ALL", runs:1160, wickets:20, avg:28.0, sr:145.0, eco:8.8, matches:62 },
    { name:"Shimron Hetmyer",   role:"BAT", runs:1120, avg:40.0, sr:152.2, matches:54 },
    { name:"Trent Boult",       role:"BOWL", wickets:121, eco:8.31, avg:22.6, matches:96 },
    { name:"Jofra Archer",      role:"BOWL", wickets:46, eco:7.89, avg:20.2, matches:35 },
    { name:"Maheesh Theekshana",role:"BOWL", wickets:52, eco:7.43, avg:21.8, matches:38 },
  ],
  GT: [
    { name:"Shubman Gill",      role:"BAT", runs:2682, avg:41.3, sr:141.9, matches:72, captain:true },
    { name:"David Miller",      role:"BAT", runs:2218, avg:42.7, sr:141.8, matches:78 },
    { name:"Sai Sudharsan",     role:"BAT", runs:1148, avg:38.3, sr:135.1, matches:38 },
    { name:"Rashid Khan",       role:"ALL", runs:628, wickets:112, avg:14.1, sr:132.0, eco:6.68, matches:92 },
    { name:"Kane Williamson",   role:"BAT", runs:1879, avg:32.4, sr:123.5, matches:68 },
    { name:"Kagiso Rabada",     role:"BOWL", wickets:86, eco:8.22, avg:22.1, matches:62 },
    { name:"Mohit Sharma",      role:"BOWL", wickets:74, eco:8.14, avg:24.9, matches:64 },
    { name:"Washington Sundar", role:"ALL", runs:890, wickets:56, avg:23.4, sr:131.0, eco:7.9, matches:76 },
  ],
  LSG: [
    { name:"Rishabh Pant",      role:"WK",  runs:3284, avg:35.5, sr:147.9, matches:111, captain:true },
    { name:"Nicholas Pooran",   role:"WK",  runs:1732, avg:30.4, sr:163.2, matches:68 },
    { name:"Ayush Badoni",      role:"BAT", runs:890, avg:33.7, sr:148.3, matches:42 },
    { name:"Mitchell Marsh",    role:"ALL", runs:1080, wickets:26, avg:31.0, sr:152.1, eco:8.9, matches:42 },
    { name:"Marcus Stoinis",    role:"ALL", runs:1426, wickets:42, avg:29.5, sr:150.3, eco:9.1, matches:58 },
    { name:"Ravi Bishnoi",      role:"BOWL", wickets:96, eco:7.38, avg:21.5, matches:76 },
    { name:"Mohsin Khan",       role:"BOWL", wickets:58, eco:7.92, avg:22.1, matches:44 },
    { name:"Avesh Khan",        role:"BOWL", wickets:81, eco:9.02, avg:26.4, matches:66 },
  ],
};

export const SCHEDULE = [
  { id:1,  t1:"MI",   t2:"CSK",  date:"Mar 22, 2025", time:"7:30 PM", venue:"Wankhede Stadium, Mumbai",              status:"upcoming", no:1 },
  { id:2,  t1:"RCB",  t2:"KKR",  date:"Mar 23, 2025", time:"3:30 PM", venue:"M. Chinnaswamy Stadium, Bengaluru",     status:"upcoming", no:2 },
  { id:3,  t1:"SRH",  t2:"DC",   date:"Mar 23, 2025", time:"7:30 PM", venue:"Rajiv Gandhi Stadium, Hyderabad",       status:"upcoming", no:3 },
  { id:4,  t1:"RR",   t2:"PBKS", date:"Mar 24, 2025", time:"7:30 PM", venue:"Sawai Mansingh Stadium, Jaipur",        status:"upcoming", no:4 },
  { id:5,  t1:"GT",   t2:"LSG",  date:"Mar 25, 2025", time:"7:30 PM", venue:"Narendra Modi Stadium, Ahmedabad",      status:"upcoming", no:5 },
  { id:6,  t1:"KKR",  t2:"MI",   date:"Mar 26, 2025", time:"7:30 PM", venue:"Eden Gardens, Kolkata",                 status:"upcoming", no:6 },
  { id:7,  t1:"CSK",  t2:"SRH",  date:"Mar 27, 2025", time:"7:30 PM", venue:"MA Chidambaram Stadium, Chennai",       status:"upcoming", no:7 },
  { id:8,  t1:"DC",   t2:"GT",   date:"Mar 28, 2025", time:"7:30 PM", venue:"Arun Jaitley Stadium, Delhi",           status:"upcoming", no:8 },
];

export const PAST_MATCHES = [
  {
    id:101, season:2024, t1:"KKR", t2:"SRH", winner:"KKR",
    s1:"113/10 (19.3)", s2:"114/9 (20)", venue:"Eden Gardens", date:"May 26, 2024", type:"Final",
    predWinner:"KKR", conf:61,
    bat:{ name:"Venkatesh Iyer", runs:52, pred:44, note:"Predicted 44, scored 52 — close!" },
    bowl:{ name:"Sunil Narine", wkts:2, pred:2, note:"Exact match" },
    ok:true,
  },
  {
    id:102, season:2024, t1:"RR", t2:"SRH", winner:"SRH",
    s1:"175/6 (20)", s2:"192/10 (20.3)", venue:"NM Stadium", date:"May 21, 2024", type:"Q2",
    predWinner:"RR", conf:54,
    bat:{ name:"Travis Head", runs:61, pred:55, note:"Off by 6 runs — reasonable" },
    bowl:{ name:"Trent Boult", wkts:3, pred:2, note:"Under-predicted by 1" },
    ok:false, // Model picked RR, SRH won — upset
    missReason:"SRH won by 1 run in a thriller — model favoured RR at home conditions",
  },
  {
    id:103, season:2024, t1:"RR", t2:"RCB", winner:"RR",
    s1:"172/8 (20)", s2:"174/6 (19)", venue:"Narendra Modi Stadium", date:"May 22, 2024", type:"Eliminator",
    predWinner:"RR", conf:58,
    bat:{ name:"Yashasvi Jaiswal", runs:45, pred:40, note:"Solid prediction" },
    bowl:{ name:"R. Ashwin", wkts:2, pred:1, note:"Better than expected" },
    ok:true,
  },
];
