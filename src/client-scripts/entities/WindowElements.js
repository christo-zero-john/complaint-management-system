class PopUp {
  constructor() {
    let popupEl = document.createElement("div");
    popupEl.id = "popup";
    document.body.appendChild(popupEl);
    popupEl.classList = "custom-popup";
    document.head.innerHTML += `<link rel="stylesheet" href='../../styles/style.css'/>`;

    this.popover = new bootstrap.Popover(popupEl, {
      container: document.body,
      title: "Title",
      content: "Content",
      placement: "top",
      trigger: "manual",
      html: true,
      animation: true,
      popperConfig: {
        strategy: "fixed",
        modifiers: [
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
            },
          },
        ],
      },
    });
  }

  show() {
    this.popover.show();
  }

  hide() {
    this.popover.hide();
  }

  setTitle(title) {
    this.title = title;
    this.popover.setContent({
      ".popover-header": this.title,
      ".popover-body": this.content,
    });
  }

  setContent(content) {
    let btn = `<p class='btn btn-close float-end' onclick="window.popup.hide()"></p>`;
    this.content = `
      ${btn}
      <span>${content}</span>
    `;

    this.popover.setContent({
      ".popover-header": this.title,
      ".popover-body": this.content,
    });
  }
}

class Modal {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.className = "modal fade";
    this.modal.setAttribute("tabindex", "-1");
    this.modal.setAttribute("data-bs-backdrop", "static");

    this.modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" id="modal-confirm-btn" class="btn btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);

    this.bsModal = new bootstrap.Modal(this.modal);
  }

  setCallback(callbackFunction, data) {
    document
      .getElementById("modal-confirm-btn")
      .addEventListener("click", () => {
        console.log("Triggered modal callback");
        if (callbackFunction) {
          console.log(data);
          callbackFunction(data);
          this.hide();
        } else {
          this.hide();
        }
      });
  }

  setTitle(title) {
    this.modal.querySelector(".modal-title").innerHTML = title;
  }

  setContent(content) {
    this.modal.querySelector(".modal-body").innerHTML = content;
  }

  setFooter(footerContent) {
    this.modal.querySelector(".modal-footer").innerHTML = footerContent;
  }

  show() {
    this.bsModal.show();
  }

  hide() {
    this.bsModal.hide();
  }
}

class OffCanvas {
  constructor() {
    this.offcanvas = document.createElement("div");
    this.offcanvas.className = "offcanvas offcanvas-top h-100";
    this.offcanvas.setAttribute("aria-labelledby", "offcanvasTopLabel");
    this.offcanvas.setAttribute("tabindex", "-1");

    this.offcanvas.innerHTML = `
      <div class="offcanvas-header border border-warning">
          <h5 class="offcanvas-title" id="offcanvasTopLabel">Complaint Details</h5>
          
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div>
          Complaint Details
        </div>
      </div>
    `;

    document.body.appendChild(this.offcanvas);

    this.bsOffcanvas = new bootstrap.Offcanvas(this.offcanvas);
  }

  setTitle(title) {
    this.offcanvas.querySelector(".offcanvas-title").innerHTML = title;
  }

  setContent(content) {
    this.offcanvas.querySelector(".offcanvas-body").innerHTML = content;
  }

  show() {
    this.bsOffcanvas.show();
  }

  hide() {
    this.bsOffcanvas.hide();
  }
}

export { PopUp, Modal, OffCanvas };
