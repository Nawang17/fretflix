import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig"; // Import Firestore instance
import { tabsData } from "../data";

async function uploadTabs() {
  try {
    const tabsCollection = collection(db, "tabs");

    for (let tab of tabsData) {
      await addDoc(tabsCollection, tab);
      console.log(`Added: ${tab.title}`);
    }

    console.log("All tabs uploaded!");
  } catch (error) {
    console.error("Error adding tabs:", error);
  }
}

// Call this function **ONCE** to upload data
export { uploadTabs };
