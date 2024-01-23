// import Confirmation from "@components/common/Confirmation";
import { OrderT, ThesisT } from '@components/Notifications'
import CustomModal from '@components/common/CustomModal'
import Snackbar from '@components/common/Snackbar'
import useModal from '@hooks/useModal'
import { getQuery } from '@services/requests/CommonRequests'
import { personT } from '@src/types'
import { IUserDetail } from '@src/types/userTypes'
// import { deleteOne, getOneById } from "@src/api/actions/commonActions";
// import { copyFromDataOptionT } from "@utils/copyFromData";
// import i18next from "i18next";
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

type snackbarT = {
  message: string
  status: string
}

type notificationT = {
  count: number
  results: OrderT[] | ThesisT[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MainContext = createContext<any>(undefined)
export const useMainContext = () => useContext<MainContextType>(MainContext)
const useMain = () => {
  const [user, setUser] = useState<personT>()
  const [activeLan, setActiveLan] = useState(localStorage.getItem('i18nextLng') || 'uz')
  const [snackbar, setSnackbar] = useState({
    message: '',
    open: false,
    status: '',
  })
  const [isAlreadyDisabled, setIsAlreadyDisabled] = useState(false)
  const [openSideBar, setOpenSideBar] = useState(false)
  const [confirm, setConfirm] = useState({ title: '', isConfirmed: false, isDelete: false })
  // const [deleteArgs, setDeleteArgs] = useState<{ url: string; guid: string; refetch?: () => void } | undefined>();
  const [isImportedFile, setIsImportedFile] = useState(false)
  const [rowSelectionModel, setRowSelectionModel] = React.useState([])

  const { closeModal: closeConfirm, open: isConfirmOpen, openModal: openConfirm } = useModal()
  const { closeModal: closeDetail, open: isDetailOpen, openModal: openDetail } = useModal()
  const [detailId, setDetailId] = useState<number>()

  const [notificationOpen, setNotificationOpen] = useState(false)

  const { data: thesisNotifications } = getQuery<notificationT>(
    'common/notifications/thesis',
    ['notifications/thesis', user?.role || 0],
    {
      enabled: !!user?.role,
    }
  )
  const { data: orderNotifications, refetch: orderRefetch } = getQuery<notificationT>(
    'common/notifications/order',
    ['notifications/order', user?.role || 0],
    {
      enabled: !!user?.role,
    }
  )

  const {
    data: fullProfile,
    refetch: refetchProfile,
    isFetching: isFetchingProfile,
  } = getQuery<IUserDetail[]>('auth/self_profile', ['profile', user?.role || 0], {
    enabled: !!user?.role,
  })

  const openDetailModal = (id: number) => {
    openDetail()
    setDetailId(id)
  }
  const closeDetailModal = () => {
    closeDetail()
    setDetailId(null)
  }

  const createConfirm = (title: string, isDelete?: boolean) => {
    setConfirm({ ...confirm, title, isDelete: !!isDelete })
    openConfirm()
  }
  const resConfirm = (isConfirmed: boolean) => {
    closeConfirm()
    setConfirm({ ...confirm, isConfirmed })
  }

  const changeLan = (language: string) => {
    setActiveLan(language)
    // i18next.changeLanguage(language);
  }

  const logout = () => {
    localStorage.clear()
    openSnackbar({ message: 'Siz tizimdan chiqdingiz', status: 'info' })
    window.location.assign('/login')
  }

  const getUser = () => {
    let userdata = JSON.parse(localStorage.getItem('user'))
    setUser(user)

    if (!user) {
      setUser(userdata)
    }

    return user || { ...userdata, first_name: 'Xaxa' }
  }

  const openSnackbar = ({ message, status }: snackbarT) =>
    setSnackbar({ open: true, message, status })
  const closeSnackbar = () => setSnackbar({ open: false, message: '', status: '' })

  // const handleDelete = async (url: string, guid: string, refetch?: () => void) => {
  //   if (confirm.isConfirmed) {
  //     const res = await deleteOne(url, guid);
  //     if (res === 204) {
  //       openSnackbar({ message: "Удалено", status: "success" });
  //       setDeleteArgs(undefined);
  //       refetch();
  //     } else openSnackbar({ message: "Ошибка", status: "error" });
  //     setConfirm({ title: "", isConfirmed: false, isDelete: false });
  //   } else {
  //     setDeleteArgs({ url, guid, refetch });
  //     createConfirm(
  //       "Вы действительно хотите удалить данный товар? После удаления вы не сможете вернуть этот возврат!",
  //       true
  //     );
  //   }
  // };

  // useEffect(() => {
  //   if (confirm.isConfirmed && confirm.isDelete) {
  //     const { guid, url, refetch } = deleteArgs;
  //     handleDelete(url, guid, refetch);
  //   }
  // }, [confirm.isConfirmed]);

  const { pathname } = useLocation()
  useEffect(() => {
    setIsAlreadyDisabled(false)
  }, [pathname])

  useEffect(() => {
    if (isImportedFile) setIsImportedFile(false)
  }, [isImportedFile])

  // const getProfile = async () => {
  //   const res = (await getOneById("staff-detail", localStorage.getItem("userGuid"))) as personT;
  //   if (+res.role !== 1) setUser(res);
  // };

  // useEffect(() => {
  //   if (!user && localStorage.getItem('dSystemToken')) getProfile()
  // }, [user])

  return {
    state: {
      user,
      activeLan,
      snackbar,
      confirm,
      isConfirmOpen,
      isAlreadyDisabled,
      isImportedFile,
      rowSelectionModel,
      openSideBar,
      isDetailOpen,
      detailId,
      notificationOpen,
      notifications: {
        directions: (orderNotifications?.results ?? []) as OrderT[],
        friday_tesis: (thesisNotifications?.results ?? []) as ThesisT[],
        count: (thesisNotifications?.count ?? 0) + (orderNotifications?.count ?? 0),
        directionsRefetch: orderRefetch,
      },
      fullProfile,
      isFetchingProfile,
    },
    actions: {
      openDetailModal,
      closeDetailModal,
      changeLan,
      openSnackbar,
      closeSnackbar,
      closeConfirm,
      openConfirm,
      resConfirm,
      createConfirm,
      // handleDelete,
      setIsAlreadyDisabled,
      setIsImportedFile,
      setRowSelectionModel,
      closeDetail,
      openDetail,
      logout,
      setOpenSideBar,
      getUser,
      setNotificationOpen,
      refetchProfile,
    },
  }
}

export type MainContextType = ReturnType<typeof useMain>

const MainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useMain()

  return (
    <MainContext.Provider value={value}>
      <Snackbar
        message={value.state.snackbar.message}
        open={value.state.snackbar.open}
        status={value.state.snackbar.status as 'success' | 'error' | 'info'}
        close={value.actions.closeSnackbar}
      />

      <CustomModal
        open={value.state.isConfirmOpen}
        closeModal={value.actions.closeConfirm}
        isConfirmationModal={true}
      >
        {/* <Confirmation title={value.state.confirm.title} /> */}
        <>confirm modal</>
      </CustomModal>
      {children}
    </MainContext.Provider>
  )
}

export default MainProvider
