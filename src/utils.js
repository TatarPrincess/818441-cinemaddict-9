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
