import { FC, useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import styles from './EditModal.module.css';
import { AppContext } from '../../context/AppContext';
import { FiX } from "react-icons/fi";
import { FiSave } from "react-icons/fi";
import { validation } from '../../helpers';


type FormDate = {
	formValue: {
		address: string;
		streeNumber: string;
		email: string;
		last: string;
		name: string;
		id: string;
		city: string;
		state: string;
		country: string;
		zipcode: string;
	};
};

const EditModal: FC = () => {

	const { setToggleMenu,
		loadUserToEdit,
		updatedUser,
		userToEdit
	} = useContext(AppContext);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormDate>({
		defaultValues: {
			formValue: {
				name: "",
				last: "",
				email: "",
				id: "",
				address: "",
				streeNumber: "",
				city: "",
				state: "",
				country: "",
				zipcode: "",
			},
		},
	});


	const handleClick = () => {

		setToggleMenu();
		loadUserToEdit(null);
	}

	const sendUpdatedUser = ({ formValue }: FormDate) => {
		console.log(formValue);
		setToggleMenu();
		updatedUser(formValue);
	}


	useEffect(() => {
		if (userToEdit) {
			setValue("formValue", {
				name: userToEdit?.name.first,
				last: userToEdit?.name.last,
				email: userToEdit?.email,
				id: userToEdit?.id.value,
				address: userToEdit?.location.street.name,
				streeNumber: userToEdit?.location.street.number.toString(),
				city: userToEdit.location.city,
				state: userToEdit.location.state,
				country: userToEdit.location.country,
				zipcode: userToEdit.location.postcode
			});
		}
	}, [setValue, userToEdit])

	return (
		<div className={styles.modalContainer}>
			<div className={styles.modal}>
				<div className={styles.headerModal}>
					<h2>Edit {userToEdit?.name.first} {userToEdit?.name.last}</h2>
					<button className={styles.cancelButtonModal} onClick={handleClick}><FiX /></button>
				</div>
				<form onSubmit={handleSubmit(sendUpdatedUser)}>
					<div className={styles.modalBody}>
						<div className={styles.left}>
							<div className={styles.controlField}>
								<input
									{...register("formValue.name", {
										required: "The field is required",
									})}
									className={styles.field}
									placeholder='Name'
								/>
								{errors.formValue?.name?.message &&
									<span className={styles.errorText}>{errors.formValue?.name?.message}</span>
								}
							</div>
							<div className={styles.controlField}>
								<input
									{...register("formValue.last", {
										required: "The field is required",
									})}
									className={styles.field}
									placeholder='Last Name' />
								{errors.formValue?.last?.message &&
									<span className={styles.errorText}>{errors.formValue?.last?.message}</span>
								}
							</div>
							<div className={styles.controlField}>
								<input
									{...register("formValue.email", {
										required: "The field is required",
										validate: validation.isEmail
									})}
									className={styles.field}
									placeholder='Email' />
								{errors.formValue?.email?.message &&
									<span className={styles.errorText}>{errors.formValue?.email?.message}</span>
								}
							</div>
						</div>
						<div className={styles.rigth}>
							<div className={styles.controlField}>
								<input
									{...register("formValue.streeNumber", {
										required: "The field is required",
									})}
									className={styles.field}
									placeholder='Stree number' />
								{errors.formValue?.streeNumber?.message &&
									<span className={styles.errorText}>{errors.formValue?.streeNumber?.message}</span>
								}
							</div>
							<div className={styles.controlField}>
								<input
									{...register("formValue.address", {
										required: "The field is required",
									})}
									className={styles.field}
									placeholder='Address' />
								{errors.formValue?.address?.message &&
									<span className={styles.errorText}>{errors.formValue?.address?.message}</span>
								}
							</div>
							<div className={styles.controlField}>
								<input
									{...register("formValue.city", {
										required: "The field is required"
									})}
									className={styles.field}
									placeholder='City' />
								{errors.formValue?.city?.message &&
									<span className={styles.errorText}>{errors.formValue?.city?.message}</span>
								}
							</div>
							<div className={styles.controlField}>
								<input
									{...register("formValue.state", {
										required: "The field is required"
									})}
									className={styles.field}
									placeholder='State' />
								{errors.formValue?.state?.message &&
									<span className={styles.errorText}>{errors.formValue?.state?.message}</span>
								}
							</div>
							<div className={styles.controlField}>
								<input
									{...register("formValue.country", {
										required: "The field is required"
									})}
									className={styles.field}
									placeholder='Country' />
								{errors.formValue?.country?.message &&
									<span className={styles.errorText}>{errors.formValue?.country?.message}</span>
								}
							</div>
							<div className={styles.controlField}>
								<input
									{...register("formValue.zipcode", {
										required: "The field is required",
										minLength: {
											value: 5,
											message: "Zipcode must has more them 4 characters",
										},
									})}
									className={styles.field}
									placeholder='Zipcode' />
								{errors.formValue?.zipcode?.message &&
									<span className={styles.errorText}>{errors.formValue?.zipcode?.message}</span>
								}
							</div>
						</div>

					</div>
					<div className={styles.footer}>
						<button type='submit' className={styles.save}><FiSave /></button>
						<button type='button' className={styles.cancel} onClick={setToggleMenu}><FiX /></button>
					</div>
				</form>
			</div>
		</div>
	);
};


export default EditModal