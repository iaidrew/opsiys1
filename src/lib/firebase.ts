import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  getDoc, 
  setDoc, 
  getDocFromServer,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

export const logout = () => signOut(auth);

// --- Profile Service ---

export const updateProfile = async (userId: string, profileData: {
  displayName: string;
  company?: string;
  role?: string;
  industry?: string;
}) => {
  try {
    const profileRef = doc(db, "profiles", userId);
    await setDoc(profileRef, {
      ...profileData,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const profileRef = doc(db, "profiles", userId);
    const snap = await getDoc(profileRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// --- Leads Service ---

export const submitLead = async (leadData: {
  name: string;
  email: string;
  company: string;
  phone: string;
  budget: string;
  projectType: string;
  urgency: string;
  message: string;
  userId?: string;
}) => {
  try {
    const leadsRef = collection(db, "leads");
    await addDoc(leadsRef, {
      ...leadData,
      createdAt: serverTimestamp(),
      status: "new",
    });
  } catch (error) {
    console.error("Error submitting lead:", error);
    throw error;
  }
};

export const subscribeToUserLeads = (userId: string, callback: (leads: any[]) => void) => {
  const leadsRef = collection(db, "leads");
  const q = query(
    leadsRef, 
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const leads = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(leads);
  });
};

// --- Connection Test ---
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();
