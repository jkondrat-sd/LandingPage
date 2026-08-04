import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

const AntTabs = styled(Tabs)({
  '& .Tabs-indicator': {
    height: "0px",
  },
  minHeight: "1em",
  padding: 'auto',
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  borderBottom: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: '400',
  fontSize: "0.8em",
  color: '#757575',
  padding: "0.5em 1em",
  minHeight: "2em",
  flex: '1',
  whiteSpace: 'nowrap',
  fontFamily: [
    'Lato',
  ].join(','),
  '&:hover': {
    color: '#008444',
    opacity: 0.8,
  },
  '&.Mui-selected': {
    color: '#ffffff',
    backgroundColor: '#008444',
    fontWeight: '400',
    borderRadius: "0.8em",
  }
}));

const tabsContent = [
  {
    label: "2 Minggu",
    value: 0,
    selected: "2week",
  },
  {
    label: "3 Bulan",
    value: 1,
    selected: "3month",
  },
  {
    label: "1 Tahun",
    value: 2,
    selected: "1year",
  },
  {
    label: "Semua",
    value: 3,
    selected: "all",
  },
];


const ChartFilterTabs = ({handleChangeTabs, params}) => {

  const handleChange = (event, newValue) => {
    handleChangeTabs({
      group_by: tabsContent.find((item) => newValue === item.value)?.selected,
      selectedTab: newValue
    })
  };

  return (
    <Box
      sx={{
        background: "#CCE6DA",
        borderRadius: "16px",
        p:1,
      }}
      >
      <AntTabs
        value={Number(params?.selectedTab)}
        onChange={handleChange}
        aria-label="ant tabs"
        style={{fontSize: "0.8rem"}}
      >
        {tabsContent.map((item, index) =>
          (<AntTab value={index} label={item.label} key={index} style={{fontSize: "0.8rem"}} />)
        )}
      </AntTabs>
    </Box>
  );
}

export default ChartFilterTabs