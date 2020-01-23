import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import {Link as RTLink} from 'react-router-dom'


function Nav(props) {
  const logged_out_nav = (
      <Grid container>
        <Grid item xs={12} style={{marginTop: '25px'}}>
          {/*<Link onClick={() => props.display_form('signup')} style={{marginRight: '15px', cursor: 'pointer'}}>¿No tienes cuenta? Registrate gratis</Link>*/}
        </Grid>
      </Grid>
  );

  const logged_in_nav = (
      <RTLink to="/" onClick={props.handle_logout}></RTLink>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};