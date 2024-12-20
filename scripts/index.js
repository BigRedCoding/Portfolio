const pageMain = document.querySelector(".page");
const gameButton = document.querySelector(".demonstrations__game-button");
const gameButton1 = document.querySelector(".demonstrations__game-button1");
const gameButton2 = document.querySelector(".demonstrations__game-button2");
const websiteButton1 = document.querySelector(
  ".demonstrations__website-button1"
);
const websiteButton2 = document.querySelector(
  ".demonstrations__website-button2"
);

const sidePanel = document.querySelector(".panel");

const collapseButton = document.querySelector(
  ".button__toggle-visibility-collapse"
);
const expandButton = document.querySelector(
  ".button__toggle-visibility-expand"
);

const cdaNextButton = document.querySelector(".work__cda-next");
const cdaPreviousButton = document.querySelector(".work__cda-previous");
const cdaPage1 = document.querySelector("#Cda-page1");
const cdaList = document.querySelector("#Cda-list");
const cdaPage3 = document.querySelector("#Cda-page3");

const cdaButton = document.querySelector(".work__cdawindow-button");
const mcdonaldsButton = document.querySelector(".work__mcdonalds-button");
const staplesButton = document.querySelector(".work__staples-button");
const super1foodsButton = document.querySelector(".work__super1foods-button");

const emailPhoneButton = document.querySelector(".panel__email-button");
const emailPhonePanel = document.querySelector(".panel__contact-info");
const contactCloseButton = document.querySelector(".contact__close-button");

const mcdonaldPage1 = document.querySelector(".work__details-mcdonalds");
const staplesPage1 = document.querySelector(".work__details-staples");
const super1foodsPage1 = document.querySelector(".work__details-super1foods");
const workDetailsTitle = document.getElementById("work-details-title");

const introPanel = document.querySelector(".intro");

let pageTick = 0;
let companyRefTick = 0;
let CaptchaConfirm = false;

introPanel.addEventListener("click", () => {
  introPanel.classList.add("hide");
  pageMain.classList.remove("hide");
  sidePanel.classList.remove("hide");
});

gameButton.addEventListener("click", () => {
  window.open("./game/sampleravens.html", "_blank");
});

gameButton1.addEventListener("click", () => {
  window.open("./game2/sampleshooter.html", "_blank");
});

gameButton2.addEventListener("click", () => {
  window.open("./game3/demorpg.html", "_blank");
});

websiteButton1.addEventListener("click", () => {
  window.open(
    (URL = "https://bigredcoding.github.io/se_project_spots/"),
    "_blank"
  );
});

websiteButton2.addEventListener("click", () => {
  window.open(
    (URL = "https://bigredcoding.github.io/se_project_ToDo/"),
    "_blank"
  );
});

collapseButton.addEventListener("click", () => {
  sidePanel.classList.add("hide");
  pageMain.classList.remove("offset");
  expandButton.classList.add("isVisible");
});

expandButton.addEventListener("click", () => {
  sidePanel.classList.remove("hide");
  pageMain.classList.add("offset");
  expandButton.classList.remove("isVisible");
});

cdaButton.addEventListener("click", () => {
  cdaPage1.classList.remove("hide");
  cdaPreviousButton.classList.add("hide");
  cdaList.classList.add("hide");
  cdaPage3.classList.add("hide");
  mcdonaldPage1.classList.add("hide");
  staplesPage1.classList.add("hide");
  super1foodsPage1.classList.add("hide");
  workDetailsTitle.textContent = "The Coeur d'Alene Window Company";
});
mcdonaldsButton.addEventListener("click", () => {
  cdaPage1.classList.add("hide");
  cdaPreviousButton.classList.add("hide");
  cdaList.classList.add("hide");
  cdaPage3.classList.add("hide");
  mcdonaldPage1.classList.remove("hide");
  staplesPage1.classList.add("hide");
  super1foodsPage1.classList.add("hide");
  workDetailsTitle.textContent = "McDonalds";
});
staplesButton.addEventListener("click", () => {
  cdaPage1.classList.add("hide");
  cdaPreviousButton.classList.add("hide");
  cdaList.classList.add("hide");
  cdaPage3.classList.add("hide");
  mcdonaldPage1.classList.add("hide");
  staplesPage1.classList.remove("hide");
  super1foodsPage1.classList.add("hide");
  workDetailsTitle.textContent = "Staples";
});
super1foodsButton.addEventListener("click", () => {
  cdaPage1.classList.add("hide");
  cdaPreviousButton.classList.add("hide");
  cdaList.classList.add("hide");
  cdaPage3.classList.add("hide");
  mcdonaldPage1.classList.add("hide");
  staplesPage1.classList.add("hide");
  super1foodsPage1.classList.remove("hide");
  workDetailsTitle.textContent = "Super 1 Foods";
});

