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
import axios from "axios";
// Components
import Layout from "Components/Layout";
import TextInput from "Components/Form/TextInput";
import { NoData } from "Components/SvgIllustration/NoData";
import MuiIcon from "Components/Icons";
import { Edit } from "Components/Icons/edit";
import { Send } from "Components/Icons/send";
import { Delete } from "Components/Icons/delete";
// Context
import { UserContext } from "Context/AuthContext";
// Mutations
import { getUserData } from "Hooks/useLogin";
import { getUserCards } from "Hooks/useCards";
import {
  // editCardRequest,
  //  deleteCardRequest,
  deleteCard,
} from "Hooks/useCards";
import { API_URL, getAccessToken } from "Hooks/api";
import { AnymatchPattern } from "vite";

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
    subscriptionContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexWrap: "wrap",
      maxWidth: "260px",
      minWidth: "260px",
    },
    subscriptionPlan: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      maxWidth: "210px",
      minWidth: "190px",
      background: "#E3E3E3",
      padding: "4px 10px",
      borderRadius: "8px",
    },
    manualCardsDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      background: "#E3E3E3",
      padding: "5px 10px",
      borderRadius: "30px",
    },
    subscriptionText: {
      fontWeight: 400,
      fontSize: "14px",
      color: "#58696D",
    },
    subscriptionCardCount: {
      fontWeight: 400,
      fontSize: "16px",
      textAlign: "right",
      color: "#455154",
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
      maxWidth: "240px",
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
      maxWidth: "150px",
      marginBottom: "5px",
    },
    editIcon: {
      display: "flex",
      alignItems: "center",
      margin: "auto",
      cursor: "pointer",
    },
    addButton: {
      color: "#1E2D3D",
    },
  })
);

