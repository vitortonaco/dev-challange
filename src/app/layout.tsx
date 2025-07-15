import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
 // or `v1X-appRouter` if you are using Next.js v1X

 export default function RootLayout(props: any) {
   return (
     <html lang="en">
       <body className="">
        <AppRouterCacheProvider>
           {props.children}
        </AppRouterCacheProvider>
       </body>
     </html>
   );
 }
