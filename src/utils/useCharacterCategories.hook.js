const useConfiguration = require("./useConfiguration.hook");

module.exports = function useCharacterCategories() {
  const configuration = useConfiguration();

  if (!Array.isArray(configuration.characters)) {
    return [];
  }

  const categories = configuration.characters.map(category => {
    return {
      name: category.name,
      image: category.image
    };
  });

  return categories;
};
