import * as React from 'react'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { TickIcon } from 'Components/Icons/tickIcon';

interface Props {
  cardCount: number | string
  subscription: "Personal" | "Startup" | "SME" | "SME+" | "Agency" | string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: "16px",
      minWidth: "200px",
      maxWidth: "220px",
      background: "#FFFFFF",
      border: "1px solid #E3E3E3",
      borderRadius: "8px",
      cursor: "pointer"
    },
    cardHeading: {
      fontStyle: "normal",
      fontWeight: 300,
      width: "30px",
      fontSize: "16.1133px",
      lineHeight: "16px",
    },
    cardCount: {
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "17px",
      lineHeight: "13px",
      textAlign: "right",
      marginTop: "10px",
      color: "#455154"
    },
    cardText: {
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: "8px",
      textAlign: "right",
      marginTop: "2px",
      color: "#455154"
    },
    cardDetail: {
      display: "flex",
      alignItems: "center"
    }
  })
);

export const SubscribedCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.card}>
      <Grid container alignItems='center' justifyContent='space-between'>
        <Grid item xs={8}>
          <Typography className={classes.cardHeading}>{props.subscription} Subscription </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.cardCount}>{props.cardCount}</Typography>
          <Typography className={classes.cardText} align="right">Cards</Typography>
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems='center' justifyContent='space-between'>
        {props.cardCount === "Personal" ?
          <Grid item xs={12}>
            <div className={classes.cardDetail}>
              <TickIcon />
              &nbsp; &nbsp;
              <Typography className={classes.cardText}>
                $2 per user monthly
              </Typography>
            </div>
            <div className={classes.cardDetail}>
              <TickIcon />
              &nbsp; &nbsp;
              <Typography className={classes.cardText}>
                Customizable card and logo
              </Typography>
            </div>
          </Grid>
          : props.subscription === "Startup" ?
            <Grid item xs={12}>
              <div className={classes.cardDetail}>
                <TickIcon />
                &nbsp; &nbsp;
                <Typography className={classes.cardText}>
                  $1.5 per user monthly
                </Typography>
              </div>
              <div className={classes.cardDetail}>
                <TickIcon />
                &nbsp; &nbsp;
                <Typography className={classes.cardText}>
                  Customizable card and logo
                </Typography>
              </div>
            </Grid>
            : props.subscription === "SME" ?
              <Grid item xs={12}>
                <div className={classes.cardDetail}>
                  <TickIcon />
                  &nbsp; &nbsp;
                  <Typography className={classes.cardText}>
                    $1.2 per user monthly
                  </Typography>
                </div>
                <div className={classes.cardDetail}>
                  <TickIcon />
                  &nbsp; &nbsp;
                  <Typography className={classes.cardText}>
                    Customizable card and logo
                  </Typography>
                </div>
              </Grid>
              : props.subscription === "SME+" ?
                <Grid item xs={12}>
                  <div className={classes.cardDetail}>
                    <TickIcon />
                    &nbsp; &nbsp;
                    <Typography className={classes.cardText}>
                      $1.2 per user monthly
                    </Typography>
                  </div>
                  <div className={classes.cardDetail}>
                    <TickIcon />
                    &nbsp; &nbsp;
                    <Typography className={classes.cardText}>
                      Customizable card and logo
                    </Typography>
                  </div>
                  <div className={classes.cardDetail}>
                    <TickIcon />
                    &nbsp; &nbsp;
                    <Typography className={classes.cardText}>
                      Fully customizable loading page
                    </Typography>
                  </div>
                </Grid>
                : props.subscription === "Agency" ?
                  <Grid item xs={12}>
                    <div className={classes.cardDetail}>
                      <TickIcon />
                      &nbsp; &nbsp;
                      <Typography className={classes.cardText}>
                        $1.2 per user monthly
                      </Typography>
                    </div>
                    <div className={classes.cardDetail}>
                      <TickIcon />
                      &nbsp; &nbsp;
                      <Typography className={classes.cardText}>
                        Customizable card and logo
                      </Typography>
                    </div>
                    <div className={classes.cardDetail}>
                      <TickIcon />
                      &nbsp; &nbsp;
                      <Typography className={classes.cardText}>
                        Fully customizable loading page
                      </Typography>
                    </div>
                  </Grid> : ""
        }
      </Grid>
    </div >
  )
}
