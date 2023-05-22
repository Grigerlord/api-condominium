module.exports = {
  getAnimals: {
    type: "object",
    properties: {
      _id: { type: "string", example: "63bad1557bd860de62e144df" },
      name: { type: "string", example: "León" },
      family: { type: "string", example: "Felidae" },
      description: { type: "string", example: "El león (Panthera leo) es un mamífero carnívoro de la familia de los félidos y una de las cinco especies del género Panthera. Los leones salvajes viven en poblaciones cada vez más dispersas y fragmentadas del África subsahariana (a excepción de las regiones selváticas de la costa del Atlántico y la cuenca del Congo) y una pequeña zona del noroeste de India (una población en peligro crítico en el parque nacional del Bosque de Gir y alrededores), habiendo desaparecido del resto de Asia del Sur, Asia Occidental, África del Norte y la península balcánica en tiempos históricos. " },
      age: { type: "number", example: 1760 },
      createdAt: { type: "string", example: "2023-01-08" },
      updatedAt: { type: "string", example: "2023-01-08" },
    },
  },
};