export const AdminPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const { token, setUser, setCardData, setToken, user } =
    React.useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [deleteAnchorEl, setDeleteAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const [selectedCard, setSelectedCard] = React.useState<any>(null);
  const [addCards, setAddCards] = React.useState<number>();

  const [usersList, setUsersList] = React.useState([]);

  // mutatations & query
  const { data } = getUserData();
  // const { data: CardsData, refetch } = getUserCards();
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

  const handleSignInAsUser = async (userId: string) => {
    const config = {
      headers: {
        Authorization: getAccessToken(),
      },
    };

    const res = await axios.post(
      `${API_URL}/authentication/admin-sign-in`,
      { userId },
      config
    );
    if (res.status === 200 || res.status === 201) {
      setToken(res.data.token);
      history.push("/");
    }
  };

  const handleGetUsers = async () => {
    const config = {
      headers: {
        Authorization: getAccessToken(),
      },
    };
    const res = await axios.get(`${API_URL}/users`, config);

    if (res.status === 200 || res.status === 201) {
      setUsersList(res.data);
    }
  };

  const adjustCardCount = async (userId: string, amount: any) => {
    const config = {
      headers: {
        Authorization: getAccessToken(),
      },
    };
    const res = await axios.post(
      `${API_URL}/users/adjust-card-count`,
      { userId, amount: parseInt(amount) },
      config
    );
    if (res.status === 201) {
      handleGetUsers();
      toast.success(`${amount} slots successfully added to account`);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    setDeleteAnchorEl(null);
  };

  const deleteAccount = async (userId: string) => {
    const config = {
      headers: {
        Authorization: getAccessToken(),
      },
    };
    const res = await axios.post(
      `${API_URL}/users/delete-account`,
      { userId },
      config
    );
    if (res.status === 201) {
      handleGetUsers();
      toast.success("Account Deleted Successfully");
    }
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

  // React.useEffect(() => { if (isSuccessDeleteCard) { toast.success('Card Deleted succesfully'); refetch() } }, [delteCardData, isSuccessDeleteCard])

  React.useEffect(() => {
    if (data) {
      setUser(data);
      if (data.role[1] !== "admin") {
        history.push("/");
      }
    }
  }, [data]);

  React.useEffect(() => {
    handleGetUsers();
  }, []);
  // React.useEffect(() => { fetchUserCards() }, [])

  const viewCard = (id: string) => {
    window.open(
      `https://ebc.beyin.me/cards/${id}/demo-view`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const copyCardLink = (id: string) => {
    navigator.clipboard.writeText(`https://cards.beyin.me/${id}`);
    toast.info("Copied to clipboard!");
  };
  //   const sendEditRequest = async (_id: string) => {
  //     mutate({ _id });
  //     setAnchorEl(null);
  //   };

  //   const sendDeleteRequest = async (_id: string) => {
  //     sendDeleteRequestMutation({ _id });
  //     setDeleteAnchorEl(null);
  //   };

  const openEditPopper = (
    event: React.MouseEvent<HTMLButtonElement>,
    card: any
  ) => {
    setAnchorEl(event.currentTarget);
    if (!card?.editable) {
      setAnchorEl(event.currentTarget);
      // setSelectedCard(card)
    } else {
      // history.push(`card/${card?._id}/edit`);
      // setCardData(card)
    }
  };

  const deleteCardHandler = async (card: any) => {
    if (card?.deleteable) {
      deleteCardMutation({ id: card?._id });
    }
  };

  //   const usersData = [
  //     {
  //       uniqueId: "254iuh",
  //       name: "John Doe",
  //       createdAt: `${new Date().getDate()}`,
  //       email: "johnDoeTest@gmail.com",
  //       availableCards: 22,
  //       totalCards: 20,
  //       manualCards: 29,
  //       subscriptionType: "Startup",
  //     },
  //     {
  //       uniqueId: "254iuh",
  //       name: "John Doe",
  //       createdAt: `${new Date().getDate()}`,
  //       email: "johnDoeTest@gmail.com",
  //       availableCards: 22,
  //       totalCards: 20,
  //       manualCards: 29,
  //       subscriptionType: "Startup",
  //     },
  //     {
  //       uniqueId: "254iuh",
  //       name: "John Doe",
  //       createdAt: `${new Date().getDate()}`,
  //       email: "johnDoeTest@gmail.com",
  //       availableCards: 22,
  //       totalCards: 20,
  //       manualCards: 29,
  //       subscriptionType: "Startup",
  //     },
  //   ];

  return (
    <Layout>
      {usersList?.length ? (
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
                      Subscription
                    </TableCell>
                    <TableCell className={classes.tableHeadCell} align="left">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {usersList?.map((card: any, i: number) => (
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
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {card.firstName} {card.lastName}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {card.dateOfBirth}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        <div className={classes.emailContainer}>
                          <Typography noWrap>{card.email}</Typography>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        <div className={classes.subscriptionContainer}>
                          <div className={classes.subscriptionPlan}>
                            <Typography className={classes.subscriptionText}>
                              {card.subscriptionType}
                            </Typography>
                            <Typography
                              className={classes.subscriptionCardCount}
                            >
                              {card.availableCardSlots}/{card.cardSlots}
                            </Typography>
                          </div>
                          &nbsp;&nbsp;
                          <div className={classes.manualCardsDiv}>
                            <Typography className={classes.subscriptionText}>
                              +{card.manuallyAddedSlots}
                            </Typography>
                          </div>
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
                            title="Edit User"
                            aria-label="edit-user"
                            placement="top"
                            arrow
                          >
                            <button className={classes.button}>
                              <Edit
                                color={"#1E2D3D"}
                                onClick={() => {
                                  handleSignInAsUser(card._id);
                                }}
                              />
                            </button>
                          </Tooltip>
                          <Tooltip
                            title="Add Cards"
                            aria-label="add"
                            placement="top"
                            arrow
                          >
                            <button
                              aria-describedby={id}
                              onMouseOver={(e) => {
                                if (!card?.editable) {
                                  setAnchorEl(e.currentTarget);
                                  setSelectedCard(card);
                                }
                              }}
                              onClick={(e) => openEditPopper(e, card)}
                              className={classes.button}
                            >
                              <MuiIcon
                                icon="add"
                                className={classes.addButton}
                              />
                            </button>
                          </Tooltip>
                          <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <div className={classes.editRequestDiv}>
                              <div>
                                <div style={{ width: "188 px" }}>
                                  <Typography className={classes.editText}>
                                    &nbsp; Add or reduce cards
                                  </Typography>
                                  <TextInput
                                    style={{ width: "90%" }}
                                    name="numberOfCards"
                                    type="number"
                                    value={addCards}
                                    placeholder="Enter a number"
                                    onChange={(e: any) =>
                                      setAddCards(e.target.value)
                                    }
                                  />
                                </div>
                                <div className={classes.editIcon}>
                                  <Send
                                    width="24"
                                    height="24"
                                    onClick={() =>
                                      adjustCardCount(
                                        card._id,
                                        addCards as number
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </Popover>
                          <Tooltip
                            title="Delete"
                            aria-label={idDelete}
                            placement="top"
                            arrow
                          >
                            <button
                              className={classes.button}
                              onMouseOver={(e) => {
                                if (!card?.deleteable) {
                                  setDeleteAnchorEl(e.currentTarget);
                                  setSelectedCard(card);
                                }
                              }}
                              onClick={(e) =>
                                card?.deleteable
                                  ? deleteCardHandler(card)
                                  : null
                              }
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
        <div className={classes.editRequestDiv}>
          <div>
            <Typography className={classes.editText}>
              Cilck here to Delete Account
            </Typography>
            <div
              className={classes.editIcon}
              onClick={() => deleteAccount(selectedCard?._id)}
            >
              <Send />
            </div>
          </div>
        </div>
      </Popover>
    </Layout>
  );
};
