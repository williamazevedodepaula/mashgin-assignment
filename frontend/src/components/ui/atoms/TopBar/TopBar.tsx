export interface TopBarProps {
  title:string
  breadcrumbItems?:{
    title:string
  }[]
}

export const TopBar = (props: TopBarProps) => {
  return <nav className="navbar navbar-dark bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand">{props.title}</a>
    </div>
  </nav>
}
