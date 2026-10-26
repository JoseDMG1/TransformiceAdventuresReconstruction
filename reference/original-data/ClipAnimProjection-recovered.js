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
define(["require", "exports", "../_tfmAdventure/TFMAdventure"], function (require, exports, TFMAdventure_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ClipAnimProjection = (function (_super) {
        __extends(ClipAnimProjection, _super);
        function ClipAnimProjection(CLIP) {
            var _this = _super.call(this, null) || this;
            _this.initailisationRequise = true;
            _this.jouerEnBoucle = true;
            _this.vitesseLecture = 1;
            _this.imageDecimale = 0;
            _this.destructionRequise = false;
            _this.clipSource = CLIP;
            _this.euler.x = Math.PI / 2;
            if (CLIP && !CLIP.rasterisationActive && !CLIP.rasterisationAsyncEnCours) {
                CLIP.rasterisation(TFMAdventure_1.default.instance.app, true);
            }
            return _this;
        }
        ClipAnimProjection.prototype.declencheurFinAnim = function (FONCTION) {
            this.finAnim = FONCTION;
        };
        ClipAnimProjection.prototype.defPosition = function (X, Y) {
            this.position3d.x = X;
            this.position3d.z = Y;
        };
        ClipAnimProjection.prototype.boucle = function (TEMPS) {
            if (this.initailisationRequise) {
                if (this.clipSource && this.clipSource.rasterisationActive) {
                    this.initailisationRequise = false;
                    this.rasterisationListeImage = this.clipSource.rasterisationListeImage;
                    this.defNombreImage(this.clipSource.nombreImage);
                }
            }
            if (this.initailisationRequise || !this.peutBoucler) {
                return;
            }
            var tempsEcoule = (TEMPS - this.derniereBoucle) * this.vitesseLecture;
            if (tempsEcoule < 0) {
                tempsEcoule = 0;
            }
            this.imageDecimale += tempsEcoule / 16.66666;
            this.derniereBoucle = TEMPS;
            if (this.imageDecimale >= this.nombreImage) {
                if (this.jouerEnBoucle) {
                    this.imageDecimale %= this.nombreImage;
                }
                else {
                    this.lectureEnCours = false;
                    this.imageDecimale = this.nombreImage - 1;
                }
                if (this.finAnim) {
                    this.finAnim();
                }
            }
            var derniereImage = this.imageEnCours;
            this.imageEnCours = this.imageDecimale | 0;
            var nombreImageAJouer = this.imageEnCours - derniereImage;
            if (nombreImageAJouer) {
                var info = this.rasterisationListeImage[this.imageEnCours];
                this.texture = info.textureRST;
                this.pivot3d.set(info.accx, info.accy);
            }
        };
        ClipAnimProjection.prototype.defNombreImage = function (NB) {
            this.nombreImage = NB;
            if (NB > 1) {
                this.lectureEnCours = true;
                this.peutBoucler = true;
                this.derniereBoucle = Date.now();
            }
        };
        return ClipAnimProjection;
    }(PIXI.projection.Sprite3d));
    exports.ClipAnimProjection = ClipAnimProjection;
});
//# sourceMappingURL=ClipAnimProjection.js.map