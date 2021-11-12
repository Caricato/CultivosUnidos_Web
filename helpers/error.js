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
      case 'SUP_03':{
        message = 'Insumo no se puede eliminar. \Asociado a productos activos: ';
        data.products.forEach(x=>{
          message+= x + ' ';
        })
        break;
      }
      case 'SUP_04':{
        message = 'Se rompe con la condición del stock mínimo del insumo: '+data.supplyName;
        break;
      }
      case 'PROD_01': {
        message = `Producto no encontrado`;
        break;
      }
      case 'PROD_04':{
        message = 'Producto se encuentra en cronogramas activos!';
        break;
      }
      case 'USR_01':{
        message = `Usuario con DNI `+ data+ ' ya registrado!';
        break;
      }
      case 'USR_07':{
        message = `Usuario con correo electrónico `+ data+ ' ya registrado!';
        break;
      }
      case 'USR_08':{
        message = `Usuario con teléfono celular `+ data+ ' ya registrado!';
        break;
      }
      case 'USR_04':{
        message = 'Usuario y/o contraseña inválidos!'
        break;
      }
      case 'USR_05':{
        message = 'Usuario y/o contraseña inválidos!'
        break;
      }
      case 'USR_09':{
        message = 'Productor en cronogramas activos!'
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
