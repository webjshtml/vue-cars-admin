let marker = null;
export function amapSetMarker(lnglat ,map){
    if(marker) {
        map.remove(marker);
        marker = null;
    }
    marker = new AMap.Marker({
        position: [lnglat.lng, lnglat.lat]
    })
    map.add(marker);
    map.setFitView();
}

export function amapClearMarker(map){
    if(marker) {
        map.remove(marker);
        marker = null;
    }
}