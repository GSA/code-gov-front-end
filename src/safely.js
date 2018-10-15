export function run(item, func) {
  try {
    return item[func]()
  } catch (error) {
    return item
  }
}

export function capitalize(string) {
  try {
    return string[0].toUpperCase() + string.substring(1)
  } catch (error) {
    return string
  }
}

export function join(array, joiner) {
  try {
    return array.join(joiner)
  } catch (error) {
    return array
  }
}

export function includes(array, item) {
  try {
    return array.includes(item)
  } catch (error) {
    return false
  }
}

export function excludes(array, item) {
  return includes(array, item) === false
}

export function has(obj, key) {
  try {
    return obj.hasOwnProperty(key)
  } catch (error) {
    return false
  }
}

export function overlaps(array1, array2) {
  return Array.isArray(array1) && array1.some(item => includes(array2, item))
}

export function some(array) {
  return Array.isArray(array) && array.length > 0;
}

