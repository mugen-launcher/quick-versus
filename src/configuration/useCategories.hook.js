import useConfiguration from "./useConfiguration.hook";

export default function useCategories() {
  const configuration = useConfiguration();

  if (!Array.isArray(configuration.categories)) {
    return [];
  }

  const categories = configuration.categories.map(category => {
    return {
      name: category.name,
      image: category.image
    };
  });

  return categories;
}
