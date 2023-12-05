import {
  AiFillCaretUp,
  AiFillPicture,
  AiFillPlusCircle,
  AiOutlineArrowRight,
  AiOutlineLeft,
  AiOutlineMail,
  AiOutlineRight,
} from 'react-icons/ai';
import {
  BiCalendarEvent,
  BiCurrentLocation,
  BiInfoCircle,
  BiMinusCircle,
  BiSearchAlt2,
  BiWater,
} from 'react-icons/bi';
import { BsFillBuildingFill, BsLayersHalf, BsLink45Deg } from 'react-icons/bs';
import { CgMathMinus, CgMathPlus } from 'react-icons/cg';
import { FaTrash } from 'react-icons/fa';
import { FiClock, FiDownload, FiPhone, FiUser, FiUsers } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GoLocation } from 'react-icons/go';
import { HiOutlineArrowNarrowLeft, HiOutlineLocationMarker } from 'react-icons/hi';
import { IoIosArrowDown, IoMdCalendar } from 'react-icons/io';
import { IoCloseOutline, IoLocationSharp } from 'react-icons/io5';
import {
  MdArrowBack,
  MdArrowBackIos,
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdAttachFile,
  MdBusiness,
  MdDone,
  MdEmail,
  MdExitToApp,
  MdKeyboardArrowDown,
  MdList,
  MdMoreVert,
  MdOpenInNew,
  MdOutlineCampaign,
  MdOutlineDelete,
  MdOutlineDescription,
  MdOutlineFullscreen,
  MdOutlineFullscreenExit,
  MdOutlineGroups,
  MdOutlineInsertPhoto,
  MdOutlinePerson,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdSettings,
  MdSplitscreen,
  MdTune,
  MdUnfoldMore,
  MdViewModule,
} from 'react-icons/md';
import { RiArrowDownSFill, RiArrowDownSLine, RiMap2Fill, RiTempColdLine } from 'react-icons/ri';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted, TiThMenu } from 'react-icons/ti';
import { VscVerified } from 'react-icons/vsc';
export interface IconProps {
  name: string;
  className?: string;
  fun?: () => void;
}

const Icon = ({ name, className, fun }: IconProps) => {
  switch (name) {
    case 'temp':
      return <RiTempColdLine className={className} />;
    case 'layer':
      return <BsLayersHalf className={className} />;
    case 'location':
      return <HiOutlineLocationMarker className={className} />;
    case 'date':
      return <BiCalendarEvent className={className} />;
    case 'info':
      return <BiInfoCircle className={className} />;
    case 'download':
      return <FiDownload className={className} />;
    case 'water':
      return <BiWater className={className} />;
    case 'verified':
      return <VscVerified className={className} />;
    case 'plus':
      return <CgMathPlus className={className} />;
    case 'minus':
      return <CgMathMinus className={className} />;
    case 'search':
      return <BiSearchAlt2 className={className} />;
    case 'Searchlocation':
      return <GoLocation className={className} />;
    case 'MapLocation':
      return <IoLocationSharp className={className} />;
    case 'filter':
      return <MdTune className={className} />;
    case 'tenant':
      return <BsFillBuildingFill className={className} />;
    case 'delete':
      return <BiMinusCircle className={className} />;
    case 'calendar':
      return <IoMdCalendar className={className} />;
    case 'arrowDown':
      return <RiArrowDownSLine className={className} />;
    case 'miniArrowDown':
      return <RiArrowDownSFill className={className} />;
    case 'arrowUp':
      return <AiFillCaretUp className={className} />;
    case 'close':
      return <IoCloseOutline className={className} />;
    case 'map':
      return <RiMap2Fill className={className} />;
    case 'current':
      return <BiCurrentLocation className={className} />;
    case 'back':
      return <MdArrowBackIosNew className={className} />;
    case 'backMobile':
      return <MdArrowBack className={className} />;
    case 'phone':
      return <FiPhone className={className} />;
    case 'email':
      return <MdEmail className={className} />;
    case 'user':
      return <FiUser className={className} />;
    case 'users':
      return <FiUsers className={className} />;
    case 'modules':
      return <MdViewModule className={className} />;
    case 'time':
      return <FiClock className={className} />;
    case 'exit':
      return <MdExitToApp className={className} />;
    case 'company':
      return <MdBusiness className={className} />;
    case 'userEmail':
      return <AiOutlineMail className={className} />;
    case 'dropdownArrow':
      return <MdKeyboardArrowDown className={className} />;
    case 'connect':
      return <BsLink45Deg className={className} />;
    case 'add':
      return <AiFillPlusCircle className={className} />;
    case 'more':
      return <MdMoreVert className={className} />;
    case 'menu':
      return <TiThMenu className={className} />;
    case 'down':
      return <IoIosArrowDown className={className} />;
    case 'attachment':
      return <MdAttachFile className={className} />;
    case 'active':
      return <MdDone className={className} />;
    case 'list':
      return <MdList className={className} />;
    case 'showMore':
      return <MdUnfoldMore className={className} />;
    case 'unsorted':
      return <TiArrowUnsorted className={className} />;
    case 'sortedUp':
      return <TiArrowSortedUp className={className} />;
    case 'sortedDown':
      return <TiArrowSortedDown className={className} />;
    case 'burger':
      return <GiHamburgerMenu className={className} />;
    case 'forward':
      return <MdArrowForwardIos className={className} />;
    case 'backward':
      return <MdArrowBackIos className={className} />;
    case 'visibleOn':
      return <MdOutlineVisibility className={className} />;
    case 'visibleOff':
      return <MdOutlineVisibilityOff className={className} />;
    case 'returnArrow':
      return <HiOutlineArrowNarrowLeft className={className} />;
    case 'splitView':
      return <MdSplitscreen className={className} />;
    case 'picture':
      return <AiFillPicture className={className} />;
    case 'remove':
      return <FaTrash className={className} />;
    case 'arrowRight':
      return <AiOutlineArrowRight className={className} />;
    case 'photo':
      return <MdOutlineInsertPhoto className={className} />;
    case 'description':
      return <MdOutlineDescription className={className} />;
    case 'campaign':
      return <MdOutlineCampaign className={className} />;
    case 'group':
      return <MdOutlineGroups className={className} />;
    case 'person':
      return <MdOutlinePerson className={className} />;
    case 'leftArrow':
      return <AiOutlineLeft className={className} />;
    case 'rightArrow':
      return <AiOutlineRight className={className} />;
    case 'deleteItem':
      return <MdOutlineDelete className={className} />;
    case 'settings':
      return <MdSettings className={className} />;
    case 'fullscreen':
      return <MdOutlineFullscreen className={className} />;
    case 'exitFullScreen':
      return <MdOutlineFullscreenExit className={className} />;
    case 'open':
      return <MdOpenInNew className={className} />;
    default:
      return null;
  }
};

export default Icon;
