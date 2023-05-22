import { validationResult, body } from "express-validator";

export const validationResultExpress = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ error: errors.array() });
    const msg = errors.array().map((error) => error.msg);
    return res.status(400).json({ error: msg });
  }
  next();
  return null;
};

// ================VALIDACIONES DE LOGIN======================
export const bodyLoginValidator = [
  body("email", "Debe ingresar una contraseña")
    .notEmpty(),
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Debe ingresar una contraseña")
    .notEmpty(),
  body("password", "Mínimo 8 carácteres")
    .isLength({ min: 8 })
    .trim(),
  validationResultExpress,
];

// =========VALIDACIONES DE REGISTRO DE USUARIO================
export const bodyRegisterValidator = [
  body("firstName", "El nombre debe ser un String!")
    .if(body('firstName').exists())
    .isString()
    .trim(),
  body("firstName", "El nombre debe tener maximo 20 caracteres!")
    .if(body('firstName').exists())
    .isLength({ max: 20 }),
  body("lastName", "Formato string incorrecto")
    .if(body('lastName').exists())
    .isString()
    .trim(),
  body("lastName", "El apellido debe tener maximo 20 caracteres!")
    .if(body('lastName').exists())
    .isLength({ max: 20 }),
  body("userName", "Debe ingresar un nombre de usuario!")
    .exists(),
  body("userName", "Debe ingresar un nombre de usuario en formato String!")
    .isString()
    .trim(),
  body("userName", "El nombre de usuario debe tener maximo 15 caracteres!")
    .isLength({ max: 15 }),
  body("email", "Debe ingresar un Email!")
    .exists(),
  body("email", "El formato de Email es incorrecto!")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Debe ingresar una contraseña!")
    .exists(),
  body("password", "La contraeña debe tener mínimo 8 carácteres!")
    .if(body('password').exists())
    .trim()
    .isLength({ min: 8 }),
  body("identDocument", "Debe ingresar un documento de identidad!")
    .exists(),
  body("identDocument", "Formato de identidad incorrecto!")
    .if(body('identDocument').exists())
    .trim()
    .isIdentityCard('any'),
  body("phoneNumber", "Formato detelefono incorrecto!")
    .if(body('phoneNumber').exists())
    .trim()
    .isMobilePhone(),
  body("company", "Debe ingresar el nombre de la compañía en formato String!")
    .if(body('company').exists())
    .trim()
    .isString(),
  body("company", "El nombre de la compañía debe tener máximo 40 caracteres!")
    .if(body('company').exists())
    .isLength({ max: 40 }),
  validationResultExpress,
];

// ================VALIDACIONES DE ROLES======================
export const bodyRolesValidator = [
  body("name", "Debe ingresar un tipo de role!")
    .exists(),
  body("name", "Debe ingresar un String para la proiedad 'name' del rol!")
    .isString()
    .trim(),
  body("description", "Debe ingresar un String para la proiedad 'description' del rol!")
    .isString(),
  body("description", "La descripción debe tener mínimo 30 caracteres!")
    .trim()
    .isLength({ min: 30 }),
  // .isLength({ min: 300 }),
  validationResultExpress,
];

// ================VALIDACIONES DE TIPOS DE LICENCIA======================
export const bodyTypeLicensesValidator = [
  body("name", "Debe ingresar un nombre de licencia")
    .notEmpty(),
  body("price", "Debe ingresar un precio")
    .notEmpty(),
  body("price", "Debe ser de tipo numerico")
    .isNumeric(),
  body("description", "Debe ingresar una descripción!")
    .notEmpty(),
  body("description", "Maximo 350 caracteres")
    .if(body("description").exists())
    .trim()
    .isLength({ max: 350 }),
  body("duration", "Debe ingresar la duracion en dias")
    .notEmpty(),
  body("duration", "Debe ser de tipo numerico")
    .if(body("duration").exists())
    .isNumeric(),
  body("modules", "Debe ser un array")
    .isArray(),
  validationResultExpress,
];

