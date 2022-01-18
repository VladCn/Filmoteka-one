const modalGen = document.querySelector(".modal")
const hiddenAct = document.querySelector(".hidden")
const modalBtn = document.querySelector(".modal__button")
const modalLink = document.querySelectorAll(".modal__link")

modalBtn.addEventListener("click", actionBtn)

function actionBtn(e){
  console.log(e)
  modalGen.classList.add("hidden")
}

clickF = function(id){
  console.log(id)
  modalGen.classList.remove("hidden")
}
//
//   function actionLink(e){
//     console.log(e)
//   }