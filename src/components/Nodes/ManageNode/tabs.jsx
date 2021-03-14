// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import {Tabs, Tab, Typography, Box} from '@material-ui/core';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={1}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     // backgroundColor: theme.palette.background.paper,
//   },
// }));

// export default function SimpleTabs() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
//           <Tab label="Item 1" {...a11yProps(0)} />
//           <Tab label="Item 2" {...a11yProps(1)} />
//           <Tab label="Item 3" {...a11yProps(2)} />
//           <Tab label="Item 4" {...a11yProps(2)} />
//           <Tab label="Item 5" {...a11yProps(2)} />
//           <Tab label="Item 6" {...a11yProps(2)} />
//           <Tab label="Item 7" {...a11yProps(2)} />
//         </Tabs>
//       </AppBar>
//       <TabPanel value={value} index={0}>Item One</TabPanel>
//       <TabPanel value={value} index={1}>Item 2</TabPanel>
//       <TabPanel value={value} index={2}>Item 3</TabPanel>
//       <TabPanel value={value} index={3}>Item 4</TabPanel>
//       <TabPanel value={value} index={4}>Item 5</TabPanel>
//       <TabPanel value={value} index={5}>Item 6</TabPanel>
//       <TabPanel value={value} index={6}>Item 7</TabPanel>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Tabs, Tab, TabContainer, TabContent, TabPane} from 'react-bootstrap';

const ManagerNodeTabs = () => {
  return (
    <div className="container">
      <Tabs defaultActiveKey="suricata" id="uncontrolled-tab-example">
        <Tab eventKey="suricata" title="Suricata"><p>1</p></Tab>
        <Tab eventKey="zeek" title="Zeek"><p>2</p></Tab>
        <Tab eventKey="snort" title="Snort"><p>3</p></Tab>
        <Tab eventKey="transport-wazuh" title="Transport - Wazuh"><p>3</p></Tab>
        <Tab eventKey="transport-filebeat" title="Transport - Filebeat"><p>3</p></Tab>
        <Tab eventKey="software-tap" title="Software TAP"><p>3</p></Tab>
        <Tab eventKey="analyzer" title="Analyzer"><p>3</p></Tab>
      </Tabs>
    </div>
  )
}

export default ManagerNodeTabs
