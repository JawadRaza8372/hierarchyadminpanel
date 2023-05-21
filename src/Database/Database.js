import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";

var FirebaseConfig = {
	apiKey: "AIzaSyBgTRE9USjlv3g8uRYDOxNLnanSWKqW20c",
	authDomain: "hierarchy-a2163.firebaseapp.com",
	projectId: "hierarchy-a2163",
	storageBucket: "hierarchy-a2163.appspot.com",
	messagingSenderId: "666705721887",
	appId: "1:666705721887:web:476502250b1f6af4e6f32a",
	measurementId: "G-YRRT9SKCY2",
};
initializeApp(FirebaseConfig);
const dbs = getFirestore();

const getData = async (collectionid) => {
	const projectSnaps = await getDocs(collection(dbs, `${collectionid}`));
	const projectlist = projectSnaps.docs.map((doc) => {
		return { id: doc?.id, ...doc.data() };
	});
	return projectlist;
};
const postData = async (data, collectionid) => {
	const docRef = await addDoc(collection(dbs, `${collectionid}`), {
		...data,
	});
	if (docRef) {
		return { data: docRef?.id, error: null };
	} else {
		return { data: null, error: "Data can not be posted." };
	}
};
const updateData = (data, collectionid, id) => {
	return updateDoc(doc(dbs, `${collectionid}`, `${id}`), {
		...data,
	});
};
const deltdata = (collectionid, id) => {
	return deleteDoc(doc(dbs, `${collectionid}`, `${id}`));
};
export { getData, postData, deltdata, updateData };
