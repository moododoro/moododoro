/*
* Nav bar that has settings for timer and a distinct border around it
* Also title of application
*/
// https://colorhunt.co/palette/4ed7f16fe6fca8f1fffffa8d COLORS
const Header = () => {
  return (
    <>
        <header className="flex bg-[#4ED7F1] items-center py-2 border-b">
            <nav className="flex items-center w-full">
                <h1 className="mr-4 text-4xl">Moododoro</h1>
                <ul className="flex text-2xl ml-auto">
                    <li className="mr-4">Settings</li>
                    <li className="mr-4">Background</li>
                </ul>
            </nav>
        </header>
    </>
  )
}

export default Header