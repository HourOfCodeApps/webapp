/* COLORS */
export const colors = {
  primary: '#1696a0',
  dark: '#333',
  grey: '#6b6b6b',
};

/* HELPERS */

export function getColor(prop) {
  switch (prop) {
    case 'primary':
      return colors.primary;
    case 'dark':
      return colors.dark;
    case 'grey':
      return colors.grey;
  }
}

export default colors;
