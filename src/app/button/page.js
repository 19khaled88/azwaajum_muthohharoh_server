const Button = ({ text, onClick,style }) => {
  return (
    <button type="button" className={style} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
