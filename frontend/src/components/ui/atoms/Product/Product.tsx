import { IProduct } from '../../../../types'
import { Card } from '../Card/Card';
import { Stepper } from '../Stepper/Stepper';

export type ProductProps = IProduct & {
  checkout: boolean
  imagesBaseUrl: string
  amountInCart?: number
  onClick?: (categoryId: string | number) => void
}

export const Product = (props: ProductProps) => {
  const imageUrl = `${props.imagesBaseUrl}/${props.image_id}.jpg`;
  return <Card
    imageHeight={8}
    height={props.checkout ? 14 : 18}
    width={15}
    imageUrl={imageUrl}
    imageAlt={props.name}
    value={props.id}
    onClick={props.onClick}
  >
    <div className="card-text">
      <h6 className=".h6 card-text">{props.name}</h6>
      <p >{formatPrice(props.price)}</p>
    </div>

    {!props.checkout && <Stepper currentAmount={props.amountInCart||0}/>}
  </Card>
}

function formatPrice(number:number){
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)
}