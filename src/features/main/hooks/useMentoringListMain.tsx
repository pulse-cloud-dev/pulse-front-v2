import { useQuery } from "@tanstack/react-query";
import { getMentoringListMain } from "../../../networks/apis/mentoringListMain.api";
import { MentoringListItemDto } from "@/contracts/response/mentoring-list/mentoring-list.reseponse.dto";


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

// mapping 함수
const mapMentoringList = (list: MentoringListItemDto[]): MentoringMain[] => {
    return list.map((item) => ({
      mentoringId: item.mentoring_id,
      lectureType: item.lecture_type,
      title: item.title,
      mentorNickname: item.mentor_nickname,
      deadlineDate: item.deadline_time.slice(0, 10),
      mentorJob: item.mentor_job,
      mentorCareer: item.mentor_career_total_year,
      mentorProfileImage: item.mentor_profile_image,
      onlinePlatform: item.lecture_type === "ONLINE" ? item.online_platform : "",
      region: item.lecture_type === "OFFLINE" ? "장소 미정" : "",
    }));
  };
  
  // useQuery hook
  export const useMentoringListMain = () => {
    return useQuery<MentoringMain[]>({
      queryKey: ["mentoringListMain"],
      queryFn: async () => {
        const res = await getMentoringListMain();
        return mapMentoringList(res.body);
      },
      
    });
  };