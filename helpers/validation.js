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
