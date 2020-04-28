<template>
  <div class="home">
    <div class="text-center mb-15">
      <router-link
          :to="'/create'"
          class="button button--primary"
      >
        Добавить заметку
      </router-link>
    </div>
    <NoteItem v-for="(note, index) in notesList" :data="note" :noteIndex="index" :key="index"/>
    <p
        class="text-center m-15"
        v-if="notesList.length == 0"
    >
      У Вас пока нету ни одной заметки!
    </p>
  </div>
</template>

<script>
import NoteItem from '@/components/NoteItem'

export default {
  name: 'Home',
  components: {
    NoteItem
  },
  computed: {
    notesList() {
      return this.$store.getters.notesList;
    }
  },
  methods: {

  }
}
</script>
