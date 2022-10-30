import * as React from "react";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Cancel from "@material-ui/icons/Cancel";
import Add from "@material-ui/icons/Add";
import Check from "@material-ui/icons/Check";
import Info from "@material-ui/icons/Info";
import LoopIcon from "@material-ui/icons/Loop";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Copy from "@material-ui/icons/FileCopyOutlined";
import PrintIcon from "@material-ui/icons/Print";
import EmailIcon from "@material-ui/icons/Email";
import EmailOutlinedIcon from "@material-ui/icons/EmailTwoTone";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import PersonIcon from "@material-ui/icons/Person";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import CheckOutlined from "@material-ui/icons/CheckCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import GetAppIcon from "@material-ui/icons/GetApp";
import SendIcon from "@material-ui/icons/Send";
import KeyboardBackspaceRoundedIcon from "@material-ui/icons/KeyboardBackspaceRounded";
import UndoIcon from "@material-ui/icons/Undo";
import CallTwoToneIcon from "@material-ui/icons/CallTwoTone";
import LocalShippingTwoToneIcon from "@material-ui/icons/LocalShippingTwoTone";
import TextsmsTwoToneIcon from "@material-ui/icons/TextsmsTwoTone";
import ImageIcon from "@material-ui/icons/Image";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import MenuIcon from "@material-ui/icons/Menu";
import HistoryIcon from "@material-ui/icons/History";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import BusinessIcon from "@material-ui/icons/Business";
import SettingsIcon from "@material-ui/icons/Settings";
import BookmarksRoundedIcon from "@material-ui/icons/BookmarksRounded";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ShareIcon from "@material-ui/icons/Share";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import CloseIcon from "@material-ui/icons/Close";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import PublicIcon from "@material-ui/icons/Public";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import PinterestIcon from "@material-ui/icons/Pinterest";
import YouTubeIcon from "@material-ui/icons/YouTube";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import RemoveIcon from "@material-ui/icons/Remove";
import CallRoundedIcon from '@material-ui/icons/CallRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import SentimentSatisfiedRoundedIcon from '@material-ui/icons/SentimentSatisfiedRounded';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import RedditIcon from '@material-ui/icons/Reddit';
import TelegramIcon from '@material-ui/icons/Telegram';

export type IconType =
  | "delete"
  | "add"
  | "check"
  | "edit"
  | "cancel"
  | "info"
  | "loop"
  | "view"
  | "copy"
  | "print"
  | "email"
  | "file"
  | "person"
  | "persons"
  | "city"
  | "checkOutlined"
  | "dots"
  | "download"
  | "send"
  | "backArrow"
  | "undo"
  | "emailOutlined"
  | "callOutlined"
  | "messageOutlined"
  | "busOutlined"
  | "arrowDown"
  | "arrowUp"
  | "arrowLeft"
  | "arrowRight"
  | "image"
  | "user"
  | "menu"
  | "notification"
  | "history"
  | "help"
  | "ship"
  | "radio"
  | "institute"
  | "setting"
  | "saved"
  | "facebook"
  | "linkedin"
  | "instagram"
  | "twitter"
  | "merge"
  | "like"
  | "share"
  | "close"
  | "dashboard"
  | "briefCase"
  | "search"
  | "dotsVertical"
  | "addPhoto"
  | "addPhotoCam"
  | "notificationsOutlined"
  | "PublicIcon"
  | "MailOutlineIcon"
  | "CallOutlinedIcon"
  | "PinterestIcon"
  | "YouTubeIcon"
  | "ArrowForwardIosIcon"
  | "ArrowBackIosIcon"
  | "CloudUploadIcon"
  | "CloudDownloadIcon"
  | "CheckCircle"
  | "hide"
  | "min"
  | "max"
  | "video"
  | "smile"
  | "microphone"
  | "camera"
  | "whatsapp"
  | "reddit"
  | "telegram"
  | "call" | "globe" | "arrowDropDown";

