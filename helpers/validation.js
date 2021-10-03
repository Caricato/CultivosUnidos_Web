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
