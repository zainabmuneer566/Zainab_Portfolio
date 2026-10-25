import {useLayoutEffect,useRef} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {ArrowUpRight} from 'lucide-react'
import Nav from './components/Nav'
import Contact from './components/Contact'
import {Chars,Words} from './components/Text'
import {profile,skills,projects,timeline,statements} from './data'
gsap.registerPlugin(ScrollTrigger)

export default function App(){
  const root=useRef<HTMLDivElement>(null)
  useLayoutEffect(()=>{
    const ctx=gsap.context(()=>{
      const mm=gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)',()=>{
        gsap.set('.rv',{opacity:0,y:50})
        gsap.from('#home .ch',{yPercent:110,rotate:6,stagger:.04,duration:1.1,ease:'power4.out',delay:.2})
        gsap.from('#home .label,.hero-row,.scroll',{opacity:0,y:30,stagger:.15,duration:1,delay:.9})
        gsap.from('.orb',{scale:.6,opacity:0,duration:1.6,ease:'power3.out'})
        gsap.utils.toArray<HTMLElement>('[data-par]').forEach(o=>gsap.to(o,{y:+(o.dataset.par||0),ease:'none',scrollTrigger:{trigger:'#home',start:'top top',end:'bottom top',scrub:true}}))
        ScrollTrigger.batch('.rv',{start:'top 88%',onEnter:b=>gsap.to(b,{opacity:1,y:0,stagger:.12,duration:.9,ease:'power3.out'})})
        gsap.from('.frame',{clipPath:'inset(100% 0 0 0)',duration:1.3,ease:'power4.out',scrollTrigger:{trigger:'.frame',start:'top 85%'}})
        gsap.fromTo('.frame img',{scale:1.3,yPercent:-6},{scale:1,yPercent:6,ease:'none',scrollTrigger:{trigger:'.portrait',start:'top bottom',end:'bottom top',scrub:true}})
        gsap.to('.ring',{rotate:2.5,x:6,y:-6,yoyo:true,repeat:-1,duration:3,ease:'sine.inOut'})
        gsap.utils.toArray<HTMLElement>('.stmt').forEach(p=>gsap.to(p.querySelectorAll('.w'),{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:p,start:'top 80%',end:'bottom 45%',scrub:true}}))
        gsap.from('#contact .cta,#contact form',{y:80,opacity:0,stagger:.2,duration:1.2,scrollTrigger:{trigger:'#contact',start:'top 60%'}})
        gsap.to('#prog',{scaleX:1,ease:'none',scrollTrigger:{scrub:.2,start:0,end:'max'}})
        const m2=gsap.matchMedia()
        m2.add('(min-width: 900px)',()=>{
          const t=document.getElementById('track')!
          gsap.to(t,{x:()=>-(t.scrollWidth-innerWidth+80),ease:'none',scrollTrigger:{trigger:'#work',start:'top top',end:()=>'+='+t.scrollWidth,pin:true,scrub:.6,invalidateOnRefresh:true}})
        })
        return()=>m2.revert()
      })
      mm.add('(prefers-reduced-motion: reduce)',()=>{gsap.set('.stmt .w',{opacity:1})})
    },root)
    return()=>ctx.revert()
  },[])

  return(<div ref={root}><Nav/><main>
    <section id="home">
      <div className="orb o1" data-par="-120" aria-hidden="true"/><div className="orb o2" data-par="80" aria-hidden="true"/>
      <div className="label">Portfolio • 2026</div>
      <h1><span className="sr">{profile.name}</span><span className="ln"><Chars text="Zainab"/></span><span className="ln out"><Chars text="Muneer"/></span></h1>
      <div className="hero-row"><p>{profile.tagline}</p>
        <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}><a className="btn" href="#work">Explore My Work</a><a className="btn ghost" href="#contact">Get in Touch</a></div></div>
      <div className="scroll" aria-hidden="true">SCROLL ↓</div>
    </section>
    <section id="about"><div className="split">
      <div className="portrait rv"><div className="ring" aria-hidden="true"/><div className="frame"><img src="/portrait.png" width={400} height={400} loading="lazy" alt="Black-and-white illustration of a woman in a hijab with sunglasses on her head, hiding a smile behind her sleeve"/></div><span className="tag">Rawalpindi, PK</span></div>
      <div><div className="label rv">About</div>
        <h2 className="big rv" style={{marginBottom:'2rem'}}>Curious mind. Builder by nature.</h2>
        <p className="rv">I’m a mobile and web developer in Rawalpindi, currently <strong>interning in iOS &amp; Android app development</strong> at NAVTTC NASTP.</p>
        <p className="rv">My background is a <strong>BSCS (Bachelor of Science in Computer Science)</strong> from Rawalpindi Women University (2020–2024). I’ve completed 15 IBM/Coursera certifications across mobile, front-end and software engineering, and I’m aiming for a developer role where I can build polished mobile and web products.</p>
        <p className="rv"><em>[Editable: add a sentence about your problem-solving approach.]</em></p></div></div></section>
    <section id="skills"><div className="label rv">Skills</div><h2 className="big rv">What I work with</h2>
      <div className="grid">{skills.map(s=><div className="card rv" key={s.title}><h3>{s.title}</h3><ul>{s.items.map(i=><li key={i}>{i}</li>)}</ul></div>)}</div></section>
    <section id="work"><div className="head"><div className="label">Featured work</div><h2 className="big">Selected projects</h2>
      <p style={{color:'var(--mut)',maxWidth:'34rem'}}>Placeholders. Replace them in src/data.ts with your real projects.</p></div>
      <div className="track" id="track">{projects.map(p=><article className="proj" key={p.title}>
        <div className="shot" role="img" aria-label={p.title+' preview placeholder'}><i style={{['--c1' as string]:p.c1,['--c2' as string]:p.c2}}/>{p.placeholder&&<b>PLACEHOLDER</b>}</div>
        <h3>{p.title}</h3><p>{p.desc}</p>
        {(p.demo||p.repo)&&<p style={{marginTop:'.6rem'}}>{p.demo&&<a href={p.demo} target="_blank" rel="noopener noreferrer">Live <ArrowUpRight size={14}/></a>} {p.repo&&<a href={p.repo} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14}/></a>}</p>}
      </article>)}</div></section>
    <section id="experience"><div className="label rv">Experience &amp; Education</div><h2 className="big rv">The path so far</h2>
      <div className="tl">{timeline.map(t=><div className="rv" key={t.title}><small>{t.when}</small><h3>{t.title}</h3><p>{t.sub}</p></div>)}</div></section>
    <section id="highlights"><div className="label rv">Highlights</div>
      {statements.map((s,i)=><p key={s} className="stmt" aria-label={s} style={i?{color:'var(--ac)'}:undefined}><Words text={s}/></p>)}</section>
    <Contact/></main>
    <footer>© {new Date().getFullYear()} {profile.name}. All rights reserved.</footer></div>)
}