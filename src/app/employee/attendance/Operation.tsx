'use client'

import React, { useState } from 'react'

import { MdLogin, MdLogout } from 'react-icons/md'

import Button from '@/component/Atoms/Button'
const AttendancePage: React.FC = () => {
	const [status, setStatus] = useState<string>('未出勤')

	const handleClockIn = () => {
		setStatus('出勤中')
	}

	const handleClockOut = () => {
		setStatus('退勤済み')
	}

	const handleBreak = () => {
		setStatus('休憩中')
	}

	return (
		<div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
			<div className='flex justify-center gap-4'>
				<Button
					label='出勤'
					variant='contained'
					color='info'
					onClick={handleClockIn}
					startIcon={<MdLogin />}
				/>
				<Button
					label='退勤'
					variant='contained'
					color='primary'
					onClick={handleClockIn}
					disabled
					startIcon={<MdLogout />}
				/>
			</div>
		</div>
	)
}

export default AttendancePage
