define(["require", "exports", "./EquipementADV", "../../../../Souritheque-client/src/outils/affichage/animation/ClipAnim", "../../../../Souritheque-client/src/outils/Trad801", "../../_tfmAdventure/TFMAdventure"], function (require, exports, EquipementADV_1, ClipAnim_1, Trad801_1, TFMAdventure_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Text = PIXI.Text;
    var TypeRecompenseADV;
    (function (TypeRecompenseADV) {
        TypeRecompenseADV[TypeRecompenseADV["EQUIPEMENT"] = 1] = "EQUIPEMENT";
        TypeRecompenseADV[TypeRecompenseADV["FAMILIER"] = 2] = "FAMILIER";
        TypeRecompenseADV[TypeRecompenseADV["MONNAIE"] = 3] = "MONNAIE";
        TypeRecompenseADV[TypeRecompenseADV["TITRE"] = 4] = "TITRE";
        TypeRecompenseADV[TypeRecompenseADV["METIER"] = 5] = "METIER";
        TypeRecompenseADV[TypeRecompenseADV["SPECIALE"] = 6] = "SPECIALE";
    })(TypeRecompenseADV || (TypeRecompenseADV = {}));
    var RecompenseADV = (function () {
        function RecompenseADV(TYPE) {
            this.type = TYPE;
        }
        RecompenseADV.deserialiser = function (DONNEES) {
            var type = DONNEES.l8();
            var recompense = null;
            if (type == TypeRecompenseADV.EQUIPEMENT) {
                recompense = new RecompenseADV(type);
                recompense.equipement = EquipementADV_1.default.deserialiser(DONNEES);
            }
            else if (type == TypeRecompenseADV.FAMILIER) {
                recompense = new RecompenseADV(type);
                recompense.codeFamilier = DONNEES.l8();
                recompense.clipAnim = new ClipAnim_1.ClipAnim(DONNEES);
            }
            else if (type == TypeRecompenseADV.TITRE) {
                recompense = new RecompenseADV(type);
                recompense.codeTitre = DONNEES.l16();
            }
            else if (type == TypeRecompenseADV.METIER) {
                recompense = new RecompenseADV(type);
                recompense.codeMetier = DONNEES.l8();
            }
            else if (type == TypeRecompenseADV.SPECIALE) {
                recompense = new RecompenseADV(type);
                recompense.codeSpecial = DONNEES.l8();
            }
            return recompense;
        };
        RecompenseADV.prototype.recupSprite = function () {
            var conteneur = new PIXI.Container();
            if (this.type == TypeRecompenseADV.EQUIPEMENT) {
                var icone = this.equipement.recupIconePixi();
                icone.position.set(-30, -30);
                conteneur.addChild(icone);
            }
            else if (this.type == TypeRecompenseADV.FAMILIER) {
                var listeAnim = this.clipAnim.recupSourceClonage().listeAnim;
                if (listeAnim && listeAnim.length) {
                    this.clipAnim.jouerAnimation(listeAnim[0].nomAnim, 0, true);
                }
                var clip = this.clipAnim;
                clip.scale.set(0.75, 0.75);
                clip.anchor.set(0.5, 0.5);
                conteneur.addChild(clip);
            }
            else if (this.type == TypeRecompenseADV.TITRE) {
                var clip = new PIXI.Sprite();
                clip.addChild(new Text(Trad801_1.default.trad("$titre." + this.codeTitre), {
                    wordWrap: true,
                    wordWrapWidth: 250,
                    breakWords: true,
                    padding: 5
                }));
                conteneur.addChild(clip);
            }
            else if (this.type == TypeRecompenseADV.METIER) {
                var image = new PIXI.Sprite(TFMAdventure_1.default.recupTextureDistante("interface/metiers/preview-metier-" + this.codeMetier + ".png"));
                image.anchor.set(0.5, 0.5);
                var texte1 = new PIXI.Text(Trad801_1.default.trad("$metier.nouveau"), RecompenseADV.styleTitre);
                texte1.anchor.set(0.5, 1);
                texte1.y = -(87 + 2);
                var texte2 = new PIXI.Text(Trad801_1.default.trad("$metier.nom." + this.codeMetier), RecompenseADV.styleMetier);
                texte2.anchor.set(0.5, 0);
                texte2.y = 87;
                conteneur.addChild(image, texte1, texte2);
            }
            else if (this.type == TypeRecompenseADV.SPECIALE) {
                var clip = PIXI.Sprite.fromImage(TFMAdventure_1.default.recupImageDistance("interface/recompense/icone-recompense-" + this.codeSpecial + ".png"));
                clip.anchor.set(0.5, 0.5);
                conteneur.addChild(clip);
            }
            return conteneur;
        };
        RecompenseADV.styleTitre = new PIXI.TextStyle({
            fontFamily: "Verdana,sans-serif",
            align: "center",
            fill: "#EBDDC3",
            fontSize: 20,
            stroke: '#000000',
            strokeThickness: 3
        });
        RecompenseADV.styleMetier = new PIXI.TextStyle({
            fontFamily: "Verdana,sans-serif",
            align: "center",
            fill: "#FF9000",
            fontSize: 20,
            stroke: '#000000',
            strokeThickness: 3
        });
        return RecompenseADV;
    }());
    exports.default = RecompenseADV;
});
//# sourceMappingURL=RecompenseADV.js.map