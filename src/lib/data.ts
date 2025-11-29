import { collection, getDocs, limit, query, doc, getDoc, setDoc } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import type { Product, Project, Event } from '@/types';
import { firebaseConfig } from '@/firebase/config';
import type { User as FirebaseUser } from 'firebase/auth';

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

async function fetchData<T>(collectionName: string, count?: number): Promise<T[]> {
  try {
    const q = count 
      ? query(collection(db, collectionName), limit(count))
      : query(collection(db, collectionName));
    
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`No documents found in ${collectionName} collection.`);
      return [];
    }

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  } catch (error) {
    console.error(`Error fetching from ${collectionName}:`, error);
    return [];
  }
}

export async function getProducts(count?: number): Promise<Product[]> {
  const products = await fetchData<Product>('products', count);
  return products.map(product => ({
    ...product,
    price: Number(product.price)
  }));
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const productData = docSnap.data() as Omit<Product, 'id'>;
      return { 
        id: docSnap.id, 
        ...productData, 
        price: Number(productData.price) 
      };
    } else {
      console.warn(`Product with id ${id} not found.`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function getProjects(count?: number): Promise<Project[]> {
  return fetchData<Project>('projects', count);
}

export async function getEvents(count?: number): Promise<Event[]> {
    return fetchData<Event>('events', count);
}

export async function createUserProfile(user: FirebaseUser): Promise<void> {
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
}
