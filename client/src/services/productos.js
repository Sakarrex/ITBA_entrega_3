const URL_PRODUCTOS = '/api/productos';

export async function obtenerProductos() {
  const response = await fetch(URL_PRODUCTOS);

  if (!response.ok) {
    throw new Error('No pudimos cargar los productos');
  }

  const resultado = await response.json();
  return resultado.data;
}
