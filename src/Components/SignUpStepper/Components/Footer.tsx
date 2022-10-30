import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from '@material-ui/core'
import LogoSmall from "Components/Logo/LogoSmall";
import { Copyright } from "Components/Icons/copyright";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		flexContainer: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			height: "20px"
		},
		verticalStroke: {
			color: "#252D38",
			display: "flex",
			alignItems: "center",
			// marginTop: "30px",
			fontSize: "24px"
		},
		rights: {
			// fontFamily: "Tajawal",
			fontWeight: 300,
			fontSize: "13px",
			display: "flex",
			alignItems: "center",
			color: "#252D38"
		},
		text: {
			fontWeight: 400,
			fontSize: "18px",
			lineHeight: "27px",
			display: "flex",
			alignItems: "center",
			color: "#58696D",
			marginBottom: "4px"
		}
	})
);

export const Footer = () => {
	const classes = useStyles()
	return (
		<Grid container justifyContent="space-between" alignItems="center">
			<Grid item xs={7} >
				<div className={classes.flexContainer}>
					<Copyright style={{ marginBottom: "6px" }} /> &nbsp; <LogoSmall /> &nbsp; <p className={classes.verticalStroke}>|</p> &nbsp; <Typography className={classes.rights}> All rights reserved 2022</Typography>
				</div>
			</Grid>
			<Grid item xs={5}>
				<div className={classes.flexContainer}>
					<Typography className={classes.text}>T&amp;C</Typography>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<Typography className={classes.text}>Privacy Policy</Typography>
				</div>
			</Grid>
		</Grid>
	)
}
