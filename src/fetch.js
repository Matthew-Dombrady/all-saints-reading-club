export async function getStudent(uid) {
    console.log("Getting student");
    // Fetch books
    const response = await fetch('localhost:5000/all-saints-reading-club/us-central1/student-getStudent?uid=' + uid);
    const student = await response.json();
    return student;
}

/*export async function getBooks(bookIDs) {

    var response;
    var book;

    bookIDs.forEach(b => {
        response = await fetch('http://localhost:5000/all-saints-reading-club/us-central1/student-getBook?id=' + b);
        book = await response.json();
        console.log("Book", book);
    });


    return "Ahh";
}*/