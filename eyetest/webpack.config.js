module.exports = {
    module: {
        rules: [
          {
            test: /\.m?jsx?$/,
        resolve: {
          fullySpecified: false
        },
            // ignore transpiling JavaScript from node_modules as they should be ready to go OOTB
            // exclude: /node_modules/,
            
          }
        ]
      }
}