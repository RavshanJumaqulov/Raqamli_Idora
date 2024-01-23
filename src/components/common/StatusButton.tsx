import React from 'react'
import CustomButton from './CustomButton'

const StatusButton: React.FC<{ status: number | string }> = ({ status }) => {
  return (
    <CustomButton
      height="30px"
      value={['Kutilmoqda', 'Qabul qilindi', 'Bajarildi', 'Bajarilmadi'][+status - 1]}
      bgColor={
        [
          'var(--Light-warning, #FFF2D6)',
          'var(--Gray, #CDD2D7)',
          'var(--transparent-success-16, rgba(34, 197, 94, 0.16))',
          ' var(--Light-error, #FFE4DE)',
        ][+status - 1]
      }
      color={['#B76E00', '#637381', '#118D57', '#B71D18'][+status - 1]}
    />
  )
}

export default StatusButton
