export const supplyNameRules = [
  v => !!v ||'El nombre del Insumo es obligatorio',
  v => !v || v.length <= 50 || 'El campo nombre de insumo debe tener como máximo 50 caracteres',
];

export const supplyStockRules = [
  v => !!v || 'La cantidad es obligatoria',
  v => !v || !Number.isNaN(Number(v)) || 'Solo puede ingresar números enteros o decimales'
];

export const supplyUnitPricingRules = [
  v => !!v || 'El precio unitario es obligatorio',
  v => !v || !Number.isNaN(Number(v)) || 'Solo puede ingresar números enteros o decimales'
];

export const supplyMetricTypeRules = [
  v => !!v || 'La unidad métrica es obligatoria',
];

export const supplyStockMinRules = [
  v => !!v || 'La cantidad mínima es obligatoria',
  v => !v || !Number.isNaN(Number(v)) || 'Solo puede ingresar números enteros o decimales'
];

export const entriesCantRules = [
  v => !!v || 'Vacio!',
  v => !v || !Number.isNaN(Number(v)) || 'Invalido!'
];

export const productNameRules = [
  v => !!v ||'El nombre del Producto es obligatorio',
  v => !v || v.length <= 50 || 'El nombre debe tener como máximo 50 caracteres',
];

export const productStockRules = [
  v => !!v || 'La cantidad es obligatoria',
  v => !v || Number.isInteger(Number(v)) || 'Solo puede ingresar números'
];

export const productSacksRules = [
  v => !!v || 'La cantidad es obligatoria',
  v => !v || !Number.isNaN(Number(v)) || 'Solo puede ingresar números enteros o decimales'
];

export const budgetProductRules =[
  v => !!v || 'El producto es obligatorio',
];

export const budgetCantRules =[
  v => !!v || 'La cantidad es obligatoria',
  v => !v || !Number.isNaN(Number(v)) || 'Solo puede ingresar números enteros o decimales'
];

export const flowTypeRules =[
  v => !!v || 'El tipo es obligatorio',
];

export const productUnitPricingRules = [
  v => !!v || 'El precio por saco es obligatorio',
  v => !v || !Number.isNaN(Number(v)) || 'Solo puede ingresar números enteros o decimales'
];

export const loginUsernameRules = [
  v => !!v || 'El DNI del usuario es obligatorio',
  v => !v || v.length === 8 ||'El DNI debe tener 8 caracteres numéricos',
  v => !v || !Number.isNaN(Number(v)) ||'El DNI debe tener 8 caracteres numéricos',
];

export const loginPasswordRules = [
  v => !!v || 'La contraseña del usuario es obligatoria',
];

export const producerNameRules = [
  v => !!v ||'El nombre del productor es obligatorio',
  v => !v || v.length <= 50 || 'El campo nombre del productor debe tener como máximo 50 caracteres',
];

export const producerFirstLastNameRules = [
  v => !!v ||'El primer apellido del productor es obligatorio',
  v => !v || v.length <= 50 || 'El campo primer apellido del productor debe tener como máximo 50 caracteres',
];

export const producerSecondLastNameRules = [
  v => !!v ||'El segundo apellido del productor es obligatorio',
  v => !v || v.length <= 50 || 'El campo segundo apellido del productor debe tener como máximo 50 caracteres',
];

export const emailRules = [
  v => !!v || 'El correo electrónico es obligatorio',
  v => !v || (v.split('').length <= 0 || /.+@.+\..+/.test(v)) || 'Ingrese correctamente el correo',
];

export const phoneRules = [
  v => !isNaN(v) || 'El número celular solo puede contener números',
  v => v === '' || (v && v.length === 9) || 'El número celular debe tener 9 dígitos',
];

export const addressRules = [
  v => !!v ||'La dirección es obligatoria',
  v => !v || v.length <= 50 || 'El campo dirección del productor debe tener como máximo 100 caracteres',
];

export const hectaresRules = [
  v => !!v || 'Las hectareas son obligatorias',
  v => !v || Number.isInteger(Number(v)) || 'Solo puede ingresar números'
];

