define(["require", "exports", "../../_monde/_mobile/MobileADV", "../../_monde/MondeADV", "../../outils/MathADV", "../../_tfmAdventure/TFMAdventure", "../../_tfmAdventure/ProtoADV", "../../_tfmAdventure/ClavierADV"], function (require, exports, MobileADV_1, MondeADV_1, MathADV_1, TFMAdventure_1, ProtoADV_1, ClavierADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EtatArme;
    (function (EtatArme) {
        EtatArme[EtatArme["PRET"] = 1] = "PRET";
        EtatArme[EtatArme["INCANTATION"] = 2] = "INCANTATION";
        EtatArme[EtatArme["ACTIF"] = 3] = "ACTIF";
    })(EtatArme = exports.EtatArme || (exports.EtatArme = {}));
    var ArmeADV = (function () {
        function ArmeADV() {
            this.interruptableEnDeplacement = false;
            this.finIncantationAuto = true;
            this.boucleRequise = false;
            this.mainDroite = true;
            this.deplacementPossible = true;
            this.desactivationAuto = 0;
            this.listeAnimEnCours = [];
            this.imageAttaque = 10;
            this.listeAnimAttaque = [];
            this.posture = "";
            this.nomAnim = "";
            this.derniereUtilisation = 0;
            this.clicEnCours = false;
            this.etatUtilisation = EtatArme.PRET;
            this.nombreChargeMax = 5;
            this.ancienNombreChargeMax = -1;
            this.chargeEnCours = -1;
            this.verrouillageEnCours = -1;
            this.peutSurcharger = false;
            this.listeClipCharge = [];
            this.boucleInterne = this.boucleInterne.bind(this);
        }
        ArmeADV.prototype.activation = function () {
            return true;
        };
        ;
        ArmeADV.prototype.desactivation = function () {
        };
        ArmeADV.prototype.infoSupplementaire = function (MSG) {
        };
        ArmeADV.prototype.boucle = function () {
        };
        ArmeADV.prototype.interruption = function () {
        };
        ArmeADV.prototype.debutClique = function () {
            this.clicEnCours = true;
        };
        ArmeADV.prototype.finClique = function () {
            this.clicEnCours = false;
        };
        ArmeADV.prototype.deplacement = function () {
            if (this.interruptableEnDeplacement) {
                this.interruptionInterne();
            }
        };
        ArmeADV.prototype.interruptionInterne = function () {
            if (this.etatUtilisation != EtatArme.PRET) {
                this.interruption();
                this.etatUtilisation = EtatArme.PRET;
                this.tempsFinIncantation = 0;
                if (this.mobile.estJoueurPrincipal) {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.interruptionArme(this.identifiant));
                }
            }
        };
        ArmeADV.prototype.activationInterne = function (NOTIFICATION_SERVEUR) {
            if (NOTIFICATION_SERVEUR === void 0) { NOTIFICATION_SERVEUR = true; }
            var temps = Date.now();
            if (temps - this.tempsActivation <= 350) {
                return;
            }
            if (this.interruptableEnDeplacement && ClavierADV_1.default.instance.enDeplacementOuProjection()) {
                return;
            }
            this.etatUtilisation = EtatArme.ACTIF;
            this.tempsActivation = temps;
            if (this.chargeSuffisante() && this.activation()) {
                if (this.boucleRequise || this.desactivationAuto > 0) {
                    this.boucleInterne();
                }
                if (this.mobile.estJoueurPrincipal && NOTIFICATION_SERVEUR) {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.activationArme(this.identifiant));
                }
            }
        };
        ArmeADV.prototype.desactivationInterne = function () {
            if (this.etatUtilisation != EtatArme.PRET) {
                this.etatUtilisation = EtatArme.PRET;
                this.desactivation();
            }
        };
        ArmeADV.prototype.incantationInterne = function () {
            if (this.interruptableEnDeplacement && ClavierADV_1.default.instance.enDeplacementOuProjection()) {
                return;
            }
            if (this.incantation()) {
                this.etatUtilisation = EtatArme.INCANTATION;
                if (this.mobile.estJoueurPrincipal) {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.incantationArme(this.identifiant));
                }
            }
        };
        ArmeADV.prototype.incantation = function () {
            return true;
        };
        ArmeADV.prototype.finIncantation = function () {
        };
        ArmeADV.prototype.desequipement = function () {
            this.desactivationInterne();
        };
        ArmeADV.prototype.boucleInterne = function () {
            this.boucle();
            var temps = Date.now();
            switch (this.etatUtilisation) {
                case EtatArme.PRET:
                    if (this.clicEnCours && !MobileADV_1.MobileADV.joueurPrincipal.destructionRequise && !MobileADV_1.MobileADV.joueurPrincipal.estMort && !MobileADV_1.MobileADV.joueurPrincipal.estEtourdi) {
                        if (this.chargeSuffisante()) {
                            if (this.tempsIncantation > 0) {
                                this.tempsFinIncantation = Date.now() + this.tempsIncantation;
                                this.incantationInterne();
                            }
                            else {
                                this.activationInterne();
                            }
                        }
                    }
                    break;
                case EtatArme.INCANTATION:
                    if (this.tempsFinIncantation && Date.now() >= this.tempsFinIncantation) {
                        this.tempsFinIncantation = 0;
                        this.finIncantation();
                    }
                    break;
                case EtatArme.ACTIF:
                    if (this.desactivationAuto >= 0 && temps - this.tempsActivation > this.desactivationAuto) {
                        this.desactivationInterne();
                    }
                    break;
            }
            if (this.listeAnimEnCours.length) {
                for (var _i = 0, _a = this.listeAnimEnCours; _i < _a.length; _i++) {
                    var clip = _a[_i];
                    clip.alpha += (clip.alphaCible - clip.alpha) * 0.2;
                    clip.scale.set(clip.scale.x + (clip.echelleCible - clip.scale.x) * 0.2);
                }
            }
        };
        ArmeADV.prototype.recupClipIcone = function () {
            if (!this.clipIcone) {
                this.clipIcone = new PIXI.Container();
                this.clipCharge = new PIXI.Container();
                this.clipIcone.addChild(PIXI.Sprite.from(TFMAdventure_1.default.recupImageDistance("interface/arme/fond.png")));
                this.clipIcone.addChild(this.clipCharge);
                this.clipIcone.addChild(PIXI.Sprite.from(TFMAdventure_1.default.recupImageDistance("interface/arme/a" + this.type + ".png")));
            }
            this.majClipCharge();
            return this.clipIcone;
        };
        ArmeADV.prototype.majCharge = function (CHARGE, VEROUILLAGE, FORCER) {
            if (FORCER === void 0) { FORCER = false; }
            if (CHARGE != this.chargeEnCours || VEROUILLAGE != this.verrouillageEnCours || FORCER) {
                this.chargeEnCours = CHARGE;
                this.verrouillageEnCours = VEROUILLAGE;
                var charge = this.chargeEnCours;
                var couleur = void 0;
                for (var i = 0, nb = this.listeClipCharge.length; i < nb; i++) {
                    var clip = this.listeClipCharge[i];
                    var verrouillee = i >= nb - VEROUILLAGE;
                    var clipAnim = clip;
                    if (i < this.chargeEnCours || verrouillee) {
                        clip.tint = verrouillee ? 0xFF8500 : 0x00E069;
                        if (clipAnim.alphaCible != 1) {
                            if (!clipAnim.animEnCours) {
                                clipAnim.animEnCours = true;
                                this.listeAnimEnCours.push(clipAnim);
                            }
                            clip.scale.set(0.5);
                            clip.alpha = 0;
                            clipAnim.alphaCible = 1;
                            clipAnim.echelleCible = 1;
                        }
                    }
                    else {
                        if (clipAnim.alphaCible != 0) {
                            if (!clipAnim.animEnCours) {
                                clipAnim.animEnCours = true;
                                this.listeAnimEnCours.push(clipAnim);
                            }
                            clip.scale.set(1);
                            clip.alpha = 1;
                            clipAnim.alphaCible = 0;
                            clipAnim.echelleCible = 1.5;
                        }
                    }
                }
            }
        };
        ArmeADV.prototype.recupCodeAnimAttaque = function () {
            var nb = this.listeAnimAttaque.length;
            if (nb == 0) {
                return 0;
            }
            var code = 0;
            for (var i = 0; i < 3; i++) {
                code = this.listeAnimAttaque[(Math.random() * this.listeAnimAttaque.length) | 0];
                if (code != this.dernierCodeAnim) {
                    break;
                }
            }
            this.dernierCodeAnim = code;
            return code;
        };
        ArmeADV.prototype.majClipCharge = function () {
            if (this.nombreChargeMax != this.ancienNombreChargeMax) {
                this.ancienNombreChargeMax = this.nombreChargeMax;
                this.clipCharge.removeChildren();
                for (var _i = 0, _a = this.listeClipCharge; _i < _a.length; _i++) {
                    var clipCharge = _a[_i];
                    clipCharge.texture.destroy(true);
                }
                this.listeClipCharge = [];
                var rayonExterne = ArmeADV.chargeRayonClip;
                var rayonInterne = rayonExterne - 5;
                var longueurMorceau = ((Math.PI * 2) - ArmeADV.chargeTailleEspace * this.nombreChargeMax) / this.nombreChargeMax;
                for (var i = 0; i < this.nombreChargeMax; i++) {
                    var angleDepart = longueurMorceau * i + ArmeADV.chargeTailleEspace * i - (Math.PI / 2 - ArmeADV.chargeTailleEspace / 2);
                    var angleFin = angleDepart + longueurMorceau;
                    var dessin = new PIXI.Graphics();
                    dessin.lineStyle(1, 0, 0.01);
                    dessin.drawCircle(0, 0, ArmeADV.chargeRayonClip);
                    dessin.endFill();
                    dessin.lineStyle(1, 0, 0.7);
                    dessin.beginFill(0xFFFFFF);
                    dessin.moveTo(Math.cos(angleDepart) * rayonExterne, Math.sin(angleDepart) * rayonExterne);
                    var angleEnCours = angleDepart;
                    while (angleEnCours < angleFin) {
                        angleEnCours = Math.min(angleEnCours + ArmeADV.chargePrecisionCourbe, angleFin);
                        dessin.lineTo(Math.cos(angleEnCours) * rayonExterne, Math.sin(angleEnCours) * rayonExterne);
                    }
                    dessin.lineTo(Math.cos(angleFin) * rayonInterne, Math.sin(angleFin) * rayonInterne);
                    while (angleEnCours > angleDepart) {
                        angleEnCours = Math.max(angleEnCours - ArmeADV.chargePrecisionCourbe, angleDepart);
                        dessin.lineTo(Math.cos(angleEnCours) * rayonInterne, Math.sin(angleEnCours) * rayonInterne);
                    }
                    var clip = new PIXI.Sprite(dessin.generateCanvasTexture());
                    clip.tint = 0x00E069;
                    clip.pivot.set(18, 18);
                    clip.position.set(18, 18);
                    this.listeClipCharge.push(clip);
                    this.clipCharge.addChild(clip);
                }
            }
            this.majCharge(this.chargeEnCours, this.verrouillageEnCours, true);
        };
        ArmeADV.prototype.chargeSuffisante = function () {
            return this.chargeEnCours > 0 || (this.peutSurcharger && this.verrouillageEnCours < this.nombreChargeMax - 1);
        };
        ArmeADV.prototype.finAttaqueCorpsACorps = function () {
            var mobile = this.mobile;
            if (mobile.estMort || !mobile.mondeEnCours) {
                return;
            }
            if (mobile.estJoueurPrincipal) {
                var monstreProche = this.recupEnnemiPorteeCaC();
                var angleAttaque = mobile.enCoursDeDeplacement ? mobile.angleDeplacement : (mobile.estVersLaDroite ? 0 : Math.PI);
                if (monstreProche) {
                    monstreProche.effetTouche();
                    angleAttaque = Math.atan2(monstreProche.positionVirtuelle.y - mobile.positionVirtuelle.y, monstreProche.positionVirtuelle.x - mobile.positionVirtuelle.x);
                    MondeADV_1.MondeADV.instance.tremblement(1, 100, 10, angleAttaque);
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.attaque(monstreProche.identifiantMobile, this.dernierCodeAnim, angleAttaque / 0.02617993, this.identifiant));
                    mobile.versLaDroite(monstreProche.positionVirtuelle.x > mobile.positionVirtuelle.x);
                    mobile.finAnimationAttaque(this.codeMain, this.dernierCodeAnim, this.imageAttaque, true);
                    if (this.bibliothequeSon) {
                        this.bibliothequeSon.sonAttaque();
                    }
                }
                else {
                    TFMAdventure_1.default.envoyer(ProtoADV_1.default.attaque(0, this.dernierCodeAnim, angleAttaque / 0.02617993, this.identifiant));
                    mobile.finAnimationAttaque(this.codeMain, this.dernierCodeAnim, this.imageAttaque, false);
                    if (this.bibliothequeSon) {
                        this.bibliothequeSon.raterCoup();
                    }
                }
                MondeADV_1.MondeADV.instance.decalageCamera(Math.cos(angleAttaque) * 25, Math.sin(angleAttaque) * 25);
                MondeADV_1.MondeADV.instance.ajouterSouffle(mobile.positionVirtuelle.x, mobile.positionVirtuelle.y, 200);
            }
            else {
                mobile.finAnimationAttaque(this.codeMain, this.dernierCodeAnim, this.imageAttaque, false);
                MondeADV_1.MondeADV.instance.ajouterSouffle(mobile.positionVirtuelle.x, mobile.positionVirtuelle.y, 200);
            }
            mobile.pauseDeplacement = Date.now() + 200;
        };
        ArmeADV.prototype.ennemiAProximite = function () {
            var monstreProche = null;
            var distanceProche = 0;
            for (var _i = 0, _a = MondeADV_1.MondeADV.instance.listeEnnemis; _i < _a.length; _i++) {
                var mobile = _a[_i];
                if (!mobile.estUnEnnemi || mobile.estMort) {
                    continue;
                }
                var distance = MathADV_1.default.distanceMobile(this.mobile, mobile) - this.mobile.rayonInterne - mobile.rayonInterne;
                if (!monstreProche || distance < distanceProche) {
                    monstreProche = mobile;
                    distanceProche = distance;
                }
            }
            return monstreProche && distanceProche < 500;
        };
        ArmeADV.prototype.recupEnnemiPorteeCaC = function () {
            var monstreProche = null;
            var distanceProche = 0;
            for (var _i = 0, _a = MondeADV_1.MondeADV.instance.listeEnnemis; _i < _a.length; _i++) {
                var mobile = _a[_i];
                if (!mobile.estUnEnnemi || mobile.estMort) {
                    continue;
                }
                var distance = MathADV_1.default.distanceMobile(this.mobile, mobile) - this.mobile.rayonInterne - mobile.rayonInterne;
                if (distance > this.mobile.porteeAttaque) {
                    continue;
                }
                if (!monstreProche || distance < distanceProche) {
                    monstreProche = mobile;
                    distanceProche = distance;
                }
            }
            return monstreProche;
        };
        ArmeADV.chargeRayonClip = 18;
        ArmeADV.chargeTailleEspace = Math.PI / 20;
        ArmeADV.chargePrecisionCourbe = Math.PI / 100;
        return ArmeADV;
    }());
    exports.ArmeADV = ArmeADV;
});
//# sourceMappingURL=ArmeADV.js.map