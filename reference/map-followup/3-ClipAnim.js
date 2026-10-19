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
define(["require", "exports", "../../reseau/ChaineOctet", "../../../interface/souruis/elements/I_Image", "../../../interface/souruis/elements/I_ImagePixi", "../../Mathematiques"], function (require, exports, ChaineOctet_1, I_Image_1, I_ImagePixi_1, Mathematiques_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ClipAnim = (function (_super) {
        __extends(ClipAnim, _super);
        function ClipAnim(DATA) {
            var _this = _super.call(this) || this;
            _this.sourceRacine = "";
            _this.sourceLocale = "";
            _this.typeClipCode = 73;
            _this.generateurCodeHierarchique = 0;
            _this.codeHierarchique = 0;
            _this.clipPrincipal = _this;
            _this.clipRacine = _this;
            _this.jouerEnBoucle = true;
            _this.imageParSeconde = 60;
            _this.dureeImage = 1000 / 60;
            _this.peutBoucler = false;
            _this.boucleEnCours = 0;
            _this.vitesseLecture = 1;
            _this.imageEnCours = -1;
            _this.imageDecimale = 0;
            _this.imageParente = 0;
            _this.derniereBoucle = 0;
            _this.imageDepart = 0;
            _this.nombreImage = 0;
            _this.lectureEnCours = false;
            _this.numeroAnimation = 0;
            if (DATA) {
                if (DATA instanceof ChaineOctet_1.default) {
                    _this.deserialisation(DATA);
                }
                else {
                    _this.deserialisationChaine(DATA);
                }
            }
            return _this;
        }
        ClipAnim.prototype.initialisation = function (INFO) {
            if (INFO instanceof InfoClipAnim) {
                this.infoClip = INFO;
                this.codeAffichage = INFO.nom;
                if (INFO.listeEnfant) {
                    this.listeInfoEnfant = [];
                    this.listeEnfantVisible = [];
                    for (var _i = 0, _a = INFO.listeEnfant; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.nom) {
                            this.listeInfoEnfant.push(info.cloner());
                        }
                    }
                }
                this.defNombreImage(INFO.nbImage);
                this.jouerEnBoucle = INFO.jouerEnBoucle;
            }
            else {
            }
        };
        ClipAnim.ajouterCache = function (CODE, DATA) {
            ClipAnim.indexCacheClipAnim[CODE] = DATA;
        };
        ClipAnim.prototype.boucle = function (TEMPS) {
            if (!this.peutBoucler) {
                return;
            }
            var tempsEcoule = (TEMPS - this.derniereBoucle) * this.vitesseLecture;
            if (tempsEcoule < 0) {
                tempsEcoule = 0;
            }
            if (this.pauseJusqua) {
                if (TEMPS > this.pauseJusqua) {
                    this.pauseJusqua = 0;
                    this.visible = true;
                }
                else {
                    tempsEcoule = 0;
                }
            }
            if (this.ralentissementEnCours) {
                var progression = (TEMPS - this.ralentissementTempsZero) / this.ralentissementDuree;
                if (this.ralentissementMouvement) {
                    progression = this.ralentissementMouvement(progression, this.ralentissementDepart, this.ralentissementDistance, 1);
                }
                tempsEcoule *= this.ralentissementDepart + this.ralentissementDistance * progression;
                if (progression >= 1) {
                    this.ralentissementEnCours = false;
                }
            }
            this.imageParente += tempsEcoule / this.dureeImage;
            this.derniereBoucle = TEMPS;
            if (this.modeCreature) {
                if (this.animEnCours) {
                    this.animEnCours.boucle(TEMPS);
                }
            }
            else {
                this.boucleInterne(this.imageParente);
            }
            if (this.listeObjetEquipe) {
                this.majListeObjetEquipe(TEMPS);
            }
        };
        ClipAnim.prototype.majListeObjetEquipe = function (TEMPS) {
            for (var _i = 0, _a = this.listeObjetEquipe; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.objet instanceof ClipAnim) {
                    info.objet.boucle(TEMPS);
                }
                var clipBase = this.modeCreature ? this.animEnCours : this;
                if (clipBase) {
                    var codeCache = (clipBase.codeHierarchique * 10000) + clipBase.imageEnCours;
                    var parentCible = info.cacheParent[codeCache];
                    if (parentCible != undefined) {
                        if (parentCible && parentCible != info.objet.parent) {
                            parentCible.addChild(info.objet);
                        }
                    }
                    else {
                        var parentTrouve = false;
                        if (clipBase.listeEmplacement) {
                            var liste = clipBase.indexEmplacement[info.emplacement];
                            if (liste) {
                                for (var _b = 0, liste_1 = liste; _b < liste_1.length; _b++) {
                                    var parentPossible = liste_1[_b];
                                    var parentAffiche = false;
                                    var base = parentPossible.parent;
                                    while (base) {
                                        if (base == this) {
                                            parentAffiche = true;
                                            break;
                                        }
                                        base = base.parent;
                                    }
                                    if (parentAffiche) {
                                        parentPossible.addChild(info.objet);
                                        info.cacheParent[codeCache] = parentPossible;
                                        parentTrouve = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (!parentTrouve) {
                            info.cacheParent[clipBase.imageEnCours] = false;
                        }
                    }
                }
            }
        };
        ClipAnim.prototype.boucleInterne = function (IMAGE_PARENT) {
            if (!this.peutBoucler || !this.lectureEnCours) {
                return;
            }
            this.imageDecimale = IMAGE_PARENT - this.imageDepart;
            var numBoucle = (this.imageDecimale / this.nombreImage) | 0;
            if (this.imageFinAuto && this.imageDecimale >= this.imageFinAuto) {
                this.imageDecimale = this.imageFinAuto;
                if (this.finAnim) {
                    this.finAnim();
                }
            }
            if (this.imageDecimale >= this.nombreImage) {
                if (this.jouerEnBoucle) {
                    this.imageDecimale %= this.nombreImage;
                }
                else {
                    this.lectureEnCours = false;
                    this.imageDecimale = this.nombreImage - 1;
                }
                if (this.finAnim && this.boucleEnCours != numBoucle) {
                    this.finAnim();
                }
            }
            this.boucleEnCours = numBoucle;
            var derniereImage = this.imageEnCours;
            this.imageEnCours = this.imageDecimale | 0;
            var nombreImageAJouer = this.imageEnCours - derniereImage;
            if (nombreImageAJouer) {
                if (this.rasterisationActive) {
                    var info = this.rasterisationListeImage[this.imageEnCours];
                    this.texture = info.textureRST;
                    this.pivot.set(info.accx, info.accy);
                }
                else {
                    this.affichageImage(this.imageEnCours);
                }
                if (nombreImageAJouer > 0) {
                    if (this.infoClip && this.infoClip.indexEtiquette) {
                        if (this.clipRacine.declencheurEtiquette) {
                            for (var i = 1; i <= nombreImageAJouer; i++) {
                                if (this.infoClip.indexEtiquette[(derniereImage + i) % this.nombreImage]) {
                                    this.clipRacine.declencheurEtiquette(this.infoClip.indexEtiquette[derniereImage + i]);
                                }
                            }
                        }
                    }
                    if (this.listeEvenement) {
                        for (var i = 1; i <= nombreImageAJouer; i++) {
                            var liste = this.listeEvenement[(derniereImage + i) % this.nombreImage];
                            if (liste) {
                                for (var _i = 0, liste_2 = liste; _i < liste_2.length; _i++) {
                                    var evenement = liste_2[_i];
                                    evenement.executer();
                                }
                            }
                        }
                    }
                }
            }
            if (!this.rasterisationActive) {
                for (var _a = 0, _b = this.listeEnfantVisible; _a < _b.length; _a++) {
                    var enfant = _b[_a];
                    if (enfant.clip.peutBoucler) {
                        enfant.clip.boucleInterne(this.imageDecimale);
                    }
                    if (enfant.sequenceEnCours && enfant.sequenceEnCours.interpolationActive) {
                        enfant.sequenceEnCours.majPosition(enfant.clip, this.imageDecimale);
                    }
                }
            }
        };
        ClipAnim.prototype.pausePendant = function (DUREE, INVISIBLE) {
            if (INVISIBLE === void 0) { INVISIBLE = false; }
            var cible = this.modeCreature ? this.animEnCours : this;
            if (cible) {
                cible.pauseJusqua = Date.now() + DUREE;
                if (INVISIBLE) {
                    cible.visible = false;
                }
            }
        };
        ClipAnim.prototype.ralentissement = function (DEPART, FIN, DUREE, MOUVEMENT) {
            var cible = this.modeCreature ? this.animEnCours : this;
            if (cible) {
                cible.ralentissementEnCours = true;
                cible.ralentissementTempsZero = Date.now();
                cible.ralentissementDepart = DEPART;
                cible.ralentissementDistance = FIN - DEPART;
                cible.ralentissementDuree = DUREE;
                cible.ralentissementMouvement = MOUVEMENT;
            }
        };
        ClipAnim.prototype.recupLienImageSimple = function () {
            return this.sourceLocale + this.codeAffichage.substr(1);
        };
        ClipAnim.prototype.declencheurFinAnim = function (FONCTION) {
            this.finAnim = FONCTION;
        };
        ClipAnim.prototype.affichageImage = function (IMAGE) {
            if (this.listeInfoEnfant) {
                var nb = this.listeInfoEnfant.length;
                var i = -1;
                while (++i < nb) {
                    var enfant = this.listeInfoEnfant[i];
                    var sequence = enfant.indexSequence[IMAGE];
                    var nouvelleSequence = enfant.sequenceEnCours != sequence;
                    enfant.sequenceEnCours = sequence;
                    if (nouvelleSequence) {
                        var affichageRequis = sequence != null && IMAGE >= sequence.imageDepart && IMAGE < sequence.imageFin;
                        if (affichageRequis != enfant.estAffiche) {
                            enfant.estAffiche = affichageRequis;
                            if (affichageRequis) {
                                if (!enfant.clip) {
                                    enfant.clip = this.creationEnfant(enfant);
                                }
                                if (enfant.index == 0) {
                                    this.addChildAt(enfant.clip, 0);
                                }
                                else {
                                    this.addChildAt(enfant.clip, this.placementEnfant(this, enfant.index));
                                }
                                this.listeEnfantVisible.push(enfant);
                            }
                            else {
                                this.removeChild(enfant.clip);
                                this.listeEnfantVisible.splice(this.listeEnfantVisible.indexOf(enfant), 1);
                            }
                        }
                        if (affichageRequis) {
                            sequence.majPosition(enfant.clip, this.imageDecimale, true);
                        }
                    }
                }
            }
        };
        ClipAnim.prototype.placementEnfant = function (PARENT, INDEX) {
            var liste = PARENT.children;
            var bas = 0;
            var haut = liste.length;
            while (bas < haut) {
                var mid = (bas + haut) >> 1;
                var cible = liste[mid];
                if (cible.index > INDEX) {
                    haut = mid;
                }
                else {
                    bas = mid + 1;
                }
            }
            return bas;
        };
        ClipAnim.prototype.lecture = function (IMAGE, IMAGE_FIN) {
            if (IMAGE === void 0) { IMAGE = 0; }
            if (IMAGE_FIN === void 0) { IMAGE_FIN = 0; }
            if (this.modeCreature) {
                if (this.animEnCours) {
                    this.animEnCours.lecture(IMAGE, IMAGE_FIN);
                }
            }
            else {
                if (!this.nombreImage) {
                    return;
                }
                this.lectureEnCours = true;
                this.imageFinAuto = IMAGE_FIN;
                this.imageParente = IMAGE;
                this.derniereBoucle = Date.now();
                this.boucle(this.derniereBoucle);
            }
        };
        ClipAnim.prototype.stop = function (IMAGE) {
            if (this.modeCreature) {
                if (this.animEnCours) {
                    this.animEnCours.stop(IMAGE);
                }
            }
            else {
                if (IMAGE !== undefined) {
                    this.lecture(IMAGE);
                }
                this.lectureEnCours = false;
            }
        };
        ClipAnim.prototype.construction = function () {
            if (!this.codeAffichage) {
                return;
            }
            var code = this.codeAffichage.charAt(0);
            if (code == "#") {
                if (!this.clipPrincipal.listeEmplacement) {
                    this.clipPrincipal.listeEmplacement = [];
                    this.clipPrincipal.indexEmplacement = {};
                }
                this.clipPrincipal.listeEmplacement.push(this);
                var nom = this.codeAffichage.substring(1);
                var liste = this.clipPrincipal.indexEmplacement[nom];
                if (!liste) {
                    liste = [];
                    this.clipPrincipal.indexEmplacement[nom] = liste;
                }
                liste.push(this);
                if (this.clipPrincipal.look) {
                    var listeMorceau = this.clipPrincipal.look.indexMorceauParEmplacement[nom];
                    if (listeMorceau) {
                        this.affichageListeMorceauDansEmplacement(this, listeMorceau);
                    }
                }
                if (this.clipRacine.indexEquipementParEmplacement) {
                    var listeMorceau = this.clipRacine.indexEquipementParEmplacement[nom];
                    if (listeMorceau) {
                        for (var _i = 0, listeMorceau_1 = listeMorceau; _i < listeMorceau_1.length; _i++) {
                            var morceau = listeMorceau_1[_i];
                            this.texture = PIXI.Texture.fromImage(ClipAnim.BIBLIOTHEQUE_MORCEAUX + morceau.code + "/" + morceau.nom + ".png");
                            this.pivot.set(morceau.x, morceau.y);
                        }
                    }
                }
            }
            else if (code == "@") {
                var ressource = this.codeAffichage.substring(1);
                var sansSource = ressource.charAt(0) == "+";
                if (sansSource) {
                    ressource = ressource.substring(1);
                }
                this.chargerImage(ressource, !sansSource);
                if (this.ancrageX !== undefined) {
                    if (this.ancrageX > 1 || this.ancrageY > 1) {
                        this.pivot.set(this.ancrageX, this.ancrageY);
                    }
                    else {
                        this.anchor.set(this.ancrageX, this.ancrageY);
                    }
                }
                else {
                }
            }
            this.affichageImage(0);
        };
        ClipAnim.prototype.defNombreImage = function (NB) {
            this.nombreImage = NB;
            if (NB > 1) {
                this.lectureEnCours = true;
                this.peutBoucler = true;
                this.imageParente = 0;
                this.derniereBoucle = Date.now();
            }
        };
        ClipAnim.prototype.defVitesseLecture = function (VITESSE) {
            this.vitesseLecture = VITESSE;
        };
        ClipAnim.prototype.defDureeAnimationEnCours = function (DUREE) {
            if (DUREE == 0) {
                this.vitesseLecture = 1;
            }
            else {
                this.vitesseLecture = (this.nombreImage * this.dureeImage) / DUREE;
            }
        };
        ClipAnim.prototype.chargerImage = function (IMAGE, UTILISER_SOURCE) {
            if (UTILISER_SOURCE === void 0) { UTILISER_SOURCE = true; }
            if (UTILISER_SOURCE) {
                if (this.sourceLocale) {
                    this.texture = PIXI.Texture.fromImage(ClipAnim.BIBLIOTHEQUE + this.sourceLocale + IMAGE + ClipAnim.VERSION_IMAGE);
                }
                else {
                    this.texture = PIXI.Texture.fromImage(ClipAnim.BIBLIOTHEQUE + this.sourceRacine + IMAGE + ClipAnim.VERSION_IMAGE);
                }
            }
            else {
                this.texture = PIXI.Texture.fromImage(ClipAnim.BIBLIOTHEQUE_DIVERS + IMAGE + ClipAnim.VERSION_IMAGE);
            }
            if (this.clipRacine.rasterisationAsyncEnCours && !this.texture.baseTexture.hasLoaded) {
                var baseTexture_1 = this.texture.baseTexture;
                var liste_3 = this.clipRacine.listeImageChargementAsync;
                liste_3.push(baseTexture_1);
                this.texture.baseTexture.on("loaded", function () {
                    var index = liste_3.indexOf(baseTexture_1);
                    if (index != -1) {
                        liste_3.splice(index, 1);
                    }
                });
            }
        };
        ClipAnim.prototype.defLook = function (LOOK) {
            this.look = LOOK;
            if (this.listeEmplacement) {
                for (var _i = 0, _a = this.listeEmplacement; _i < _a.length; _i++) {
                    var emplacement = _a[_i];
                    if (emplacement.emplacementLookEnCours) {
                        emplacement.emplacementLookEnCours = false;
                        emplacement.texture = PIXI.Texture.EMPTY;
                        emplacement.removeChildren();
                    }
                }
                for (var nom in LOOK.indexMorceauParEmplacement) {
                    var listeEmplacement = this.indexEmplacement[nom];
                    if (listeEmplacement) {
                        var listeMorceau = LOOK.indexMorceauParEmplacement[nom];
                        for (var _b = 0, listeEmplacement_1 = listeEmplacement; _b < listeEmplacement_1.length; _b++) {
                            var emplacement = listeEmplacement_1[_b];
                            this.affichageListeMorceauDansEmplacement(emplacement, listeMorceau);
                        }
                    }
                }
            }
            if (this.listeAnim) {
                for (var _c = 0, _d = this.listeAnim; _c < _d.length; _c++) {
                    var anim = _d[_c];
                    anim.defLook(LOOK);
                }
            }
        };
        ClipAnim.prototype.affichageListeMorceauDansEmplacement = function (EMPLACEMENT, LISTE) {
            var nb = LISTE.length;
            var premierMorceau = LISTE[0];
            EMPLACEMENT.emplacementLookEnCours = true;
            EMPLACEMENT.texture = PIXI.Texture.fromImage(ClipAnim.BIBLIOTHEQUE_MORCEAUX + premierMorceau.code + "/" + premierMorceau.nom + ".png");
            EMPLACEMENT.pivot.set(premierMorceau.x, premierMorceau.y);
            if (nb > 1) {
                var i = 0;
                while (++i < nb) {
                    var morceau = LISTE[i];
                    var clipMorceau = PIXI.Sprite.fromImage(ClipAnim.BIBLIOTHEQUE_MORCEAUX + morceau.code + "/" + morceau.nom + ".png");
                    clipMorceau.pivot.set(morceau.x - premierMorceau.x, morceau.y - premierMorceau.y);
                    EMPLACEMENT.addChild(clipMorceau);
                }
            }
        };
        ClipAnim.prototype.ajouterElementLook = function (ELEMENT) {
            if (!this.clipRacine.listeElementLookEnPlus) {
                this.clipRacine.listeElementLookEnPlus = [];
                this.clipRacine.indexEquipementParEmplacement = {};
            }
            this.clipRacine.listeElementLookEnPlus.push(ELEMENT);
            for (var _i = 0, _a = ELEMENT.listeMorceaux; _i < _a.length; _i++) {
                var morceau = _a[_i];
                var liste = this.clipRacine.indexEquipementParEmplacement[morceau.nom];
                if (!liste) {
                    liste = [];
                    this.clipRacine.indexEquipementParEmplacement[morceau.nom] = liste;
                }
                liste.push(morceau);
            }
            this.afficherEquipement(ELEMENT);
        };
        ClipAnim.prototype.retirerElementLook = function (ELEMENT) {
            if (!this.clipRacine.listeElementLookEnPlus) {
                return;
            }
            var indexElement = this.clipRacine.listeElementLookEnPlus.lastIndexOf(ELEMENT);
            if (indexElement != -1) {
                this.clipRacine.listeElementLookEnPlus.splice(indexElement, 1);
            }
            for (var _i = 0, _a = ELEMENT.listeMorceaux; _i < _a.length; _i++) {
                var morceau = _a[_i];
                var liste = this.clipRacine.indexEquipementParEmplacement[morceau.nom];
                if (liste) {
                    delete this.clipRacine.indexEquipementParEmplacement[morceau.nom];
                    var indexMorceau = liste.lastIndexOf(morceau);
                    if (indexMorceau != -1) {
                        liste.splice(indexMorceau, 1);
                    }
                }
            }
            this.desafficherEquipement(ELEMENT);
        };
        ClipAnim.prototype.afficherEquipement = function (ELEMENT) {
            if (this.listeEmplacement) {
                for (var _i = 0, _a = ELEMENT.listeMorceaux; _i < _a.length; _i++) {
                    var morceau = _a[_i];
                    var listeEmplacement = this.indexEmplacement[morceau.nom];
                    if (listeEmplacement) {
                        for (var _b = 0, listeEmplacement_2 = listeEmplacement; _b < listeEmplacement_2.length; _b++) {
                            var emplacement = listeEmplacement_2[_b];
                            emplacement.texture = PIXI.Texture.fromImage(ClipAnim.BIBLIOTHEQUE_MORCEAUX + morceau.code + "/" + morceau.nom + ".png");
                            emplacement.pivot.set(morceau.x, morceau.y);
                        }
                    }
                }
            }
            if (this.listeAnim) {
                for (var _c = 0, _d = this.listeAnim; _c < _d.length; _c++) {
                    var anim = _d[_c];
                    anim.afficherEquipement(ELEMENT);
                }
            }
        };
        ClipAnim.prototype.desafficherEquipement = function (ELEMENT) {
            if (this.listeEmplacement) {
                for (var _i = 0, _a = ELEMENT.listeMorceaux; _i < _a.length; _i++) {
                    var morceau = _a[_i];
                    var listeEmplacement = this.indexEmplacement[morceau.nom];
                    if (listeEmplacement) {
                        for (var _b = 0, listeEmplacement_3 = listeEmplacement; _b < listeEmplacement_3.length; _b++) {
                            var emplacement = listeEmplacement_3[_b];
                            emplacement.texture = PIXI.Texture.EMPTY;
                            emplacement.removeChildren();
                        }
                    }
                }
            }
            if (this.listeAnim) {
                for (var _c = 0, _d = this.listeAnim; _c < _d.length; _c++) {
                    var anim = _d[_c];
                    anim.desafficherEquipement(ELEMENT);
                }
            }
        };
        ClipAnim.prototype.supprimerObjet = function (OBJET) {
            if (this.listeObjetEquipe) {
                for (var i = 0, nb = this.listeObjetEquipe.length; i < nb; i++) {
                    var info = this.listeObjetEquipe[i];
                    if (info.objet == OBJET) {
                        if (OBJET.parent) {
                            OBJET.parent.removeChild(OBJET);
                            this.listeObjetEquipe.splice(i, 1);
                            i--;
                            nb--;
                        }
                    }
                }
                if (this.listeObjetEquipe.length == 0) {
                    this.listeObjetEquipe = null;
                }
            }
        };
        ClipAnim.prototype.viderEmplacementObjet = function (EMPLACEMENT) {
            if (this.listeObjetEquipe) {
                for (var i = 0, nb = this.listeObjetEquipe.length; i < nb; i++) {
                    var info = this.listeObjetEquipe[i];
                    if (info.emplacement == EMPLACEMENT) {
                        if (info.objet && info.objet.parent) {
                            info.objet.parent.removeChild(info.objet);
                            this.listeObjetEquipe.splice(i, 1);
                            i--;
                            nb--;
                        }
                    }
                }
                if (this.listeObjetEquipe.length == 0) {
                    this.listeObjetEquipe = null;
                }
            }
        };
        ClipAnim.prototype.equiperObjet = function (EMPLACEMENT, OBJET) {
            if (!this.listeObjetEquipe) {
                this.listeObjetEquipe = [];
            }
            this.listeObjetEquipe.push({ emplacement: EMPLACEMENT, objet: OBJET, cacheParent: {} });
        };
        ClipAnim.prototype.teinter = function (TEINTE) {
            this.tint = TEINTE;
            this.teinteGlobale = TEINTE;
            if (!this.rasterisationActive && this.listeInfoEnfant) {
                for (var _i = 0, _a = this.listeInfoEnfant; _i < _a.length; _i++) {
                    var enfant = _a[_i];
                    if (enfant.clip) {
                        enfant.clip.tint = TEINTE;
                    }
                }
            }
        };
        ClipAnim.prototype.rasterisation = function (APP, ASYNC) {
            var _this = this;
            if (ASYNC === void 0) { ASYNC = false; }
            if (this.rasterisationActive || this.rasterisationAsyncEnCours
                || this.typeClipCode == 73) {
                return;
            }
            this.rasterisationListeImage = [];
            if (ASYNC) {
                this.rasterisationAsyncEnCours = true;
                var indexAsync_1 = 0;
                var derniereImageAsync_1 = -1;
                var nbImage_1 = this.nombreImage;
                this.listeImageChargementAsync = [];
                var boucleResterisationAsync_1 = function () {
                    if (derniereImageAsync_1 != indexAsync_1) {
                        derniereImageAsync_1 = indexAsync_1;
                        _this.listeImageChargementAsync = [];
                        _this.stop(indexAsync_1);
                    }
                    if (_this.listeImageChargementAsync.length == 0) {
                        APP.stage.addChild(_this);
                        _this.updateTransform();
                        var zoneImage = _this.getLocalBounds();
                        _this.position.set(2 - zoneImage.x, 2 - zoneImage.y);
                        var texture = PIXI.RenderTexture.create(Math.ceil(zoneImage.width) + 4, Math.ceil(zoneImage.height) + 4);
                        APP.renderer.render(_this, texture);
                        _this.rasterisationListeImage.push({
                            textureRST: texture,
                            accx: 2 - zoneImage.x,
                            accy: 2 - zoneImage.y
                        });
                        APP.stage.removeChild(_this);
                        indexAsync_1++;
                        if (indexAsync_1 >= nbImage_1) {
                            _this.removeChildren();
                            _this.rasterisationActive = true;
                            _this.rasterisationAsyncEnCours = false;
                            _this.lecture(0);
                            delete _this.listeImageChargementAsync;
                            return;
                        }
                    }
                    requestAnimationFrame(boucleResterisationAsync_1);
                };
                boucleResterisationAsync_1.bind(this)();
            }
            else {
                APP.stage.addChild(this);
                for (var i = 0; i < this.nombreImage; i++) {
                    this.stop(i);
                    this.updateTransform();
                    var zoneImage = this.getLocalBounds();
                    this.position.set(2 - zoneImage.x, 2 - zoneImage.y);
                    var texture = PIXI.RenderTexture.create(Math.ceil(zoneImage.width) + 4, Math.ceil(zoneImage.height) + 4);
                    APP.renderer.render(this, texture);
                    this.rasterisationListeImage.push({
                        textureRST: texture,
                        accx: 2 - zoneImage.x,
                        accy: 2 - zoneImage.y
                    });
                }
                APP.stage.removeChild(this);
                this.removeChildren();
                this.rasterisationActive = true;
                this.lecture(0);
            }
        };
        ClipAnim.prototype.prechargement = function (FIN) {
            if (this.listeInfoEnfant && this.listeInfoEnfant.length) {
                var chargeur = new PIXI.loaders.Loader();
                this.rechercheEnfantPreChargement(this, chargeur);
                if (FIN) {
                    chargeur.load(function () {
                        FIN();
                    });
                }
                return chargeur;
            }
            else {
                if (FIN) {
                    FIN();
                }
            }
            return null;
        };
        ClipAnim.prototype.rechercheEnfantPreChargement = function (CLIP, CHARGEUR) {
            if (CLIP.listeInfoEnfant) {
                for (var _i = 0, _a = CLIP.listeInfoEnfant; _i < _a.length; _i++) {
                    var enfant = _a[_i];
                    if (enfant.nom.charAt(0) == "@") {
                        var lien = enfant.nom.substring(1);
                        var sansSource = lien.charAt(0) == "+";
                        if (sansSource) {
                            lien = lien.substring(1);
                        }
                        if (sansSource) {
                            lien = ClipAnim.BIBLIOTHEQUE_DIVERS + lien + ClipAnim.VERSION_IMAGE;
                        }
                        else {
                            lien = ClipAnim.BIBLIOTHEQUE + this.sourceLocale + lien + ClipAnim.VERSION_IMAGE;
                        }
                        if (!CHARGEUR.resources[lien] && !ClipAnim.indexCachePreChargement[lien]) {
                            ClipAnim.indexCachePreChargement[lien] = true;
                            CHARGEUR.add(lien);
                        }
                    }
                    if (enfant.clip) {
                        this.rechercheEnfantPreChargement(enfant.clip, CHARGEUR);
                    }
                }
            }
        };
        ClipAnim.prototype.ajouterAnimation = function (NOM, ANIM) {
            if (!this.modeCreature) {
                this.peutBoucler = true;
                this.modeCreature = true;
                this.indexAnim = {};
                this.listeAnim = [];
            }
            ANIM.clipParent = this;
            ANIM.clipRacine = this;
            ANIM.sourceRacine = this.sourceRacine;
            ANIM.codeHierarchique = this.generateurCodeHierarchique++;
            ANIM.nomAnim = NOM;
            this.indexAnim[NOM] = ANIM;
            this.listeAnim.push(ANIM);
            if (this.look) {
                ANIM.defLook(this.look);
            }
            if (this.clipRacine.listeElementLookEnPlus) {
                for (var _i = 0, _a = this.clipRacine.listeElementLookEnPlus; _i < _a.length; _i++) {
                    var element = _a[_i];
                    ANIM.afficherEquipement(element);
                }
            }
            return this;
        };
        ClipAnim.prototype.jouerAnimation = function (NOM, PRIORITE, FORCER, IMAGE_DEPART, IMAGE_FIN) {
            if (PRIORITE === void 0) { PRIORITE = 0; }
            if (FORCER === void 0) { FORCER = false; }
            if (IMAGE_DEPART === void 0) { IMAGE_DEPART = 0; }
            if (IMAGE_FIN === void 0) { IMAGE_FIN = 0; }
            if (!this.modeCreature) {
                return this;
            }
            if (!FORCER) {
                if (NOM == this.nomAnimEnCours) {
                    return this;
                }
                if (PRIORITE < this.codePriorite) {
                    return this;
                }
            }
            var nomAnimCible = NOM;
            if (this.listePosture) {
                for (var _i = 0, _a = this.listePosture; _i < _a.length; _i++) {
                    var posture = _a[_i];
                    var nomAnimPosture = NOM + ":" + posture;
                    var source = this.sourceClonage || this;
                    if (source.indexAnim[nomAnimPosture]) {
                        nomAnimCible = nomAnimPosture;
                        break;
                    }
                }
            }
            if (this.indexRemplacementAnim) {
                var remplacement = this.indexRemplacementAnim[NOM];
                if (remplacement && this.indexAnim[remplacement]) {
                    nomAnimCible = remplacement;
                }
            }
            var animation = this.indexAnim[nomAnimCible];
            if (this.estUnClone && !animation && this.sourceClonage.indexAnim[nomAnimCible]) {
                animation = this.clonerAnimationDansCreature(nomAnimCible);
            }
            if (animation) {
                this.nomAnimEnCours = NOM;
                this.nomAnimPostureEnCours = nomAnimCible;
                this.codePriorite = PRIORITE;
                this.numeroAnimation = (this.numeroAnimation + 1) % 0xFFFFFF;
                if (this.animEnCours && this.animEnCours.parent) {
                    this.removeChild(this.animEnCours);
                }
                this.animEnCours = animation;
                this.addChild(animation);
                animation.lecture(IMAGE_DEPART, IMAGE_FIN);
                if (this.listeObjetEquipe) {
                    this.majListeObjetEquipe(Date.now());
                }
            }
            else {
                console.info("Animation introuvable : " + NOM);
            }
            return this;
        };
        ClipAnim.prototype.changerPrioriteAnimEnCours = function (PRIORITE) {
            this.codePriorite = PRIORITE;
        };
        ClipAnim.prototype.appliquerChangementPosture = function () {
            if (!this.modeCreature && this.listePosture) {
                return;
            }
            var anim = this.nomAnimEnCours;
            var nomCible = anim;
            for (var _i = 0, _a = this.listePosture; _i < _a.length; _i++) {
                var posture = _a[_i];
                var nomAnimPosture = anim + ":" + posture;
                var source = this.sourceClonage || this;
                if (source.indexAnim[nomAnimPosture]) {
                    nomCible = nomAnimPosture;
                    break;
                }
            }
            if (this.nomAnimPostureEnCours != nomCible) {
                this.jouerAnimation(anim, this.codePriorite, true);
            }
        };
        ClipAnim.prototype.animationSuivante = function (NOM, PRIORITE, IMAGE_DEPART, IMAGE_FIN) {
            var _this = this;
            if (PRIORITE === void 0) { PRIORITE = 0; }
            if (IMAGE_DEPART === void 0) { IMAGE_DEPART = 0; }
            if (IMAGE_FIN === void 0) { IMAGE_FIN = 0; }
            if (this.animEnCours) {
                var index_1 = this.numeroAnimation;
                this.animEnCours.declencheurFinAnim(function () {
                    if (index_1 == _this.numeroAnimation) {
                        _this.jouerAnimation(NOM, PRIORITE, true, IMAGE_DEPART, IMAGE_FIN);
                    }
                });
            }
        };
        ClipAnim.prototype.creationEnfant = function (ENFANT) {
            var clip = new ClipAnim();
            clip.codeHierarchique = this.clipRacine.generateurCodeHierarchique++;
            clip.clipParent = this;
            clip.clipPrincipal = this.clipPrincipal;
            clip.clipRacine = this.clipRacine;
            clip.index = ENFANT.index;
            clip.codeAffichage = ENFANT.nom;
            clip.bibliotheque = this.bibliotheque;
            clip.sourceRacine = this.sourceRacine;
            clip.imageDepart = ENFANT.imageDepart;
            clip.dureeImage = this.dureeImage;
            clip.imageParSeconde = this.imageParSeconde;
            clip.ancrageX = ENFANT.ancrageX;
            clip.ancrageY = ENFANT.ancrageY;
            var info = this.bibliotheque[ENFANT.nom];
            if (info) {
                clip.initialisation(info);
            }
            clip.construction();
            if (this.teinteGlobale != undefined) {
                clip.tint = this.teinteGlobale;
            }
            return clip;
        };
        ClipAnim.prototype.recupSourceClonage = function () {
            if (this.sourceClonage) {
                return this.sourceClonage.recupSourceClonage();
            }
            return this;
        };
        ClipAnim.prototype.cloner = function (BASE) {
            var clone = BASE || new ClipAnim();
            if (this.rasterisationActive) {
                clone.defNombreImage(this.nombreImage);
                clone.jouerEnBoucle = this.jouerEnBoucle;
                clone.rasterisationActive = true;
                clone.rasterisationListeImage = this.rasterisationListeImage;
            }
            else {
                clone.typeClip = this.typeClip;
                clone.typeClipCode = this.typeClipCode;
                clone.nomAnim = this.nomAnim;
                if (this.typeClipCode == 73) {
                    clone.codeAffichage = this.codeAffichage;
                    clone.ancrageX = this.ancrageX;
                    clone.ancrageY = this.ancrageY;
                    clone.construction();
                }
                else if (this.typeClipCode == 65) {
                    if (this.sourceLocale) {
                        clone.sourceLocale = this.sourceLocale;
                        clone.sourceRacine = clone.sourceLocale;
                    }
                    clone.jouerEnBoucle = this.jouerEnBoucle;
                    clone.bibliotheque = {};
                    if (this.listeInfoClip) {
                        clone.listeInfoClip = [];
                        var premier = true;
                        for (var i = 0, nb = this.listeInfoClip.length; i < nb; i++) {
                            var info = this.listeInfoClip[i];
                            var infoClone = info.cloner();
                            infoClone.bibliotheque = clone.bibliotheque;
                            clone.listeInfoClip.push(infoClone);
                            clone.bibliotheque[info.nom] = infoClone;
                            if (premier) {
                                premier = false;
                                clone.initialisation(infoClone);
                            }
                        }
                    }
                    if (clone.nombreImage == 1) {
                        clone.construction();
                    }
                }
                else if (this.typeClipCode == 67) {
                    clone.estUnClone = true;
                    clone.peutBoucler = true;
                    clone.sourceClonage = this.recupSourceClonage();
                    clone.modeCreature = this.modeCreature;
                    clone.indexAnim = {};
                    clone.listeAnim = [];
                    if (this.sourceLocale) {
                        clone.sourceLocale = this.sourceLocale;
                        clone.sourceRacine = clone.sourceLocale;
                    }
                }
            }
            return clone;
        };
        ClipAnim.prototype.clonerAnimationDansCreature = function (NOM) {
            var animClone = this.indexAnim[NOM];
            var animSource = this.sourceClonage.indexAnim[NOM];
            if (!animClone && animSource) {
                animClone = new ClipAnim();
                animClone.sourceRacine = this.sourceRacine;
                animSource.cloner(animClone);
                this.ajouterAnimation(NOM, animClone);
                return animClone;
            }
            return null;
        };
        ClipAnim.prototype.serialisation = function (DATA) {
            DATA.e16(0xFFFF);
            this.serialisationInterne(DATA);
        };
        ClipAnim.prototype.serialisationInterne = function (DATA) {
            DATA.e8(this.typeClipCode);
            if (this.typeClipCode == 73) {
                DATA.eChaine(this.codeAffichage);
                if (this.ancrageX || this.ancrageY) {
                    DATA.eBool(true);
                    DATA.e32(this.ancrageX * 1000);
                    DATA.e32(this.ancrageY * 1000);
                }
                else {
                    DATA.eBool(false);
                }
                return;
            }
            else if (this.typeClipCode == 65) {
                if (this.sourceLocale) {
                    DATA.eBool(true);
                    DATA.eChaine(this.sourceLocale);
                }
                else {
                    DATA.eBool(false);
                }
                DATA.eBool(this.jouerEnBoucle);
                if (this.listeInfoClip) {
                    DATA.e16(this.listeInfoClip.length);
                    for (var _i = 0, _a = this.listeInfoClip; _i < _a.length; _i++) {
                        var infoClip = _a[_i];
                        infoClip.serialisation(DATA);
                    }
                }
                else {
                    DATA.e16(0);
                }
                return;
            }
            else if (this.typeClipCode == 67) {
                if (this.sourceLocale) {
                    DATA.eBool(true);
                    DATA.eChaine(this.sourceLocale);
                }
                else {
                    DATA.eBool(false);
                }
                DATA.e8(this.listeAnim.length);
                for (var nom in this.indexAnim) {
                    DATA.eChaine(nom);
                    var anim = this.indexAnim[nom];
                    anim.serialisationInterne(DATA);
                }
                return;
            }
            throw new Error("Type clip inconnu : " + this.typeClipCode);
        };
        ClipAnim.prototype.deserialisation = function (DATA) {
            DATA.l16();
            this.deserialisationInterne(DATA);
        };
        ClipAnim.prototype.deserialisationInterne = function (DATA) {
            this.typeClipCode = DATA.l8();
            if (this.typeClipCode == 73) {
                this.typeClip = "I";
                this.codeAffichage = DATA.lChaine();
                if (DATA.lBool()) {
                    this.ancrageX = DATA.l32s() / 1000;
                    this.ancrageY = DATA.l32s() / 1000;
                }
                this.construction();
            }
            else if (this.typeClipCode == 65) {
                this.typeClip = "A";
                this.bibliotheque = {};
                if (DATA.lBool()) {
                    this.sourceLocale = DATA.lChaine();
                    this.sourceRacine = this.sourceLocale;
                }
                this.jouerEnBoucle = DATA.lBool();
                var nbClip = DATA.l16();
                if (nbClip) {
                    this.listeInfoClip = [];
                    for (var i = 0; i < nbClip; i++) {
                        var infoClip = new InfoClipAnim(DATA);
                        infoClip.bibliotheque = this.bibliotheque;
                        this.bibliotheque[infoClip.nom] = infoClip;
                        this.listeInfoClip.push(infoClip);
                        if (i == 0) {
                            infoClip.clipPrincipal = true;
                            this.initialisation(infoClip);
                        }
                    }
                }
                if (this.nombreImage == 1) {
                    this.construction();
                }
            }
            else if (this.typeClipCode == 67) {
                this.typeClip = "C";
                if (DATA.lBool()) {
                    this.sourceLocale = DATA.lChaine();
                    this.sourceRacine = this.sourceLocale;
                }
                var nb = DATA.l8();
                for (var i = 0; i < nb; i++) {
                    var anim = new ClipAnim();
                    anim.sourceRacine = this.sourceRacine;
                    var nomAnim = DATA.lChaine();
                    anim.deserialisationInterne(DATA);
                    this.ajouterAnimation(nomAnim, anim);
                }
            }
            else if (this.typeClipCode == 35) {
                var code = DATA.lChaine();
                var data = ClipAnim.indexCacheClipAnim[code];
                if (data) {
                    data.cloner(this);
                }
                else {
                    console.error("Impossible de charger l'animation en cache [" + code + "].");
                }
                return;
            }
        };
        ClipAnim.prototype.serialisationChaine = function () {
            var chaine = this.typeClip + "#";
            if (this.typeClip == "I") {
                if (this.ancrageX !== undefined) {
                    return chaine + this.codeAffichage.substr(1) + "," + this.ancrageX + "," + this.ancrageY;
                }
                else {
                    return chaine + this.codeAffichage.substr(1);
                }
            }
            else if (this.typeClip == "A") {
                var json = {};
                if (this.sourceLocale !== undefined) {
                    json["source"] = this.sourceLocale;
                }
                if (!this.jouerEnBoucle) {
                    json["boucle"] = 1;
                }
                json["clip"] = [];
                if (this.listeInfoClip) {
                    for (var _i = 0, _a = this.listeInfoClip; _i < _a.length; _i++) {
                        var infoClip = _a[_i];
                        json["clip"].push(infoClip.serialisationJSON());
                    }
                }
                return "A#" + InfoClipAnim.exportationJSON(json);
            }
            else if (this.typeClip == "C") {
                var liste = [];
                if (this.sourceLocale !== undefined) {
                    liste.push("source=" + this.sourceLocale);
                }
                for (var nom in this.indexAnim) {
                    liste.push("@" + nom + "=" + this.indexAnim[nom].serialisationChaine());
                }
                return "C#" + liste.join("&&");
            }
        };
        ClipAnim.prototype.deserialisationChaine = function (DATA) {
            var code = DATA.charAt(0);
            this.typeClipCode = code.charCodeAt(0);
            if (code == "I") {
                this.typeClip = "I";
                var info = DATA.substr(2).split(",");
                this.codeAffichage = "@" + info[0];
                if (info.length >= 3) {
                    this.ancrageX = parseFloat(info[1]);
                    this.ancrageY = parseFloat(info[2]);
                }
                this.construction();
            }
            else if (code == "A") {
                this.typeClip = "A";
                var info = JSON.parse(DATA.substr(2));
                this.bibliotheque = {};
                if (info.source !== undefined) {
                    this.sourceLocale = info.source;
                    if (!this.sourceRacine) {
                        this.sourceRacine = this.sourceLocale;
                    }
                }
                if (info.boucle == 1) {
                    this.jouerEnBoucle = false;
                }
                var liste = info.clip;
                var premier = true;
                this.listeInfoClip = [];
                for (var _i = 0, liste_4 = liste; _i < liste_4.length; _i++) {
                    var infoBrut = liste_4[_i];
                    var infoClip = new InfoClipAnim(infoBrut);
                    infoClip.bibliotheque = this.bibliotheque;
                    this.bibliotheque[infoClip.nom] = infoClip;
                    this.listeInfoClip.push(infoClip);
                    if (premier) {
                        premier = false;
                        infoClip.clipPrincipal = true;
                        this.initialisation(infoClip);
                    }
                }
            }
            else if (code == "C") {
                this.typeClip = "C";
                var indexAnim = {};
                var info = DATA.substr(2).split("&&");
                for (var i = 0; i < info.length; i++) {
                    var sousChaine = info[i];
                    var indexSeparateur = sousChaine.indexOf("=");
                    if (indexSeparateur != -1) {
                        indexAnim[sousChaine.substr(0, indexSeparateur)] = sousChaine.substr(indexSeparateur + 1);
                    }
                }
                if (indexAnim["source"]) {
                    this.sourceLocale = indexAnim["source"];
                    this.sourceRacine = this.sourceLocale;
                }
                for (var nomAnim in indexAnim) {
                    if (nomAnim.charAt(0) == "@") {
                        var anim = new ClipAnim();
                        anim.sourceRacine = this.sourceRacine;
                        anim.deserialisationChaine(indexAnim[nomAnim]);
                        nomAnim = nomAnim.substr(1);
                        this.ajouterAnimation(nomAnim, anim);
                    }
                }
            }
            else {
                throw new Error("Type anim inconnu : " + code);
            }
        };
        ClipAnim.prototype.recupElementInterface = function (LARGEUR, HAUTEUR) {
            if (LARGEUR === void 0) { LARGEUR = 100; }
            if (HAUTEUR === void 0) { HAUTEUR = 100; }
            if (this.typeClip == "I") {
                var image = new I_Image_1.I_Image(ClipAnim.BIBLIOTHEQUE + this.sourceLocale + this.codeAffichage.substr(1));
                image.defLargeurMax("100%").defHauteurMax("100%");
                return image;
            }
            else {
                var largeur = LARGEUR;
                var hauteur = HAUTEUR;
                var image = new I_ImagePixi_1.I_ImagePixi(largeur, hauteur);
                var clip_1 = this.cloner();
                image.scene.addChild(clip_1);
                image.ajouterBoucle(function () {
                    clip_1.boucle(Date.now());
                });
                var listeAnim = this.recupSourceClonage().listeAnim;
                if (listeAnim && listeAnim.length) {
                    clip_1.jouerAnimation(listeAnim[0].nomAnim, 0, true);
                }
                var rect = clip_1.getBounds();
                clip_1.x = ((largeur - rect.width) / 2) - rect.x;
                clip_1.y = ((hauteur - rect.height) / 2) - rect.y;
                return image;
            }
        };
        ClipAnim.BIBLIOTHEQUE = "http://data.atelier801.com/";
        ClipAnim.BIBLIOTHEQUE_DIVERS = "http://data.atelier801.com/";
        ClipAnim.BIBLIOTHEQUE_MORCEAUX = "http://data.atelier801.com/";
        ClipAnim.VERSION_IMAGE = "";
        ClipAnim.indexCacheClipAnim = {};
        ClipAnim.indexCachePreChargement = {};
        return ClipAnim;
    }(PIXI.Sprite));
    exports.ClipAnim = ClipAnim;
    var EvenementClipAnim = (function () {
        function EvenementClipAnim() {
        }
        return EvenementClipAnim;
    }());
    var InfoClipAnim = (function () {
        function InfoClipAnim(DATA) {
            this.listeEnfant = [];
            this.clipPrincipal = false;
            this.nbEqtiquette = 0;
            if (DATA) {
                if (DATA instanceof ChaineOctet_1.default) {
                    this.clipPrincipal = DATA.lBool();
                    this.nom = DATA.lChaine();
                    this.nbImage = DATA.l16();
                    this.jouerEnBoucle = DATA.lBool();
                    this.nbEqtiquette = DATA.l8();
                    if (this.nbEqtiquette) {
                        this.indexEtiquette = {};
                        for (var i = 0; i < this.nbEqtiquette; i++) {
                            this.indexEtiquette[DATA.l16()] = DATA.lChaine();
                        }
                    }
                    var nbEnfant = DATA.l16();
                    if (nbEnfant) {
                        for (var i = 0; i < nbEnfant; i++) {
                            var enfant = new InfoEnfantClipAnim(DATA);
                            enfant.index = i;
                            this.listeEnfant.push(enfant);
                        }
                    }
                }
                else {
                    this.nom = DATA.nom;
                    this.nbImage = DATA.nbImg;
                    this.jouerEnBoucle = DATA.boucle != 1;
                    if (DATA.evt) {
                        for (var image in DATA.evt) {
                            if (!this.indexEtiquette) {
                                this.indexEtiquette = {};
                            }
                            this.nbEqtiquette++;
                            this.indexEtiquette[parseInt(image)] = DATA.evt[image];
                        }
                    }
                    if (DATA.enfants) {
                        for (var i = 0, nb = DATA.enfants.length; i < nb; i++) {
                            var infoEnfant = DATA.enfants[i];
                            var enfant = new InfoEnfantClipAnim(infoEnfant);
                            enfant.index = i;
                            this.listeEnfant.push(enfant);
                        }
                    }
                }
            }
        }
        InfoClipAnim.prototype.serialisation = function (DATA) {
            DATA.eBool(this.clipPrincipal);
            DATA.eChaine(this.nom);
            DATA.e16(this.nbImage);
            DATA.eBool(this.jouerEnBoucle);
            DATA.e8(this.nbEqtiquette);
            if (this.nbEqtiquette) {
                for (var image in this.indexEtiquette) {
                    DATA.e16(parseInt(image));
                    DATA.eChaine(this.indexEtiquette[image]);
                }
            }
            DATA.e16(this.listeEnfant.length);
            for (var _i = 0, _a = this.listeEnfant; _i < _a.length; _i++) {
                var enfant = _a[_i];
                enfant.serialisation(DATA);
            }
        };
        InfoClipAnim.prototype.serialisationJSON = function () {
            var json = {};
            json["nom"] = this.nom;
            json["nbImg"] = this.nbImage;
            if (!this.jouerEnBoucle) {
                json["boucle"] = 1;
            }
            if (this.nbEqtiquette) {
                json["evt"] = this.indexEtiquette;
            }
            if (this.listeEnfant.length) {
                json["enfants"] = [];
                for (var _i = 0, _a = this.listeEnfant; _i < _a.length; _i++) {
                    var enfant = _a[_i];
                    json["enfants"].push(enfant.serialisationJSON());
                }
            }
            return json;
        };
        InfoClipAnim.prototype.cloner = function () {
            var clone = new InfoClipAnim();
            clone.nom = this.nom;
            clone.nbImage = this.nbImage;
            clone.jouerEnBoucle = this.jouerEnBoucle;
            clone.clipPrincipal = this.clipPrincipal;
            if (this.indexEtiquette) {
                clone.indexEtiquette = {};
                for (var p in this.indexEtiquette) {
                    clone.nbEqtiquette++;
                    clone.indexEtiquette[p] = this.indexEtiquette[p];
                }
            }
            if (this.listeEnfant) {
                clone.listeEnfant = [];
                for (var _i = 0, _a = this.listeEnfant; _i < _a.length; _i++) {
                    var enfant = _a[_i];
                    clone.listeEnfant.push(enfant.cloner());
                }
            }
            return clone;
        };
        InfoClipAnim.exportationJSON = function (OBJET) {
            if (typeof OBJET !== 'object' || OBJET === null || OBJET instanceof Array) {
                return InfoClipAnim.valeurJSON(OBJET);
            }
            var chaine = "{";
            var premier = true;
            for (var clef in OBJET) {
                if (!premier) {
                    chaine += ",";
                }
                premier = false;
                chaine += '"' + clef + '":' + InfoClipAnim.valeurJSON(OBJET[clef]);
            }
            chaine += "}";
            return chaine;
        };
        InfoClipAnim.valeurJSON = function (val) {
            switch (typeof val) {
                case 'string':
                    return '"' + val.replace(/\\/g, '\\\\').replace('"', '\\"') + '"';
                case 'number':
                case 'boolean':
                    return '' + val;
                case 'function':
                    return 'null';
                case 'object':
                    if (val === null) {
                        return 'null';
                    }
                    if (val instanceof Date) {
                        return '"' + val.toISOString() + '"';
                    }
                    if (val instanceof Array) {
                        var liste = [];
                        for (var i = 0; i < val.length; i++) {
                            liste.push(InfoClipAnim.valeurJSON(val[i]));
                        }
                        return '[' + liste.join(',') + ']';
                    }
                    return InfoClipAnim.exportationJSON(val);
            }
        };
        return InfoClipAnim;
    }());
    var InfoEnfantClipAnim = (function () {
        function InfoEnfantClipAnim(DATA) {
            this.listeSequence = [];
            this.indexSequence = [];
            this.estAffiche = false;
            if (DATA) {
                if (DATA instanceof ChaineOctet_1.default) {
                    this.nom = DATA.lChaine();
                    if (DATA.lBool()) {
                        this.ancrageX = DATA.l16s();
                        this.ancrageY = DATA.l16s();
                    }
                    var derniereSequence = void 0;
                    var nbSeq = DATA.l16();
                    for (var i = 0; i < nbSeq; i++) {
                        var sequence = new InfoSequence(DATA);
                        this.listeSequence.push(sequence);
                        for (var i_1 = sequence.imageDepart; i_1 < sequence.imageFin; i_1++) {
                            this.indexSequence[i_1] = sequence;
                        }
                        if (derniereSequence && derniereSequence.interpolationActive) {
                            derniereSequence.ajouterInterpolation(sequence);
                        }
                        derniereSequence = sequence;
                    }
                }
                else {
                    this.nom = DATA.nom;
                    if (DATA.acc) {
                        this.ancrageX = DATA.acc[0];
                        this.ancrageY = DATA.acc[1];
                    }
                    var derniereSequence = void 0;
                    for (var _i = 0, _a = DATA.seq; _i < _a.length; _i++) {
                        var seq = _a[_i];
                        var sequence = new InfoSequence(seq);
                        this.listeSequence.push(sequence);
                        for (var i = sequence.imageDepart; i < sequence.imageFin; i++) {
                            this.indexSequence[i] = sequence;
                        }
                        if (derniereSequence && derniereSequence.interpolationActive) {
                            derniereSequence.ajouterInterpolation(sequence);
                        }
                        derniereSequence = sequence;
                    }
                }
                this.imageDepart = this.listeSequence[0].imageDepart;
            }
        }
        InfoEnfantClipAnim.prototype.serialisation = function (DATA) {
            DATA.eChaine(this.nom);
            if (this.ancrageX || this.ancrageY) {
                DATA.eBool(true);
                DATA.e16(this.ancrageX);
                DATA.e16(this.ancrageY);
            }
            else {
                DATA.eBool(false);
            }
            DATA.e16(this.listeSequence.length);
            for (var _i = 0, _a = this.listeSequence; _i < _a.length; _i++) {
                var sequence = _a[_i];
                sequence.serialisation(DATA);
            }
        };
        InfoEnfantClipAnim.prototype.serialisationJSON = function () {
            var json = {};
            json["nom"] = this.nom;
            if (this.ancrageX || this.ancrageY) {
                json["acc"] = [this.ancrageX, this.ancrageY];
            }
            json["seq"] = [];
            for (var _i = 0, _a = this.listeSequence; _i < _a.length; _i++) {
                var sequence = _a[_i];
                json["seq"].push(sequence.serialisationJSON());
            }
            return json;
        };
        InfoEnfantClipAnim.prototype.cloner = function () {
            var info = new InfoEnfantClipAnim(null);
            info.nom = this.nom;
            info.estAffiche = false;
            info.listeSequence = this.listeSequence;
            info.indexSequence = this.indexSequence;
            info.imageDepart = this.imageDepart;
            info.index = this.index;
            info.ancrageX = this.ancrageX;
            info.ancrageY = this.ancrageY;
            return info;
        };
        return InfoEnfantClipAnim;
    }());
    var InfoSequence = (function () {
        function InfoSequence(DATA) {
            this.accrocheX = 0;
            this.accrocheY = 0;
            this.posX = 0;
            this.posY = 0;
            this.echelleX = 1;
            this.echelleY = 1;
            this.alpha = 1;
            this.teinte = 0xFFFFFF;
            this.skewX = 0;
            this.skewY = 0;
            this.rotation = 0;
            this.typeRotationAuto = 0;
            this.transformationX = 0;
            this.transformationY = 0;
            this.bezierActif = false;
            this.interpolationComplexe = false;
            if (DATA instanceof ChaineOctet_1.default) {
                this.interpolationActive = DATA.lBool();
                if (DATA.lBool()) {
                    this.bezierActif = true;
                    this.bezierX1 = DATA.l16() / 1000;
                    this.bezierY1 = DATA.l16() / 1000;
                    this.bezierX2 = DATA.l16() / 1000;
                    this.bezierY2 = DATA.l16() / 1000;
                }
                this.imageDepart = DATA.l16();
                this.imageFin = DATA.l16();
                var nb = DATA.l8();
                for (var i = 0; i < nb; i++) {
                    var code = DATA.l8();
                    var pointTransformation = false;
                    switch (code) {
                        case 1:
                            pointTransformation = true;
                            this.transformationX = DATA.l32s() / 1000;
                            this.transformationY = DATA.l32s() / 1000;
                            break;
                        case 10:
                            this.posX = DATA.l32s() / 1000;
                            break;
                        case 11:
                            this.posY = DATA.l32s() / 1000;
                            break;
                        case 20:
                            this.rotation = DATA.l32s() / 50000;
                            if (pointTransformation) {
                                this.interpolationComplexe = true;
                            }
                            break;
                        case 21:
                            this.skewX = DATA.l32s() / 50000;
                            if (pointTransformation) {
                                this.interpolationComplexe = true;
                            }
                            break;
                        case 22:
                            this.skewY = DATA.l32s() / 50000;
                            if (pointTransformation) {
                                this.interpolationComplexe = true;
                            }
                            break;
                        case 23:
                            this.typeRotationAuto = DATA.l8();
                            if (pointTransformation) {
                                this.interpolationComplexe = true;
                            }
                            break;
                        case 30:
                            this.echelleX = DATA.l32s() / 1000;
                            if (pointTransformation) {
                                this.interpolationComplexe = true;
                            }
                            break;
                        case 31:
                            this.echelleY = DATA.l32s() / 1000;
                            if (pointTransformation) {
                                this.interpolationComplexe = true;
                            }
                            break;
                        case 40:
                            this.alpha = DATA.l16() / 1000;
                            break;
                        case 41:
                            this.teinte = DATA.l32s();
                            break;
                    }
                }
            }
            else {
                this.interpolationActive = DATA.plage.indexOf(">") != -1;
                var infoPlage = DATA.plage.split(this.interpolationActive ? ">" : ",");
                if (DATA.bezier) {
                    this.bezierActif = true;
                    this.bezierX1 = DATA.bezier[0];
                    this.bezierY1 = DATA.bezier[1];
                    this.bezierX2 = DATA.bezier[2];
                    this.bezierY2 = DATA.bezier[3];
                }
                this.imageDepart = parseInt(infoPlage[0]);
                this.imageFin = parseInt(infoPlage[1]);
                var pointTransformation = DATA.t != null;
                if (pointTransformation) {
                    this.transformationX = DATA.t[0];
                    this.transformationY = DATA.t[1];
                }
                if (DATA.ax) {
                    this.accrocheX = DATA.ax;
                }
                if (DATA.ay) {
                    this.accrocheY = DATA.ay;
                }
                if (DATA.px) {
                    this.posX = DATA.px;
                }
                if (DATA.py) {
                    this.posY = DATA.py;
                }
                if (DATA.r) {
                    this.rotation = DATA.r / 57.2958;
                    if (pointTransformation) {
                        this.interpolationComplexe = true;
                    }
                }
                if (DATA.ra) {
                    this.typeRotationAuto = DATA.ra;
                }
                if (DATA.ex) {
                    this.echelleX = DATA.ex;
                    if (pointTransformation) {
                        this.interpolationComplexe = true;
                    }
                }
                if (DATA.ey) {
                    this.echelleY = DATA.ey;
                    if (pointTransformation) {
                        this.interpolationComplexe = true;
                    }
                }
                if (DATA.sx) {
                    this.skewX = DATA.sx / 57.2958;
                    if (pointTransformation) {
                        this.interpolationComplexe = true;
                    }
                }
                if (DATA.sy) {
                    this.skewY = DATA.sy / 57.2958;
                    if (pointTransformation) {
                        this.interpolationComplexe = true;
                    }
                }
                if (DATA.a !== undefined) {
                    this.alpha = DATA.a;
                }
                if (DATA.c !== undefined) {
                    this.teinte = parseInt(DATA.c, 16);
                }
            }
            if (this.interpolationComplexe) {
                this.matriceComplexe = new PIXI.Matrix();
                this.transformation = new PIXI.Transform();
            }
        }
        InfoSequence.prototype.interpolationBezier = function (X1, Y1, X2, Y2, TEMPS) {
            if (TEMPS == 0) {
                TEMPS = 0.000001;
            }
            else if (TEMPS > 0.999999) {
                TEMPS = 0.999999;
            }
            var a = 1 + 3 * X1 - 3 * X2;
            var b = -6 * X1 + 3 * X2;
            var c = 3 * X1;
            var d = -TEMPS;
            var p = -((b * b) / (3 * a * a)) + (c / a);
            var q = (b / (27 * a)) * ((2 * b * b) / (a * a) - ((9 * c) / a)) + (d / a);
            var delta = -(4 * p * p * p + 27 * q * q);
            var t;
            if (delta < 0) {
                var u3 = 0.5 * (-q + Math.sqrt(-delta / 27));
                var v3 = 0.5 * (-q - Math.sqrt(-delta / 27));
                var u = u3 >= 0 ? Math.pow(u3, 0.333333333333) : -Math.pow(-u3, 0.333333333333);
                var v = v3 >= 0 ? Math.pow(v3, 0.333333333333) : -Math.pow(-v3, 0.333333333333);
                t = u + v - (b / (3 * a));
            }
            else {
                for (var i = 0; i < 3; i++) {
                    t = 2 * Math.sqrt(-0.333333333333 * p) * Math.cos(0.333333333333 * Math.acos(-0.5 * q * Math.sqrt(-27 / (p * p * p))) + (2 * Math.PI / 3) * i) - (b / (3 * a));
                    if (t >= 0 && t <= 1) {
                        break;
                    }
                }
            }
            return t * (((1 + 3 * Y1 - 3 * Y2) * t + (-6 * Y1 + 3 * Y2)) * t + 3 * Y1);
        };
        InfoSequence.prototype.majPosition = function (CLIP, IMAGE, INITIALISATION) {
            if (INITIALISATION === void 0) { INITIALISATION = false; }
            if (this.interpolationActive) {
                var progression = (IMAGE - this.imageDepart) / (this.imageFin - this.imageDepart);
                if (this.bezierActif) {
                    progression = this.interpolationBezier(this.bezierX1, this.bezierY1, this.bezierX2, this.bezierY2, progression);
                }
                if (this.interpolationComplexe) {
                    var matrice = this.matriceComplexe;
                    if (this.distanceAlpha || INITIALISATION) {
                        CLIP.alpha = this.alpha + this.distanceAlpha * progression;
                    }
                    if (this.distanceCouleur || INITIALISATION) {
                        CLIP.tint = (((this.teinte >> 16 & 0xFF) + this.distanceRouge * progression) << 16)
                            | (((this.teinte >> 8 & 0xFF) + this.distanceVert * progression) << 8)
                            | ((this.teinte & 0xFF) + this.distanceBleu * progression);
                        for (var _i = 0, _a = CLIP.children; _i < _a.length; _i++) {
                            var enfant = _a[_i];
                            if (enfant instanceof PIXI.Sprite) {
                                enfant.tint = CLIP.tint;
                            }
                        }
                    }
                    var ex = this.echelleX + this.distanceEchelleX * progression;
                    var ey = this.echelleY + this.distanceEchelleY * progression;
                    var sx = this.skewX + this.distanceSkewX * progression;
                    var sy = this.skewY + this.distanceSkewY * progression;
                    var rotation = this.rotation + this.distanceRotation * progression;
                    matrice.a = Math.cos(rotation + sy) * ex;
                    matrice.b = Math.sin(rotation + sy) * ex;
                    matrice.c = -Math.sin(rotation - sx) * ey;
                    matrice.d = Math.cos(rotation - sx) * ey;
                    matrice.tx = this.posX + this.distancePosX * progression;
                    matrice.ty = this.posY + this.distancePosY * progression;
                    matrice.decompose(this.transformation);
                    CLIP.position.set(this.transformation.position.x, this.transformation.position.y);
                    CLIP.scale.set(this.transformation.scale.x, this.transformation.scale.y);
                    CLIP.skew.set(this.transformation.skew.x, this.transformation.skew.y);
                    CLIP.rotation = this.transformation.rotation;
                }
                else {
                    if (this.distancePosX || this.distancePosY || INITIALISATION) {
                        CLIP.position.set(this.posX + this.distancePosX * progression, this.posY + this.distancePosY * progression);
                    }
                    if (this.distanceEchelleX || this.distanceEchelleY || INITIALISATION) {
                        CLIP.scale.set(this.echelleX + this.distanceEchelleX * progression, this.echelleY + this.distanceEchelleY * progression);
                    }
                    if (this.distanceSkewX || this.distanceSkewY || INITIALISATION) {
                        CLIP.skew.set(this.skewX + this.distanceSkewX * progression, this.skewY + this.distanceSkewY * progression);
                    }
                    if (this.distanceRotation || INITIALISATION) {
                        CLIP.rotation = this.rotation + this.distanceRotation * progression;
                    }
                    if (this.distanceAlpha || INITIALISATION) {
                        CLIP.alpha = this.alpha + this.distanceAlpha * progression;
                    }
                    if (this.distanceCouleur || INITIALISATION) {
                        CLIP.tint = (((this.teinte >> 16 & 0xFF) + this.distanceRouge * progression) << 16)
                            | (((this.teinte >> 8 & 0xFF) + this.distanceVert * progression) << 8)
                            | ((this.teinte & 0xFF) + this.distanceBleu * progression);
                    }
                }
            }
            else {
                CLIP.position.set(this.posX, this.posY);
                CLIP.scale.set(this.echelleX, this.echelleY);
                CLIP.skew.set(this.skewX, this.skewY);
                CLIP.rotation = this.rotation;
                CLIP.alpha = this.alpha;
                if (CLIP.tint != this.teinte) {
                    CLIP.tint = this.teinte;
                }
            }
        };
        InfoSequence.prototype.ajouterInterpolation = function (SEQUENCE) {
            this.distancePosX = SEQUENCE.posX - this.posX;
            this.distancePosY = SEQUENCE.posY - this.posY;
            this.distanceEchelleX = SEQUENCE.echelleX - this.echelleX;
            this.distanceEchelleY = SEQUENCE.echelleY - this.echelleY;
            this.distanceAlpha = SEQUENCE.alpha - this.alpha;
            if (SEQUENCE.teinte != this.teinte) {
                this.distanceCouleur = true;
                this.distanceRouge = (SEQUENCE.teinte >> 16 & 0xFF) - (this.teinte >> 16 & 0xFF);
                this.distanceVert = (SEQUENCE.teinte >> 8 & 0xFF) - (this.teinte >> 8 & 0xFF);
                this.distanceBleu = (SEQUENCE.teinte & 0xFF) - (this.teinte & 0xFF);
            }
            else {
                this.distanceCouleur = false;
                this.distanceRouge = this.distanceVert = this.distanceBleu = 0;
            }
            this.distanceRotation = Mathematiques_1.default.angleMinEntre2Angles(SEQUENCE.rotation, this.rotation);
            if (this.typeRotationAuto) {
                this.distanceRotation += this.typeRotationAuto == 1 ? Math.PI * 2 : -Math.PI * 2;
            }
            this.distanceSkewX = Mathematiques_1.default.angleMinEntre2Angles(SEQUENCE.skewX, this.skewX);
            this.distanceSkewY = Mathematiques_1.default.angleMinEntre2Angles(SEQUENCE.skewY, this.skewY);
        };
        InfoSequence.prototype.serialisation = function (DATA) {
            DATA.eBool(this.interpolationActive);
            if (this.bezierActif) {
                DATA.eBool(true);
                DATA.e16(this.bezierX1 * 1000);
                DATA.e16(this.bezierY1 * 1000);
                DATA.e16(this.bezierX2 * 1000);
                DATA.e16(this.bezierY2 * 1000);
            }
            else {
                DATA.eBool(false);
            }
            DATA.e16(this.imageDepart);
            DATA.e16(this.imageFin);
            var nbTransformation = 0;
            var transformation = new ChaineOctet_1.default();
            if (this.transformationX || this.transformationY) {
                nbTransformation++;
                transformation.e8(1);
                transformation.e32(this.transformationX * 1000);
                transformation.e32(this.transformationY * 1000);
            }
            if (this.posX) {
                nbTransformation++;
                transformation.e8(10);
                transformation.e32(this.posX * 1000);
            }
            if (this.posY) {
                nbTransformation++;
                transformation.e8(11);
                transformation.e32(this.posY * 1000);
            }
            if (this.rotation) {
                nbTransformation++;
                transformation.e8(20);
                transformation.e32(this.rotation * 50000);
            }
            if (this.skewX) {
                nbTransformation++;
                transformation.e8(21);
                transformation.e32(this.skewX * 50000);
            }
            if (this.skewY) {
                nbTransformation++;
                transformation.e8(22);
                transformation.e32(this.skewY * 50000);
            }
            if (this.typeRotationAuto) {
                nbTransformation++;
                transformation.e8(23);
                transformation.e8(this.typeRotationAuto);
            }
            if (this.echelleX != 1) {
                nbTransformation++;
                transformation.e8(30);
                transformation.e32(this.echelleX * 1000);
            }
            if (this.echelleY != 1) {
                nbTransformation++;
                transformation.e8(31);
                transformation.e32(this.echelleY * 1000);
            }
            if (this.alpha != 1) {
                nbTransformation++;
                transformation.e8(40);
                transformation.e16(this.alpha * 1000);
            }
            if (this.teinte != 0xFFFFFF) {
                nbTransformation++;
                transformation.e8(41);
                transformation.e32(this.teinte);
            }
            DATA.e8(nbTransformation);
            DATA.eChaineOctet(transformation);
        };
        InfoSequence.prototype.serialisationJSON = function () {
            var json = {};
            json["plage"] = this.imageDepart + (this.interpolationActive ? ">" : ",") + this.imageFin;
            if (this.bezierActif) {
                json["bezier"] = [this.bezierX1, this.bezierY1, this.bezierX2, this.bezierY2];
            }
            if (this.transformationX || this.transformationY) {
                json["t"] = [this.transformationX, this.transformationY];
            }
            if (this.accrocheX) {
                json["ax"] = this.accrocheX;
            }
            if (this.accrocheY) {
                json["ay"] = this.accrocheY;
            }
            if (this.posX) {
                json["px"] = this.posX;
            }
            if (this.posY) {
                json["py"] = this.posY;
            }
            if (this.rotation) {
                json["r"] = this.rotation * 57.2958;
            }
            if (this.typeRotationAuto) {
                json["ra"] = this.typeRotationAuto;
            }
            if (this.skewX) {
                json["sx"] = this.skewX * 57.2958;
            }
            if (this.skewY) {
                json["sy"] = this.skewY * 57.2958;
            }
            if (this.echelleX !== undefined && this.echelleX != 1) {
                json["ex"] = this.echelleX;
            }
            if (this.echelleY !== undefined && this.echelleY != 1) {
                json["ey"] = this.echelleY;
            }
            if (this.alpha !== undefined && this.alpha != 1) {
                json["a"] = this.alpha;
            }
            if (this.teinte !== undefined && this.teinte != 0xFFFFFF) {
                json["c"] = this.teinte.toString(16);
            }
            return json;
        };
        return InfoSequence;
    }());
});
//# sourceMappingURL=ClipAnim.js.map