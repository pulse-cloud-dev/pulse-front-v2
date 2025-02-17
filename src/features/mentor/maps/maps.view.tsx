import { useState, useEffect, useRef } from "react";

interface NaverMap {
  map: naver.maps.Map | null;
}

interface MarkerClusterer {
  markers: naver.maps.Marker[];
  clusters: any[];
  map: naver.maps.Map | null;
}

export const MapsView = () => {
  const mapRef = useRef<NaverMap>({ map: null });
  const clustererRef = useRef<MarkerClusterer>({
    markers: [],
    clusters: [],
    map: null,
  });

  useEffect(() => {
    const initializeMap = (latitude: number, longitude: number) => {
      const mapOptions: naver.maps.MapOptions = {
        center: new naver.maps.LatLng(latitude, longitude),
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };

      mapRef.current.map = new naver.maps.Map("map", mapOptions);

      // 예시 마커 데이터 (실제 데이터로 교체 필요)
      const markerPositions = [
        { lat: 37.5665, lng: 126.978 }, // 서울시청
        { lat: 37.5707, lng: 126.9762 }, // 광화문
        { lat: 37.5139, lng: 127.0606 }, // 잠실
        { lat: 37.5276, lng: 127.0276 }, // 강남역
        { lat: 37.5311, lng: 126.9708 }, // 용산역
        { lat: 37.5578, lng: 127.0077 }, // 동대문
        { lat: 37.5449, lng: 126.9491 }, // 여의도
        { lat: 37.5796, lng: 126.977 }, // 경복궁
        { lat: 37.5642, lng: 127.0065 }, // 청계천
        { lat: 37.5511, lng: 127.0394 }, // 삼성동
        { lat: 37.5984, lng: 126.9783 }, // 북촌한옥마을
        { lat: 37.527, lng: 127.0441 }, // 코엑스
        { lat: 37.5566, lng: 126.9387 }, // 홍대입구
        { lat: 37.5633, lng: 127.0371 }, // 성수동
        { lat: 37.5879, lng: 127.0168 }, // 대학로
        { lat: 37.5088, lng: 127.0632 }, // 롯데월드
        { lat: 37.5149, lng: 126.902 }, // 목동
        { lat: 37.5926, lng: 126.9887 }, // 종로3가
        { lat: 37.5651, lng: 127.0474 }, // 건대입구
        { lat: 37.5281, lng: 126.8658 }, // 김포공항
      ];

      // MarkerClustering 스크립트 로드
      loadMarkerClustering().then(() => {
        createMarkers(markerPositions);
      });
    };

    const loadMarkerClustering = () => {
      return new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src =
          "https://navermaps.github.io/maps.js.ncp/docs/js/MarkerClustering.js";
        script.async = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    const createMarkers = (positions: { lat: number; lng: number }[]) => {
      const markers = positions.map(
        (position) =>
          new naver.maps.Marker({
            position: new naver.maps.LatLng(position.lat, position.lng),
            map: mapRef.current.map,
          })
      );

      // MarkerClustering 설정
      if (window.MarkerClustering) {
        const clusterer = new window.MarkerClustering({
          minClusterSize: 2, // 클러스터 최소 크기
          maxZoom: 13, // 클러스터가 해제되는 최대 줌 레벨
          map: mapRef.current.map,
          markers: markers,
          disableClickZoom: false, // 클러스터 클릭 시 줌 동작 활성화
          gridSize: 120, // 클러스터 그리드 크기
          icons: [
            // 클러스터 아이콘 설정
            {
              content: `<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:rgba(51,51,51,0.85);border-radius:20px;">
                        ${markers.length}
                      </div>`,
              size: new naver.maps.Size(40, 40),
              anchor: new naver.maps.Point(20, 20),
            },
          ],
          indexGenerator: [10, 100, 200, 500, 1000], // 클러스터 크기별 경계값
        });

        clustererRef.current = {
          markers,
          clusters: [clusterer],
          map: mapRef.current.map,
        };
      }
    };
    // 현재 위치 요청
    const getCurrentLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            initializeMap(latitude, longitude);
          },
          (error) => {
            console.error("위치 정보를 가져오는데 실패했습니다:", error);
            // 기본 위치(네이버 본사)로 폴백
            initializeMap(37.3595704, 127.105399);
          }
        );
      } else {
        console.log("Geolocation이 지원되지 않는 브라우저입니다.");
        initializeMap(37.3595704, 127.105399);
      }
    };

    // 스크립트가 이미 로드되어 있는 경우
    if (window.naver && window.naver.maps) {
      getCurrentLocation();
    } else {
      // 스크립트 동적 로드
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=%VITE_NAVER_CLIENT_ID%`;
      script.async = true;
      script.onload = () => getCurrentLocation();
      document.head.appendChild(script);
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      // 컴포넌트 언마운트 시 정리
      if (clustererRef.current.clusters.length > 0) {
        clustererRef.current.clusters.forEach((clusterer) => {
          clusterer.setMap(null);
        });
      }
      clustererRef.current.markers.forEach((marker) => {
        marker.setMap(null);
      });
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};
