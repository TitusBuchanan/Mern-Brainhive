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

const mongoose = require("mongoose");
const profileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,

      minLength: 3,
      maxLength: 100,
    },
    lastName: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
   
    
    postID: {
      type: String,
      required: true,
    },
    
    city: {
      type: Boolean,
      default: false,
    },
    state: {
      type: String,
      required:true
    },
    educationLevel: {
      type: String,
      enum: [
        'High School',
        'College',
        'Masters',
        'PHD'],
      default: "High School",
    },
    about: {
      type: String,
      maxLength: 250,
    },
  
    location: {
      type: String,
      enum: [
        'Online',
        'Physical',
        'Mobile'],
      default: "Physical",
    },
    avatar: {
        type: [String],
        default: [],
      },
   
    validationDate: {
      type: Date,
      default: Date.now(),
    },

    emailValidated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: {} }
);

module.exports = Biz = mongoose.model("profiles", profileSchema);
