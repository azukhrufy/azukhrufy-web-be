const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    companyId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Company',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// plugins
projectSchema.set('toJSON', { virtuals: true });
projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);

// virtual: company
projectSchema.virtual('company', {
  ref: 'Company',
  localField: 'companyId',
  foreignField: '_id',
  justOne: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
