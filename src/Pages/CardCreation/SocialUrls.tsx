import * as React from "react"
import { Theme, createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import { DiscordIcon } from 'Components/Icons/discordIcon';
import MuiIcons from "Components/Icons";
import BehanceIcon from 'Components/Icons/behanceIcon';
import SnapchatIcon from 'Components/Icons/snapchatIcon';
import TiktokIcon from 'Components/Icons/tiktokIcon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectIcon: {
      color: theme.palette.gray[400],
      [theme.breakpoints.down("xs")]: {
        fontSize: "16px",
      },
    },
  })
);

export const socialURLS = () => {
  const classes = useStyles()
  const theme = useTheme();
  return [
    {
      label: "Facebook",
      value: "facebook",
      icon: <MuiIcons className={classes.selectIcon} icon="facebook" fontSize="small" />
    },
    {
      label: "Instagram",
      value: "instagram",
      icon: <MuiIcons className={classes.selectIcon} icon="instagram" fontSize="small" />
    },
    {
      label: "Linkedin",
      value: "linkedin",
      icon: <MuiIcons className={classes.selectIcon} icon="linkedin" fontSize="small" />
    },
    {
      label: "Twitter",
      value: "twitter",
      icon: <MuiIcons className={classes.selectIcon} icon="twitter" fontSize="small" />
    },
    {
      label: "Telegram",
      value: "telegram",
      icon: <MuiIcons className={classes.selectIcon} icon="telegram" fontSize="small" />
    },
    {
      label: "Pintrest",
      value: "pintrest",
      icon: <MuiIcons className={classes.selectIcon} icon="PinterestIcon" fontSize="small" />
    },
    {
      label: "Reddit",
      value: "reddit",
      icon: <MuiIcons className={classes.selectIcon} icon="reddit" fontSize="small" />
    },
    {
      label: "Discord",
      value: "discord",
      icon: <DiscordIcon color={theme.palette.gray[400]} />
    },
    {
      label: "Behance",
      value: "behance",
      icon: <BehanceIcon color={theme.palette.gray[400]} width='20' height='20' />
    },
    {
      label: "Snapchat",
      value: "snpachat",
      icon: <SnapchatIcon color={theme.palette.gray[400]} width='20' height='20' />
    },
    {
      label: "TikTok",
      value: "tiktok",
      icon: <TiktokIcon color={theme.palette.gray[400]} width='20' height='20' />
    },
    {
      label: "WhatsApp",
      value: "whatsapp",
      icon: <MuiIcons className={classes.selectIcon} icon="whatsapp" fontSize="small" />
    },
    {
      label: "Phone",
      value: "phone",
      icon: <MuiIcons className={classes.selectIcon} icon="call" fontSize="small" />
    },
    {
      label: "Website",
      value: "website",
      icon: <MuiIcons className={classes.selectIcon} icon="globe" fontSize="small" />
    },
    {
      label: "Email",
      value: "email",
      icon: <MuiIcons className={classes.selectIcon} icon="MailOutlineIcon" fontSize="small" />
    },
    {
      label: "Select..",
      value: "Select...",
      icon: <MuiIcons className={classes.selectIcon} icon="dots" fontSize="small" />
    },
  ];
}