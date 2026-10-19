define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Look = (function () {
        function Look(MSG) {
            this.listeElement = [];
            this.indexMorceauParEmplacement = {};
            if (MSG) {
                this.deserialisation(MSG);
            }
        }
        Look.prototype.deserialisation = function (MSG) {
            var nb = MSG.l8();
            for (var i = 0; i < nb; i++) {
                var emplacement = MSG.lChaine();
                var nbMorceau = MSG.l8();
                var liste = [];
                this.indexMorceauParEmplacement[emplacement] = liste;
                for (var k = 0; k < nbMorceau; k++) {
                    var morceau = {};
                    morceau.nom = emplacement;
                    morceau.code = MSG.l16();
                    morceau.x = MSG.l16s();
                    morceau.y = MSG.l16s();
                    liste.push(morceau);
                }
            }
        };
        return Look;
    }());
    exports.Look = Look;
    var ElementLook = (function () {
        function ElementLook(MSG) {
            this.listeMorceaux = [];
            if (MSG) {
                this.identifiant = MSG.l16();
                this.ordre = MSG.l8s();
                var nb = MSG.l8();
                if (nb) {
                    for (var i = 0; i < nb; i++) {
                        var morceau = {};
                        morceau.code = this.identifiant;
                        morceau.nom = MSG.lChaine();
                        morceau.x = MSG.l16s();
                        morceau.y = MSG.l16s();
                        morceau.ordre = MSG.l8s();
                        this.listeMorceaux.push(morceau);
                    }
                }
            }
        }
        return ElementLook;
    }());
    exports.ElementLook = ElementLook;
});
//# sourceMappingURL=Look.js.map