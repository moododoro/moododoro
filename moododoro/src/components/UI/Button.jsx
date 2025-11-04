const Button = (props) => {
    const {text, onClick} = props
    return(
        <button className="cursor-pointer" onClick={onClick}>{text}</button>
    )
}

export default Button