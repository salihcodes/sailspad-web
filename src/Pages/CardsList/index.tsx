import * as React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Popover, Tooltip, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { toast } from "react-toastify";
// Components
import Layout from "Components/Layout";
import { NoData } from "Components/SvgIllustration/NoData";
import { ViewEye } from "Components/Icons/viewEye";
import CopyLink from "Components/Icons/copyLink";
import { Edit } from "Components/Icons/edit";
import { Send } from "Components/Icons/send";
import { Delete } from "Components/Icons/delete";
// Context
import { UserContext } from "Context/AuthContext";
// Mutations
import { getUserData } from "Hooks/useLogin";
import { getUserCards } from "Hooks/useCards";
import {
  // editCardRequest, deleteCardRequest,
  deleteCard,
} from "Hooks/useCards";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "100%",
      margin: "3rem 0 30% 0",
    },
    table: {
      // minWidth: 750,
      // maxHeight: 440,
      background: theme.palette.gray[100],
    },
    tableHeadCell: {
      backgroundColor: theme.palette.gray[100],
      color: "#1E2D3D",
      fontFamily: "Tajawal",
      fontSize: "18px",
      fontWeight: 500,
      borderBottom: "3px solid rgba(42, 73, 90, 0.8)",
    },
    tableCell: {
      backgroundColor: theme.palette.gray[100],
      color: "#1E2D3D !important",
      fontSize: "14px",
      fontWeight: 300,
      borderBottom: "1px solid #AFAFAF",
    },
    tableRow: {
      backgroundColor: theme.palette.gray[100],
    },
    link: {
      borderRadius: "20px",
      background: theme.palette.gray[600],
      padding: theme.spacing(0.3, 1.3),
      color: theme.palette.secondary.light,
      fontFamily: "Tajawal",
      fontSize: "14px",
      fontWeight: 400,
      textDecoration: "none",
      cursor: "pointer",
      margin: "4px 4px 4px 0px",
      boxShadow: "0px 31px 51px 0px #00000008",
      transition: "0.3s",
      "&:hover": {
        background: "#1E2D3D",
        color: "white !important",
      },
    },
    cardNumber: {
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: "24px",
      color: "#1E2D3D",
    },
    button: {
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
      border: `1px solid ${theme.palette.gray[600]}`,
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03) !important",
      borderRadius: "17.5115px",
      padding: "3px 12px",
    },
    buttonDisabled: {
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
      border: `1px solid ${theme.palette.gray[600]}`,
      boxShadow: "0px 31px 51px rgba(0, 0, 0, 0.03) !important",
      borderRadius: "17.5115px",
      padding: "3px 12px",
      opacity: "0.5s",
    },
    linksContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexWrap: "wrap",
      maxWidth: "260px",
      minWidth: "260px",
    },
    emailContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexWrap: "wrap",
      maxWidth: "200px",
      minWidth: "150px",
    },
    editRequestDiv: {
      background: theme.palette.gray[600],
      border: "1px solid #E3E3E3",
      boxSizing: "border-box",
      "&>div": {
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
    },
    editText: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "18px",
      color: theme.palette.gray[900],
      maxWidth: "130px",
    },
    editIcon: {
      display: "flex",
      alignItems: "center",
      margin: "auto",
      cursor: "pointer",
    },
  })
);

