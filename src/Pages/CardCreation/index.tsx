import * as React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import {
  Avatar,
  Grid,
  Popover,
  Popper,
  Switch,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@material-ui/core";

// Css
import useStyles from "./Style";

// Components
import Layout from "Components/Layout";
import Button from "Components/Button";
import AntSwitch from "Components/Switch";
import TextInput from "Components/Form/TextInput";
import MuiIcons from "Components/Icons";
import Delete from "Components/Icons/deleteRound";
import TextArea from "Components/Form/TextArea";
import AddImageModal from "Components/Form/AddImage/AddImageModal";
import AddMarkerModal from "Components/Form/AddMarker/AddMarkerModal";
import AddLogoModal from "Components/Form/AddLogo/AddLogoModal";
import AddBackgroundModal from "Components/Form/AddBackground/AddBackgroundModal";
import CopyLink from "Components/Icons/copyLink";
import { SelectWithInput } from "Components/Form/SelectWithIcon";
import { useDebounce } from "Hooks/useDebounce";
import { socialURLS } from "./SocialUrls";
import SocialLinksPlaceholder from "./SocialLinksPlaceHolder";
import { Send } from "Components/Icons/send";
import { QRCodeIcon } from "Components/Icons/qrCodeDownload";

// Context
import { UserContext } from "Context/AuthContext";
// mutattion
import {
  createNewCard,
  getMarkers,
  useCheckShortname,
  editCard,
  //   emailEditRequest,
} from "Hooks/useCards";
import DownloadQRModal from "Components/Form/DownloadQRCode";

const validationSchema = yup.object({
  image: yup.string(),
  name: yup
    .string()
    .min(4, "Name should be of minimum 4 characters length")
    .required("Name is Required"),
  title: yup
    .string()
    .min(4, "Title should be of minimum 4 characters length")
    .required("Title is Required"),
  email: yup.string().email().required("Email is Required"),
  about: yup.string().required("About is Required"),
  shortName: yup
    .string()
    .min(4, "Short Name should be of minimum 4 characters length")
    .matches(
      /^([A-Za-z0-9_-]+)$/,
      "Short name should only contain letters and numbers"
    )
    .required("Link is Required"),
  marker: yup
    .object()
    .shape({
      markerImage: yup.string().required("marker is required"),
      markerFile: yup.string().required("marker is required"),
    })
    .required("marker is required"),
});

export const CardCreationPage = () => {
  // Initials
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const params = useParams<any>();
  const isEditMode = !!params?.cardId;
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const shortNamePattern = /^([a-z0-9_-]+)$/;

  // URLS array in select dropdown
  const URLS = socialURLS();

  // Contexts
  const { cardData } = React.useContext(UserContext);

  // States
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openMarkerModal, setOpenMarkerModal] = React.useState<boolean>(false);
  const [openLogoModal, setOpenLogoModal] = React.useState<boolean>(false);
  const [openBgModal, setOpenBgModal] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [editAnchorEl, setEditAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const [profileImgName, setProfileImageName] = React.useState<string>("");
  const [profileImg, setProfileImage] = React.useState<any>("");
  const [logoImagePreview, setLogoImagePreview] = React.useState<any>(
    isEditMode ? cardData?.logoImage : ""
  );
  const [logoImg, setLogoImage] = React.useState<any>("");
  const [bgImagePreview, setBgImagePreview] = React.useState<any>(
    isEditMode ? cardData?.backgroundImage : ""
  );
  const [backgroundImg, setBackgroundImage] = React.useState<any>("");
  const [cardImage, setCardImage] = React.useState<any>("");
  const [checking, setChecking] = React.useState<boolean>(false);
  const [markerData, setMarkerData] = React.useState<any>([]);
  const [selectedMarker, setSelectedMarker] = React.useState<any>(
    isEditMode ? cardData?.marker : ""
  );
  const [cardImageError, setCardImageError] = React.useState<boolean>(false);
  const [isShortNameValid, setIsShortNameValid] =
    React.useState<boolean>(false);
  const [selectedCard, setSelectedCard] = React.useState<any>(null);
  const [enableEmailField, setEnableEmailField] = React.useState<boolean>();
  const [downloadQRModal, setDownloadQRModal] = React.useState<boolean>(false);
  // mutatations
  const {
    data: shortNameResult,
    mutate: checkshortName,
    isError,
  } = useCheckShortname();
  const {
    data,
    mutate: createCard,
    isError: ErrorInCard,
    isLoading,
  } = createNewCard();
  const {
    data: editCardData,
    mutate: editCardMutation,
    isError: ErrorInCardEdit,
    isLoading: isloadingEditingCard,
  } = editCard();
  const { data: markersApiData, refetch: fetchMarkers } = getMarkers();
  //   const {
  //     data: emailEditRequestData,
  //     isError: emailEditRequestError,
  //     mutate: emailEdit,
  //     isSuccess,
  //   } = emailEditRequest();

  //   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     setAnchorEl(event.currentTarget);
  //   };

  const handleEmailEditOpen = (e: {
    currentTarget: React.SetStateAction<HTMLElement | null>;
  }) => {
    if (!cardData?.emailEditable && isEditMode && isMobile)
      setEditAnchorEl(e.currentTarget);
  };
  const handleEmailEditClose = () => {
    setEditAnchorEl(null);
  };

  const InitialValues = () => {
    let initialValues = {
      name: "",
      title: "",
      about: "",
      email: "",
      shortName: "",
      marker: { markerLink: "", markerImage: "", uniqueId: "" },
      activeStatus: false,
      links: [{ name: "Select...", link: "" }],
    };
    if (isEditMode)
      initialValues = {
        name: cardData?.name,
        title: cardData?.title,
        about: cardData?.about,
        email: cardData?.email,
        shortName: cardData?.shortName,
        marker: cardData?.marker,
        activeStatus: cardData?.activeStatus,
        links: cardData?.links,
      };
    return initialValues;
  };

  // Formik instance
  const formik = useFormik({
    initialValues: InitialValues(),
    validationSchema: validationSchema,
    onSubmit: (values) => onSubmitForm(values),
  });

  // UseEffects
  React.useEffect(() => {
    if (ErrorInCard) toast.error("Something Went Wrong");
    if (data) {
      toast.success("Card Created");
      history.push("/");
    }
  }, [ErrorInCard, data]);

  //   React.useEffect(() => {
  //     if (emailEditRequestError) toast.error("Something Went Wrong");
  //     if (emailEditRequestData) {
  //       toast.success("Requets was sent successfully!");
  //     }
  //   }, [emailEditRequestError, emailEditRequestData]);

  React.useEffect(() => {
    if (ErrorInCardEdit) toast.error("Something Went Wrong");
    if (editCardData) {
      toast.success("Card updated");
      history.push("/");
    }
  }, [ErrorInCardEdit, editCardData]);

  React.useEffect(() => {
    if (markersApiData) setMarkerData(markersApiData);
  }, [markersApiData]);

  React.useEffect(() => {
    if (isError) {
      setChecking(false);
      formik.setFieldError("shortName", "Already exists");
    }
  }, [shortNameResult, isError]);

  React.useEffect(() => {
    if (shortNameResult) {
      setChecking(false);
      setIsShortNameValid(true);
    }
  }, [shortNameResult]);

  React.useEffect(() => {
    setCardImage(profileImg);
  }, [profileImg]);

  React.useEffect(() => {
    if (isEditMode) setCardImage(cardData?.cardImage);
  }, [isEditMode]);

  React.useEffect(() => {
    if (cardImage !== "") {
      setCardImageError(false);
    }
  }, [cardImage]);

  const debouncedValue = useDebounce(formik.values.shortName, 1000);
  React.useEffect(() => {
    if (isShortNameValid) checkshortName({ shortName: debouncedValue });
  }, [debouncedValue]);

  // Event Handlers

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const onSelectChange = (value: string, index: number) => {
    const newArr = formik.values.links?.map((link, i) => {
      if (i === index) link.name = value;
      return link;
    });
    formik.setValues({ ...formik.values, links: newArr });
  };

  const onInputLinkChange = (value: string, index: number) => {
    const newArr = formik.values.links?.map((link, i) => {
      if (i === index) {
        link.link = value;
      }
      return link;
    });
    formik.setValues({ ...formik.values, links: newArr });
  };

  const addNewLink = () => {
    const prevRows = [...formik.values.links];
    prevRows.push({ name: "Select...", link: "" });
    formik.setValues({ ...formik.values, links: prevRows });
  };

  const onDeleteLink = (index: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newArr = formik.values.links.filter((link, i) => i != index);
    formik.setValues({ ...formik.values, links: newArr });
  };

  const handleChangeShortName = (e: any) => {
    const value = e.target.value;

    if (value.length >= 4) setChecking(true);
    if (value === "") setChecking(false);

    formik.setFieldTouched("shortName", true);
    formik.setFieldValue("shortName", value);
    setIsShortNameValid(true);
    const isValidUserName = shortNamePattern.test(value);
    if (!isValidUserName) {
      setIsShortNameValid(false);
      setChecking(false);
    }
  };

  const openEditPopper = (
    event: React.MouseEvent<HTMLButtonElement>,
    card: any
  ) => {
    if (!card?.emailEditable) {
      setAnchorEl(event.currentTarget);
      setEnableEmailField(false);
    } else {
      setEnableEmailField(true);
    }
  };

  const onSubmitForm = (values: any) => {
    // checking empty fields
    if (cardImage === "") {
      setCardImageError(true);
    } else {
      // removing empty socaial links
      const filteredLinksData = filterEmptyObject(values.links);

      let marker: any = {
        markerImage: selectedMarker.markerImage,
        markerFile: selectedMarker.markerFile,
        uniqueId: selectedMarker.uniqueId,
      };

      let formData: any = new FormData();
      formData.append("name", values.name);
      formData.append("title", values.title);
      formData.append("about", values.about);
      formData.append("email", values.email);
      formData.append("shortName", values.shortName);
      formData.append("activeStatus", values.activeStatus);
      formData.append("links", JSON.stringify(filteredLinksData));
      formData.append("marker", JSON.stringify(marker));
      formData.append("cardImage", cardImage);
      formData.append("logoImage", logoImg);
      formData.append("backgroundImage", backgroundImg);

      if (isEditMode) editCardMutation({ id: params?.cardId, formData });
      else createCard(formData);
    }
  };

  const copyCardLink = () => {
    navigator.clipboard.writeText(
      `https://cards.sailspad.com/${formik.values.shortName}`
    );
    toast.info("Copied to clipboard!");
  };

  const onSeletectMarker = (marker: any) => {
    formik.setFieldTouched("marker", true);
    formik.setFieldValue("marker", marker);
    setSelectedMarker(marker);
    setAnchorEl(null);
  };

  // constants

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const openEmailEdit = Boolean(editAnchorEl);
  const emailEditId = openEmailEdit ? "email-edit-popper" : undefined;

  return (
    <Layout>
      <div style={{ display: "flex", alignItems: "center" }}>
        <MuiIcons
          icon="backArrow"
          className={classes.backIcon}
          onClick={() => history.push("/")}
        />
        &nbsp;&nbsp;&nbsp;
        <Typography className={classes.heading}>
          {!isEditMode ? "Create Card" : "Edit Card"}
        </Typography>
      </div>
      <br />
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.wrapper}>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={12} md={6}>
              <Grid
                container
                spacing={2}
                justifyContent={!isMobile ? "flex-start" : "space-between"}
              >
                <Grid item xs={3} md={4}>
                  <AddImageModal
                    openModal={openModal}
                    handleCloseModal={() => setOpenModal(false)}
                    handleSaveChanges={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    blobImage={profileImg}
                    setBlobImage={setProfileImage}
                    setOpenModal={setOpenModal}
                    setProfileImageName={setProfileImageName}
                  />
                  <AddMarkerModal
                    fetchMarkers={fetchMarkers}
                    openModal={openMarkerModal}
                    handleCloseModal={() => setOpenMarkerModal(false)}
                    handleSaveChanges={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    setOpenModal={setOpenModal}
                  />
                  <AddLogoModal
                    openModal={openLogoModal}
                    handleCloseModal={() => setOpenLogoModal(false)}
                    handleSaveChanges={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    setImagePreview={setLogoImagePreview}
                    setBlobImage={setLogoImage}
                    setOpenModal={setOpenLogoModal}
                  />
                  <AddBackgroundModal
                    openModal={openBgModal}
                    handleCloseModal={() => setOpenBgModal(false)}
                    handleSaveChanges={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    setImagePreview={setBgImagePreview}
                    setBlobImage={setBackgroundImage}
                    setOpenModal={setOpenBgModal}
                  />
                  <DownloadQRModal
                    openModal={downloadQRModal}
                    handleCloseModal={() => setDownloadQRModal(false)}
                    shortName={formik.values.shortName}
                  />
                  <div className={classes.editImageContainer}>
                    {cardImage !== "" ? (
                      <span className={classes.editAndDelete}>
                        <MuiIcons
                          className={classes.actionIcons}
                          icon="cancel"
                          onClick={() => {
                            setCardImage("");
                            setProfileImage("");
                          }}
                          fontSize="small"
                        />
                        <MuiIcons
                          className={classes.actionIcons}
                          onClick={() => setOpenModal(true)}
                          icon="edit"
                          fontSize="small"
                        />
                      </span>
                    ) : (
                      <span
                        className={classes.addImage}
                        onClick={() => setOpenModal(true)}
                      >
                        <MuiIcons icon="addPhoto" fontSize="large" />
                      </span>
                    )}
                    <div>
                      <Avatar
                        src={cardImage}
                        className={classes.userProfilePic}
                        variant="rounded"
                      />
                    </div>
                  </div>
                  {cardImageError && (
                    <div>
                      <Typography
                        variant="body2"
                        style={{ color: "red", marginTop: "5px" }}
                      >
                        &nbsp;&nbsp;&nbsp;{"Card Image is Required"}
                      </Typography>
                    </div>
                  )}
                </Grid>
                <Grid item xs={7} sm={7} md={6}>
                  <div className={classes.inputContainer}>
                    <TextInput
                      name="name"
                      type="text"
                      placeholder="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </div>
                  <div className={classes.inputContainer}>
                    <TextInput
                      name="title"
                      type="text"
                      placeholder="Title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title}
                    />
                  </div>
                  <Grid
                    className={classes.markerContainer}
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={5} sm={4} md={5}>
                      <div
                        aria-describedby={id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Avatar
                          src={selectedMarker?.markerImage}
                          className={classes.markerPic}
                          variant="rounded"
                        />
                        {markerData?.length && (
                          <MuiIcons
                            onClick={handleClick}
                            className={classes.popoverBtn}
                            icon="arrowDropDown"
                          />
                        )}
                      </div>
                      {markerData?.length ? (
                        <Popper id={id} open={open} anchorEl={anchorEl}>
                          <div className={classes.popoverDiv}>
                            {markerData?.map((m: any, i: number) => (
                              <div key={i} className={classes.markerDiv}>
                                <div className={classes.markerCode}>
                                  {m?.uniqueId}
                                </div>
                                <Avatar
                                  src={m?.markerImage}
                                  className={classes.popoverMarkerPic}
                                  variant="rounded"
                                  onClick={() => onSeletectMarker(m)}
                                />
                              </div>
                            ))}
                          </div>
                        </Popper>
                      ) : null}
                    </Grid>
                    <Grid item xs={7}>
                      <Button
                        text="New Marker"
                        className={classes.navButton}
                        icon={<MuiIcons icon="add" />}
                        onClick={() => setOpenMarkerModal(true)}
                      />
                    </Grid>
                    {formik.touched.marker?.markerImage &&
                      Boolean(formik.errors.marker?.markerImage) && (
                        <div>
                          <Typography
                            variant="body2"
                            style={{ color: "red", marginTop: "5px" }}
                          >
                            {formik.touched.marker &&
                              formik.errors.marker?.markerImage}
                          </Typography>
                        </div>
                      )}
                  </Grid>
                </Grid>
              </Grid>
              <br />
              <br />

              <Grid item xs={12} md={11}>
                <label>
                  <Typography className={classes.inputLabel}>About:</Typography>
                </label>
                <br />
                <div className={classes.aboutContainer}>
                  <TextArea
                    style={{
                      minWidth: "100%",
                      maxWidth: "-webkit-fill-available",
                      maxHeight: "100px",
                      minHeight: "150px",
                      // margin: "0px 8px"
                    }}
                    rows={3}
                    maxLength={300}
                    columns={33}
                    name="about"
                    value={formik.values.about}
                    onChange={formik.handleChange}
                    error={formik.touched.about && Boolean(formik.errors.about)}
                    helperText={formik.touched.about && formik.errors.about}
                  />
                </div>
              </Grid>
              <br />
              <Grid
                className={classes.shortContainer}
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={4} md={3}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography className={classes.inputLabel}>
                      Active
                    </Typography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <AntSwitch
                      checked={formik.values.activeStatus}
                      name="cardCheck"
                      onChange={() =>
                        formik.setFieldValue(
                          "activeStatus",
                          !formik.values.activeStatus,
                          true
                        )
                      }
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </div>
                </Grid>
                <Grid item xs={8} sm={6} md={6}>
                  <div className={classes.uploadLogoDiv}>
                    <div className={classes.previewImage}>
                      {logoImagePreview && (
                        <MuiIcons
                          icon="cancel"
                          onClick={() => {
                            setLogoImage("");
                            setLogoImagePreview("");
                          }}
                          className={classes.deleteIcon}
                          fontSize="small"
                        />
                      )}
                      <Avatar
                        src={logoImagePreview}
                        className={classes.popoverMarkerPic}
                        variant="rounded"
                      />
                    </div>
                    <Button
                      text="Upload Logo"
                      className={classes.navButton}
                      icon={<MuiIcons icon="add" />}
                      onClick={() => setOpenLogoModal(true)}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              className={classes.secondContainer}
              item
              xs={12}
              sm={12}
              md={6}
            >
              <div
                style={{ position: "relative" }}
                aria-describedby={emailEditId}
                onMouseOver={(e) => {
                  if (!cardData?.emailEditable && isEditMode && !isMobile)
                    setEditAnchorEl(e.currentTarget);
                }}
              >
                {/* {!cardData?.emailEditable && isEditMode && isMobile && (
                  <div className={classes.editRequestDivMobile}>
                    <div>
                      <Typography className={classes.editText}>
                        Cilck here to send Edit Request to the user Email
                      </Typography>
                      <div
                        className={classes.editIcon}
                        onClick={() => emailEdit({ _id: cardData?._id })}
                      >
                        <Send />
                      </div>
                    </div>
                  </div>
                )} */}

                <TextInput
                  name="email"
                  type="text"
                  placeholder="User Email"
                  disabled={isEditMode && !cardData?.emailEditable}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>
              <br />
              <Grid container alignItems="center" justifyContent="flex-start">
                <Grid item xs={6}>
                  <Typography className={classes.linkPlaceholder}>
                    https://cards.sailspad.com/
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextInput
                    name="shortName"
                    type="text"
                    placeholder="Link"
                    value={formik.values.shortName}
                    onChange={handleChangeShortName}
                    loading={checking}
                    error={
                      formik.touched.shortName &&
                      Boolean(formik.errors.shortName)
                    }
                    helperText={
                      formik.touched.shortName && formik.errors.shortName
                    }
                  />
                </Grid>
                <Grid item xs={1}>
                  <Tooltip
                    title="Download QR Code"
                    aria-label="QRCode"
                    placement="right"
                    arrow
                  >
                    <div
                      className={classes.customBtn}
                      onClick={() => setDownloadQRModal(true)}
                    >
                      &nbsp;&nbsp; <QRCodeIcon />
                    </div>
                  </Tooltip>
                </Grid>
                <Grid item xs={1}>
                  <Tooltip
                    title="Copy Link"
                    aria-label="copyLink"
                    placement="right"
                    arrow
                  >
                    <div
                      className={classes.customBtn}
                      onClick={() => copyCardLink()}
                    >
                      &nbsp;&nbsp; <CopyLink />
                    </div>
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid alignItems="center" container>
                <Grid item xs={12}>
                  {formik.values.links.length > 0 ? (
                    <div className={classes.socialLinksContainer}>
                      {formik.values.links?.map((link, index) => (
                        <Grid
                          key={index}
                          alignItems="center"
                          container
                          justifyContent="space-between"
                        >
                          <div className={classes.selectLink}>
                            <Grid item xs={4}>
                              <SelectWithInput
                                value={link.name}
                                options={URLS}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                handleChange={(e: any) =>
                                  onSelectChange(e.target.value, index)
                                }
                              />
                            </Grid>
                            <Grid item xs={7}>
                              <TextInput
                                style={{ borderRadius: "20px" }}
                                name="link"
                                value={link.link}
                                type="text"
                                placeholder={SocialLinksPlaceholder(link.name)}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onChange={(e: any) =>
                                  onInputLinkChange(e.target.value, index)
                                }
                              />
                            </Grid>
                            <Grid item xs={1}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  float: "right",
                                }}
                              >
                                <Tooltip
                                  title="Delete Link"
                                  aria-label="delete"
                                  placement="right"
                                  arrow
                                >
                                  <button
                                    className={classes.customBtn}
                                    onClick={() => onDeleteLink(index)}
                                  >
                                    <Delete />
                                  </button>
                                </Tooltip>
                              </div>
                            </Grid>
                          </div>
                        </Grid>
                      ))}
                    </div>
                  ) : (
                    <Typography
                      className={classes.socialLinksContainer}
                      align="center"
                    >
                      No Links Added <br /> (Click on Add Button to Add Your
                      Social Account)
                    </Typography>
                  )}
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs={3}>
                    {formik.values.links.length !== 5 && (
                      <div
                        className={classes.addButton}
                        onClick={() => addNewLink()}
                      >
                        <MuiIcons
                          className={classes.addIcon}
                          icon="add"
                          fontSize="small"
                        />
                        &nbsp;Add&nbsp;
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={9}>
                    <div className={classes.backgroundLogoDiv}>
                      <div className={classes.previewImage}>
                        {bgImagePreview && (
                          <MuiIcons
                            icon="cancel"
                            onClick={() => {
                              setBackgroundImage("");
                              setBgImagePreview("");
                            }}
                            className={classes.deleteIcon}
                            fontSize="small"
                          />
                        )}
                        <Avatar
                          src={bgImagePreview}
                          className={classes.popoverMarkerPic}
                          variant="rounded"
                        />
                      </div>
                      &nbsp;&nbsp;&nbsp;
                      <Button
                        text="Upload Background"
                        className={classes.navButton}
                        icon={<MuiIcons icon="add" />}
                        onClick={() => setOpenBgModal(true)}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="flex-end">
                <Button
                  text={isEditMode ? "Update Card" : "Create Card"}
                  loading={isLoading || isloadingEditingCard}
                  submit="submit"
                  className={classes.createButton}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </form>
      {!isMobile && (
        <Popover
          id={emailEditId}
          open={openEmailEdit}
          anchorEl={editAnchorEl}
          onClose={handleEmailEditClose}
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
                onClick={() => emailEdit({ _id: cardData?._id })}
              >
                <Send />
              </div>
            </div>
          </div> */}
        </Popover>
      )}
    </Layout>
  );
};

export default CardCreationPage;

// Function to remove empty value object from links Array
const filterEmptyObject = (data: any[]) =>
  data.filter((obj) =>
    Object.values(obj).every((o) => {
      if (!o) {
        // this will also check for undefined, empty string, 0, false, NaN.
        return false;
      }
      return true;
    })
  );
