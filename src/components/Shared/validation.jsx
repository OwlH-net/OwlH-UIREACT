
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
  new: [new RegExp('^(?![0-9]+$)[A-Za-z0-9_-]{7,}$')],
}
export const validateChangePasswordForm = (form) => {
  let validationResult = {}
  let hasError = false

  Object.keys(form).map(key => {
    if (key != "new") {return}
    let isValid = validateField(form[key], passValidations[key]||[])
    
    if (!isValid) {hasError = true}
    validationResult = {
      ...validationResult,
      [key]: isValid
    }
  })
  
  return [hasError, validationResult]
}