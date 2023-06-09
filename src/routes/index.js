import { lazy } from "react";
import AdsPlan from "../pages/AdsPlan";
import AdsManage from "../pages/AdsManage";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Forms = lazy(() => import("../pages/Forms"));
const Tables = lazy(() => import("../pages/Tables"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
	{
		path: "/users", // the url
		component: Dashboard, // view rendered
	},
	{
		path: "/cources",
		component: Forms,
	},

	{
		path: "/posts",
		component: Tables,
	},
	{
		path: "/adsplan",
		component: AdsPlan,
	},
	{
		path: "/adsManage",
		component: AdsManage,
	},
];

export default routes;
