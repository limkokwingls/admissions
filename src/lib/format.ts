export function formatProgramName(name: string): string {
  const lowercaseName = name.toLowerCase();
  const words = lowercaseName.split(' ');

  const capitalizedWords = words.map((word) => {
    if (word === 'in' || word === 'and') {
      return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  const formattedName = capitalizedWords
    .join(' ')
    .replace('Ba ', 'BA ')
    .replace('Bsc ', 'BSc ')
    .replace(' Tv', ' TV');

  return formattedName;
}
