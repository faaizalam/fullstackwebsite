burger = document.querySelector('#burger')
navbar = document.querySelector('.navbar')
thisisul = document.querySelector('.thisisul')
logo = document.querySelector('.logo')


burger.addEventListener('click', () => {
   navbar.classList.toggle('navres')
   thisisul.classList.toggle('ulres')
   logo.classList.toggle('logoo')
   
})




// animation
const texts = ["freelancer", "youtuber", "full stack web developer"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
   if (count === texts.length) {
      count = 0;

   }
   currentText = texts[count];
   letter = currentText.slice(0, ++index);
   document.querySelector(".typing").textContent = letter;
   if (letter.length === currentText.length) {
      count++;
      index = 0;
      
   }
   setTimeout(type, 300);
})();

// animation finsih





