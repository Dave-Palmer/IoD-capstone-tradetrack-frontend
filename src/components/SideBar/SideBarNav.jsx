import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlineTool, AiOutlineAlert, AiOutlineLogout } from 'react-icons/ai'
import { BsPeople } from 'react-icons/bs'
import { SidebarHeader } from './SidebarHeader';
import { SLinkNotification } from "../StyledComponents";
import Divider from '@mui/material/Divider';
import { AlertsContext } from "../../context/alertsContext";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";


export default function SidebarNav() {
  const { collapsed, toggled, broken, } = useProSidebar(); //React pro side bar allows these booleans/functions to be used accross the app
  const { pathname } = useLocation()
  const { alerts } = useContext(AlertsContext)
  const { currentUser, handleUpdateUser } = useContext(UserContext)

  return (

    <Sidebar
      backgroundColor="rgb(59, 96, 100)"
      style={{ height: "100vh" }}
      breakPoint="lg"
      transitionDuration={800} //in ms
      width='300px'
      collapsedWidth='85px'
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            if (level === 0) {
              return {
                color: disabled ? "#eee" : "white",
                backgroundColor: active ? "rgb(85, 130, 139)" : undefined,
                margin: '10px 5px',
                "&:hover": {
                  transition: "200ms",
                  backgroundColor: " rgb(85, 130, 139)",
                },
              };
            }
          },
        }}
      >
        {/* Checks if the sidebar is full width before displaying the avatar and logo */}
        {!collapsed && !broken && <SidebarHeader />}

        <Divider variant="middle" />

        {currentUser.admin && //if the user is an admin user it will display these menu items
          <>
            <MenuItem component={<Link to="/home" />} active={pathname === "/home"} icon={<AiOutlineHome />}>Home</MenuItem>
            <MenuItem component={<Link to="/staff" />} active={pathname === "/staff"} icon={<BsPeople />}>Staff</MenuItem>
            <MenuItem component={<Link to="/inventory" />} active={pathname === "/inventory"} icon={<AiOutlineTool />}>Inventory</MenuItem>
            <MenuItem
              component={<Link to="/alerts" />}
              suffix={!toggled && alerts > 0 && <SLinkNotification>{alerts}</SLinkNotification>} //checks alerts context is above 0 and if the the sidebar is collapsed/toggled
              active={pathname === "/alerts"}
              icon={<AiOutlineAlert />}>
              Alerts
            </MenuItem></>}
        {!currentUser.admin &&   //if the user is a normal staff member, it will only display these menu items
          <>
            <MenuItem component={<Link to="/dashboard" />} active={pathname === "/dashboard"} icon={<AiOutlineHome />}>Dashboard</MenuItem>
            <MenuItem component={<Link to="/workshopitems" />} active={pathname === "/workshopitems"} icon={<AiOutlineTool />}>Workshop Items</MenuItem>
          </>}
        <Divider variant="middle" />
        <MenuItem onClick={() => handleUpdateUser({})} icon={<AiOutlineLogout />}>Logout </MenuItem> {/*sets usercontext and user cookie to an empty object*/}
        <Divider variant="middle" />
      </Menu>
    </Sidebar>

  )
}

