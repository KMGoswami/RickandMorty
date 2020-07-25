import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Characters from './Characters';
import Episodes from './Episodes';
import Locations from './Locations';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function MainNavigationTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  <>
    <AppBar position="static" color="default">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        fixed
      >
        <Tab label="Characters"  value={0}/>
        <Tab label="Episodes" value={1}/>
        <Tab label="Locations" value={2}/>
      </Tabs>
    </AppBar>
     <TabPanel value={value} index={0}>
        <Characters/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Episodes/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Locations/>
      </TabPanel>
      </>
  );
}
