/* ════════════════════════════════════════════════════════════════════
   KEKULAWALA ADVERTISING — interactive front-end
   ════════════════════════════════════════════════════════════════════ */
import { SITE } from "./config.js";
import { saveInquiry, saveReview, subscribeReviews, backendMode } from "./firebase.js";

/* ─────────────────────────── DATA ─────────────────────────── */
const SERVICES = [
  { id:"hoarding", icon:"🏗️", c1:"#0b5cad", c2:"#2fd4ff", title:"Large Hoardings & Billboards",
    desc:"Highway and rooftop hoardings engineered to dominate the skyline — and survive every monsoon.",
    points:["Galvanised steel structures with engineering certification","Flex-face, ACP or back-lit finishes","Prime roadside locations & council approvals handled","12 ft to 60 ft+ custom sizes"],
    rate:2200, unit:"sq. ft.", priceLabel:"LKR 2,200 / sq. ft." },
  { id:"led", icon:"💡", c1:"#f59e0b", c2:"#ff8a1e", title:"LED & 3D Sign Boards",
    desc:"Glowing 3D acrylic, stainless-steel and neon-flex letters that keep selling long after dark.",
    points:["Front-lit, back-lit (halo) & edge-lit options","Branded Samsung / high-efficiency LED modules","Sinhala, Tamil & English custom lettering","Weatherproof IP65 outdoor builds"],
    rate:5500, unit:"sq. ft.", priceLabel:"LKR 5,500 / sq. ft." },
  { id:"printing", icon:"🖨️", c1:"#db2777", c2:"#f43fb0", title:"Digital Printing",
    desc:"In-house 6 ft & 10 ft wide-format machines printing flex, sticker, one-way vision, fabric and more.",
    points:["Same-day printing for standard banners","Vehicle wraps & shop-front one-way vision","UV-stable outdoor inks — colours that last","Cut-to-shape stickers & labels"],
    rate:450, unit:"sq. ft.", priceLabel:"LKR 450 / sq. ft." },
  { id:"cnc", icon:"🧭", c1:"#0891b2", c2:"#22d3ee", title:"CNC Routing Works",
    desc:"Computer-precise cutting of ACP, acrylic, MDF, plywood and foam board — any shape, every time.",
    points:["3D letters & logo cut-outs","Decorative jali / lattice panels","ACP cladding & fascia fabrication","Bulk production with perfect repeatability"],
    rate:1800, unit:"sq. ft.", priceLabel:"LKR 1,800 / sq. ft." },
  { id:"laser", icon:"✨", c1:"#7c3aed", c2:"#c084fc", title:"Laser Cutting & Engraving",
    desc:"Feather-fine engraving on acrylic, wood, rubber, plastic and stainless steel.",
    points:["Name boards, plaques & awards","Rubber stamps & seals while you wait","Personalised gifts & souvenirs","Intricate logo detailing down to 0.1 mm"],
    rate:2500, unit:"job", priceLabel:"LKR 2,500 / job" },
  { id:"offset", icon:"📰", c1:"#0f766e", c2:"#2dd4bf", title:"Printing — Offset & Digital",
    desc:"Leaflets, brochures, packaging, books and business stationery at true commercial scale.",
    points:["Flyers, handbills & posters in bulk","Boxes, bags & product packaging","Invoice books, letterheads & cards","Full pre-press design studio"],
    rate:95, unit:"A4 sheet", priceLabel:"LKR 95 / A4 sheet" },
  { id:"fab", icon:"🔩", c1:"#b45309", c2:"#fbbf24", title:"Steel Fabrication",
    desc:"The bones behind every great sign — welded, galvanised and powder-coated in our own yard.",
    points:["Pylon & totem sign structures","Canopies, frames & display stands","On-site welding & erection crews","Structural safety guaranteed"],
    rate:1600, unit:"sq. ft.", priceLabel:"LKR 1,600 / sq. ft." },
  { id:"interior", icon:"🛋️", c1:"#15803d", c2:"#a3e635", title:"Interior Design & Decorating",
    desc:"Reception walls, retail branding and full interior fit-outs that turn visitors into fans.",
    points:["3D logo walls & feature panels","Retail & showroom branding","Wall graphics, frosting & wayfinding","Turn-key design-to-install service"],
    rate:3400, unit:"sq. ft.", priceLabel:"LKR 3,400 / sq. ft." },
];

const EST_PRODUCTS = [
  { id:"flex",  label:"Flex Banner Board",        rate:850  },
  { id:"acp",   label:"ACP Fascia Board",         rate:3200 },
  { id:"acrylic", label:"3D Acrylic Letters",     rate:2800 },
  { id:"led3d", label:"3D LED Sign Board",        rate:5500 },
  { id:"hoard", label:"Outdoor Hoarding",         rate:2200 },
  { id:"pylon", label:"Pylon / Totem Sign",       rate:4800 },
  { id:"vehicle", label:"Vehicle Branding",       rate:1800 },
  { id:"neon",  label:"Neon-Flex Sign",           rate:6200 },
];

