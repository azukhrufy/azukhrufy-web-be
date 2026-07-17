const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// plugins
companySchema.set('toJSON', { virtuals: true });
companySchema.plugin(toJSON);
companySchema.plugin(paginate);

// virtual: projects
companySchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'companyId',
});

// static: check name uniqueness
companySchema.statics.isNameTaken = async function (name, excludeCompanyId) {
  // $ne -> not equal to
  const company = await this.findOne({ name, _id: { $ne: excludeCompanyId } });
  return !!company;
};

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
