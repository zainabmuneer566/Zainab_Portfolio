export const Chars=({text}:{text:string})=>(<>{[...text].map((c,i)=><span key={i} className="ch" aria-hidden="true">{c}</span>)}</>)
export const Words=({text}:{text:string})=>(<>{text.split(' ').map((w,i)=><span key={i} className="w" style={{display:'inline-block',opacity:.18}}>{w}&nbsp;</span>)}</>)
