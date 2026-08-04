import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ScrollDialog({
  open,
  setOpen,
  type = "body",
  content = () => {},
  maxWidth = "xl",
  title = "? Change this title by add 'title' prop",
  handleClose = () => {},
}) {
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        scroll={type}
        aria-labelledby="detail-sebaran-kasus"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="detail-sebaran-kasus">{title}</DialogTitle>
        <DialogContent dividers={type === "paper"}>{content()}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Tutup</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
