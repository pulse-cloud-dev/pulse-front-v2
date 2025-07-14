
export interface MentoringMetaCardProps {
  price: number;
  period: string;
  location: string;
  deadline: string;
  recruitNumber: number;
  applyNumber: number;
  onClickInquiry?: () => void;
  onClickApply?: () => void;
  mentorName: string;  
  title: string;        
  isLogin: boolean; // 회원 여부
}