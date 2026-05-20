import { useState, useRef, useEffect } from "react";

const C = {
  bg0:"#0A0A0A",bg1:"#141414",bg2:"#1E1E1E",bg3:"#282828",
  border:"rgba(255,255,255,0.06)",border2:"rgba(255,255,255,0.11)",
  txt1:"#F2EFE8",txt2:"#9A9690",txt3:"#555250",
  acc:"#F07820",accDim:"rgba(240,120,32,0.12)",accDim2:"rgba(240,120,32,0.22)",
  green:"#28C87A",greenDim:"rgba(40,200,122,0.12)",
  red:"#E04A4A",redDim:"rgba(224,74,74,0.12)",
  amber:"#EFB020",amberDim:"rgba(239,176,32,0.12)",
  blue:"#4A9CF0",blueDim:"rgba(74,156,240,0.12)",
  purple:"#9A78F0",purpleDim:"rgba(154,120,240,0.12)",
  pink:"#F06090",pinkDim:"rgba(240,96,144,0.12)",
};

const IC = {
  home:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12L3 12L12 3L21 12L19 12"/><path d="M5 12V19a1 1 0 001 1h3v-4a1 1 0 011-1h4a1 1 0 011 1v4h3a1 1 0 001-1V12"/></svg>,
  bolt:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3L4 14H12L11 21L20 10H12L13 3Z"/></svg>,
  file:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="12" y2="17"/></svg>,
  clip:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12l2 2 4-4"/></svg>,
  chat:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21C16.97 21 21 16.97 21 12S16.97 3 12 3 3 7.03 3 12c0 1.6.38 3.11 1.04 4.45.18.36.24.77.13 1.15l-.6 2.23a1 1 0 001.23 1.23l2.22-.6c.38-.1.79-.05 1.15.13C9.89 20.62 11.4 21 13 21"/></svg>,
  cal:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  cards:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M6 2h12a2 2 0 012 2v2H4V4a2 2 0 012-2z"/></svg>,
  target:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>,
  brain:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3C6.8 3 5 4.8 5 7c-1.7.5-3 2.1-3 4 0 2.2 1.8 4 4 4h3M9 3c0 0 0 5 0 12M9 3c2.2 0 4 1.8 4 4M9 15v6M15 3c2.2 0 4 1.8 4 4 1.7.5 3 2.1 3 4 0 2.2-1.8 4-4 4h-3M15 3c0 0 0 5 0 12M15 3c-2.2 0-4 1.8-4 4M15 15v6"/></svg>,
  clock:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
  flame:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c0 0-5 6-5 11a5 5 0 0010 0c0-2-1-4-2-5 0 2-1 3-3 3 1-3 0-6 0-9z"/></svg>,
  users:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="8" r="3"/><path d="M1 20c0-3.3 2.7-6 6-6"/><circle cx="17" cy="8" r="3"/><path d="M23 20c0-3.3-2.7-6-6-6"/><path d="M13 20c0-3.3-2.7-6-6-6h0c-3.3 0-6 2.7-6 6"/></svg>,
  heart:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>,
  chart:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20h18M5 20V14M9 20V8M13 20V11M17 20V4"/></svg>,
  check:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12L10 17L20 7"/></svg>,
  x:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6L18 18"/></svg>,
  sparkles:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3zM5 3l.6 2.4L8 6l-2.4.6L5 9l-.6-2.4L2 6l2.4-.6L5 3zM19 15l.4 1.6L21 17l-1.6.4L19 19l-.4-1.6L17 17l1.6-.4L19 15z"/></svg>,
  arrow:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12H19M13 6L19 12L13 18"/></svg>,
  refresh:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11A8 8 0 109.4 4.4"/><path d="M4 5v4h4"/></svg>,
  upload:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  plus:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
  alert:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>,
  send:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14L21 3M21 3L14.5 21c-.26.6-1.09.6-1.36 0L10 14M21 3L3 10.86c-.59.27-.58 1.11.02 1.37L10 14"/></svg>,
  shield:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L4 7v5c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V7l-8-4z"/></svg>,
  star:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 18l-6.2 3.1 1.2-6.9L2 9.3l6.9-1L12 2z"/></svg>,
  trophy:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M5 3H3v6a4 4 0 004 4M19 3h2v6a4 4 0 01-4 4M5 3h14v7a7 7 0 01-14 0V3z"/></svg>,
  lock:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  moon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>,
  flag:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5V21M5 5H19L16 10H19L16 15H5"/></svg>,
  warning:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.3L2 20h20L13.7 3.3a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>,
  bell:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/></svg>,
  settings:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 4.3C10.7 2.6 13.3 2.6 13.7 4.3a2 2 0 002.7 1.4c1.5-1 3.3.8 2.3 2.3a2 2 0 001.4 2.7c1.7.4 1.7 3 0 3.4a2 2 0 00-1.4 2.7c1 1.5-.8 3.3-2.3 2.3a2 2 0 00-2.7 1.4c-.4 1.7-3 1.7-3.4 0a2 2 0 00-2.7-1.4c-1.5 1-3.3-.8-2.3-2.3a2 2 0 00-1.4-2.7c-1.7-.4-1.7-3 0-3.4a2 2 0 001.4-2.7c-1-1.5.8-3.3 2.3-2.3a2 2 0 002.7-1.4z"/><circle cx="12" cy="12" r="3"/></svg>,
  slash:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><line x1="4.9" y1="4.9" x2="19.1" y2="19.1"/></svg>,
  key:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="4.5"/><path d="M21 2l-9.6 9.6M15.5 7.5L18 10M14 9l2 2"/></svg>,
  copy:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
  link:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
  server:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  play:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10 8.5L16 12L10 15.5V8.5Z" fill="currentColor" stroke="none"/></svg>,
  crown:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 19h18M5 19L3 7l4.5 4.5L12 4l4.5 7.5L21 7l-2 12"/></svg>,
  eye:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5C7 5 3 10 3 12c0 2 4 7 9 7s9-5 9-7c0-2-4-7-9-7z"/><circle cx="12" cy="12" r="3"/></svg>,
  bulb:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21h6M12 3a6 6 0 016 6c0 2.2-1.2 4.2-3 5.2V17a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2.8A6 6 0 0112 3z"/></svg>,
  math:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 5H5M19 19H5M8 12H16M12 8v8"/></svg>,
  book:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 19c0-1.1.9-2 2-2h15V4H5a2 2 0 00-2 2v13z"/><path d="M3 19c0 1.1.9 2 2 2h15v-4"/><path d="M7 7h7M7 11h5"/></svg>,
  flask:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M9 3v7L4.5 19.1c-.3.6.1 1.3.8 1.3h13.4c.7 0 1.1-.7.8-1.3L15 10V3"/><path d="M6 15h12"/></svg>,
  world:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8"/><path d="M12 3c0 0-4 4-4 9s4 9 4 9 4-4 4-9-4-9-4-9z"/></svg>,
  trending:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17L9 11L13 15L21 7"/><path d="M17 7h4v4"/></svg>,
};

function Ic({ n, sz=16, color, style={} }) {
  return <span style={{ width:sz, height:sz, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:color||"currentColor", ...style }}>{IC[n]||IC.bolt}</span>;
}

