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
    label: "1 Tahun",
    value: 0,
    selected: 12
  },
  {
    label: "2 Tahun",
    value: 1,
    selected: 24
  },
  {
    label: "3 Tahun",
    value: 2,
    selected: 36
  },
  {
    label: "Semua",
    value: 3,
    selected: 0
  },
];

const tabsContent2 = [
  {
    label: "3 Tahun",
    value: 0,
    selected: 3
  },
  {
    label: "5 Tahun",
    value: 1,
    selected: 5
  },
  {
    label: "10 Tahun",
    value: 2,
    selected: 10
  },
  {
    label: "Semua",
    value: 3,
    selected: 36
  },
];


const ChartFilterTabs = ({handleChangeTabs, params, tabsFilter="1"}) => {

  const tabContentFilter = tabsFilter === "2" ? tabsContent2 : tabsContent;

  const handleChange = (event, newValue) => {
    handleChangeTabs({
      range: tabContentFilter.find((item) => newValue === item.value)?.selected,
      selectedTab: newValue
    })
  };

  return (
    <Box
      sx={{
        background: "#CCE6DA",
        borderRadius: "1em",
        p:1,
      }}
      >
      <AntTabs
        value={params?.selectedTab}
        onChange={handleChange}
        aria-label="ant tabs"
        style={{fontSize: "0.85em"}}
      >
        {tabContentFilter.map((item, index) =>
          (<AntTab value={index} label={item.label} key={index} style={{fontSize: "0.85em"}} />)
        )}
      </AntTabs>
    </Box>
  );
}

export default ChartFilterTabs