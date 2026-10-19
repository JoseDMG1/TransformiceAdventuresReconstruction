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
define(["require", "exports", "./ArmeADV", "../../_monde/MondeADV", "../../_tfmAdventure/TFMAdventure", "../../_tfmAdventure/ProtoADV", "../../_tfmAdventure/ClavierADV", "../../../../Souritheque-client/src/outils/son/MoteurSon"], function (require, exports, ArmeADV_1, MondeADV_1, TFMAdventure_1, ProtoADV_1, ClavierADV_1, MoteurSon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ArmeArc = (function (_super) {
        __extends(ArmeArc, _super);
        function ArmeArc() {
            var _this = _super.call(this) || this;
            _this.tirPret = false;
            _this.tempsTir = 0;
            _this.boucleRequise = true;
            _this.finIncantationAuto = false;
            _this.interruptableEnDeplacement = true;
            return _this;
        }
        ArmeArc.prototype.incantation = function () {
            if (this.tempsTir != 0 && this.tempsTir > Date.now()) {
                return;
            }
            this.tirPret = false;
            this.mobile.creature.jouerAnimation(this.mainDroite ? "arc_charge" : "arcG_chargeG", 10, true);
            this.mobile.creature.animEnCours.defVitesseLecture(2000 / this.tempsIncantation);
            this.sonIncantation = MoteurSon_1.default.jouerEffet("arc1", 0.5);
            if (this.mobile.estJoueurPrincipal) {
                if (!ArmeArc.textureVisee) {
                    ArmeArc.textureVisee = TFMAdventure_1.default.recupTextureDistante("interface/zone/zl.png");
                }
                if (!this.clipVisee) {
                    this.clipVisee = new PIXI.projection.Sprite3d(ArmeArc.textureVisee);
                    this.clipVisee.blendMode = PIXI.BLEND_MODES.ADD;
                    this.clipVisee.anchor.set(0.1, 0.5);
                    this.clipVisee.euler.x = Math.PI / 2;
                    var posSouris = MondeADV_1.MondeADV.instance.recupPosMondeDepuisEcran(TFMAdventure_1.default.SOURIS_X, TFMAdventure_1.default.SOURIS_Y);
                    var angle = Math.atan2(posSouris.y - this.mobile.positionVirtuelle.y, posSouris.x - this.mobile.positionVirtuelle.x);
                    this.clipVisee.position3d.x = (this.mobile.positionVirtuelle.x);
                    this.clipVisee.position3d.z = (this.mobile.positionVirtuelle.y);
                    this.clipVisee.euler.z = angle;
                }
                this.clipVisee.alpha = 0;
                this.mobile.mondeEnCours.coucheSol.addChild(this.clipVisee);
                this.boucle();
                ClavierADV_1.default.instance.compilationDeplacementJoueurPrincipal();
            }
            return true;
        };
        ArmeArc.prototype.desactivation = function () {
            this.finVisee();
        };
        ArmeArc.prototype.interruption = function () {
            this.finVisee();
        };
        ArmeArc.prototype.finVisee = function () {
            if (this.clipVisee && this.clipVisee.parent) {
                this.clipVisee.parent.removeChild(this.clipVisee);
            }
            if (this.mobile.estJoueurPrincipal) {
                this.deplacementPossible = true;
                ClavierADV_1.default.instance.compilationDeplacementJoueurPrincipal();
            }
            if (this.sonIncantation) {
                this.sonIncantation.stop();
                this.sonIncantation = null;
            }
            this.mobile.creature.jouerAnimation("statique", 0, true);
        };
        ArmeArc.prototype.finIncantation = function () {
            this.tirPret = true;
            MoteurSon_1.default.jouerEffet("arc2", 0.3);
        };
        ArmeArc.prototype.boucle = function () {
            if (this.etatUtilisation == ArmeADV_1.EtatArme.PRET) {
                return;
            }
            if (!this.mobile.estJoueurPrincipal) {
                return;
            }
            if (!this.clicEnCours && this.etatUtilisation == ArmeADV_1.EtatArme.INCANTATION) {
                if (this.tirPret) {
                    var temps_1 = Date.now();
                    if ((this.mobile.creature.nomAnimEnCours == "arc_charge" || this.mobile.creature.nomAnimEnCours == "arcG_chargeG") && temps_1 >= this.tempsFinIncantation) {
                        this.desactivationAuto = 41 * 16.6666;
                        this.tempsTir = this.tempsFinIncantation + ArmeArc.TEMPS_MARGE_TIR;
                        this.tempsActivation = temps_1;
                        this.etatUtilisation = ArmeADV_1.EtatArme.ACTIF;
                    }
                    else {
                        this.interruptionInterne();
                    }
                }
                else {
                    this.interruptionInterne();
                }
                return;
            }
            var temps = Date.now();
            var posSouris = MondeADV_1.MondeADV.instance.recupPosMondeDepuisEcran(TFMAdventure_1.default.SOURIS_X, TFMAdventure_1.default.SOURIS_Y);
            var angle = Math.atan2(posSouris.y - this.mobile.positionVirtuelle.y, posSouris.x - this.mobile.positionVirtuelle.x);
            if (this.tempsTir != 0 && temps >= this.tempsTir) {
                this.finVisee();
                this.mobile.creature.jouerAnimation(this.mainDroite ? "arc_tir" : "arcG_tirG", 1, true)
                    .animationSuivante(this.mainDroite ? "statique:arc" : "statique:arcG", 0);
                MoteurSon_1.default.jouerEffet("arc0");
                MondeADV_1.MondeADV.instance.decalageCamera(Math.cos(angle + Math.PI) * 70, Math.sin(angle + Math.PI) * 70);
                if (this.mobile.estJoueurPrincipal) {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.activationTir(this.mainDroite, this.clipVisee.euler.z));
                }
                this.tempsTir = 0;
            }
            else {
                var tempsEcoule = (Date.now() - (this.tempsFinIncantation - this.tempsIncantation));
                var progression = Math.min(tempsEcoule / this.tempsIncantation, 1);
                this.clipVisee.position3d.x = (this.mobile.positionVirtuelle.x);
                this.clipVisee.position3d.z = (this.mobile.positionVirtuelle.y);
                this.clipVisee.euler.z = angle;
                this.clipVisee.alpha = progression;
                if (this.mobile.versLaDroite(TFMAdventure_1.default.SOURIS_X > TFMAdventure_1.default.DEMI_LARGEUR)) {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.mobileDroite(this.mobile.estVersLaDroite));
                }
            }
        };
        ArmeArc.TEMPS_MARGE_TIR = 150;
        return ArmeArc;
    }(ArmeADV_1.ArmeADV));
    exports.ArmeArc = ArmeArc;
});
//# sourceMappingURL=ArmeArc.js.map