export const ListTable = () => {
  const classes = useStyles();
  const history = useHistory();

  const { token, setUser, setCardData } = React.useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [deleteAnchorEl, setDeleteAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const [selectedCard, setSelectedCard] = React.useState<any>(null);

  // mutatations & query
  const { data } = getUserData();
  const { data: CardsData, refetch } = getUserCards();
  //   const {
  //     data: editRequestData,
  //     isError,
  //     mutate,
  //     isSuccess,
  //   } = editCardRequest();
  //   const {
  //     data: delteRequestData,
  //     isError: isErrorDeleteRequest,
  //     mutate: sendDeleteRequestMutation,
  //     isSuccess: isSuccessSendingDeleteRequest,
  //   } = deleteCardRequest();
  const {
    data: delteCardData,
    isError: isErrorDeleteCard,
    mutate: deleteCardMutation,
    isSuccess: isSuccessDeleteCard,
  } = deleteCard();

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { setAnchorEl(event.currentTarget); };

  const handleClose = () => {
    setAnchorEl(null);
    setDeleteAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const openDeleteRequest = Boolean(deleteAnchorEl);
  const id = open ? "edit-popover" : undefined;
  const idDelete = openDeleteRequest ? "delete-popover" : undefined;

  // React.useEffect(() => { if (token) refetch() }, [])

  //   React.useEffect(() => {
  //     if (isError) toast.error("something went wrong!");
  //   }, [editRequestData, isError]);

  React.useEffect(() => {
    if (isErrorDeleteCard) toast.error("something went wrong!");
  }, [delteCardData, isErrorDeleteCard]);

  //   React.useEffect(() => {
  //     if (isSuccess) toast.success("Edit Request has been sent succesfully");
  //   }, [editRequestData, isSuccess]);

  //   React.useEffect(() => {
  //     if (isErrorDeleteRequest) toast.error("something went wrong!");
  //   }, [delteRequestData, isErrorDeleteRequest]);

  //   React.useEffect(() => {
  //     if (isSuccessSendingDeleteRequest)
  //       toast.success("Delete Request has been sent succesfully");
  //   }, [delteRequestData, isSuccessSendingDeleteRequest]);

  React.useEffect(() => {
    if (isSuccessDeleteCard) {
      toast.success("Card Deleted succesfully");
      refetch();
    }
  }, [delteCardData, isSuccessDeleteCard]);

  React.useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  // React.useEffect(() => { fetchUserCards() }, [])

  const viewCard = (id: string) => {
    window.open(
      `https://ebc.sailspad.com/cards/${id}/demo-view`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const copyCardLink = (id: string) => {
    navigator.clipboard.writeText(`https://cards.sailspad.com/${id}`);
    toast.info("Copied to clipboard!");
  };
  //   const sendEditRequest = async (_id: string) => {
  //     await mutate({ _id });
  //     await setAnchorEl(null);
  //   };

  //   const sendDeleteRequest = async (_id: string) => {
  //     await sendDeleteRequestMutation({ _id });
  //     await setDeleteAnchorEl(null);
  //   };

  const openEditPopper = (
    event: React.MouseEvent<HTMLButtonElement>,
    card: any
  ) => {
    // if (!card?.editable) {
    //   setAnchorEl(event.currentTarget);
    //   setSelectedCard(card);
    // } else {
    history.push(`card/${card?.id}/edit`);
    setCardData(card);
    // }
  };

  const deleteCardHandler = async (card: any) => {
    // if (card?.deleteable) {

    // }
    await deleteCardMutation({ id: card?.id });
  };

  return token === "" ? (
    <Redirect to="/login" />
  ) : (
    <Layout>
      {CardsData?.length ? (
        <Grid
          className={classes.wrapper}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="sticky table">
                <TableHead>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableHeadCell}>#</TableCell>
                    <TableCell className={classes.tableHeadCell} align="left">
                      Name
                    </TableCell>
                    <TableCell className={classes.tableHeadCell} align="left">
                      Date
                    </TableCell>
                    <TableCell className={classes.tableHeadCell} align="left">
                      Email
                    </TableCell>
                    <TableCell className={classes.tableHeadCell} align="left">
                      Links
                    </TableCell>
                    <TableCell className={classes.tableHeadCell} align="left">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {CardsData?.map((card: any, i: number) => (
                    <TableRow className={classes.tableRow} key={i}>
                      <TableCell className={classes.tableCell} align="left">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Typography className={classes.cardNumber}>
                            {i + 1}
                          </Typography>
                          ({card.uniqueId})
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {card.name}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {new Date(`${card.createdAt}`).toLocaleDateString()}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        <div className={classes.emailContainer}>
                          <Typography noWrap>{card.email}</Typography>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        <div className={classes.linksContainer}>
                          {card?.links?.map(
                            (
                              link: {
                                name: {} | null | undefined;
                                link: string | undefined;
                              },
                              i: number
                            ) => {
                              if (link.name !== "Phone") {
                                return (
                                  <a
                                    key={i}
                                    className={classes.link}
                                    href={link.link}
                                    target="_blank"
                                  >
                                    {link.name}
                                  </a>
                                );
                              } else if (link.name === "Phone") {
                                return (
                                  <a
                                    key={i}
                                    className={classes.link}
                                    href={`tel:${link.link}`}
                                  >
                                    {link.name}
                                  </a>
                                );
                              }
                            }
                          )}
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Tooltip
                            title="Edit"
                            aria-label="edit"
                            placement="top"
                            arrow
                          >
                            <button
                              aria-describedby={id}
                              //   onMouseOver={(e) => {
                              //     if (!card?.editable) {
                              //       setAnchorEl(e.currentTarget);
                              //       setSelectedCard(card);
                              //     }
                              //   }}
                              onClick={(e) => openEditPopper(e, card)}
                              className={classes.button}
                            >
                              <Edit color={card?.editable ? "grey" : ""} />
                            </button>
                          </Tooltip>
                          <Tooltip
                            title="View"
                            aria-label="view"
                            placement="top"
                            arrow
                          >
                            <button
                              className={classes.button}
                              onClick={() => viewCard(card?._id)}
                            >
                              <ViewEye />
                            </button>
                          </Tooltip>
                          <Tooltip
                            title="Copy Link"
                            aria-label="copyLink"
                            placement="top"
                            arrow
                          >
                            <button
                              className={classes.button}
                              onClick={() => copyCardLink(card?.shortName)}
                            >
                              <CopyLink Color="#1E2D3D" />
                            </button>
                          </Tooltip>
                          <Tooltip
                            title="Delete"
                            aria-label={idDelete}
                            placement="top"
                            arrow
                          >
                            <button
                              className={classes.button}
                              onClick={(e) => {
                                console.log(card);
                                deleteCardHandler(card);
                              }}
                            >
                              <Delete />
                            </button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="center">
          <Grid
            style={{
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              marginBottom: "80px",
            }}
            item
            xs={12}
          >
            <NoData />
          </Grid>
        </Grid>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {/* <div className={classes.editRequestDiv}>
          <div>
            <Typography className={classes.editText}>
              Cilck here to send Edit Request to the user Email
            </Typography>
            <div
              className={classes.editIcon}
              onClick={() => sendEditRequest(selectedCard?._id)}
            >
              <Send />
            </div>
          </div>
        </div> */}
      </Popover>

      <Popover
        id={idDelete}
        open={openDeleteRequest}
        anchorEl={deleteAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {/* <div className={classes.editRequestDiv}>
          <div>
            <Typography className={classes.editText}>
              Cilck here to send Delete Request to the user Email
            </Typography>
            <div
              className={classes.editIcon}
              onClick={() => sendDeleteRequest(selectedCard?._id)}
            >
              <Send />
            </div>
          </div>
        </div> */}
      </Popover>
    </Layout>
  );
};
