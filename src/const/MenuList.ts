import type React from 'react'

import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'

// アイテムの型を定義
interface MenuItem {
  name: string
  href: string
  icon: React.ElementType // コンポーネント自体を渡す型
}

export const menuItems: MenuItem[] = [
  { name: 'Inbox', href: '/inbox', icon: InboxIcon },
  { name: 'Starred', href: '/starred', icon: MailIcon },
  { name: 'Send email', href: '/send-email', icon: InboxIcon },
  { name: 'Drafts', href: '/drafts', icon: MailIcon }
]

export const additionalItems: MenuItem[] = [
  { name: 'All mail', href: '/all-mail', icon: InboxIcon },
  { name: 'Trash', href: '/trash', icon: MailIcon },
  { name: 'Spam', href: '/spam', icon: InboxIcon }
]

// 使用時に React.createElement で生成
/*
<ListItemIcon>
  {React.createElement(item.icon)}
</ListItemIcon>
*/
