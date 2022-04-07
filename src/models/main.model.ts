import mongoose from "mongoose";
import motif from "../motif/motif.json"

const clientSchema = new mongoose.Schema({
    nom: {
        type: String,
        required:true
    },
    prenoms:{
        type: String,
        required:true
    },
    numero_de_telephone:{
       type: String,
       minLength:10,
       maxLength:10
   },
   mail:{
       type: String,
       required: false,
       unique:true
   },
   adresse_geographique:{
       type: String,

   },
   reference_contrat:{
       type: String,
       minLength:9,
       maxLength:9
       

   },

   motifs:{
       type:motif,
       required:true
   },

   description:{
       type: String,
   },


},
{timestamps: true});

/*
|--------------------------------------------
| ADDITIONAL SCHEMAS APPEAR HERE
|--------------------------------------------
*/
export const User = mongoose.model('User', clientSchema);

