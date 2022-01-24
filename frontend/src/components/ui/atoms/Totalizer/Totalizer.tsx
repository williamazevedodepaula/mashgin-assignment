export interface TotalizerProps{
  total: number
}

export const Totalizer = (props:TotalizerProps)=>{
  return <div>
    <h1>Total $ {props.total}</h1>
  </div>
}