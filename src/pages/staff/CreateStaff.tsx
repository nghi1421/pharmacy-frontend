import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom";

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});
const CreateStaff: React.FC = () => {
    const navigate = useNavigate()
    const backToTable = () => {
        navigate('/staffs')
    }
    return (
    <Paper sx={{ px:6, py:4 }}>
        <Typography variant="h6" gutterBottom>
            Shipping address
        </Typography>
        <Grid container spacing={4}>
            <Grid item xs={8} sm={4}>
            <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="fname"
            />
            </Grid>
            <Grid item xs={8} sm={4}>
            <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="lname"
            />
            </Grid>
            <Grid item xs={8}>
            <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="billing address-line1"
            />
            </Grid>
            <Grid item xs={8}>
            <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="billing address-line2"
            />
            </Grid>
            <Grid item xs={8} sm={4}>
            <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="billing address-level2"
            />
            </Grid>
            <Grid item xs={8} sm={4}>
            <TextField id="state" name="state" label="State/Province/Region" fullWidth />
            </Grid>
            <Grid item xs={8} sm={4}>
            <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="billing postal-code"
            />
            </Grid>
            <Grid item xs={8} sm={4}>
            <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="billing country"
            />
            </Grid>
            <Grid item xs={8}>
            <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="Use this address for payment details"
            />
            </Grid>
            </Grid>

            <Grid container sx={{
                display: 'flex',
                justifyContent: "end",
                gap: 2
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        textTransform: 'none',
                    }}
                >
                    Thêm
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    sx={{
                        textTransform: 'none',
                    }}
                    onClick={backToTable}
                >
                    Quay về
                </Button>
            </Grid>
           
            
    </Paper>)
}

export default CreateStaff