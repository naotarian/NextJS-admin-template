'use client'

import React from 'react'

import { usePathname } from 'next/navigation' // Next.js 15 で現在のパスを取得

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

import type { MenuItem } from '@/const/MenuList'

const StandardMenu = ({ item, open }: { item: MenuItem; open: boolean }) => {
  const pathname = usePathname() // 現在のURLを取得
  const isActive = pathname === item.href // 現在のURLとitem.hrefが一致するか判定

  return (
    <ListItem
      key={item.name}
      disablePadding
      sx={{
        display: 'block',
        bgcolor: isActive ? 'primary.light' : 'transparent', // 一致する場合は背景色を変更
        '&:hover': { bgcolor: 'primary.light' } // ホバー時のスタイル
      }}
    >
      <ListItemButton
        sx={[
          { minHeight: 48, px: 2.5 },
          open ? { justifyContent: 'initial' } : { justifyContent: 'center' }
        ]}
        component="a"
        href={item.href}
      >
        <ListItemIcon
          sx={[
            { minWidth: 0, justifyContent: 'center' },
            open ? { mr: 1.5 } : { mr: 'auto' }
          ]}
        >
          {React.createElement(item.icon)}
        </ListItemIcon>
        <ListItemText
          primary={item.name}
          sx={[open ? { opacity: 1 } : { opacity: 0 }]}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default StandardMenu
