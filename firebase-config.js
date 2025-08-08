// Configuração do Firebase para o projeto "Game"
const firebaseConfig = {
  apiKey: "AIzaSyDB8b3Za9gkNY4hypl27RXjFmKN-B2Ry-U",
  authDomain: "game-a0337.firebaseapp.com",
  projectId: "game-a0337",
  storageBucket: "game-a0337.appspot.com", // corrigido
  messagingSenderId: "623161656290",
  appId: "1:623161656290:web:539fad00954b022c06efbb",
  measurementId: "G-G197MN430S"
};

// Inicializa o Firebase (modo compatível com v8)
firebase.initializeApp(firebaseConfig);

// Serviços
const auth = firebase.auth();
const db = firebase.firestore();
