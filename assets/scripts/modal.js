// descartável
document.querySelector(".btn-modal").addEventListener("click", function (ev) {
  let modal = document.querySelector(".modal-background");
  modal.classList.toggle("show--modal");
});

//#region Dropdown

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();

      let taskItem = this.closest(".task__item");
      let dropdownMenu = taskItem.querySelector(".dropdown-menu");

      // Fecha qualquer outro dropdown aberto, pra nao ter 2 drropdowns
      document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
        if (menu !== dropdownMenu) {
          menu.classList.remove("show");
        }
      });

      dropdownMenu.classList.toggle("show");
    });
  });

  // Evento de clique para a opção "Edit"
  document.querySelectorAll(".edit").forEach((item) => {
    item.addEventListener("click", () => {
      let dropdownMenu = document.querySelector(".dropdown-menu.show");

      alert("Edit clicked");

      dropdownMenu.classList.remove("show");
    });
  });

  // Evento de clique para a opção "Remove"
  document.querySelectorAll(".remove").forEach((item) => {
    item.addEventListener("click", () => {
      let taskItem = item.closest(".task__item");
      let dropdownMenu = taskItem.querySelector(".dropdown-menu.show");

      taskItem.remove();

      if (dropdownMenu) {
        dropdownMenu.classList.remove("show");
      }
    });
  });

  // Fecha o dropdown quando clicar em qualquer lugar fora do menu ou do botão de 3 pontinhos
  document.addEventListener("click", function (event) {
    let openDropdown = document.querySelector(".dropdown-menu.show");

    if (
      openDropdown &&
      !openDropdown.contains(event.target) &&
      !event.target.closest(".delete-btn")
    ) {
      openDropdown.classList.remove("show");
    }
  });
});

//#endregion
