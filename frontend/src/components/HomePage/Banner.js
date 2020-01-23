import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Aloe from '../../img/aloebig.jpg';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    bgimage: {
        position: 'absolute',
        top: '64px',
        width: '100%',
        height: '750px',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    black: {
        position: 'absolute',
        top: '64px',
        width: '100%',
        height: '750px',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: '10'
    }
}));

export default function Banner(props) {
    
    const classes = useStyles();
    
    return (
        <Grid container style={{position: 'relative'}}>
            <div className={classes.black}>
                    <Grid container>
                        <Grid item xs={12} style={{marginTop: '250px'}}>
                            <Typography variant={'h2'} style={{color: 'white', fontFamily: 'serif'}}>
                                COSMÉTICA NATURAL
                            </Typography>
                            <Button variant="outlined" size={'large'}
                            style={{color: 'white', borderColor: 'white', marginTop: '50px'}}>Descubre nuestros productos</Button>
                        </Grid>
                    </Grid>
            </div>
            <div style={{backgroundImage: `url(${Aloe})`}} className={classes.bgimage}>

            </div>
            {/*<img src={Aloe} alt="Imagen de fondo" className={classes.bgimage} />*/}
        </Grid>
    )
}