const WORKS = [
  { img:"city-center-night.jpg",  title:"City Center Super",        cat:"led",      tag:"LED Signage",  desc:"Illuminated storefront channel letters — night view" },
  { img:"kandyan-reach.jpg",      title:"The Kandyan Reach Hotel",  cat:"outdoor",  tag:"Hotel Pylon",  desc:"Premium pylon with CNC-cut brass-finish panel" },
  { img:"matrixx.jpg",            title:"MATRIXX Phones",           cat:"interior", tag:"Interior 3D",  desc:"Blue LED 3D letters on showroom display wall" },
  { img:"cambridge-college.jpg",  title:"Cambridge College",        cat:"outdoor",  tag:"Projecting Sign", desc:"Double-sided projecting sign for an education institute" },
  { img:"westernro-coffee.jpg",   title:"Westernro by Ransiri",     cat:"led",      tag:"LED Signage",  desc:"Halo-lit coffee-house roundel & lettering" },
  { img:"healing-heaven.jpg",     title:"Healing Heaven Salon",     cat:"interior", tag:"Interior 3D",  desc:"3D acrylic wall branding on timber slats" },
  { img:"charcoal-restaurant.jpg",title:"Charcoal Restaurant",      cat:"led",      tag:"Restaurant",   desc:"Illuminated theme signage & roadside roundel" },
  { img:"designhill.jpg",         title:"Designhill Retail Store",  cat:"outdoor",  tag:"Store Fascia", desc:"Full storefront fascia with 3D lettering" },
  { img:"eco-polypackaging.jpg",  title:"ECO PolyPackaging (Pvt) Ltd", cat:"outdoor", tag:"Industrial", desc:"Large-format industrial fascia board" },
  { img:"the-traveller.jpg",      title:"The Traveller",            cat:"led",      tag:"Tower Sign",   desc:"Towering multi-service vertical LED sign" },
  { img:"bakers-restaurant.jpg",  title:"Bakers & Restaurant",      cat:"led",      tag:"LED Signage",  desc:"Illuminated Sinhala 3D letters with light-boxes" },
  { img:"city-center-pylon.jpg",  title:"City Center BK (Pvt) Ltd", cat:"outdoor",  tag:"Pylon",        desc:"Roadside pylon with trilingual branding" },
  { img:"crystal-stone.jpg",      title:"Crystal Stone · Jaquar",   cat:"outdoor",  tag:"Dual Pylon",   desc:"Dual-brand outdoor pylon & fabrication" },
  { img:"neon-anniversary.jpg",   title:"Neon Anniversary Sign",    cat:"led",      tag:"Neon-Flex",    desc:"Custom neon-flex celebration signage" },
  { img:"digital-printing.jpg",   title:"Wide-Format Printing",     cat:"print",    tag:"Printing",     desc:"6 ft & 10 ft in-house digital printers" },
  { img:"laser-cnc.jpg",          title:"Laser & CNC Studio",       cat:"print",    tag:"Laser · CNC",  desc:"Acrylic · wood · rubber · steel · foam board" },
];

const SEED_REVIEWS = [
  { name:"Kasun Bandara", business:"City Center, Kurunegala", rating:5, createdAt:"2025-11-18",
    text:"Our storefront LED letters were designed, fabricated and installed in under a week. Footfall noticeably increased — the board glows beautifully even from the main road at night." },
  { name:"Nadeesha Perera", business:"Healing Heaven Salon", rating:5, createdAt:"2025-10-02",
    text:"They understood my salon's calm, premium feel perfectly. The 3D wall logo is now the most photographed corner of the salon. Worth every rupee!" },
  { name:"Mohamed Rizvi", business:"MATRIXX Phones & Accessories", rating:5, createdAt:"2025-09-14",
    text:"Third branch board done by Kekulawala. Same quality, same sharp finish every single time. Their after-sales service is the best I've experienced from any supplier." },
  { name:"Sunil Jayasuriya", business:"The Kandyan Reach Hotel", rating:5, createdAt:"2025-08-27",
    text:"A truly professional team — site survey, 3D visuals, council paperwork and a flawless installation at height. Our hotel pylon looks stunning day and night." },
  { name:"Tharindu Weerasinghe", business:"Charcoal Restaurant", rating:5, createdAt:"2025-07-19",
    text:"From the flaming logo wall to the roadside sign, they built our whole identity. Travellers spot us from a kilometre away now. Highly recommended!" },
  { name:"Priya Nair", business:"Cambridge College", rating:4, createdAt:"2025-06-08",
    text:"Clear communication, fair pricing and a clean finish. The projecting sign has survived two monsoon seasons without a single issue." },
  { name:"Ruwan Dissanayake", business:"ECO PolyPackaging (Pvt) Ltd", rating:5, createdAt:"2025-05-21",
    text:"Huge factory fascia completed ahead of schedule. Their fabrication quality and safety standards during installation were impressive." },
  { name:"Sanduni Fernando", business:"Designhill, Kurunegala", rating:5, createdAt:"2025-04-11",
    text:"The design team gave us three concepts within two days. The final board elevated our whole store image — customers mention it all the time!" },
  { name:"Chamara Silva", business:"Westernro Coffee", rating:5, createdAt:"2025-03-05",
    text:"Our glowing coffee-cup sign has become a local landmark. Kekulawala handled everything, even the tricky wall mounting. Five stars, easily." },
];

