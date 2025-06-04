module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        backgroundImage:`
              radial-gradient(at 75% 17%, #820000 0%, transparent 60%), 
              radial-gradient(at 59% 10%, #b9005b 0%, transparent 50%), 
              radial-gradient(at 30% 95%, #ff7c7c 0%, transparent 40%), 
              radial-gradient(at 34% 72%, #fee0c0 0%, transparent 30%)`
      },
      colors: {
        bibliothicBg: '#820000'
      }
    }
  }
  //plugins: [],
}
