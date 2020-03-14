export default function getObjectPropertyValueCaseInsensitive(object, propertyName) {
  const lowerCasePropertyName = propertyName.toLowerCase();

  for (const key in object) {
    if (key.toLowerCase() === lowerCasePropertyName) {
      return object[key];
    }
  }

  return undefined;
}
