//Name
//Lastname 
//Occupation 
//EducationLevel
//Post ID's
//REsource Id's - optional
//certifications 
//UserID
//City
//State
//githubUrl
//TwitterUrl
//youtubeUrl
//summary
//timestamps
//Avatar

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
    },
    educationLevel: {
      type: String,
      required: true,

    },
    resourceId: {
      type: [Schema.Types.ObjectId],
      ref:'resources'
    },
    certifications: {
      type: [String],
      
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    twitterUrl: {
      type: String,
    },
    youtubeUrl: {
      type: String,
    },
    summary: {
      type: String,
    },
  },
  { timestamps: {} }
);
module.exports = Profile = mongoose.model('profile', profileSchema);