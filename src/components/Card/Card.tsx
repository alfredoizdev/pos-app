import { FC, useContext } from 'react';
import IUserData from "../../interface/user";
import styles from "./Card.module.css";
import { FiPenTool } from 'react-icons/fi';
import { AppContext } from '../../context/AppContext';
import { formatted } from '../../helpers';

interface Props {
	user: IUserData
}

const Card: FC<Props> = ({ user }) => {

	const { setToggleMenu, loadUserToEdit } = useContext(AppContext);

	const handleClick = () => {
		setToggleMenu();
		loadUserToEdit(user);
	}

	return (
		<div className={styles.card}>
			<div className={styles.cardHeader}>
				<h2>
					{user.name.first} <span>{user.name.last}</span>
				</h2>
				<button className={styles.edit} type="button" onClick={handleClick}><FiPenTool /></button>
			</div>
			<div className={styles.cardBody}>
				<div className={styles.cardMeta}>
					<span>
						<b>email:</b> {user.email}
					</span>
					{user.phone !== "no" && <span>
						<b>phone:</b> {formatted.formatPhoneNumber(user.phone)}
					</span>}
					<span>
						<b>address:</b>{user.location.street?.number} {user.location.street.name},
					</span>
					<span>
						<b>City:</b> {user.location.city}
					</span>
					<span>
						<b>Estate:</b> {user.location.state}
					</span>
					<span>
						<b>Country:</b> {user.location.country}
					</span>
					<span>
						<b>Zipcode:</b> {user.location.postcode}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Card;
