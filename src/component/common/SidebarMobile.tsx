'use client'
import * as React from 'react'

import MenuIcon from '@mui/icons-material/Menu'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'

import StandardMenu from '@/component/common/Menu/StandardMenu'
import ToggleMenu from '@/component/common/Menu/ToggleMenu'

import { CustomTypography } from '@/component/Atoms/Typography'

import { useAuth } from '@/hooks/auth'
import { useDeviceType } from '@/hooks/useDeviceType'
import type { DeviceType } from '@/hooks/useDeviceType'

import { menuItems, additionalItems } from '@/const/MenuList'
export default function TemporaryDrawer() {
  const { user, logout } = useAuth({
    middleware: 'guest'
  })
  const [open, setOpen] = React.useState(false)
  const deviceType: DeviceType = useDeviceType()
  if (deviceType !== 'tablet' && deviceType !== 'mobile') return <></>
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const DrawerList = (
    <Box role="presentation" sx={{ width: 300 }}>
      <List>
        {menuItems.map((item, _) => {
          if (item?.children) {
            return <ToggleMenu item={item} open={open} key={item.name} />
          } else {
            return <StandardMenu item={item} open={open} key={item.name} />
          }
        })}
        {user && (
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="ログアウト" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        {additionalItems.map((item, _) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton component="a" href={item.href}>
              <ListItemIcon>{React.createElement(item.icon)}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            {user?.dental_office && (
              <>
                <CustomTypography variant="body1">
                  {user.dental_office.name} ({user.dental_office.office_code})
                </CustomTypography>
                <CustomTypography variant="body2">
                  {user?.name} ({user?.employee_number})
                </CustomTypography>
              </>
            )}
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}
