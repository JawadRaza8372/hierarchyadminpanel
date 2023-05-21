import React from "react";

import PageTitle from "../components/Typography/PageTitle";
import { MdDone, MdClose } from "react-icons/md";
import {
	Table,
	TableHeader,
	TableCell,
	TableBody,
	TableRow,
	TableContainer,
	Badge,
	Avatar,
	Button,
} from "@windmill/react-ui";

import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../Database/Database";
import { setOffers } from "../store/projectSlice";
import InfoCard from "../components/Cards/InfoCard";
function Tables() {
	const dispatch = useDispatch();
	const { offers, users } = useSelector((state) => state.project);
	const approvePost = async (id) => {
		await updateData({ verifiedStratus: "approved" }, "Offers", id)
			.then(() => {
				let newoffers = offers.map((dat) => {
					if (dat.id === id) {
						return { ...dat, verifiedStratus: "approved" };
					} else {
						return dat;
					}
				});
				dispatch(setOffers({ offers: newoffers }));
				alert("doc updated");
			})
			.catch((e) => {
				console.log(e);
				alert("internal server error");
			});
	};

	const rejectPost = async (id) => {
		await updateData({ verifiedStratus: "rejected" }, "Offers", id)
			.then(() => {
				let newoffers = offers.map((dat) => {
					if (dat.id === id) {
						return { ...dat, verifiedStratus: "rejected" };
					} else {
						return dat;
					}
				});
				dispatch(setOffers({ offers: newoffers }));
				alert("doc updated");
			})
			.catch((e) => {
				alert("internal server error");
			});
	};
	const pendingPosts = offers?.filter((dat) => dat.verifiedStratus === null);
	const approvedPosts = offers?.filter(
		(dat) => dat.verifiedStratus === "approved"
	);
	const rejectedPosts = offers?.filter(
		(dat) => dat.verifiedStratus === "rejected"
	);
	return (
		<>
			<PageTitle>Tables</PageTitle>
			<div className='grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4'>
				<InfoCard title='Pending' value={pendingPosts?.length}></InfoCard>

				<InfoCard title='Rejected' value={rejectedPosts?.length}></InfoCard>
				<InfoCard title='Approved' value={approvedPosts?.length}></InfoCard>
				<InfoCard title='Total' value={offers?.length}></InfoCard>
			</div>

			<TableContainer>
				<Table>
					<TableHeader>
						<TableRow>
							<TableCell>Client</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>Amount</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHeader>
					<TableBody>
						{offers?.length > 0 &&
							offers?.map((dat, index) => {
								let userinfo = users?.find(
									(dac) => dac.userid === dat.OfferCreateBy
								);
								return (
									<TableRow key={index}>
										<TableCell>
											<div className='flex items-center text-sm'>
												<Avatar
													className='hidden mr-3 md:block'
													src={userinfo?.ProfilePicture}
													alt='User avatar'
												/>
												<div>
													<p className='font-semibold'>{userinfo?.useremail}</p>
													<p className='text-xs text-gray-600 dark:text-gray-400'>
														{userinfo?.userName} {userinfo?.lastName}
													</p>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<span className='text-sm'>{dat?.Description}</span>
										</TableCell>
										<TableCell>
											<Badge
												type={
													dat?.verifiedStratus === "approved"
														? "success"
														: dat?.verifiedStratus === null
														? "neutral"
														: "danger"
												}>
												{dat?.verifiedStratus === null
													? "pending"
													: dat?.verifiedStratus === "approved"
													? "verified"
													: "rejected"}
											</Badge>
										</TableCell>
										<TableCell>
											<span className='text-sm'>{dat?.postDate}</span>
										</TableCell>
										<TableCell>
											<span className='text-sm'>{dat?.Budget}</span>
										</TableCell>
										<TableCell>
											<div className='flex items-center space-x-4'>
												<Button
													onClick={() => approvePost(dat?.id)}
													layout='link'
													size='icon'
													aria-label='Edit'>
													<MdDone className='w-5 h-5' />
												</Button>
												<Button
													onClick={() => rejectPost(dat?.id)}
													layout='link'
													size='icon'
													aria-label='Delete'>
													<MdClose className='w-5 h-5' />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export default Tables;
