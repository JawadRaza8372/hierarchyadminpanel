import React, { useState } from "react";
import {
	Input,
	Label,
	Button,
	Modal,
	ModalBody,
	TableCell,
} from "@windmill/react-ui";
import { EditIcon } from "../icons";

const NewEditButton = ({ postLimit, id, updatePostLimitf }) => {
	const [frmvalue, setfrmvalue] = useState(0);
	const [isOpenModel, setisOpenModel] = useState(false);
	console.log("postlim", postLimit, "--id-", id);
	return (
		<>
			<TableCell>
				<div className='flex items-center space-x-4'>
					<Button
						onClick={() => {
							setisOpenModel(true);
						}}
						layout='link'
						size='icon'>
						<EditIcon className='w-5 h-5' aria-hidden='true' />
					</Button>
				</div>
			</TableCell>
			<Modal
				isOpen={isOpenModel}
				onClose={() => {
					setisOpenModel(false);
				}}>
				<ModalBody>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							let finalpostlimit = parseInt(postLimit) + parseInt(frmvalue);
							await updatePostLimitf(finalpostlimit, id);
							setisOpenModel(false);
						}}
						className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
						<Label style={{ marginBottom: "15px" }}>
							<span style={{ marginBottom: "10px" }}>
								Number of Posts You want to increase
							</span>
							<Input
								type='number'
								className='mt-1'
								placeholder='Cource title'
								value={frmvalue}
								required
								onChange={(e) => setfrmvalue(e.target.value)}
							/>
						</Label>

						<Button type='submit' className='customHoer'>
							Update
						</Button>
					</form>
				</ModalBody>
			</Modal>
		</>
	);
};

export default NewEditButton;
