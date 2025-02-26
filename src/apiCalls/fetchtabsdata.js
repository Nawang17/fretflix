import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseconfig";

async function fetchTabs() {
  const tabsCollection = collection(db, "tabs");
  const tabsSnapshot = await getDocs(tabsCollection);
  const tabsList = tabsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return tabsList;
}

async function fetchTabByTitle(title) {
  const tabsCollection = collection(db, "tabs");

  // Create a query to find the tab with the specified title
  const q = query(tabsCollection, where("title", "==", title));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.error("No tab found with that title!");
    return null;
  }

  // Since we expect only one tab to match the title, get the first document
  const tab = querySnapshot.docs[0].data();
  return tab;
}

export { fetchTabs, fetchTabByTitle };
