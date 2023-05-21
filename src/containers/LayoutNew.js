import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../routes";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "../containers/Main";
import ThemedSuspense from "../components/ThemedSuspense";

const LayoutNew = () => {
	return (
		<>
			<div className={`flex h-screen bg-gray-50 dark:bg-gray-900 `}>
				<Sidebar />

				<div className='flex flex-col flex-1 w-full'>
					<Header />
					<Main>
						<Suspense fallback={<ThemedSuspense />}>
							<Switch>
								{routes.map((route, i) => {
									return route.component ? (
										<Route
											key={i}
											exact={true}
											path={`/app${route.path}`}
											render={(props) => <route.component {...props} />}
										/>
									) : null;
								})}
								<Redirect exact from='/app' to='/app/dashboard' />
							</Switch>
						</Suspense>
					</Main>
				</div>
			</div>
		</>
	);
};

export default LayoutNew;
