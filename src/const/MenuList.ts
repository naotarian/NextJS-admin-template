import type React from 'react'

import { Mail as MailIcon, MoveToInbox as InboxIcon } from '@mui/icons-material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'
export type MenuItem = {
  name: string
  href?: string // href は省略可能（階層メニューの場合）
  icon: React.ElementType
  children?: MenuItem[] // 階層構造をサポート
}

export const menuItems: MenuItem[] = [
  {
    name: '勤怠管理',
    href: '/employee/attendance',
    icon: WorkHistoryIcon
  },
  {
    name: 'シフト管理',
    icon: CalendarMonthIcon,
    children: [
      { name: 'シフト登録', href: '/shifts', icon: EditCalendarIcon },
      {
        name: 'シフトテンプレート',
        href: '/shifts/templates',
        icon: EventAvailableIcon
      }
    ]
  },
  {
    name: '各種設定',
    icon: SettingsIcon,
    children: [
      { name: '基本設定', href: '/settings/basic', icon: SettingsIcon },
      { name: '従業員管理', href: '/settings/employees', icon: PeopleIcon }
    ]
  },
  {
    name: 'Drafts',
    href: '/drafts',
    icon: MailIcon
  }
]

export const additionalItems: MenuItem[] = [
  {
    name: 'All mail',
    href: '/all-mail',
    icon: InboxIcon
  },
  {
    name: 'Trash',
    icon: MailIcon,
    children: [
      { name: 'Recently Deleted', href: '/trash/recent', icon: InboxIcon },
      { name: 'Permanently Deleted', href: '/trash/permanent', icon: MailIcon }
    ]
  },
  {
    name: 'Spam',
    href: '/spam',
    icon: InboxIcon
  }
]

// 使用時に React.createElement で生成
/*
<ListItemIcon>
  {React.createElement(item.icon)}
</ListItemIcon>
*/
