export const createElement = (markUp) => {
  const template = document.createElement(`template`);
  markUp = markUp.trim();
  template.innerHTML = markUp;
  return template.content.firstChild;
};

export function removeElementLink(object) {
  object._element = null;
}

export function deleteElement(element, object) {
  element.remove();
  removeElementLink(object);
}

export function render(containerEl, element, callbackFunc, getContainerEl = null) {

  if (containerEl) {
    containerEl.appendChild(element);
  } else {
    getContainerEl().appendChild(element);
  }

  if (callbackFunc) {
    callbackFunc();
  }
}
