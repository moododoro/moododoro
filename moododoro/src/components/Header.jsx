const Header = () => {
  
  // TODO: add settings card on click to show timer settings
  // TODO: add background card on click to let user select background / add
  //       their own

  return (
    <>
        <header className="flex bg-[#E5E0D8] items-center py-2 border-b">
            <nav className="flex items-center w-full text-[#444444]">
                <h1 className="mr-4 text-4xl">moododoro</h1>
                <ul className="flex text-2xl ml-auto">
                    <li className="mr-4">background</li>
                    <li className="mr-4">settings</li>
                </ul>
            </nav>
        </header>
    </>
  )
}

export default Header