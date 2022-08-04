import { useEffect, useState, useRef } from "react";
export default function Input({label,type, ...props}) {

  const inputRef = useRef();
const [show, setShow] = useState(false);
const [inputType, setInputType] = useState(type);

useEffect(()=>{
if (show) {
  setInputType("text");

}else if (type === "password") {
  setInputType("password")}
  inputRef.current.focus();
},[show])



  return (
    <label className="relative flex  rounded-sm bg-zinc-50 px-2 text-sm border focus-within:border-gray-400 ">
      <input
        required={true}
        type={inputType}
        ref={inputRef}
        className="bg-zinc-50 w-full h-[38px]  outline-none peer valid:10px valid:pt-3"
        {...props}
      />
      <small className="absolute cursor-text pointer-events-none top-1/2 left-[9px] -translate-y-1/2 text-sx text-gray-500 transtion-all peer-valid:text-[9px] peer-valid:top-2.5">
        {label}
      </small>
      {type === 'password' && props?.value && (
        <button type="button" onClick={()=>setShow(show => !show)} className=" text-gray-500 flex items-center h-full text-sm font-semibold pl-1">
          {show ? 'Hide' : 'Show'}
        </button>
      )}
    </label>
  );
}
