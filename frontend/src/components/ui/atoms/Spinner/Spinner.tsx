export const Spinner = () => {
  return <div className="d-flex align-items-center">
    <div className="spinner-border p-5 m-4" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <h4 >Please, wait...</h4>
  </div>
}