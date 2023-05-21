import React, { useState, useMemo } from "react";

// create context
export const SidebarContext = React.createContext();

export const SidebarProvider = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	function closeSidebar() {
		setIsSidebarOpen(false);
	}

	const value = useMemo(
		() => ({
			isSidebarOpen,
			toggleSidebar() {
				setIsSidebarOpen(!isSidebarOpen);
			},
			closeSidebar,
		}),
		[isSidebarOpen]
	);

	return (
		<SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
	);
};
