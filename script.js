const loader=document.getElementById("loader");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),600));

const navbar=document.getElementById("navbar"),topBtn=document.getElementById("topBtn");
window.addEventListener("scroll",()=>{
  navbar.classList.toggle("scrolled",scrollY>30);
  topBtn.classList.toggle("show",scrollY>500);
});
topBtn.onclick=()=>scrollTo({top:0,behavior:"smooth"});

const menuBtn=document.getElementById("menuBtn"),navMenu=document.getElementById("navMenu");
menuBtn.onclick=()=>navMenu.classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>navMenu.classList.remove("open"));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const canvas=document.getElementById("matrix"),ctx=canvas.getContext("2d");
let W,H,columns,drops;
function resizeMatrix(){W=canvas.width=innerWidth;H=canvas.height=innerHeight;columns=Math.floor(W/18);drops=Array(columns).fill(1)}
function drawMatrix(){
  ctx.fillStyle="rgba(5,8,22,.09)";ctx.fillRect(0,0,W,H);
  ctx.fillStyle="#00e5ff";ctx.font="12px monospace";
  const chars="01ABCDEF#$%";
  drops.forEach((y,i)=>{
    const ch=chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(ch,i*18,y*18);
    if(y*18>H&&Math.random()>.975)drops[i]=0;
    drops[i]++;
  });
}
resizeMatrix();addEventListener("resize",resizeMatrix);setInterval(drawMatrix,55);

const glow=document.querySelector(".cursor-glow");
addEventListener("mousemove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});

function caesar(text,shift){
  return [...text].map(ch=>{
    if(!/[a-z]/i.test(ch))return ch;
    const base=ch===ch.toUpperCase()?65:97;
    return String.fromCharCode((ch.charCodeAt(0)-base+shift+26)%26+base);
  }).join("");
}
const input=document.getElementById("cipherInput"),output=document.getElementById("cipherOutput");
function runCipher(){
  let shift=parseInt(document.getElementById("shift").value)||0;
  if(document.getElementById("operation").value==="decrypt")shift=-shift;
  output.textContent=caesar(input.value,shift)||"—";
}
document.getElementById("cipherBtn").onclick=runCipher;
input.oninput=runCipher;document.getElementById("shift").oninput=runCipher;document.getElementById("operation").onchange=runCipher;

function openAlgo(title,obj,theory,example,learning){
  document.getElementById("modalTitle").textContent=title;
  document.getElementById("modalObjective").textContent=obj;
  document.getElementById("modalTheory").textContent=theory;
  document.getElementById("modalExample").textContent=example;
  document.getElementById("modalLearning").textContent=learning;
  document.getElementById("algoModal").classList.add("open");
}
function closeAlgo(){document.getElementById("algoModal").classList.remove("open")}
document.getElementById("algoModal").addEventListener("click",e=>{if(e.target.id==="algoModal")closeAlgo()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAlgo()});
