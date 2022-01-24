import { IProduct } from '../../../../types'

export type ProductProps  = IProduct & {
  checkout: boolean
  imagesBaseUrl: string
}

export const Product = (props:ProductProps)=>{
  const imageUrl = `${props.imagesBaseUrl}/${props.image_id}.jpg`;
  return <div>
    <img src={imageUrl}/>
  </div>
}