const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 587,  // Utilisez 465 pour SSL ou 587 pour TLS
  secure: false, // Utilisez true pour port 465 (SSL), false pour port 587 (TLS)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Ajoutez ceci pour ignorer les erreurs liées aux certificats
    ciphers: 'SSLv3' // Ajout de cette ligne si nécessaire pour les connexions sécurisées
  }
});

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

app.post("/sponsor", (req, res) => {
  const { name, surname, email, number, company } = req.body;

  if(!email){
    return res.status(400).json("Entrer une adresse mail")
  }

  const mailOptions = {
    from: email,
    bcc: "kenouyakevin@gmail.com",
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

Cordialement,`,
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

  if(!email){
    return res.status(400).json("Entrer une adresse mail")
  }

  const mailOptions = {
    from: email, 
    bcc: "kenouyakevin@gmail.com",
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

Cordialement`,
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
