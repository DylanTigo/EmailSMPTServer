const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL, // Remplacez par votre utilisateur SMTP
    pass: process.env.PASSWORD, // Remplacez par votre mot de passe SMTP
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/sponsor", (req, res) => {
  const { name, surname, email, number, company } = req.body;

  const mailOptions = {
    from: email, // Utiliser l'adresse email renseignée dans le formulaire
    to: process.env.EMAIL,
    subject: `Devenir Sponsor par ${name} ${surname}`,
    text: `Bonjour CJD,

Nous avons reçu un formulaire rempli avec les informations suivantes :

Nom : ${name}
Prénom : ${surname}
Email : ${email}
Téléphone : ${number}
Nom de l'entreprise : ${company}

Ces informations ont été soumises par ${name} ${surname}.

Si vous avez des questions ou avez besoin de plus d'informations, vous pouvez contacter l'émetteur à l'adresse email ${email} ou au numéro de téléphone ${number}.

Cordialement,
[Votre Nom]`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email envoyé: " + info.response);
  });
});

app.post("/partnership", (req, res) => {
  const { name, surname, dateNais, email, number, company, whyUs } = req.body;

  const mailOptions = {
    from: email, 
    to: process.env.EMAIL,
    subject: `Devenir Partenaire par ${name} ${surname}`,
    text: `Bonjour CJD,

Nous avons reçu un formulaire d'inscription rempli avec les informations suivantes :

Nom : ${name}
Prénom : ${surname}
Date de naissance : ${dateNais}
Email : ${email}
Numéro de téléphone : ${number}
Nom de l'entreprise : ${company}
Pourquoi rejoindre le CJD : ${whyUs}

Ces informations ont été soumises par ${name} ${surname}.

Si vous avez des questions ou avez besoin de plus d'informations, vous pouvez contacter l'émetteur à l'adresse email ${email} ou au numéro de téléphone ${number}.

Cordialement,
[Votre Nom]`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email envoyé: " + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
