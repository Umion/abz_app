import { defineStore } from 'pinia'
import { apiGetPositions, apiGetUsers } from '@/api/users/index'
import { PositionModel, UsersModel, UsersResponseDataModel, UsersResponseLinksModel } from '@/api/users/model'

interface UsersState {
  usersList: UsersModel[]
  links: UsersResponseLinksModel
  positions: PositionModel[]
  form: FormModel
}

interface FormModel {
  name: string
  phone: string
  email: string
  position: number | null
  avatar: File | null
}

export const usersStore = defineStore({
  id: 'users-store',
  state: (): UsersState => ({
    usersList: [],
    links: {
      next_url: null,
      prev_url: null
    },
    positions: [],
    form: {
      name: '',
      phone: '',
      email: '',
      position: null,
      avatar: null
    }
  }),
  getters: {
    getUsers(): UsersModel[] {
      return this.usersList
    },
    getLinks(): UsersResponseLinksModel {
      return this.links
    },
    getPositions(): PositionModel[] {
      return this.positions
    },
    getForm(): FormModel {
      return this.form
    },
  },
  actions: {
    setUsers(data: UsersResponseDataModel, link?: string | null) {
      this.usersList = link ? [...this.usersList, ...data.users] : data.users
      this.links = data.links
    },
    setPositions(data: PositionModel[]) {
      this.positions = data
    },
    setDefaultPosition(id: number) {
      this.form.position = id
    },
    async loadUsers(link?: string | null) {
      apiGetUsers(link).then(data => {
        this.setUsers(data.data, link)
      })
    },
    async loadPositions() {
      apiGetPositions().then(data => {
        this.setPositions(data.data.positions)
        this.setDefaultPosition(data.data.positions[0].id)
      })
    },
    async init() {
      this.loadUsers()
      this.loadPositions()
    }

  },
})

