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
define(["require", "exports", "../../../../../Souritheque-client/src/outils/affichage/Image", "../../../_tfmAdventure/TFMAdventure", "../../../../../Souritheque-client/src/interface/Couleur", "../../../../../Souritheque-client/src/outils/Trad801"], function (require, exports, Image_1, TFMAdventure_1, Couleur_1, Trad801_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ClipNomADV = (function (_super) {
        __extends(ClipNomADV, _super);
        function ClipNomADV(MOBILE) {
            var _this = _super.call(this) || this;
            _this.largeurBarre = 100;
            _this.hauteurBarre = 10;
            _this.boucleRequise = false;
            _this.nbImageSansAnim = 0;
            _this.echelle = 1;
            _this.barreDeVieEnCours = 1;
            _this.dessinSanteRequis = false;
            _this.pourcentageSanteEnCours = 1;
            _this.pourcentageSanteAnim = 1;
            _this.pourcentageSanteRequis = 1;
            _this.pauseBarreSante = 0;
            _this.pauseBarreSanteAnim = 0;
            _this.differenceChangementSante = 0;
            _this.flashCouleur = 1;
            _this.mobile = MOBILE;
            return _this;
        }
        ClipNomADV.prototype.defEchelle = function (ECHELLE) {
            if (ECHELLE === void 0) { ECHELLE = 1; }
            this.echelle = ECHELLE;
        };
        ClipNomADV.prototype.afficherNom = function (NOM, COULEUR) {
            if (NOM) {
                this.nom = NOM.split("#")[0];
                this.couleurNom = COULEUR;
                if (this.champsPseudo && this.champsPseudo.parent) {
                    this.champsPseudo.parent.removeChild(this.champsPseudo);
                }
                this.champsPseudo = new PIXI.Text(this.nom, this.mobile.estJoueurPrincipal ? ClipNomADV.styleNomJoueurPrincipal : (this.mobile.estUnJoueur ? ClipNomADV.styleNom : ClipNomADV.styleNomPNJ));
                this.addChild(this.champsPseudo);
            }
            this.replacerElement();
        };
        ClipNomADV.prototype.masquerNom = function () {
            if (this.champsPseudo && this.champsPseudo.parent) {
                this.champsPseudo.parent.removeChild(this.champsPseudo);
            }
            this.champsPseudo = null;
            this.replacerElement();
        };
        ClipNomADV.prototype.afficherTitre = function (OUI, CODE_TITRE) {
            if (CODE_TITRE === void 0) { CODE_TITRE = 0; }
            if (this.champTitre && this.champTitre.parent) {
                this.champTitre.parent.removeChild(this.champTitre);
            }
            if (OUI) {
                this.champTitre = new PIXI.Text("«" + Trad801_1.default.trad("$titre." + CODE_TITRE) + "»", {
                    fill: "#FFE18F",
                    fontFamily: "Verdana",
                    align: "center",
                    fontSize: 14,
                });
                this.addChild(this.champTitre);
            }
            else {
                this.champTitre = null;
            }
            this.replacerElement();
        };
        ClipNomADV.prototype.replacerElement = function () {
            var baseY = 0;
            var numSymptome = this.listeSymptome ? this.listeSymptome.length : 0;
            var tailleSymptome = numSymptome * 18;
            var alignerSymptome = this.champsPseudo && numSymptome <= 2;
            var enCoursX = 0;
            var departX = 0;
            if (this.conteneurArme && this.conteneurArme.visible) {
                baseY -= 38;
                this.conteneurArme.x = -38;
                this.conteneurArme.y = baseY;
            }
            if (this.listeSymptome) {
                var num = this.listeSymptome.length;
                if (num) {
                    var departY = void 0;
                    var departXSymptome = void 0;
                    if (alignerSymptome) {
                        departXSymptome = enCoursX + 2;
                        departY = this.champsPseudo.y + 2;
                    }
                    else {
                        departXSymptome = -tailleSymptome / 2;
                        departY = baseY;
                        baseY -= 16;
                    }
                    var i = -1;
                    while (++i < num) {
                        var image = this.listeSymptome[i];
                        image.x = departXSymptome;
                        image.y = departY;
                        departXSymptome += 18;
                    }
                }
            }
            if (this.conteneurSante) {
                baseY -= this.hauteurBarre + 5;
                this.conteneurSante.y = baseY;
                if (this.iconeGauche) {
                    this.iconeGauche.position.set(this.conteneurSante.x + 12, this.conteneurSante.y + 2);
                }
                if (this.iconeDroite) {
                    this.iconeDroite.position.set(this.conteneurSante.x + 36, this.conteneurSante.y + 2);
                }
            }
            if (this.champTitre) {
                baseY -= 15;
                this.champTitre.x = -this.champTitre.width / 2;
                this.champTitre.y = baseY;
            }
            if (this.champsPseudo) {
                baseY -= this.champsPseudo.height;
                baseY += 4;
                var largeurPseudo = this.champsPseudo.width;
                if (alignerSymptome) {
                    largeurPseudo += tailleSymptome;
                }
                departX = -(largeurPseudo / 2);
                enCoursX = departX;
                this.champsPseudo.x = enCoursX;
                this.champsPseudo.y = baseY;
                enCoursX += this.champsPseudo.width;
            }
        };
        ClipNomADV.prototype.majSymptome = function (MSG) {
            if (this.listeSymptome) {
                var i = -1;
                var num = this.listeSymptome.length;
                while (++i < num) {
                    var image = this.listeSymptome[i];
                    if (image.parent) {
                        image.parent.removeChild(image);
                    }
                }
            }
            this.listeSymptome = null;
            var nb = MSG.l8();
            if (nb) {
                this.listeSymptome = [];
                var i = -1;
                while (++i < nb) {
                    var codeSymptome = MSG.l16();
                    var nouvelleImage = new Image_1.Image("x_deadmeat/x_interfaces/x_symptomes/i" + codeSymptome + ".png", 16, 16);
                    this.listeSymptome.push(nouvelleImage);
                    this.addChild(nouvelleImage);
                }
            }
            this.replacerElement();
        };
        ClipNomADV.prototype.majIconeSante = function (PRINCIPAL, CODE) {
            var icone = PRINCIPAL ? this.iconeGauche : this.iconeDroite;
            if (CODE == 0) {
                if (icone && icone.parent) {
                    icone.parent.removeChild(icone);
                    this.replacerElement();
                }
                return;
            }
            if (!this.iconeGauche) {
                this.iconeGauche = new PIXI.Sprite();
                this.iconeGauche.anchor.set(0.5, 1);
                this.addChildAt(this.iconeGauche, 0);
                this.iconeDroite = new PIXI.Sprite();
                this.iconeDroite.anchor.set(0.5, 1);
                this.addChildAt(this.iconeDroite, 0);
                icone = PRINCIPAL ? this.iconeGauche : this.iconeDroite;
                this.replacerElement();
            }
            if (!icone.parent) {
                this.addChildAt(icone, 0);
            }
            icone.texture = TFMAdventure_1.default.recupTextureDistante("interface/icones-vie/" + CODE + ".png");
            icone.scale.set(1.4);
        };
        ClipNomADV.prototype.majArme = function (DROITE, GAUCHE) {
            if (!this.conteneurArme) {
                this.conteneurArme = new PIXI.Container();
            }
            this.conteneurArme.removeChildren();
            if (DROITE) {
                this.conteneurArme.addChild(DROITE.recupClipIcone());
            }
            if (GAUCHE) {
                var clipGauche = GAUCHE.recupClipIcone();
                this.conteneurArme.addChild(clipGauche);
                if (DROITE) {
                    clipGauche.x = 40;
                }
            }
            if (DROITE || GAUCHE) {
                this.addChild(this.conteneurArme);
            }
            else {
                this.removeChild(this.conteneurArme);
            }
            this.replacerElement();
        };
        ClipNomADV.prototype.majSante = function (SANTE, SANTE_AVANT, SANTE_MAX, BARRE_VIE, ANIMATION) {
            var replacementRequis = false;
            if (!this.conteneurSante) {
                this.boucleRequise = true;
                this.derniereBoucle = Date.now();
                this.pourcentageSanteEnCours = SANTE / SANTE_MAX;
                this.conteneurSante = new PIXI.Container();
                var fond = PIXI.Sprite.fromImage(TFMAdventure_1.default.recupImageDistance("interface/fv.png"));
                fond.alpha = 0.8;
                var cadre = PIXI.Sprite.fromImage(TFMAdventure_1.default.recupImageDistance("interface/c.png"));
                cadre.position.set(-2, -2);
                this.barreSante = new PIXI.extras.TilingSprite(TFMAdventure_1.default.recupTextureDistante("interface/v6.png"), this.largeurBarre * this.pourcentageSanteEnCours, this.hauteurBarre);
                if (this.mobile.estJoueurPrincipal) {
                    this.couleurSante = 0x62CA57;
                }
                else if (this.mobile.estUnEnnemi) {
                    this.couleurSante = 0xFFEA00;
                }
                else {
                    this.couleurSante = 0x669bca;
                }
                this.barreSante.tint = this.couleurSante;
                this.haloSante = PIXI.Sprite.fromImage(TFMAdventure_1.default.recupImageDistance("interface/tv.png"));
                this.haloSante.anchor.set(1, 0);
                this.haloSante.visible = false;
                this.haloSante.position.set(this.largeurBarre, -2);
                this.barreSanteAnime = new PIXI.extras.TilingSprite(TFMAdventure_1.default.recupTextureDistante("interface/v6.png"), this.largeurBarre * this.pourcentageSanteEnCours, this.hauteurBarre);
                this.conteneurSante.addChild(fond, this.barreSanteAnime, this.barreSante, cadre, this.haloSante);
                this.origineSante = -this.largeurBarre / 2;
                this.conteneurSante.x = this.origineSante;
                this.addChild(this.conteneurSante);
                this.iconeMort = new PIXI.Sprite(TFMAdventure_1.default.recupTextureDistante("interface/allie-mort.png"));
                this.iconeMort.anchor.set(0.5, 1);
                this.iconeMort.position.set((this.largeurBarre / 2 | 0) + 3, 10);
                replacementRequis = true;
            }
            if (BARRE_VIE > 1 && !this.conteneurBouclier) {
                this.conteneurBouclier = new PIXI.Container();
                this.conteneurBouclier.y = this.hauteurBarre;
                this.listeBouclier = [];
                this.conteneurSante.addChildAt(this.conteneurBouclier, 1);
                for (var i = 0; i < BARRE_VIE - 1; i++) {
                    var bouclier = new PIXI.Sprite(TFMAdventure_1.default.recupTextureDistante("interface/vv.png"));
                    bouclier.x = 5 + i * 18;
                    this.listeBouclier.push(bouclier);
                    this.conteneurBouclier.addChild(bouclier);
                }
                replacementRequis = true;
            }
            var nouvelleBarreDeVie = this.barreDeVieEnCours != BARRE_VIE;
            this.santeEnCours = SANTE;
            this.santeMax = SANTE_MAX;
            this.dessinSanteRequis = true;
            if (nouvelleBarreDeVie && this.conteneurBouclier) {
                if (this.barreDeVieEnCours < BARRE_VIE) {
                    for (var i = this.barreDeVieEnCours; i < BARRE_VIE; i++) {
                        this.conteneurBouclier.addChild(this.listeBouclier[i - 1]);
                    }
                }
                else {
                    for (var i = BARRE_VIE; i < this.barreDeVieEnCours; i++) {
                        var bouclier = this.listeBouclier[i - 1];
                        if (bouclier.parent) {
                            this.conteneurBouclier.removeChild(bouclier);
                        }
                    }
                }
            }
            this.barreDeVieEnCours = BARRE_VIE;
            if (this.derniereSanteMax != SANTE_MAX) {
                this.derniereSanteMax = SANTE_MAX;
                this.barreSante.tileScale.x = this.largeurBarre / SANTE_MAX;
                this.barreSanteAnime.tileScale.x = this.largeurBarre / SANTE_MAX;
            }
            this.pourcentageSanteRequis = SANTE / SANTE_MAX;
            if (nouvelleBarreDeVie) {
                this.pourcentageSanteEnCours = 1;
                this.pourcentageSanteAnim = 1;
                this.barreSanteAnime.width = this.largeurBarre;
                if (this.mobile.estUnEnnemi) {
                    if (BARRE_VIE == 1) {
                        this.couleurSante = 0xFFEA00;
                    }
                    else if (BARRE_VIE == 2) {
                        this.couleurSante = 0xFFD500;
                    }
                    else if (BARRE_VIE == 3) {
                        this.couleurSante = 0xFFBF00;
                    }
                    else if (BARRE_VIE == 4) {
                        this.couleurSante = 0xFFAA00;
                    }
                    else {
                        this.couleurSante = 0xFF9500;
                    }
                    this.barreSante.tint = this.couleurSante;
                }
            }
            this.differenceChangementSante = this.pourcentageSanteRequis - this.pourcentageSanteEnCours;
            if (this.pourcentageSanteRequis > this.pourcentageSanteEnCours) {
                this.pauseBarreSante = Date.now() + 150;
                this.barreSanteAnime.tint = 0x00FFFF;
            }
            else if (this.pourcentageSanteRequis < this.pourcentageSanteEnCours) {
                this.pauseBarreSanteAnim = Date.now() + 300;
                this.barreSanteAnime.tint = 0xFF1111;
                this.haloSante.alpha = 0;
            }
            var pourcentagePerdu = (SANTE_AVANT / SANTE_MAX) - this.pourcentageSanteEnCours;
            if (ANIMATION) {
            }
            else {
            }
            if (!this.mobile.estUnEnnemi && !this.mobile.estJoueurPrincipal) {
                this.conteneurSante.visible = SANTE != SANTE_AVANT || SANTE != SANTE_MAX;
            }
            this.boucle(Date.now(), 1);
            if (replacementRequis) {
                this.replacerElement();
            }
        };
        ClipNomADV.prototype.modeATerre = function (OUI) {
            if (this.mobile.estUnJoueur) {
                if (OUI) {
                    this.conteneurSante.addChild(this.iconeMort);
                }
                else {
                    if (this.iconeMort && this.iconeMort.parent) {
                        this.iconeMort.parent.removeChild(this.iconeMort);
                    }
                }
            }
        };
        ClipNomADV.prototype.boucle = function (TEMPS, DELTA) {
            var tempsEcoule = TEMPS - this.derniereBoucle;
            var dureeImage = tempsEcoule / 16;
            this.derniereBoucle = TEMPS;
            if (this.iconeGauche) {
                this.iconeGauche.scale.x += (1 - this.iconeGauche.scale.x) * 0.2 * DELTA;
                this.iconeGauche.scale.y += (1 - this.iconeGauche.scale.y) * 0.2 * DELTA;
            }
            if (this.iconeDroite) {
                this.iconeDroite.scale.x += (1 - this.iconeDroite.scale.x) * 0.2 * DELTA;
                this.iconeDroite.scale.y += (1 - this.iconeDroite.scale.y) * 0.2 * DELTA;
            }
            var animation = false;
            if (TEMPS > this.pauseBarreSante && this.pourcentageSanteRequis != this.pourcentageSanteEnCours) {
                var diff = this.pourcentageSanteRequis - this.pourcentageSanteEnCours;
                if (Math.abs(diff) < 0.01) {
                    this.pourcentageSanteEnCours = this.pourcentageSanteRequis;
                    if (this.pourcentageSanteEnCours == 1) {
                        if (!this.mobile.estUnEnnemi && !this.mobile.estJoueurPrincipal) {
                            this.conteneurSante.visible = false;
                        }
                    }
                }
                else {
                    this.pourcentageSanteEnCours += diff * Math.min(0.2 * dureeImage, 1);
                }
                if (diff > 0) {
                    this.haloSante.alpha = 1;
                    this.haloSante.visible = true;
                }
                this.barreSante.width = this.largeurBarre * this.pourcentageSanteEnCours;
                this.haloSante.x = this.barreSante.width;
                animation = true;
            }
            if (TEMPS > this.pauseBarreSanteAnim && this.pourcentageSanteRequis != this.pourcentageSanteAnim) {
                var diff = this.pourcentageSanteRequis - this.pourcentageSanteAnim;
                if (Math.abs(diff) < 0.01) {
                    this.pourcentageSanteAnim = this.pourcentageSanteRequis;
                    if (diff > 0) {
                        this.flashCouleur = 1.5;
                    }
                }
                else {
                    this.pourcentageSanteAnim += diff * Math.min(0.2 * dureeImage, 1);
                }
                this.barreSanteAnime.width = this.largeurBarre * this.pourcentageSanteAnim;
                animation = true;
            }
            if (this.flashCouleur != 1) {
                if (this.flashCouleur < 1.01) {
                    this.flashCouleur = 1;
                    this.barreSante.tint = this.couleurSante;
                }
                else {
                    this.barreSante.tint = Couleur_1.Couleur.contrasteCouleur(this.couleurSante, this.flashCouleur);
                }
                this.flashCouleur += (1 - this.flashCouleur) * Math.min(0.05 * dureeImage, 1);
                this.haloSante.x = this.barreSante.width;
                this.haloSante.alpha = (this.flashCouleur - 1) * 2;
                animation = true;
            }
            if (this.mobile.estJoueurPrincipal) {
                if (animation) {
                    this.nbImageSansAnim = 0;
                }
                else {
                    this.nbImageSansAnim++;
                }
                this.conteneurSante.cacheAsBitmap = this.nbImageSansAnim > 10;
            }
            if (!this.dessinSanteRequis) {
                this.dessinRequis = false;
            }
        };
        ClipNomADV.prototype.majDessinRequis = function () {
            this.dessinRequis = true;
            this.derniereBoucle = Date.now();
        };
        ClipNomADV.HAUTEUR_ATTAQUE = 40;
        ClipNomADV.styleNom = new PIXI.TextStyle({
            fontFamily: "police-nom,Verdana",
            align: "center",
            fill: "#97D64E",
            fontSize: 24,
            stroke: '#000000',
            strokeThickness: 5
        });
        ClipNomADV.styleNomPNJ = new PIXI.TextStyle({
            fontFamily: "police-nom,Verdana",
            align: "center",
            fill: "#6c99d6",
            fontSize: 24,
            stroke: '#000000',
            strokeThickness: 5
        });
        ClipNomADV.styleNomJoueurPrincipal = new PIXI.TextStyle({
            fontFamily: "police-nom,Verdana",
            align: "center",
            fill: "#FFD991",
            fontSize: 28,
            stroke: '#000000',
            strokeThickness: 5
        });
        return ClipNomADV;
    }(PIXI.Container));
    exports.ClipNomADV = ClipNomADV;
});
//# sourceMappingURL=ClipNomADV.js.map