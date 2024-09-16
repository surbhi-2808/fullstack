const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.getTodos = functions.https.onRequest(async (req, res) => {
  const snapshot = await admin.firestore().collection('todos').get();
  const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.status(200).json(todos);
});

exports.addTodo = functions.https.onRequest(async (req, res) => {
  const newTodo = req.body;
  const docRef = await admin.firestore().collection('todos').add(newTodo);
  res.status(201).json({ id: docRef.id, ...newTodo });
});

exports.deleteTodo = functions.https.onRequest(async (req, res) => {
  const id = req.query.id;
  await admin.firestore().collection('todos').doc(id).delete();
  res.status(204).end();
});
