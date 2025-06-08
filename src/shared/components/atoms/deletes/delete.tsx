interface DeleteIconProps {
  size?: number;         
  color?: string;        
  className?: string;    
  onClick?: () => void;  
}

export const DeleteIcon = ({
  size = 12,
  color = "#9E9E9E",
  className = "",
  onClick,
}: DeleteIconProps) => {
  return (
    <svg
      width={size}
      height={(size * 11) / 12} // 비율 유지
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={`${className}`}
      style={{cursor: "pointer"}}
      onClick={onClick}
    >
      <path
        d="M10.9227 1.42465C11.157 1.19034 11.157 0.810441 10.9227 0.576127C10.6884 0.341812 10.3085 0.341812 10.0742 0.576127L5.99844 4.65186L1.9227 0.576127C1.68839 0.341812 1.30849 0.341812 1.07417 0.576127C0.839859 0.810441 0.839859 1.19034 1.07417 1.42465L5.14991 5.50039L1.07417 9.57613C0.839859 9.81044 0.839859 10.1903 1.07417 10.4247C1.30849 10.659 1.68839 10.659 1.9227 10.4247L5.99844 6.34892L10.0742 10.4247C10.3085 10.659 10.6884 10.659 10.9227 10.4247C11.157 10.1903 11.157 9.81044 10.9227 9.57613L6.84697 5.50039L10.9227 1.42465Z"
        fill={color}
      />
    </svg>
  );
};
