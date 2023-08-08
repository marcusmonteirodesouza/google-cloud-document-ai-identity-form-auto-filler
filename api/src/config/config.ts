import {Joi} from 'celebrate';

const envVarsSchema = Joi.object()
  .keys({
    GOOGLE_PROJECT_ID: Joi.string().required(),
    LOG_LEVEL: Joi.string().valid('debug', 'info').default('info'),
    PORT: Joi.number().integer().required(),
    K_REVISION: Joi.string().required(),
    K_SERVICE: Joi.string().required(),
  })
  .unknown();

const {value: envVars, error} = envVarsSchema.validate(process.env);

if (error) {
  throw error;
}

const config = {
  google: {
    cloudRun: {
      revision: envVars.K_REVISION,
      service: envVars.K_SERVICE,
    },
    projectId: envVars.GOOGLE_PROJECT_ID,
  },
  logLevel: envVars.LOG_LEVEL,
  port: envVars.PORT,
};

export {config};
