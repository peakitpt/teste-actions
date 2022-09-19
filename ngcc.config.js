module.exports = {
  packages: {
    '@ckeditor/ckeditor5-angular': {
      ignorableDeepImportMatchers: [
        /@ckeditor\//,
      ]
    },
    '@ngmodule/material-carousel': {
      ignorableDeepImportMatchers: [
        /@angular\//,
      ]
    },
  },
};
