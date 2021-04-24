import React from 'react';
import Box from '@material-ui/core/Box';

const TabPanel = (props) => {
  const { children, value, index, className } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      className={className}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default TabPanel;