const s = {
  shell:{ display:"flex", height:"100vh", background:C.bg0, fontFamily:"'DM Sans',system-ui,sans-serif", overflow:"hidden" },
  sidebar:{ width:205, background:C.bg1, borderRight:`0.5px solid ${C.border}`, display:"flex", flexDirection:"column", padding:"18px 0", flexShrink:0, overflowY:"auto" },
  logo:{ padding:"0 15px 15px", display:"flex", alignItems:"center", gap:8, borderBottom:`0.5px solid ${C.border}`, marginBottom:10 },
  logoBox:{ width:28, height:28, background:C.acc, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" },
  ni:(a)=>({ display:"flex", alignItems:"center", gap:8, padding:"7px 15px", margin:"1px 6px", borderRadius:7, cursor:"pointer", background:a?C.accDim2:"transparent" }),
  nl:(a)=>({ fontSize:12, color:a?C.txt1:C.txt2, fontWeight:a?500:400 }),
  ns:{ fontSize:9, color:C.txt3, textTransform:"uppercase", letterSpacing:"0.07em", padding:"10px 15px 3px" },
  main:{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" },
  tb:{ height:50, borderBottom:`0.5px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 22px", flexShrink:0 },
  con:{ flex:1, overflowY:"auto", padding:22 },
  card:(x={})=>({ background:C.bg1, border:`0.5px solid ${C.border}`, borderRadius:13, padding:"14px 16px", marginBottom:10, ...x }),
  c2:(x={})=>({ background:C.bg2, border:`0.5px solid ${C.border}`, borderRadius:9, padding:"10px 12px", marginBottom:7, ...x }),
  lbl:{ fontSize:10, fontWeight:500, color:C.txt3, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 },
  row:{ display:"flex", alignItems:"center", gap:9 },
  g2:{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 },
  g3:{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:9, marginBottom:10 },
  g4:{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:9, marginBottom:12 },
  met:{ background:C.bg2, border:`0.5px solid ${C.border}`, borderRadius:9, padding:"10px 12px" },
  btn:(v="acc")=>({ padding:v==="sm"?"5px 12px":"9px 17px", borderRadius:9, border:v==="outline"?`0.5px solid ${C.border2}`:"none", cursor:"pointer", fontSize:v==="sm"?11:13, fontWeight:500, fontFamily:"inherit", background:v==="outline"?"transparent":v==="ghost"?C.bg2:v==="red"?C.red:v==="blue"?C.blue:C.acc, color:v==="outline"?C.txt2:v==="ghost"?C.txt1:"#0A0A0A" }),
  bdg:(color,bg)=>({ fontSize:10, padding:"2px 8px", borderRadius:999, fontWeight:500, background:bg, color }),
  pb:{ height:5, background:C.bg3, borderRadius:999, overflow:"hidden", marginTop:5 },
  ib:(color,bg,sz=30)=>({ width:sz, height:sz, borderRadius:8, background:bg, color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }),
  div:{ height:"0.5px", background:C.border, margin:"12px 0" },
  inp:{ background:C.bg2, border:`0.5px solid ${C.border2}`, borderRadius:8, padding:"8px 11px", fontSize:13, color:C.txt1, fontFamily:"inherit", outline:"none", width:"100%", boxSizing:"border-box" },
};

const MATS = [
  { id:"mat", name:"Matemática", icon:"math", color:C.acc },
  { id:"por", name:"Português", icon:"book", color:C.blue },
  { id:"qui", name:"Química", icon:"flask", color:C.green },
  { id:"fis", name:"Física", icon:"bolt", color:C.amber },
  { id:"his", name:"História", icon:"world", color:C.purple },
];

const BANCO = [
  {id:1,mat:"Matemática",dif:1,tipo:"calculo",q:"Quanto é 15% de 200?",opts:["25","30","35","40"],c:1,exp:"0,15×200=30."},
  {id:2,mat:"Matemática",dif:2,tipo:"calculo",q:"PA (a₁=3, r=4) — qual o 6º termo?",opts:["19","21","23","25"],c:2,exp:"a₆=3+5×4=23."},
  {id:3,mat:"Matemática",dif:3,tipo:"calculo",q:"log₂(32) é igual a:",opts:["4","5","6","8"],c:1,exp:"2⁵=32."},
  {id:4,mat:"Português",dif:1,tipo:"interpretacao",q:"'Ela foi ao médico.' O sujeito é:",opts:["médico","foi","Ela","ao médico"],c:2,exp:"'Ela' é o sujeito."},
  {id:5,mat:"Português",dif:2,tipo:"interpretacao",q:"'Minha alma é uma princesa.' Figura de linguagem:",opts:["Metonímia","Antítese","Metáfora","Hipérbole"],c:2,exp:"Comparação implícita — metáfora."},
  {id:6,mat:"Química",dif:1,tipo:"calculo",q:"pH de solução neutra:",opts:["0","7","10","14"],c:1,exp:"Neutro=pH 7."},
  {id:7,mat:"Química",dif:2,tipo:"interpretacao",q:"Etanol (C₂H₅OH) é classificado como:",opts:["Ácido","Álcool","Aldeído","Cetona"],c:1,exp:"Grupo -OH → álcool."},
  {id:8,mat:"Física",dif:1,tipo:"interpretacao",q:"Qual grandeza é medida em Joules?",opts:["Força","Potência","Energia","Pressão"],c:2,exp:"Energia → Joules."},
  {id:9,mat:"Física",dif:2,tipo:"calculo",q:"2kg a 5m/s → Energia cinética:",opts:["10J","25J","20J","5J"],c:1,exp:"Ec=mv²/2=25J."},
  {id:10,mat:"História",dif:1,tipo:"interpretacao",q:"Abolição da escravidão no Brasil:",opts:["Lei Áurea","Lei Saraiva","Lei Rio Branco","Lei Eusébio"],c:0,exp:"Lei Áurea (1888)."},
  {id:11,mat:"História",dif:2,tipo:"interpretacao",q:"O Iluminismo valorizava principalmente:",opts:["A fé","A razão","O rei","A tradição"],c:1,exp:"Iluminismo = razão."},
  {id:12,mat:"Matemática",dif:2,tipo:"calculo",q:"Raízes de x²-5x+6=0:",opts:["1 e 6","2 e 3","3 e 4","1 e 5"],c:1,exp:"Δ=1; x=2 ou 3."},
  {id:13,mat:"Química",dif:2,tipo:"calculo",q:"44g de CO₂ (M=44) = quantos mols?",opts:["0,5","1","2","4"],c:1,exp:"n=44/44=1 mol."},
  {id:14,mat:"Física",dif:2,tipo:"interpretacao",q:"Efeito que explica o vento ao pedalar:",opts:["Ohm","Newton","Bernoulli","Faraday"],c:2,exp:"Bernoulli: v×pressão."},
  {id:15,mat:"História",dif:3,tipo:"interpretacao",q:"Westfália (1648) consolidou:",opts:["A ONU","Soberania nacional","Fim do feudalismo","Unificação alemã"],c:1,exp:"Marco da soberania estatal."},
];

const SAUDE_H=[
  {dia:"Seg",horas:2.5,qualidade:82,fadiga:20},{dia:"Ter",horas:3.1,qualidade:78,fadiga:35},
  {dia:"Qua",horas:1.8,qualidade:88,fadiga:15},{dia:"Qui",horas:3.8,qualidade:65,fadiga:60},
  {dia:"Sex",horas:4.2,qualidade:52,fadiga:78},{dia:"Sáb",horas:2.0,qualidade:80,fadiga:25},
  {dia:"Dom",horas:1.5,qualidade:90,fadiga:12},
];

const GRUPO=[
  {nome:"Ana (você)",av:"AN",cor:C.acc,horas:12.5,streak:12,xp:1840,online:true},
  {nome:"Carlos",av:"CA",cor:C.blue,horas:10.2,streak:8,xp:1520,online:true},
  {nome:"Marina",av:"MA",cor:C.green,horas:9.8,streak:15,xp:1490,online:false},
  {nome:"Pedro",av:"PE",cor:C.purple,horas:7.1,streak:5,xp:1100,online:false},
  {nome:"Júlia",av:"JU",cor:C.pink,horas:5.3,streak:3,xp:820,online:false},
];

const CONQ=[
  {id:"a",icon:"flame",color:C.acc,titulo:"Primeiro dia",desc:"Primeira sessão",ok:true},
  {id:"b",icon:"flame",color:C.red,titulo:"Semana de fogo",desc:"7 dias seguidos",ok:true},
  {id:"c",icon:"chart",color:C.blue,titulo:"Centenário",desc:"100 questões",ok:false,p:42,m:100},
  {id:"d",icon:"trophy",color:C.purple,titulo:"Simuladista",desc:"5 simulados",ok:false,p:2,m:5},
  {id:"e",icon:"crown",color:C.amber,titulo:"Mês invicto",desc:"30 dias streak",ok:false,p:12,m:30},
  {id:"f",icon:"star",color:C.green,titulo:"Nota máxima",desc:"100% simulado",ok:false,p:0,m:1},
];

async function ai(msgs, sys="") {
  try {
    const backendUrl = localStorage.getItem("focototal_backend") || "";
    const anthropicKey = localStorage.getItem("focototal_apikey") || "";
    const geminiKey = localStorage.getItem("focototal_geminikey") || "";

    // Opção 1: backend próprio (mais seguro)
    if (backendUrl) {
      const r = await fetch(backendUrl + "/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ system: sys||"Você é tutor de concursos brasileiro. Responda em português.", messages: msgs }),
      });
      if (!r.ok) return "Erro no backend: " + r.status;
      const d = await r.json();
      return d.text || "Erro.";
    }

    // Opção 2: Gemini (gratuito)
    if (geminiKey) {
      const model = "gemini-2.0-flash";
      const url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + geminiKey;
      // Monta histórico no formato Gemini
      const geminiMsgs = msgs.map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));
      // Injeta system prompt como primeira mensagem user se existir
      const systemInstruction = sys ? { parts: [{ text: sys }] } : undefined;
      const body = {
        contents: geminiMsgs,
        ...(systemInstruction && { systemInstruction }),
        generationConfig: { maxOutputTokens: 700, temperature: 0.7 }
      };
      const r = await fetch(url, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(body)
      });
      const d = await r.json();
      if (d.error) return "Erro Gemini: " + d.error.message;
      return d.candidates?.[0]?.content?.parts?.[0]?.text || "Sem resposta.";
    }

    // Opção 3: Anthropic direto (chave no browser)
    if (anthropicKey) {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json","x-api-key":anthropicKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:700,
          system: sys||"Você é tutor de concursos brasileiro. Responda em português.",
          messages: msgs }),
      });
      const d = await r.json();
      if (d.error) return "Erro Anthropic: " + d.error.message;
      return d.content?.[0]?.text || "Erro.";
    }

    return "⚠️ Configure uma chave de API nas Configurações para usar a IA.";
  } catch(e) { return "Erro de conexão: " + e.message; }
}
function ConfigAPI() {
  const [geminiKey, setGeminiKey] = useState(localStorage.getItem("focototal_geminikey")||"");
  const [anthropicKey, setAnthropicKey] = useState(localStorage.getItem("focototal_apikey")||"");
  const [backend, setBackend] = useState(localStorage.getItem("focototal_backend")||"");
  const [testMsg, setTestMsg] = useState("");
  const [testing, setTesting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const [showAnthropic, setShowAnthropic] = useState(false);

  const temGemini = !!localStorage.getItem("focototal_geminikey");
  const temAnthropic = !!localStorage.getItem("focototal_apikey");
  const temBackend = !!localStorage.getItem("focototal_backend");
  const temAlguma = temGemini || temAnthropic || temBackend;

  // Qual provedor está ativo
  const provedorAtivo = temBackend ? "Backend" : temGemini ? "Gemini (gratuito)" : temAnthropic ? "Anthropic" : "Nenhum";
  const provedorCor = temBackend ? C.blue : temGemini ? C.green : temAnthropic ? C.purple : C.red;

  function salvar() {
    if (geminiKey.trim()) localStorage.setItem("focototal_geminikey", geminiKey.trim());
    else localStorage.removeItem("focototal_geminikey");
    if (anthropicKey.trim()) localStorage.setItem("focototal_apikey", anthropicKey.trim());
    else localStorage.removeItem("focototal_apikey");
    if (backend.trim()) localStorage.setItem("focototal_backend", backend.trim().replace(/\/$/,""));
    else localStorage.removeItem("focototal_backend");
    setSaved(true); setTimeout(()=>setSaved(false), 2500);
  }

  async function testar() {
    setTesting(true); setTestMsg("");
    const gKey = geminiKey.trim();
    const aKey = anthropicKey.trim();
    const bk = backend.trim();
    try {
      if (bk) {
        const r = await fetch(bk+"/api/health");
        setTestMsg(r.ok ? "✅ Backend conectado!" : "❌ Backend erro "+r.status);
      } else if (gKey) {
        const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="+gKey;
        const r = await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:"Responda só: OK"}]}],generationConfig:{maxOutputTokens:10}})});
        const d = await r.json();
        if (d.candidates?.[0]?.content?.parts?.[0]?.text) setTestMsg("✅ Gemini OK! Resposta: " + d.candidates[0].content.parts[0].text.trim());
        else if (d.error) setTestMsg("❌ Erro Gemini: " + d.error.message);
        else setTestMsg("❌ Resposta inesperada.");
      } else if (aKey) {
        const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":aKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:20,messages:[{role:"user",content:"Responda só: OK"}]})});
        const d = await r.json();
        if (d.content?.[0]?.text) setTestMsg("✅ Anthropic OK! Resposta: " + d.content[0].text);
        else if (d.error) setTestMsg("❌ Erro: " + d.error.message);
      } else {
        setTestMsg("⚠️ Insira uma chave antes de testar.");
      }
    } catch(e) { setTestMsg("❌ Erro: " + e.message); }
    setTesting(false);
  }

  return (
    <div>
      <div style={{fontSize:17,fontWeight:500,color:C.txt1,marginBottom:4}}>Chave API & Backend</div>
      <div style={{fontSize:13,color:C.txt2,marginBottom:16,lineHeight:1.6}}>Configure sua IA. O app tenta nesta ordem: Backend → Gemini → Anthropic.</div>

      {/* Status atual */}
      <div style={{...s.c2({background:temAlguma?C.greenDim:C.redDim,border:`0.5px solid ${temAlguma?C.green:C.red}30`,marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between"})}}>
        <div style={s.row}>
          <Ic n={temAlguma?"check":"alert"} sz={15} color={temAlguma?C.green:C.red}/>
          <div>
            <div style={{fontSize:12,fontWeight:500,color:temAlguma?C.green:C.red}}>{temAlguma?"IA configurada":"IA não configurada"}</div>
            <div style={{fontSize:10,color:C.txt3}}>Provedor ativo: <span style={{color:provedorCor,fontWeight:500}}>{provedorAtivo}</span></div>
          </div>
        </div>
      </div>

      {/* Gemini - RECOMENDADO */}
      <div style={s.card({marginBottom:10,border:`0.5px solid ${temGemini?C.green+"40":C.border}`})}>
        <div style={{...s.row,marginBottom:10}}>
          <div style={s.ib(C.green,C.greenDim,28)}><Ic n="sparkles" sz={13} color={C.green}/></div>
          <div style={{flex:1}}>
            <div style={{...s.row}}>
              <div style={{fontSize:13,fontWeight:500,color:C.txt1}}>Google Gemini</div>
              <span style={s.bdg(C.green,C.greenDim)}>Gratuito ✦ Recomendado</span>
            </div>
            <div style={{fontSize:11,color:C.txt3}}>1 milhão de tokens/dia grátis · Qualidade excelente</div>
          </div>
        </div>
        <div style={{fontSize:10,color:C.txt3,marginBottom:5}}>Chave API (começa com AIza...)</div>
        <div style={{...s.row,marginBottom:8}}>
          <input type={showGemini?"text":"password"} value={geminiKey} onChange={e=>setGeminiKey(e.target.value)}
            placeholder="AIzaSy..." style={{...s.inp,flex:1,fontFamily:"monospace",fontSize:12}}/>
          <button onClick={()=>setShowGemini(!showGemini)} style={{...s.btn("ghost"),padding:"8px 10px",fontSize:11}}>{showGemini?"Ocultar":"Ver"}</button>
        </div>
        <div style={{...s.c2({background:C.greenDim,border:`0.5px solid ${C.green}25`,marginBottom:0})}}>
          <div style={s.row}>
            <Ic n="bulb" sz={12} color={C.green} style={{flexShrink:0}}/>
            <div style={{fontSize:11,color:C.txt2}}>Pegue sua chave grátis em <strong style={{color:C.green}}>aistudio.google.com</strong> → Get API Key</div>
          </div>
        </div>
      </div>

      {/* Anthropic */}
      <div style={s.card({marginBottom:10,border:`0.5px solid ${temAnthropic?C.purple+"40":C.border}`})}>
        <div style={{...s.row,marginBottom:10}}>
          <div style={s.ib(C.purple,C.purpleDim,28)}><Ic n="bolt" sz={13} color={C.purple}/></div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:500,color:C.txt1}}>Anthropic Claude</div>
            <div style={{fontSize:11,color:C.txt3}}>$5 crédito grátis no cadastro · Maior qualidade</div>
          </div>
        </div>
        <div style={{fontSize:10,color:C.txt3,marginBottom:5}}>Chave API (começa com sk-ant-...)</div>
        <div style={{...s.row,marginBottom:0}}>
          <input type={showAnthropic?"text":"password"} value={anthropicKey} onChange={e=>setAnthropicKey(e.target.value)}
            placeholder="sk-ant-api03-..." style={{...s.inp,flex:1,fontFamily:"monospace",fontSize:12}}/>
          <button onClick={()=>setShowAnthropic(!showAnthropic)} style={{...s.btn("ghost"),padding:"8px 10px",fontSize:11}}>{showAnthropic?"Ocultar":"Ver"}</button>
        </div>
      </div>

      {/* Backend */}
      <div style={s.card({marginBottom:12,border:`0.5px solid ${temBackend?C.blue+"40":C.border}`})}>
        <div style={{...s.row,marginBottom:10}}>
          <div style={s.ib(C.blue,C.blueDim,28)}><Ic n="server" sz={13} color={C.blue}/></div>
          <div>
            <div style={{fontSize:13,fontWeight:500,color:C.txt1}}>Backend próprio</div>
            <div style={{fontSize:11,color:C.txt3}}>Para produção — chave fica segura no servidor</div>
          </div>
        </div>
        <input value={backend} onChange={e=>setBackend(e.target.value)}
          placeholder="https://seu-backend.onrender.com"
          style={{...s.inp,fontFamily:"monospace",fontSize:12}}/>
      </div>

      {/* Botões */}
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <button onClick={testar} disabled={testing} style={{...s.btn("ghost"),flex:1,opacity:testing?.7:1}}>
          {testing?"Testando...":"Testar conexão"}
        </button>
        <button onClick={salvar} style={{...s.btn(),flex:2}}>
          <span style={s.row}><Ic n="check" sz={13} color="#0A0A0A"/>{saved?"Salvo! ✓":"Salvar configurações"}</span>
        </button>
      </div>

      {testMsg&&<div style={{...s.c2({background:testMsg.startsWith("✅")?C.greenDim:testMsg.startsWith("⚠️")?C.amberDim:C.redDim,border:`0.5px solid ${testMsg.startsWith("✅")?C.green:testMsg.startsWith("⚠️")?C.amber:C.red}25`})}}>
        <div style={{fontSize:12,color:C.txt1,lineHeight:1.5}}>{testMsg}</div>
      </div>}
    </div>
  );
}


function MetodosEstudo({ metodos, setMetodos, concurso, setConcurso }) {
  const [detalhe, setDetalhe] = useState(null);

  const TECNICAS = [
    {
      id:"spaced", icon:"cal", color:C.acc,
      nome:"Repetição espaçada",
      sub:"Define QUANDO revisar — o coração do app",
      tempoDef:true,
      badge:"Define tempo de revisão",
      badgeC:C.acc,
      descricao:"A única técnica que calcula com precisão científica quando cada conteúdo deve ser revisado. O algoritmo SM-2 ajusta o intervalo baseado no seu desempenho: quanto mais você erra, mais frequente a revisão. Quanto mais acerta, o intervalo cresce.",
      impacto:"Regula os Flashcards, o Calendário de revisões e os alertas de vencimento. Sem isso, você revisa quando lembra — que costuma ser tarde demais.",
      exemplo:"Você responde um flashcard de Química como 'Difícil' → sistema agenda para amanhã. Responde como 'Fácil' → agenda para daqui 10 dias.",
    },
    {
      id:"active", icon:"brain", color:C.blue,
      nome:"Recuperação ativa",
      sub:"Como estudar — fechar o material e testar a memória",
      tempoDef:false,
      badge:"Sem tempo fixo",
      badgeC:C.txt3,
      descricao:"Em vez de reler passivamente, você fecha o material e tenta lembrar tudo. Isso força o cérebro a reconstruir o conhecimento, consolidando muito mais do que a releitura.",
      impacto:"Ativa o modo de flashcard com resposta oculta (ver frente → tentar lembrar → revelar verso). O Tutor IA também usa isso no modo Feynman.",
      exemplo:"Após ler um módulo, o app exibe uma tela em branco: 'O que você lembra sobre Química Orgânica?' Você escreve e depois compara.",
    },
    {
      id:"interleaving", icon:"trending", color:C.purple,
      nome:"Intercalação",
      sub:"Mistura matérias na mesma sessão — parece difícil, funciona",
      tempoDef:false,
      badge:"Influencia o plano",
      badgeC:C.purple,
      descricao:"Em vez de estudar 2h de Matemática, você alterna matérias diferentes. O cérebro é forçado a identificar qual estratégia aplicar, gerando retenção muito superior ao estudo em blocos.",
      impacto:"O Plano dinâmico usa intercalação ao montar as sessões semanais — nunca coloca 3 dias seguidos da mesma matéria quando há outras pendentes.",
      exemplo:"Segunda: Química → Matemática → Revisão de Português. Terça: Física → História → Questões de Química.",
    },
    {
      id:"feynman", icon:"chat", color:C.green,
      nome:"Técnica Feynman",
      sub:"Explique como se fosse ensinar — e descubra onde não sabe",
      tempoDef:false,
      badge:"Sem tempo fixo",
      badgeC:C.txt3,
      descricao:"Explique o conceito com suas próprias palavras, como se estivesse ensinando a uma criança. Onde você trava, há lacunas no entendimento. Volte ao material e repita.",
      impacto:"O Tutor IA entra em modo Feynman quando ativado: em vez de explicar, faz perguntas para você explicar de volta. Identifica lacunas automaticamente.",
      exemplo:"Tutor pergunta: 'Me explique o que é pH como se eu tivesse 12 anos.' Você explica. O tutor identifica os pontos vagos e aprofunda só eles.",
    },
    {
      id:"pomodoro", icon:"clock", color:C.amber,
      nome:"Pomodoro",
      sub:"25 min foco + 5 min pausa — estrutura as sessões",
      tempoDef:"sessao",
      badge:"Define tempo de sessão",
      badgeC:C.amber,
      descricao:"Blocos de 25 minutos de foco total, seguidos de 5 minutos de pausa. A cada 4 ciclos, pausa longa de 15–30 min. Combate a procrastinação ao tornar o estudo concreto e delimitado.",
      impacto:"O Plano dinâmico monta as sessões respeitando os ciclos pomodoro. O timer do Modo Prova também usa essa lógica.",
      exemplo:"Sessão de 1h30 = 3 pomodoros. O app divide: 25min Química → 5min → 25min Matemática → 5min → 25min revisão → pausa longa.",
    },
  ];

  const CONCURSOS = ["ENEM","OAB","ENADE","Banco do Brasil","Receita Federal","Polícia Federal","INSS","Personalizado"];

  function toggle(id) {
    setMetodos(prev => prev.includes(id) ? prev.filter(m=>m!==id) : [...prev,id]);
  }

  const tecAtivas = TECNICAS.filter(t=>metodos.includes(t.id));
  const tempoDeRevStr = tecAtivas.find(t=>t.tempoDef===true) ? "Repetição espaçada define quando revisar cada conteúdo" : "Nenhuma técnica ativa define tempo de revisão — ative a Repetição espaçada";
  const tempoDeRevOk = tecAtivas.some(t=>t.tempoDef===true);

  return (
    <div>
      <div style={{fontSize:17,fontWeight:500,color:C.txt1,marginBottom:3}}>Métodos de estudo</div>
      <div style={{fontSize:13,color:C.txt2,marginBottom:16,lineHeight:1.6}}>Escolha as técnicas que vão reger seu app. Cada uma ativada muda como o plano, os flashcards e as sessões funcionam.</div>

      {/* Concurso alvo */}
      <div style={s.lbl}>Concurso / vestibular alvo</div>
      <div style={s.card({marginBottom:16})}>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
          {CONCURSOS.map(c=>(
            <div key={c} onClick={()=>setConcurso(c)}
              style={{fontSize:11,padding:"5px 11px",borderRadius:999,cursor:"pointer",border:`0.5px solid ${concurso===c?C.acc:C.border2}`,background:concurso===c?C.accDim2:"transparent",color:concurso===c?C.acc:C.txt2,fontWeight:concurso===c?500:400}}>
              {c}
            </div>
          ))}
        </div>
        {concurso&&<div style={{...s.row}}>
          <Ic n="check" sz={13} color={C.green}/>
          <span style={{fontSize:12,color:C.txt1}}>Estudando para: <strong style={{color:C.acc}}>{concurso}</strong></span>
          <span style={{...s.bdg(C.acc,C.accDim2),marginLeft:"auto"}}>47 dias</span>
        </div>}
      </div>

      {/* Status do tempo de revisão */}
      <div style={{...s.c2({background:tempoDeRevOk?C.greenDim:C.amberDim,border:`0.5px solid ${tempoDeRevOk?C.green:C.amber}30`,marginBottom:14,display:"flex",alignItems:"flex-start",gap:9})}}>
        <Ic n={tempoDeRevOk?"check":"alert"} sz={16} color={tempoDeRevOk?C.green:C.amber} style={{flexShrink:0,marginTop:1}}/>
        <div>
          <div style={{fontSize:11,fontWeight:500,color:tempoDeRevOk?C.green:C.amber,marginBottom:2}}>{tempoDeRevOk?"Tempo de revisão configurado":"Atenção"}</div>
          <div style={{fontSize:11,color:C.txt2,lineHeight:1.5}}>{tempoDeRevStr}</div>
        </div>
      </div>

      {/* Lista de técnicas */}
      <div style={s.lbl}>Técnicas disponíveis — clique para ativar/desativar · toque no nome para ver detalhes</div>
      {TECNICAS.map(t=>{
        const ativa=metodos.includes(t.id);
        const aberta=detalhe===t.id;
        return (
          <div key={t.id} style={s.card({background:ativa?t.color+"0D":C.bg1,border:`0.5px solid ${ativa?t.color+"40":C.border}`,marginBottom:9})}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              {/* Toggle */}
              <div onClick={()=>toggle(t.id)} style={{width:36,height:21,borderRadius:999,background:ativa?t.color:C.bg3,display:"flex",alignItems:"center",padding:2,cursor:"pointer",transition:"all .2s",flexShrink:0}}>
                <div style={{width:17,height:17,borderRadius:"50%",background:"white",marginLeft:ativa?15:0,transition:"margin .2s",boxShadow:"0 1px 3px rgba(0,0,0,0.3)"}}/>
              </div>
              {/* Ícone */}
              <div style={s.ib(t.color,t.color+"18",30)}><Ic n={t.icon} sz={14} color={t.color}/></div>
              {/* Info */}
              <div style={{flex:1,cursor:"pointer"}} onClick={()=>setDetalhe(aberta?null:t.id)}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  <span style={{fontSize:13,fontWeight:500,color:ativa?C.txt1:C.txt2}}>{t.nome}</span>
                  <span style={{fontSize:9,padding:"1px 7px",borderRadius:999,background:t.badgeC+"18",color:t.badgeC,fontWeight:500}}>{t.badge}</span>
                </div>
                <div style={{fontSize:11,color:C.txt3}}>{t.sub}</div>
              </div>
              {/* Chevron */}
              <div onClick={()=>setDetalhe(aberta?null:t.id)} style={{cursor:"pointer",color:C.txt3,fontSize:14,transform:aberta?"rotate(180deg)":"none",transition:"transform .2s"}}>▾</div>
            </div>

            {/* Detalhe expandido */}
            {aberta&&(
              <div style={{marginTop:13,paddingTop:13,borderTop:`0.5px solid ${t.color}30`}}>
                <div style={{fontSize:12,color:C.txt1,lineHeight:1.7,marginBottom:10}}>{t.descricao}</div>
                <div style={{...s.c2({background:t.color+"10",border:`0.5px solid ${t.color}28`,marginBottom:8})}}>
                  <div style={{fontSize:10,fontWeight:500,color:t.color,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.05em"}}>Como afeta o app</div>
                  <div style={{fontSize:11,color:C.txt2,lineHeight:1.6}}>{t.impacto}</div>
                </div>
                <div style={{...s.c2({background:C.bg3,marginBottom:0})}}>
                  <div style={{fontSize:10,fontWeight:500,color:C.txt3,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.05em"}}>Exemplo prático</div>
                  <div style={{fontSize:11,color:C.txt2,lineHeight:1.6,fontStyle:"italic"}}>{t.exemplo}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Resumo ativo */}
      {tecAtivas.length>0&&(
        <div style={s.card({background:C.bg2,marginTop:4})}>
          <div style={s.lbl}>Técnicas ativas ({tecAtivas.length})</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {tecAtivas.map(t=>(
              <div key={t.id} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,padding:"4px 10px",borderRadius:999,background:t.color+"18",color:t.color,fontWeight:500}}>
                <Ic n={t.icon} sz={11} color={t.color}/>{t.nome}
              </div>
            ))}
          </div>
          <div style={{fontSize:11,color:C.txt3,marginTop:10,lineHeight:1.6}}>
            {tempoDeRevOk?"✓ Tempo de revisão definido pela repetição espaçada":"⚠️ Ative a repetição espaçada para o app calcular quando revisar cada conteúdo."}
          </div>
        </div>
      )}
    </div>
  );
}
function Edital({ materias, setMaterias }) {
  const [modo,setModo]=useState(materias.length?"salvo":"intro");
  const [prog,setProg]=useState(0); const [msgP,setMsgP]=useState("");
  const [nMat,setNMat]=useState(""); const [tmp,setTmp]=useState([]);
  const [exp,setExp]=useState(null);

  const EXT=[
    {name:"Matemática",icon:"math",color:C.acc,topicos:["Álgebra","Funções","Geometria","Estatística","Trigonometria"]},
    {name:"Português",icon:"book",color:C.blue,topicos:["Interpretação","Gramática","Figuras de linguagem","Redação"]},
    {name:"Química",icon:"flask",color:C.green,topicos:["Orgânica","Equilíbrio","Eletroquímica","Tabela periódica"]},
    {name:"Física",icon:"bolt",color:C.amber,topicos:["Mecânica","Termodinâmica","Eletromagnetismo","Óptica"]},
    {name:"História",icon:"world",color:C.purple,topicos:["Brasil República","Geopolítica","Urbanização","Meio ambiente"]},
  ];

  function upload(){
    setModo("proc"); setProg(0);
    const ms=["Lendo...","Identificando seções...","Extraindo matérias...","Mapeando assuntos...","Finalizando..."];
    let p=0;
    const iv=setInterval(()=>{
      p+=18+Math.random()*7; if(p>100)p=100;
      setProg(Math.round(p)); setMsgP(ms[Math.min(Math.floor(p/22),ms.length-1)]);
      if(p>=100){clearInterval(iv);setTimeout(()=>setModo("rev"),500);}
    },400);
  }

  if(modo==="salvo") return (
    <div>
      <div style={{...s.card({background:C.greenDim,border:`0.5px solid ${C.green}30`,textAlign:"center",padding:"20px"})}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>
          <div style={{width:46,height:46,borderRadius:"50%",background:C.greenDim,border:`0.5px solid ${C.green}`,display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="check" sz={22} color={C.green}/></div>
        </div>
        <div style={{fontSize:15,fontWeight:500,color:C.txt1,marginBottom:4}}>Edital importado!</div>
        <div style={{fontSize:12,color:C.txt2,marginBottom:14}}>{materias.length} matérias · {materias.reduce((a,m)=>a+(m.topicos?.length||0),0)} assuntos</div>
        <button style={s.btn("outline")} onClick={()=>setModo("intro")}>+ Importar novo</button>
      </div>
      <div style={s.lbl}>Matérias cadastradas</div>
      {materias.map((m,i)=>(
        <div key={i} style={s.card()}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:m.topicos?.length?8:0}}>
            <div style={s.row}><div style={s.ib(m.color,m.color+"18",28)}><Ic n={m.icon} sz={13} color={m.color}/></div><span style={{fontSize:13,fontWeight:500,color:C.txt1}}>{m.name}</span></div>
            <span style={s.bdg(m.color,m.color+"18")}>{m.topicos?.length||0} assuntos</span>
          </div>
          {m.topicos?.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:4}}>{m.topicos.map((t,j)=><span key={j} style={{fontSize:10,padding:"2px 7px",borderRadius:999,background:C.bg3,color:C.txt3}}>{t}</span>)}</div>}
        </div>
      ))}
    </div>
  );

  if(modo==="intro") return (
    <div>
      <div style={{fontSize:17,fontWeight:500,color:C.txt1,marginBottom:5}}>Edital & Matérias</div>
      <div style={{fontSize:13,color:C.txt2,marginBottom:16,lineHeight:1.6}}>Importe seu edital para extrair matérias automaticamente com IA, ou cadastre manualmente.</div>
      <div style={s.g2}>
        <div style={{...s.card({cursor:"pointer",textAlign:"center",padding:"22px 14px",border:`0.5px solid ${C.acc}25`}),}} onClick={()=>setModo("upload")}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:9}}><Ic n="upload" sz={30} color={C.acc}/></div>
          <div style={{fontSize:13,fontWeight:500,color:C.txt1,marginBottom:3}}>Enviar edital</div>
          <div style={{fontSize:11,color:C.txt3}}>IA extrai automaticamente</div>
          <div style={{fontSize:10,color:C.txt3,marginTop:5}}>PDF · DOCX · TXT</div>
        </div>
        <div style={{...s.card({cursor:"pointer",textAlign:"center",padding:"22px 14px"})}} onClick={()=>setModo("manual")}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:9}}><Ic n="plus" sz={30} color={C.blue}/></div>
          <div style={{fontSize:13,fontWeight:500,color:C.txt1,marginBottom:3}}>Cadastro manual</div>
          <div style={{fontSize:11,color:C.txt3}}>Adicione matéria por matéria</div>
          <div style={{fontSize:10,color:C.txt3,marginTop:5}}>Controle total</div>
        </div>
      </div>
    </div>
  );

  if(modo==="upload") return (
    <div>
      <div onClick={upload} style={{border:`1.5px dashed ${C.border2}`,borderRadius:13,padding:"34px 18px",textAlign:"center",cursor:"pointer",marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:9}}><Ic n="upload" sz={34} color={C.acc}/></div>
        <div style={{fontSize:14,fontWeight:500,color:C.txt1,marginBottom:3}}>Clique para simular envio do edital</div>
        <div style={{fontSize:11,color:C.txt3}}>PDF, DOCX, TXT · até 20MB</div>
      </div>
      <button style={{...s.btn("outline"),width:"100%"}} onClick={()=>setModo("intro")}>Voltar</button>
    </div>
  );

  if(modo==="proc") return (
    <div style={{textAlign:"center",padding:"46px 0"}}>
      <div style={{display:"flex",justifyContent:"center",marginBottom:14}}><Ic n="sparkles" sz={40} color={C.acc}/></div>
      <div style={{fontSize:14,fontWeight:500,color:C.txt1,marginBottom:5}}>Analisando com IA...</div>
      <div style={{fontSize:12,color:C.txt3,marginBottom:18}}>{msgP}</div>
      <div style={{maxWidth:260,margin:"0 auto"}}>
        <div style={{...s.pb,height:7}}><div style={{height:"100%",borderRadius:999,background:C.acc,width:`${prog}%`,transition:"width .4s"}}/></div>
        <div style={{fontSize:11,color:C.txt3,marginTop:5}}>{prog}%</div>
      </div>
    </div>
  );

  if(modo==="rev") return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:13}}>
        <div><div style={{fontSize:14,fontWeight:500,color:C.txt1}}>Matérias extraídas</div><div style={{fontSize:11,color:C.txt3}}>Revise antes de salvar</div></div>
        <div style={{display:"flex",gap:6}}>
          <span style={s.bdg(C.green,C.greenDim)}>{EXT.length} matérias</span>
          <span style={s.bdg(C.acc,C.accDim2)}>{EXT.reduce((a,m)=>a+m.topicos.length,0)} assuntos</span>
        </div>
      </div>
      {EXT.map((m,i)=>(
        <div key={i} style={s.card()}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={s.row}><div style={s.ib(m.color,m.color+"18",26)}><Ic n={m.icon} sz={12} color={m.color}/></div><span style={{fontSize:13,fontWeight:500,color:C.txt1}}>{m.name}</span><span style={s.bdg(m.color,m.color+"15")}>{m.topicos.length}</span></div>
            <button onClick={()=>setExp(exp===i?null:i)} style={{background:"none",border:"none",cursor:"pointer",color:C.txt3,fontSize:17}}>{exp===i?"−":"+"}</button>
          </div>
          {exp===i&&<div style={{marginTop:9,paddingTop:9,borderTop:`0.5px solid ${C.border}`}}>{m.topicos.map((t,j)=><div key={j} style={{fontSize:12,color:C.txt2,padding:"3px 0",borderBottom:`0.5px solid ${C.border}`}}>• {t}</div>)}</div>}
        </div>
      ))}
      <div style={{display:"flex",gap:8,marginTop:4}}>
        <button style={{...s.btn("outline"),flex:1}} onClick={()=>setModo("upload")}>Reimportar</button>
        <button style={{...s.btn(),flex:2}} onClick={()=>{setMaterias(EXT);setModo("salvo");}}><span style={s.row}><Ic n="check" sz={13} color="#0A0A0A"/>Confirmar e salvar</span></button>
      </div>
    </div>
  );

  if(modo==="manual") return (
    <div>
      <div style={{fontSize:14,fontWeight:500,color:C.txt1,marginBottom:12}}>Cadastro manual</div>
      <div style={s.card()}>
        <div style={{fontSize:11,color:C.txt3,marginBottom:5}}>Nome da matéria</div>
        <div style={s.row}>
          <input value={nMat} onChange={e=>setNMat(e.target.value)} onKeyDown={e=>e.key==="Enter"&&nMat.trim()&&(setTmp(p=>[...p,{name:nMat,icon:"book",color:C.acc,topicos:[]}]),setNMat(""))} placeholder="Ex: Direito Constitucional..." style={{...s.inp,flex:1}}/>
          <button style={s.btn("sm")} onClick={()=>nMat.trim()&&(setTmp(p=>[...p,{name:nMat,icon:"book",color:C.acc,topicos:[]}]),setNMat(""))}>Add</button>
        </div>
      </div>
      {tmp.map((m,i)=><div key={i} style={s.c2()}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:13,fontWeight:500,color:C.txt1}}>{m.name}</span><button onClick={()=>setTmp(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:C.txt3,cursor:"pointer",fontSize:17}}>×</button></div></div>)}
      {tmp.length>0&&<button style={{...s.btn(),width:"100%",marginTop:6}} onClick={()=>{setMaterias(tmp);setModo("salvo");}}>Salvar {tmp.length} matéria{tmp.length>1?"s":""}</button>}
      <button style={{...s.btn("outline"),width:"100%",marginTop:6}} onClick={()=>setModo("intro")}>Voltar</button>
    </div>
  );
  return null;
}
function Diagnostico({ diag, setDiag }) {
  const [fase,setFase]=useState(diag?"res":"intro");
  const [mi,setMi]=useState(0); const [qi,setQi]=useState(0);
  const [sel,setSel]=useState(null); const [ans,setAns]=useState({});
  const [aiTxt,setAiTxt]=useState(diag?.ai||"");

  const grupos=MATS.map(m=>({mat:m,qs:BANCO.filter(q=>q.mat===m.name).slice(0,2)})).filter(g=>g.qs.length);
  const totalQ=grupos.reduce((a,g)=>a+g.qs.length,0);
  const doneQ=grupos.slice(0,mi).reduce((a,g)=>a+g.qs.length,0)+qi;
  const cg=grupos[mi]; const cq=cg?.qs[qi];

  function resp(i){
    if(sel!==null)return; setSel(i);
    setTimeout(()=>{
      const k=`${mi}_${qi}`;
      const na={...ans,[k]:i===cq.c};
      setAns(na);setSel(null);
      if(qi+1<cg.qs.length)setQi(qi+1);
      else if(mi+1<grupos.length){setMi(mi+1);setQi(0);}
      else fin(na);
    },700);
  }

  async function fin(a){
    setFase("load");
    const scores=grupos.map(g=>({name:g.mat.name,icon:g.mat.icon,color:g.mat.color,pct:Math.round(g.qs.filter((_,i)=>a[`${grupos.indexOf(g)}_${i}`]).length/g.qs.length*100)}));
    const txt=await ai([{role:"user",content:`Diagnóstico ENEM:\n${scores.map(s=>`${s.name}: ${s.pct}%`).join("\n")}\nAnálise em 3 frases: pontos fortes, atenção urgente, dica prática. Direto e motivador.`}]);
    const res={scores,ai:txt,ts:new Date().toISOString()};
    setDiag(res);setAiTxt(txt);setFase("res");
  }

  if(fase==="intro") return (
    <div>
      <div style={{fontSize:17,fontWeight:500,color:C.txt1,marginBottom:5}}>Diagnóstico inicial</div>
      <div style={{fontSize:13,color:C.txt2,marginBottom:16,lineHeight:1.6}}>Responda {totalQ} questões rápidas para mapear pontos fortes e calibrar seu plano.</div>
      <div style={s.g2}>{MATS.map(m=><div key={m.id} style={s.c2()}><div style={s.row}><div style={s.ib(m.color,m.color+"20",26)}><Ic n={m.icon} sz={12} color={m.color}/></div><div><div style={{fontSize:12,fontWeight:500,color:C.txt1}}>{m.name}</div><div style={{fontSize:10,color:C.txt3}}>2 questões</div></div></div></div>)}</div>
      <button style={{...s.btn(),width:"100%"}} onClick={()=>setFase("quiz")}><span style={s.row}>Iniciar <Ic n="arrow" sz={13} color="#0A0A0A"/></span></button>
    </div>
  );

  if(fase==="quiz"&&cq) return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <div style={s.row}><div style={s.ib(cg.mat.color,cg.mat.color+"20",24)}><Ic n={cg.mat.icon} sz={11} color={cg.mat.color}/></div><span style={{fontSize:12,fontWeight:500,color:C.txt1}}>{cg.mat.name}</span></div>
        <span style={s.bdg(C.acc,C.accDim2)}>{doneQ+1}/{totalQ}</span>
      </div>
      <div style={s.pb}><div style={{height:"100%",borderRadius:999,background:C.acc,width:`${(doneQ/totalQ)*100}%`,transition:"width .3s"}}/></div>
      <div style={{...s.card({background:C.bg2,border:`0.5px solid ${C.border2}`,marginTop:14,marginBottom:11})}}>
        <div style={{fontSize:14,fontWeight:500,color:C.txt1,lineHeight:1.5}}>{cq.q}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {cq.opts.map((o,i)=>{
          let bg=C.bg2,border=`0.5px solid ${C.border2}`,color=C.txt1,fw=400;
          if(sel!==null){if(i===cq.c){bg=C.greenDim;border=`0.5px solid ${C.green}`;color=C.green;fw=500;}else if(i===sel){bg=C.redDim;border=`0.5px solid ${C.red}`;color=C.red;fw=500;}}
          return <div key={i} onClick={()=>resp(i)} style={{padding:"10px 14px",borderRadius:9,border,background:bg,color,fontSize:13,cursor:sel===null?"pointer":"default",transition:"all .2s",fontWeight:fw}}><span style={{opacity:.5,marginRight:7}}>{["A","B","C","D"][i]})</span>{o}</div>;
        })}
      </div>
    </div>
  );

  if(fase==="load") return <div style={{textAlign:"center",padding:"44px 0"}}><div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Ic n="sparkles" sz={38} color={C.acc}/></div><div style={{fontSize:14,fontWeight:500,color:C.txt1,marginBottom:4}}>IA analisando...</div><div style={{fontSize:12,color:C.txt3}}>Mapeando pontos fortes e críticos</div></div>;

  if(fase==="res"&&diag){
    const forte=diag.scores.filter(s=>s.pct>=70), fraco=diag.scores.filter(s=>s.pct<70);
    return (
      <div>
        <div style={{fontSize:16,fontWeight:500,color:C.txt1,marginBottom:4}}>Mapa de performance</div>
        <div style={{fontSize:11,color:C.txt3,marginBottom:13}}>{new Date(diag.ts).toLocaleDateString("pt-BR")}</div>
        {aiTxt&&<div style={{...s.card({background:C.accDim,border:`0.5px solid ${C.acc}25`,marginBottom:13})}}>
          <div style={s.row}><Ic n="sparkles" sz={15} color={C.acc} style={{flexShrink:0}}/><div style={{fontSize:13,color:C.txt1,lineHeight:1.6}}>{aiTxt}</div></div>
        </div>}
        <div style={s.card()}>
          {diag.scores.map((sc,i)=>{
            const c=sc.pct>=70?C.green:sc.pct>=50?C.amber:C.red;
            return <div key={i} style={{display:"flex",alignItems:"center",gap:9,marginBottom:i<diag.scores.length-1?10:0}}>
              <div style={s.ib(sc.color,sc.color+"18",26)}><Ic n={sc.icon} sz={11} color={sc.color}/></div>
              <div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,color:C.txt1,fontWeight:500}}>{sc.name}</span><span style={{fontSize:11,color:c,fontWeight:500}}>{sc.pct}%</span></div><div style={s.pb}><div style={{height:"100%",borderRadius:999,background:c,width:`${sc.pct}%`}}/></div></div>
            </div>;
          })}
        </div>
        <div style={s.g2}>
          <div style={s.card({border:`0.5px solid ${C.green}25`})}><div style={s.lbl}>Pontos fortes</div>{forte.length?forte.map(f=><div key={f.name} style={{...s.row,marginBottom:4}}><Ic n="check" sz={11} color={C.green}/><span style={{fontSize:12,color:C.green}}>{f.name}</span></div>):<div style={{fontSize:11,color:C.txt3}}>Nenhuma acima de 70%</div>}</div>
          <div style={s.card({border:`0.5px solid ${C.red}25`})}><div style={s.lbl}>Atenção urgente</div>{fraco.length?fraco.map(f=><div key={f.name} style={{...s.row,marginBottom:4}}><Ic n="alert" sz={11} color={C.red}/><span style={{fontSize:12,color:C.red}}>{f.name}</span></div>):<div style={{fontSize:11,color:C.txt3}}>Todas ok</div>}</div>
        </div>
        <button style={{...s.btn("outline"),width:"100%"}} onClick={()=>{setDiag(null);setFase("intro");setMi(0);setQi(0);setAns({});setAiTxt("");}}>
          <span style={s.row}><Ic n="refresh" sz={12} color={C.txt2}/>Refazer</span>
        </button>
      </div>
    );
  }
  return null;
}

function TutorIA({ diag, metodos, concurso, erros }) {
  const [msgs,setMsgs]=useState([{role:"assistant",content:"Olá! Sou seu tutor IA. Sobre qual matéria ou dúvida posso te ajudar hoje?"}]);
  const [inp,setInp]=useState(""); const [load,setLoad]=useState(false); const [foco,setFoco]=useState(null);
  const bot=useRef(null);
  const MD={
    spaced:"Ao final de cada explicação, sugira ao aluno quando rever o conteúdo (ex: revisão em 3 dias, 7 dias).",
    active:"Use recuperação ativa: antes de explicar, peça que o aluno tente responder primeiro. Depois complemente.",
    interleaving:"Conecte o conteúdo atual com outras matérias do edital para mostrar relações entre os temas.",
    feynman:"Após explicar, peça que o aluno explique de volta com suas próprias palavras. Identifique e corrija lacunas.",
    pomodoro:"Lembre o aluno de fazer pausa de 5 min a cada 25 min de estudo.",
  };
  const mAtivos=(metodos||[]).map(id=>MD[id]).filter(Boolean);
  const erroFreq=erros&&erros.length>0?[...new Set(erros.slice(-5).map(e=>e.mat))].join(", "):"";
  const _d=diag?"Diag: "+diag.scores.map(s=>s.name+": "+s.pct+"%").join(", ")+". <70%=prioridade. ":"";
  const _e=erroFreq?"Erros recentes: "+erroFreq+". Reforce. ":"";
  const _f=foco?"Foco: "+foco+". ":"";
  const _m=mAtivos.length?"Técnicas ativas: "+mAtivos.join("|")+". ":"";
  const sys="Tutor especialista em "+(concurso||"ENEM")+". "+_d+_e+_f+_m+"Seja didático, exemplos de provas reais. Português.";

  async function send(){
    if(!inp.trim()||load)return;
    const um={role:"user",content:inp};
    const nm=[...msgs,um]; setMsgs(nm);setInp("");setLoad(true);
    const r=await ai(nm,sys);
    setMsgs(p=>[...p,{role:"assistant",content:r}]);setLoad(false);
    setTimeout(()=>bot.current?.scrollIntoView({behavior:"smooth"}),100);
  }

  const quick=["Explique Química Orgânica","Como resolver funções?","Dicas interpretação de texto","O que mais cai de Física?"];

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{marginBottom:9}}>
        <div style={s.row}>
          <div style={s.ib(C.blue,C.blueDim,28)}><Ic n="chat" sz={13} color={C.blue}/></div>
          <div><div style={{fontSize:13,fontWeight:500,color:C.txt1}}>Tutor IA</div><div style={{fontSize:10,color:C.txt3}}>Contextualizado no edital e histórico</div></div>
          {diag&&<span style={{...s.bdg(C.green,C.greenDim),marginLeft:"auto"}}>Diag. integrado</span>}
          {metodos?.length>0&&<span style={s.bdg(C.acc,C.accDim2)}>{metodos.length} técnica{metodos.length>1?"s":""} ativa{metodos.length>1?"s":""}</span>}
        </div>
      </div>
      <div style={{display:"flex",gap:5,marginBottom:9,flexWrap:"wrap"}}>
        {MATS.map(m=><div key={m.id} onClick={()=>setFoco(foco===m.name?null:m.name)} style={{fontSize:10,padding:"3px 8px",borderRadius:999,cursor:"pointer",border:`0.5px solid ${foco===m.name?m.color:C.border2}`,background:foco===m.name?m.color+"20":"transparent",color:foco===m.name?m.color:C.txt3}}>{m.name}</div>)}
      </div>
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:8,marginBottom:9,paddingRight:2}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
            {m.role==="assistant"&&<div style={{width:22,height:22,borderRadius:"50%",background:C.accDim2,border:`0.5px solid ${C.acc}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginRight:6,marginTop:2}}><Ic n="bolt" sz={10} color={C.acc}/></div>}
            <div style={{maxWidth:"74%",padding:"8px 12px",borderRadius:m.role==="user"?"12px 12px 3px 12px":"12px 12px 12px 3px",background:m.role==="user"?C.acc:C.bg2,border:m.role==="user"?"none":`0.5px solid ${C.border2}`,fontSize:12,color:m.role==="user"?"#0A0A0A":C.txt1,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{m.content}</div>
          </div>
        ))}
        {load&&<div style={{display:"flex",gap:6}}><div style={{width:22,height:22,borderRadius:"50%",background:C.accDim2,border:`0.5px solid ${C.acc}`,display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="bolt" sz={10} color={C.acc}/></div><div style={{padding:"8px 12px",borderRadius:"12px 12px 12px 3px",background:C.bg2,border:`0.5px solid ${C.border2}`,display:"flex",gap:3,alignItems:"center"}}>{[0,1,2].map(i=><div key={i} style={{width:4,height:4,borderRadius:"50%",background:C.acc,animation:`bo .9s ${i*.2}s infinite`}}/>)}</div></div>}
        <div ref={bot}/>
      </div>
      {msgs.length===1&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:8}}>{quick.map((p,i)=><div key={i} onClick={()=>setInp(p)} style={{fontSize:11,padding:"7px 9px",borderRadius:7,border:`0.5px solid ${C.border2}`,background:C.bg2,color:C.txt2,cursor:"pointer"}}>{p}</div>)}</div>}
      <div style={{display:"flex",gap:7}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Pergunte qualquer coisa..." style={{...s.inp,flex:1}}/>
        <button onClick={send} disabled={load||!inp.trim()} style={{...s.btn(),padding:"8px 13px",opacity:load||!inp.trim()?.5:1}}><Ic n="send" sz={13} color="#0A0A0A"/></button>
      </div>
      <style>{`@keyframes bo{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`}</style>
    </div>
  );
}

