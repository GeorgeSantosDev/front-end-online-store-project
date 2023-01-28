export async function getCategories() {
  const url = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const json = url.json();
  return json;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  if (categoryId && query) {
    const requisitionCategoryIdAndQ = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    const jsonCategoryIdAndQ = await requisitionCategoryIdAndQ.json();
    return jsonCategoryIdAndQ;
  } if (categoryId) {
    const requisition = await fetch(` https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    const json = await requisition.json();
    return json;
  } if (query) {
    const requisitionQuery = await fetch(` https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const jsonQuery = await requisitionQuery.json();
    return jsonQuery;
  }
}

export async function getProduct(id) {
  const requisition = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const json = await requisition.json();
  return json;
}
