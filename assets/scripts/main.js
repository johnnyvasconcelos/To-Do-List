//#region Task Dropdown
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
    item.addEventListener("click", function () {
      let taskItem = this.closest(".task__item");
      let dropdownMenu = taskItem.querySelector(".dropdown-menu");

      ////TODO: Adicionar logica AO clicar no EDIT, aqui so ta um alert
      alert("Edit clicked");

      if (dropdownMenu) {
        dropdownMenu.classList.remove("show");
      }
    });
  });

  // Evento de clique para a opção "Remove"
  document.querySelectorAll(".remove").forEach((item) => {
    item.addEventListener("click", function () {
      let modal = document.querySelector(".modal-background");
      modal.classList.add("show--modal");
      let removeBtn = document.querySelector(".yes");
      let removeCancel = document.querySelector(".no");
      let taskItemToRemove = item.closest(".task__item");
      removeBtn.onclick = function () {
        taskItemToRemove.remove();
        modal.classList.remove("show--modal");
      };
      removeCancel.onclick = function () {
        modal.classList.remove("show--modal");
      };
    });
  });

  // Fecha o dropdown quando clicar em qualquer lugar fora do menu ou do botão de 3 pontinhos
  document.addEventListener("click", function (event) {
    document.querySelectorAll(".dropdown-menu.show").forEach((openDropdown) => {
      if (
        !openDropdown.contains(event.target) &&
        !event.target.closest(".delete-btn")
      ) {
        openDropdown.classList.remove("show");
      }
    });
  });
});

//#endregion

//#region Footer Dropdown

document.addEventListener("DOMContentLoaded", function () {
  function toggleFooterDropdown(buttonSelector, menuSelector) {
    document.querySelectorAll(buttonSelector).forEach((button) => {
      button.addEventListener("click", function (event) {
        event.stopPropagation();

        let dropdownMenu = this.closest(".footer").querySelector(menuSelector);

        document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
          if (menu !== dropdownMenu) {
            menu.classList.remove("show");
          }
        });

        dropdownMenu.classList.toggle("show");
      });
    });
  }

  toggleFooterDropdown(".delete-btn-footer", ".dropdown-menu");

  // Evento de clique para a opção add
  document.querySelectorAll(".add").forEach((item) => {
    item.addEventListener("click", function () {
      let footer = this.closest(".footer");
      let dropdownMenu = footer.querySelector(".dropdown-menu");

      ////TODO: Adicionar logica AO clicar no ADD, aqui so ta um alert
      alert("Add Clicked");

      if (dropdownMenu) {
        dropdownMenu.classList.remove("show");
      }
    });
  });

  // Evento de clique para a opção "Remove"
  document.querySelectorAll(".cancel").forEach((item) => {
    item.addEventListener("click", function () {
      let footer = this.closest(".footer");
      let dropdownMenu = footer.querySelector(".dropdown-menu");

      ////TODO: Adicionar logica AO clicar no CANCEL, aqui so ta um alert
      alert("Cancel Clicked");

      if (dropdownMenu) {
        dropdownMenu.classList.remove("show");
      }
    });
  });

  // Fecha qualquer dropdown ao clicar fora
  document.addEventListener("click", function (event) {
    document.querySelectorAll(".dropdown-menu.show").forEach((openDropdown) => {
      if (
        !openDropdown.contains(event.target) &&
        !event.target.closest(".delete-btn-footer")
      ) {
        openDropdown.classList.remove("show");
      }
    });
  });
});

//#endregion


const checkBoxes = document.querySelectorAll('input[type="checkbox"]');

for (let i = 0; i < checkBoxes.length; i++) {
  checkBoxes[i].addEventListener('click', function () {
    checkLabel[i].classList.add('task-check');
    if (checkBoxes[i].checked) {
      checkLabel[i].classList.add('task-check');
    } else {
      checkLabel[i].classList.remove('task-check');
    }
  });
}

const checkLabel = document.querySelectorAll('label');