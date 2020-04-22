import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyB6L5YK9PnSlPpAxurJE5FoEccEj2jtwfs',
	authDomain: 'connet-8a490.firebaseapp.com',
	databaseURL: 'https://connet-8a490.firebaseio.com',
	projectId: 'connet-8a490',
	storageBucket: 'connet-8a490.appspot.com',
	messagingSenderId: '563340008772',
	appId: '1:563340008772:web:30e8c95d6ab35eb7ce8b11',
	measurementId: 'G-BG88ELVWQG',
};

const app = firebase.initializeApp(firebaseConfig);

// var storage = firebase.storage();

// export { storage, firebase as default };
// export const db = app.database();
