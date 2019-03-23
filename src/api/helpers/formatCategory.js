export default category => {
  if (typeof category !== 'string') {
    return '';
  }

  const trimmedCategory = category.trim();

  return `${trimmedCategory.charAt(0).toUpperCase()}${trimmedCategory.slice(1)}`;
};
