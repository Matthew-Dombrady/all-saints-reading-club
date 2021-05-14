import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const addStudent = functions.https.onRequest(async (request, response) => {

    response.set('Access-Control-Allow-Origin', '*');

    const id = "" + request.query.uid;
    console.log("UID: " + id);

    admin.firestore().collection("students").doc(id).set({
      firstName: request.query.firstName,
      lastName: request.query.lastName,
      grade: request.query.grade,
      email: request.query.email,  
    })
    .then(() => {
      console.log("Document successfully written!");
      response.send("Success");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  

  });  

  export const getStudent = functions.https.onRequest(async (request, response) => {

    response.set('Access-Control-Allow-Origin', '*');

    const id = "" + request.query.uid;
    const docRef = admin.firestore().collection("students").doc(id);

    docRef.get().then((doc) => {
      if (doc.exists) {
          const studentData = doc.data();
          response.send(studentData);
          
      } else {
          console.log("No such document!");
      }

    }).catch((error) => {
        console.log("Error getting student:", error.message);
    });


  });  

  export const getBook = functions.https.onRequest(async (request, response) => {

    response.set('Access-Control-Allow-Origin', '*');

    const id = "" + request.query.id;
    const docRef = admin.firestore().collection("books").doc(id);

    docRef.get().then((doc) => {
      if (doc.exists) {
          const bookData = doc.data();
          response.send(bookData);
          
      } else {
          console.log("No such document!");
          response.send("Failed");
      }

    }).catch((error) => {
        console.log("Error getting book:", error.message);
    });


  }); 
  
  export const getPrize = functions.https.onRequest(async (request, response) => {

    response.set('Access-Control-Allow-Origin', '*');

    const id = "" + request.query.id;
    const docRef = admin.firestore().collection("prizes").doc(id);

    docRef.get().then((doc) => {
      if (doc.exists) {
          const prizeData = doc.data();
          response.send(prizeData);
          
      } else {
          console.log("No such document!");
          response.send("Failed");
      }

    }).catch((error) => {
        console.log("Error getting prize:", error.message);
    });


  });  

  export const getUserBooks = functions.https.onRequest(async (request, response) => {

    response.set('Access-Control-Allow-Origin', '*');

    const uid = "" + request.query.uid;
    const docRef = admin.firestore().collection("students").doc(uid).collection("student_books");



    docRef
    .get()
    .then((docs) => {

      var studentBooks: { title: string; pages: string }[] = [];

      docs.forEach((d) => {
        const title = d.data().title;
        const pages = d.data().pages;

        const obj = {
          title,
          pages
        };

        studentBooks.push(obj);
      })
      response.send([1,2,3]);
    })
    .catch((error) => {
        console.log("Error getting prize:", error.message);
    });


  });  