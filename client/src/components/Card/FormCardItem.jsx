const FormCardItem = ({ children, title, error, row, className }) => {
  return (
    <div className={`card_item ${className}`}>
      <div className={row ? 'card_body row' : 'card_body'}>
        {title || error ? (
          <div className="card_outside_title">
            {title}
            {error && <span className="form_error">{error}</span>}
          </div>
        ) : null}

        {children}
      </div>
    </div>
  )
}

export default FormCardItem;
