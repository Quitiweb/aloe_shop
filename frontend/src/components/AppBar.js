import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EcoIcon from '@material-ui/icons/Eco';
import MoodIcon from '@material-ui/icons/Mood';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import FaceIcon from '@material-ui/icons/Face';
import PersonIcon from '@material-ui/icons/Person';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {Link} from 'react-router-dom'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginRight: 0
    },
    title50: {
        flexGrow: 1,
        marginRight: '-50px'
    },
    topbar: {
        backgroundColor: '#1E361E',
        zIndex: '11'
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    enlaceMain: {
        textDecoration: 'none',
        color: 'white',
        fontFamily: 'Roboto Condensed',
        fontSize: '28px',
        fontWeight: 'bold'
    },
    enlace: {
        textDecoration: 'none',
        color: 'white',
        fontFamily: 'Roboto Condensed',
    }
    }));

export default function TopBar(props) {

      const [state, setState] = React.useState({
          left: false,
      });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }

        setState({ ...state, [side]: open });
      };

      const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Mi cuenta', 'Cerrar Sesion'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <AccountBoxIcon/> : <ExitToAppIcon/>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        <ListItem button key={'Aloe'}>
            <ListItemIcon><EcoIcon/></ListItemIcon>
            <ListItemText primary={'Aloe Puro'} />
        </ListItem>
        <ListItem button key={'Facial'}>
            <ListItemIcon><MoodIcon/></ListItemIcon>
            <ListItemText primary={'Facial'} />
        </ListItem>
        <ListItem button key={'Corporal'}>
            <ListItemIcon><AccessibilityNewIcon/></ListItemIcon>
            <ListItemText primary={'Corporal'} />
        </ListItem>
        <ListItem button key={'Capilar'}>
            <ListItemIcon><FaceIcon/></ListItemIcon>
            <ListItemText primary={'Capilar'} />
        </ListItem>
        <ListItem button key={'Hombre'}>
            <ListItemIcon><PersonIcon/></ListItemIcon>
            <ListItemText primary={'Hombre'} />
        </ListItem>
        <ListItem button key={'Ofertas/Promociones'}>
            <ListItemIcon><MoneyOffIcon/></ListItemIcon>
            <ListItemText primary={'Ofertas/Promociones'} />
        </ListItem>
        <ListItem button key={'Blog'}>
            <ListItemIcon><LibraryBooksIcon/></ListItemIcon>
            <ListItemText primary={'Blog'} />
        </ListItem>
      </List>
    </div>
  );

    const classes = useStyles();

    return (
        <div>
            <AppBar position="static" className={classes.topbar} style={{position:"fixed"}}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={props.login ? classes.title : classes.title50}>
                        <Link to="/" className={classes.enlaceMain}>
                        <span>ALOESHOP</span>
                    </Link>
                    </Typography>
                    {props.login ?

                        <Link to={'/'} onClick={props.logout} className={classes.enlace}>
                            <span>Logout</span>
                        </Link>
                    :
                     <Link to="/login" className={classes.enlace}>
                        <span>Login / Sign Up</span>
                    </Link>
                    }
              </Toolbar>
        </AppBar>

        <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
          {sideList('left')}
        </Drawer>
        </div>
    )
}