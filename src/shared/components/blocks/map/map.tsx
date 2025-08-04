import { useEffect, useRef } from "react";

interface NaverMap {
  map: naver.maps.Map | null;
}
interface regionType {
  region: string[];
}
export const Map = (region: regionType) => {
  const mapRef = useRef<NaverMap>({ map: null });
  console.log(region); //이거 좌표 전환헤서 데이터 불러옴

  // region.region.forEach((item) => {

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions: naver.maps.MapOptions = {
        center: new naver.maps.LatLng(37.5666103, 126.9783882),
        zoom: 10,
      };

      mapRef.current.map = new naver.maps.Map("map", mapOptions);
    };

    // 스크립트가 이미 로드되어 있는 경우
    if (window.naver && window.naver.maps) {
      initializeMap();
    } else {
      const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;

      // 스크립트 동적 로드
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
      script.async = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (mapRef.current.map) {
        mapRef.current.map = null;
      }
    };
  });

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};
