import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const addStudent = functions.https.onRequest(async (request, response) => {

    const data = {
      firstName: request.query.firstName,
      lastName: request.query.lastName,
      grade: request.query.grade,
      email: request.query.email,  
    };

    const writeResult =  await admin.firestore().collection("students").add(data);

    response.json({result: `Student with ID: ${writeResult.id} added.`});


  });  