import * as React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  BrowserRouter as Router,
  useLocation,
  useHistory,
} from "react-router-dom";
import { Grid, Avatar, Typography, Popper, Tooltip } from "@material-ui/core";
import MuiIcons from "Components/Icons";
import Button from "Components/Button";
import { DownloadIcon } from "Components/Icons/download";
import MuiIcon from "Components/Icons";
// import { HumburgerIcon } from "Components/Icons/humburger";
import { maxContainerWidth } from "../../theme";
import { UserContext } from "Context/AuthContext";
import { getMarkers } from "Hooks/useCards";
import { Delete } from "Components/Icons/delete";
// import { downloadCardSheet } from "Hooks/useCards";
import { Upgrading } from "Components/Icons/upgrading";
import { LogOffIcon } from "Components/Icons/logoff";
import { API_URL, getAccessToken } from "Hooks/api";
import axios from "axios";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: "auto",
      // position: "sticky",
      // top: 1,
      zIndex: 1,
    },
    wrapperScrolled: {
      width: "100%",
      margin: "auto",
      // position: "sticky",
      // top: 0,
      zIndex: 1,
      backdropFilter: "blur(10px)",
      background: "#fbfbfb",
      borderBottom: "1px solid rgba(239, 242, 243, 0.5)",
    },
    gridContainer: {
      width: "100%",
      margin: "auto",
      padding: theme.spacing(2, 0),
      maxWidth: maxContainerWidth,
    },
    mainTabWrapper: {
      margin: "auto",
    },
    flex: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    mainTabContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "30px",
      background: theme.palette.gray[100],
      margin: "auto",
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03)",
    },
    mainTabContainer2: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "30px",
      background: theme.palette.gray[100],
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03)",
    },
    activeLink: {
      borderRadius: "40px",
      padding: theme.spacing(1.5),
      minWidth: "18%",
      textAlign: "center",
      background: theme.palette.gray[200],
      color: theme.palette.info.main,
      margin: theme.spacing(0.5),
      fontSize: "14px",
      fontWeight: 500,
    },
    link: {
      fontWeight: 500,
      fontSize: "14px",
      margin: theme.spacing(0.5),
      borderRadius: "40px",
      padding: theme.spacing(1.5),
      minWidth: "18%",
      textAlign: "center",
      cursor: "pointer",
      color: theme.palette.secondary.main,
      "&:hover": {
        background: theme.palette.gray[200],
      },
    },
    activeSideLink: {
      borderRadius: "70px",
      padding: theme.spacing(0.7),
      color: theme.palette.info.main,
      textAlign: "center",
      margin: theme.spacing(0.5),
      minWidth: "40px",
    },
    sideLink: {
      minWidth: "40px",
      margin: theme.spacing(0.5),
      borderRadius: "40px",
      padding: theme.spacing(0.5),
      textAlign: "center",
      cursor: "pointer",
      color: theme.palette.secondary.main,
      "&:hover": {
        background: theme.palette.gray[200],
      },
    },
    cursor: {
      cursor: "pointer",
      marginRight: "10px",
    },
    flexAlign: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "60px",
      paddingTop: "30px",
      marginLeft: "-55px",
    },
    bottomNavContainer: {
      position: "absolute",
      bottom: 0,
    },
    logoDiv: {
      marginLeft: theme.spacing(6),
      cursor: "pointer",
      width: "50%",
      marginTop: theme.spacing(-5),
      [theme.breakpoints.down("sm")]: {
        marginTop: 0,
        marginLeft: theme.spacing(7),
        width: "20%",
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: 0,
        marginLeft: theme.spacing(8),
        width: "30%",
      },
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
      [theme.breakpoints.down("sm")]: {
        minWidth: "70px",
        fontSize: "12px",
        padding: theme.spacing(0.5, 1.2),
      },
    },
    downloadBtnGrid: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    cardButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logoutButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonsContainer: {
      paddingRight: "2px !important",
      paddingLeft: "2px !important",
    },
    buttonsGrid: {
      paddingLeft: "60px !important",
      paddingRight: "0px !important",
      justifyContent: "space-evenly",
      [theme.breakpoints.down("xs")]: {
        paddingLeft: "0px !important",
        justifyContent: "space-evenly",
      },
    },
    accountDetail: {
      padding: "16px 8px 0px 60px",
      justifyContent: "flex-end",
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        paddingLeft: "0px !important",
        justifyContent: "space-evenly",
      },
    },
    markerContainer: {
      padding: "16px 60px 0px 16px",
      justifyContent: "flex-end",
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        paddingLeft: "0px !important",
        justifyContent: "space-evenly",
      },
    },
    accountName: {
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "Poppins",
      color: theme.palette.secondary.light,
      display: "flex",
      alignItems: "center",
    },
    cardDetails: {
      fontSize: "18px",
      fontWeight: 250,
      fontFamily: "Poppins",
      color: theme.palette.secondary.light,
    },
    popoverDiv: {
      border: `1px solid ${theme.palette.gray[600]}`,
      padding: theme.spacing(1),
      maxWidth: "130px",
      maxHeight: "170px",
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
    popoverMarkerPic: {
      width: "70px",
      height: "40px",
      borderRadius: "5px",
      border: `1px solid ${theme.palette.gray[600]}`,
      boxShadow: "0px 31px 74px -10px rgba(0, 0, 0, 0.1)",
      margin: "4px 0px",
      cursor: "pointer",
    },
    popoverDeletebutton: {
      fontSize: "14px",
      fontWeight: 300,
      textDecoration: "none",
      cursor: "pointer",
      marginRight: "10px",
      fontFamily: "Poppins",
      display: "flex",
      alignItems: "center",
      maxWidth: "50px",
      justifyContent: "center",
      background: theme.palette.gray[100],
      color: theme.palette.gray[900],
      border: "none",
      padding: "3px 10px",
    },
    markerDiv: {
      position: "relative",
      marginBottom: theme.spacing(0.7),
      display: "flex",
      "&:hover>div": {
        visibility: "visible",
        opacity: "1",
      },
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
      top: "-5px",
      right: "40px",
      zIndex: 1,
      visibility: "hidden",
      transition: "0.3s",
      opacity: "0",
    },
    signInTextWrapper: {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: "10px",
    },
    signInText: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: "24px",
      color: "#455154",
      userSelect: "none",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "18px",
      },
    },
  })
);

