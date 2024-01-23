
export interface ImamInstructionDetailType {
    field: string,
    headerName: string,
    type?: 'text' | 'link' | 'izoh'
    renderCell?
    renderHeader?
}

export interface ImamInstructionType {
    id: number,
    direction: {
        id: number,
        title: string,
        direction_type: string,
        types: string,
        from_date: string,
        to_date: string
    },
    employee: number,
    mosque: string,
    region: string,
    district: string,
    employee_name: string,
    employee_last_name: string,
    state: string,
    requirement: boolean,
    created_at: string,
    result_id: null | number
}

export interface ImamInstructionListType {
    count: number,
    next: null | string,
    previous: null | string,
    results: ImamInstructionType[]
}
export interface ImomInstructionDetailInterface {

    id: number,
    title: string,
    creator:
    {
        id: number,
        profil__name: string,
        profil__last_name: string
    }[]
    ,
    direction_type: string,
    file: { id: number, file: string }[],
    comments: string,
    to_region: {
        id: number,
        name: string
    }[],
    to_district: {
        id: number,
        name: string,
        region: number
    }[],
    to_employee: [],
    required_to_region: {
        id: number,
        name: string
    }[],
    required_to_district: {
        id: number,
        name: string,
        region: number
    }[],
    required_to_employee: [],
    to_role: string,
    from_role: string,
    types: string,
    from_date: string,
    to_date: string,
    voice: boolean,
    image: boolean,
    video: boolean,
    comment: boolean,
    file_bool: boolean,
    created_at: string,
    updated_at: string,
    waiting: number,
    accepted: number,
    done: number
}

export interface ImamInstructionInterface {
    id: number,
    direction: {
        id: number,
        title: string
        direction_type: string,
        types: string,
        from_date: string,
        to_date: string
    },
    employee: number,
    state: string,
    requirement: boolean,
    created_at: string,
    result_id: null | number,
    employee_name: string
}

export interface GetFridayTesisResultInterface {
    id: number,
    tesis: {
        id: number,
        title: string,
        types: string
    },
    imam: {
        id: number,
        name: string,
        role: string
    },
    comment: string,
    file: string,
    child: number,
    man: number,
    old_man: number,
    old: number,
    images: {
        id: number,
        image: string
    }[]
    ,
    videos: {
        id: number,
        video: string
    }[],
    created_at: string,
    state: string,
    from: string
}

export interface GetResultsInterface {
    id: number,
    direction: {
        id: number,
        title: string,
        direction_type: string,
        types: string,
        from_role: string,
        to_role: string[]
    },
    employee: {
        id: number,
        name: string,
        role: string
    },
    comment: string,
    files: {
        id: number,
        file: string
    }[],
    images: {
        id: number,
        image: string
    }[]
    ,
    videos: {
        id: number,
        video: string
    }[],
    created_at: string,
    state: string,
    from: string
}

export interface ImamFridayThesisSeenInterface {
    count: number,
    next: null | string,
    previous: null | string,
    results:
    {
        id: number,
        tesis: number,
        imam: number,
        mosque: string,
        region: string,
        district: string,
        imam_name: string,
        imam_last_name: string,
        state: "1" | "2" | "3",
        requirement: boolean,
        created_at: string,
        result_id: null | number,
        tesis_title: string
    }[],
}

export interface ImamFridayThesisInterface {
    id: number,
    title: string,
    types: string,
    file: string,
    file_comment: string,
    attachment: null | string,
    attachment_comment: string,
    to_region: {
        id: number,
        name: string
    }[],
    to_district: [],
    to_mosque: [],
    date: string,
    image: boolean,
    video: boolean,
    comment: boolean,
    file_bool: boolean,
    created_at: string,
    updated_at: string,
    waiting: number,
    accepted: number,
    done: number
}

export interface AdminPublicPrayerInterface {
    id: number,
    imam: {
        id: number,
        name: string
    },
    prayer: {
        id: number,
        name: string,
        label: string
    }[]
    ,
    created_at: string
}

export interface GetAdminPublicPrayersInterface {
    count: number,
    next: null | string,
    previous: null | string,
    results: AdminPublicPrayerInterface[]
}

export interface AdminPublicPrayerPrayerInterface {
    id: number,
    name: string,
    label: string
}

export interface MarriageDetailInterface {
    id: number,
    imam: {
        id: number,
        name: string
    },
    comment: string,
    marriage_image: string | null,
    marriage_document: string | null,
    fhdyo_document: string | null,
    fhdyo_image: string | null,
    mahr: number,
    date: string,
    created_at: string,
    updated_at: string
}

export interface DeathDetailInterface {
    id: number,
    imam: number,
    date: string,
    image: string | null,
    file: string | null,
    comment: string,
    created_at: string,
    updated_at: string
}

export interface WeddingDetailInterface {
    id: number
    imam: number
    title: string
    comment: string
    types: string
    date: string
    created_at: string
    updated_at: string
}

export interface CeremonyDetailInterface {
    id: number,
    imam: number,
    title: string,
    comment: string,
    types: string,
    date: string,
    created_at: string,
    updated_at: string
}