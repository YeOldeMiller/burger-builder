export default function validateFormData(value, rules) {
  if(!rules) return true;
  let isValid = true;
  if(rules.required) isValid = isValid && value.trim() !== '';
  if(rules.minLength) isValid = isValid && value.length >= rules.minLength;
  if(rules.maxLength) isValid = isValid && value.length <= rules.maxLength;
  if(rules.isEmail) isValid = isValid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return isValid;
};