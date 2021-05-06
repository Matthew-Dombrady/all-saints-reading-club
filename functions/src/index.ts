import * as functions from "firebase-functions";
import * as student from "./student";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const helloWorld = functions.https.onCall((data, context) => {
    console.log('its running');
    return 'hello, ninjas';
});

export = { student, helloWorld };

