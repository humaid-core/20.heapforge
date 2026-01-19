import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../components/firebase";

/* ===============================
   GET USER (LOGIN KE LIYE)
================================ */
export const getUser = async (uid) => {
  if (!uid) return null;

  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
};

/* ===============================
   UPDATE ALUMNI PROFILE
================================ */
export const updateAlumni = async (uid, profileData) => {
  if (!uid) throw new Error("UID missing");

  await setDoc(
    doc(db, "users", uid),
    {
      role: "alumni",
      profileCompleted: true,
      profile: profileData,
      updatedAt: new Date(),
    },
    { merge: true }
  );
};

/* ===============================
   UPDATE STUDENT PROFILE
================================ */
export const updateStudent = async (uid, profileData) => {
  if (!uid) throw new Error("UID missing");

  await setDoc(
    doc(db, "users", uid),
    {
      role: "student",
      profileCompleted: true,
      profile: profileData,
      updatedAt: new Date(),
    },
    { merge: true }
  );
};