type Color = "inherit" | "primary" | "secondary" | "action" | "error" | "disabled";
type FontSize = "default" | "inherit" | "large" | "medium" | "small";
interface Props {
  readonly icon: IconType;
  readonly color?: Color;
  readonly fontSize?: FontSize;
  readonly className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly onClick?: (e: any) => void;
}
const MuiIcon: React.FC<Props> = props => {
  switch (props.icon) {
    case "delete":
      return <Delete classes={{ colorPrimary: props.className }} {...props} />;
    case "add":
      return <Add className={props.className} {...props} />;
    case "check":
      return <Check className={props.className} {...props} />;
    case "edit":
      return <Edit className={props.className} {...props} />;
    case "cancel":
      return <Cancel className={props.className} {...props} />;
    case "info":
      return <Info className={props.className} {...props} />;
    case "file":
      return <AttachFileIcon className={props.className} {...props} />;
    case "loop":
      return <LoopIcon className={props.className} {...props} />;
    case "view":
      return <VisibilityIcon className={props.className} {...props} />;
    case "hide":
      return <VisibilityOffIcon className={props.className} {...props} />;
    case "copy":
      return <Copy className={props.className} {...props} />;
    case "print":
      return <PrintIcon className={props.className} {...props} />;
    case "email":
      return <EmailIcon className={props.className} {...props} />;
    case "emailOutlined":
      return <EmailOutlinedIcon className={props.className} {...props} />;
    case "person":
      return <PersonIcon className={props.className} {...props} />;
    case "persons":
      return <PeopleAltIcon className={props.className} {...props} />;
    case "city":
      return <LocationCityIcon className={props.className} {...props} />;
    case "checkOutlined":
      return <CheckOutlined className={props.className} {...props} />;
    case "dots":
      return <MoreHorizIcon className={props.className} {...props} />;
    case "download":
      return <GetAppIcon className={props.className} {...props} />;
    case "send":
      return <SendIcon className={props.className} {...props} />;
    case "backArrow":
      return <KeyboardBackspaceRoundedIcon className={props.className} {...props} />;
    case "undo":
      return <UndoIcon className={props.className} {...props} />;
    case "callOutlined":
      return <CallTwoToneIcon className={props.className} {...props} />;
    case "messageOutlined":
      return <TextsmsTwoToneIcon className={props.className} {...props} />;
    case "busOutlined":
      return <LocalShippingTwoToneIcon className={props.className} {...props} />;
    case "image":
      return <ImageIcon className={props.className} {...props} />;
    case "arrowDown":
      return <KeyboardArrowDownIcon className={props.className} {...props} />;
    case "arrowUp":
      return <KeyboardArrowUpIcon className={props.className} {...props} />;
    case "arrowLeft":
      return <KeyboardArrowLeftIcon className={props.className} {...props} />;
    case "arrowRight":
      return <KeyboardArrowRightIcon className={props.className} {...props} />;
    case "user":
      return <PersonRoundedIcon className={props.className} {...props} />;
    case "help":
      return <HelpRoundedIcon className={props.className} {...props} />;
    case "menu":
      return <MenuIcon className={props.className} {...props} />;
    case "history":
      return <HistoryIcon className={props.className} {...props} />;
    case "notification":
      return <NotificationsIcon className={props.className} {...props} />;
    case "merge":
      return <CallMergeIcon className={props.className} {...props} />;
    case "ship":
      return <LocalShippingIcon className={props.className} {...props} />;
    case "radio":
      return <RadioButtonUncheckedIcon className={props.className} {...props} />;
    case "institute":
      return <BusinessIcon className={props.className} {...props} />;
    case "setting":
      return <SettingsIcon className={props.className} {...props} />;
    case "saved":
      return <BookmarksRoundedIcon className={props.className} {...props} />;
    case "facebook":
      return <FacebookIcon className={props.className} {...props} />;
    case "linkedin":
      return <LinkedInIcon className={props.className} {...props} />;
    case "instagram":
      return <InstagramIcon className={props.className} {...props} />;
    case "twitter":
      return <TwitterIcon className={props.className} {...props} />;
    case "like":
      return <ThumbUpAltIcon className={props.className} {...props} />;
    case "share":
      return <ShareIcon className={props.className} {...props} />;
    case "notificationsOutlined":
      return <NotificationsNoneOutlinedIcon className={props.className} {...props} />;
    case "close":
      return <CloseIcon className={props.className} {...props} />;
    case "dashboard":
      return <DashboardRoundedIcon className={props.className} {...props} />;
    case "briefCase":
      return <WorkRoundedIcon className={props.className} {...props} />;
    case "search":
      return <SearchRoundedIcon className={props.className} {...props} />;
    case "dotsVertical":
      return <MoreVertIcon className={props.className} {...props} />;
    case "addPhoto":
      return <AddPhotoAlternateIcon className={props.className} {...props} />;
    case "addPhotoCam":
      return <AddAPhotoIcon className={props.className} {...props} />;
    case "PublicIcon":
      return <PublicIcon className={props.className} {...props} />;
    case "MailOutlineIcon":
      return <MailOutlineIcon className={props.className} {...props} />;
    case "CallOutlinedIcon":
      return <CallOutlinedIcon className={props.className} {...props} />;
    case "PinterestIcon":
      return <PinterestIcon className={props.className} {...props} />;
    case "YouTubeIcon":
      return <YouTubeIcon className={props.className} {...props} />;
    case "ArrowForwardIosIcon":
      return <ArrowForwardIosIcon className={props.className} {...props} />;
    case "ArrowBackIosIcon":
      return <ArrowBackIosIcon className={props.className} {...props} />;
    case "CloudUploadIcon":
      return <CloudUploadIcon className={props.className} {...props} />;
    case "CloudDownloadIcon":
      return <CloudDownloadIcon className={props.className} {...props} />;
    case "CheckCircle":
      return <CheckCircleIcon className={props.className} {...props} />;
    case "min":
      return <RemoveIcon className={props.className} {...props} />;
    case "call":
      return <CallRoundedIcon className={props.className} {...props} />;
    case "video":
      return <VideocamRoundedIcon className={props.className} {...props} />;
    case "smile":
      return <SentimentSatisfiedRoundedIcon className={props.className} {...props} />;
    case "microphone":
      return <MicRoundedIcon className={props.className} {...props} />;
    case "camera":
      return <CameraAltRoundedIcon className={props.className} {...props} />;
    case "globe":
      return <LanguageIcon className={props.className} {...props} />;
    case "arrowDropDown":
      return <ArrowDropDownIcon className={props.className} {...props} />;
    case "whatsapp":
      return <WhatsAppIcon className={props.className} {...props} />;
    case "reddit":
      return <RedditIcon className={props.className} {...props} />;
    case "telegram":
      return <TelegramIcon className={props.className} {...props} />;

    default:
      return null;
  }
};
export default MuiIcon;
