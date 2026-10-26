define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ColorMatrixFilter = PIXI.filters.ColorMatrixFilter;
    var Couleur = (function () {
        function Couleur(COULEUR) {
            this.hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            var couleur;
            if (typeof COULEUR === "string") {
                if (COULEUR.charAt(0) == "#") {
                    COULEUR = COULEUR.substr(1);
                }
                couleur = parseInt(COULEUR, 16);
            }
            else {
                couleur = COULEUR;
            }
            this.defCouleurRVB(couleur >> 16 & 0xFF, couleur >> 8 & 0xFF, couleur & 0xFF);
        }
        Couleur.initialisation = function () {
            Couleur.filtreLumiere.brightness(1.3);
        };
        Couleur.prototype.defCouleurRVB = function (R, V, B) {
            this.rouge = R;
            this.vert = V;
            this.bleu = B;
            this.majTSL();
            return this;
        };
        Couleur.prototype.defCouleurTSL = function (T, S, L) {
            this.teinte = T;
            this.saturation = S;
            this.luminosite = L;
            this.majRVB();
            return this;
        };
        Couleur.prototype.ajouterSaturation = function (S) {
            this.saturation += Math.min(Math.max(S, 0), 1);
            this.majRVB();
            return this;
        };
        Couleur.prototype.ajouterLuminosite = function (L) {
            this.luminosite += Math.min(Math.max(L, 0), 1);
            this.majRVB();
            return this;
        };
        Couleur.prototype.defLuminosite = function (L) {
            this.luminosite = Math.min(Math.max(L, 0), 1);
            this.majRVB();
            return this;
        };
        Couleur.prototype.ajouterTeinte = function (T) {
            if (T < 0) {
                T = 1 - T;
            }
            this.teinte = (this.teinte + T) % 1;
            this.majRVB();
            return this;
        };
        Couleur.prototype.recupChaine = function () {
            return "#" + ((this.rouge << 16) | (this.vert << 8) | this.bleu).toString(16);
        };
        Couleur.prototype.recupEntier = function () {
            return (this.rouge << 16) | (this.vert << 8) | this.bleu;
        };
        Couleur.prototype.majRVB = function () {
            var h = this.teinte;
            var s = this.saturation;
            var l = this.luminosite;
            var r, g, b;
            if (s == 0) {
                r = g = b = l;
            }
            else {
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = this.hue2rgb(p, q, h + 1 / 3);
                g = this.hue2rgb(p, q, h);
                b = this.hue2rgb(p, q, h - 1 / 3);
            }
            this.rouge = Math.round(r * 255);
            this.vert = Math.round(g * 255);
            this.bleu = Math.round(b * 255);
        };
        Couleur.prototype.majTSL = function () {
            var r = this.rouge / 255;
            var v = this.vert / 255;
            var b = this.bleu / 255;
            var max = Math.max(r, v, b), min = Math.min(r, v, b);
            var h, s, l = (max + min) / 2;
            if (max == min) {
                h = s = 0;
            }
            else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (v - b) / d + (v < b ? 6 : 0);
                        break;
                    case v:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - v) / d + 4;
                        break;
                }
                h /= 6;
            }
            this.teinte = h;
            this.saturation = s;
            this.luminosite = l;
        };
        Couleur.contrasteCouleur = function (COULEUR, DIFF) {
            var rouge = ((COULEUR >> 16) & 0xFF);
            var vert = ((COULEUR >> 8) & 0xFF);
            var bleu = (COULEUR & 0xFF);
            rouge *= DIFF;
            vert *= DIFF;
            bleu *= DIFF;
            if (rouge < 0) {
                rouge = 0;
            }
            else if (rouge > 255) {
                rouge = 255;
            }
            if (vert < 0) {
                vert = 0;
            }
            else if (vert > 255) {
                vert = 255;
            }
            if (bleu < 0) {
                bleu = 0;
            }
            else if (bleu > 255) {
                bleu = 255;
            }
            return (rouge << 16) | (vert << 8) | bleu;
        };
        Couleur.BLANC_PUR = 0xFFFFFF;
        Couleur.BLANC_CASSE = 0xC2C2DA;
        Couleur.VERT = 0x009D9D;
        Couleur.ORANGE_FC = 0xFF8547;
        Couleur.VERT_POMME = 0x2ECF73;
        Couleur.BLEU = 0x6C77C0;
        Couleur.ROUGE = 0xCB546B;
        Couleur.JAUNE = 0xBABD2F;
        Couleur.ROSE = 0xED67EA;
        Couleur.ROUGE_ADMIN = 0xEB1D51;
        Couleur.BLEU_MC = 0x2F7FCC;
        Couleur.GRIS = 0x60608F;
        Couleur.ARGENT = 0xE3E3E3;
        Couleur.DORE = 0xFFD991;
        Couleur.ORANGE = 0xF79337;
        Couleur._ORANGE = "#F79337";
        Couleur._VERT = "#009D9D";
        Couleur._VERT_POMME = "#2ECF73";
        Couleur.filtreLumiere = new ColorMatrixFilter();
        return Couleur;
    }());
    exports.Couleur = Couleur;
    Couleur.initialisation();
});
//# sourceMappingURL=Couleur.js.map