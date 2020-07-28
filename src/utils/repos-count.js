export function getReposCount(total, messages, cssClasses = '') {
  let textContent = messages.default

  const len = Object.keys(messages).length - 1
  if (total >= len) {
    textContent = Object.values(messages)[len - 1]
  } else {
    Object.values(messages).forEach((item, key) => {
      if (key === total) {
        textContent = item
      }
    })
  }

  textContent = textContent.replace('[VALUE]', total)
  return `<p class="${cssClasses}">${textContent}</p>`
}
