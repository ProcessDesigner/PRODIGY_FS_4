// import { Fragment, useState } from "react";
// import {SpeedDial,SpeedDialAction} from "@material-ui/lab"
// import DashboardIcon from "@material-ui/icons/Dashboard"
// import PersonIcon from "@material-ui/icons/Person"
// import ExitToAppIcon from "@material-ui/icons/ExitToApp"
// import ListAltIcon from "@material-ui/icons/ListAlt"    
// import { useNavigate } from "react-router-dom";
// import { ListItemSecondaryAction } from "@material-ui/core";
// function UserOption ({user}){

//     const  [open,setOpen] = useState(false)
//     const navigate = useNavigate()
//     const options = [
//         {icon:<ListAltIcon />,name:"Orders",func:orders},
//         {icon:<PersonIcon />,name:"Profile",func:account},
//         {icon:<ExitToAppIcon />,name:"Logout",func:logoutUser},
//     ]
    
//     if(user.role === 'ADMIN'){
//         options.unshift({icon:<DashboardIcon />, name:"Dashboard", func:dashboard})
//     }

//     function dashboard(){
//         navigate('/dashboard')
//     }

//     function orders(){
//         navigate('/orders')
//     }

//     function account(){
//         navigate('/account')
//     }


//     return(
//         <Fragment>
//             <SpeedDial
//                 ariaLabel="SpeedDial tooltip example"
//                 onClose = {()=>setOpen(false)}    
//                 onOpen = {()=>setOpen(true)}
//                 open={open}
//                 icon = {

//                     <img 
//                         src={user.avatar.url ? user.avatar.url :".Profile.png"}
//                         alt="Profile"
//                     />
//                 }    
//             >
//                 {options.map((item)=>{
//                     <SpeedDialAction icon={item.icon} tooltipTitle = {item.name} onClick = {item.func} />
//                 })}
//             </SpeedDial>
//         </Fragment>
//     )
// }

// export default UserOption;