const HERO_SHOWCASE = [
  { img:"city-center-night.jpg", title:"City Center — LED Storefront", sub:"Illuminated 3D letters" },
  { img:"kandyan-reach.jpg",     title:"The Kandyan Reach",            sub:"Hotel pylon signage" },
  { img:"westernro-coffee.jpg",  title:"Westernro Coffee",             sub:"Halo-lit LED roundel" },
  { img:"the-traveller.jpg",     title:"The Traveller",                sub:"Vertical tower sign" },
  { img:"charcoal-restaurant.jpg", title:"Charcoal Restaurant",        sub:"Theme branding" },
];

/* ─────────────────────────── UTILS ─────────────────────────── */
const $  = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
const fmtLKR = n => "LKR " + Math.round(n).toLocaleString("en-LK");
const esc = s => String(s).replace(/[&<>"']/g, m => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function toast(msg, type="success"){
  const t = document.createElement("div");
  t.className = `toast ${type}`; t.innerHTML = msg;
  $("#toastWrap").appendChild(t);
  setTimeout(()=>{ t.style.opacity="0"; t.style.transition=".4s"; setTimeout(()=>t.remove(), 420); }, 4600);
}

/* ─────────────────────── SITE INFO WIRING ─────────────────────── */
function wireSiteInfo(){
  const tel = `tel:${SITE.phoneLink}`, mob = `tel:+${SITE.whatsapp}`;
  const cp = $("#cPhone");  if(cp){ cp.textContent = SITE.phoneDisplay; cp.href = tel; }
  const cm = $("#cMobile"); if(cm){ cm.textContent = SITE.mobileDisplay; cm.href = mob; }
  const fp = $("#fPhone");  if(fp){ fp.textContent = SITE.phoneDisplay; fp.href = tel; }
  const ce = $("#cEmail");  if(ce){ ce.textContent = SITE.email; ce.href = `mailto:${SITE.email}`; }
  const cs = $("#cSales");  if(cs){ cs.textContent = SITE.salesEmail; cs.href = `mailto:${SITE.salesEmail}`; }
  const ca = $("#cAddress"); if(ca) ca.innerHTML = SITE.addressHTML;
  const fa = $("#fAddress"); if(fa) fa.innerHTML = SITE.addressShortHTML;
  const wa = $("#whatsappBtn");
  if(wa) wa.href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hello Kekulawala Advertising, I'd like a quotation.")}`;
  const yrs = new Date().getFullYear() - 1982;
  const yc = $("#yearsCount"); if(yc) yc.dataset.count = yrs;
  const sy = $("#sinceYears"); if(sy) sy.textContent = yrs;
  $("#year").textContent = new Date().getFullYear();
  const socialMap = { Facebook:SITE.socials.facebook, Instagram:SITE.socials.instagram, YouTube:SITE.socials.youtube, TikTok:SITE.socials.tiktok };
  $$(".socials a").forEach(a => { const u = socialMap[a.getAttribute("aria-label")]; if(u){ a.href=u; a.target="_blank"; a.rel="noopener"; } });
}

/* ─────────────────────── PRELOADER / HEADER ─────────────────────── */
function initChrome(){
  let p = 0;
  const fill = $("#preloaderFill");
  const tick = setInterval(()=>{ p = Math.min(p + Math.random()*26, 92); fill.style.width = p + "%"; }, 160);
  const done = () => { clearInterval(tick); fill.style.width = "100%";
    setTimeout(()=> $("#preloader").classList.add("done"), 260); };
  if (document.readyState === "complete") done(); else addEventListener("load", done);
  setTimeout(done, 3200); // never trap the user

  const header = $("#siteHeader"), prog = $("#scrollProgress"), toTop = $("#toTop");
  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle("scrolled", y > 24);
    prog.style.width = (h > 0 ? (y/h)*100 : 0) + "%";
    toTop.classList.toggle("show", y > 700);
  };
  addEventListener("scroll", onScroll, { passive:true }); onScroll();
  toTop.addEventListener("click", ()=> scrollTo({ top:0, behavior:"smooth" }));

  const menuBtn = $("#menuBtn"), mobile = $("#mobileMenu");
  menuBtn.addEventListener("click", ()=>{
    const open = mobile.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open);
  });
  $$("#mobileMenu a").forEach(a => a.addEventListener("click", ()=>{
    mobile.classList.remove("open"); menuBtn.classList.remove("open");
  }));

  // scroll-spy
  const spy = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        $$(".nav-link").forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#"+e.target.id));
      }
    });
  }, { rootMargin:"-42% 0px -52% 0px" });
  $$("section[id]").forEach(s => spy.observe(s));

  // reveal on scroll
  const ro = new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{ if(e.isIntersecting){ setTimeout(()=>e.target.classList.add("in"), Math.min(i*70,350)); ro.unobserve(e.target); } });
  }, { threshold:.12 });
  $$(".reveal").forEach(el => ro.observe(el));
}

