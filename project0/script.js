const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let arr = []
let checked = 0

function newTodo() {
  // alert('New TODO button clicked!')
  let message = prompt('Write the task')
  if (message != null) {
      arr.push(createlist(message))
      rendertask(arr)
  }
  itemCountSpan.innerText = arr.length
  uncheckedCountSpan.innerText = arr.length - checked
}

list.addEventListener("mousemove", () => {
  const deletebtn = document.querySelectorAll('.del')
  deletebtn.forEach(btn => btn.addEventListener("click", e => {
      const btnid = e.target.id
      arr = arr.filter(arr => arr.id !== btnid)
      rendertask(arr)
  }))
})


list.addEventListener("click", () => {
  checkbox = document.querySelectorAll('.todo-checkbox')
  checked = 0
  checkbox.forEach(box => {
      if (box.checked) {
          checked += 1
      }
      // console.log(checked)
      uncheckedCountSpan.innerText = arr.length - checked
  })
})

function createlist(name) {
  return {
      id: Date.now().toString(),
      name
  }
}

function rendertask(arr) {
  clearElement(list)
  arr.forEach(task => {
      const li = document.createElement('li')
      li.classList.add(classNames.TODO_ITEM)
      const check = document.createElement('input')
      check.type = 'checkbox'
      check.id = task.id
      check.classList.add(classNames.TODO_CHECKBOX)
      li.append(check)
      const label = document.createElement('label')
      label.htmlFor = task.id
      label.classList.add(classNames.TODO_TEXT)
      label.innerText = task.name
      li.append(label)
      const button = document.createElement('button')
      button.id = task.id
      button.innerText = "Delete"
      button.classList.add(classNames.TODO_DELETE)
      button.classList.add("del")
      li.append(button)
      list.append(li)
      itemCountSpan.innerText = arr.length
  })
}

function clearElement(element) {
  while (element.firstChild) {
      element.removeChild(element.firstChild)
  }
}