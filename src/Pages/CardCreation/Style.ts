import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "100%",
      marginTop: theme.spacing(1),
      padding: theme.spacing(13, 10, 3),
      background: theme.palette.gray[100],
      borderRadius: "20px",
      boxShadow: "0px 138px 189px -76px rgba(0, 0, 0, 0.06)",
      border: `2px solid rgba(227, 227, 227, 0.8)`,
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(5, 10),
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0.25),
        boxShadow: "none",
        border: "none",
      },
    },
    inputLabel: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "27px",
      color: "#58696D",
    },
    inputContainer: {
      marginBottom: theme.spacing(1),
    },
    editImageContainer: {
      position: "relative",
      width: "fit-content",
      "&:hover $addImage": {
        opacity: 0.8,
        zIndex: 1,
      },
      "&:hover $editAndDelete": {
        opacity: 0.8,
        zIndex: 1,
      },
    },
    addImage: {
      position: "absolute",
      width: " 157px",
      height: "157px",
      display: "flex",
      right: "5px",
      justifyContent: "center",
      alignItems: "center",
      background: "rgba(255,255,255,0.7)",
      borderRadius: "6px",
      cursor: "pointer",
      opacity: 0,
      transition: "all .3s",
      [theme.breakpoints.down("sm")]: {
        width: "125px",
        height: "135px",
        left: 0,
      },
    },
    editAndDelete: {
      position: "absolute",
      bottom: 0,
      right: "5px",
      width: "157px",
      height: "45px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      background: "#58696D33",
      backdropFilter: "blur(26px)",
      borderRadius: "6px",
      cursor: "pointer",
      opacity: 0,
      transition: "all .3s",
      [theme.breakpoints.down("sm")]: {
        width: "125px",
        opacity: 0.8,
        zIndex: 1,
        height: "35px",
        left: 0,
      },
    },
    userProfilePic: {
      width: "157px",
      height: "157px",
      margin: "auto",
      marginRight: "5px",
      borderRadius: "10px",
      [theme.breakpoints.down("sm")]: {
        width: "125px",
        height: "135px",
      },
    },
    markerPic: {
      width: "70px",
      height: "40px",
      borderRadius: "5px",
      border: `1px solid ${theme.palette.gray[600]}`,
      boxShadow: "0px 31px 74px -10px rgba(0, 0, 0, 0.1)",
    },
    popoverMarkerPic: {
      width: "70px",
      height: "40px",
      borderRadius: "5px",
      border: `1px solid ${theme.palette.gray[600]}`,
      boxShadow: "0px 31px 74px -10px rgba(0, 0, 0, 0.1)",
      margin: "4px 0px",
      cursor: "pointer",
    },
    Muinput: {
      margin: theme.spacing(0, 2, 0, 2),
      borderRadius: "12px",
    },
    userinfo: {
      padding: theme.spacing(0, 1),
    },
    userinfo1: {
      padding: theme.spacing(0, 1),
      marginBottom: theme.spacing(1),
    },
    userinfo3: {
      padding: theme.spacing(0, 0.75),
    },
    addLink: {
      width: "100%",
      padding: theme.spacing(0, 1),
      margin: theme.spacing(1, 0),
    },
    actionIcons: {
      color: "#E4E9EA",
    },
    colorContainer: {
      display: "flex",
      margin: theme.spacing(3, 1, 2, 1),
      justifyContent: "space-between",
      alignItems: "center",
    },
    colorDiv: {
      cursor: "pointer",
      padding: theme.spacing(0.5),
      borderRadius: "20px",
      width: "54px",
      height: "20px",
      border: `5px hidden ${theme.palette.gray[100]}`,
      [theme.breakpoints.down("xs")]: {
        height: "14px",
        width: "40px",
      },
    },
    colorDivSelected: {
      height: "30px",
      width: "54px",
      cursor: "pointer",
      padding: theme.spacing(0.5),
      borderRadius: "20px",
      border: `5px solid ${theme.palette.gray[100]}`,
      transform: "scale(1.5)",
      [theme.breakpoints.down("xs")]: {
        height: "22px",
        width: "40px",
        transform: "scale(1.5)",
      },
    },
    actionButtons: {
      color: theme.palette.secondary.dark,
      [theme.breakpoints.down("xs")]: {
        color: theme.palette.gray[700],
      },
    },
    selectIcon: {
      color: theme.palette.gray[400],
      [theme.breakpoints.down("xs")]: {
        fontSize: "16px",
      },
    },
    addIcon: {
      color: theme.palette.gray[900],
    },
    previewImage: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    },
    deleteIcon: {
      color: "red",
      cursor: "pointer",
      position: "absolute",
      top: "-12px",
      right: "-16px",
      zIndex: 1,
    },
    addButton: {
      background: theme.palette.gray[100],
      border: `1px solid ${theme.palette.gray[600]}`,
      color: theme.palette.gray[900],
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03)",
      borderRadius: "40px",
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
      cursor: "pointer",
      width: "100px",
      justifyContent: "center",
    },
    createButton: {
      background: theme.palette.gray[100],
      border: `1px solid ${theme.palette.gray[600]}`,
      color: theme.palette.gray[900],
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03)",
      borderRadius: "40px",
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
      marginTop: theme.spacing(2),
      padding: theme.spacing(1),
      cursor: "pointer",
      width: "130px",
      justifyContent: "center",
    },
    selectLink: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing(1.5),
    },
    showInstitution: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "18px",
      color: "#58696D",
      margin: theme.spacing(0, 1),
    },
    iconSmall: {
      fontSize: "16px",
      marginRight: theme.spacing(0.5),
    },
    switchInstitution: {
      // justifyContent: "end",
      display: "flex",
      alignItems: "center",
    },
    aboutContainer: {
      width: "91%",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    linkPlaceholder: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "15px",
      color: theme.palette.gray[400],
      [theme.breakpoints.down("sm")]: {
        fontSize: "11px",
      },
    },
    secondContainer: {
      padding: "0px 0px 0 50px",
      [theme.breakpoints.down("sm")]: {
        padding: "30px 0px 0 0px",
      },
    },
    customBtn: {
      display: "flex",
      alignItems: "center",
      background: "none",
      boxShadow: "none",
      border: "none",
      cursor: "pointer",
    },
    socialLinksContainer: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(2, 1),
      border: `1px solid ${theme.palette.gray[600]}`,
      boxSizing: "border-box",
      filter: "drop-shadow(0px 31px 51px rgba(0, 0, 0, 0.03))",
      borderRadius: "10px",
      maxHeight: "310px",
      overflowY: "auto",
    },
    markerContainer: {
      width: "100%",
      padding: theme.spacing(1, 0),
    },
    navButton: {
      fontSize: "14px",
      fontWeight: 400,
      textDecoration: "none",
      minWidth: "90px",
      maxHeight: "34px",
      cursor: "pointer",
      fontFamily: "Poppins",
      background: theme.palette.gray[100],
      color: theme.palette.secondary.light,
      border: `1px solid ${theme.palette.gray[600]}`,
      boxShadow: "0px 8.610461235046387px 14.165597915649414px 0px #00000008",
      borderRadius: "17px",
      padding: theme.spacing(0.75, 2),
      float: "right",
      [theme.breakpoints.down("sm")]: {
        minWidth: "70px",
        fontSize: "12px",
        padding: theme.spacing(0.5, 1.2),
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "8px",
        // width: "30px"
      },
    },
    popoverDiv: {
      border: `1px solid ${theme.palette.gray[600]}`,
      padding: theme.spacing(1),
      maxWidth: "100px",
      maxHeight: "156px",
      overflowY: "auto",
      backgroundColor: theme.palette.background.paper,
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03)",
      borderRadius: "10px",
    },
    popoverBtn: {
      color: theme.palette.secondary.light,
      fontSize: "36px",
      cursor: "pointer",
    },
    markerDiv: {
      position: "relative",
      marginBottom: theme.spacing(1),
      '&:hover>div': {
        visibility: "visible",
        opacity: '1'
      }
    },
    markerCode: {
      border: `1px solid ${theme.palette.gray[600]}`,
      borderRadius: "5px",
      background: theme.palette.gray[600],
      color: theme.palette.secondary.light,
      width: "fit-content",
      padding: theme.spacing(0.5),
      fontSize: "9px",
      fontWeight: 400,
      position: "absolute",
      top: '-5px',
      right: "0px",
      zIndex: 1,
      visibility: "hidden",
      transition: '0.3s', opacity: '0'

    },
    backIcon: {
      display: "flex",
      alignItems: "center",
      margin: "auto 0px",
      cursor: "pointer"
    },
    heading: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "22px",
      lineHeight: "27px",
      color: "#252D38",
    },
    shortContainer: {
      width: "84%",
      // border: "1px solid blue",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    uploadLogoDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      // border: "1px solid red",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "space-evenly",
      },
      [theme.breakpoints.down("xs")]: {
        justifyContent: "space-evenly",
      },
    },
    backgroundLogoDiv: {
      display: "flex",
      alignItems: "center",
      maxWidth: "350px",
      marginTop: "16px",
      float: "right",
      // justifyContent: "space-between",
      // border: "1px solid red",
      // [theme.breakpoints.down("sm")]: {
      //   justifyContent: "space-evenly",
      // },
      // [theme.breakpoints.down("xs")]: {
      //   justifyContent: "space-evenly",
      // },
    },
    editRequestDiv: {
      // position: "absolute",
      // bottom: "45px",
      background: theme.palette.gray[600],
      border: "1px solid #E3E3E3",
      boxSizing: "border-box",
      minWidth: "182px",
      // maxWidth: "200px",
      // margin: "10px 0",
      // borderRadius: "12px",
      // minHeight: "73px",
      [theme.breakpoints.down("sm")]: {
        position: "relative",
      },
      "&>div": {
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    },
    editRequestDivMobile: {
      position: "absolute",
      bottom: "3px",
      background: theme.palette.gray[600],
      border: "1px solid #E3E3E3",
      boxSizing: "border-box",
      minWidth: "182px",
      maxWidth: "200px",
      margin: "10px 0",
      borderRadius: "12px",
      minHeight: "73px",
      [theme.breakpoints.down("sm")]: {
        position: "relative",
      },
      "&>div": {
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    },
    editText: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "18px",
      color: theme.palette.gray[900],
      maxWidth: "130px"
    },
    editIcon: {
      display: "flex",
      alignItems: "center",
      margin: "auto",
      cursor: "pointer"
    }
  })
);

export default useStyles