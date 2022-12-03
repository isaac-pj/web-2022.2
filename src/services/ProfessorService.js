import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, onSnapshot } from "firebase/firestore";

class ProfessorService {
  static list = async (firestoreDb, callback) => {
    try {
      const professorSnapshot = await getDocs(collection(firestoreDb, "professor"));
      const professors = professorSnapshot.map(({ id, data: { name, course, salary } }) => ({ id, name, course, salary }));
      callback(professors);
    } catch (error) {
      console.log(error);
    }
  };

  static list_on_snapshot = (firestoreDb, callback) => {
    const q = query(collection(firestoreDb, "professor"));
    onSnapshot(q, (querySnapshot) => {
      const professors = [];
      querySnapshot.forEach((document) => {
        const id = document.id;
        const { name, course, salary } = document.data();
        professors.push({ id, name, course, salary });
      });
      callback(professors);
    });
  };

  static add = async (firestoreDb, callback, professor) => {
    try {
      const docRef = await addDoc(collection(firestoreDb, "professor"), professor);
      callback(docRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  static retrieve = async (firestoreDb, callback, id) => {
    try {
      const docSnap = await getDoc(doc(firestoreDb, "professor", id));
      if (!docSnap.exists()) return;
      callback(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  static update = async (firestoreDb, callback, id, professor) => {
    try {
      await updateDoc(doc(firestoreDb, "professor", id), professor);
      callback(true);
    } catch (error) {
      console.log(error);
    }
  };

  static delete = async (firestoreDb, callback, id) => {
    try {
      await deleteDoc(doc(firestoreDb, "professor", id));
      callback(true);
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProfessorService;
