define(["require", "exports", "./Son"], function (require, exports, Son_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Canal = (function () {
        function Canal(ID) {
            this.id = ID;
            this.volume = 1;
        }
        return Canal;
    }());
    exports.Canal = Canal;
    var MoteurSon = (function () {
        function MoteurSon() {
        }
        MoteurSon.defVolumeGlobal = function (VOLUME) {
            MoteurSon.VOLUME_GENERAL = VOLUME;
            Howler.volume(VOLUME);
        };
        MoteurSon.defVolumeCanal = function (CANAL, VOLUME) {
            var canal = MoteurSon.canaux[CANAL.id];
            if (!canal) {
                return;
            }
            canal.volume = VOLUME;
            for (var _i = 0, _a = Howler._howls; _i < _a.length; _i++) {
                var cacheHowl = _a[_i];
                for (var _b = 0, _c = cacheHowl._sounds; _b < _c.length; _b++) {
                    var sonHowl = _c[_b];
                    var son = sonHowl["sonSouris"];
                    if (son && son.canal == CANAL) {
                        son.majVolume();
                    }
                }
            }
        };
        MoteurSon.volumeCanal = function (CANAL) {
            return MoteurSon.canaux[CANAL.id].volume;
        };
        Object.defineProperty(MoteurSon, "volume", {
            get: function () {
                return MoteurSon.VOLUME_GENERAL;
            },
            enumerable: true,
            configurable: true
        });
        MoteurSon.sourdine = function (OUI) {
            if (OUI === void 0) { OUI = true; }
            Howler.mute(OUI);
        };
        MoteurSon.estEnSourdine = function () {
            return Howler._muted;
        };
        MoteurSon.couperTousLesSons = function () {
            Howler.unload();
        };
        MoteurSon.preparerCache = function (NOM) {
            var donneesSon = MoteurSon.indexCacheHowl[NOM];
            if (!donneesSon) {
                var sonHowl = new Howl({
                    src: [MoteurSon.DOSSIER_MUSIQUE + NOM + ".mp3"],
                    onloaderror: function (ID, MESSAGE) {
                    }
                });
                donneesSon = { datePremier: 0, nombre: 0, sonHowl: sonHowl };
                MoteurSon.indexCacheHowl[NOM] = donneesSon;
            }
        };
        MoteurSon.jouerMusique = function (NOM, VOLUME, LECTURE_AUTO) {
            if (VOLUME === void 0) { VOLUME = 1; }
            if (LECTURE_AUTO === void 0) { LECTURE_AUTO = true; }
            return this.jouerSon(NOM, MoteurSon.CANAL_MUSIQUE, VOLUME, 0, LECTURE_AUTO, 1);
        };
        MoteurSon.jouerMusiqueAmbiance = function (NOM, VOLUME, LECTURE_AUTO) {
            if (LECTURE_AUTO === void 0) { LECTURE_AUTO = true; }
            return this.jouerSon(NOM, MoteurSon.CANAL_AMBIANCE, VOLUME, 0, LECTURE_AUTO);
        };
        MoteurSon.jouerEffet = function (NOM, VOLUME, FREQUENCE, LECTURE_AUTO) {
            if (VOLUME === void 0) { VOLUME = 1; }
            if (FREQUENCE === void 0) { FREQUENCE = 200; }
            if (LECTURE_AUTO === void 0) { LECTURE_AUTO = true; }
            return this.jouerSon(NOM, MoteurSon.CANAL_EFFET, VOLUME, FREQUENCE, LECTURE_AUTO);
        };
        MoteurSon.attenuerSonDistant = function (VOLUME, DISTANCE, DISTANCE_MAX) {
            var volume = Math.max(1 - DISTANCE / DISTANCE_MAX, 0);
            return volume * volume * VOLUME;
        };
        MoteurSon.canalParChaine = function (NOM_CANAL) {
            switch (NOM_CANAL.toUpperCase()) {
                case "MUSIQUE":
                    return MoteurSon.CANAL_MUSIQUE;
                case "AMBIANCE":
                    return MoteurSon.CANAL_AMBIANCE;
                case "EFFET":
                    return MoteurSon.CANAL_EFFET;
                default:
                    return null;
            }
        };
        MoteurSon.jouerSon = function (NOM, CANAL, VOLUME, FREQUENCE, LECTURE_AUTO, C) {
            if (VOLUME === void 0) { VOLUME = 1; }
            if (FREQUENCE === void 0) { FREQUENCE = 200; }
            if (LECTURE_AUTO === void 0) { LECTURE_AUTO = true; }
            if (C === void 0) { C = 0; }
            var temps = Date.now();
            if (MoteurSon.initialisationRequise) {
                MoteurSon.initialisationRequise = false;
                Howler.volume(MoteurSon.VOLUME_GENERAL);
            }
            this.preparerCache(NOM);
            var donneesSon = MoteurSon.indexCacheHowl[NOM];
            var volumeFrequence = 1;
            if (FREQUENCE) {
                if (temps - donneesSon.datePremier < FREQUENCE) {
                    if (donneesSon.nombre >= MoteurSon.NOMBRE_SON_SIMULTANES) {
                        return null;
                    }
                    volumeFrequence = MoteurSon.VOLUME_SUPERPOSITION;
                    donneesSon.nombre++;
                }
                else {
                    donneesSon.datePremier = temps;
                    donneesSon.nombre = 1;
                }
            }
            var son = new Son_1.Son(NOM, CANAL, donneesSon.sonHowl, VOLUME * volumeFrequence);
            if (LECTURE_AUTO) {
                son.lecture();
            }
            return son;
        };
        MoteurSon.CANAL_MUSIQUE = new Canal(1);
        MoteurSon.CANAL_AMBIANCE = new Canal(2);
        MoteurSon.CANAL_EFFET = new Canal(3);
        MoteurSon.VOLUME_GENERAL = 0.7;
        MoteurSon.VOLUME_SUPERPOSITION = 0.3;
        MoteurSon.NOMBRE_SON_SIMULTANES = 10;
        MoteurSon.DOSSIER_MUSIQUE = "./ressources/sons/";
        MoteurSon.DISTANCE_MAX_VOLUME_DYNAMIQUE = 1000;
        MoteurSon.initialisationRequise = true;
        MoteurSon.indexCacheHowl = {};
        MoteurSon.canaux = {
            1: MoteurSon.CANAL_MUSIQUE,
            2: MoteurSon.CANAL_AMBIANCE,
            3: MoteurSon.CANAL_EFFET
        };
        return MoteurSon;
    }());
    exports.default = MoteurSon;
});
//# sourceMappingURL=MoteurSon.js.map