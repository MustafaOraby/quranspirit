import azkarData from './azkar.json';

interface Zikr {
  id: number;
  text: string;
  count: number;
  audio: string;
  filename: string;
}

interface Category {
  id: number;
  category: string;
  audio: string;
  filename: string;
  array: Zikr[];
}

interface CategoryWithMap extends Omit<Category, 'array'> {
  azkar: Map<number, Zikr>;
}

// Validate and transform the data
const validateAndTransformData = () => {
  if (!Array.isArray(azkarData)) {
    console.error('Invalid azkar data structure');
    return new Map<number, CategoryWithMap>();
  }

  return new Map<number, CategoryWithMap>(
    azkarData.map((category: Category) => [
      category.id,
      {
        id: category.id,
        category: category.category,
        audio: category.audio,
        filename: category.filename,
        azkar: new Map(category.array.map((zikr: Zikr) => [zikr.id, zikr]))
      }
    ])
  );
};

export const azkarMap = validateAndTransformData();

// Helper functions to work with the map
export const getCategoryById = (id: number): CategoryWithMap | undefined => azkarMap.get(id);
export const getZikrById = (categoryId: number, zikrId: number): Zikr | undefined => 
  azkarMap.get(categoryId)?.azkar.get(zikrId);

// Get all categories
export const getAllCategories = (): CategoryWithMap[] => Array.from(azkarMap.values());

// Get all azkar for a category
export const getAzkarByCategory = (categoryId: number): Zikr[] => 
  Array.from(azkarMap.get(categoryId)?.azkar.values() || []);

// Search azkar by text
export const searchAzkar = (searchText: string): (Zikr & { categoryName: string; categoryId: number })[] => {
  const results: (Zikr & { categoryName: string; categoryId: number })[] = [];
  
  if (!searchText.trim()) {
    return results;
  }

  for (const category of azkarMap.values()) {
    for (const zikr of category.azkar.values()) {
      if (
        zikr.text.toLowerCase().includes(searchText.toLowerCase())
      ) {
        results.push({
          ...zikr,
          categoryName: category.category,
          categoryId: category.id
        });
      }
    }
  }
  return results;
}; 