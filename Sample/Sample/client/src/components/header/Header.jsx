const Header = ({ message }) => {
    return (
        <>
            <div className="position-fixed bg-dark-subtle shadow z-1 w-100">
                <h1 className="text-main text-start px-3 py-2 display-6">{message}</h1>
            </div>
        </>
    )
}

export default Header