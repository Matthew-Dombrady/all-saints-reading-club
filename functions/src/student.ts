import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const addStudent = functions.https.onRequest(
    async (request, response) => {
      response.set("Access-Control-Allow-Origin", "*");

      const id = "" + request.query.uid;
      console.log("UID: " + id);

      const grd = "" + request.query.grade;
      const g = parseInt(grd);
      let nextPrize;
      if (g < 2) {
        nextPrize = "Pencil";
      } else {
        nextPrize = "Frosty";
      }

      admin
          .firestore()
          .collection("students")
          .doc(id)
          .set({
            firstName: request.query.firstName,
            lastName: request.query.lastName,
            grade: request.query.grade,
            email: request.query.email,
            next_prize: nextPrize,
          })
          .then(() => {
            console.log("Document successfully written!");
            response.send("Success");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
    }
);

export const getStudent = functions.https.onRequest(
    async (request, response) => {
      response.set("Access-Control-Allow-Origin", "*");

      const id = "" + request.query.uid;
      const docRef = admin.firestore().collection("students").doc(id);

      docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const studentData = doc.data();
              response.send(studentData);
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting student:", error.message);
          });
    }
);

export const getBook = functions.https.onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  const id = "" + request.query.id;
  const docRef = admin.firestore().collection("books").doc(id);

  docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const bookData = doc.data();
          response.send(bookData);
        } else {
          console.log("No such document!");
          response.send("Failed");
        }
      })
      .catch((error) => {
        console.log("Error getting book:", error.message);
      });
});

export const getPrize = functions.https.onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  const id = "" + request.query.id;
  const docRef = admin.firestore().collection("prizes").doc(id);

  docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const prizeData = doc.data();
          response.send(prizeData);
        } else {
          console.log("No such document!");
          response.send("Failed");
        }
      })
      .catch((error) => {
        console.log("Error getting prize:", error.message);
      });
});

export const getUserBooks = functions.https.onRequest(
    async (request, response) => {
      response.set("Access-Control-Allow-Origin", "*");

      const uid = "" + request.query.uid;
      const docRef = admin
          .firestore()
          .collection("students")
          .doc(uid)
          .collection("user_books");

      const docs = await docRef.get();

      const studBooks: { title: string; author: string; pages: string }[] = [];

      docs.forEach((d) => {
        const title = d.data().title;
        const author = d.data().author;
        const pages = d.data().pages;

        const obj = {
          title,
          author,
          pages,
        };

        studBooks.push(obj);
      });

      response.send(studBooks);
    }
);

export const createBook = functions.https.onRequest(
    async (request, response) => {
      response.set("Access-Control-Allow-Origin", "*");

      const userid = "" + request.query.userid;
      const title = "" + request.query.title;

      console.log("USER ID: " + userid);

      const docRef = await admin.firestore().collection("students").doc(userid);

      await docRef.collection("user_books").doc(title).set({
        title: request.query.title,
        author: request.query.author,
        pages: request.query.pages,
        q1: request.query.q1,
        q2: request.query.q1,
        q3: request.query.q1,
        a1: request.query.a1,
        a2: request.query.a2,
        a3: request.query.a3,
      });

      response.send("Book added to user with id " + userid);
    }
);

export const getPrizes = functions.https.onRequest(
    async (request, response) => {
      response.set("Access-Control-Allow-Origin", "*");

      const docRef = admin.firestore().collection("prizes");

      const docs = await docRef.get();

      const prizes: { name: string; target1: string; target2: string }[] = [];

      docs.forEach((d) => {
        console.log("Doc: " + d.data());
        const name = d.data().name;
        const target1 = d.data().target1;
        const target2 = d.data().target2;
        const target3 = d.data().target3;

        const obj = {
          name,
          target1,
          target2,
          target3,
        };

        prizes.push(obj);
      });

      response.send(prizes);
    }
);

export const increaseBooks = functions.https.onRequest(
    async (request, response) => {
      response.set("Access-Control-Allow-Origin", "*");

      const userid = "" + request.query.userid;
      const prev = "" + request.query.num;

      const prevNum = parseInt(prev);

      admin
          .firestore()
          .collection("students")
          .doc(userid)
          .update({
            num_books: prevNum + 1,
          })
          .then(() => {
            console.log("Document successfully updated!");
            response.send("Success");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
    }
);

export const changePrize = functions.https.onRequest(
    async (request, response) => {
      response.set("Access-Control-Allow-Origin", "*");

      const userid = "" + request.query.userid;

      console.log("ID:" + userid);

      admin
          .firestore()
          .collection("students")
          .doc(userid)
          .update({
            next_prize: request.query.prize,
          })
          .then(() => {
            console.log("Prize successfully updated!");
            response.send("Success");
          })
          .catch((error) => {
            response.send(error);
          });
    }
);
