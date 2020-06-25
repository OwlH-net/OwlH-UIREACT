
  export const validations = {
    name: [new RegExp('[a-zA-Z0-9 _-]{3,}')],
    ip: [new RegExp('\\d{1,3}\.\\d{1,3}\.\\d{1,3}\.\\d{1,3}'), 
         new RegExp('\\w+\.\\w+\\.\w+'), 
         new RegExp('\\w{3,}')
        ],
    desc: [new RegExp('[a-zA-Z0-9 _-]{3,}')],
    port: [new RegExp('\\d{3,}')]
  }

  export const validateField = (value, regExps = []) => {
    const isValid = regExps.some(reg => {
      return value.match(reg)
    })

    return isValid
  }

export const validateForm = (master) => {
  let validationResult = {}
  let hasError = false
  Object.keys(master).map(key => {
    if (key == "active") {return}
    let isValid = validateField(master[key], validations[key]||[])
    if (!isValid) {hasError = true}
    validationResult = {
      ...validationResult,
      [key]: isValid
    }
  })
  
  return [hasError, validationResult]
}

//PASSWORD VALIDATION
export const passValidations = {
  current: [new RegExp('[a-zA-Z0-9-Ññ_.:!,;\'¿¡?*+~@#·%^&¬()=$/]{3,}')],
  new: [new RegExp('[a-zA-Z0-9-Ññ_.:!,;\'¿¡?*+~@#·%^&¬()=$/]{3,}')],
  again: [new RegExp('[a-zA-Z0-9-Ññ_.:!,;\'¿¡?*+~@#·%^&¬()=$/]{3,}')]
}
export const validateChangePasswordForm = (form) => {
  let validationResult = {}
  let hasError = false

  Object.keys(form).map(key => {
    if (key == "user") {return}
    let isValid = validateField(form[key], passValidations[key]||[])
    
    if (!isValid) {hasError = true}
    validationResult = {
      ...validationResult,
      [key]: isValid
    }
  })

  // if(form["new"] == form["again"]){
  //   //check new password
  //   let isValid = validateField(form["new"], passValidations["new"]||[])
  //   if (!isValid) {hasError = true}
  //   validationResult = {...validationResult,["new"]: isValid}
  //   //check new password again
  //   isValid = validateField(form["again"], passValidations["again"]||[])
  //   if (!isValid) {hasError = true}
  //   validationResult = {...validationResult,["again"]: isValid}
  // }else{
  //   hasError = true
  // }
  
  return [hasError, validationResult]
}