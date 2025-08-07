// Configuração do Firebase para o projeto "Game"
const firebaseConfig = {
  apiKey: "AIzaSyDB8b3Za9gkNY4hypl27RXjFmKN-B2Ry-U",
  authDomain: "game-a0337.firebaseapp.com",
  projectId: "game-a0337",
  storageBucket: "game-a0337.firebasestorage.app",
  messagingSenderId: "623161656290",
  appId: "1:623161656290:web:539fad00954b022c06efbb",
  measurementId: "G-G197MN430S"
};

// Inicializa o Firebase com SDK compatível (para uso com HTML/JS simples)
firebase.initializeApp(firebaseConfig);

// Exporta os serviços de autenticação e banco de dados Firestore
const auth = firebase.auth();
const db = firebase.firestore();
