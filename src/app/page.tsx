import { ShowMap } from "./map/ShowMap";
import {AppBar,Toolbar, Typography} from '@mui/material';
import { sizing } from '@mui/system';


export default function Page() {
  return (
    <>
      <Header />
      <ShowMap />
    </>
  )
}

 const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ minHeight: 32}}>
        <Typography variant="h6">
          避難施設マップ
        </Typography>
      </Toolbar>
    </AppBar>
  )
}