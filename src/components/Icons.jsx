import { Leaf, Recycle, Sprout, Sun, Trash2, Wind, Users } from 'lucide-react';

// Map of category names to icons
export const Icons = {
  recycling: Recycle,
  composting: Leaf,
  cleanup: Trash2,
  gardening: Sprout,
  "solar power": Sun,
  "wind energy": Wind,
  community: Users,
};

export function CategoryIcon({ category, ...props }) {
  const normalizedCategory = category.toLowerCase();
  const IconComponent = Icons[normalizedCategory] || Users;
  return <IconComponent {...props} />;
}
