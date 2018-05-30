'use strict';

// Read in everything from the models folder
import requireAll from 'require-dir';
const models = requireAll('../models');

/*
  models: {
    'players': {
      'default': Function()
    }
  }
 */

export default (req,res,next) => {
  let model = req.params.model;
  if(model && models[model] && models[model].default ) {
    req.model = models[model].default;
    next();
  }
  else {
    next('Model Not Found');
  }
};
