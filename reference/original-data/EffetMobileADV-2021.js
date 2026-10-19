define(["require", "exports", "../../../_tfmAdventure/TFMAdventure", "../../../../../Souritheque-client/src/outils/affichage/MoteurShader", "../../../graphismes/ShaderCamouflage", "../AplatMobileADV"], function (require, exports, TFMAdventure_1, MoteurShader_1, ShaderCamouflage_1, AplatMobileADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EffetMobileADV = (function () {
        function EffetMobileADV(MOBILE) {
            this.mobile = MOBILE;
        }
        EffetMobileADV.prototype.lancementEffet = function (INFO) {
            var _this = this;
            switch (INFO.code) {
                case -1:
                    var shaderCamouflage_1 = new ShaderCamouflage_1.ShaderCamouflage(this.mobile, 0xFFFFFF, performance.now());
                    MoteurShader_1.MoteurShader.instance.appliquerShader(this.mobile.creature, shaderCamouflage_1);
                    INFO.fin = function () {
                        shaderCamouflage_1.viderParticules();
                        shaderCamouflage_1.demandeDestruction = true;
                    };
                    break;
                case -2:
                    if (this.mobile.estJoueurPrincipal) {
                        INFO.boucle = function (TEMPS, DUREE_IMAGE) {
                            var mobileProche = null;
                            for (var i = 0, nb = EffetMobileADV.listeIngredient.length; i < nb; i++) {
                                var ingredient = EffetMobileADV.listeIngredient[i];
                                if (ingredient.estDetruit) {
                                    EffetMobileADV.listeIngredient.splice(i, 1);
                                    i--;
                                    nb--;
                                    continue;
                                }
                                if (ingredient.enCoursDeDeplacement
                                    || ingredient.projectionEnCours
                                    || ingredient.distanceCarreJoueurPrincipal > 40000) {
                                    continue;
                                }
                                if (!mobileProche || ingredient.distanceCarreJoueurPrincipal < mobileProche.distanceCarreJoueurPrincipal) {
                                    mobileProche = ingredient;
                                }
                            }
                            if (_this.ingredientProche && _this.ingredientProche != mobileProche) {
                                if (_this.ingredientProche["_clipType"]) {
                                    _this.ingredientProche["_clipType"].visible = false;
                                    _this.ingredientProche["_aplat"].visible = false;
                                }
                            }
                            if (mobileProche) {
                                _this.ingredientProche = mobileProche;
                                var clip = mobileProche["_clipType"];
                                var aplat = mobileProche["_aplat"];
                                if (!clip) {
                                    clip = PIXI.Sprite.fromImage(TFMAdventure_1.default.recupImageDistance("cuisto/i/" + _this.ingredientProche.typeMobile + ".png"));
                                    clip.anchor.set(0.5, 1);
                                    clip.y = -40;
                                    _this.ingredientProche["_clipType"] = clip;
                                    _this.ingredientProche.addChild(clip);
                                    aplat = new AplatMobileADV_1.AplatMobileADV();
                                    aplat.anchor.set(0.5, 0.5);
                                    aplat.texture = PIXI.Texture.fromImage(TFMAdventure_1.default.recupImageDistance("cuisto/i/z" + _this.ingredientProche.typeMobile + ".png"));
                                    _this.ingredientProche["_aplat"] = aplat;
                                    _this.ingredientProche.ajouterAplatMobile(aplat);
                                }
                                clip.visible = true;
                                aplat.visible = true;
                                aplat.euler.z += DUREE_IMAGE / 100;
                            }
                        };
                        INFO.fin = function () {
                        };
                    }
                    break;
            }
        };
        EffetMobileADV.listeIngredient = [];
        return EffetMobileADV;
    }());
    exports.EffetMobileADV = EffetMobileADV;
});
//# sourceMappingURL=EffetMobileADV.js.map