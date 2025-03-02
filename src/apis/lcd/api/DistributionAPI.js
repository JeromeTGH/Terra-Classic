
export class DistributionAPI {

    // Constructeur
    constructor (apiRqt, paths) {
        this.apiRequester = apiRqt;
        this.paths = paths;
    }


    // Exemple d'appel : https://terra-classic-lcd.publicnode.com/cosmos/distribution/v1beta1/params
    async getDistributionParameters(params = new URLSearchParams()) {
        return this.apiRequester.get(this.paths.getDistributionParameters, params);
    }

    // Exemple d'appel : https://terra-classic-lcd.publicnode.com/cosmos/distribution/v1beta1/community_pool
    async getDistributionCommunityPool(params = new URLSearchParams()) {
        return this.apiRequester.get(this.paths.getDistributionCommunityPool, params);
    }

    // Exemple d'appel : https://terra-classic-lcd.publicnode.com/cosmos/distribution/v1beta1/delegators/terra12gw6wuav6cyezly29t66tpnty5q2ny3d2r88gd/rewards
    async getPendingRewards(accountAdr, params = new URLSearchParams()) {
        return this.apiRequester.get(this.paths.getPendingRewards.replace('***', accountAdr), params);
    }


}