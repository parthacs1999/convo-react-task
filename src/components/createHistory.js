import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
const createHistory = async (data) => {
    await addDoc(collection(db, 'history'), {
        name: data.cardName,
        url: data.link,
        time: data.time
    });
}
export default createHistory;