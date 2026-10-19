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
define(["require", "exports", "../_tfmAdventure/TFMAdventure", "../../../Souritheque-client/src/outils/affichage/animation/AnimMath", "../../../Souritheque-client/src/outils/UtilPIXI", "../../../Souritheque-client/src/outils/son/MoteurSon"], function (require, exports, TFMAdventure_1, AnimMath_1, UtilPIXI_1, MoteurSon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BarreXPADV = (function (_super) {
        __extends(BarreXPADV, _super);
        function BarreXPADV() {
            var _this = _super.call(this) || this;
            _this.largeurTotal = 549;
            _this.largeur = 530;
            _this.fermetureEnCours = false;
            var formeFond = new PIXI.Graphics();
            formeFond.beginFill(BarreXPADV.COULEUR_FOND);
            formeFond.drawRect(0, 0, _this.largeur, 26);
            formeFond.endFill();
            _this.fond = new PIXI.Sprite(formeFond.generateCanvasTexture());
            _this.fond.position.set(10, 43);
            _this.addChild(_this.fond);
            var formeJauge = new PIXI.Graphics();
            formeJauge.beginFill(BarreXPADV.COULEUR);
            formeJauge.drawRect(0, 0, _this.largeur, 26);
            formeJauge.endFill();
            _this.jauge = new PIXI.Sprite(formeJauge.generateCanvasTexture());
            _this.jauge.position.set(10, 43);
            _this.addChild(_this.jauge);
            _this.halo = new PIXI.Sprite(TFMAdventure_1.default.recupTextureDistante("interface/xp_halo.png"));
            _this.halo.y = 43;
            _this.addChild(_this.halo);
            _this.fondCartouche = new PIXI.Sprite(TFMAdventure_1.default.recupTextureDistante("interface/xp_niveau.png"));
            _this.fondCartouche.anchor.set(0.5, 1);
            _this.fondCartouche.position.set(8 + _this.largeurTotal / 2, 55);
            _this.addChildAt(_this.fondCartouche, 0);
            _this.cadre = new PIXI.Sprite(TFMAdventure_1.default.recupTextureDistante("interface/cadre_xp.png"));
            _this.addChild(_this.cadre);
            _this.champXP = new PIXI.Text("", BarreXPADV.styleChiffre);
            _this.champXP.anchor.set(0.5, 0.5);
            _this.champXP.position.set(10 + _this.largeurTotal / 2, 55);
            _this.addChild(_this.champXP);
            _this.champNiveau = new PIXI.Text("", BarreXPADV.styleNiveau);
            _this.champNiveau.anchor.set(0.5, 0.5);
            _this.champNiveau.position.set(8 + _this.largeurTotal / 2, 9);
            _this.addChild(_this.champNiveau);
            UtilPIXI_1.default.rendreElementCliquable(_this, function () {
                _this.fermer();
            });
            return _this;
        }
        BarreXPADV.afficher = function (GAIN, EN_COURS, MAX, NIVEAU_AVANT, NIVEAU_APRES) {
            if (!BarreXPADV.instance) {
                BarreXPADV.instance = new BarreXPADV();
            }
            TFMAdventure_1.default.instance.coucheInterfacePixi.addChildAt(BarreXPADV.instance, 0);
            BarreXPADV.instance.initialisation(GAIN, EN_COURS, MAX, NIVEAU_AVANT, NIVEAU_APRES);
        };
        BarreXPADV.prototype.initialisation = function (GAIN, EN_COURS, MAX, NIVEAU_AVANT, NIVEAU_APRES) {
            var _this = this;
            this.position.set(TFMAdventure_1.default.DEMI_LARGEUR - (this.largeurTotal / 2), TFMAdventure_1.default.HAUTEUR - 250);
            this.fermetureEnCours = false;
            clearTimeout(this.codeFermetureAuto);
            if (this.animFermeture) {
                this.animFermeture.estTerminee = true;
            }
            this.champXP.text = "";
            this.champNiveau.text = String(NIVEAU_AVANT);
            this.jauge.scale.x = EN_COURS / MAX;
            var sonNiveauSupp = true;
            MoteurSon_1.default.jouerEffet("xp", 0.5);
            AnimMath_1.default.animObjet(this, "alpha", 0, 1, 400).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto(true);
            AnimMath_1.default.animBoucle(2000, function (P) {
                var valeur = EN_COURS + GAIN * P;
                if (sonNiveauSupp && valeur >= MAX) {
                    sonNiveauSupp = false;
                    MoteurSon_1.default.jouerEffet("niveausup", 1);
                    _this.champNiveau.text = String(NIVEAU_APRES);
                }
                _this.champXP.text = (Math.ceil(valeur) % MAX) + " / " + MAX;
                _this.jauge.scale.x = (valeur % MAX) / MAX;
                _this.halo.x = _this.jauge.scale.x * _this.largeur;
            }).defMouvement(AnimMath_1.Mouvement.easeOutQuad).boucleAuto();
            this.codeFermetureAuto = window.setTimeout(function () {
                _this.fermer();
            }, 5000);
        };
        BarreXPADV.prototype.fermer = function () {
            var _this = this;
            if (this.fermetureEnCours || !this.parent) {
                return;
            }
            clearTimeout(this.codeFermetureAuto);
            this.fermetureEnCours = true;
            if (this.animFermeture) {
                this.animFermeture.estTerminee = true;
            }
            this.animFermeture = AnimMath_1.default.animObjet(this, "alpha", this.alpha, 0, 600)
                .defFonctionFin(function () {
                if (_this.parent) {
                    _this.parent.removeChild(_this);
                }
            }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto(true);
        };
        BarreXPADV.COULEUR_FOND = 0x1E140F;
        BarreXPADV.COULEUR = 0x60A52F;
        BarreXPADV.styleChiffre = new PIXI.TextStyle({
            fontFamily: "police-nom,Verdana",
            align: "center",
            fill: "#d3bd80",
            fontSize: 18,
            stroke: '#000000',
            strokeThickness: 5
        });
        BarreXPADV.styleNiveau = new PIXI.TextStyle({
            fontFamily: "police-nom,Verdana",
            align: "center",
            fill: "#F79337",
            fontSize: 30,
            stroke: '#000000',
            strokeThickness: 5
        });
        return BarreXPADV;
    }(PIXI.Container));
    exports.BarreXPADV = BarreXPADV;
});
//# sourceMappingURL=BarreXPADV.js.map