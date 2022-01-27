export interface Inputprops{
  inputId?: string
  value?:string|number
  label?:string
  type?:'text'|'number'
  disabled?: boolean
  onChangeValue?:(value?:string|number)=>void
}

export const Input = (props:Inputprops) => {
  return (
    <div className="form-group">
      <label htmlFor={props.inputId}>{props.label}</label>
      <input
        value={props.value}
        onChange={(event) => props.onChangeValue?.(event.target.value as any)}
        type={props.type}
        className="form-control"
        id={props.inputId}
        disabled={props.disabled}
      />
    </div>
  )
}