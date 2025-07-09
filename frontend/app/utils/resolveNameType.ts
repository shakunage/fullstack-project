export const resolveNameType = (item: any) => {
    if (typeof item.name === "string") {
      return item.name;
    }
    if (typeof item.commonName) {
        if (typeof item.commonName === "string") {
          return item.commonName;
        } else if (item.commonName.default === "string") {
            return item.commonName.default;
            }
      return item.commonName;
    }
    return item.name.default;
  };