//#region Task Dropdown
document.addEventListener("DOMContentLoaded", function () {
  function initDropdownEvents() {
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.replaceWith(button.cloneNode(true));
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        let taskItem = this.closest(".task__item");
        let dropdownMenu = taskItem.querySelector(".dropdown-menu");
        // Fecha qualquer outro dropdown aberto, pra nao ter 2 dropdowns
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
      item.replaceWith(item.cloneNode(true));
    });

    document.querySelectorAll(".edit").forEach((item) => {
      item.addEventListener("click", function () {
        let taskItem = this.closest(".task__item");
        let dropdownMenu = taskItem.querySelector(".dropdown-menu");
        //TODO: Adicionar logica AO clicar no EDIT
        const textArea = document.querySelector("#footerInput");
        const taskContent = taskItem.textContent;
        textArea.value = taskContent
          .trim()
          .replace(/\s*(Edit|Remove)\s*(Edit|Remove)?\s*$/g, "");
        textArea.classList.add("task-edit");
        if (dropdownMenu) dropdownMenu.classList.remove("show");
      });
    });

    // Evento de clique para a opção "Remove"
    document.querySelectorAll(".remove").forEach((item) => {
      item.replaceWith(item.cloneNode(true));
    });

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
          load();
          initDropdownEvents();
        };
        removeCancel.onclick = function () {
          modal.classList.remove("show--modal");
        };
      });
    });
  }
  function load() {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    checkBoxes.forEach((checkbox) => {
      checkbox.replaceWith(checkbox.cloneNode(true)); // limpa listeners antigos
    });

    const refreshedCheckBoxes = document.querySelectorAll(
      'input[type="checkbox"]'
    );

    refreshedCheckBoxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
          label.classList.toggle("task-check", checkbox.checked);
        }

        const item = checkbox.closest(".task__item");
        const unpreparedList = document.getElementById("taskList");
        const preparedList = document.getElementById("taskList-2");
        const toList = checkbox.checked ? preparedList : unpreparedList;

        item.classList.add("fade-out");

        setTimeout(() => {
          item.classList.remove("fade-out");
          toList.appendChild(item);
          void item.offsetWidth;
          item.classList.add("fade-in");
          setTimeout(() => item.classList.remove("fade-in"), 300);
        }, 300);
      });
    });
  }

  function toggleFooterDropdown(buttonSelector, menuSelector) {
    document.querySelectorAll(buttonSelector).forEach((button) => {
      button.addEventListener("click", function (event) {
        event.stopPropagation();

        let dropdownMenu = this.closest(".footer").querySelector(menuSelector);

        // Fecha o dropdown quando clicar em qualquer lugar fora do menu ou do botão de 3 pontinhos
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

      let footerInput = document.querySelector("#footerInput");

      ////TODO: Adicionar logica AO clicar no ADD
      if (!footerInput.value == 0) {
        const inputContent = footerInput.value;
        const tasks = document.querySelector(".task__list--unprepared");
        const taskItems = document.querySelectorAll(".task__item");
        tasks.innerHTML += `
          <li class="task__item">
            <input
              type="checkbox"
              id="${"checkBox" + taskItems.length}"
              class="checkBox"
              name="checkBox"
            />
            <label class="task-label" for="${
              "checkBox" + taskItems.length
            }">${inputContent}</label>
            <div class="delete-btn">
              <i class="bx bx-dots-horizontal-rounded"></i>
            </div>
            <ul class="dropdown-menu">
              <li class="edit"><i class="bx bx-edit"></i> Edit</li>
              <li class="remove"><i class="bx bx-trash"></i> Remove</li>
            </ul>
          </li>
          `;
        footerInput.value = null;
        load();
        initDropdownEvents();
      }

      if (dropdownMenu) {
        dropdownMenu.classList.remove("show");
      }
    });
  });

  // Evento de clique para a opção "Cancel"
  document.querySelectorAll(".cancel").forEach((item) => {
    item.addEventListener("click", function () {
      let footer = this.closest(".footer");
      let dropdownMenu = footer.querySelector(".dropdown-menu");

      ////TODO: Adicionar logica AO clicar no CANCEL
      let inputField = footer.querySelector("#footerInput");
      if (inputField) {
        inputField.value = "";
      }

      if (dropdownMenu) {
        dropdownMenu.classList.remove("show");
      }
    });
  });

  document.addEventListener("click", function (event) {
    document.querySelectorAll(".dropdown-menu.show").forEach((openDropdown) => {
      if (
        !openDropdown.contains(event.target) &&
        !event.target.closest(".delete-btn") &&
        !event.target.closest(".delete-btn-footer")
      ) {
        openDropdown.classList.remove("show");
      }
    });
  });

  load();
  initDropdownEvents();
});

document.querySelector(".add-task-btn").addEventListener("click", () => {
  document.querySelector(".footer__input").focus();
});
