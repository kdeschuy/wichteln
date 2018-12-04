<template>
  <div class="group">
    The budget for this group is {{ budget }}
  </div>
</template>

<script>
import remote from '@/remote'

export default {
  name: 'group',
  props: {
    uid: { type: String, required: true }
  },

  data () {
    return {
      groupId: null,
      budget: null
    }
  },

  computed: {
    database () { return remote.database() }
  },

  watch: {
    budget (value) {
      this.database.ref(`groups/${this.groupId}/budget`).set(value)
    }
  },

  async mounted () {
    const meta = await this.database.ref(`uids/${this.uid}`).once('value')
    this.groupId = meta.val().groupId
    this.database.ref(`groups/${this.groupId}`).on('value', snapshot => {
      this.budget = snapshot.val().budget
    })
  }
}
</script>
