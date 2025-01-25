'use client'

import React, { useState } from 'react'

import { ExpandMore, ExpandLess } from '@mui/icons-material'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

import type { MenuItem } from '@/const/MenuList'

const ToggleMenu = ({ item, open }: { item: MenuItem; open: boolean }) => {
  const [childOpen, setChildOpen] = useState(false)

  // サブメニュー開閉トグル
  const toggleSubMenu = () => {
    setChildOpen((prev) => !prev)
  }

  return (
    <React.Fragment>
      {/* 親メニューアイテム */}
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5,
            justifyContent: open ? 'initial' : 'center'
          }}
          onClick={toggleSubMenu} // サブメニュー開閉
        >
          {/* 親メニューアイコン */}
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: 'center',
              color: childOpen ? 'primary.main' : 'inherit', // 開閉状態で色を変更
              mr: open ? 3 : 'auto'
            }}
          >
            {React.createElement(item.icon)}
          </ListItemIcon>

          {/* 親メニューのテキスト */}
          <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />

          {/* サブメニューの開閉アイコン */}
          {open && item.children && (
            <ListItemIcon
              sx={{
                minWidth: 'auto',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {childOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
          )}
        </ListItemButton>
      </ListItem>

      {/* サブメニューアイテム */}
      {childOpen && item.children && (
        <List sx={{ pl: open ? 1.5 : 1 }}>
          {item.children.map((child) => (
            <ListItem key={child.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? 'initial' : 'center'
                }}
                component="a"
                href={child.href} // サブメニューリンク
              >
                {/* サブメニューアイコン */}
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    mr: open ? 1.5 : 'auto'
                  }}
                >
                  {React.createElement(child.icon)}
                </ListItemIcon>

                {/* サブメニューのテキスト */}
                <ListItemText
                  primary={child.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </React.Fragment>
  )
}

export default ToggleMenu
