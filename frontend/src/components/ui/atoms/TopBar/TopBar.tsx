export interface TopBarProps {
  title:string
  onBackClick?:()=>void
}

export const TopBar = (props: TopBarProps) => {
  return <nav className="navbar navbar-dark bg-dark">
    <div className="container-fluid">

      <a className="navbar-brand">
        {props.onBackClick && <a className="nav-link" href="javascript:void(0)" onClick={props.onBackClick}>
          <i className="fas fa-arrow-left"></i>
        </a>}
        {props.title}
      </a>
    </div>
  </nav>
}
