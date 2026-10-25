import {useEffect,useState} from 'react'
import {Menu,X} from 'lucide-react'
import {profile} from '../data'
const L=['Home','About','Work','Skills','Contact']
export default function Nav(){
  const [open,setOpen]=useState(false),[solid,setSolid]=useState(false)
  useEffect(()=>{const f=()=>setSolid(scrollY>80);f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[])
  return(<><div id="prog" aria-hidden="true"/>
  <nav className={solid?'solid':''} aria-label="Primary">
    <a className="logo" href="#home">{profile.name}</a>
    <button className="burger" aria-expanded={open} aria-controls="links" onClick={()=>setOpen(!open)}>{open?<X size={18} aria-label="Close menu"/>:<Menu size={18} aria-label="Open menu"/>}</button>
    <div className={'links'+(open?' open':'')} id="links">
      {L.map(l=><a key={l} href={'#'+l.toLowerCase()} onClick={()=>setOpen(false)}>{l}</a>)}
      <a className="btn" href="#contact" onClick={()=>setOpen(false)}>Let’s Talk</a>
    </div></nav></>)
}
