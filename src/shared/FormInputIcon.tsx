import MC from "@/assets/icons/MultipleChoiceIcon";
import RatingIcon from "@/assets/icons/rating";
import LongTextIcon from "@/assets/icons/longTextIcon";
import ShortTextIcon from "@/assets/icons/shortTextIcon";
import DropDownIcon from "@/assets/icons/DropDownIcon";
import CheckIcon from "@/assets/icons/CheckIcon";

const iconMap: { [key: string]: JSX.Element } = {
  rating: <RatingIcon color="#ffffff" />,
  yesno: <CheckIcon />,
  dropdown: <DropDownIcon />,
  multipleChoice: <MC />,
  shortText: <ShortTextIcon />,
  longText: <LongTextIcon />,
};

export const IconDisplay: React.FC<{ inputType: string }> = ({ inputType }) => {
  return iconMap[inputType] || null;
};
