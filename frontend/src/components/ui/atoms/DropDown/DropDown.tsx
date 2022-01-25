export interface DropDownProps {
  placeholder:string
  value:string
  valueList:string[]
  onSelect:(value:string)=>void
}

export const DropDown = (props: DropDownProps) => {
  return <div className="dropdown">
    <button
      className="btn btn-lg btn-default dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-mdb-toggle="dropdown"
      aria-expanded="false"
      style={{width:'100%'}}
    >
      {(props.value && props.value != '') ? props.value : props.placeholder}
    </button>
    <ul className="dropdown-menu dropdown-default" aria-labelledby="dropdownMenuButton">
      {props.valueList.map((value,index) => <li key={index}><a className="dropdown-item" href="javascript:void(0)" onClick={() => props.onSelect(value)}>{value}</a></li>)}
    </ul>
  </div>
}