<template>
  <div class="home">
    <button @click="createGroup">
      {{ $t('main.button') }}
    </button>
  </div>
</template>

<script>
import remote from '@/remote'

export default {
  name: 'home',

  computed: {
    database () { return remote.database() }
  },

  methods: {
    uid () {
      return Date.now().toString(16).slice(-2) + (Math.random().toString(16).slice(2, 6))
    },

    _generateGroup () {
      return {
        template: '',
        budget: 15,
        deadline: '16-12-2018'
      }
    },

    async createGroup () {
      const groupRef = await this.database.ref('groups').push()
      groupRef.set(this._generateGroup())

      const adminUid = this.uid()
      await Promise.all([
        this.database.ref(`uids/${adminUid}`).set({ groupId: groupRef.key, admin: true }),
        this.database.ref(`uids/${this.uid()}`).set({ groupId: groupRef.key, admin: false })
      ])

      this.$router.replace({ name: 'group', params: { uid: adminUid } })
    }
  }
}
</script>
