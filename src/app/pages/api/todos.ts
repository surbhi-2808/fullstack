// pages/api/todos.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { firestore } from './firebase'; // Import Firestore instance
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const todosCollection = collection(firestore, 'todos'); // Get reference to 'todos' collection
      const snapshot = await getDocs(todosCollection);
      const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  } else if (req.method === 'POST') {
    try {
      const newTodo = req.body;
      const todosCollection = collection(firestore, 'todos'); // Get reference to 'todos' collection
      const docRef = await addDoc(todosCollection, newTodo); // Add a new document
      res.status(201).json({ id: docRef.id, ...newTodo });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add todo' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const id = req.query.id as string;
      const todoDoc = doc(firestore, 'todos', id); // Get reference to the specific document
      await deleteDoc(todoDoc); // Delete the document
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
