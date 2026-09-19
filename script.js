const screens=[...document.querySelectorAll(".screen")];
const toast=document.getElementById("toast");
const startDate = new Date(); // Change this to your real relationship date.

function show(id){
  screens.forEach(s=>s.classList.toggle("active",s.id===id));
  window.scrollTo(0,0);
}
function challenge(){
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),1800);
}
document.querySelectorAll("[data-next]").forEach(btn=>{
  btn.addEventListener("click",()=>{ challenge(); show(btn.dataset.next); });
});

// Loading animation
let p=0;
const timer=setInterval(()=>{
  p+=Math.floor(Math.random()*9)+3;
  if(p>=100){p=100;clearInterval(timer);setTimeout(()=>show("letter"),550)}
  document.getElementById("progressBar").style.width=p+"%";
  document.getElementById("progressText").textContent=p+"%";
},90);

// Proposal buttons
document.getElementById("yesBtn").addEventListener("click",()=>{
  burst();
  setTimeout(()=>show("success"),500);
});
const shy=document.getElementById("shyBtn");
let shyClicks=0;
shy.addEventListener("click",()=>{
  shyClicks++;
  const messages=["Soch lo... 🥺","Itna bhi mat sharmao ❤️","Mera dil toot jayega 😭","YES dabao na! 💕","Okay... last chance? 😌"];
  document.getElementById("shyText").textContent=messages[Math.min(shyClicks-1,messages.length-1)];
  shy.style.transform=`translate(${(Math.random()*80-40)}px,${(Math.random()*40-20)}px)`;
  if(shyClicks>=4) shy.textContent="Okay YES ❤️";
});

document.getElementById("restart").addEventListener("click",()=>{
  shyClicks=0; shy.style.transform=""; shy.textContent="Maybe? 🥺";
  show("loading"); p=0;
  document.getElementById("progressBar").style.width="0%";
  clearInterval(window.restartTimer);
  window.restartTimer=setInterval(()=>{
    p+=Math.floor(Math.random()*9)+3;
    if(p>=100){p=100;clearInterval(window.restartTimer);setTimeout(()=>show("letter"),450)}
    document.getElementById("progressBar").style.width=p+"%";
    document.getElementById("progressText").textContent=p+"%";
  },90);
});

// Floating hearts / sparkles
function spawnHeart(){
  const el=document.createElement("span"); el.className="heart"; el.textContent=["♥","❤","♡","💕"][Math.floor(Math.random()*4)];
  el.style.left=Math.random()*100+"%"; el.style.fontSize=(12+Math.random()*20)+"px";
  el.style.animationDuration=(5+Math.random()*6)+"s";
  document.getElementById("hearts").appendChild(el);
  setTimeout(()=>el.remove(),12000);
}
function spawnSpark(){
  const el=document.createElement("span"); el.className="spark";
  el.style.left=Math.random()*100+"%"; el.style.top=Math.random()*100+"%";
  el.style.animation="twinkle "+(1.5+Math.random()*2)+"s ease-in-out infinite";
  document.getElementById("sparkles").appendChild(el);
}
setInterval(spawnHeart,380);
for(let i=0;i<35;i++) spawnSpark();

function burst(){
  for(let i=0;i<30;i++){
    const el=document.createElement("span"); el.className="heart"; el.textContent="♥";
    el.style.left=(45+Math.random()*10)+"%"; el.style.bottom=(35+Math.random()*15)+"%";
    el.style.animationDuration=(1.5+Math.random()*2)+"s";
    el.style.transform=`translateX(${Math.random()*240-120}px)`;
    document.getElementById("hearts").appendChild(el);
    setTimeout(()=>el.remove(),4500);
  }
}

// Counter
function updateCounter(){
  let diff=Math.max(0,Date.now()-startDate.getTime());
  const sec=Math.floor(diff/1000);
  document.getElementById("days").textContent=Math.floor(sec/86400);
  document.getElementById("hours").textContent=Math.floor(sec/3600)%24;
  document.getElementById("minutes").textContent=Math.floor(sec/60)%60;
  document.getElementById("seconds").textContent=sec%60;
}
setInterval(updateCounter,1000); updateCounter();
