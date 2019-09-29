const ENTER_KEYCODE = 13;
const ESC_KEYCODE = 27;

export const createElement = (markUp) => {
  const template = document.createElement(`template`);
  markUp = markUp.trim();
  template.innerHTML = markUp;
  return template.content.firstChild;
};
export function deleteElement(element) {
  element.remove();
}
export function render(containerEl, element) {
  containerEl.appendChild(element);
}
export function processIfEnterEvent(evt, action) {
  if (evt.keyCode === ENTER_KEYCODE) {
    action();
  }
}
export function processIfEscEvent(evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
}

