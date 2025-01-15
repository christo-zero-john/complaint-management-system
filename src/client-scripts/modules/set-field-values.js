function setFieldValues(event) {
  console.log("Updating fieldsValues");
  fieldsValues[event.target.id] = event.target.value;
  console.log("fieldsValues changed: ", fieldsValues);
}

export { setFieldValues };
