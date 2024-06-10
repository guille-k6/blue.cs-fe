import { signIn, signOut, useSession } from "next-auth/react";

const Navlogin = ( {toggleDropdown, isOpen} ) => {
    const { data: session, status } = useSession();
    console.log({session, status});

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (session) {
        return (
          <div>
            <button type="button" onClick={toggleDropdown} className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-gray-300 hover:text-white" id="user-menu-button" aria-expanded={isOpen} aria-haspopup="true">
                    <span className="rounded-md px-1 pl-2 py-2 text-sm font-medium">{session.user?.username}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
            </button>
          </div>
        );
    }
    return (
        <div>
            <button type="button" onClick={toggleDropdown} className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded={isOpen} aria-haspopup="true">
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
            </button>
        </div>
    );
}

export default Navlogin;
