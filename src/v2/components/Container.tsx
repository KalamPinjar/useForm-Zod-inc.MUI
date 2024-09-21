import { Box, Paper, Stack, Typography } from "@mui/material";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        height: "100svh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 4, width: 400 }}>
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h5">Employment Form</Typography>
          {children}
        </Stack>
      </Paper>
    </Box>
  );
}
