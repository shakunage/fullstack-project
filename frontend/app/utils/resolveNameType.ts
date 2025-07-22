// This type represents the possible structures for Team or Player name property
export type NameTypeToResolve = {
  name?: string | { default: string };
  commonName?: string | { default: string };
};

export const resolveNameType = (item: NameTypeToResolve): string => {
  // Priority 1: item.name if it's a string
  if (typeof item.name === 'string') {
    return item.name;
  }

  // Priority 2: item.commonName (string or default property)
  if (item.commonName) {
    if (typeof item.commonName === 'string') {
      return item.commonName;
    }
    if (typeof item.commonName.default === 'string') {
      return item.commonName.default;
    }
  }

  // Priority 3: item.name.default
  if (item.name && typeof item.name === 'object' && typeof item.name.default === 'string') {
    return item.name.default;
  }

  // Fallback
  return '';
};
