import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="insert-in-list"
export default class extends Controller {
  static targets = ["items", "form"]

  send(event) {
    event.preventDefault()
    fetch(this.formTarget.action, {
      method: "POST",
      headers: {"Accept": "application/json"},
      body: new FormData(this.formTarget)
    })
      .then(response => response.json())
      .then((data) => {
        if (data.inserted_item) {
          const entry = `<li class="m-2">${data.inserted_item}</li>`
          this.itemsTarget.insertAdjacentHTML("beforeend", entry)
        }
        this.formTarget.outerHTML = data.form
      })
  }
}
