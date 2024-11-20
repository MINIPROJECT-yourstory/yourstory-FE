export const media = {
    mobile: '@media screen and (max-width: 480px)',
    tablet: '@media screen and (max-width: 768px)',
    laptop: '@media screen and (max-width: 1024px)',
    desktop: '@media screen and (max-width: 1200px)'
  };
  

const theme = {

    media,
    colors: {
        // 브랜드 컬러
        primary: {
          main: '#BCBF1F',
          light: '#CED118',
          dark: '#919400'
        },
        
        // 배경색
        background: {
          default: '#FFFFFF',
          paper: '#F3F3F3',
          transparent: 'transparent'
        },
        
        // 텍스트 컬러
        text: {
          primary: '#333333',
          secondary: '#666666',
          disabled: '#999999',
          white: '#FFFFFF'
        },

        status: {
            success: '#4CAF50',
            warning: '#FFC107',
            error: '#FF5252',
            info: '#2196F3'
          },
          
          // 테두리
          border: {
            light: '#EEEEEE',
            main: '#BCBF1F',
            dark: '#666666'
          }
        },
      
        typography: {
          fontFamily: {
            main: 'Inter, sans-serif',
            secondary: 'Roboto, sans-serif'
          },
          fontSize: {
            xs: '0.9375rem',   // 15px
            sm: '1rem',        // 16px
            md: '1.125rem',    // 18px
            lg: '1.25rem',     // 20px
            xl: '1.875rem',    // 30px
            xxl: '2rem'      // 32px
          },
          fontWeight: {
            light: 300,
            regular: 400,
            medium: 500,
            bold: 700,
            extraBold: 800
          },
          lineHeight: {
            tight: 1.2,
            normal: 1.5,
            relaxed: 1.7
          }
        },
      
        spacing: {
          // 기본 간격 단위
          unit: 8,
          
          // 자주 사용되는 간격
          padding: {
            xs: '0.5rem',     // 8px
            sm: '1rem',       // 16px
            md: '1.5rem',     // 24px
            lg: '2rem',       // 32px
            xl: '2.5rem'      // 40px
          },
          
          // 특정 컴포넌트용 간격
          components: {
            card: {
              padding: '1.5rem',
              gap: '1rem'
            },
            navbar: {
              height: '4rem',
              padding: '0 1.5rem'
            },
            sidebar: {
              width: '16.5625rem'
            }
          }
        },
      
        borderRadius: {
            none: '0',
            xs: '0.3125rem',     // 5px
            sm: '1.0625rem',     // 17px
            md: '1.25rem',       // 20px
            lg: '1.5625rem',     // 25px
            pill: '3.125rem'     // 50px (버튼 등에 사용)
        },
      
        shadows: {
          none: 'none',
          sm: '0 1px 3px rgba(0,0,0,0.12)',
          md: '0 4px 6px rgba(0,0,0,0.1)',
          lg: '0 5px 15px rgba(0,0,0,0.1)',
          xl: '0 10px 24px rgba(0,0,0,0.2)'
        },
      
        breakpoints: {
          mobile: '480px',
          tablet: '768px',
          laptop: '1024px',
          desktop: '1200px'
        },
      
        zIndex: {
          navbar: 100,
          sidebar: 200,
          modal: 300,
          tooltip: 400,
          toast: 500
        },
      
        transitions: {
          short: '0.2s ease',
          medium: '0.3s ease',
          long: '0.5s ease'
        },

  };
  
  export default theme;