// serverless/utils/validator.js
// Lightweight payload validator for TEKKZY College serverless services

const validate = (data, schema) => {
  const errors = [];

  for (const [field, rules] of Object.entries(schema)) {
    const val = data ? data[field] : undefined;

    if (rules.required && (val === undefined || val === null || val === '')) {
      errors.push(`Field '${field}' is required`);
      continue;
    }

    if (val !== undefined && val !== null && val !== '') {
      if (rules.type && typeof val !== rules.type) {
        errors.push(`Field '${field}' must be of type ${rules.type}`);
        continue;
      }

      if (rules.validate && typeof rules.validate === 'function') {
        const customErr = rules.validate(val, data);
        if (customErr) errors.push(customErr);
      }
    }
  }

  return errors.length > 0 ? errors : null;
};

module.exports = {
  validate
};
