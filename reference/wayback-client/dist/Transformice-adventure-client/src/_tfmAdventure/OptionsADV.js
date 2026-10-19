define(["require", "exports", "./CacheLocalADV", "../interfaces/InterfaceOptionsADV", "../../../Souritheque-client/src/outils/son/MoteurSon", "./TFMAdventure", "../_monde/_mobile/MobileADV"], function (require, exports, CacheLocalADV_1, InterfaceOptionsADV_1, MoteurSon_1, TFMAdventure_1, MobileADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OptionsADV = (function () {
        function OptionsADV() {
        }
        OptionsADV.initialiser = function () {
            if (CacheLocalADV_1.default.possede(CacheLocalADV_1.default.CLES.VOLUME_GLOBAL)) {
                var volumeGlobal = CacheLocalADV_1.default.recupNombre(CacheLocalADV_1.default.CLES.VOLUME_GLOBAL);
                if (!isNaN(volumeGlobal) && volumeGlobal >= 0 && volumeGlobal <= 1) {
                    OptionsADV.changerVolumeGlobal(volumeGlobal, false);
                }
            }
            if (CacheLocalADV_1.default.possede(CacheLocalADV_1.default.CLES.VOLUME_MUSIQUE)) {
                var volumeMusique = CacheLocalADV_1.default.recupNombre(CacheLocalADV_1.default.CLES.VOLUME_MUSIQUE);
                if (!isNaN(volumeMusique) && volumeMusique >= 0 && volumeMusique <= 1) {
                    OptionsADV.changerVolumeMusique(volumeMusique, false);
                }
            }
            if (CacheLocalADV_1.default.possede(CacheLocalADV_1.default.CLES.VOLUME_FX)) {
                var volumeFX = CacheLocalADV_1.default.recupNombre(CacheLocalADV_1.default.CLES.VOLUME_FX);
                if (!isNaN(volumeFX) && volumeFX >= 0 && volumeFX <= 1) {
                    OptionsADV.changerVolumeFX(volumeFX, false);
                }
            }
            OptionsADV.activerShaderEau(CacheLocalADV_1.default.recupBooleen(CacheLocalADV_1.default.CLES.EFFETS_EAU, true), false);
            OptionsADV.activerShaderLumieres(CacheLocalADV_1.default.recupBooleen(CacheLocalADV_1.default.CLES.EFFETS_LUMIERE, true), false);
            OptionsADV.activerOptimAuto(CacheLocalADV_1.default.recupBooleen(CacheLocalADV_1.default.CLES.OPTIM_AUTO, true), false);
            if (window.electron) {
                OptionsADV.activerPleinEcran(CacheLocalADV_1.default.recupBooleen(CacheLocalADV_1.default.CLES.PLEIN_ECRAN, window.electron), true, false);
                window.changementFullscreenElectron = function (OUI) {
                    if (!OptionsADV.changementPleinEcranManuel) {
                        OptionsADV.activerPleinEcran(OUI, false, true);
                    }
                    OptionsADV.changementPleinEcranManuel = false;
                };
            }
            else {
                document.addEventListener("fullscreenchange", function (EVENT) {
                    if (!OptionsADV.changementPleinEcranManuel) {
                        OptionsADV.activerPleinEcran(document.fullscreenElement == document.documentElement, false, true);
                    }
                    OptionsADV.changementPleinEcranManuel = false;
                });
            }
            OptionsADV.afficherPseudoJoueurPrincipal(CacheLocalADV_1.default.recupBooleen(CacheLocalADV_1.default.CLES.AFFICHER_PSEUDO_PRINCIPAL, false), false);
        };
        OptionsADV.changerVolumeGlobal = function (VOLUME, ENREGISTRER) {
            if (ENREGISTRER === void 0) { ENREGISTRER = true; }
            MoteurSon_1.default.defVolumeGlobal(VOLUME);
            if (ENREGISTRER) {
                CacheLocalADV_1.default.enregistrer(CacheLocalADV_1.default.CLES.VOLUME_GLOBAL, VOLUME);
            }
            InterfaceOptionsADV_1.default.changerVolumeGlobal(VOLUME);
        };
        OptionsADV.changerVolumeMusique = function (VOLUME, ENREGISTRER) {
            if (ENREGISTRER === void 0) { ENREGISTRER = true; }
            MoteurSon_1.default.defVolumeCanal(MoteurSon_1.default.CANAL_MUSIQUE, VOLUME);
            if (ENREGISTRER) {
                CacheLocalADV_1.default.enregistrer(CacheLocalADV_1.default.CLES.VOLUME_MUSIQUE, VOLUME);
            }
            InterfaceOptionsADV_1.default.changerVolumeMusique(VOLUME);
        };
        OptionsADV.changerVolumeFX = function (VOLUME, ENREGISTRER) {
            if (ENREGISTRER === void 0) { ENREGISTRER = true; }
            MoteurSon_1.default.defVolumeCanal(MoteurSon_1.default.CANAL_EFFET, VOLUME);
            MoteurSon_1.default.defVolumeCanal(MoteurSon_1.default.CANAL_AMBIANCE, VOLUME);
            if (ENREGISTRER) {
                CacheLocalADV_1.default.enregistrer(CacheLocalADV_1.default.CLES.VOLUME_FX, VOLUME);
            }
            InterfaceOptionsADV_1.default.changerVolumeFX(VOLUME);
        };
        OptionsADV.activerShaderEau = function (OUI, ENREGISTRER) {
            if (ENREGISTRER === void 0) { ENREGISTRER = true; }
            TFMAdventure_1.default.instance.performance.changerOptionShaderEau(OUI);
            if (ENREGISTRER) {
                CacheLocalADV_1.default.enregistrer(CacheLocalADV_1.default.CLES.EFFETS_EAU, OUI);
            }
        };
        OptionsADV.activerOptimAuto = function (OUI, ENREGISTRER) {
            if (ENREGISTRER === void 0) { ENREGISTRER = true; }
            TFMAdventure_1.default.instance.performance.optimisationAuto = OUI;
            TFMAdventure_1.default.instance.performance.verifierActivationShaders();
            if (ENREGISTRER) {
                CacheLocalADV_1.default.enregistrer(CacheLocalADV_1.default.CLES.OPTIM_AUTO, OUI);
            }
        };
        OptionsADV.activerShaderLumieres = function (OUI, ENREGISTRER) {
            if (ENREGISTRER === void 0) { ENREGISTRER = true; }
            TFMAdventure_1.default.instance.performance.changerOptionShaderLumiere(OUI);
            if (ENREGISTRER) {
                CacheLocalADV_1.default.enregistrer(CacheLocalADV_1.default.CLES.EFFETS_LUMIERE, OUI);
            }
        };
        OptionsADV.activerPleinEcran = function (OUI, CHANGEMENT_MANUEL, ENREGISTRER) {
            if (ENREGISTRER === void 0) { ENREGISTRER = true; }
            if (CHANGEMENT_MANUEL) {
                if (window.electron) {
                    window.defFullScreen(OUI);
                }
                else {
                    if (OUI) {
                        var promesse = document.documentElement.requestFullscreen();
                        if (promesse.catch) {
                            promesse.catch(function () {
                                OptionsADV.activerPleinEcran(false, false, true);
                            });
                        }
                    }
                    else {
                        if (document.exitFullscreen && document.fullscreenElement) {
                            document.exitFullscreen();
                        }
                    }
                }
                OptionsADV.changementPleinEcranManuel = true;
            }
            InterfaceOptionsADV_1.default.cocherPleinEcran(OUI);
            if (ENREGISTRER) {
                CacheLocalADV_1.default.enregistrer(CacheLocalADV_1.default.CLES.PLEIN_ECRAN, OUI);
            }
        };
        OptionsADV.afficherPseudoJoueurPrincipal = function (OUI, ENREGISTRER) {
            if (ENREGISTRER === void 0) { ENREGISTRER = true; }
            OptionsADV.options.affichagePseudoJoueurPrincipal = OUI;
            if (MobileADV_1.MobileADV.joueurPrincipal) {
                MobileADV_1.MobileADV.joueurPrincipal.afficherNom(OptionsADV.options.affichagePseudoJoueurPrincipal);
            }
            if (ENREGISTRER) {
                CacheLocalADV_1.default.enregistrer(CacheLocalADV_1.default.CLES.AFFICHER_PSEUDO_PRINCIPAL, OUI);
            }
        };
        OptionsADV.changementPleinEcranManuel = false;
        OptionsADV.options = {
            affichagePseudoJoueurPrincipal: false
        };
        return OptionsADV;
    }());
    exports.default = OptionsADV;
});
//# sourceMappingURL=OptionsADV.js.map