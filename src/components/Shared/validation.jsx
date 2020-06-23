
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
      console.log(reg)
      return value.match(reg)
    })
    console.log("validating value")
    console.log(value)
    console.log(isValid)
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
    
    console.log("after completed checks")
    console.log(validationResult)
    return [hasError, validationResult]
  }
