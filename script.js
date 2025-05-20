$(document).ready(function () {
  $(".option").on("click", function () {
    const choice = Number(this.dataset.door);
    montyProblem(choice);
  });
});

function montyProblem(first_choice) {
  const win = Math.ceil(Math.random() * 3);
  console.log("Winning door: " + win);
  console.log("First choice: " + first_choice);
  const doors = [1, 2, 3];
  const availableDoor = doors.filter((d) => d !== first_choice && d !== win);
  const revealDoor =
    availableDoor[Math.floor(Math.random() * availableDoor.length)];
    const remainingDoor = doors.filter((d) => d !== revealDoor && d !== first_choice);
  console.log("Available door: " + availableDoor);
  console.log("Reveal door: " + revealDoor);

  $(`[data-door=${availableDoor}]`).attr("src", "images/opened_empty_door.png"); 
  $(".option").prop("disabled", true);
  $("#stick, #swap").prop("disabled", false);
  $(".text").text("You chose Door #" + first_choice + " Do you want to stick or swap?");

  $("#stick").on("click", function () {
    if (first_choice === win) {
      $(".text").text("You won! The prize was behind Door #" + win);
      $(".option").attr("src", "images/opened_empty_door.png");
      $(`[data-door=${win}]`).attr("src", "images/win_door.png");
    } else {
      $(".text").text("Should've stuck to your guns. The prize was behind Door #" + remainingDoor);
      $(`[data-door=${win}]`).attr("src", "images/win_door.png");
      $(`[data-door=${first_choice}]`).attr("src", "images/opened_empty_door.png");
    }
    $("#stick, #swap").prop("disabled", true);

  });
  $("#swap").on("click", function () {
    if (first_choice === win) {
      $(".text").text("Shouldn't have swapped. The prize was behind Door #" + win);
      $(".option").attr("src", "images/opened_empty_door.png")
      $(`[data-door=${first_choice}]`).attr("src", "images/win_door.png");
    } else {
      $(".text").text("Good job swapping! The prize was behind Door #" + remainingDoor);
      $(".option").attr("src", "images/opened_empty_door.png");
      $(`[data-door=${win}]`).attr("src", "images/win_door.png");
    }
    $("#stick, #swap").prop("disabled", true);

  });
}
function reset() {
  $(".option").attr("src", "images/closed_door.png");
  $(".text").text("Choose a Door");
  $("#stick, #swap").prop("disabled", true);
  $(".option").prop("disabled", false);
  $("#stick").off("click");
  $("#swap").off("click");
  
  console.log("Game reset.");
};
