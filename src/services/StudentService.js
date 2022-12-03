import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, onSnapshot } from "firebase/firestore";

class StudentService {
  static list = async (firestoreDb, callback) => {
    try {
      const studentSnapshot = await getDocs(collection(firestoreDb, "student"));
      const students = studentSnapshot.map(({ id, data: { name, course, ira } }) => ({ id, name, course, ira }));
      callback(students);
    } catch (error) {
      console.log(error);
    }
  };

  static list_on_snapshot = (firestoreDb, callback) => {
    const q = query(collection(firestoreDb, "student"));
    onSnapshot(q, (querySnapshot) => {
      const students = [];
      querySnapshot.forEach((document) => {
        const id = document.id;
        const { name, course, ira } = document.data();
        students.push({ id, name, course, ira });
      });
      callback(students);
    });
  };

  static add = async (firestoreDb, callback, student) => {
    try {
      const docRef = await addDoc(collection(firestoreDb, "student"), student);
      callback(docRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  static retrieve = async (firestoreDb, callback, id) => {
    try {
      const docSnap = await getDoc(doc(firestoreDb, "student", id));
      if (!docSnap.exists()) return;
      callback(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  static update = async (firestoreDb, callback, id, student) => {
    try {
      await updateDoc(doc(firestoreDb, "student", id), student);
      callback(true);
    } catch (error) {
      console.log(error);
    }
  };

  static delete = async (firestoreDb, callback, id) => {
    try {
      await deleteDoc(doc(firestoreDb, "student", id));
      callback(true);
    } catch (error) {
      console.log(error);
    }
  };
}

export default StudentService;