function PlanoDinamico({ diag, plano, setPlano, metodos, concurso }) {
  const [load,setLoad]=useState(false); const [sel,setSel]=useState(null);
  const [rmsg,setRmsg]=useState(""); const [rload,setRload]=useState(false);
  const dias=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];
  const pC={critica:C.red,alta:C.acc,media:C.amber,baixa:C.txt3};
  const tC={conteudo:C.blue,revisao:C.purple,questoes:C.green,simulado:C.acc,flashcards:C.amber};

  const PLANO_METODO={
    spaced:"inclua sessões de flashcard/revisão espaçada no plano, marcadas como tipo 'revisao'",
    active:"após cada sessão de conteúdo novo, adicione uma mini-sessão de recuperação ativa (teste sem consulta)",
    interleaving:"nunca coloque a mesma matéria em dias consecutivos — alterne sempre",
    feynman:"inclua pelo menos 1 sessão por semana do tipo 'feynman' onde o aluno explica o conteúdo",
    pomodoro:"limite cada sessão a no máximo 1h30 (3 pomodoros), com pausa indicada",
  };
  const instrMetodos=(metodos||[]).map(id=>PLANO_METODO[id]).filter(Boolean).join("; ");

  async function gerar(){
    setLoad(true);
    const sc=diag?diag.scores.map(s=>`${s.name}: ${s.pct}%`).join(", "):"sem diagnóstico";
    const alvo=concurso||"ENEM";
    const instrExtra=instrMetodos?`Técnicas ativas a aplicar no plano: ${instrMetodos}.`:"";
    const r=await ai([{role:"user",content:`Plano semanal para ${alvo}, 47 dias. Diagnóstico: ${sc}. ${instrExtra} Retorne APENAS JSON:\n{"semanas":[{"numero":1,"foco":"texto","sessoes":[{"dia":"Seg","materia":"Química","duracao":"1h30","prioridade":"critica","tipo":"conteudo"}]}],"recomendacoes":["dica1","dica2"]}\n2 semanas, 5 sessões cada. Só JSON.`}]);
    try{const p=JSON.parse(r.replace(/```json|```/g,"").trim());setPlano({...p,ts:new Date().toISOString()});}
    catch{setPlano({semanas:[
      {numero:1,foco:"Matérias críticas",sessoes:[{dia:"Seg",materia:"Química",duracao:"1h30",prioridade:"critica",tipo:"conteudo"},{dia:"Ter",materia:"Física",duracao:"1h",prioridade:"critica",tipo:"conteudo"},{dia:"Qua",materia:"Matemática",duracao:"1h30",prioridade:"alta",tipo:"revisao"},{dia:"Qui",materia:"Português",duracao:"1h",prioridade:"media",tipo:"conteudo"},{dia:"Sex",materia:"História",duracao:"1h",prioridade:"alta",tipo:"revisao"}]},
      {numero:2,foco:"Reforço",sessoes:[{dia:"Seg",materia:"Química",duracao:"1h",prioridade:"critica",tipo:"questoes"},{dia:"Ter",materia:"Física",duracao:"1h30",prioridade:"critica",tipo:"conteudo"},{dia:"Qua",materia:"Simulado",duracao:"2h",prioridade:"alta",tipo:"simulado"},{dia:"Qui",materia:"Revisão",duracao:"1h",prioridade:"media",tipo:"revisao"},{dia:"Sex",materia:"Flashcards",duracao:"30min",prioridade:"media",tipo:"flashcards"}]},
    ],recomendacoes:["Priorize Química e Física","Simulados a partir da semana 2","Fins de semana para revisão leve"],ts:new Date().toISOString()});}
    setLoad(false);
  }

  async function replan(m){setRload(true);const r=await ai([{role:"user",content:`Aluno replanejou. Motivo: ${m}. Confirme em 2 frases.`}]);setRmsg(r);setRload(false);}

  if(!plano) return (
    <div>
      <div style={{fontSize:17,fontWeight:500,color:C.txt1,marginBottom:5}}>Plano dinâmico</div>
      <div style={{fontSize:13,color:C.txt2,marginBottom:14,lineHeight:1.6}}>{diag?"Diagnóstico detectado — plano calibrado com seu desempenho.":"Faça o diagnóstico primeiro para plano mais preciso."}</div>
      {diag&&<div style={{...s.c2({background:C.greenDim,border:`0.5px solid ${C.green}25`,marginBottom:12})}}>
        <div style={s.row}><Ic n="check" sz={14} color={C.green}/><div style={{fontSize:12,color:C.txt1}}>Matérias críticas receberão mais tempo no plano.</div></div>
      </div>}
      <button style={{...s.btn(),width:"100%",opacity:load?.7:1}} onClick={gerar} disabled={load}>
        {load?"Gerando...":<span style={s.row}><Ic n="sparkles" sz={13} color="#0A0A0A"/>Gerar plano personalizado</span>}
      </button>
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:13}}>
        <div><div style={{fontSize:14,fontWeight:500,color:C.txt1}}>Plano ativo — ENEM 2025</div><div style={{fontSize:10,color:C.txt3}}>Gerado em {new Date(plano.ts).toLocaleDateString("pt-BR")} · Dinâmico</div></div>
        <span style={s.bdg(C.green,C.greenDim)}>Ativo</span>
      </div>
      {metodos?.length>0&&<div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:11}}>{(metodos||[]).map(id=>{const L={spaced:"Repetição espaçada",active:"Recuperação ativa",interleaving:"Intercalação",feynman:"Feynman",pomodoro:"Pomodoro"};return <span key={id} style={s.bdg(C.acc,C.accDim2)}>{L[id]||id}</span>;})} </div>}
      {rmsg&&<div style={{...s.c2({background:C.blueDim,border:`0.5px solid ${C.blue}25`,marginBottom:11})}}>
        <div style={s.row}><Ic n="refresh" sz={13} color={C.blue} style={{flexShrink:0}}/><div style={{fontSize:12,color:C.txt1,lineHeight:1.5}}>{rmsg}</div></div>
      </div>}
      {plano.recomendacoes?.length>0&&<div style={s.card({marginBottom:13})}>
        <div style={s.lbl}>Recomendações da IA</div>
        {plano.recomendacoes.map((r,i)=><div key={i} style={{...s.row,marginBottom:i<plano.recomendacoes.length-1?5:0}}><Ic n="bulb" sz={12} color={C.acc} style={{flexShrink:0}}/><span style={{fontSize:12,color:C.txt2}}>{r}</span></div>)}
      </div>}
      {plano.semanas?.map((sem,si)=>(
        <div key={si} style={{marginBottom:13}}>
          <div style={{...s.row,marginBottom:8}}><span style={{fontSize:12,fontWeight:500,color:C.txt1}}>Semana {sem.numero}</span><span style={{...s.bdg(C.acc,C.accDim2),fontSize:9}}>{sem.foco}</span></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
            {dias.map(dia=>{
              const ses=sem.sessoes?.find(s=>s.dia===dia);
              const isSel=sel?.dia===dia&&sel?.si===si;
              return <div key={dia} onClick={()=>ses&&setSel(isSel?null:{...ses,si})} style={{borderRadius:6,border:`0.5px solid ${ses?pC[ses.prioridade]+"35":C.border}`,background:ses?pC[ses.prioridade]+"10":C.bg2,padding:"6px 2px",textAlign:"center",cursor:ses?"pointer":"default",minHeight:54,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2}}>
                <div style={{fontSize:8,color:C.txt3}}>{dia}</div>
                {ses?<><div style={{fontSize:8,fontWeight:500,color:pC[ses.prioridade],lineHeight:1.2,textAlign:"center"}}>{ses.materia}</div><div style={{fontSize:8,color:C.txt3}}>{ses.duracao}</div></>:<div style={{fontSize:8,color:C.txt3}}>—</div>}
              </div>;
            })}
          </div>
          {sel?.si===si&&<div style={{...s.c2({background:tC[sel.tipo]+"10",border:`0.5px solid ${tC[sel.tipo]}28`,marginTop:7,marginBottom:0})}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:12,fontWeight:500,color:C.txt1}}>{sel.materia}</div><div style={{fontSize:10,color:C.txt2,marginTop:1}}>{sel.dia} · {sel.duracao} · {sel.tipo}</div></div><span style={s.bdg(pC[sel.prioridade],pC[sel.prioridade]+"18")}>Prioridade {sel.prioridade}</span></div>
          </div>}
        </div>
      ))}
      <div style={s.div}/>
      <div style={s.lbl}>Replanejamento automático</div>
      {["Não estudei ontem","Adiantei Matemática","Quero intensificar"].map((m,i)=>(
        <div key={i} onClick={()=>!rload&&replan(m)} style={{...s.c2({cursor:"pointer",display:"flex",alignItems:"center",gap:8})}}>
          <Ic n="refresh" sz={13} color={C.blue} style={{flexShrink:0}}/><span style={{fontSize:12,color:C.txt2}}>{m}</span>
        </div>
      ))}
      {rload&&<div style={{fontSize:11,color:C.txt3,textAlign:"center",marginTop:7}}>Recalculando...</div>}
    </div>
  );
}
function Flashcards({ fcs, setFcs, materias }) {
  const [modo,setModo]=useState("lista"); const [aba,setAba]=useState("cards");
  const [idx,setIdx]=useState(0); const [rev,setRev]=useState(false);
  const [nq,setNq]=useState(""); const [na,setNa]=useState(""); const [nm,setNm]=useState("Matemática");
  const [gerando,setGerando]=useState(false); const [modal,setModal]=useState(false);

  const DEMO=[
    {id:1,mat:"Química",q:"Fórmula da glicose?",r:"C₆H₁₂O₆ — hexose com 6 carbonos.",int:4,tipo:"auto"},
    {id:2,mat:"Matemática",q:"Fórmula de Bhaskara",r:"x=(-b±√Δ)/2a, onde Δ=b²-4ac",int:7,tipo:"auto"},
    {id:3,mat:"História",q:"Proclamação da República:",r:"15/11/1889 — Marechal Deodoro da Fonseca.",int:1,tipo:"manual"},
    {id:4,mat:"Química",q:"O que é um álcool primário?",r:"Carbono com OH ligado a apenas 1 outro carbono.",int:3,tipo:"auto"},
    {id:5,mat:"Física",q:"Unidade de energia no SI:",r:"Joule (J) — equivale a 1 N·m",int:1,tipo:"auto"},
    {id:6,mat:"Português",q:"O que é sujeito indeterminado?",r:"Quando não é possível identificar o agente da ação, ex: 'Precisa-se de ajuda.'",int:10,tipo:"manual"},
  ];
  const cards=fcs.length?fcs:DEMO; const card=cards[idx];

  // Agenda de revisões — distribui cards pelos próximos 7 dias baseado no intervalo
  const AGENDA=[
    {dia:"Hoje",label:"Hoje",cards:cards.filter(c=>c.int<=1),urgente:true},
    {dia:"Amanhã",label:"Amanhã",cards:cards.filter(c=>c.int===2),urgente:false},
    {dia:"Em 3 dias",label:"Qui",cards:cards.filter(c=>c.int===3||c.int===4),urgente:false},
    {dia:"Em 7 dias",label:"Dom",cards:cards.filter(c=>c.int>=7&&c.int<=8),urgente:false},
    {dia:"Em 10 dias",label:"+10d",cards:cards.filter(c=>c.int>=10),urgente:false},
  ].filter(d=>d.cards.length>0);

  const totalHoje=cards.filter(c=>c.int<=1).length;
  const tempoEstimado=Math.round(totalHoje*0.8);

  async function gerarIA(){
    setGerando(true);
    const r=await ai([{role:"user",content:`Crie 3 flashcards de ${nm} para o ENEM. Retorne APENAS JSON:\n[{"q":"pergunta","r":"resposta completa"}]\nSó JSON.`}]);
    try{const p=JSON.parse(r.replace(/```json|```/g,"").trim());setFcs(prev=>[...(prev.length?prev:DEMO),...p.map((c,i)=>({id:Date.now()+i,mat:nm,q:c.q,r:c.r,int:1,tipo:"auto"}))]);}catch{}
    setGerando(false);setModal(false);
  }

  function avaliar(nv){
    const ni=nv==="dif"?1:nv==="med"?4:10;
    setFcs(prev=>{const b=prev.length?prev:DEMO;return b.map((c,i)=>i===idx?{...c,int:ni}:c);});
    if(idx+1<cards.length){setIdx(idx+1);setRev(false);}else{setIdx(0);setModo("lista");}
  }

  function salvar(){
    if(!nq.trim()||!na.trim())return;
    setFcs(prev=>[...(prev.length?prev:DEMO),{id:Date.now(),mat:nm,q:nq,r:na,int:1,tipo:"manual"}]);
    setNq("");setNa("");setModo("lista");
  }

  const mList=(materias.length?materias:MATS).map(m=>m.name||m);

  if(modo==="rev") return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
        <span style={{fontSize:13,fontWeight:500,color:C.txt1}}>{card.mat}</span>
        <span style={s.bdg(C.acc,C.accDim2)}>{idx+1}/{cards.length}</span>
      </div>
      <div style={s.pb}><div style={{height:"100%",borderRadius:999,background:C.acc,width:`${(idx/cards.length)*100}%`,transition:"width .3s"}}/></div>
      <div style={{...s.card({background:C.bg2,border:`0.5px solid ${C.border2}`,marginTop:14,marginBottom:10,textAlign:"center",padding:"26px 15px",minHeight:120,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:8})}}>
        <div style={{fontSize:14,fontWeight:500,color:C.txt1,lineHeight:1.5}}>{card.q}</div>
        {!rev&&<div style={{fontSize:10,color:C.txt3}}>toque para revelar</div>}
        {rev&&<div style={{background:C.greenDim,borderRadius:8,padding:"9px 13px",width:"100%",boxSizing:"border-box"}}><div style={{fontSize:12,color:C.green,lineHeight:1.6}}>{card.r}</div></div>}
      </div>
      {!rev
        ?<button style={{...s.btn("ghost"),width:"100%"}} onClick={()=>setRev(true)}>Ver resposta</button>
        :<div>
          <div style={{fontSize:10,color:C.txt3,textAlign:"center",marginBottom:7}}>Como foi para você?</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7}}>
            {[{k:"dif",l:"Difícil",s:"+1d",bg:C.redDim,c:C.red},{k:"med",l:"Médio",s:"+4d",bg:C.amberDim,c:C.amber},{k:"fac",l:"Fácil",s:"+10d",bg:C.greenDim,c:C.green}].map(b=>(
              <button key={b.k} onClick={()=>avaliar(b.k)} style={{padding:"10px 3px",borderRadius:9,border:"none",cursor:"pointer",background:b.bg,color:b.c,fontSize:12,fontWeight:500,fontFamily:"inherit"}}>{b.l}<br/><span style={{fontSize:10,fontWeight:400}}>{b.s}</span></button>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.txt3,marginTop:9}}>
            <span>{idx+1} de {cards.length} feitos</span>
            <span>~{Math.round((cards.length-idx)*0.8)} min restantes</span>
          </div>
        </div>
      }
      <button style={{...s.btn("outline"),width:"100%",marginTop:9,fontSize:11}} onClick={()=>setModo("lista")}>Encerrar sessão</button>
    </div>
  );

  if(modo==="criar") return (
    <div>
      <div style={{fontSize:14,fontWeight:500,color:C.txt1,marginBottom:12}}>Criar flashcard</div>
      <div style={{display:"flex",gap:5,marginBottom:10,flexWrap:"wrap"}}>{mList.map(m=><div key={m} onClick={()=>setNm(m)} style={{fontSize:10,padding:"3px 9px",borderRadius:999,cursor:"pointer",border:`0.5px solid ${nm===m?C.acc:C.border2}`,background:nm===m?C.accDim2:"transparent",color:nm===m?C.acc:C.txt2}}>{m}</div>)}</div>
      <div style={{marginBottom:8}}><div style={{fontSize:10,color:C.txt3,marginBottom:4}}>Pergunta</div><input value={nq} onChange={e=>setNq(e.target.value)} placeholder="Digite a pergunta..." style={s.inp}/></div>
      <div style={{marginBottom:12}}><div style={{fontSize:10,color:C.txt3,marginBottom:4}}>Resposta</div><textarea value={na} onChange={e=>setNa(e.target.value)} placeholder="Digite a resposta..." style={{...s.inp,height:75,resize:"vertical"}}/></div>
      <div style={{display:"flex",gap:7}}><button style={{...s.btn("outline"),flex:1}} onClick={()=>setModo("lista")}>Cancelar</button><button style={{...s.btn(),flex:2}} onClick={salvar} disabled={!nq.trim()||!na.trim()}>Salvar card</button></div>
    </div>
  );

  // TELA PRINCIPAL — abas Cards | Agenda de revisão
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
        <div><div style={{fontSize:14,fontWeight:500,color:C.txt1}}>Flashcards</div><div style={{fontSize:10,color:C.txt3}}>Repetição espaçada · {cards.length} cards</div></div>
        <div style={{display:"flex",gap:6}}>
          <button style={s.btn("sm")} onClick={()=>setModo("criar")}>+ Manual</button>
          <button style={{...s.btn("sm"),background:C.purple,color:"#0A0A0A"}} onClick={()=>setModal(true)}><span style={s.row}><Ic n="sparkles" sz={10} color="#0A0A0A"/>IA gerar</span></button>
        </div>
      </div>

      {/* Abas */}
      <div style={{display:"flex",gap:3,background:C.bg2,padding:3,borderRadius:9,marginBottom:13}}>
        {[["cards","Cards"],["agenda","Agenda de revisão"]].map(([k,l])=>(
          <div key={k} onClick={()=>setAba(k)} style={{flex:1,padding:"7px",textAlign:"center",borderRadius:7,fontSize:11,fontWeight:500,cursor:"pointer",background:aba===k?C.acc:"transparent",color:aba===k?"#0A0A0A":C.txt2,transition:"all .15s"}}>{l}</div>
        ))}
      </div>

      {aba==="cards" && (
        <div>
          {/* CTA revisão */}
          <div style={{...s.card({background:totalHoje>0?C.accDim:C.bg1,border:`0.5px solid ${totalHoje>0?C.acc+"30":C.border}`,cursor:"pointer",marginBottom:12})}} onClick={()=>{setIdx(0);setRev(false);setModo("rev");}}>
            <div style={s.row}>
              <div style={s.ib(C.acc,C.accDim2,34)}><Ic n="cards" sz={16} color={C.acc}/></div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500,color:C.txt1}}>Iniciar revisão de hoje</div>
                <div style={{fontSize:11,color:C.txt2}}>{totalHoje>0?`${totalHoje} cards vencendo · ~${tempoEstimado} min`:"Nenhum card para revisar hoje"}</div>
              </div>
              {totalHoje>0&&<span style={s.bdg(C.red,C.redDim)}>{totalHoje} hoje</span>}
            </div>
          </div>

          {/* Algoritmo SM-2 */}
          <div style={{...s.c2({background:C.bg2,marginBottom:12})}}>
            <div style={{fontSize:10,fontWeight:500,color:C.txt3,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>Algoritmo SM-2 — como funciona</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
              {[{l:"Difícil",s:"revisão amanhã",c:C.red,bg:C.redDim,i:"+1d"},{l:"Médio",s:"revisão em 4 dias",c:C.amber,bg:C.amberDim,i:"+4d"},{l:"Fácil",s:"revisão em 10 dias",c:C.green,bg:C.greenDim,i:"+10d"}].map((b,i)=>(
                <div key={i} style={{background:b.bg,borderRadius:8,padding:"8px 6px",textAlign:"center"}}>
                  <div style={{fontSize:13,fontWeight:500,color:b.c}}>{b.i}</div>
                  <div style={{fontSize:10,fontWeight:500,color:b.c,marginTop:2}}>{b.l}</div>
                  <div style={{fontSize:9,color:b.c,opacity:.7,marginTop:2,lineHeight:1.3}}>{b.s}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={s.lbl}>Todos os cards ({cards.length})</div>
          {cards.map((c,i)=>(
            <div key={c.id} style={s.c2()}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{fontSize:10,color:C.txt3}}>{c.mat}</span>
                <div style={{display:"flex",gap:5}}>
                  <span style={s.bdg(c.tipo==="auto"?C.purple:C.blue,c.tipo==="auto"?C.purpleDim:C.blueDim)}>{c.tipo==="auto"?"IA":"Manual"}</span>
                  <span style={s.bdg(c.int<=1?C.red:C.int<=4?C.amber:C.green,c.int<=1?C.redDim:c.int<=4?C.amberDim:C.greenDim)}>+{c.int}d</span>
                </div>
              </div>
              <div style={{fontSize:12,color:C.txt1}}>{c.q}</div>
            </div>
          ))}
        </div>
      )}

      {aba==="agenda" && (
        <div>
          {/* Métricas rápidas */}
          <div style={s.g3}>
            <div style={s.met}><div style={{fontSize:10,color:C.txt2,marginBottom:3}}>Para hoje</div><div style={{fontSize:19,fontWeight:500,color:totalHoje>0?C.red:C.green}}>{totalHoje}</div><div style={{fontSize:9,color:C.txt3}}>cards</div></div>
            <div style={s.met}><div style={{fontSize:10,color:C.txt2,marginBottom:3}}>Tempo est.</div><div style={{fontSize:19,fontWeight:500,color:C.acc}}>{tempoEstimado}m</div><div style={{fontSize:9,color:C.txt3}}>~50s/card</div></div>
            <div style={s.met}><div style={{fontSize:10,color:C.txt2,marginBottom:3}}>Melhor hora</div><div style={{fontSize:19,fontWeight:500,color:C.blue}}>20h</div><div style={{fontSize:9,color:C.txt3}}>histórico</div></div>
          </div>

          {/* Alerta urgente */}
          {totalHoje>0&&<div style={{...s.c2({background:C.redDim,border:`0.5px solid ${C.red}30`,marginBottom:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"})}} onClick={()=>{setIdx(0);setRev(false);setModo("rev");}}>
            <div style={s.row}>
              <Ic n="alert" sz={16} color={C.red} style={{flexShrink:0}}/>
              <div><div style={{fontSize:12,fontWeight:500,color:C.red}}>{totalHoje} cards vencem hoje!</div><div style={{fontSize:10,color:C.txt3}}>Revise agora para não perder o intervalo ideal</div></div>
            </div>
            <Ic n="arrow" sz={13} color={C.red}/>
          </div>}

          {/* Linha do tempo */}
          <div style={s.lbl}>Calendário de revisões — próximos dias</div>
          <div style={{position:"relative",paddingLeft:18}}>
            <div style={{position:"absolute",left:6,top:8,bottom:8,width:1.5,background:C.border2}}/>
            {AGENDA.map((d,i)=>(
              <div key={i} style={{position:"relative",marginBottom:11}}>
                <div style={{position:"absolute",left:-13,top:4,width:12,height:12,borderRadius:"50%",background:d.urgente?C.red:i===0?C.acc:C.bg3,border:`1.5px solid ${d.urgente?C.red:i===0?C.acc:C.border2}`}}/>
                <div style={s.card({padding:"11px 13px",marginBottom:0,background:d.urgente?C.redDim:C.bg1,border:`0.5px solid ${d.urgente?C.red+"30":C.border}`})}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <div>
                      <span style={{fontSize:12,fontWeight:500,color:d.urgente?C.red:C.txt1}}>{d.dia}</span>
                      <span style={{fontSize:10,color:C.txt3,marginLeft:6}}>{d.label}</span>
                    </div>
                    <div style={s.row}>
                      <span style={s.bdg(d.urgente?C.red:C.acc,d.urgente?C.redDim:C.accDim2)}>{d.cards.length} cards</span>
                      <span style={{fontSize:10,color:C.txt3}}>~{Math.round(d.cards.length*0.8)}min</span>
                    </div>
                  </div>
                  {/* Matérias do dia */}
                  <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                    {[...new Set(d.cards.map(c=>c.mat))].map(mat=>{
                      const m=MATS.find(x=>x.name===mat)||{color:C.txt3};
                      return <span key={mat} style={{fontSize:9,padding:"2px 7px",borderRadius:999,background:m.color+"18",color:m.color,fontWeight:500}}>{mat}</span>;
                    })}
                  </div>
                </div>
              </div>
            ))}
            {AGENDA.length===0&&<div style={s.card({textAlign:"center",padding:"24px",color:C.txt3,fontSize:12})}>Nenhuma revisão agendada. Faça a primeira sessão!</div>}
          </div>

          {/* Notificação */}
          <div style={{...s.c2({background:C.blueDim,border:`0.5px solid ${C.blue}28`,display:"flex",alignItems:"center",gap:9,marginTop:4})}}>
            <Ic n="bell" sz={16} color={C.blue} style={{flexShrink:0}}/>
            <div style={{fontSize:11,color:C.txt1}}>O app avisa quando cards estão prestes a vencer — <span style={{color:C.blue}}>notificações ativas</span></div>
          </div>
        </div>
      )}

      {modal&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999}}>
        <div style={{background:C.bg1,border:`0.5px solid ${C.border2}`,borderRadius:14,padding:"24px",width:300}}>
          <div style={{fontSize:14,fontWeight:500,color:C.txt1,marginBottom:9}}>Gerar com IA</div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:14}}>{mList.map(m=><div key={m} onClick={()=>setNm(m)} style={{fontSize:10,padding:"3px 8px",borderRadius:999,cursor:"pointer",border:`0.5px solid ${nm===m?C.acc:C.border2}`,background:nm===m?C.accDim2:"transparent",color:nm===m?C.acc:C.txt2}}>{m}</div>)}</div>
          <div style={{display:"flex",gap:7}}><button style={{...s.btn("outline"),flex:1}} onClick={()=>setModal(false)}>Cancelar</button><button style={{...s.btn(),flex:2}} onClick={gerarIA} disabled={gerando}>{gerando?"Gerando...":<span style={s.row}><Ic n="sparkles" sz={12} color="#0A0A0A"/>Gerar 3 cards</span>}</button></div>
        </div>
      </div>}
    </div>
  );
}

