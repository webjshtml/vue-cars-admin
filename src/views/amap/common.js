export function getLngLat(e){
    return {
        log: e.lnglat.getLng(),
        lat: e.lnglat.getLat(),
        value: e.lnglat.getLng() + ',' + e.lnglat.getLat()
    }
}