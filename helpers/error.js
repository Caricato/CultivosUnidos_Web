export const getError = (error) => {
  let message = 'Error interno'
  if (error.response) {
    console.log(error.response.data)
    const { code, data } = error.response.data
    switch (code) {
      case 'SUP_01': {
        message = `Insumo no encontrado`;
        break;
      }
      case 'PROD_01': {
        message = `Producto no encontrado`;
        break;
      }
      default: {
        message = 'Error con código desconocido';
      }
    }
  } else if (error.request) {
    message = 'Error de conexion';
  } else {
    message = 'Error interno';
  }
  return message;
};
