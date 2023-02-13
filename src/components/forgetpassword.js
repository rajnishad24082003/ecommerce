import { ref, get } from "firebase/database";
import { database } from "../misc/firebase";

export const forgetpassword = ({ emailforget }) => {
  const Emailjs = ({ formName, formEmail, formpassword }) => {
    if (window.Email) {
      window.Email.send({
        Host: "smtp.elasticemail.com",
        Username: "1032210891@tcetmumbai.in",
        Password: "1C6FE977958BAD2A82CC69C90C76208DC83B",
        Port: 2525,
        To: formEmail,
        From: "1032210891@tcetmumbai.in",
        Subject: "otp for college website",
        Body: `hi ${formName} your password for the account ${formEmail} is : ${formpassword}`,
      })
        .then((message) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const dbRef = ref(database, "/profile");
  let result = [];
  get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        result = Object.keys(snapshot.val()).map((key) => [
          { firebaseId: key, ...snapshot.val()[key] },
        ]);
        result.map((val, index) => {
          if (val[0].email == emailforget) {
            Emailjs({
              formName: val[0].name,
              formEmail: val[0].email,
              formpassword: val[0].password,
            });
          }
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
