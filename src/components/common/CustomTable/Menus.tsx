import React from 'react'
import { StyledMenu } from './Style'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { useMainContext } from '@contexts/MainProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import { MenuItem } from '@mui/material'
import { customActionsT } from './CustomTable'
import CheckIcon from '@mui/icons-material/Check'
import { patchMutation } from '@services/requests/CommonRequests'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

type T = {
  isInstructionOrThesisResults: boolean
  anchorEl: null | HTMLElement
  openDropDown
  handleClose: () => void
  selectedRow
  customActions?: customActionsT
  directionId?: boolean
  tesisId?: boolean
  setOpen: (val: boolean) => void
  updatePath?: string
  refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>
  onEditClick?: (row) => void
  isResult: boolean
  load: boolean
}

const Menus: React.FC<T> = ({
  isInstructionOrThesisResults,
  anchorEl,
  openDropDown,
  handleClose,
  selectedRow,
  customActions,
  directionId,
  tesisId,
  setOpen,
  updatePath,
  refetch,
  onEditClick,
  isResult = false,
  load
}) => {
  const {
    state: {
      notifications: { directionsRefetch },
    },
    actions: { openDetailModal, openSnackbar },
  } = useMainContext()

  const navigate = useNavigate()
  const { pathname, search } = useLocation()

  const { mutate: patch } = patchMutation(updatePath + selectedRow?.id, {
    onSuccess: () => {
      refetch()
      directionsRefetch()
      openSnackbar({ message: 'Topshiriq muvafaqiyatli qabul qilindi!', status: 'success' })
    },
    onError: (error) => {
      openSnackbar({ message: error?.message, status: 'error' })
    },
  })

  return (
    <StyledMenu
      id="demo-customized-menu"
      MenuListProps={{
        'aria-labelledby': 'demo-customized-button',
      }}
      anchorEl={anchorEl}
      open={openDropDown}
      onClose={handleClose}
    >
      {isInstructionOrThesisResults ? (
        <div>
          <MenuItem
            onClick={() => {
              handleClose()
              openDetailModal(selectedRow?.result_id)
            }}
          >
            <VisibilityIcon color="info" /> Ko'rish
          </MenuItem>
        </div>
      ) : (
        <div>
          {customActions ? (
            <>
              {customActions?.view && (
                <MenuItem
                  onClick={() => {
                    navigate(
                      load ? (
                        isResult
                          ? pathname.replace(
                            'list',
                            `result/${directionId
                              ? selectedRow?.direction.id
                              : tesisId
                                ? selectedRow?.tesis
                                : selectedRow?.id
                            }`
                          ) +
                          search +
                          `&seen=${selectedRow?.id}`
                          : pathname.replace(
                            'list',
                            `view/${directionId
                              ? selectedRow?.direction.id
                              : tesisId
                                ? selectedRow?.tesis
                                : selectedRow?.id
                            }`
                          ) +
                          search +
                          `&seen=${selectedRow?.id}`) : pathname + `?publicPrayerId=${selectedRow.id}`
                    )
                    handleClose()
                  }
                  }
                >
                  <VisibilityIcon color="info" /> Ko'rish
                </MenuItem>
              )}
              {customActions?.update && !!selectedRow && selectedRow.state == '1' && (
                <MenuItem
                  onClick={() => {
                    patch({ state: '2' })
                    handleClose()
                  }}
                >
                  <CheckIcon color="success" /> Qabul qilish
                </MenuItem>
              )}
              {customActions?.edit && (
                <MenuItem
                  onClick={() => {
                    if (onEditClick) {
                      onEditClick?.(selectedRow)
                    } else {
                      navigate(pathname.replace('list', `edit/${selectedRow.id}`) + search)
                    }
                  }}
                >
                  <ModeEditIcon color="warning" /> O'zgartirish
                </MenuItem>
              )}
              {customActions?.delete && (
                <MenuItem
                  onClick={() => {
                    setOpen(true)
                    handleClose()
                  }}
                >
                  <DeleteIcon color="error" /> O'chirish
                </MenuItem>
              )}
            </>
          ) : (
            <div>
              <MenuItem
                onClick={() =>
                  navigate(
                    pathname.replace(
                      'list',
                      `view/${directionId ? selectedRow?.direction.id : selectedRow.id}`
                    ) + search
                  )
                }
              >
                <VisibilityIcon color="info" /> Ko'rish
              </MenuItem>
              <MenuItem
                onClick={() => {
                  if (onEditClick) {
                    onEditClick?.(selectedRow)
                  } else {
                    navigate(pathname.replace('list', `edit/${selectedRow.id}`) + search)
                  }
                }}
              >
                <ModeEditIcon color="warning" /> O'zgartirish
              </MenuItem>
              {(pathname.includes('instructions') || pathname.includes('friday-thesis')) && (
                <MenuItem onClick={() => navigate(`${pathname}/${selectedRow?.id}/results`)}>
                  <InsertDriveFileIcon color="success" /> Natijalar
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  setOpen(true)
                  handleClose()
                }}
              >
                <DeleteIcon color="error" /> O'chirish
              </MenuItem>
            </div>
          )}
        </div>
      )
      }
    </StyledMenu >
  )
}

export default Menus
