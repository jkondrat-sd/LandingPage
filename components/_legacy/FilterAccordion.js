import * as React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const AccordionStyled = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid rgba(0, 0, 0, 0.05)`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
}));

export default function FilterAccordion({children, title, expanded=false}) {
  const [expand, setExpand] = React.useState(false);

  React.useEffect(() => {
    setExpand(expanded);
  }, [expanded])
  return (
    <div className='w-full'>
      <AccordionStyled expanded={expand}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => setExpand(!expand)}
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails className='pt-0'>
          {children}
        </AccordionDetails>
      </AccordionStyled>
    </div>
  );
}
