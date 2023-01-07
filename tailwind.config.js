module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary_red: '#FC4747', // (movie-icon) (login-signup button) (nav-section-icon:hover)
        primary_background: '#10141E', // (body-background)
        secondary_background: '#161D2F', // (side-bar-background) (login-signup background)
        terciary_others: '#5A698F',
      },
      fontSize: {
        sm: ['13px', '21px'], // light 300 body (S)
        base: ['15px', '23px'], // light 300 body (M)
        xs: ['18px', '26px'], // medium 500 heading (XS)
        s: ['24px', '32px'], //medium 500 heading (S)
        m: ['24px', '32px'], // light 300 heading (M)
        l: ['32px', '40px'], // light 300 heading (L)
      },
      screens: {
        xl: '1440px',
        // => @media (min-width: 1440px) { ... }
      },
    },
  },
  plugins: [],
}
