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
define(["require", "exports", "../../../Souritheque-client/src/interface/souruis/elements/I_Conteneur", "../_tfmAdventure/TFMAdventure", "../../../Souritheque-client/src/interface/souruis/elements/I_Texte", "../../../Souritheque-client/src/outils/Trad801", "./InterfaceChargementADV", "../../../Souritheque-client/src/outils/affichage/animation/AnimMath", "../../../Souritheque-client/src/interface/souruis/elements/I_BoutonEtat", "../../../Souritheque-client/src/interface/souruis/Souruis", "./NotificationADV", "../../../Souritheque-client/src/outils/son/MoteurSon", "../_monde/MondeADV", "../_monde/_mobile/MobileADV", "../../../Souritheque-client/src/outils/Mathematiques", "../_animation/ClipAnimProjection", "../gameplay/InterfaceCompetenceADV"], function (require, exports, I_Conteneur_1, TFMAdventure_1, I_Texte_1, Trad801_1, InterfaceChargementADV_1, AnimMath_1, I_BoutonEtat_1, Souruis_1, NotificationADV_1, MoteurSon_1, MondeADV_1, MobileADV_1, Mathematiques_1, ClipAnimProjection_1, InterfaceCompetenceADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InterfaceQueteADV = (function (_super) {
        __extends(InterfaceQueteADV, _super);
        function InterfaceQueteADV() {
            var _this = _super.call(this) || this;
            _this.listeChangement = [];
            _this.indexObjectif = {};
            _this.prochaineBoucle = 0;
            _this.listeAnim = [];
            _this.rayonEcran = 600;
            _this.modeFleche = 0;
            _this.limiteFlecheAplat = 160000;
            _this.style.position = "absolute";
            _this.style.top = "0em";
            _this.style.right = "0em";
            _this.style.marginTop = "10%";
            _this.style.marginRight = "1em";
            Souruis_1.Souruis.activerSouris(_this.elementHTML, false);
            _this.clipFlecheInterface = TFMAdventure_1.default.recupFX(87);
            return _this;
        }
        InterfaceQueteADV.afficher = function () {
            if (!InterfaceQueteADV.instance) {
                InterfaceQueteADV.instance = new InterfaceQueteADV();
            }
            TFMAdventure_1.default.ajouterInterface(InterfaceQueteADV.instance.elementHTML);
        };
        InterfaceQueteADV.estAfficher = function () {
            return Boolean(InterfaceQueteADV.instance && InterfaceQueteADV.instance.elementHTML.parentNode);
        };
        InterfaceQueteADV.prototype.resetAffichage = function () {
            this.vider();
            this.listeChangement = [];
            this.indexObjectif = {};
            this.listeAnim = [];
            this.modeFleche = 0;
            if (this.marqueurObjectif) {
                this.marqueurObjectif = null;
                this.mobileCible = null;
                if (this.flecheAplat.parent) {
                    this.flecheAplat.parent.removeChild(this.flecheAplat);
                }
                if (this.flecheEcran.parent) {
                    this.flecheEcran.parent.removeChild(this.flecheEcran);
                }
            }
        };
        InterfaceQueteADV.prototype.boucle = function (TEMPS, DELTA) {
            if (InterfaceChargementADV_1.InterfaceChargementADV.estAffiche()) {
                return;
            }
            if (TEMPS > this.prochaineBoucle) {
                this.prochaineBoucle = TEMPS + 500;
                this.rayonEcran = Mathematiques_1.default.distance2Points(0, 0, TFMAdventure_1.default.DEMI_LARGEUR, TFMAdventure_1.default.DEMI_HAUTEUR);
                var limite = Math.min(TFMAdventure_1.default.DEMI_HAUTEUR, TFMAdventure_1.default.DEMI_LARGEUR);
                this.limiteFlecheAplat = limite * limite;
                if (this.marqueurObjectif && this.marqueurObjectif.mobileCible) {
                    this.mobileCible = MondeADV_1.MondeADV.instance.recupMobile(this.marqueurObjectif.mobileCible);
                }
                if (!InterfaceChargementADV_1.InterfaceChargementADV.estAffiche()) {
                    if (this.listeChangement.length) {
                        this.listeChangement.shift()();
                    }
                }
            }
            var nb = this.listeAnim.length;
            if (nb) {
                for (var i = 0; i < nb; i++) {
                    var anim = this.listeAnim[i];
                    anim.boucle();
                    if (anim.estTerminee) {
                        this.listeAnim.splice(i, 1);
                        nb--;
                        i--;
                    }
                }
            }
            if (this.clipFlecheInterface.parent) {
                this.clipFlecheInterface.boucle(TEMPS);
            }
            if (this.marqueurObjectif) {
                if (!this.flecheEcran) {
                    this.flecheEcran = new FlecheEcran();
                    this.flecheAplat = new FlecheAplat();
                }
                var joueur = MobileADV_1.MobileADV.joueurPrincipal;
                if (joueur) {
                    var angle = Math.atan2(this.marqueurObjectif.posCibleY - joueur.positionVirtuelle.y, this.marqueurObjectif.posCibleX - joueur.positionVirtuelle.x);
                    var posX = this.marqueurObjectif.posCibleX;
                    var posY = this.marqueurObjectif.posCibleY;
                    if (this.mobileCible) {
                        posX = this.mobileCible.positionVirtuelle.x;
                        posY = this.mobileCible.positionVirtuelle.y;
                    }
                    if (Mathematiques_1.default.distanceCarre(joueur.positionVirtuelle.x, joueur.positionVirtuelle.y, posX, posY) < this.limiteFlecheAplat) {
                        if (this.modeFleche != 2) {
                            this.modeFleche = 2;
                            if (!this.flecheAplat.parent) {
                                MondeADV_1.MondeADV.instance.coucheOmbre.addChild(this.flecheAplat);
                            }
                            if (this.flecheEcran.parent) {
                                this.flecheEcran.parent.removeChild(this.flecheEcran);
                            }
                        }
                        this.flecheAplat.position3d.x = posX;
                        this.flecheAplat.position3d.z = posY;
                        this.flecheAplat.boucle(TEMPS);
                    }
                    else {
                        if (this.modeFleche != 1) {
                            this.modeFleche = 1;
                            if (!this.flecheEcran.parent) {
                                MondeADV_1.MondeADV.instance.addChild(this.flecheEcran);
                                this.flecheEcran.x = TFMAdventure_1.default.DEMI_LARGEUR;
                                this.flecheEcran.y = TFMAdventure_1.default.DEMI_HAUTEUR;
                            }
                            if (this.flecheAplat.parent) {
                                this.flecheAplat.parent.removeChild(this.flecheAplat);
                            }
                        }
                        var cibleX = Math.min(Math.max(TFMAdventure_1.default.DEMI_LARGEUR + Mathematiques_1.default.cosRapide(angle) * this.rayonEcran, 0), TFMAdventure_1.default.LARGEUR);
                        var cibleY = Math.min(Math.max(TFMAdventure_1.default.DEMI_HAUTEUR + Mathematiques_1.default.sinRapide(angle) * this.rayonEcran, 0), TFMAdventure_1.default.HAUTEUR);
                        this.flecheEcran.x += (cibleX - this.flecheEcran.x) * 0.1 * DELTA;
                        this.flecheEcran.y += (cibleY - this.flecheEcran.y) * 0.1 * DELTA;
                        this.flecheEcran.rotation = angle;
                    }
                }
            }
        };
        InterfaceQueteADV.prototype.ajouterObjectif = function (MSG) {
            var _this = this;
            var objectif = new Objectif(this, MSG);
            this.indexObjectif[objectif.identifiant] = objectif;
            this.listeChangement.push(function () {
                if (!_this.marqueurObjectif && objectif.positionCible) {
                    _this.marqueurObjectif = objectif;
                }
                _this.elementHTML.insertBefore(objectif.elementHTML, _this.elementHTML.firstChild);
                objectif.style.marginRight = "-120%";
                _this.listeAnim.push(AnimMath_1.default.animBoucle(1500, function (P) {
                    objectif.style.marginRight = "-" + ((1 - P) * 120 | 0) + "%";
                }).defFonctionFin(function () {
                    MoteurSon_1.default.jouerEffet("objectif");
                    NotificationADV_1.default.afficher(objectif.texte, 4000);
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo));
                if (objectif.cibleInterface) {
                    if (objectif.cibleInterface == 1) {
                        InterfaceCompetenceADV_1.InterfaceCompetenceADV.instance.addChild(_this.clipFlecheInterface);
                        _this.clipFlecheInterface.position.set(-68, 50);
                    }
                }
            });
        };
        InterfaceQueteADV.prototype.supprimerObjectif = function (MSG) {
            var _this = this;
            var objectif = this.indexObjectif[MSG.l32s()];
            if (objectif) {
                delete this.indexObjectif[objectif.identifiant];
                this.listeChangement.push(function () {
                    if (objectif.cibleInterface && _this.clipFlecheInterface.parent) {
                        _this.clipFlecheInterface.parent.removeChild(_this.clipFlecheInterface);
                    }
                    if (objectif == _this.marqueurObjectif) {
                        _this.modeFleche = 0;
                        _this.marqueurObjectif = null;
                        _this.mobileCible = null;
                        if (_this.flecheAplat.parent) {
                            _this.flecheAplat.parent.removeChild(_this.flecheAplat);
                        }
                        if (_this.flecheEcran.parent) {
                            _this.flecheEcran.parent.removeChild(_this.flecheEcran);
                        }
                    }
                    _this.listeAnim.push(AnimMath_1.default.animBoucle(1500, function (P) {
                        objectif.style.marginRight = "-" + (P * 120 | 0) + "%";
                    }).defFonctionFin(function () {
                        objectif.retirer();
                    }).defMouvement(AnimMath_1.Mouvement.easeOutExpo));
                });
            }
        };
        InterfaceQueteADV.prototype.validerObjectif = function (MSG) {
            var objectif = this.indexObjectif[MSG.l32s()];
            if (objectif) {
                this.listeChangement.push(function () {
                    objectif.valider();
                });
            }
        };
        return InterfaceQueteADV;
    }(I_Conteneur_1.I_Conteneur));
    exports.default = InterfaceQueteADV;
    var Objectif = (function (_super) {
        __extends(Objectif, _super);
        function Objectif(QUETE, MSG) {
            var _this = _super.call(this, "ligne") || this;
            _this.style.textAlign = "right";
            _this.style.alignSelf = "flex-end";
            Souruis_1.Souruis.activerSouris(_this.elementHTML, false);
            _this.quete = QUETE;
            _this.identifiant = MSG.l32s();
            _this.codeTexte = MSG.lChaine();
            _this.cibleInterface = MSG.l8();
            _this.positionCible = MSG.lBool();
            if (_this.positionCible) {
                _this.posCibleX = MSG.lFloat();
                _this.posCibleY = MSG.lFloat();
            }
            _this.mobileCible = MSG.l32s();
            _this.texte = Trad801_1.default.trad("$" + _this.codeTexte);
            _this.champTexte = new I_Texte_1.I_Texte(_this.texte);
            _this.champTexte.defLargeurMax("15em");
            _this.btnValidation = new I_BoutonEtat_1.I_BoutonEtat("");
            Souruis_1.Souruis.activerSouris(_this.btnValidation.elementHTML, false);
            _this.ajouterElement(_this.champTexte, _this.btnValidation);
            return _this;
        }
        Objectif.prototype.valider = function () {
            var _this = this;
            MoteurSon_1.default.jouerEffet("objectif2");
            this.btnValidation.cocher(true);
            this.quete.listeAnim.push(AnimMath_1.default.animBoucle(500, function (P) {
                _this.champTexte.style.paddingRight = ((1 - P) * 2) + "em";
            }).defMouvement(AnimMath_1.Mouvement.easeOutBounce));
        };
        return Objectif;
    }(I_Conteneur_1.I_Conteneur));
    var FlecheEcran = (function (_super) {
        __extends(FlecheEcran, _super);
        function FlecheEcran() {
            var _this = _super.call(this, TFMAdventure_1.default.recupTextureDistante("interface/fleche.png")) || this;
            _this.anchor.set(1, 0.5);
            return _this;
        }
        return FlecheEcran;
    }(PIXI.Sprite));
    var FlecheAplat = (function (_super) {
        __extends(FlecheAplat, _super);
        function FlecheAplat() {
            return _super.call(this, TFMAdventure_1.default.indexFX[72].clip) || this;
        }
        return FlecheAplat;
    }(ClipAnimProjection_1.ClipAnimProjection));
});
//# sourceMappingURL=InterfaceQueteADV.js.map