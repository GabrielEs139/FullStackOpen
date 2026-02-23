const Filter = (props) => (
  <form onSubmit={props.onSearch}>
        find countries: <input value={props.value} onChange={props.handleChange} />
  </form>
)

export default Filter