import * as React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import useMediaQuery from "@/hooks/useMediaQuery";

// tabsContent example
// const tabsContent = [
//   {
//     label: "Data",
//     content: (
//       <div>Isi Data</div>
//     )
//   },
// ]

const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

const CustomTabs = ({ tabsContent=[], alignCenter=false, flag=null }) => {
  const AntTabs = styled(Tabs)({
    '& .Tabs-indicator': {
      backgroundColor: flag === "produsen" ? "#FFA600" : '#008444',
      height: "3px",
    },
  });
  
  const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    borderBottom: '3px solid #9E9E9E',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "28px",
    color: '#9E9E9E',
    fontFamily: [
      'Lato',
    ].join(','),
    '&:hover': {
      color: flag === "produsen" ? "#FFA600" : '#008444',
      opacity: 0.8,
    },
    '&.Mui-selected': {
      color: flag === "produsen" ? "#FFA600" : '#008444',
      fontWeight: theme.typography.fontWeightBold,
    }
  }));
  
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box className={mobileTab || alignCenter && 'flex justify-center'}>
        <Box>
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant tabs"
            style={{fontSize: mobileTab ? '24px' : '28px'}}
          >
            {tabsContent.map((item, index) =>
              (<AntTab value={index} label={item.label} key={index} style={{fontSize: mobileTab ? '24px' : '28px'}} onClick={item.onClick} />)
            )}
          </AntTabs>
        </Box>
      </Box>
      {tabsContent.map((item, index) =>
        (<TabPanel value={value} index={index} key={index}>{item.content}</TabPanel>)
      )}
    </Box>
  );
}

export default CustomTabs;