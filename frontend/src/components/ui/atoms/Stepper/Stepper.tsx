export interface StepperProps {
  currentAmount: number
  onMinusClick?: () => void
  onPlusClick?: () => void
}

export const Stepper = (props: StepperProps) => {
  return <div className="d-flex justify-content-center align-items-center">
    <button type="button" className="btn btn-warning btn-md btn-floating" onClick={props.onMinusClick} disabled={props.currentAmount == 0}>
      <i className="fas fa-minus"></i>
    </button>
    <div className="form-outline" style={{width:'50%'}}>
      <input type="text"  value={props.currentAmount} className="form-control text-center" disabled/>
    </div>
    <button type="button" className="btn btn-primary btn-md btn-floating" onClick={props.onPlusClick}>
      <i className="fas fa-plus"></i>
    </button>
  </div>
}