define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InfoCommuneElement = (function () {
        function InfoCommuneElement() {
        }
        InfoCommuneElement.prototype.deserialisation = function (MSG) {
            this.lumiere = MSG.l8();
            this.typeVent = MSG.l8();
            this.symetrie = MSG.lBool();
            this.rotation = MSG.l8() * 0.02617993;
            if (MSG.lBool()) {
                this.teinture = MSG.l32s();
                this.alpha = MSG.l8() / 0xFF;
            }
            if (MSG.lBool()) {
                this.sonBoucle = MSG.lChaine();
                this.volumeSon = MSG.l8() / 100;
            }
        };
        return InfoCommuneElement;
    }());
    exports.InfoCommuneElement = InfoCommuneElement;
});
//# sourceMappingURL=InfoCommuneElement.js.map