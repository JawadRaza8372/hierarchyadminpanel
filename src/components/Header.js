import React, { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { MoonIcon, SunIcon, MenuIcon, OutlineLogoutIcon } from "../icons";
import { WindmillContext, Button } from "@windmill/react-ui";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

function Header() {
	const dispatch = useDispatch();
	const { mode, toggleMode } = useContext(WindmillContext);
	const { toggleSidebar } = useContext(SidebarContext);

	return (
		<header className='z-40 py-4 bg-white shadow-bottom dark:bg-gray-800'>
			<div className='container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300'>
				{/* <!-- Mobile hamburger --> */}
				<Button
					className='mr-2 lg:hidden focus:outline-none customHoer'
					onClick={toggleSidebar}
					aria-label='Menu'>
					<MenuIcon className='w-6 h-6' aria-hidden='true' />
				</Button>
				{/* <!-- Search input --> */}
				<div className='flex justify-center flex-1 lg:mr-32'></div>
				<ul className='flex items-center flex-shrink-0 space-x-6'>
					{/* <!-- Theme toggler --> */}
					<li className='flex'>
						<Button className='customHoer' onClick={toggleMode}>
							{mode === "dark" ? (
								<SunIcon className='w-5 h-5' aria-hidden='true' />
							) : (
								<MoonIcon className='w-5 h-5' aria-hidden='true' />
							)}
						</Button>
						{/* <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              
            </button> */}
					</li>

					<li className='relative'>
						<Button
							className='customHoer'
							onClick={() => {
								dispatch(setAuth({ isAuth: null }));
							}}
							aria-label='Account'
							aria-haspopup='true'>
							<OutlineLogoutIcon className='w-4 h-4 mr-3' aria-hidden='true' />
							<span>Log out</span>
						</Button>
					</li>
				</ul>
			</div>
		</header>
	);
}

export default Header;
