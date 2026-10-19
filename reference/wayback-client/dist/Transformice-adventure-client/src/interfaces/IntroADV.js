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
define(["require", "exports", "../_tfmAdventure/TFMAdventure", "../../../Souritheque-client/src/outils/affichage/animation/AnimMath", "../../../Souritheque-client/src/outils/son/MoteurSon"], function (require, exports, TFMAdventure_1, AnimMath_1, MoteurSon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IntroADV = (function (_super) {
        __extends(IntroADV, _super);
        function IntroADV(FIN) {
            var _this = _super.call(this) || this;
            _this.largeur = 1920;
            _this.hauteur = 1080;
            _this.demiLargeur = 1920 / 2;
            _this.demiHauteur = 1080 / 2;
            _this.finEnCours = false;
            IntroADV.instance = _this;
            _this.boucle = _this.boucle.bind(_this);
            _this.changerTaille(TFMAdventure_1.default.LARGEUR, TFMAdventure_1.default.HAUTEUR);
            if (TFMAdventure_1.default.instance.chat) {
                TFMAdventure_1.default.instance.chat.elementHTML.remove();
            }
            MoteurSon_1.default.preparerCache("musique/tfmadv_intro2");
            MoteurSon_1.default.preparerCache("epee");
            MoteurSon_1.default.preparerCache("swoosh");
            _this.conteneur = new PIXI.Container();
            _this.addChild(_this.conteneur);
            _this.conteneurPerso = new PIXI.Container();
            _this.conteneur.addChild(_this.conteneurPerso);
            var fondNoir = new PIXI.Graphics();
            fondNoir.beginFill(0);
            fondNoir.drawRect(-100, -100, 1920 + 200, -10000);
            fondNoir.drawRect(-100, 1080 + 100, 1920 + 200, 10000);
            fondNoir.drawRect(-100, -100, -5000, 1080 + 200);
            fondNoir.drawRect(1920 + 100, -100, 5000, 1080 + 200);
            fondNoir.endFill();
            _this.addChild(fondNoir);
            var fondNoir2 = new PIXI.Graphics();
            fondNoir2.beginFill(0);
            fondNoir2.drawRect(-100, -100, 1920 + 200, 1080 + 200);
            fondNoir2.endFill();
            _this.addChildAt(fondNoir2, 0);
            var chargeur = new PIXI.loaders.Loader();
            chargeur.add("intro_fond", TFMAdventure_1.default.recupImageDistance("interface/intro/fond.jpg"));
            chargeur.add("intro_herbe", TFMAdventure_1.default.recupImageDistance("interface/intro/herbe.png"));
            chargeur.add("intro_logo", TFMAdventure_1.default.recupImageDistance("interface/intro/logo.png"));
            chargeur.add("intro_guerrier", TFMAdventure_1.default.recupImageDistance("interface/intro/guerrier.png"));
            chargeur.add("intro_botaniste", TFMAdventure_1.default.recupImageDistance("interface/intro/botaniste.png"));
            chargeur.add("intro_journaliste", TFMAdventure_1.default.recupImageDistance("interface/intro/journaliste.png"));
            chargeur.add("intro_cuisto", TFMAdventure_1.default.recupImageDistance("interface/intro/cuistot.png"));
            chargeur.add("intro_herisson", TFMAdventure_1.default.recupImageDistance("interface/intro/herisson.png"));
            chargeur.add("intro_libellule", TFMAdventure_1.default.recupImageDistance("interface/intro/libellule.png"));
            chargeur.load(function () {
                _this.lancement();
            });
            _this.interactive = true;
            _this.buttonMode = true;
            _this.on("pointerdown", function (EVENT) {
                EVENT.data.originalEvent.preventDefault();
                _this.interactive = false;
                _this.buttonMode = false;
                _this.removeAllListeners("pointerdown");
                _this.finEnCours = true;
                AnimMath_1.default.animObjet(_this, "alpha", 1, 0, 1000).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto().defFonctionFin(function () {
                    if (_this.parent) {
                        _this.parent.removeChild(_this);
                    }
                });
                if (_this.musiqueSabre) {
                    _this.musiqueSabre.stop(1000);
                }
                if (!TFMAdventure_1.default.instance.musiqueIntro.lectureEnCours()) {
                    TFMAdventure_1.default.instance.musiqueIntro.lecture();
                }
                if (FIN) {
                    FIN();
                }
            });
            return _this;
        }
        IntroADV.prototype.changerTaille = function (LARGEUR, HAUTEUR) {
            var ratioLargeur = LARGEUR / 1920;
            var ratioHauteur = HAUTEUR / 1080;
            var ratio = Math.min(ratioLargeur, ratioHauteur);
            var largeurFinale = 1920 * ratio;
            var hauteurFinale = 1080 * ratio;
            this.scale.set(ratio, ratio);
            this.x = (LARGEUR - largeurFinale) / 2;
            this.y = (HAUTEUR - hauteurFinale) / 2;
        };
        IntroADV.prototype.lancement = function () {
            var _this = this;
            if (!this.parent || this.finEnCours) {
                return;
            }
            this.musiqueSabre = MoteurSon_1.default.jouerEffet("musique/tfmadv_intro2", 0.7);
            this.fond = PIXI.Sprite.from("intro_fond");
            this.fond.position.set(-100, -100);
            this.conteneurPerso.addChild(this.fond);
            this.cuisto = new Cuisto(this);
            this.conteneurPerso.addChild(this.cuisto);
            this.journaliste = new Journaliste(this);
            this.conteneurPerso.addChild(this.journaliste);
            this.libellule = new Libellule(this);
            this.conteneurPerso.addChild(this.libellule);
            this.botaniste = new Botaniste(this);
            this.conteneurPerso.addChild(this.botaniste);
            this.guerrier = new Guerrier(this);
            this.conteneurPerso.addChild(this.guerrier);
            this.herbe = PIXI.Sprite.from("intro_herbe");
            this.herbe.position.set(-100, -100);
            this.conteneurPerso.addChild(this.herbe);
            this.logo = new Logo(this);
            this.conteneur.addChild(this.logo);
            this.conteneur.alpha = 0;
            AnimMath_1.default.animBoucle(2000, function (P) {
            }).boucleAuto().defFonctionFin(function () {
                if (_this.finEnCours) {
                    return;
                }
                if (!TFMAdventure_1.default.instance.musiqueIntro.lectureEnCours()) {
                    TFMAdventure_1.default.instance.musiqueIntro.lecture();
                }
            });
            AnimMath_1.default.animBoucle(1500, function (P) {
                if (_this.finEnCours) {
                    return;
                }
                _this.conteneur.alpha = P;
            }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto().defFonctionFin(function () {
                _this.guerrier.animation();
                _this.botaniste.animation();
                _this.cuisto.animation();
                _this.journaliste.animation();
                _this.libellule.animation();
            });
            AnimMath_1.default.animBoucle(3600, function (P) {
                if (_this.finEnCours) {
                    return;
                }
            }).boucleAuto().defFonctionFin(function () {
                _this.logo.animation();
            });
            this.boucle();
        };
        IntroADV.prototype.boucle = function () {
            if (!this.parent) {
                return;
            }
            requestAnimationFrame(this.boucle);
            this.conteneurPerso.x += -this.conteneurPerso.x * 0.2;
            this.conteneurPerso.y += -this.conteneurPerso.y * 0.2;
            this.logo.scale.x += (1 - this.logo.scale.x) * 0.2;
            this.logo.scale.y += (1 - this.logo.scale.y) * 0.2;
            this.guerrier.scale.x += (1 - this.guerrier.scale.x) * 0.2;
            this.guerrier.scale.y += (1 - this.guerrier.scale.y) * 0.2;
            this.libellule.scale.x += (1 - this.libellule.scale.x) * 0.2;
            this.libellule.scale.y += (1 - this.libellule.scale.y) * 0.2;
            this.botaniste.scale.x += (1 - this.botaniste.scale.x) * 0.2;
            this.botaniste.scale.y += (1 - this.botaniste.scale.y) * 0.2;
            this.cuisto.scale.x += (1 - this.cuisto.scale.x) * 0.2;
            this.cuisto.scale.y += (1 - this.cuisto.scale.y) * 0.2;
            this.journaliste.scale.x += (1 - this.journaliste.scale.x) * 0.2;
            this.journaliste.scale.y += (1 - this.journaliste.scale.y) * 0.2;
            if (this.logo.boucle) {
                var sin = Math.sin((Date.now() - this.logo.tempsDepart) / 1500);
                this.logo.y = this.logo.finY + sin * 10;
            }
        };
        IntroADV.LARGEUR = 1920;
        IntroADV.HAUTEUR = 1080;
        return IntroADV;
    }(PIXI.Container));
    exports.IntroADV = IntroADV;
    var Logo = (function (_super) {
        __extends(Logo, _super);
        function Logo(INTRO) {
            var _this = _super.call(this, PIXI.Texture.from("intro_logo")) || this;
            _this.departY = -20;
            _this.finY = 460;
            _this.boucle = false;
            _this.tempsDepart = 0;
            _this.intro = INTRO;
            _this.anchor.set(0.55, 1);
            _this.position.set(IntroADV.LARGEUR / 2, _this.departY);
            _this.visible = false;
            return _this;
        }
        Logo.prototype.animation = function (FIN) {
            var _this = this;
            this.finAnim = FIN;
            var filtre = new PIXI.filters.ColorMatrixFilter();
            this.visible = true;
            var distance = this.finY - this.departY;
            AnimMath_1.default.animBoucle(400, function (P2) {
                _this.y = _this.departY + distance * P2;
            }).defMouvement(AnimMath_1.Mouvement.easeInExpo).boucleAuto().defFonctionFin(function () {
                if (_this.finAnim) {
                    _this.finAnim();
                }
                _this.filters = [filtre];
                AnimMath_1.default.animBoucle(1000, function (P2) {
                    filtre.brightness(5 - (P2 * 4));
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
                _this.tempsDepart = Date.now();
                _this.boucle = true;
                _this.intro.guerrier.scale.x = 1.05;
                _this.intro.guerrier.scale.y = 0.95;
                _this.intro.cuisto.scale.x = 1.05;
                _this.intro.cuisto.scale.y = 0.95;
                _this.intro.journaliste.scale.x = 1.05;
                _this.intro.journaliste.scale.y = 0.95;
                _this.intro.botaniste.scale.x = 1.05;
                _this.intro.botaniste.scale.y = 0.95;
                _this.intro.libellule.scale.x = 1.05;
                _this.intro.libellule.scale.y = 0.95;
                _this.scale.x = 1.2;
                _this.scale.y = 0.8;
                _this.intro.conteneurPerso.y = 20;
            });
        };
        return Logo;
    }(PIXI.Sprite));
    var Guerrier = (function (_super) {
        __extends(Guerrier, _super);
        function Guerrier(INTRO) {
            var _this = _super.call(this, PIXI.Texture.from("intro_guerrier")) || this;
            _this.fin = new PIXI.Point(1310, 945);
            _this.pivot.set(538, 562);
            _this.intro = INTRO;
            _this.depart = new PIXI.Point(_this.fin.x + 25, _this.fin.y - 15);
            _this.position.set(_this.depart.x, _this.depart.y);
            _this.visible = false;
            return _this;
        }
        Guerrier.prototype.animation = function () {
            var _this = this;
            this.scale.x = 1.2;
            this.scale.y = 0.8;
            this.intro.conteneurPerso.y = 20;
            this.visible = true;
            if (!this.intro.finEnCours) {
                MoteurSon_1.default.jouerEffet("epee", 0.5);
            }
            var filtre = new PIXI.filters.ColorMatrixFilter();
            this.filters = [filtre];
            AnimMath_1.default.animBoucle(1000, function (P2) {
                filtre.brightness(5 - (P2 * 4));
            }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
            AnimMath_1.default.animBoucle(2500, function (P2) {
                _this.x = _this.depart.x + (_this.fin.x - _this.depart.x) * P2;
                _this.y = _this.depart.y + (_this.fin.y - _this.depart.y) * P2;
            }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
        };
        return Guerrier;
    }(PIXI.Sprite));
    var Herisson = (function (_super) {
        __extends(Herisson, _super);
        function Herisson(INTRO) {
            var _this = _super.call(this, PIXI.Texture.from("intro_herisson")) || this;
            _this.depart = new PIXI.Point(1135, 985);
            _this.fin = new PIXI.Point(1115, 1000);
            _this.intro = INTRO;
            _this.anchor.set(0.5, 1);
            _this.position.set(_this.depart.x, _this.depart.y);
            _this.visible = false;
            return _this;
        }
        Herisson.prototype.animation = function () {
            var _this = this;
            this.scale.x = 1.2;
            this.scale.y = 0.8;
            var filtre = new PIXI.filters.ColorMatrixFilter();
            this.filters = [filtre];
            AnimMath_1.default.animBoucle(300, function (P) {
            }).defFonctionFin(function () {
                _this.visible = true;
                AnimMath_1.default.animBoucle(1000, function (P2) {
                    filtre.brightness(5 - (P2 * 4));
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
                AnimMath_1.default.animBoucle(2500, function (P2) {
                    _this.x = _this.depart.x + (_this.fin.x - _this.depart.x) * P2;
                    _this.y = _this.depart.y + (_this.fin.y - _this.depart.y) * P2;
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
            }).boucleAuto();
        };
        return Herisson;
    }(PIXI.Sprite));
    var Botaniste = (function (_super) {
        __extends(Botaniste, _super);
        function Botaniste(INTRO) {
            var _this = _super.call(this, PIXI.Texture.from("intro_botaniste")) || this;
            _this.fin2 = new PIXI.Point(850, 995);
            _this.fin = new PIXI.Point(_this.fin2.x + 30, _this.fin2.y - 20);
            _this.depart = new PIXI.Point(_this.fin.x - 10, _this.fin.y - 5);
            _this.pivot.set(338, 402);
            _this.intro = INTRO;
            _this.position.set(_this.depart.x, _this.depart.y);
            _this.alpha = 0;
            return _this;
        }
        Botaniste.prototype.animation = function () {
            var _this = this;
            this.scale.x = 1.2;
            this.scale.y = 0.8;
            var filtre = new PIXI.filters.ColorMatrixFilter();
            AnimMath_1.default.animBoucle(200, function (P) {
                _this.x = _this.depart.x + (_this.fin.x - _this.depart.x) * P;
                _this.y = _this.depart.y + (_this.fin.y - _this.depart.y) * P;
                _this.alpha = P;
            }).defMouvement(AnimMath_1.Mouvement.easeInExpo).boucleAuto().defFonctionFin(function () {
                _this.scale.x = 1.1;
                _this.scale.y = 0.9;
                _this.intro.conteneurPerso.y = 8;
                _this.filters = [filtre];
                AnimMath_1.default.animBoucle(1000, function (P2) {
                    filtre.brightness(5 - (P2 * 4));
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
                AnimMath_1.default.animBoucle(2500, function (P2) {
                    _this.x = _this.fin.x + (_this.fin2.x - _this.fin.x) * P2;
                    _this.y = _this.fin.y + (_this.fin2.y - _this.fin.y) * P2;
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
            });
        };
        return Botaniste;
    }(PIXI.Sprite));
    var Libellule = (function (_super) {
        __extends(Libellule, _super);
        function Libellule(INTRO) {
            var _this = _super.call(this, PIXI.Texture.from("intro_libellule")) || this;
            _this.depart = new PIXI.Point(640, 705);
            _this.fin = new PIXI.Point(600, 700);
            _this.intro = INTRO;
            _this.anchor.set(0.5, 1);
            _this.position.set(_this.depart.x, _this.depart.y);
            _this.visible = false;
            return _this;
        }
        Libellule.prototype.animation = function () {
            var _this = this;
            this.scale.x = 1.2;
            this.scale.y = 0.8;
            var filtre = new PIXI.filters.ColorMatrixFilter();
            this.filters = [filtre];
            AnimMath_1.default.animBoucle(500, function (P) {
            }).defFonctionFin(function () {
                _this.visible = true;
                AnimMath_1.default.animBoucle(1000, function (P2) {
                    filtre.brightness(5 - (P2 * 4));
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
                AnimMath_1.default.animBoucle(2500, function (P2) {
                    _this.x = _this.depart.x + (_this.fin.x - _this.depart.x) * P2;
                    _this.y = _this.depart.y + (_this.fin.y - _this.depart.y) * P2;
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
            }).boucleAuto();
        };
        return Libellule;
    }(PIXI.Sprite));
    var Journaliste = (function (_super) {
        __extends(Journaliste, _super);
        function Journaliste(INTRO) {
            var _this = _super.call(this, PIXI.Texture.from("intro_journaliste")) || this;
            _this.fin2 = new PIXI.Point(1653, 735);
            _this.fin = new PIXI.Point(_this.fin2.x, _this.fin2.y - 40);
            _this.depart = new PIXI.Point(_this.fin.x - 40, _this.fin.y + 50);
            _this.pivot.set(277, 389);
            _this.intro = INTRO;
            _this.position.set(_this.depart.x, _this.depart.y);
            _this.alpha = 0;
            return _this;
        }
        Journaliste.prototype.animation = function () {
            var _this = this;
            var filtre = new PIXI.filters.ColorMatrixFilter();
            AnimMath_1.default.animBoucle(200, function (P) {
                _this.x = _this.depart.x + (_this.fin.x - _this.depart.x) * P;
                _this.y = _this.depart.y + (_this.fin.y - _this.depart.y) * P;
                _this.alpha = P;
            }, 0, 1, 100).defMouvement(AnimMath_1.Mouvement.easeInExpo).boucleAuto().defFonctionFin(function () {
                _this.scale.x = 1.1;
                _this.scale.y = 0.9;
                _this.intro.conteneurPerso.y = 6;
                _this.filters = [filtre];
                AnimMath_1.default.animBoucle(1000, function (P2) {
                    filtre.brightness(5 - (P2 * 4));
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
                AnimMath_1.default.animBoucle(2500, function (P2) {
                    _this.x = _this.fin.x + (_this.fin2.x - _this.fin.x) * P2;
                    _this.y = _this.fin.y + (_this.fin2.y - _this.fin.y) * P2;
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
            });
        };
        return Journaliste;
    }(PIXI.Sprite));
    var Cuisto = (function (_super) {
        __extends(Cuisto, _super);
        function Cuisto(INTRO) {
            var _this = _super.call(this, PIXI.Texture.from("intro_cuisto")) || this;
            _this.fin2 = new PIXI.Point(535, 966);
            _this.fin = new PIXI.Point(_this.fin2.x + 30, _this.fin2.y + 10);
            _this.depart = new PIXI.Point(_this.fin.x + 20, _this.fin.y + 5);
            _this.pivot.set(331, 365);
            _this.intro = INTRO;
            _this.position.set(_this.depart.x, _this.depart.y);
            _this.alpha = 0;
            return _this;
        }
        Cuisto.prototype.animation = function () {
            var _this = this;
            var filtre = new PIXI.filters.ColorMatrixFilter();
            AnimMath_1.default.animBoucle(200, function (P) {
                _this.x = _this.depart.x + (_this.fin.x - _this.depart.x) * P;
                _this.y = _this.depart.y + (_this.fin.y - _this.depart.y) * P;
                _this.alpha = P;
            }, 0, 1, 200).defMouvement(AnimMath_1.Mouvement.easeInExpo).boucleAuto().defFonctionFin(function () {
                _this.scale.x = 1.1;
                _this.scale.y = 0.9;
                _this.intro.conteneurPerso.y = 4;
                _this.filters = [filtre];
                AnimMath_1.default.animBoucle(1000, function (P2) {
                    filtre.brightness(5 - (P2 * 4));
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
                AnimMath_1.default.animBoucle(2500, function (P2) {
                    _this.x = _this.fin.x + (_this.fin2.x - _this.fin.x) * P2;
                    _this.y = _this.fin.y + (_this.fin2.y - _this.fin.y) * P2;
                }).defMouvement(AnimMath_1.Mouvement.easeOutExpo).boucleAuto();
            });
        };
        return Cuisto;
    }(PIXI.Sprite));
});
//# sourceMappingURL=IntroADV.js.map