// =========VALIDACIONES DE REGISTRO DE LOCALES========================
export const bodyLocalValidator = [
  body("condominium", "Ingresa un nombre de condominio con Maximo 30 caracteres")
    .trim()
    .isLength({ max: 30 }),
  body("building", "Ingresa un nombre de edificio con Maximo 30 caracteres")
    .trim()
    .isLength({ max: 30 }),
  body("number", "⚠ Debe ingresar el numero del local!")
    .notEmpty(),
  body("number", "⚠ El numero del local debe ser un String!")
    .if(body("number").exists())
    .isString(),
  body("ubication", "Para la ubicacion, ingrese un parrafo de no mas de 40 caracteres")
    .isLength({ max: 40 }),
  body("owner", "El nombre del dueño del local debes ser un String!")
    .isString(),
  body("dimentions", `Para guardar las dimenciones, estas deben ser un solo objeto con las siguientes propiedades: squareMeter: Number, width:Number, length: Number, height: Number, levels: Number. Revise el formato y envie un Objeto valido!`)
    .isObject(),
  body("use", "Defina el uso como un String valido")
    .isString(),
  body("use", "Maximo 20 caracteres")
    .isLength({ max: 20 }),
  body("condominium", "Ingresa un nombre de condominio con Maximo 30 caracteres")
    .trim()
    .isLength({ max: 30 }),
  body("building", "Ingresa un nombre de edificio con Maximo 30 caracteres")
    .trim()
    .isLength({ max: 30 }),
  body("number", "⚠ Debe ingresar el numero del local!")
    .notEmpty(),
  body("number", "⚠ El numero del local debe ser un String!")
    .if(body("number").exists())
    .isString(),
  body("ubication", "Para la ubicacion, ingrese un parrafo de no mas de 40 caracteres")
    .isLength({ max: 40 }),
  body("owner", "El nombre del dueño del local debes ser un String!")
    .isString(),
  body("dimentions", `Para guardar las dimenciones, estas deben ser un solo objeto con las siguientes propiedades: squareMeter: Number, width:Number, length: Number, height: Number, levels: Number. Revise el formato y envie un Objeto valido!`)
    .isObject(),
  body("use", "Defina el uso como un String valido")
    .isString(),
  body("use", "Para especificar el uso del local, ingrese un parrafo de no mas de 30 caracteres")
    .if(body("use").exists())
    .isLength({ max: 30 }),
  validationResultExpress,
];

// =========VALIDACIONES DE REGISTRO DE INGRESOS DE LOCALES========================
export const bodyLocalIncomeValidator = [
  body("paymentDate", "Ingrese una fecha de pago")
    .notEmpty(),
  body("paymentDate", "Ingrese una fecha de pago en formato String")
    .if(body("paymentDate").exists())
    .isString(),
  body("monthToPay", "Debe ingresar el mes a pagar")
    .notEmpty(),
  body("monthToPay", "EL mes a pagar debe ser un String")
    .if(body("monthToPay").exists())
    .isString(),
  body("local", "Debe ingresar el local que genera este ingreso")
    .notEmpty(),
  body("local", "Ingrese el local en formato string")
    .if(body("local").exists())
    .isString(),
  body("outstandingBalance", "El balance debe ser de tipo numerico")
    .isNumeric(),
  body("paymentMethod", "Debe Ingresar el metodo de pago")
    .notEmpty(),
  body("paymentMethod", "Especifique el metodo de pago en menos de 30 caracteres")
    .if(body("paymentMethod").exists())
    .isLength({ max: 30 }),
  body("amount", "Debe ingresar un monto")
    .notEmpty(),
  body("amount", "El monto que ingrese debe ser de tipo numerico")
    .if(body("amount").exists())
    .isNumeric(),
  body("proofOfPayment", "Ingrese un string (en representacion de la prueba de la prueba de pago)")
    .notEmpty(),
  body("proofOfPayment", "Ingrese un string (en representacion de la prueba de la prueba de pago)")
    .isString(),
  validationResultExpress,
];

// ================VALIDACIONES DE FACTURAS DE LICENCIA======================
export const bodyLicenseFeeBillValidator = [
  body("saleDate", "Debe ingresar una fecha de venta valida")
    .notEmpty(),
  body("saleDate", "Para establecer la fecha, use un maximo de 30 caracteres")
    .if(body("saleDate").exists())
    .trim()
    .isLength({ max: 30 }),
  body("client", "Maximo 30 caracteres")
    .trim()
    .isLength({ max: 30 }),
  body("clientEmail", "Debe ingresar un Email")
    .notEmpty(),
  body("clientEmail", "Formato de email incorrecto")
    .if(body("clientEmail").exists())
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("clientIdentDocument", "Debe ingresar un documento de identidad!")
    .notEmpty(),
  body("clientIdentDocument", "Formato de identidad incorrecto!")
    .if(body('identDocument').exists())
    .trim()
    .isIdentityCard('any'),
  body("effectiveDate", "Debe ingresar una fecha de inicio de vigencia de la licencia.")
    .notEmpty(),
  body("effectiveDate", "Maximo 30 caractares")
    .trim()
    .isLength({ max: 30 }),
  body("expirationDate", "Maximo 30 caractares")
    .trim()
    .isLength({ max: 30 }),
  body("amount", "Debe ingresar un monto")
    .notEmpty(),
  body("amount", "Debe ingresar caracteres numericos")
    .isNumeric(),
  validationResultExpress,
];