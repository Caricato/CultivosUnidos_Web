export const supplyNameRules = [
  v => !!v ||'El nombre del Insumo es obligatorio',
  v => !v || v.length <= 50 || 'El campo nombre de insumo debe tener como máximo 50 caracteres',
];

export const supplyStockRules = [
  v => !!v || 'La cantidad es obligatoria',
  v => /^[0-9-. ]+$/.test(v) || 'Solo puede ingresar números o decimal',
];

export const supplyUnitPricingRules = [
  v => !!v || 'El precio unitario es obligatorio',
  v => /^[0-9-. ]+$/.test(v) || 'Solo puede ingresar números o decimal',
];

export const supplyStockMinRules = [
  v => !!v || 'El stock mínimo es obligatorio',
  v => /^[0-9-. ]+$/.test(v) || 'Solo puede ingresar números o decimal',
];
