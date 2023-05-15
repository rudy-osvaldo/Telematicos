import { createContext, useContext, useState } from 'react';
import { storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
	const [activeChannel, setActiveChannel] = useState('');
	const [inputMessage, setInputMessage] = useState('');
	const [msgToEdit, setMsgToEdit] = useState('');
	const [fileURL, setFileURL] = useState('');
	const [popupUser, setPopupUser] = useState(false)
	const navigate = useNavigate();

	const changeActiveChannel = (channel) => {
		setActiveChannel(channel);
		navigate('/');
	};

	const changeMsgToEdit = (msg) => {
		setMsgToEdit(msg);
	};

	const uploadFile = async (file) => {
		const storageRef = ref(storage, `imagenes/${v4()}`);
		await uploadBytes(storageRef, file);
		return getDownloadURL(storageRef);
	};

	return (
		<ChatContext.Provider
			value={{
				activeChannel,
				changeActiveChannel,
				msgToEdit,
				changeMsgToEdit,
				uploadFile,
				fileURL,
				setFileURL,
				inputMessage,
				setInputMessage,
				popupUser,
				setPopupUser,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const useChatContext = () => {
	const context = useContext(ChatContext);

	if (!context)
		throw new Error('useChatContext must be used within an ChannelProvider');

	return context;
};
