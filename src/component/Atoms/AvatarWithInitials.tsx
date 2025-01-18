import React from 'react'
import Avatar from '@mui/material/Avatar'

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name: string, size?: number) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: size, // サイズを指定
      height: size, // サイズを指定
      fontSize: size ? size / 2.5 : undefined // フォントサイズを自動調整
    },
    children: name
      .split(' ')
      .map((part) => part[0])
      .join('')
  }
}

interface AvatarWithInitialsProps {
  name: string // 単一の名前
  size?: number // サイズ (任意)
}

const AvatarWithInitials: React.FC<AvatarWithInitialsProps> = ({ name, size }) => {
  return <Avatar {...stringAvatar(name, size)} />
}

export default AvatarWithInitials
