export interface CardProps {
  value: string | number
  imageUrl: string
  imageAlt: string
  children?: any
  clickable?: boolean
  imageHeight?: number
  height?: number
  width?: number
  onClick?: (value: string | number) => void
}

export const Card = (props: CardProps) => {
  const linkClassName = `card hover-overlay ${props.clickable ? 'ripple' : ''}`;
  const width = `${props.width || 16}rem`;
  const height = `${props.height || 15}rem`;
  const imageHeight = `${props.imageHeight || 10}rem`;

  const handleImageError = ({ currentTarget }:any) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src='not-found.png';
  }

  return <a href="javascript:void(0)" onClick={() => props.onClick?.(props.value)}>
    <div className={linkClassName} style={{ width, height }}>
      <div>
        <img  src={props.imageUrl}
              className="card-img-top"
              alt={props.imageAlt}
              style={{ width, height: imageHeight }}
              onError={handleImageError}
            />
      </div>
      <div className="card-body">
        {props.children}
      </div>
    </div></a>
}