export const Header: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const isTab = useMediaQuery(theme.breakpoints.down("sm"));

  const { user, logout, token } = React.useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [markerData, setMarkerData] = React.useState<any>([]);

  const { data: markersApiData, refetch: fetchMarkers } = getMarkers();

  const createCardPage = location.pathname.includes("card");
  const adminPage = location.pathname.includes("admin/dashboard");

  // Queries
  //   const { data, refetch } = downloadCardSheet();

  // UseEffects
  React.useEffect(() => {
    if (markersApiData) setMarkerData(markersApiData);
  }, [markersApiData]);

  // Event Handlers
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // constants
  const open = Boolean(anchorEl);
  const id = open ? "header-popper" : undefined;

  const handleDeleteMarker = async (id: string) => {
    const config = {
      headers: {
        Authorization: getAccessToken(),
      },
    };
    const res = await axios.post(
      `${API_URL}/card/marker/${id}/delete`,
      {},
      config
    );
    if (res.status === 200 || res.status === 201) {
      toast.success("Marker Deleted Successfully");
      fetchMarkers();
    }
  };

  const handleSendSpreadSheetEmail = async () => {
    const config = {
      headers: {
        Authorization: getAccessToken(),
      },
    };
    const res = await axios.post(`${API_URL}/cards/get-card-list`, {}, config);
    if (res.status === 200 || res.status === 201) {
      toast.success("Spreadsheet sent to email successfully");
    }
  };
  return (
    <div className={classes.wrapperScrolled}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={4}
        className={classes.gridContainer}
      >
        <Grid
          item
          lg={!token ? 12 : 6}
          md={3}
          sm={!token ? 12 : 3}
          xs={12}
          alignItems="center"
        >
          <div className={classes.flexAlign}>
            <div className={classes.logoDiv} onClick={() => history.push("/")}>
              <img src="https://res.cloudinary.com/salihudev/image/upload/v1655059739/Sailspad_1_lfgfw6.png" />
            </div>
            {/* <div className={classes.signInTextWrapper}> */}
            {!token && (
              <Button
                style={{ marginTop: "-4rem" }}
                text="Sign up"
                type="grey"
                // className={classes.signInText}
                onClick={() => history.push("/signup")}
              />
            )}
            {/* </div> */}
          </div>
        </Grid>
        {token && !createCardPage && (
          <Grid
            item
            lg={6}
            md={7}
            sm={9}
            xs={12}
            className={classes.buttonsContainer}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="flex-end"
              className={classes.buttonsGrid}
            >
              <Grid className={classes.flex} item sm={!adminPage ? 3 : 2}>
                {!adminPage && (
                  <Button
                    onClick={() => history.push("/subscription")}
                    text="Upgrade"
                    className={classes.navButton}
                    icon={<Upgrading />}
                  />
                )}
              </Grid>
              <Grid className={classes.flex} item sm={4}>
                <Button
                  onClick={handleSendSpreadSheetEmail}
                  text="Download Sheet"
                  className={classes.navButton}
                  icon={<DownloadIcon />}
                />
              </Grid>
              <Grid className={classes.flex} item sm={!adminPage ? 3 : 4}>
                {!adminPage ? (
                  <Button
                    text="New Card"
                    className={classes.navButton}
                    icon={<MuiIcon icon="add" />}
                    onClick={() => history.push("/card")}
                  />
                ) : (
                  <Button
                    text="New Account"
                    className={classes.navButton}
                    icon={<MuiIcon icon="add" />}
                  />
                )}
              </Grid>
              <Grid className={classes.flex} item sm={2}>
                <Button
                  text="Logout"
                  onClick={() => logout()}
                  className={classes.navButton}
                  icon={<LogOffIcon />}
                />
              </Grid>
            </Grid>
            {user && !adminPage && (
              <Grid
                container
                alignItems="center"
                justifyContent={!isTab ? "flex-end" : "center"}
              >
                <Grid item xs={7} md={6} className={classes.accountDetail}>
                  {user && (
                    <Typography className={classes.accountName}>
                      {user?.firstName} {user?.lastName}&nbsp;&nbsp;&nbsp;&nbsp;
                      {user?.availableCardSlots && (
                        <Typography className={classes.cardDetails}>
                          {user?.availableCardSlots}/{user?.cardSlots}
                        </Typography>
                      )}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={3} className={classes.markerContainer}>
                  <Grid item xs={5}>
                    <div
                      aria-describedby={id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        onClick={handleClick}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography className={classes.accountName}>
                          Markers
                        </Typography>
                        <MuiIcons
                          className={classes.popoverBtn}
                          icon="arrowDropDown"
                        />
                      </div>
                    </div>
                    <Popper id={id} open={open} anchorEl={anchorEl}>
                      <div className={classes.popoverDiv}>
                        {markerData?.map((m: any, i: number) => (
                          <div key={i} className={classes.markerDiv}>
                            <div className={classes.markerCode}>
                              {m?.uniqueId}
                            </div>
                            <Avatar
                              src={m.markerImage}
                              className={classes.popoverMarkerPic}
                              variant="rounded"
                              // onClick={() => { setMarker(m.markerImageLink); formik.setFieldValue("marker.markerImageLink", m.markerImageLink); setAnchorEl(null) }}
                            />
                            {m?.isDeletable && (
                              <button
                                className={classes.popoverDeletebutton}
                                onClick={() => {
                                  handleDeleteMarker(m.uniqueId);
                                }}
                              >
                                <Delete />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </Popper>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
};
