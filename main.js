import "./style.css";
import swal from "sweetalert";
const f = document.querySelector("form");
const habits = new NLWSetup(f);
const btn = document.querySelector("header button");
const e_sound = new Audio("../error.mp3");
const s_sound = new Audio("../success.mp3");
btn.addEventListener("click", add);
f.addEventListener("change", save);

function add() {
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5);
  const dayExists = habits.dayExists(today);
  if (dayExists) {
    habits.addDay(today);
    e_sound.play();
    swal({
      title: "Rotina criada",
      text: "Seu dia já foi incluso",
      icon: "error",
    });
    return;
  }

  habits.addDay(today);
  swal({
    title: "Rotina criada com sucesso!",
    icon: "success",
  });
  s_sound.play();
}

function save() {
  localStorage.setItem("habitsTracker", JSON.stringify(habits.data));
}

const data = JSON.parse(localStorage.getItem("habitsTracker")) || {};
habits.setData(data);
habits.load();
