const NavLoginLogged = ({ toggleDropdown, isOpen, userName }) => {
    let userInitial = userName[0].toUpperCase();
    return (
        <div>
            <button type="button" onClick={toggleDropdown} className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-gray-300 hover:text-white" id="user-menu-button" aria-expanded={isOpen} aria-haspopup="true">
                <span className="rounded-md px-1 pl-2 py-2 text-sm font-medium">{userName}</span>
                <div className="h-7 w-7 bg-slate-100 rounded-full text-gray-800 font-bold text-lg mx-1 flex items-center justify-center">
                    <span className="">{userInitial}</span>
                </div>
            </button>
        </div>
    );
}

export default NavLoginLogged;
