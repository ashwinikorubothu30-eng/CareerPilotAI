package com.careerpilot.dto;

public class BulletImproveDtos {

    public static class Request {
        private String originalBullet;
        private String targetRole;

        public Request() {}
        public Request(String originalBullet, String targetRole) {
            this.originalBullet = originalBullet;
            this.targetRole = targetRole;
        }

        public String getOriginalBullet() { return originalBullet; }
        public void setOriginalBullet(String originalBullet) { this.originalBullet = originalBullet; }

        public String getTargetRole() { return targetRole; }
        public void setTargetRole(String targetRole) { this.targetRole = targetRole; }
    }

    public static class Response {
        private String original;
        private String improved;
        private String formulaUsed;
        private String actionVerb;
        private String quantifiableMetric;

        public Response() {}

        public Response(String original, String improved, String formulaUsed, String actionVerb, String quantifiableMetric) {
            this.original = original;
            this.improved = improved;
            this.formulaUsed = formulaUsed;
            this.actionVerb = actionVerb;
            this.quantifiableMetric = quantifiableMetric;
        }

        public String getOriginal() { return original; }
        public void setOriginal(String original) { this.original = original; }

        public String getImproved() { return improved; }
        public void setImproved(String improved) { this.improved = improved; }

        public String getFormulaUsed() { return formulaUsed; }
        public void setFormulaUsed(String formulaUsed) { this.formulaUsed = formulaUsed; }

        public String getActionVerb() { return actionVerb; }
        public void setActionVerb(String actionVerb) { this.actionVerb = actionVerb; }

        public String getQuantifiableMetric() { return quantifiableMetric; }
        public void setQuantifiableMetric(String quantifiableMetric) { this.quantifiableMetric = quantifiableMetric; }
    }
}
