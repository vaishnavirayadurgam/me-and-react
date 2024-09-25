
import { useState ,useCallback,useEffect, useRef} from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] =useState(false)
  const [charAllowed, setCharAllowed] =useState(false)
  const [password, setPassword]=useState("")
  const passgen =useCallback(()=>{
      let pass=""
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtsuvwxyz"
      if(numberAllowed)
        {
          str+="0123456789"
        }
        if(charAllowed)
        {
          str+=")(*&^%$#@!+-][}{=~"
        }
      for(let i=1;i<=length;i++)
      {  
        let char=Math.floor(Math.random()*str.length +1)
        pass +=str.charAt(char)
      }
      setPassword(pass)
      
  },[length, numberAllowed, charAllowed,setPassword])

 const passref=useRef(null)
 useEffect(()=>{ passgen()},[length, numberAllowed, charAllowed,passgen])
 
 const copypass=useCallback(()=>{
  passref.current?.select()
  passref.current?.setSelectionRange(0,10)
  window.navigator.clipboard.writeText(password)
},[password])


  return (
    <div className='w-full max-w-lg mx-auto px-4 py-3 my-8 shadow-md rounded-lg bg-gray-700'>
      <h1 className=' text-center text-white text-lg mb-2'>Password Generator</h1>
      <div className='flex justify-center  shadow rounded-lg overflow-hidden'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' ref={passref} placeholder='Password' readOnly />
        <button className='outline-none text-white  bg-blue-600  px-3 shrink-0 ' onClick={copypass}>copy</button>
      </div>
      <div className='flex mt-2 text-sm gap-x-2'>
        <div className='flex text-sm gap-x-2'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setlength(e.target.value)}}/>
          <label className='text-orange-500'>Length: {length}</label>
           <div>
            <input type="checkbox" id="numberInput" defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
            <label className='text-orange-500 px-1'>Numbers Allow</label>
           </div>
           <div>
           <input type="checkbox" id="numberInput" defaultChecked={charAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
           <label className='text-orange-500 px-1'>character Allow</label>
           </div>
        </div>
      </div>
    </div>
  )
}

export default App
