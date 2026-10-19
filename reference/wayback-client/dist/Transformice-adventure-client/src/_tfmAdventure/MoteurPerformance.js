define(["require", "exports", "../_monde/MondeADV"], function (require, exports, MondeADV_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MoteurPerformance = (function () {
        function MoteurPerformance() {
            this.optionShaderEauActif = true;
            this.optionShaderLumiereActif = true;
            this.optimisationAuto = true;
            this.prochaine1s = 0;
            this.prochaine10s = 0;
            this.prochaine30s = 0;
            this.ips1s = 60;
            this.ips10s = 60;
            this.ips30s = 60;
            this.compteurImage = 0xFFFFFFFF;
        }
        MoteurPerformance.prototype.boucle = function (TEMPS) {
            if (this.compteurImage >= 0xFFFFFFFF) {
                this.compteurImage = 0;
                this.prochaine1s = TEMPS + 1000;
                this.prochaine10s = TEMPS + 10000;
                this.prochaine30s = TEMPS + 30000;
                this.debut1s = 0;
                this.debut10s = 0;
                this.debut30s = 0;
            }
            this.compteurImage++;
            if (TEMPS > this.prochaine1s) {
                this.prochaine1s = TEMPS + 1000;
                this.ips1s = this.compteurImage - this.debut1s;
                this.debut1s = this.compteurImage;
                this.verifierActivationShaderEau();
            }
            if (TEMPS > this.prochaine10s) {
                this.prochaine10s = TEMPS + 10000;
                this.ips10s = (this.compteurImage - this.debut10s) / 10;
                this.debut10s = this.compteurImage;
                this.boucle10s(this.ips10s);
            }
            if (TEMPS > this.prochaine30s) {
                this.prochaine30s = TEMPS + 30000;
                this.ips30s = (this.compteurImage - this.debut30s) / 30;
                this.debut30s = this.compteurImage;
                this.boucle30s(this.ips30s);
            }
        };
        MoteurPerformance.prototype.boucle10s = function (IPS) {
            if (IPS >= 45) {
                this.verifierActivationShaderEau();
            }
            else if (IPS < 35) {
                this.verifierActivationShaderEau();
            }
            if (IPS >= 40) {
                if (MoteurPerformance.sous30IPS) {
                    MoteurPerformance.sous30IPS = false;
                    this.verifierActivationShadersLumiere();
                }
            }
            else if (IPS < 30) {
                if (!MoteurPerformance.sous30IPS) {
                    MoteurPerformance.sous30IPS = true;
                    this.verifierActivationShadersLumiere();
                }
            }
        };
        MoteurPerformance.prototype.boucle30s = function (IPS) {
        };
        MoteurPerformance.prototype.verifierActivationShaders = function () {
            this.verifierActivationShaderEau();
            this.verifierActivationShadersLumiere();
        };
        MoteurPerformance.prototype.verifierActivationShadersLumiere = function () {
            if (!MondeADV_1.MondeADV.instance) {
                return;
            }
            var desactivationAuto = this.optimisationAuto && this.ips10s < 30;
            var activation = !desactivationAuto && this.optionShaderLumiereActif;
            if (MondeADV_1.MondeADV.instance.shaderLumiere1.enabled != activation) {
                MondeADV_1.MondeADV.instance.shaderLumiere1.enabled = activation;
                MondeADV_1.MondeADV.instance.shaderLumiere2.enabled = activation;
                MondeADV_1.MondeADV.instance.coucheOmbre.visible = activation;
            }
        };
        MoteurPerformance.prototype.verifierActivationShaderEau = function () {
            if (!MondeADV_1.MondeADV.instance) {
                return;
            }
            var desactivationAuto = this.optimisationAuto && this.ips10s < 35;
            var activation = !desactivationAuto && this.optionShaderEauActif && MondeADV_1.MondeADV.instance.coucheEau.children.length > 0;
            if (MondeADV_1.MondeADV.instance.shaderEau.enabled != activation) {
                MondeADV_1.MondeADV.instance.shaderEau.enabled = activation;
            }
        };
        MoteurPerformance.prototype.changerOptionShaderLumiere = function (ACTIF) {
            this.optionShaderLumiereActif = ACTIF;
            this.verifierActivationShaders();
        };
        MoteurPerformance.prototype.changerOptionShaderEau = function (ACTIF) {
            this.optionShaderEauActif = ACTIF;
            this.verifierActivationShaders();
        };
        MoteurPerformance.prototype.recupActivationOptionShaderLumiere = function () {
            return this.optionShaderLumiereActif;
        };
        MoteurPerformance.prototype.recupActivationOptionShaderEau = function () {
            return this.optionShaderEauActif;
        };
        MoteurPerformance.sous30IPS = false;
        return MoteurPerformance;
    }());
    exports.MoteurPerformance = MoteurPerformance;
});
//# sourceMappingURL=MoteurPerformance.js.map