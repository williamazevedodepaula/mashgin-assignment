import { ICategory } from '../../../../types'
import { Card } from '../Card/Card';

export type CategoryProps = ICategory & {
  imagesBaseUrl: string
  onClick?:(categoryId:string|number)=>void
}

export const Category = (props: CategoryProps) => {
  const imageUrl = `${props.imagesBaseUrl}/${props.image_id}.jpg`;
  return <Card
    imageUrl={imageUrl}
    imageAlt={props.name}
    value={props.id}
    clickable={true}
    onClick={props.onClick}
  >
    <p className="card-text">{props.name}</p>
  </Card>
}