export default function Input({inputType, placeholder, onChange}:any){
    return(
        <input type={inputType} placeholder={placeholder} onChange={onChange} />
    )
}