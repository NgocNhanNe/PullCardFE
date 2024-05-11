export const handleTitleCase = (name: string) => {
  return name.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
};