function Simulado({ addH }) {
  const [fase,setFase]=useState("cfg");
  const [cfg,setCfg]=useState({qtd:10,mat:"Todas",tq:60});
  const [fila,setFila]=useState([]); const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null); const [rev,setRev]=useState(false);
  const [resps,setResps]=useState([]); const [nivel,setNivel]=useState(2);
  const [tempo,setTempo]=useState(0); const [tq,setTq]=useState(60);
  const [aiTxt,setAiTxt]=useState(""); const [lAi,setLAi]=useState(false);
  const tRef=useRef(null); const tqRef=useRef(null);

  function montar(n,m){
    let pool=m==="Todas"?BANCO:BANCO.filter(q=>q.mat===m);
    const sel2=[];let nv=2;
    for(let i=0;i<n&&pool.length>0;i++){
      const opts=pool.filter(q=>q.dif===nv&&!sel2.find(s=>s.id===q.id));
      const fb=pool.filter(q=>!sel2.find(s=>s.id===q.id));
      const q=opts.length?opts[Math.floor(Math.random()*opts.length)]:fb[Math.floor(Math.random()*fb.length)];
      if(q)sel2.push(q);
    }
    return sel2;
  }

  function iniciar(){
    const f=montar(cfg.qtd,cfg.mat);
    setFila(f);setIdx(0);setSel(null);setRev(false);setResps([]);setNivel(2);setTempo(0);setTq(cfg.tq);setFase("quiz");
    tRef.current=setInterval(()=>setTempo(t=>t+1),1000);
    tqRef.current=setInterval(()=>setTq(t=>{if(t<=1){responder(-1);return cfg.tq;}return t-1;}),1000);
  }

  function responder(i){if(rev)return;setSel(i);setRev(true);clearInterval(tqRef.current);}

  function proximo(){
    const q=fila[idx];const ac=sel===q.c;
    const nv2=ac?Math.min(3,nivel+1):Math.max(1,nivel-1);
    const r={...q,acertou:ac,origem:"simulado"};
    const nr=[...resps,r];setResps(nr);setNivel(nv2);addH(r);
    if(idx+1>=fila.length){clearInterval(tRef.current);clearInterval(tqRef.current);setFase("res");analisar(nr);}
    else{setIdx(idx+1);setSel(null);setRev(false);setTq(cfg.tq);tqRef.current=setInterval(()=>setTq(t=>{if(t<=1){responder(-1);return cfg.tq;}return t-1;}),1000);}
  }

  async function analisar(r){
    setLAi(true);
    const ac=r.filter(x=>x.acertou).length,er=r.filter(x=>!x.acertou);
    const txt=await ai([{role:"user",content:`Simulado: ${ac}/${r.length} acertos. Erros: ${er.map(e=>e.mat).join(", ")}. Tipos: ${er.map(e=>e.tipo).join(", ")}. Análise em 3 frases: pontos bons, padrão de erros, 2 ações. Direto e motivador.`}]);
    setAiTxt(txt);setLAi(false);
  }

  useEffect(()=>()=>{clearInterval(tRef.current);clearInterval(tqRef.current);},[]);

  const dC={1:C.green,2:C.amber,3:C.red};const dL={1:"Fácil",2:"Médio",3:"Difícil"};

  if(fase==="cfg") return (
    <div>
      <div style={{fontSize:17,fontWeight:500,color:C.txt1,marginBottom:5}}>Simulado adaptativo</div>
      <div style={{fontSize:13,color:C.txt2,marginBottom:14,lineHeight:1.6}}>Questões que se ajustam ao seu nível em tempo real — algoritmo CAT.</div>
      <div style={s.card()}>
        <div style={s.lbl}>Configurar</div>
        <div style={{marginBottom:10}}><div style={{fontSize:10,color:C.txt3,marginBottom:5}}>Questões</div><div style={{display:"flex",gap:5}}>{[5,10,15].map(n=><div key={n} onClick={()=>setCfg(c=>({...c,qtd:n}))} style={{flex:1,padding:"7px",borderRadius:7,textAlign:"center",fontSize:12,cursor:"pointer",border:`0.5px solid ${cfg.qtd===n?C.acc:C.border2}`,background:cfg.qtd===n?C.accDim2:"transparent",color:cfg.qtd===n?C.acc:C.txt2,fontWeight:cfg.qtd===n?500:400}}>{n}</div>)}</div></div>
        <div style={{marginBottom:10}}><div style={{fontSize:10,color:C.txt3,marginBottom:5}}>Tempo/questão</div><div style={{display:"flex",gap:5}}>{[30,60,90].map(t=><div key={t} onClick={()=>setCfg(c=>({...c,tq:t}))} style={{flex:1,padding:"7px",borderRadius:7,textAlign:"center",fontSize:12,cursor:"pointer",border:`0.5px solid ${cfg.tq===t?C.acc:C.border2}`,background:cfg.tq===t?C.accDim2:"transparent",color:cfg.tq===t?C.acc:C.txt2,fontWeight:cfg.tq===t?500:400}}>{t}s</div>)}</div></div>
        <div style={{marginBottom:12}}><div style={{fontSize:10,color:C.txt3,marginBottom:5}}>Matéria</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{["Todas","Matemática","Português","Química","Física","História"].map(m=><div key={m} onClick={()=>setCfg(c=>({...c,mat:m}))} style={{padding:"4px 10px",borderRadius:7,fontSize:10,cursor:"pointer",border:`0.5px solid ${cfg.mat===m?C.acc:C.border2}`,background:cfg.mat===m?C.accDim2:"transparent",color:cfg.mat===m?C.acc:C.txt2}}>{m}</div>)}</div></div>
        <button style={{...s.btn(),width:"100%"}} onClick={iniciar}><span style={s.row}><Ic n="play" sz={13} color="#0A0A0A"/>Iniciar simulado</span></button>
      </div>
    </div>
  );

  if(fase==="quiz"){const q=fila[idx];if(!q)return null;
    const tp=Math.round((tq/cfg.tq)*100);
    return (
      <div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <div style={s.row}><span style={s.bdg(dC[nivel],dC[nivel]+"20")}>{dL[nivel]}</span><span style={{fontSize:10,color:C.txt3}}>{q.mat}</span></div>
          <div style={s.row}><span style={{fontSize:12,fontWeight:500,color:tp<30?C.red:C.txt2}}>{tq}s</span><span style={s.bdg(C.acc,C.accDim2)}>{idx+1}/{fila.length}</span></div>
        </div>
        <div style={s.pb}><div style={{height:"100%",borderRadius:999,background:C.acc,width:`${(idx/fila.length)*100}%`,transition:"width .3s"}}/></div>
        <div style={{height:4,background:C.bg3,borderRadius:999,overflow:"hidden",marginTop:3,marginBottom:13}}><div style={{height:"100%",borderRadius:999,background:tp<30?C.red:C.amber,width:`${tp}%`,transition:"width 1s linear"}}/></div>
        <div style={{...s.card({background:C.bg2,border:`0.5px solid ${C.border2}`,marginBottom:11})}}>
          <div style={{fontSize:13,fontWeight:500,color:C.txt1,lineHeight:1.5}}>{q.q}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:11}}>
          {q.opts.map((o,i)=>{
            let bg=C.bg2,border=`0.5px solid ${C.border2}`,color=C.txt1,fw=400;
            if(rev){if(i===q.c){bg=C.greenDim;border=`0.5px solid ${C.green}`;color=C.green;fw=500;}else if(i===sel){bg=C.redDim;border=`0.5px solid ${C.red}`;color=C.red;fw=500;}}
            else if(i===sel){bg=C.accDim;border=`0.5px solid ${C.acc}`;color=C.acc;}
            return <div key={i} onClick={()=>!rev&&responder(i)} style={{padding:"10px 13px",borderRadius:9,border,background:bg,color,fontSize:12,cursor:rev?"default":"pointer",transition:"all .2s",fontWeight:fw}}><span style={{opacity:.5,marginRight:6}}>{["A","B","C","D"][i]})</span>{o}</div>;
          })}
        </div>
        {rev&&<div>
          <div style={{...s.c2({background:sel===q.c?C.greenDim:C.redDim,border:`0.5px solid ${sel===q.c?C.green:C.red}35`,marginBottom:8})}}>
            <div style={s.row}><Ic n={sel===q.c?"check":"x"} sz={13} color={sel===q.c?C.green:C.red} style={{flexShrink:0}}/><span style={{fontSize:12,color:C.txt1,lineHeight:1.4}}>{q.exp}</span></div>
          </div>
          <button style={{...s.btn(),width:"100%"}} onClick={proximo}><span style={s.row}>{idx+1<fila.length?"Próxima":"Ver resultado"}<Ic n="arrow" sz={12} color="#0A0A0A"/></span></button>
        </div>}
      </div>
    );
  }

  if(fase==="res"){
    const ac=resps.filter(r=>r.acertou).length,pct=Math.round((ac/resps.length)*100),cor=pct>=70?C.green:pct>=50?C.amber:C.red;
    const pm={};resps.forEach(r=>{if(!pm[r.mat])pm[r.mat]={t:0,a:0};pm[r.mat].t++;if(r.acertou)pm[r.mat].a++;});
    return (
      <div>
        <div style={{textAlign:"center",marginBottom:16}}><div style={{fontSize:44,fontWeight:500,color:cor,marginBottom:3}}>{pct}%</div><div style={{fontSize:12,color:C.txt2}}>{ac}/{resps.length} acertos · {Math.floor(tempo/60)}m{(tempo%60).toString().padStart(2,"0")}s</div></div>
        {lAi?<div style={{...s.c2({background:C.accDim,textAlign:"center"})}}>IA analisando...</div>:aiTxt&&<div style={{...s.card({background:C.accDim,border:`0.5px solid ${C.acc}25`})}}><div style={s.row}><Ic n="sparkles" sz={14} color={C.acc} style={{flexShrink:0}}/><div style={{fontSize:12,color:C.txt1,lineHeight:1.6}}>{aiTxt}</div></div></div>}
        <div style={s.lbl}>Por matéria</div>
        <div style={s.card()}>{Object.entries(pm).map(([m,d],i)=>{const p=Math.round((d.a/d.t)*100);const c=p>=70?C.green:p>=50?C.amber:C.red;return <div key={i} style={{marginBottom:i<Object.keys(pm).length-1?9:0}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:12,color:C.txt1}}>{m}</span><span style={{fontSize:11,color:c,fontWeight:500}}>{p}%</span></div><div style={s.pb}><div style={{height:"100%",borderRadius:999,background:c,width:`${p}%`}}/></div></div>;})}
        </div>
        <button style={{...s.btn("ghost"),width:"100%",marginTop:4}} onClick={()=>setFase("cfg")}><span style={s.row}><Ic n="refresh" sz={12} color={C.txt1}/>Novo simulado</span></button>
      </div>
    );
  }
  return null;
}
function AnaliseErros({ hist }) {
  const [aiTxt,setAiTxt]=useState(""); const [load,setLoad]=useState(false);
  const erros=hist.filter(h=>!h.acertou);
  const pT={};erros.forEach(e=>{if(!pT[e.tipo])pT[e.tipo]=0;pT[e.tipo]++;});
  const pM={};hist.forEach(h=>{if(!pM[h.mat])pM[h.mat]={t:0,e:0};pM[h.mat].t++;if(!h.acertou)pM[h.mat].e++;});
  const tI={calculo:{l:"Erro de cálculo",c:C.red,n:"trending"},interpretacao:{l:"Interpretação",c:C.amber,n:"eye"},descuido:{l:"Descuido",c:C.blue,n:"alert"},conteudo:{l:"Falta de conteúdo",c:C.purple,n:"brain"},tempo:{l:"Gestão de tempo",c:C.txt2,n:"clock"}};

  if(hist.length<5) return (
    <div style={{textAlign:"center",padding:"38px 18px"}}>
      <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><Ic n="brain" sz={38} color={C.txt3}/></div>
      <div style={{fontSize:14,fontWeight:500,color:C.txt1,marginBottom:4}}>Precisa de mais dados</div>
      <div style={{fontSize:12,color:C.txt3,marginBottom:14}}>Responda ao menos 5 questões em simulados ou no modo prova.</div>
      <span style={s.bdg(C.txt3,C.bg3)}>{hist.length}/5 questões</span>
    </div>
  );

  async function gerar(){
    setLoad(true);
    const txt=await ai([{role:"user",content:`Analise erros:\n${erros.map(e=>`[${e.mat}] ${e.tipo}: ${e.q}`).join("\n")}\nIdentifique: padrão principal, natureza (conteúdo/interpretação/descuido), 3 ações práticas. Máx 160 palavras. Direto e motivador.`}]);
    setAiTxt(txt);setLoad(false);
  }

  const ac=hist.filter(h=>h.acertou).length;
  const pct=hist.length?Math.round((ac/hist.length)*100):0;

  return (
    <div>
      <div style={{fontSize:17,fontWeight:500,color:C.txt1,marginBottom:5}}>Análise de padrão de erros</div>
      <div style={{fontSize:13,color:C.txt2,marginBottom:13,lineHeight:1.6}}>A IA identifica <em>por que</em> você erra — intervenções precisas.</div>
      <div style={s.g2}>
        <div style={s.met}><div style={{fontSize:10,color:C.txt2,marginBottom:3}}>Total de erros</div><div style={{fontSize:19,fontWeight:500,color:C.red}}>{erros.length}</div></div>
        <div style={s.met}><div style={{fontSize:10,color:C.txt2,marginBottom:3}}>Taxa de acerto</div><div style={{fontSize:19,fontWeight:500,color:pct>=70?C.green:pct>=50?C.amber:C.red}}>{pct}%</div></div>
      </div>
      <div style={s.lbl}>Tipos de erro</div>
      <div style={s.card({marginBottom:13})}>
        {Object.entries(tI).map(([tipo,info])=>{
          const q=pT[tipo]||0;if(!q)return null;
          const p=Math.round((q/erros.length)*100);
          return <div key={tipo} style={{marginBottom:10}}><div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}><Ic n={info.n} sz={12} color={info.c} style={{flexShrink:0}}/><div style={{flex:1,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,fontWeight:500,color:C.txt1}}>{info.l}</span><span style={{fontSize:10,color:info.c,fontWeight:500}}>{q}x ({p}%)</span></div></div><div style={s.pb}><div style={{height:"100%",borderRadius:999,background:info.c,width:`${p}%`}}/></div></div>;
        }).filter(Boolean)}
        {!Object.keys(pT).length&&<div style={{fontSize:12,color:C.txt3}}>Sem erros ainda.</div>}
      </div>
      <div style={s.lbl}>Por matéria</div>
      <div style={s.card({marginBottom:13})}>
        {Object.entries(pM).map(([m,d],i)=>{const p=Math.round(((d.t-d.e)/d.t)*100);const c=p>=70?C.green:p>=50?C.amber:C.red;return <div key={i} style={{marginBottom:i<Object.keys(pM).length-1?9:0}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:12,color:C.txt1}}>{m}</span><span style={{fontSize:11,color:c,fontWeight:500}}>{p}%</span></div><div style={s.pb}><div style={{height:"100%",borderRadius:999,background:c,width:`${p}%`}}/></div></div>;})}
      </div>
      {!aiTxt?<button style={{...s.btn(),width:"100%",marginBottom:10,opacity:load?.7:1}} onClick={gerar} disabled={load||erros.length<3}><span style={s.row}><Ic n="sparkles" sz={12} color="#0A0A0A"/>{load?"Gerando...":"Gerar relatório com IA"}</span></button>:(
        <div style={s.card({background:C.purpleDim,border:`0.5px solid ${C.purple}28`,marginBottom:10})}><div style={s.row}><Ic n="sparkles" sz={14} color={C.purple} style={{flexShrink:0}}/><div style={{fontSize:12,color:C.txt1,lineHeight:1.7}}>{aiTxt}</div></div></div>
      )}
      <div style={s.lbl}>Últimos erros</div>
      {erros.slice(-4).reverse().map((e,i)=>(
        <div key={i} style={s.c2()}><div style={{fontSize:10,color:C.red,marginBottom:2,fontWeight:500}}>{e.mat} · {tI[e.tipo]?.l||e.tipo}</div><div style={{fontSize:12,color:C.txt1,marginBottom:2}}>{e.q}</div><div style={{fontSize:10,color:C.txt3}}>{e.exp}</div></div>
      ))}
    </div>
  );
}

