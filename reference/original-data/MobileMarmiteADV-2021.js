var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../MobileADV", "../../../../../Souritheque-client/src/outils/son/MoteurSon", "../../../_tfmAdventure/TFMAdventure", "../../MondeADV"], function (require, exports, MobileADV_1, MoteurSon_1, TFMAdventure_1, MondeADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MobileMarmiteADV = (function (_super) {
        __extends(MobileMarmiteADV, _super);
        function MobileMarmiteADV() {
            var _this = _super.call(this) || this;
            _this.nettoyageEnCours = false;
            _this.dernierNbIngredient = 0;
            _this.listeIcone = [];
            _this.listeTextureIcone = [];
            _this.listeIcone.push(new IconeSol(0));
            _this.listeIcone.push(new IconeSol(Math.PI / 6));
            _this.listeIcone.push(new IconeSol(Math.PI / 3));
            _this.listeTextureIcone.push(TFMAdventure_1.default.recupTextureDistante("cuisto/i/i100.png"));
            _this.listeTextureIcone.push(TFMAdventure_1.default.recupTextureDistante("cuisto/i/i101.png"));
            _this.listeTextureIcone.push(TFMAdventure_1.default.recupTextureDistante("cuisto/i/i102.png"));
            return _this;
        }
        MobileMarmiteADV.prototype.boucle = function (TEMPS, DELTA, SECONDE) {
            _super.prototype.boucle.call(this, TEMPS, DELTA, SECONDE);
            if (this.jaugeEnCours) {
                var restant = Math.max(this.dateFinCuisson - TEMPS, 0);
                this.jaugeEnCours.defValeur(1 - ((this.dureeCuisson - restant) / this.dureeCuisson), this.nettoyageEnCours);
            }
            for (var _i = 0, _a = this.listeIcone; _i < _a.length; _i++) {
                var icone = _a[_i];
                icone.position3d.x = this.positionVirtuelle.x;
                icone.position3d.z = this.positionVirtuelle.y;
                icone.euler.z += DELTA / 700;
            }
        };
        MobileMarmiteADV.prototype.signalement = function () {
            this.afficherFX(87, 0, 0, 1, 1, 0, 0, 0, 2000);
        };
        MobileMarmiteADV.prototype.majMarmite = function (MSG) {
            this.creature.viderEmplacementObjet("i0");
            this.creature.viderEmplacementObjet("i1");
            this.creature.viderEmplacementObjet("i2");
            this.creature.viderEmplacementObjet("e");
            var codeRecette = MSG.l8();
            var clipRecette = PIXI.Sprite.fromImage(TFMAdventure_1.default.recupImageDistance("cuisto/e/" + codeRecette + ".png"));
            clipRecette.anchor.set(0.5, 0.5);
            this.creature.equiperObjet("e", clipRecette);
            var nb = MSG.l8();
            for (var i = 0; i < nb; i++) {
                var type = MSG.l8();
                var image = MSG.l8();
                var clip = PIXI.Sprite.fromImage(TFMAdventure_1.default.recupImageDistance("cuisto/" + image + "m.png"));
                clip.anchor.set(0.5, 0.5);
                this.creature.equiperObjet("i" + i, clip);
                var icone = this.listeIcone[i];
                icone.texture = this.listeTextureIcone[type];
                if (type == 0) {
                    icone.tint = 0x531A00;
                }
                else if (type == 1) {
                    icone.tint = 0x002253;
                }
                else if (type == 2) {
                    icone.tint = 0x005332;
                }
                else {
                    icone.tint = 0xFFFFFF;
                }
                if (!icone.parent) {
                    MondeADV_1.MondeADV.instance.coucheOmbre.addChild(icone);
                }
            }
            for (var i = nb; i < 3; i++) {
                var icone = this.listeIcone[i];
                if (icone.parent) {
                    icone.parent.removeChild(icone);
                }
            }
            if (nb == 1 && this.dernierNbIngredient == 0) {
                MoteurSon_1.default.jouerEffet("gaz", 0.5);
            }
            if (nb > this.dernierNbIngredient) {
                MoteurSon_1.default.jouerEffet("cuisson" + (1 + (Math.random() * 2) | 0), 0.5);
            }
            this.dernierNbIngredient = nb;
        };
        MobileMarmiteADV.prototype.majDureeCuisson = function (DUREE, DUREE_MAX, NETTOYAGE) {
            this.nettoyageEnCours = NETTOYAGE;
            this.dateFinCuisson = Date.now() + DUREE;
            this.dureeCuisson = DUREE_MAX;
            if (!this.jaugeEnCours) {
                this.jaugeEnCours = new JaugeCuisson();
                this.jaugeEnCours.defValeur(1 - ((DUREE_MAX - DUREE) / DUREE_MAX), NETTOYAGE);
                this.jaugeEnCours.position.set(51, 0);
                this.creature.addChild(this.jaugeEnCours);
            }
            this.jaugeEnCours.visible = DUREE >= 0;
        };
        MobileMarmiteADV.prototype.deserialisationSupplementaire = function (MSG) {
        };
        return MobileMarmiteADV;
    }(MobileADV_1.MobileADV));
    exports.MobileMarmiteADV = MobileMarmiteADV;
    var IconeSol = (function (_super) {
        __extends(IconeSol, _super);
        function IconeSol(DECALAGE) {
            var _this = _super.call(this, null) || this;
            _this.decalage = DECALAGE;
            _this.euler.x = Math.PI / 2;
            _this.euler.z = DECALAGE;
            _this.anchor.set(0.5, 0.5);
            _this.blendMode = PIXI.BLEND_MODES.ADD;
            return _this;
        }
        return IconeSol;
    }(PIXI.projection.Sprite3d));
    var JaugeCuisson = (function (_super) {
        __extends(JaugeCuisson, _super);
        function JaugeCuisson() {
            var _this = _super.call(this) || this;
            _this.largeur = 20;
            _this.hauteur = 30;
            if (!JaugeCuisson.textureFond) {
                var formeFond = new PIXI.Graphics();
                formeFond.beginFill(0x222222);
                formeFond.drawRoundedRect(0, 0, _this.largeur, _this.hauteur, 4);
                formeFond.endFill();
                formeFond.beginFill(0, 0);
                formeFond.drawRect(-2, -2, _this.largeur + 4, _this.hauteur + 4);
                formeFond.endFill();
                JaugeCuisson.textureFond = formeFond.generateCanvasTexture();
                var formeJauge = new PIXI.Graphics();
                formeJauge.beginFill(0xFFFFFF);
                formeJauge.drawRoundedRect(2, 2, _this.largeur - 4, _this.hauteur - 4, 4);
                formeJauge.endFill();
                formeJauge.beginFill(0, 0);
                formeJauge.drawRect(0, 0, _this.largeur, _this.hauteur);
                formeJauge.endFill();
                JaugeCuisson.textureJauge = formeJauge.generateCanvasTexture();
            }
            _this.fond = new PIXI.Sprite(JaugeCuisson.textureFond);
            _this.fond.anchor.set(0.5, 1);
            _this.addChild(_this.fond);
            _this.jauge = new PIXI.Sprite(JaugeCuisson.textureJauge);
            _this.jauge.anchor.set(0.5, 1);
            _this.jauge.y = -2;
            _this.addChild(_this.jauge);
            _this.textureEau = TFMAdventure_1.default.recupTextureDistante("interface/jauge-lavage.png");
            _this.textureFeu = TFMAdventure_1.default.recupTextureDistante("interface/jauge-cuisson.png");
            _this.cadre = new PIXI.Sprite(_this.textureFeu);
            _this.cadre.position.set(3, 1);
            _this.cadre.anchor.set(0.5, 1);
            _this.addChild(_this.cadre);
            return _this;
        }
        JaugeCuisson.prototype.defValeur = function (VALEUR, NETTOYAGE) {
            this.cadre.texture = NETTOYAGE ? this.textureEau : this.textureFeu;
            if (NETTOYAGE) {
                this.jauge.scale.y = 1 - VALEUR;
                this.jauge.tint = 0x2172DF;
            }
            else {
                this.jauge.scale.y = VALEUR;
                if (VALEUR < 0.3333) {
                    this.jauge.tint = 0xDF3021;
                }
                else if (VALEUR < 0.6666) {
                    this.jauge.tint = 0xDCDF21;
                }
                else {
                    this.jauge.tint = 0x21DF3F;
                }
            }
        };
        return JaugeCuisson;
    }(PIXI.Container));
});
//# sourceMappingURL=MobileMarmiteADV.js.map