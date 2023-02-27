// import * as React from "react";
// import { CssVarsProvider, useColorScheme } from "@mui/material/styles";
// import Sheet from "@mui/joy/Sheet";
// import Typography from "@mui/material/Typography";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import Input from "@mui/material/Input";
// import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";

// function ModeToggle() {
//   const { mode, setMode } = useColorScheme();
//   const [mounted, setMounted] = React.useState(false);

//   // necessary for server-side rendering
//   // because mode is undefined on the server
//   React.useEffect(() => {
//     setMounted(true);
//   }, []);
//   if (!mounted) {
//     return null;
//   }

//   return (
//     <Button
//       variant="outlined"
//       onClick={() => {
//         setMode(mode === "light" ? "dark" : "light");
//       }}
//     >
//       {mode === "light" ? "Turn dark" : "Turn light"}
//     </Button>
//   );
// }

// export default function App2() {
//   return (
//     <CssVarsProvider>
//       <main>
//         <ModeToggle />
//         <Sheet
//           sx={{
//             width: 300,
//             mx: "auto", // margin left & right
//             my: 4, // margin top & botom
//             py: 3, // padding top & bottom
//             px: 2, // padding left & right
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             borderRadius: "sm",
//             boxShadow: "md",
//           }}
//           variant="outlined"
//         >
//           <div>
//             <Typography level="h4" component="h1">
//               <b>Welcome!</b>
//             </Typography>
//             <Typography level="body2">Sign in to continue.</Typography>
//           </div>
//           <FormControl>
//             <FormLabel>Email</FormLabel>
//             <Input
//               // html input attribute
//               name="email"
//               type="email"
//               placeholder="johndoe@email.com"
//             />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Password</FormLabel>
//             <Input
//               // html input attribute
//               name="password"
//               type="password"
//               placeholder="password"
//             />
//           </FormControl>

//           <Button sx={{ mt: 1 /* margin top */ }}>Log in</Button>
//           <Typography
//             endDecorator={<Link href="/sign-up">Sign up</Link>}
//             fontSize="sm"
//             sx={{ alignSelf: "center" }}
//           >
//             Don&apos;t have an account?
//           </Typography>
//         </Sheet>
//       </main>
//     </CssVarsProvider>
//   );
// }
