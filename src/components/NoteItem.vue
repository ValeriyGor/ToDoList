<template>
    <div class="note mb-15">
        <div class="note__header">
            <h2 class="mb-15">{{data.title}}</h2>
            <div class="note__actions">
                <router-link
                    :to="{ name: 'NoteDetails', params: { noteIndex: noteIndex, noteData: data} }"
                    class="button button--rounded button--primary"
                >
                    <i class="far fa-edit"></i>
                </router-link>
                <button
                    type="button"
                    class="button button--rounded button--danger"
                    @click="removeNote(noteIndex)"
                >
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>

        <ul class="note__todo-list">
            <template v-for="(todo, index) in data.todoList">
                <li class="note__todo-item" :key="index" v-if="index < 3">
                    <input type="checkbox" disabled :checked="todo.done">
                    <span></span>
                    <p>{{todo.title}}</p>
                </li>
                <li v-else-if="index === 3" :key="index" class="note__dots">
                    <i class="fa fa-circle"></i>
                    <i class="fa fa-circle"></i>
                    <i class="fa fa-circle"></i>
                    +
                    <span>{{data.todoList.length - 3}}</span>
                </li>
            </template>

        </ul>
    </div>
</template>

<script>
    export default {
        name: 'NoteItem',
        props: {
            data: Object,
            noteIndex: Number
        },
        methods: {
            removeNote(index) {
                this.$swal.fire({
                    title: "Вы уверены",
                    text: "Подтвердите действие",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: "Да, удалить",
                    cancelButtonText: "Отменить"
                }).then((result) => {
                    if (result.value) {
                        this.$store.dispatch('removeNote', index);
                    }
                })
            },

        }
    }
</script>

<style lang="sass" scoped>
    .note
        padding: 15px
        background-color: #222
        color: #fff
        transition: all 0.15s
        border-radius: 10px
        display: block
            
        &:hover
            background-color: #333

        &__header
            display: flex
            align-items: center
            justify-content: space-between
            h2
                max-width: 70%
                flex: 0 0 70%
                font-weight: 500

        &__actions
            display: flex
            align-items: center
            justify-content: flex-end
            max-width: 30%
            flex: 0 0 30%

        &__dots
            padding-top: 5px
            i
                display: inline-block
                font-size: 8px
                margin-right: 5px
                vertical-align: middle
                position: relative
                top: -2px


</style>