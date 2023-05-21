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
import { setCources } from "../store/projectSlice";

function Forms() {
	const dispatch = useDispatch();
	const { cources } = useSelector((state) => state.project);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [frmvalue, setfrmvalue] = useState({ title: "", link: "" });
	function openModal() {
		setIsModalOpen(true);
	}

	function closeModal() {
		setIsModalOpen(false);
	}
	const onSubmitfun = async (e) => {
		e.preventDefault();
		const result = await postData({ ...frmvalue }, "tutorials");
		if (result?.data) {
			alert("Course created");
			dispatch(
				setCources({
					cources:
						cources?.length > 0
							? [...cources, { id: result?.data, ...frmvalue }]
							: [{ id: result?.data, ...frmvalue }],
				})
			);
			closeModal();
		} else {
			alert("internal server error");
		}
	};
	const deltdatafun = async (id) => {
		try {
			await deltdata("tutorials", id).then(() => {
				alert("document deleted");
				dispatch(
					setCources({ cources: cources.filter((dat) => dat.id === id) })
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
				<PageTitle>Cources</PageTitle>
				<Button className='customHoer' onClick={openModal}>
					Add Cource
				</Button>
			</div>

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ModalBody>
					<form
						onSubmit={onSubmitfun}
						className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
						<Label>
							<span>Title</span>
							<Input
								type='text'
								className='mt-1'
								placeholder='Cource title'
								value={frmvalue?.title}
								required
								onChange={(e) =>
									setfrmvalue({ ...frmvalue, title: e.target.value })
								}
							/>
						</Label>
						<Label style={{ margin: "15px 0px" }}>
							<span>Video Link</span>
							<Input
								type='url'
								className='mt-1'
								placeholder='https://something.com'
								value={frmvalue?.link}
								required
								onChange={(e) =>
									setfrmvalue({ ...frmvalue, link: e.target.value })
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
							<TableCell>Course Id</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Video Link</TableCell>
							<TableCell>Actions</TableCell>
						</tr>
					</TableHeader>
					<TableBody>
						{cources?.length > 0 &&
							cources?.map((dat, index) => (
								<TableRow key={index}>
									<TableCell>
										<span className='text-sm'>{dat?.id}</span>
									</TableCell>

									<TableCell>
										<span className='text-sm'>{dat?.title}</span>
									</TableCell>
									<TableCell>
										<span className='text-sm'>{dat?.link}</span>
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
}

export default Forms;
