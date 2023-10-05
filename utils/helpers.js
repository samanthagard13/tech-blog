const path = require('path');

module.exports = {
    defaultLayout: 'main',
    extname: '.handlebars',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views'),
    helpers: {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      if (date) {
      return date.toLocaleDateString();
      } else {
        return;
      }
    },
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    format_amount: (amount) => {
      // format large numbers with commas
      return parseInt(amount).toLocaleString();
    },
  },
};
  