/* ─────────────────────── COUNTERS ─────────────────────── */
function initCounters(){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, t0 = performance.now(), dur = 1800;
      const step = t => {
        const k = Math.min((t - t0)/dur, 1), ease = 1 - Math.pow(1-k, 3);
        el.textContent = Math.round(target * ease).toLocaleString("en-LK");
        if(k < 1) requestAnimationFrame(step);
      };
      reducedMotion ? el.textContent = target.toLocaleString("en-LK") : requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold:.5 });
  $$(".count").forEach(el => io.observe(el));
}

/* ─────────────────────── HERO CANVAS (CMYK droplets) ─────────────────────── */
function initCanvas(){
  if(reducedMotion) return;
  const cv = $("#heroCanvas"), ctx = cv.getContext("2d");
  const COLORS = ["#2fd4ff","#1e88e5","#22c55e","#a3e635","#ff8a1e","#f43fb0","#ffc400"];
  let W, H, drops = [], mouse = { x:-999, y:-999 };
  const resize = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; };
  resize(); addEventListener("resize", resize);
  const N = Math.min(70, Math.max(34, innerWidth/22));
  for(let i=0;i<N;i++) drops.push({
    x:Math.random(), y:Math.random(), r:1.5+Math.random()*3.6,
    vx:(Math.random()-.5)*.00045, vy:-.00025-Math.random()*.0006,
    c:COLORS[i%COLORS.length], a:.25+Math.random()*.55,
  });
  cv.parentElement.addEventListener("pointermove", e=>{
    const r = cv.getBoundingClientRect();
    mouse = { x:(e.clientX-r.left)/W, y:(e.clientY-r.top)/H };
  });
  (function loop(){
    ctx.clearRect(0,0,W,H);
    for(const d of drops){
      d.x += d.vx; d.y += d.vy;
      const dx = d.x-mouse.x, dy = d.y-mouse.y, dist = Math.hypot(dx,dy);
      if(dist < .13){ d.x += dx*.012; d.y += dy*.012; }
      if(d.y < -.02){ d.y = 1.02; d.x = Math.random(); }
      if(d.x < -.02) d.x = 1.02; if(d.x > 1.02) d.x = -.02;
      ctx.globalAlpha = d.a; ctx.fillStyle = d.c;
      ctx.shadowColor = d.c; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(d.x*W, d.y*H, d.r, 0, Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    requestAnimationFrame(loop);
  })();
}

/* ─────────────────────── HERO SHOWCASE ROTATOR ─────────────────────── */
function initShowcase(){
  const img = $("#heroShowcase"), t = $("#heroShowcaseTitle"), s = $("#heroShowcaseSub");
  if(!img || reducedMotion) return;
  let i = 0;
  HERO_SHOWCASE.forEach(h => { const im = new Image(); im.src = `assets/img/portfolio/${h.img}`; });
  setInterval(()=>{
    i = (i+1) % HERO_SHOWCASE.length;
    img.style.opacity = 0;
    setTimeout(()=>{
      img.src = `assets/img/portfolio/${HERO_SHOWCASE[i].img}`;
      t.textContent = HERO_SHOWCASE[i].title; s.textContent = HERO_SHOWCASE[i].sub;
      img.style.opacity = 1;
    }, 620);
  }, 4200);
}

/* ─────────────────────── SERVICES ─────────────────────── */
let modalService = null;
function initServices(){
  const grid = $("#serviceGrid");
  grid.innerHTML = SERVICES.map((s,i)=>`
    <article class="service-card reveal" data-id="${s.id}" tabindex="0" role="button" aria-haspopup="dialog"
             aria-label="${esc(s.title)} — view details" style="transition-delay:${i*40}ms">
      <div class="service-ico" style="--c1:${s.c1};--c2:${s.c2};background:linear-gradient(140deg,${s.c1},${s.c2})">${s.icon}</div>
      <h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p>
      <div class="service-meta">
        <span class="service-price"><small>FROM</small>${esc(s.priceLabel)}</span>
        <span class="service-go">Details →</span>
      </div>
    </article>`).join("");

  // re-observe new reveals
  const ro = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); ro.unobserve(e.target);} }),{threshold:.1});
  $$(".service-card").forEach(c=>{
    ro.observe(c);
    c.addEventListener("click", ()=> openService(c.dataset.id));
    c.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); openService(c.dataset.id);} });
    // spotlight + tilt
    c.addEventListener("pointermove", e=>{
      const r = c.getBoundingClientRect(), x = (e.clientX-r.left)/r.width, y = (e.clientY-r.top)/r.height;
      c.style.setProperty("--mx", x*100+"%"); c.style.setProperty("--my", y*100+"%");
      if(!reducedMotion) c.style.transform = `perspective(750px) rotateX(${(0.5-y)*7}deg) rotateY(${(x-0.5)*7}deg) translateY(-4px)`;
    });
    c.addEventListener("pointerleave", ()=> c.style.transform = "");
  });

  const modal = $("#serviceModal");
  $$("[data-close]", modal).forEach(b => b.addEventListener("click", closeService));
  addEventListener("keydown", e=>{ if(e.key==="Escape"){ closeService(); closeLightbox(); } });
  $("#mEstimateBtn").addEventListener("click", ()=>{
    closeService();
    const map = { hoarding:"hoard", led:"led3d", printing:"flex", cnc:"acrylic", laser:"acrylic", offset:"flex", fab:"hoard", interior:"acrylic" };
    if(modalService) selectEstProduct(map[modalService.id] || "acp");
    document.querySelector("#estimator").scrollIntoView({ behavior:"smooth" });
  });
}
function openService(id){
  const s = SERVICES.find(x=>x.id===id); if(!s) return;
  modalService = s;
  const ic = $("#mIcon"); ic.textContent = s.icon;
  ic.style.background = `linear-gradient(140deg,${s.c1},${s.c2})`;
  $("#mTitle").textContent = s.title;
  $("#mDesc").textContent = s.desc;
  $("#mPoints").innerHTML = s.points.map(p=>`<li>${esc(p)}</li>`).join("");
  $("#mPrice").textContent = s.priceLabel;
  const m = $("#serviceModal"); m.classList.add("open"); m.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeService(){
  const m = $("#serviceModal"); if(!m.classList.contains("open")) return;
  m.classList.remove("open"); m.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}

/* ─────────────────────── ESTIMATOR ─────────────────────── */
let est = { product: EST_PRODUCTS[3], qty: 1 };
function selectEstProduct(id){
  est.product = EST_PRODUCTS.find(p=>p.id===id) || EST_PRODUCTS[0];
  $$(".est-chip").forEach(c => c.classList.toggle("active", c.dataset.id === est.product.id));
  calcEstimate();
}
function sliderFill(input){
  const k = (input.value - input.min) / (input.max - input.min) * 100;
  input.style.setProperty("--fill", k + "%");
}
function calcEstimate(){
  const w = +$("#estWidth").value, h = +$("#estHeight").value;
  const light = $("#estLight").checked, install = $("#estInstall").checked, dbl = $("#estDouble").checked;
  const area = Math.max(w*h, 4); // 4 sq ft minimum charge
  let unit = est.product.rate;
  const lines = [[`${est.product.label} · ${area.toLocaleString()} sq. ft.`, unit*area]];
  let total = unit*area;
  if(light){ lines.push(["LED illumination (+45%)", total*.45]); total *= 1.45; }
  if(dbl){ const base = unit*area; lines.push(["Double-sided (+70% of board)", base*.7]); total += base*.7; }
  if(install){ lines.push(["Professional installation (+15%)", total*.15]); total *= 1.15; }
  let discount = 0;
  if(est.qty >= 10) discount = .15; else if(est.qty >= 5) discount = .10; else if(est.qty >= 3) discount = .05;
  const grand = total * est.qty * (1-discount);
  if(discount) lines.push([`Bulk discount ×${est.qty} (−${discount*100}%)`, -(total*est.qty*discount)]);
  if(est.qty > 1 && !discount) lines.push([`Quantity × ${est.qty}`, total*(est.qty-1)]);

  $("#estWidthOut").textContent = `${w} ft`;
  $("#estHeightOut").textContent = `${h} ft`;
  $("#estQtyOut").textContent = est.qty;

  const prev = $("#sizePreview");
  const maxW = Math.min(prev.parentElement.clientWidth - 40, 440);
  const pw = Math.max(70, Math.min(maxW, w*11));
  prev.style.width = pw + "px";
  prev.style.height = Math.max(34, Math.min(180, pw*(h/w))) + "px";
  $("#sizePreviewText").textContent = `${w} × ${h} ft`;

  animatePrice(grand);
  $("#estRange").textContent = `Typical range ${fmtLKR(grand*.92)} – ${fmtLKR(grand*1.12)} · ${area.toLocaleString()} sq. ft. per board`;
  $("#estBreakdown").innerHTML = lines.map(([k,v])=>`<li><span>${k}</span><b>${v<0?"−":""}${fmtLKR(Math.abs(v))}</b></li>`).join("");
  est.last = { w, h, light, install, dbl, area, grand };
}
let priceAnim;
function animatePrice(to){
  const el = $("#estPrice");
  const from = parseFloat(el.dataset.v || 0), t0 = performance.now();
  cancelAnimationFrame(priceAnim);
  const step = t => {
    const k = Math.min((t-t0)/450, 1);
    const v = from + (to-from)*(1-Math.pow(1-k,3));
    el.textContent = fmtLKR(v); el.dataset.v = v;
    if(k<1) priceAnim = requestAnimationFrame(step);
  };
  reducedMotion ? (el.textContent = fmtLKR(to)) : requestAnimationFrame(step);
}
function initEstimator(){
  $("#estServices").innerHTML = EST_PRODUCTS.map(p=>`<button type="button" class="est-chip" data-id="${p.id}">${p.label}</button>`).join("");
  $$(".est-chip").forEach(c => c.addEventListener("click", ()=> selectEstProduct(c.dataset.id)));
  ["estWidth","estHeight"].forEach(id => { const el = $("#"+id); sliderFill(el);
    el.addEventListener("input", ()=>{ sliderFill(el); calcEstimate(); }); });
  ["estLight","estInstall","estDouble"].forEach(id => $("#"+id).addEventListener("change", calcEstimate));
  $("#qtyMinus").addEventListener("click", ()=>{ est.qty = Math.max(1, est.qty-1); calcEstimate(); });
  $("#qtyPlus").addEventListener("click", ()=>{ est.qty = Math.min(50, est.qty+1); calcEstimate(); });
  $("#estSendBtn").addEventListener("click", ()=>{
    const L = est.last || {};
    const msg = `Hello Kekulawala team, I used your online estimator:\n• Product: ${est.product.label}\n• Size: ${L.w} × ${L.h} ft (${L.area} sq. ft.)\n• LED illumination: ${L.light?"Yes":"No"} · Double-sided: ${L.dbl?"Yes":"No"} · Installation: ${L.install?"Yes":"No"}\n• Quantity: ${est.qty}\n• Estimated budget: ${fmtLKR(L.grand||0)}\nPlease send me an exact quotation.`;
    $("#qMsg").value = msg;
    const sel = $("#qService");
    [...sel.options].forEach(o => { if(o.text.toLowerCase().includes("led")) sel.value = o.value || o.text; });
    document.querySelector("#contact").scrollIntoView({ behavior:"smooth" });
    toast("✅ Estimate copied into the quote form — just add your name & number!");
    setTimeout(()=> $("#qName").focus({ preventScroll:true }), 900);
  });
  selectEstProduct("led3d");
}

/* ─────────────────────── PORTFOLIO + LIGHTBOX ─────────────────────── */
let visibleWorks = WORKS, lbIndex = 0;
function renderWorks(filter="all"){
  visibleWorks = filter==="all" ? WORKS : WORKS.filter(w=>w.cat===filter);
  $("#portfolioGrid").innerHTML = visibleWorks.map((w,i)=>`
    <figure class="work-card" data-i="${i}" style="animation-delay:${i*45}ms" tabindex="0" role="button" aria-label="View ${esc(w.title)}">
      <span class="work-tag">${esc(w.tag)}</span>
      <img src="assets/img/portfolio/${w.img}" alt="${esc(w.title)} — ${esc(w.desc)}" loading="lazy">
      <figcaption><h3>${esc(w.title)}</h3><p>${esc(w.desc)}</p></figcaption>
    </figure>`).join("");
  $$(".work-card").forEach(c=>{
    c.addEventListener("click", ()=> openLightbox(+c.dataset.i));
    c.addEventListener("keydown", e=>{ if(e.key==="Enter") openLightbox(+c.dataset.i); });
  });
}
function openLightbox(i){
  lbIndex = i; paintLightbox();
  const lb = $("#lightbox"); lb.classList.add("open"); lb.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeLightbox(){
  const lb = $("#lightbox"); if(!lb.classList.contains("open")) return;
  lb.classList.remove("open"); lb.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
function paintLightbox(){
  const w = visibleWorks[lbIndex]; if(!w) return;
  const img = $("#lbImg");
  img.src = `assets/img/portfolio/${w.img}`; img.alt = w.title;
  $("#lbTitle").textContent = w.title;
  $("#lbDesc").textContent = w.desc;
  $("#lbCount").textContent = `${lbIndex+1} / ${visibleWorks.length}`;
}
function initPortfolio(){
  renderWorks();
  $$("#filterRow .filter-chip").forEach(chip => chip.addEventListener("click", ()=>{
    $$("#filterRow .filter-chip").forEach(c=>c.classList.remove("active"));
    chip.classList.add("active");
    renderWorks(chip.dataset.filter);
  }));
  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", ()=>{ lbIndex = (lbIndex-1+visibleWorks.length)%visibleWorks.length; paintLightbox(); });
  $("#lbNext").addEventListener("click", ()=>{ lbIndex = (lbIndex+1)%visibleWorks.length; paintLightbox(); });
  $("#lightbox").addEventListener("click", e=>{ if(e.target.id==="lightbox") closeLightbox(); });
  addEventListener("keydown", e=>{
    if(!$("#lightbox").classList.contains("open")) return;
    if(e.key==="ArrowLeft") $("#lbPrev").click();
    if(e.key==="ArrowRight") $("#lbNext").click();
  });
  // touch swipe
  let tx = null;
  const lb = $("#lightbox");
  lb.addEventListener("touchstart", e=> tx = e.touches[0].clientX, { passive:true });
  lb.addEventListener("touchend", e=>{
    if(tx===null) return;
    const d = e.changedTouches[0].clientX - tx;
    if(Math.abs(d) > 46) (d < 0 ? $("#lbNext") : $("#lbPrev")).click();
    tx = null;
  }, { passive:true });
}

/* ─────────────────────── REVIEWS ─────────────────────── */
const AV_COLORS = ["#2fd4ff","#22c55e","#ffc400","#ff8a1e","#f43fb0","#a3e635","#7dd3fc","#fda4af"];
const stars = n => "★".repeat(n) + "☆".repeat(5-n);
let reviewPage = 0, reviewTimer = null, allReviews = [...SEED_REVIEWS];
const perPage = () => innerWidth <= 560 ? 1 : innerWidth <= 1080 ? 2 : 3;

function paintReviews(){
  const track = $("#reviewTrack"), dots = $("#reviewDots");
  const pp = perPage(), pages = [];
  for(let i=0;i<allReviews.length;i+=pp) pages.push(allReviews.slice(i,i+pp));
  reviewPage = Math.min(reviewPage, Math.max(pages.length-1,0));
  track.innerHTML = pages.map(pg=>`<div class="review-page">${pg.map(r=>{
    const initials = r.name.trim().split(/\s+/).map(x=>x[0]).slice(0,2).join("").toUpperCase();
    const col = AV_COLORS[[...r.name].reduce((a,c)=>a+c.charCodeAt(0),0) % AV_COLORS.length];
    const date = r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-GB",{month:"short",year:"numeric"}) : "";
    return `<article class="review-card">
      <div class="stars" aria-label="${r.rating} out of 5 stars">${stars(r.rating)}</div>
      <blockquote>“${esc(r.text)}”</blockquote>
      <div class="review-who">
        <span class="avatar" style="background:${col}">${esc(initials)}</span>
        <span><strong>${esc(r.name)}</strong><small>${esc(r.business||"Verified customer")}</small></span>
        <span class="review-date">${date}</span>
      </div></article>`;
  }).join("")}</div>`).join("");
  track.style.transform = `translateX(-${reviewPage*100}%)`;
  dots.innerHTML = pages.map((_,i)=>`<button class="${i===reviewPage?"active":""}" aria-label="Go to review page ${i+1}"></button>`).join("");
  $$("button", dots).forEach((d,i)=> d.addEventListener("click", ()=> goReviewPage(i)));

  // summary
  const counts = [0,0,0,0,0];
  allReviews.forEach(r=> counts[r.rating-1]++);
  const total = allReviews.length || 1;
  const avg = allReviews.reduce((a,r)=>a+r.rating,0)/total;
  $("#avgRating").textContent = avg.toFixed(1);
  $("#avgStars").textContent = stars(Math.round(avg));
  $("#reviewCount").textContent = `Based on ${Math.max(total, 2300).toLocaleString()}+ customer reviews`;
  $("#ratingBars").innerHTML = [5,4,3,2,1].map(s=>{
    const pct = Math.round(counts[s-1]/total*100);
    return `<div class="bar-row"><span>${s} ★</span><span class="bar"><i style="width:${pct}%"></i></span><span>${pct}%</span></div>`;
  }).join("");
}
function goReviewPage(i){
  const pages = Math.ceil(allReviews.length / perPage());
  reviewPage = ((i % pages) + pages) % pages;
  $("#reviewTrack").style.transform = `translateX(-${reviewPage*100}%)`;
  $$("#reviewDots button").forEach((d,j)=> d.classList.toggle("active", j===reviewPage));
  restartAutoplay();
}
function restartAutoplay(){
  clearInterval(reviewTimer);
  if(reducedMotion) return;
  reviewTimer = setInterval(()=> goReviewPage(reviewPage+1), 5500);
}
function initReviews(){
  paintReviews(); restartAutoplay();
  $("#revPrev").addEventListener("click", ()=> goReviewPage(reviewPage-1));
  $("#revNext").addEventListener("click", ()=> goReviewPage(reviewPage+1));
  $(".carousel").addEventListener("pointerenter", ()=> clearInterval(reviewTimer));
  $(".carousel").addEventListener("pointerleave", restartAutoplay);
  let rT; addEventListener("resize", ()=>{ clearTimeout(rT); rT = setTimeout(paintReviews, 200); });

  // live stream (Firebase or demo) — merges with seed showcase reviews
  subscribeReviews(rows => {
    const seen = new Set(), merged = [];
    [...rows, ...SEED_REVIEWS].forEach(r=>{
      const k = (r.name + "|" + r.text).toLowerCase();
      if(!seen.has(k)){ seen.add(k); merged.push(r); }
    });
    allReviews = merged.slice(0, 60);
    paintReviews();
  }).catch(()=>{});

  // star picker
  let picked = 5;
  const picker = $("#starPicker");
  $$("button", picker).forEach(b => b.addEventListener("click", ()=>{
    picked = +b.dataset.star;
    $$("button", picker).forEach(x => x.classList.toggle("on", +x.dataset.star <= picked));
  }));

  $("#writeReview").addEventListener("submit", async e=>{
    e.preventDefault();
    const name = $("#rvName").value.trim(), biz = $("#rvBiz").value.trim(), text = $("#rvText").value.trim();
    let ok = true;
    [["#rvName",name],["#rvText",text]].forEach(([id,v])=>{ const el=$(id); el.classList.toggle("err", !v); if(!v) ok=false; });
    if(!ok){ toast("⚠️ Please add your name and a few words about your experience.", "error"); return; }
    const btn = $("#rvSubmit"); btn.disabled = true; btn.textContent = "Publishing…";
    try{
      await saveReview({ name, business:biz, rating:picked, text });
      if(backendMode !== "firebase"){ /* demo stream already repainted via subscribeReviews */ }
      e.target.reset();
      $$("button", picker).forEach(x => x.classList.toggle("on", +x.dataset.star <= 5)); picked = 5;
      goReviewPage(0);
      toast("🎉 Thank you! Your review is now live above.");
    }catch(err){
      console.error(err);
      toast("⚠️ Could not publish right now — please try again in a moment.", "error");
    }finally{ btn.disabled = false; btn.textContent = "Publish Review"; }
  });
}

/* ─────────────────────── CONTACT FORM ─────────────────────── */
function initQuoteForm(){
  $("#quoteForm").addEventListener("submit", async e=>{
    e.preventDefault();
    const f = {
      name:    $("#qName").value.trim(),
      phone:   $("#qPhone").value.trim(),
      email:   $("#qEmail").value.trim(),
      town:    $("#qTown").value.trim(),
      service: $("#qService").value,
      budget:  $("#qBudget").value,
      message: $("#qMsg").value.trim(),
    };
    let ok = true;
    const req = [["#qName",f.name],["#qPhone",f.phone],["#qService",f.service],["#qMsg",f.message]];
    req.forEach(([id,v])=>{ const el=$(id); const bad = !v; el.classList.toggle("err", bad); if(bad) ok=false; });
    if(f.phone && !/^[+\d][\d\s-]{8,}$/.test(f.phone)){ $("#qPhone").classList.add("err"); ok=false; }
    if(f.email && !/^\S+@\S+\.\S+$/.test(f.email)){ $("#qEmail").classList.add("err"); ok=false; }
    if(!ok){ toast("⚠️ Please complete the highlighted fields so we can reply accurately.", "error"); return; }

    const btn = $("#qSubmit"); btn.disabled = true; btn.textContent = "Sending…";
    try{
      const res = await saveInquiry(f);
      e.target.reset();
      toast(`✅ <strong>Request received!</strong> Our team will call ${esc(f.phone)} shortly${res.mode==="demo" ? " (demo mode — connect Firebase to go live)" : ""}.`);
    }catch(err){
      console.error(err);
      toast(`⚠️ Something went wrong. Please WhatsApp us on ${SITE.mobileDisplay}.`, "error");
    }finally{ btn.disabled = false; btn.textContent = "Send My Request →"; }
  });
  // clear error state while typing
  $$("#quoteForm input, #quoteForm select, #quoteForm textarea, #writeReview input, #writeReview textarea")
    .forEach(el => el.addEventListener("input", ()=> el.classList.remove("err")));
}

/* ─────────────────────── MARQUEE (duplicate for seamless loop) ─────────────────────── */
function initMarquee(){
  const t = $("#marqueeTrack");
  t.innerHTML += t.innerHTML;
}

/* ─────────────────────── BOOT ─────────────────────── */
wireSiteInfo();
initChrome();
initCounters();
initCanvas();
initShowcase();
initServices();
initEstimator();
initPortfolio();
initReviews();
initQuoteForm();
initMarquee();
console.info(`%cKekulawala Advertising%c backend: ${backendMode.toUpperCase()}${backendMode==="demo" ? " — paste Firebase keys in js/config.js to go live" : ""}`,
  "font-weight:800;color:#2fd4ff", "color:#9db4d6");
