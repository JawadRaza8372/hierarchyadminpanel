import React, { useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import { Input, Label, Button, Modal, ModalBody } from "@windmill/react-ui";
import {
	TableBody,
	TableContainer,
	Table,
	TableHeader,
	TableCell,
	TableRow,
} from "@windmill/react-ui";
import { TrashIcon } from "../icons";
import { deltdata, postData } from "../Database/Database";
import { useDispatch, useSelector } from "react-redux";
import { setAdsplan } from "../store/projectSlice";

const AdsPlan = () => {
	const dispatch = useDispatch();
	const { adsplan } = useSelector((state) => state.project);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [frmvalue, setfrmvalue] = useState({ price: "", days: "" });
	function openModal() {
		setIsModalOpen(true);
	}

	function closeModal() {
		setIsModalOpen(false);
	}
	const onSubmitfun = async (e) => {
		e.preventDefault();
		const result = await postData(
			{ price: parseInt(frmvalue.price), days: parseInt(frmvalue.days) },
			"adsplan"
		);
		if (result?.data) {
			alert("Course created");
			dispatch(
				setAdsplan({
					adsplan:
						adsplan?.length > 0
							? [
									...adsplan,
									{
										id: result?.data,
										price: parseInt(frmvalue.price),
										days: parseInt(frmvalue.days),
									},
							  ]
							: [
									{
										id: result?.data,
										price: parseInt(frmvalue.price),
										days: parseInt(frmvalue.days),
									},
							  ],
				})
			);
			closeModal();
		} else {
			alert("internal server error");
		}
	};
	const deltdatafun = async (id) => {
		try {
			await deltdata("adsplan", id).then(() => {
				alert("document deleted");
				dispatch(
					setAdsplan({ adsplan: adsplan.filter((dat) => dat.id !== id) })
				);
			});
		} catch (error) {
			alert(error);
		}
	};
	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					flexDirection: "row",
				}}>
				<PageTitle>Ads Plan</PageTitle>
				<Button className='customHoer' onClick={openModal}>
					Add Plans
				</Button>
			</div>

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ModalBody>
					<form
						onSubmit={onSubmitfun}
						className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
						<Label>
							<span>Days</span>
							<Input
								type='number'
								className='mt-1'
								placeholder='0'
								value={frmvalue?.days}
								required
								onChange={(e) =>
									setfrmvalue({ ...frmvalue, days: e.target.value })
								}
							/>
						</Label>
						<Label style={{ margin: "15px 0px" }}>
							<span>Price</span>
							<Input
								type='number'
								className='mt-1'
								placeholder='$'
								value={frmvalue?.price}
								required
								onChange={(e) =>
									setfrmvalue({ ...frmvalue, price: e.target.value })
								}
							/>
						</Label>
						<Button type='submit' className='customHoer'>
							Upload
						</Button>
					</form>
				</ModalBody>
			</Modal>
			<TableContainer className='mb-8'>
				<Table>
					<TableHeader>
						<tr>
							<TableCell>Plan Id</TableCell>
							<TableCell>Validity Days</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Actions</TableCell>
						</tr>
					</TableHeader>
					<TableBody>
						{adsplan?.length > 0 &&
							adsplan?.map((dat, index) => (
								<TableRow key={index}>
									<TableCell>
										<span className='text-sm'>{dat?.id}</span>
									</TableCell>

									<TableCell>
										<span className='text-sm'>{dat?.days}</span>
									</TableCell>
									<TableCell>
										<span className='text-sm'>{dat?.price}</span>
									</TableCell>

									<TableCell>
										<Button
											onClick={() => deltdatafun(dat?.id)}
											layout='link'
											size='icon'
											aria-label='Delete'>
											<TrashIcon className='w-5 h-5' aria-hidden='true' />
										</Button>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default AdsPlan;
