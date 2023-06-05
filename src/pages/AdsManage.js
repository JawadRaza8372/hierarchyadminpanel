import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Button, Avatar, Badge } from "@windmill/react-ui";
import {
	TableBody,
	TableContainer,
	Table,
	TableHeader,
	TableCell,
	TableRow,
} from "@windmill/react-ui";
import { TrashIcon } from "../icons";
import { deltdata, updateData } from "../Database/Database";
import { useDispatch, useSelector } from "react-redux";
import { setAds } from "../store/projectSlice";
import { MdDone, MdClose } from "react-icons/md";

const AdsManage = () => {
	const dispatch = useDispatch();
	const { ads } = useSelector((state) => state.project);
	const approvePost = async (id) => {
		await updateData({ status: "approved" }, "ads", id)
			.then(() => {
				let newoffers = ads.map((dat) => {
					if (dat.id === id) {
						return { ...dat, status: "approved" };
					} else {
						return dat;
					}
				});
				dispatch(setAds({ ads: newoffers }));
				alert("doc updated");
			})
			.catch((e) => {
				console.log(e);
				alert("internal server error");
			});
	};

	const rejectPost = async (id) => {
		await updateData({ status: "rejected" }, "ads", id)
			.then(() => {
				let newoffers = ads.map((dat) => {
					if (dat.id === id) {
						return { ...dat, status: "rejected" };
					} else {
						return dat;
					}
				});
				dispatch(setAds({ ads: newoffers }));
				alert("doc updated");
			})
			.catch((e) => {
				alert("internal server error");
			});
	};

	const deltPost = async (id) => {
		try {
			await deltdata("ads", id).then(() => {
				alert("document deleted");
				const finalrest = ads.filter((dat) => dat.id !== id);
				dispatch(setAds({ ads: finalrest }));
			});
		} catch (error) {
			alert(error);
		}
	};
	return (
		<>
			<PageTitle>Ads Manage</PageTitle>
			<TableContainer>
				<Table>
					<TableHeader>
						<TableRow>
							<TableCell>Image</TableCell>
							<TableCell>Title</TableCell>
							<TableCell>Approval Status</TableCell>
							<TableCell>Expiry Status</TableCell>
							<TableCell>Amount</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ads?.length > 0 &&
							ads?.map((dat, index) => {
								return (
									<TableRow key={index}>
										<TableCell>
											<Avatar
												className='hidden mr-3 md:block'
												src={dat?.image}
												alt='User avatar'
											/>
										</TableCell>
										<TableCell>
											<span className='text-sm'>{dat?.title}</span>
										</TableCell>
										<TableCell>
											<Badge
												type={
													dat?.status === "approved"
														? "success"
														: dat?.status === "pending"
														? "neutral"
														: "danger"
												}>
												{dat?.status === "pending"
													? "pending"
													: dat?.status === "approved"
													? "verified"
													: "rejected"}
											</Badge>
										</TableCell>
										<TableCell>
											<Badge
												type={
													dat?.expiredAt < Date.now() ? "danger" : "success"
												}>
												{dat?.expiredAt < Date.now() ? "Expired" : "Active"}
											</Badge>
										</TableCell>
										<TableCell>
											<span className='text-sm'>{dat?.price}</span>
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
												<Button
													onClick={() => deltPost(dat?.id)}
													layout='link'
													size='icon'
													aria-label='Delete'>
													<TrashIcon className='w-5 h-5' />
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
};

export default AdsManage;
