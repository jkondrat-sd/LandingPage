import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";

const lists = [
  {
    label: "Ketersediaan",
    url: "/executive/ketersediaan",
  },
  {
    label: "Keterjangkauan",
    url: "/executive/keterjangkauan",
  },
  {
    label: "Pemanfaatan",
    url: "/executive/pemanfaatan",
  },
  {
    label: "Status Gizi",
    url: "/executive/underweight",
  },
];

export default function PilarAccordions({ pilar }) {
  const router = useRouter();
  return (
    <Box className="py-2 w-full">
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#008444" }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            sx={{
              color: "#008444",
              fontSize: "1.2rem",
              fontFamily: "Lato",
              textTransform: "capitalize",
            }}
          >
            {pilar === 'gizi' ? 'Status Gizi' : pilar}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {lists.map((list, idx) => (
              <ListItem
                key={idx}
                disablePadding
                className="rounded-lg"
                onClick={() => router.push(list.url)}
              >
                <ListItemButton className="rounded-lg">
                  <ListItemText
                    primary={list.label}
                    sx={{
                      "& .ListItemText-primary": {
                        color: "#008444",
                        fontSize: "1.2rem",
                        fontFamily: "Lato",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
