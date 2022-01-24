import { ICategory } from '../../../../types'

export type CategoryProps = ICategory & {
  imagesBaseUrl: string
}

export const Category = (props:CategoryProps)=>{
  const imageUrl = `${props.imagesBaseUrl}/${props.image_id}.jpg`;
  return <div>
    <img src={imageUrl}/>
    <span>{props.name}</span>
  </div>
}