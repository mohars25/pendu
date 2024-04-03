const categories = {
  football: ["ARSENAL", "LIVERPOOL", "MANCHESTER"],
  pays: ["FRANCE", "SUISSE", "ITALIE"],
  prenoms: ["MOHAMED", "JULIE", "NICOLAS"],
};

let categorieChoisie = "football";
let mot = choisirMot();
let motAffiche = "_ ".repeat(mot.length);
let essaisRestants = 6;

function choisirMot() {
  const mots = categories[categorieChoisie];
  return mots[Math.floor(Math.random() * mots.length)];
}

function changerCategorie() {
  categorieChoisie = document.getElementById("categorie").value;
  mot = choisirMot();
  resetJeu();
}

function mettreAJourMotAffiche() {
  document.getElementById("mot").textContent = motAffiche;
  document.getElementById(
    "essais"
  ).textContent = `Nombre d'essais restants : ${essaisRestants}`;
  mettreAJourImagePendu();
}

function mettreAJourImagePendu() {
  const numeroImage = 6 - essaisRestants;
  document.getElementById(
    "imagePendu"
  ).src = `./imagePendu/pendu${essaisRestants}.png`;
}

function PlayZikVictoire() {
  const audio = new Audio("ZIK.mp3");
  audio.play();
}

function PlayZikdefaite() {
  const audio = new Audio("DEFAITE.mp3");
  audio.play();
}

function finDeJeu(gagne) {
  const couleur = gagne ? "green" : "red";
  document.body.style.animationName = "clignoter";
  document.body.style.animationDuration = "10s";
  document.body.style.animationIterationCount = "3";
  document.body.style.backgroundColor = couleur;
}

function faireDevinette() {
  let devinette = document.getElementById("devinette").value.toUpperCase();
  document.getElementById("devinette").value = "";

  if (devinette.length !== 1 || !/[A-Z]/.test(devinette)) {
    alert(".");
    return;
  }

  let nouveauMotAffiche = "";
  let devinetteCorrecte = false;

  for (let i = 0; i < mot.length; i++) {
    if (mot[i] === devinette) {
      nouveauMotAffiche += devinette + " ";
      devinetteCorrecte = true;
    } else {
      nouveauMotAffiche += motAffiche[i * 2] + " ";
    }
  }

  motAffiche = nouveauMotAffiche;
  mettreAJourMotAffiche();

  if (!devinetteCorrecte) {
    essaisRestants--;
    mettreAJourMotAffiche();
    if (essaisRestants <= 0) {
      finDeJeu(false);
      PlayZikdefaite();
    }
  }

  if (!motAffiche.includes("_")) {
    finDeJeu(true);
    PlayZikVictoire();
  }
}

function resetJeu() {
  motAffiche = "_ ".repeat(mot.length);
  essaisRestants = 6;
  mettreAJourMotAffiche();
  document.body.style.backgroundColor = "";
  document.body.style.animation = "";
}

resetJeu();
