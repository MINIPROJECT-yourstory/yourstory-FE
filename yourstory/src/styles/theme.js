export const breakpoints = {
    mobile: '320px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1440px'
  };
  
  export const media = {
    mobile: `@media (max-width: ${breakpoints.mobile})`,
    tablet: `@media (max-width: ${breakpoints.tablet})`,
    laptop: `@media (max-width: ${breakpoints.laptop})`,
    desktop: `@media (max-width: ${breakpoints.desktop})`
  };
  
  const theme = {
    breakpoints,
    media,
    colors: {
      green: '#BCBF1F',
    }
  };
  
  export default theme;