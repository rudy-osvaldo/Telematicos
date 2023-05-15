import { useEffect, useRef } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useChatContext } from '../context/ChatContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Message = ({
	username,
	avatar,
	timestamp,
	message,
	uid,
	id,
	edited,
	file,
}) => {
	const msgRef = useRef();
	const { user } = useAuthContext();
	const { activeChannel, changeMsgToEdit } = useChatContext();

	useEffect(() => {
		msgRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
	}, []);

	const handleDelete = async () => {
		const docRef = doc(db, `canales/${activeChannel}/mensajes/${id}`);
		toast.success('Mensaje eliminado correctamente!', {
			position: 'top-center',
			autoClose: 1500,
		});
		await deleteDoc(docRef);
	};

	const handleEdit = async () => {
		const docRef = doc(db, `canales/${activeChannel}/mensajes/${id}`);
		const msg = await getDoc(docRef);
		changeMsgToEdit({
			...msg.data(),
			id,
		});
	};

	return (
		<div className="shadow-xl flex flex-col p-4" ref={msgRef}>
			<div className="flex items-center gap-2">
				<img
					src={avatar}
					alt={username}
					className="w-10 aspect-square rounded-full"
				/>
				<div className=" flex justify-between items-center flex-1">
					<h3 className="font-medium">{username}</h3>
					{user.uid === uid && (
						<div className="flex gap-5">
							{!file && (
								<AiFillEdit
									size={20}
									className="cursor-pointer text-slate-400 hover:text-cyan-500 transition-all ease-in-out"
									onClick={handleEdit}
								/>
							)}
							<AiFillDelete
								size={20}
								className="cursor-pointer text-slate-400 hover:text-cyan-500 transition-all ease-in-out"
								onClick={handleDelete}
							/>
						</div>
					)}
				</div>
			</div>
			{file && (
				<a href={file} target="_blank" className="w-fit">
					<img src={file} alt={uid} className="max-w-xs lg:max-w-xl pt-3" />
				</a>
			)}
			{message && (
				<p className="pt-3">
					{message}
					<span className="italic text-xs text-slate-400 font-medium">
						{edited ? ' (editado)' : ''}
					</span>
				</p>
			)}
			<p className="italic text-xs text-slate-400 self-end font-medium">
				{timestamp}
			</p>
		</div>
	);
};

export default Message;
