import {useState,FormEvent} from 'react'
import {Github,Linkedin} from 'lucide-react'
import {profile} from '../data'
type E={name?:string;email?:string;message?:string}
export default function Contact(){
  const [e,setE]=useState<E>({}),[msg,setMsg]=useState('')
  const submit=(ev:FormEvent<HTMLFormElement>)=>{ev.preventDefault()
    const d=new FormData(ev.currentTarget),n=String(d.get('name')).trim(),m=String(d.get('email')).trim(),t=String(d.get('message')).trim()
    const x:E={}
    if(n.length<2)x.name='Please enter your name.'
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m))x.email='Please enter a valid email.'
    if(t.length<10)x.message='Message should be at least 10 characters.'
    setE(x)
    setMsg(Object.keys(x).length?'Please fix the highlighted fields.':'Valid, but no form service is connected yet, so nothing was sent. See README to connect Formspree or EmailJS.')
  }
  const F=(id:'name'|'email'|'message',label:string)=>(<div><label htmlFor={id}>{label}</label>
    {id==='message'?<textarea id={id} name={id} rows={4} aria-invalid={!!e[id]}/>:<input id={id} name={id} type={id==='email'?'email':'text'} aria-invalid={!!e[id]}/>}
    <div className="err">{e[id]}</div></div>)
  return(<section id="contact"><div className="label">Contact</div>
    <h2 className="cta">Let’s create something great.</h2>
    <form onSubmit={submit} noValidate>{F('name','Name')}{F('email','Email')}{F('message','Message')}
      <button className="btn" type="submit">Send message</button><div id="msg" role="status" aria-live="polite">{msg}</div></form>
    <div className="soc">
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16}/> LinkedIn</a>
      <a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={16}/> GitHub</a>
      {profile.email?<a href={'mailto:'+profile.email}>{profile.email}</a>:<span style={{color:'var(--mut)'}}>Email: [add in src/data.ts]</span>}
    </div></section>)
}
