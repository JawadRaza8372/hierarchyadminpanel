import React from "react";
import PageTitle from "../components/Typography/PageTitle";

import {
	TableBody,
	TableContainer,
	Table,
	TableHeader,
	TableCell,
	TableRow,
	Avatar,
	Badge,
} from "@windmill/react-ui";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../store/projectSlice";
import { updateData } from "../Database/Database";
import NewEditButton from "../components/NewEditButton";
import InfoCard from "../components/Cards/InfoCard";

function Dashboard() {
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.project);

	const updatePostLimit = async (postLimit, id) => {
		await updateData({ postLimit: postLimit }, "User", id)
			.then(() => {
				let newUsers = users.map((dat) => {
					if (dat.id === id) {
						return { ...dat, postLimit: postLimit };
					} else {
						return dat;
					}
				});
				dispatch(setUsers({ users: newUsers }));
				alert("doc updated");
			})
			.catch((e) => {
				console.log(e);
				alert("internal server error");
			});
	};
	const pendingPosts = users?.filter((dat) => dat.role === "Business");
	const approvedPosts = users?.filter((dat) => dat.role === "Employee");
	const rejectedPosts = users?.filter(
		(dat) => dat.role !== "Business" && dat.role !== "Employee"
	);
	return (
		<>
			<PageTitle>Users</PageTitle>
			<div className='grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4'>
				<InfoCard title='Bussiness men' value={pendingPosts?.length}></InfoCard>

				<InfoCard title='Entrepreneur' value={rejectedPosts?.length}></InfoCard>
				<InfoCard title='Employes' value={approvedPosts?.length}></InfoCard>
				<InfoCard title='Total' value={users?.length}></InfoCard>
			</div>

			<TableContainer className='mb-8'>
				<Table>
					<TableHeader>
						<tr>
							<TableCell>Info</TableCell>
							<TableCell>Experiance</TableCell>
							<TableCell>Role</TableCell>
							<TableCell>Address</TableCell>
							<TableCell>Post Limit</TableCell>
							<TableCell>Actions</TableCell>
						</tr>
					</TableHeader>
					<TableBody>
						{users?.length > 0 &&
							users?.map((dat, index) => (
								<TableRow key={index}>
									<TableCell>
										<div className='flex items-center text-sm'>
											<Avatar
												className='hidden mr-3 md:block'
												src={dat?.ProfilePicture}
												alt='User avatar'
											/>
											<div>
												<p className='font-semibold'>{dat?.useremail}</p>
												<p className='text-xs text-gray-600 dark:text-gray-400'>
													{dat?.userName} {dat?.lastName}
												</p>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<span className='text-sm'>{dat?.exprianceYears}</span>
									</TableCell>
									<TableCell>
										<Badge
											type={
												dat?.role === "Business"
													? "success"
													: dat?.role === "Employee"
													? "neutral"
													: "danger"
											}>
											{dat?.role}
										</Badge>
									</TableCell>
									<TableCell>
										<span className='text-sm'>
											{dat?.Location} {dat?.City}
										</span>
									</TableCell>
									<TableCell>
										<span className='text-sm'>{dat?.postLimit}</span>
									</TableCell>

									<NewEditButton
										postLimit={dat?.postLimit}
										id={dat?.id}
										updatePostLimitf={updatePostLimit}
									/>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export default Dashboard;
