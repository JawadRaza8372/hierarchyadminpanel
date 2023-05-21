import React, { lazy, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./store/authSlice";
import { getData } from "./Database/Database";
import { setCources, setOffers, setUsers } from "./store/projectSlice";

const LayoutNew = lazy(() => import("./containers/LayoutNew"));
const Login = lazy(() => import("./pages/Login"));

function App() {
	const dispatch = useDispatch();
	const { isAuth } = useSelector((state) => state.auth);
	useEffect(() => {
		const result = window.localStorage.getItem("hierarchyWebAdmin");
		if (result) {
			dispatch(setAuth({ isAuth: result }));
		}
	}, [dispatch]);

	useEffect(() => {
		const fetchdata = async () => {
			if (isAuth) {
				const offers = await getData("Offers");
				const users = await getData("User");
				const cources = await getData("tutorials");
				if (offers) {
					let newoffers = offers.map((dat) => {
						return {
							...dat,
							postDate: new Date(dat?.postDate?.seconds * 1000).toDateString(),
						};
					});
					dispatch(setOffers({ offers: newoffers }));
				}
				if (users) {
					dispatch(setUsers({ users: users }));
				}
				if (cources) {
					dispatch(setCources({ cources: cources }));
				}
			}
		};
		fetchdata();
	}, [dispatch, isAuth]);
	let ProtectedRoute = ({ children }) => {
		return isAuth ? children : <Redirect to='/' />;
	};
	let AuthRoute = ({ children }) => {
		return isAuth ? <Redirect to='/app/users' /> : children;
	};
	return (
		<>
			<Router>
				<AccessibleNavigationAnnouncer />
				<Switch>
					<Route
						path='/login'
						render={() => (
							<AuthRoute>
								<Login />
							</AuthRoute>
						)}
					/>

					<Route
						path='/app'
						render={() => (
							<ProtectedRoute>
								<LayoutNew />
							</ProtectedRoute>
						)}
					/>
					<Redirect exact from='/' to='/login' />
				</Switch>
			</Router>
		</>
	);
}

export default App;
