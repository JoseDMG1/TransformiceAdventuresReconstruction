define(["require", "exports", "../../../../Souritheque-client/src/outils/affichage/animation/ClipAnim", "../../_enums/SlotEquipementADV", "../../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../../../../Souritheque-client/src/interface/souruis/elements/I_Image", "../../../../Souritheque-client/src/interface/souruis/elements/I_ImagePixi", "../../_tfmAdventure/TFMAdventure"], function (require, exports, ClipAnim_1, SlotEquipementADV_1, I_Conteneur_1, I_Image_1, I_ImagePixi_1, TFMAdventure_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sprite = PIXI.Sprite;
    var Point = PIXI.Point;
    var Rectangle = PIXI.Rectangle;
    var EquipementADV = (function () {
        function EquipementADV(CODE) {
            this.estUneArme = false;
            this.typeArme = 0;
            this.stats = {};
            this.code = CODE;
        }
        EquipementADV.prototype.recupSpriteBasiquePixi = function (SLOT) {
            if (SLOT == SlotEquipementADV_1.default.MAIN_GAUCHE) {
                if (this.apparenceSecondaire) {
                    return this.apparenceSecondaire.sprite;
                }
            }
            else {
                if (this.apparence) {
                    return this.apparence.sprite;
                }
            }
            return null;
        };
        EquipementADV.prototype.recupIconePixi = function () {
            var conteneur = new Sprite();
            conteneur.addChild(Sprite.fromImage(TFMAdventure_1.default.recupImageDistance("interface/icones/fond1.png")));
            conteneur.addChild(Sprite.fromImage(TFMAdventure_1.default.recupImageDistance("interface/icones/" + this.code + ".png")));
            conteneur.addChild(Sprite.fromImage(TFMAdventure_1.default.recupImageDistance("interface/icones/cadre1.png")));
            var premiereTexture = conteneur.getChildAt(0).texture;
            if (premiereTexture && !premiereTexture.baseTexture.hasLoaded) {
                premiereTexture.orig = new Rectangle(0, 0, 60, 60);
            }
            return conteneur;
        };
        EquipementADV.prototype.recupSpriteHTML = function (SLOT, TAILLE) {
            var _this = this;
            if (TAILLE === void 0) { TAILLE = 62; }
            var icone = new I_Conteneur_1.I_Conteneur().defLargeur(TAILLE).defHauteur(TAILLE).alignementEnfants("center").justifierEnfants("center");
            icone.style.boxSizing = "border-box";
            icone.style.position = "relative";
            var tailleImages = 60;
            var imageFond = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/icones/cadre1.png")).defLargeur(tailleImages).defHauteur(tailleImages).defCSS("position", "absolute");
            var imageCadre = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/icones/fond1.png")).defLargeur(tailleImages).defHauteur(tailleImages).defCSS("position", "absolute");
            var imageEquipement = new I_Image_1.I_Image(TFMAdventure_1.default.recupImageDistance("interface/icones/" + this.code + ".png")).defCSS("position", "absolute");
            icone.ajouterElementCentre(imageCadre);
            icone.ajouterElementCentre(imageFond);
            imageEquipement.finChargement(function () {
                icone.elementHTML.insertBefore(imageEquipement.elementHTML, imageFond.elementHTML);
            });
            imageEquipement.erreurChargement(function () {
                icone.vider();
                var spriteEquipement = _this.recupSpriteBasiquePixi(SLOT);
                if (spriteEquipement) {
                    var largeur_1 = TAILLE;
                    var hauteur_1 = TAILLE;
                    var image = new I_ImagePixi_1.I_ImagePixi(largeur_1, hauteur_1).defLargeur(largeur_1).defHauteur(hauteur_1);
                    var nouveauClip_1 = new Sprite();
                    for (var _i = 0, _a = spriteEquipement.children; _i < _a.length; _i++) {
                        var child = _a[_i];
                        var textureEnfant = child.texture;
                        var textureBase = textureEnfant.baseTexture;
                        var copieEnfant = new Sprite(textureEnfant);
                        copieEnfant.pivot.set(child.pivot.x, child.pivot.y);
                        nouveauClip_1.addChild(copieEnfant);
                        if (textureBase.hasLoaded) {
                            EquipementADV.redimensionnerClip(nouveauClip_1, largeur_1, hauteur_1, 5);
                        }
                        else {
                            textureBase.on("loaded", function () {
                                EquipementADV.redimensionnerClip(nouveauClip_1, largeur_1, hauteur_1, 5);
                            });
                        }
                    }
                    image.scene.addChild(nouveauClip_1);
                    icone.appendChild(image);
                    icone.afficherFondUni("#00000050");
                    icone.style.padding = null;
                }
                else {
                    icone.afficherFondUni("hsl(" + 360 * (_this.code * _this.code * 29 / 7) + ',' + (70 + 30 * Math.random()) + '%,' + (60 + 15 * Math.random()) + '%)');
                    icone.style.padding = null;
                }
            });
            return icone;
        };
        EquipementADV.redimensionnerClip = function (CLIP, LARGEUR, HAUTEUR, MARGE) {
            LARGEUR -= MARGE;
            HAUTEUR -= MARGE;
            var rect = CLIP.getLocalBounds();
            CLIP.x = ((LARGEUR - rect.width) / 2) - rect.x + MARGE / 2;
            CLIP.y = ((HAUTEUR - rect.height) / 2) - rect.y + MARGE / 2;
            if (rect.width > LARGEUR || rect.height > HAUTEUR) {
                var echelle = Math.min(LARGEUR / rect.width, HAUTEUR / rect.height);
                CLIP.scale = new Point(echelle, echelle);
            }
        };
        EquipementADV.deserialiser = function (MSG) {
            var codeEquipement = MSG.l16();
            var equipement = new EquipementADV(codeEquipement);
            var apparence;
            var sprite;
            apparence = MSG.l16();
            sprite = null;
            if (apparence != 0) {
                var nbMorceaux = MSG.l8();
                sprite = new Sprite();
                for (var i = 0; i < nbMorceaux; i++) {
                    var nomMorceau = MSG.lChaine();
                    var idMorceau = MSG.l16();
                    var morceau = new Sprite();
                    morceau.texture = PIXI.Texture.fromImage(ClipAnim_1.ClipAnim.BIBLIOTHEQUE_MORCEAUX + idMorceau + "/" + nomMorceau + ".png");
                    var ancreX = MSG.l16s();
                    var ancreY = MSG.l16s();
                    morceau.pivot.set(ancreX, ancreY);
                    sprite.addChild(morceau);
                }
            }
            equipement.apparence = (apparence && sprite) ? {
                code: apparence,
                sprite: sprite
            } : null;
            apparence = MSG.l16();
            sprite = null;
            if (apparence != 0) {
                var nbMorceaux = MSG.l8();
                sprite = new Sprite();
                for (var i = 0; i < nbMorceaux; i++) {
                    var nomMorceau = MSG.lChaine();
                    var idMorceau = MSG.l16();
                    var morceau = new Sprite();
                    morceau.texture = PIXI.Texture.fromImage(ClipAnim_1.ClipAnim.BIBLIOTHEQUE_MORCEAUX + idMorceau + "/" + nomMorceau + ".png");
                    var ancreX = MSG.l16s();
                    var ancreY = MSG.l16s();
                    morceau.pivot.set(ancreX, ancreY);
                    sprite.addChild(morceau);
                }
            }
            equipement.apparenceSecondaire = (apparence && sprite) ? {
                code: apparence,
                sprite: sprite
            } : null;
            equipement.estUneArme = MSG.lBool();
            if (equipement.estUneArme) {
                equipement.typeArme = MSG.l8();
            }
            return equipement;
        };
        EquipementADV.deserialiserStats = function (MSG) {
            var stats = {};
            var nbStats = MSG.l8();
            for (var j = 0; j < nbStats; j++) {
                var typeStat = MSG.l16();
                var valeursStat = [];
                var nbValeurs = MSG.l8();
                for (var k = 0; k < nbValeurs; k++) {
                    valeursStat.push(MSG.l32s());
                }
                stats[typeStat] = valeursStat;
            }
            return stats;
        };
        return EquipementADV;
    }());
    exports.default = EquipementADV;
});
//# sourceMappingURL=EquipementADV.js.map