function ModoProva({ addH }) {
  const [fase,setFase]=useState("cfg");
  const [cfg,setCfg]=useState({qtd:10,min:20});
  const [fila,setFila]=useState([]); const [idx,setIdx]=useState(0);
  const [marc,setMarc]=useState({}); const [tR,setTR]=useState(0);
  const [resps,setResps]=useState([]); const [aiTxt,setAiTxt]=useState(""); const [lAi,setLAi]=useState(false);
  const tRef=useRef(null);

  function iniciar(){
    const pool=[...BANCO].sort(()=>Math.random()-.5).slice(0,cfg.qtd);
    setFila(pool);setIdx(0);setMarc({});setTR(cfg.min*60);setResps([]);setAiTxt("");setFase("prova");
    tRef.current=setInterval(()=>setTR(t=>{if(t<=1){clearInterval(tRef.current);setFase("calc");return 0;}return t-1;}),1000);
  }

  useEffect(()=>{
    if(fase==="calc"){
      const r=fila.map((q,i)=>({...q,acertou:marc[i]===q.c,sel:marc[i]??-1,origem:"prova"}));
      setResps(r);r.forEach(x=>addH(x));setFase("res");analisar(r);
    }
  },[fase]);

  async function analisar(r){
    setLAi(true);
    const ac=r.filter(x=>x.acertou).length,nr=r.filter(x=>x.sel===-1).length;
    const txt=await ai([{role:"user",content:`Modo prova: ${ac}/${r.length} acertos, ${nr} não respondidas. Erros: ${r.filter(x=>!x.acertou&&x.sel!==-1).map(x=>x.mat).join(", ")}. Feedback em 3 frases: tempo, estratégia, próximos passos. Direto.`}]);
    setAiTxt(txt);setLAi(false);
  }

  useEffect(()=>()=>clearInterval(tRef.current),[]);

  const min=Math.floor(tR/60),seg=tR%60,tPct=Math.round((tR/(cfg.min*60))*100),urg=tPct<20;

  if(fase==="cfg") return (
    <div>
      <div style={{fontSize:17,fontWeight:500,color:C.txt1,marginBottom:5}}>Modo prova cronometrado</div>
      <div style={{fontSize:13,color:C.txt2,marginBottom:13,lineHeight:1.6}}>Condições reais — timer contínuo, sem pausas, sem voltar. Treina gestão de tempo e decisão sob pressão.</div>
      <div style={{...s.card({background:C.redDim,border:`0.5px solid ${C.red}28`,marginBottom:12})}}>
        <div style={s.lbl}>Regras</div>
        {["Timer sem pausa","Não é possível voltar","Questões não respondidas = erro","Tempo esgotado → encerramento automático"].map((r,i)=>(
          <div key={i} style={{...s.row,marginBottom:i<3?5:0}}><Ic n="shield" sz={11} color={C.red} style={{flexShrink:0}}/><span style={{fontSize:11,color:C.txt2}}>{r}</span></div>
        ))}
      </div>
      <div style={s.card()}>
        <div style={s.lbl}>Configurar</div>
        <div style={s.g2}>
          <div><div style={{fontSize:10,color:C.txt3,marginBottom:5}}>Questões</div><div style={{display:"flex",gap:5}}>{[5,10,15].map(n=><div key={n} onClick={()=>setCfg(c=>({...c,qtd:n}))} style={{flex:1,padding:"7px",borderRadius:7,textAlign:"center",fontSize:11,cursor:"pointer",border:`0.5px solid ${cfg.qtd===n?C.acc:C.border2}`,background:cfg.qtd===n?C.accDim2:"transparent",color:cfg.qtd===n?C.acc:C.txt2,fontWeight:cfg.qtd===n?500:400}}>{n}</div>)}</div></div>
          <div><div style={{fontSize:10,color:C.txt3,marginBottom:5}}>Tempo (min)</div><div style={{display:"flex",gap:5}}>{[10,20,30].map(t=><div key={t} onClick={()=>setCfg(c=>({...c,min:t}))} style={{flex:1,padding:"7px",borderRadius:7,textAlign:"center",fontSize:11,cursor:"pointer",border:`0.5px solid ${cfg.min===t?C.acc:C.border2}`,background:cfg.min===t?C.accDim2:"transparent",color:cfg.min===t?C.acc:C.txt2,fontWeight:cfg.min===t?500:400}}>{t}</div>)}</div></div>
        </div>
        <button style={{...s.btn("red"),width:"100%"}} onClick={iniciar}><span style={s.row}><Ic n="clock" sz={12} color="#0A0A0A"/>Iniciar modo prova</span></button>
      </div>
    </div>
  );

  if(fase==="prova"){const q=fila[idx];
    return (
      <div>
        <div style={{...s.card({background:urg?C.redDim:C.bg2,border:`0.5px solid ${urg?C.red:C.border2}`,marginBottom:10,padding:"10px 14px"})}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={s.row}><Ic n="clock" sz={15} color={urg?C.red:C.txt2}/><span style={{fontSize:19,fontWeight:500,color:urg?C.red:C.txt1,fontVariantNumeric:"tabular-nums"}}>{min.toString().padStart(2,"0")}:{seg.toString().padStart(2,"0")}</span></div>
            <div style={s.row}><span style={{fontSize:10,color:C.txt3}}>{idx+1}/{fila.length}</span><span style={s.bdg(C.acc,C.accDim2)}>{q?.mat}</span></div>
          </div>
          <div style={{height:4,background:C.bg3,borderRadius:999,overflow:"hidden",marginTop:7}}><div style={{height:"100%",background:urg?C.red:C.acc,width:`${tPct}%`,transition:"width 1s linear"}}/></div>
        </div>
        <div style={{display:"flex",gap:3,marginBottom:10,flexWrap:"wrap"}}>
          {fila.map((_,i)=><div key={i} style={{width:20,height:20,borderRadius:4,background:i===idx?C.acc:marc[i]!==undefined?C.accDim2:C.bg3,border:`0.5px solid ${i===idx?C.acc:marc[i]!==undefined?C.acc:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:i===idx?"#0A0A0A":marc[i]!==undefined?C.acc:C.txt3,fontWeight:i===idx||marc[i]!==undefined?500:400}}>{i+1}</div>)}
        </div>
        <div style={{...s.card({background:C.bg2,border:`0.5px solid ${C.border2}`,marginBottom:10})}}>
          <div style={{fontSize:13,fontWeight:500,color:C.txt1,lineHeight:1.5}}>{q?.q}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
          {q?.opts.map((o,i)=><div key={i} onClick={()=>setMarc(m=>({...m,[idx]:i}))} style={{padding:"10px 13px",borderRadius:9,border:`0.5px solid ${marc[idx]===i?C.acc:C.border2}`,background:marc[idx]===i?C.accDim2:C.bg2,color:marc[idx]===i?C.acc:C.txt1,fontSize:12,cursor:"pointer",transition:"all .15s",fontWeight:marc[idx]===i?500:400}}><span style={{opacity:.5,marginRight:6}}>{["A","B","C","D"][i]})</span>{o}</div>)}
        </div>
        {idx+1<fila.length?<button style={{...s.btn(),width:"100%"}} onClick={()=>setIdx(idx+1)}><span style={s.row}>Próxima<Ic n="arrow" sz={12} color="#0A0A0A"/></span></button>:<button style={{...s.btn("red"),width:"100%"}} onClick={()=>{clearInterval(tRef.current);setFase("calc");}}><span style={s.row}><Ic n="flag" sz={12} color="#0A0A0A"/>Encerrar prova</span></button>}
        <div style={{fontSize:10,color:C.txt3,textAlign:"center",marginTop:6}}>Não é possível voltar</div>
      </div>
    );
  }

  if(fase==="res"&&resps.length){
    const ac=resps.filter(r=>r.acertou).length,nr=resps.filter(r=>r.sel===-1).length;
    const pct=Math.round((ac/resps.length)*100),cor=pct>=70?C.green:pct>=50?C.amber:C.red;
    const us=cfg.min*60-tR,tM=Math.floor(us/60),tS=us%60;
    return (
      <div>
        <div style={{textAlign:"center",marginBottom:14}}><div style={{fontSize:44,fontWeight:500,color:cor,marginBottom:3}}>{pct}%</div><div style={{fontSize:12,color:C.txt2}}>{ac} acertos · {nr} não resp. · {tM}m{tS.toString().padStart(2,"0")}s</div></div>
        {lAi?<div style={{...s.c2({background:C.accDim,textAlign:"center"})}}>IA analisando...</div>:aiTxt&&<div style={{...s.card({background:C.accDim,border:`0.5px solid ${C.acc}25`})}}><div style={s.row}><Ic n="sparkles" sz={13} color={C.acc} style={{flexShrink:0}}/><div style={{fontSize:12,color:C.txt1,lineHeight:1.6}}>{aiTxt}</div></div></div>}
        <div style={s.lbl}>Gabarito</div>
        <div style={s.card()}>
          {resps.map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"6px 0",borderBottom:i<resps.length-1?`0.5px solid ${C.border}`:"none"}}>
              <div style={{width:20,height:20,borderRadius:5,background:r.acertou?C.greenDim:r.sel===-1?C.bg3:C.redDim,border:`0.5px solid ${r.acertou?C.green:r.sel===-1?C.border:C.red}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {r.acertou?<Ic n="check" sz={11} color={C.green}/>:r.sel===-1?<span style={{fontSize:9,color:C.txt3}}>—</span>:<Ic n="x" sz={11} color={C.red}/>}
              </div>
              <div style={{flex:1}}><div style={{fontSize:10,color:C.txt3,marginBottom:1}}>{r.mat}</div><div style={{fontSize:11,color:C.txt1}}>{r.q}</div>{!r.acertou&&r.sel!==-1&&<div style={{fontSize:10,color:C.txt3,marginTop:2}}>{r.exp}</div>}</div>
            </div>
          ))}
        </div>
        <button style={{...s.btn("ghost"),width:"100%",marginTop:4}} onClick={()=>setFase("cfg")}><span style={s.row}><Ic n="refresh" sz={12} color={C.txt1}/>Nova prova</span></button>
      </div>
    );
  }
  return null;
}
function StreakMissoes({ streak, setStreak, xp, setXp }) {
  const nivel=Math.floor(xp/500)+1,xpN=xp%500,xpP=Math.round((xpN/500)*100);
  const [miss,setMiss]=useState([
    {id:"fc",icon:"cards",color:C.acc,titulo:"Revisar 20 flashcards",xp:50,meta:20,prog:14,ok:false},
    {id:"q",icon:"chart",color:C.blue,titulo:"Responder 10 questões",xp:80,meta:10,prog:7,ok:false},
    {id:"s",icon:"flame",color:C.red,titulo:"Manter sequência ativa",xp:30,meta:1,prog:1,ok:true},
    {id:"sim",icon:"trophy",color:C.purple,titulo:"Completar 1 simulado",xp:150,meta:1,prog:0,ok:false},
  ]);
  const [prot,setProt]=useState(false);const [toast,setToast]=useState(null);
  const dias=["S","T","Q","Q","S","S","D"],ativos=[true,true,true,true,true,true,false];
  const nL=["","Iniciante","Estudante","Dedicado","Focado","Avançado","Expert","Mestre"];

  function concluir(id){setMiss(p=>p.map(m=>{if(m.id!==id||m.ok)return m;setXp(x=>x+m.xp);setToast(`+${m.xp} XP — ${m.titulo}`);setTimeout(()=>setToast(null),2500);return {...m,prog:m.meta,ok:true};}));}

  return (
    <div>
      {toast&&<div style={{position:"fixed",top:65,left:"50%",transform:"translateX(-50%)",background:C.acc,color:"#0A0A0A",padding:"9px 20px",borderRadius:10,fontSize:12,fontWeight:500,zIndex:999,animation:"sli .3s ease"}}>{toast}</div>}
      <div style={{...s.card({background:"rgba(240,120,32,0.07)",border:`0.5px solid ${C.acc}25`,marginBottom:13})}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <div style={s.row}><span style={{fontSize:36,lineHeight:1}}>🔥</span><div><div style={{fontSize:24,fontWeight:500,color:C.acc}}>{streak} dias</div><div style={{fontSize:10,color:C.txt3}}>Sequência · Recorde: 18</div></div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:12,fontWeight:500,color:C.purple}}>Nível {nivel}</div><div style={{fontSize:10,color:C.txt3}}>{nL[Math.min(nivel,nL.length-1)]}</div></div>
        </div>
        <div style={{display:"flex",gap:4,marginBottom:8}}>
          {dias.map((d,i)=><div key={i} style={{flex:1,textAlign:"center"}}>
            <div style={{fontSize:8,color:C.txt3,marginBottom:2}}>{d}</div>
            <div style={{width:"100%",aspectRatio:"1",borderRadius:4,background:ativos[i]?C.acc:C.bg3,border:`0.5px solid ${ativos[i]?C.acc:C.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {ativos[i]&&<Ic n="check" sz={8} color="#0A0A0A"/>}
            </div>
          </div>)}
        </div>
        <div style={{fontSize:10,color:C.txt3,marginBottom:3}}>XP: {xpN}/500 → Nível {nivel+1}</div>
        <div style={s.pb}><div style={{height:"100%",borderRadius:999,background:C.purple,width:`${xpP}%`}}/></div>
      </div>
      <div style={{...s.c2({background:prot?C.bg3:C.amberDim,border:`0.5px solid ${prot?C.border:C.amber}28`,marginBottom:13,display:"flex",alignItems:"center",justifyContent:"space-between"})}}>
        <div style={s.row}><Ic n="shield" sz={15} color={prot?C.txt3:C.amber}/><div><div style={{fontSize:11,fontWeight:500,color:prot?C.txt3:C.txt1}}>Protetor de streak</div><div style={{fontSize:9,color:C.txt3}}>{prot?"Usado":"1 disponível — protege 1 dia"}</div></div></div>
        <button onClick={()=>{if(!prot){setProt(true);setToast("Protetor usado! ✓");setTimeout(()=>setToast(null),2000);}}} disabled={prot} style={{...s.btn("sm"),background:prot?C.bg3:C.amber,color:prot?C.txt3:"#0A0A0A",border:"none",opacity:prot?.5:1}}>{prot?"Usado":"Usar"}</button>
      </div>
      <div style={s.lbl}>Missões de hoje</div>
      {miss.filter(m=>m.id!=="sim").map(m=>(
        <div key={m.id} style={s.card({background:m.ok?C.greenDim:C.bg1,border:`0.5px solid ${m.ok?C.green+"28":C.border}`})}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:m.ok?0:6}}>
            <div style={s.row}><div style={s.ib(m.color,m.color+"18",27)}><Ic n={m.icon} sz={12} color={m.color}/></div><div><div style={{fontSize:12,fontWeight:500,color:m.ok?C.green:C.txt1}}>{m.titulo}</div><div style={{fontSize:10,color:C.txt3}}>{m.prog}/{m.meta} · +{m.xp} XP</div></div></div>
            {m.ok?<span style={s.bdg(C.green,C.greenDim)}>Feita</span>:<button onClick={()=>concluir(m.id)} style={s.btn("sm")}>Concluir</button>}
          </div>
          {!m.ok&&<div style={s.pb}><div style={{height:"100%",borderRadius:999,background:m.color,width:`${Math.min(100,Math.round((m.prog/m.meta)*100))}%`}}/></div>}
        </div>
      ))}
      <div style={s.lbl}>Missão semanal</div>
      {miss.filter(m=>m.id==="sim").map(m=>(
        <div key={m.id} style={s.card()}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <div style={s.row}><div style={s.ib(m.color,m.color+"18",27)}><Ic n={m.icon} sz={12} color={m.color}/></div><div><div style={{fontSize:12,fontWeight:500,color:C.txt1}}>{m.titulo}</div><div style={{fontSize:10,color:C.txt3}}>{m.prog}/{m.meta} · +{m.xp} XP</div></div></div>
            {!m.ok&&<button onClick={()=>concluir(m.id)} style={s.btn("sm")}>Concluir</button>}
          </div>
          <div style={s.pb}><div style={{height:"100%",borderRadius:999,background:m.color,width:`${Math.min(100,Math.round((m.prog/m.meta)*100))}%`}}/></div>
        </div>
      ))}
      <div style={s.lbl}>Conquistas</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
        {CONQ.map(c=>(
          <div key={c.id} style={{...s.c2({background:c.ok?c.color+"10":C.bg2,border:`0.5px solid ${c.ok?c.color+"28":C.border}`,textAlign:"center",padding:"11px 7px"})}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:4,opacity:c.ok?1:0.3}}><Ic n={c.icon} sz={20} color={c.ok?c.color:C.txt3}/></div>
            <div style={{fontSize:10,fontWeight:500,color:c.ok?C.txt1:C.txt3,marginBottom:1}}>{c.titulo}</div>
            <div style={{fontSize:9,color:C.txt3,lineHeight:1.3}}>{c.desc}</div>
            {!c.ok&&c.p!==undefined&&<div style={{marginTop:4}}><div style={{fontSize:9,color:C.txt3}}>{c.p}/{c.m}</div><div style={{height:2,background:C.bg3,borderRadius:999,overflow:"hidden",marginTop:2}}><div style={{height:"100%",background:c.color,width:`${Math.round((c.p/c.m)*100)}%`}}/></div></div>}
            {!c.ok&&c.p===undefined&&<div style={{marginTop:3}}><Ic n="lock" sz={9} color={C.txt3}/></div>}
          </div>
        ))}
      </div>
      <style>{`@keyframes sli{from{opacity:0;transform:translateX(-50%) translateY(-7px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
    </div>
  );
}

function GrupoRanking() {
  const [aba,setAba]=useState("ranking");
  const [msgs,setMsgs]=useState([
    {a:"Carlos",av:"CA",c:C.blue,msg:"Alguém fez o simulado de Química?",h:"14:22"},
    {a:"Marina",av:"MA",c:C.green,msg:"Sim! Achei difícil o equilíbrio. Fui 60% 😅",h:"14:25"},
  ]);
  const [inp,setInp]=useState("");const [lAi,setLAi]=useState(false);
  const [met,setMet]=useState("xp");const [des,setDes]=useState(null);
  const bot=useRef(null);
  useEffect(()=>{bot.current?.scrollIntoView({behavior:"smooth"});},[msgs]);

  async function enviar(){
    if(!inp.trim()||lAi)return;
    const nova={a:"Ana (você)",av:"AN",c:C.acc,msg:inp,h:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})};
    setMsgs(p=>[...p,nova]);const txt=inp;setInp("");setLAi(true);
    const r=await ai([{role:"user",content:`Você é Carlos, estudante ENEM. Responda casualmente (1-2 frases): "${txt}"`}],"Seja Carlos, estudante real. Responda brevemente e casualmente.");
    setTimeout(()=>{setMsgs(p=>[...p,{a:"Carlos",av:"CA",c:C.blue,msg:r,h:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}]);setLAi(false);},600);
  }

  const rank=[...GRUPO].sort((a,b)=>met==="xp"?b.xp-a.xp:met==="horas"?b.horas-a.horas:b.streak-a.streak);
  const med=["🥇","🥈","🥉"];

  return (
    <div>
      <div style={{display:"flex",gap:3,background:C.bg2,padding:3,borderRadius:9,marginBottom:13}}>
        {["ranking","chat","desafios"].map(a=><div key={a} onClick={()=>setAba(a)} style={{flex:1,padding:"7px",textAlign:"center",borderRadius:7,fontSize:11,fontWeight:500,cursor:"pointer",background:aba===a?C.acc:"transparent",color:aba===a?"#0A0A0A":C.txt2,transition:"all .15s"}}>{a==="ranking"?"Ranking":a==="chat"?"Chat":"Desafios"}</div>)}
      </div>
      {aba==="ranking"&&(
        <div>
          <div style={{display:"flex",gap:5,marginBottom:11}}>
            {[["xp","XP total"],["horas","Horas"],["streak","Streak"]].map(([k,v])=><div key={k} onClick={()=>setMet(k)} style={{fontSize:10,padding:"3px 8px",borderRadius:999,cursor:"pointer",border:`0.5px solid ${met===k?C.acc:C.border2}`,background:met===k?C.accDim2:"transparent",color:met===k?C.acc:C.txt3}}>{v}</div>)}
          </div>
          {rank.map((m,i)=>{
            const eV=m.nome.includes("você");
            const val=met==="xp"?`${m.xp.toLocaleString()} XP`:met==="horas"?`${m.horas}h`:`${m.streak}d`;
            return <div key={i} style={s.card({background:eV?C.accDim:C.bg1,border:`0.5px solid ${eV?C.acc+"28":C.border}`,marginBottom:7})}>
              <div style={{display:"flex",alignItems:"center",gap:9}}>
                <div style={{fontSize:15,width:24,textAlign:"center"}}>{med[i]||`#${i+1}`}</div>
                <div style={{width:30,height:30,borderRadius:"50%",background:m.cor+"20",border:`0.5px solid ${m.cor}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:500,color:m.cor,flexShrink:0}}>{m.av}</div>
                <div style={{flex:1}}><div style={s.row}><span style={{fontSize:12,fontWeight:500,color:eV?C.acc:C.txt1}}>{m.nome}</span>{m.online&&<span style={{width:5,height:5,borderRadius:"50%",background:C.green}}/>}</div><div style={{fontSize:10,color:C.txt3}}>{m.horas}h · {m.streak}d</div></div>
                <div style={{fontSize:12,fontWeight:500,color:i===0?C.amber:i===1?C.txt2:i===2?C.acc:C.txt3}}>{val}</div>
              </div>
            </div>;
          })}
        </div>
      )}
      {aba==="chat"&&(
        <div style={{display:"flex",flexDirection:"column",height:370}}>
          <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:8,paddingBottom:4}}>
            {msgs.map((m,i)=>{
              const eV=m.a.includes("você");
              return <div key={i} style={{display:"flex",justifyContent:eV?"flex-end":"flex-start",gap:6,alignItems:"flex-end"}}>
                {!eV&&<div style={{width:24,height:24,borderRadius:"50%",background:m.c+"20",border:`0.5px solid ${m.c}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:m.c,flexShrink:0}}>{m.av}</div>}
                <div style={{maxWidth:"72%"}}>
                  {!eV&&<div style={{fontSize:9,color:C.txt3,marginBottom:2}}>{m.a}</div>}
                  <div style={{padding:"8px 11px",borderRadius:eV?"11px 11px 3px 11px":"11px 11px 11px 3px",background:eV?C.acc:C.bg2,border:eV?"none":`0.5px solid ${C.border2}`,fontSize:12,color:eV?"#0A0A0A":C.txt1,lineHeight:1.5}}>{m.msg}</div>
                  <div style={{fontSize:9,color:C.txt3,marginTop:2,textAlign:eV?"right":"left"}}>{m.h}</div>
                </div>
              </div>;
            })}
            {lAi&&<div style={{display:"flex",gap:6}}><div style={{width:24,height:24,borderRadius:"50%",background:C.blueDim,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:C.blue}}>CA</div><div style={{padding:"8px 11px",borderRadius:"11px 11px 11px 3px",background:C.bg2,border:`0.5px solid ${C.border2}`,display:"flex",gap:3,alignItems:"center"}}>{[0,1,2].map(i=><div key={i} style={{width:4,height:4,borderRadius:"50%",background:C.txt3,animation:`bo .8s ${i*.2}s infinite`}}/>)}</div></div>}
            <div ref={bot}/>
          </div>
          <div style={{display:"flex",gap:6,paddingTop:9,borderTop:`0.5px solid ${C.border}`}}>
            <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&enviar()} placeholder="Mensagem para o grupo..." style={{...s.inp,flex:1}}/>
            <button onClick={enviar} disabled={!inp.trim()||lAi} style={{...s.btn(),padding:"7px 12px",opacity:!inp.trim()||lAi?.5:1}}><Ic n="send" sz={12} color="#0A0A0A"/></button>
          </div>
          <style>{`@keyframes bo{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`}</style>
        </div>
      )}
      {aba==="desafios"&&(
        <div>
          <div style={{...s.card({background:C.purpleDim,border:`0.5px solid ${C.purple}28`,marginBottom:13})}}>
            <div style={{fontSize:12,fontWeight:500,color:C.txt1,marginBottom:3}}>Desafio ativo</div>
            <div style={{fontSize:13,color:C.purple,fontWeight:500,marginBottom:9}}>Quem acerta mais de Química?</div>
            {GRUPO.slice(0,3).map((m,i)=>{const pts=[8,6,5][i];return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:7,marginBottom:7}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:m.cor+"20",border:`0.5px solid ${m.cor}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:m.cor,fontWeight:500}}>{m.av}</div>
                <div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:11,color:C.txt1}}>{m.nome}</span><span style={{fontSize:11,color:C.purple,fontWeight:500}}>{pts}/10</span></div><div style={{height:3,background:C.bg3,borderRadius:999,overflow:"hidden"}}><div style={{height:"100%",background:C.purple,width:`${pts*10}%`}}/></div></div>
              </div>
            );})}
            <div style={{fontSize:10,color:C.txt3,marginTop:7}}>Encerra em 2 dias · Prêmio: +500 XP</div>
          </div>
          <div style={s.lbl}>Criar desafio</div>
          {["Quem estuda mais horas?","Quem acerta mais Matemática?","Maior streak?"].map((d,i)=>(
            <div key={i} onClick={()=>setDes(d)} style={{...s.c2({cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"})}}>
              <div><div style={{fontSize:12,color:C.txt1,fontWeight:500}}>{d}</div><div style={{fontSize:10,color:C.txt3}}>+{[300,400,350][i]} XP</div></div>
              <Ic n="plus" sz={13} color={C.acc}/>
            </div>
          ))}
          {des&&<div style={{...s.c2({background:C.greenDim,border:`0.5px solid ${C.green}28`})}}><div style={s.row}><Ic n="check" sz={12} color={C.green}/><span style={{fontSize:12,color:C.txt1}}>Desafio criado: <strong>{des}</strong></span></div></div>}
        </div>
      )}
    </div>
  );
}

function SaudeEstudo() {
  const [aiTxt,setAiTxt]=useState(""); const [load,setLoad]=useState(false); const [leve,setLeve]=useState(false);
  const mH=+(SAUDE_H.reduce((a,d)=>a+d.horas,0)/SAUDE_H.length).toFixed(1);
  const mQ=Math.round(SAUDE_H.reduce((a,d)=>a+d.qualidade,0)/SAUDE_H.length);
  const mxF=Math.max(...SAUDE_H.map(d=>d.fadiga));
  const alertB=mxF>70,alertS=SAUDE_H.slice(-3).some(d=>d.horas>3.5);
  const mxH=Math.max(...SAUDE_H.map(d=>d.horas));

  async function gerar(){
    setLoad(true);
    const txt=await ai([{role:"user",content:`Dados de saúde:\n${SAUDE_H.map(d=>`${d.dia}: ${d.horas}h, qualidade ${d.qualidade}%, fadiga ${d.fadiga}%`).join("\n")}\nRelatório: equilíbrio geral, dia crítico, sinais de fadiga, 2 recomendações. Cuidadoso e empático. Máx 160 palavras.`}],"Especialista em performance cognitiva. Analise dados de estudo. Responda em português.");
    setAiTxt(txt);setLoad(false);
  }

  return (
    <div>
      <div style={{fontSize:17,fontWeight:500,color:C.txt1,marginBottom:5}}>Saúde do estudo</div>
      <div style={{fontSize:13,color:C.txt2,marginBottom:13,lineHeight:1.6}}>Burnout é a principal causa de abandono. O app detecta sinais antes que aconteça.</div>
      {alertB&&<div style={{...s.c2({background:C.redDim,border:`0.5px solid ${C.red}28`,marginBottom:11})}}>
        <div style={s.row}><Ic n="warning" sz={16} color={C.red} style={{flexShrink:0}}/><div><div style={{fontSize:11,fontWeight:500,color:C.red}}>Sinal de fadiga detectado</div><div style={{fontSize:10,color:C.txt2,marginTop:1}}>Pico de {mxF}% esta semana. Considere reduzir a carga.</div></div></div>
      </div>}
      {alertS&&!alertB&&<div style={{...s.c2({background:C.amberDim,border:`0.5px solid ${C.amber}28`,marginBottom:11})}}>
        <div style={s.row}><Ic n="warning" sz={14} color={C.amber} style={{flexShrink:0}}/><div style={{fontSize:11,color:C.txt1}}>3 dias com +3,5h. Atenção à qualidade das sessões.</div></div>
      </div>}
      <div style={s.g3}>
        {[{l:"Média diária",v:`${mH}h`,c:mH<2?C.amber:C.green},{l:"Qualidade",v:`${mQ}%`,c:mQ>=75?C.green:mQ>=60?C.amber:C.red},{l:"Pico fadiga",v:`${mxF}%`,c:mxF<40?C.green:mxF<70?C.amber:C.red}].map((m,i)=>(
          <div key={i} style={s.met}><div style={{fontSize:10,color:C.txt2,marginBottom:3}}>{m.l}</div><div style={{fontSize:18,fontWeight:500,color:m.c}}>{m.v}</div></div>
        ))}
      </div>
      <div style={s.lbl}>Horas — esta semana</div>
      <div style={s.card()}>
        <div style={{display:"flex",alignItems:"flex-end",gap:5,height:80}}>
          {SAUDE_H.map((d,i)=>{const h=Math.round((d.horas/mxH)*100);const c=d.fadiga>70?C.red:d.fadiga>40?C.amber:C.acc;return <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,height:"100%",justifyContent:"flex-end"}}><div style={{fontSize:8,color:C.txt3}}>{d.horas}h</div><div style={{width:"100%",background:c,borderRadius:"3px 3px 0 0",height:`${h}%`,opacity:.85}}/><div style={{fontSize:8,color:C.txt3}}>{d.dia}</div></div>;})}
        </div>
      </div>
      <div style={s.lbl}>Qualidade vs. fadiga</div>
      <div style={s.card({marginBottom:12})}>
        {SAUDE_H.map((d,i)=>(
          <div key={i} style={{marginBottom:i<SAUDE_H.length-1?8:0}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:11,color:C.txt1}}>{d.dia}</span><div style={{display:"flex",gap:8}}><span style={{fontSize:9,color:C.green}}>{d.qualidade}% Q</span><span style={{fontSize:9,color:d.fadiga>70?C.red:d.fadiga>40?C.amber:C.txt3}}>{d.fadiga}% F</span></div></div>
            <div style={{position:"relative",height:5}}><div style={{position:"absolute",inset:0,background:C.bg3,borderRadius:999}}/><div style={{position:"absolute",top:0,left:0,height:"100%",background:C.green,borderRadius:999,width:`${d.qualidade}%`,opacity:.6}}/><div style={{position:"absolute",top:0,left:0,height:"100%",background:d.fadiga>70?C.red:C.amber,borderRadius:999,width:`${d.fadiga}%`,opacity:.4}}/></div>
          </div>
        ))}
      </div>
      <div style={{...s.card({display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:11,background:leve?C.blueDim:C.bg1,border:`0.5px solid ${leve?C.blue+"28":C.border}`})}}>
        <div style={s.row}><Ic n="moon" sz={16} color={leve?C.blue:C.txt3}/><div><div style={{fontSize:11,fontWeight:500,color:C.txt1}}>Semana leve automática</div><div style={{fontSize:9,color:C.txt3}}>Reduz carga 40% ao detectar sobrecarga</div></div></div>
        <div onClick={()=>setLeve(!leve)} style={{width:36,height:21,borderRadius:999,background:leve?C.blue:C.bg3,display:"flex",alignItems:"center",padding:2,cursor:"pointer",transition:"all .2s"}}><div style={{width:17,height:17,borderRadius:"50%",background:"white",marginLeft:leve?15:0,transition:"margin .2s"}}/></div>
      </div>
      {!aiTxt?<button style={{...s.btn(),width:"100%",opacity:load?.7:1}} onClick={gerar} disabled={load}><span style={s.row}><Ic n="sparkles" sz={12} color="#0A0A0A"/>{load?"Gerando...":"Gerar relatório semanal com IA"}</span></button>:(
        <div style={s.card({background:C.pinkDim,border:`0.5px solid ${C.pink}28`})}><div style={s.row}><Ic n="heart" sz={15} color={C.pink} style={{flexShrink:0}}/><div style={{fontSize:12,color:C.txt1,lineHeight:1.7}}>{aiTxt}</div></div></div>
      )}
    </div>
  );
}

// ── PERSISTÊNCIA ─────────────────────────────────────────────────────────────
function usePersist(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const stored = localStorage.getItem("focototal_"+key);
      return stored ? JSON.parse(stored) : initial;
    } catch { return initial; }
  });
  function set(v) {
    const next = typeof v === "function" ? v(val) : v;
    setVal(next);
    try { localStorage.setItem("focototal_"+key, JSON.stringify(next)); } catch {}
  }
  return [val, set];
}

export default function App() {
  const [page,setPage]=useState("home");
  const [materias,setMaterias]=usePersist("materias",[]);
  const [diag,setDiag]=usePersist("diag",null);
  const [plano,setPlano]=usePersist("plano",null);
  const [fcs,setFcs]=usePersist("fcs",[]);
  const [hist,setHist]=usePersist("hist",[]);
  const [streak,setStreak]=usePersist("streak",0);
  const [xp,setXp]=usePersist("xp",0);
  const [metodos,setMetodos]=usePersist("metodos",["spaced","active","interleaving"]);
  const [concurso,setConcurso]=usePersist("concurso","ENEM");
  const addH = r => { setHist(p=>[...p,r]); setXp(x=>x+(r.acertou?10:2)); };
  const titles={home:"Painel principal",config:"Chave API & Backend",metodos:"Métodos de estudo",edital:"Edital & Matérias",diagnostico:"Diagnóstico inicial",tutor:"Tutor IA",plano:"Plano dinâmico",flashcards:"Flashcards",simulado:"Simulado adaptativo",erros:"Análise de erros",prova:"Modo prova cronometrado",streak:"Streak & Missões",grupo:"Grupo & Ranking",saude:"Saúde do estudo"};
  const st={materias,diag,plano,fcs,hist,streak};

  return (
    <div style={s.shell}>
      <Sidebar page={page} setPage={setPage}/>
      <div style={s.main}>
        <div style={s.tb}>
          <span style={{fontSize:13,fontWeight:500,color:C.txt1}}>{titles[page]}</span>
          <div style={s.row}>
            <span style={{fontSize:10,color:C.txt3}}>🔥 {streak}d · ⭐ {xp} XP</span>
            <button onClick={()=>{if(window.confirm("Apagar todos os dados salvos?")){Object.keys(localStorage).filter(k=>k.startsWith("focototal_")).forEach(k=>localStorage.removeItem(k));window.location.reload();}}} style={{background:"none",border:"none",cursor:"pointer",fontSize:10,color:C.txt3,padding:0}} title="Limpar dados">⟳</button>
            <span style={s.bdg(C.acc,C.accDim2)}>47 dias · {concurso}</span>
            {!localStorage.getItem("focototal_apikey")&&!localStorage.getItem("focototal_backend")&&!localStorage.getItem("focototal_geminikey")&&<span onClick={()=>setPage("config")} style={{...s.bdg(C.red,C.redDim),cursor:"pointer"}} title="Configurar chave da API">⚠️ Sem chave API</span>}
          </div>
        </div>
        <div style={{...s.con,display:page==="tutor"?"flex":"block",flexDirection:"column"}}>
          {page==="home"&&<Home setPage={setPage} st={{materias,diagnostico:diag,plano,flashcards:fcs,historico:hist,streak}}/>}
          {page==="metodos"&&<MetodosEstudo metodos={metodos} setMetodos={setMetodos} concurso={concurso} setConcurso={setConcurso}/>}
          {page==="edital"&&<Edital materias={materias} setMaterias={setMaterias}/>}
          {page==="diagnostico"&&<Diagnostico diag={diag} setDiag={setDiag}/>}
          {page==="tutor"&&<TutorIA diag={diag} metodos={metodos} concurso={concurso} erros={hist.filter(h=>!h.acertou)}/>}
          {page==="plano"&&<PlanoDinamico diag={diag} plano={plano} setPlano={setPlano} metodos={metodos} concurso={concurso}/>}
          {page==="flashcards"&&<Flashcards fcs={fcs} setFcs={setFcs} materias={materias}/>}
          {page==="simulado"&&<Simulado addH={addH}/>}
          {page==="erros"&&<AnaliseErros hist={hist}/>}
          {page==="prova"&&<ModoProva addH={addH}/>}
          {page==="streak"&&<StreakMissoes streak={streak} setStreak={setStreak} xp={xp} setXp={setXp}/>}
          {page==="grupo"&&<GrupoRanking/>}
          {page==="saude"&&<SaudeEstudo/>}
          {page==="config"&&<ConfigAPI/>}
        </div>
      </div>
    </div>
  );
}
