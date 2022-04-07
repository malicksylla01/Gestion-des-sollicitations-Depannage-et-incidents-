"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const motif_json_1 = __importDefault(require("../motif/motif.json"));
const clientSchema = new mongoose_1.default.Schema({
    nom: {
        type: String,
        required: true
    },
    prenoms: {
        type: String,
        required: true
    },
    numero_de_telephone: {
        type: String,
        minLength: 10,
        maxLength: 10
    },
    mail: {
        type: String,
        required: false,
        unique: true
    },
    adresse_geographique: {
        type: String,
    },
    reference_contrat: {
        type: String,
        minLength: 9,
        maxLength: 9
    },
    motifs: {
        type: motif_json_1.default,
        required: true
    },
    description: {
        type: String,
    },
}, { timestamps: true });
/*
|--------------------------------------------
| ADDITIONAL SCHEMAS APPEAR HERE
|--------------------------------------------
*/
exports.User = mongoose_1.default.model('User', clientSchema);
