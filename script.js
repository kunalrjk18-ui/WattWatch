const appliances=[
{name:"Air Conditioner",icon:"❄️",power:1.42,energy:3.10,on:true},
{name:"Refrigerator",icon:"🧊",power:.18,energy:1.21,on:true},
{name:"Ceiling Fan",icon:"🌀",power:.07,energy:.84,on:true},
{name:"Lights",icon:"💡",power:.12,energy:.62,on:true},
{name:"Desktop PC",icon:"🖥️",power:.21,energy:.73,on:true},
{name:"Television",icon:"📺",power:0,energy:.42,on:false},
{name:"Washing Machine",icon:"🧺",power:0,energy:.21,on:false},
{name:"Microwave",icon:"🍽️",power:0,energy:.07,on:false},
{name:"Water Heater",icon:"🚿",power:0,energy:.06,on:false}
];

const pages={dashboard:"Electricity Dashboard",appliances:"Appliance Monitor",analytics:"Usage Analytics",alerts:"Energy Alerts",saving:"Energy Saving Center"};
document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>showPage(b.dataset.page));
function showPage(id){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active-page"));
 document.getElementById(id).classList.add("active-page");
 document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.page===id));
 document.getElementById("pageTitle").textContent=pages[id];
 if(id==="analytics") setTimeout(()=>drawWeekly(),50);
}
function renderAppliances(){
 const box=document.getElementById("applianceGrid");
 box.innerHTML=appliances.map((a,i)=>`<article class="app-card ${a.on?"":"off"}">
 <div class="app-top"><div class="app-icon">${a.icon}</div><div class="switch" onclick="toggleApp(${i})"></div></div>
 <h3>${a.name}</h3><p>${a.on?"Currently running":"Currently off"}</p>
 <div class="powerline"><span>Power draw</span><b>${a.power.toFixed(2)} kW</b></div>
 <div class="powerline"><span>Today's energy</span><b>${a.energy.toFixed(2)} kWh</b></div>
 </article>`).join("");
}
function toggleApp(i){
 appliances[i].on=!appliances[i].on;
 appliances[i].power=appliances[i].on?(i===0?1.42:i===1?.18:i===2?.07:i===3?.12:i===4?.21:0):0;
 renderAppliances(); updateDashboard();
}
function addAppliance(){
 const name=prompt("Appliance name:");
 if(!name)return;
 appliances.push({name,icon:"🔌",power:.1,energy:0,on:true});
 renderAppliances(); updateDashboard();
}
function updateDashboard(){
 const active=appliances.filter(a=>a.on);
 const p=active.reduce((s,a)=>s+a.power,0);
 document.getElementById("power").innerHTML=p.toFixed(2)+' <small>kW</small>';
 document.getElementById("activeCount").textContent=active.length;
 const monthly=(7.26/9*30*6.8);
 document.getElementById("bill").textContent="₹"+Math.round(monthly).toLocaleString("en-IN");
}
function dismiss(btn){btn.parentElement.remove()}
function clock(){
 document.getElementById("clock").textContent=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
}
setInterval(clock,1000);clock();renderAppliances();

new Chart(document.getElementById("usageChart"),{type:"line",data:{labels:["8 AM","9","10","11","12 PM","1","2","3","4","5","6","7"],datasets:[{label:"kWh",data:[.34,.42,.48,.61,.55,.49,.58,.64,.72,.81,.94,1.08],tension:.35,borderWidth:2,pointRadius:2}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:"#edf1ef"}},x:{grid:{display:false}}}}});
new Chart(document.getElementById("applianceChart"),{type:"doughnut",data:{labels:["AC","Refrigerator","Fan","Lights","PC"],datasets:[{data:[3.1,1.21,.84,.62,.73],borderWidth:0}]},options:{cutout:"72%",plugins:{legend:{position:"bottom",labels:{boxWidth:8,font:{size:10}}}}}});

function drawWeekly(){
 if(window.weeklyDone)return;
 window.weeklyDone=true;
 new Chart(document.getElementById("weeklyChart"),{type:"bar",data:{labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],datasets:[{label:"kWh",data:[6.8,7.4,6.2,8.1,7.0,6.3,7.26],borderRadius:7}]},options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:"#edf1ef"}},x:{grid:{display:false}}}}});
}
