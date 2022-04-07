"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const models_1 = require("../../models");
const config_1 = require("../../config");
const utils_1 = require("../../utils");
let defines = {
    existMessage: 'Un enregistrement avec ce titre existe déjà',
    notFoundMessage: 'Objet introuvable',
    successSaveMessage: 'Authentification éffectuée avec succès',
    successUpdateMessage: 'Article modifié avec succès',
    removeMessage: 'Article supprimé avec succès',
    unknowCategoryMessage: 'Categorie de publication inconnue',
    failedAuthMessage: 'Echèc d\'authentification API',
};
class MainController {
    static save(payload) {
        return new Promise((resolve, reject) => {
            // GENERATE UNIQ ID FOR CURRENT SAVE
            let slug = utils_1.cdg.generateSlug();
            let apikey = payload.apikey;
            models_1.MainSet.save(payload);
        });
    }
    static remove(payload) {
        return new Promise((resolve, reject) => {
            // GENERATE UNIQ ID FOR CURRENT SAVE
            let slug = payload.slug;
            // CHECK ITEM EXISTENCE
            models_1.MainSet.exist({ slug: payload.slug }).then((exit) => __awaiter(this, void 0, void 0, function* () {
                if (!exit) {
                    resolve({
                        status: 422,
                        message: 'error',
                        data: utils_1.cdg.buildApiError({ value: slug, msg: defines.notFoundMessage })
                    });
                }
                else {
                    models_1.MainSet.remove(slug).then((remove) => {
                        if (remove.status === 1) {
                        }
                        else {
                            resolve({
                                status: 200,
                                message: 'OK',
                                data: defines.removeMessage
                            });
                        }
                    });
                }
            }));
        });
    }
    static select(payload) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (!utils_1.cdg.string.is_empty(payload)) {
                models_1.MainSet.selectOne({ slug: payload }).then((data) => {
                    if (data) {
                        resolve({
                            status: 200,
                            message: 'ok',
                            data: data
                        });
                    }
                    else {
                        resolve({
                            status: 422,
                            message: defines.notFoundMessage,
                            data: {}
                        });
                    }
                });
            }
            else {
                let Q = yield models_1.MainSet.select({ params: {}, excludes: {} });
                let global = [];
                if (Q) {
                    Q.forEach((item) => {
                        global.push(item);
                    });
                    resolve({
                        status: 200,
                        message: 'ok',
                        data: global
                    });
                }
                else {
                    resolve({
                        status: 500,
                        message: config_1.Constants.error500message,
                        data: Q
                    });
                }
            }
        }));
    }
}
exports.MainController = MainController;
