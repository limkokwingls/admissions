export function formatProgramName(name: string): string {
  const lowercaseName = name.toLowerCase();
  const words = lowercaseName.split(' ');

  const capitalizedWords = words.map((word) => {
    if (word === 'in' || word === 'and') {
      return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  const formattedName = capitalizedWords.join(' ');

  const abbreviations: { [key: string]: string } = {
    bsc: 'BSc',
    ba: 'BA',
    'b bus admin': 'B Bus Admin',
  };

  for (const [abbreviation, replacement] of Object.entries(abbreviations)) {
    if (formattedName.toLowerCase() === abbreviation) {
      return replacement;
    }
  }

  return formattedName.replace(' Tv', ' TV');
}
