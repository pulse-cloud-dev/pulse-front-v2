interface MentoringMain {
  mentoringId: string;
  lectureType: "ONLINE" | "OFFLINE";
  title: string;
  mentorNickname: string;
  deadlineDate: string;
  mentorJob: string;
  mentorCareer: number;
  mentorProfileImage: string;
  onlinePlatform: string;
  region: string;
}

export const dummyMentoringList : MentoringMain[] =[
    {
      mentoringId: "mnt001",
      lectureType: "OFFLINE",
      title: "UX 디자이너로 커리어 시작하기",
      mentorProfileImage: "/images/mentors/ux1.png",
      mentorJob: "UX 디자이너",
      mentorCareer: 5,
      onlinePlatform: "", // OFFLINE이므로 빈 문자열
      region: "현장 진행",
      mentorNickname: "디자이너정",
      deadlineDate: "2025-08-10",
    },
    {
      mentoringId: "mnt002",
      lectureType: "OFFLINE",
      title: "스타트업에서 PM으로 살아남기",
      mentorProfileImage: "/images/mentors/pm1.png",
      mentorJob: "프로덕트 매니저",
      mentorCareer: 7,
      onlinePlatform: "",
      region: "서울 강남",
      mentorNickname: "PM마스터",
      deadlineDate: "2025-08-12",
    },
    {
      mentoringId: "mnt003",
      lectureType: "OFFLINE",
      title: "백엔드 개발 실무 팁 대방출",
      mentorProfileImage: "/images/mentors/dev1.png",
      mentorJob: "백엔드 개발자",
      mentorCareer: 4,
      onlinePlatform: "",
      region: "디캠프 선릉",
      mentorNickname: "백개발러",
      deadlineDate: "2025-08-15",
    },
    {
      mentoringId: "mnt004",
      lectureType: "OFFLINE",
      title: "AI/데이터 직무 이직 전략",
      mentorProfileImage: "/images/mentors/data1.png",
      mentorJob: "데이터 사이언티스트",
      mentorCareer: 6,
      onlinePlatform: "",
      region: "패스트파이브 홍대",
      mentorNickname: "데싸니니",
      deadlineDate: "2025-08-09",
    },
    {
      mentoringId: "mnt005",
      lectureType: "OFFLINE",
      title: "프론트엔드 개발자 커리어 관리",
      mentorProfileImage: "/images/mentors/front1.png",
      mentorJob: "프론트엔드 개발자",
      mentorCareer: 3,
      onlinePlatform: "",
      region: "위워크 을지로",
      mentorNickname: "프개팅",
      deadlineDate: "2025-08-14",
    },
    {
      mentoringId: "mnt006",
      lectureType: "OFFLINE",
      title: "디자인 포트폴리오 피드백",
      mentorProfileImage: "/images/mentors/design2.png",
      mentorJob: "그래픽 디자이너",
      mentorCareer: 8,
      onlinePlatform: "",
      region: "홍대 무브홀",
      mentorNickname: "감성디자이너",
      deadlineDate: "2025-08-20",
    },
    {
      mentoringId: "mnt007",
      lectureType: "OFFLINE",
      title: "해외 취업을 위한 이력서 전략",
      mentorProfileImage: "/images/mentors/global1.png",
      mentorJob: "해외취업 컨설턴트",
      mentorCareer: 10,
      onlinePlatform: "",
      region: "코엑스 컨퍼런스룸",
      mentorNickname: "글로벌코치",
      deadlineDate: "2025-08-25",
    },
    {
      mentoringId: "mnt008",
      lectureType: "OFFLINE",
      title: "IT 커리어 로드맵 설계",
      mentorProfileImage: "/images/mentors/it1.png",
      mentorJob: "IT 컨설턴트",
      mentorCareer: 12,
      onlinePlatform: "",
      region: "신촌 스타트업 캠퍼스",
      mentorNickname: "진로멘토짱",
      deadlineDate: "2025-08-30",
    }
  ];