cdaNextButton.addEventListener("click", () => {
  if (pageTick === 0 && companyRefTick === 0) {
    cdaPreviousButton.classList.remove("hide");
    cdaPage1.classList.add("hide");
    cdaList.classList.remove("hide");
  }
  if (pageTick === 1 && companyRefTick === 0) {
    cdaPage3.classList.remove("hide");
    cdaList.classList.add("hide");
    cdaNextButton.classList.add("hide");
  }
  pageTick = pageTick + 1;
});

cdaPreviousButton.addEventListener("click", () => {
  if (pageTick === 1 && companyRefTick === 0) {
    cdaPreviousButton.classList.add("hide");
    cdaPage1.classList.remove("hide");
    cdaList.classList.add("hide");
  }
  if (pageTick === 2 && companyRefTick === 0) {
    cdaPage3.classList.add("hide");
    cdaList.classList.remove("hide");
    cdaNextButton.classList.remove("hide");
  }
  pageTick = pageTick - 1;
});

contactCloseButton.addEventListener("click", () => {
  emailPhonePanel.classList.add("hide");
});

// Catpcha Generation
const referenceButton = document.querySelector(".reference__button");
const referenceList = document.querySelector(".references__list");

const captchaPanel = document.querySelector(".captcha");
const captchaImage = document.querySelector(".captcha__image");
const captchaSubmit = document.querySelector(".captcha__submit");
const captchaClose = document.querySelector(".captcha__close-button");

const randomChar =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

let captchaSolveBool = false;
let captchaMainText = "";
let captchaMainText1 = "";
let captchaInput = "";
let captchaTick = 0;
let captchaGenerated = false;

referenceButton.addEventListener("click", () => {
  if (captchaSolveBool == false) {
    captchaPanel.classList.remove("hide");
    captchaTick = 1;
    setCaptcha();
  } else {
    alert("Caption Solved!");
    referenceList.classList.remove("hide");
  }
});

emailPhoneButton.addEventListener("click", () => {
  if (captchaSolveBool == false) {
    captchaPanel.classList.remove("hide");
    captchaTick = 2;
    setCaptcha();
  } else {
    alert("Caption Solved!");
    emailPhonePanel.classList.remove("hide");
  }
});

captchaClose.addEventListener("click", () => {
  captchaPanel.classList.add("hide");
  captchaInput = "";
});

captchaSubmit.addEventListener("click", () => {
  checkCaptcha();
});

function setCaptcha() {
  if (captchaGenerated == false) {
    for (let i = 1; i < 5; i++) {
      captchaMainText += randomChar.charAt(Math.random() * randomChar.length);
    }
    captchaImage.append(captchaMainText);
    captchaGenerated = true;
  }
}

function checkCaptcha() {
  captchaInput = document.querySelector(".captcha__input").value;

  if (captchaInput == captchaMainText) {
    alert("Success!");
    captchaSolveBool = true;
    captchaPanel.classList.add("hide");
    captchaMainText = "";
    captchaInput = "";
  } else {
    alert("Doesn't Match. Try again!");
  }

  if (captchaSolveBool == true && captchaTick == 1) {
    referenceList.classList.remove("hide");
  } else if (captchaSolveBool == true && captchaTick == 2) {
    emailPhonePanel.classList.remove("hide");
  }
  captchaTick = 0;
}
