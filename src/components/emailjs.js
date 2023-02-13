export const Emailjs = ({ formName, formEmail, formotp }) => {
  if (window.Email) {
    window.Email.send({
      Host: "smtp.elasticemail.com",
      Username: "1032210891@tcetmumbai.in",
      Password: "1C6FE977958BAD2A82CC69C90C76208DC83B",
      Port: 2525,
      To: formEmail,
      From: "1032210891@tcetmumbai.in",
      Subject: "otp for ecommerse website",
      Body: `hi ${formName} your opt for the account ${formEmail} is : ${formotp}`,
    })
      .then((message) => {})
      .catch((err) => {
        console.log(err);
      });
  }
};
