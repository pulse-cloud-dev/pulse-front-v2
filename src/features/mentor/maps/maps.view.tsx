// import React, { useEffect, useRef } from "react";

// interface MapsViewProps {}

// export const MapsView = (props: MapsViewProps) => {
//   return (
//     <article className="sub-layout__content">
//       지도
//       <section></section>
//     </article>
//   );
// };

import { useState, useEffect, useRef } from "react";

interface NaverMap {
  map: naver.maps.Map | null;
}

export const MapsView = () => {
  const mapRef = useRef<NaverMap>({ map: null });

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions: naver.maps.MapOptions = {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };

      mapRef.current.map = new naver.maps.Map("map", mapOptions);
    };

    // 스크립트가 이미 로드되어 있는 경우
    if (window.naver && window.naver.maps) {
      initializeMap();
    } else {
      // 스크립트 동적 로드
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=%VITE_NAVER_CLIENT_ID%`;
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
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};
