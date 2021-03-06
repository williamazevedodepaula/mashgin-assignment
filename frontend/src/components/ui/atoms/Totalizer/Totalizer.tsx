import { IOrder, IOrderItem } from '../../../../types'

export interface TotalizerProps {
  order: IOrder
  checkout?: boolean
  onGoToCheckoutClick:()=>void
  onClearCartClick:()=>void
  onKeepBuyingClick?:()=>void
}

export const Totalizer = (props: TotalizerProps) => {

  const itemsCount = props.order?.items?.length || 0;
  const total = props.order?.items?.reduce<number>((sum: number, it: IOrderItem) => sum + (it.price || 0), 0) || 0;

  return <div className="d-flex justify-content-between">
    <div className="d-flex align-items-end p-2">
      <h1 className="h1">Total: {formatPrice(total)}</h1>
    </div>
    <div className="d-flex align-items-end p-2 ">
      <div className="p-2">
        <button disabled={itemsCount==0} className="btn btn-warning btn-lg" onClick={props.onClearCartClick}>
          Clear cart
        </button>
      </div>
      <div className="p-2">
        <h6>You have {itemsCount} itens in your cart</h6>
        {!props.checkout && <button disabled={itemsCount==0} className="btn btn-lg btn-primary" onClick={props.onGoToCheckoutClick}>
          Proceed to Checkout
        </button>}

        {props.checkout && <button disabled={itemsCount==0} className="btn btn-lg btn-default" onClick={props.onKeepBuyingClick}>
          Keep Buying
        </button>}
      </div>
    </div>
  </div>
}

function formatPrice(number: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)
}